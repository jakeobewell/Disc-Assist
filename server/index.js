require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/courses/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const sql = `
  select "courses"."courseName",
        "courses"."city",
        "courses"."courseId",
        "courses"."holes"
  from "userCourses"
  join "courses" using ("courseId")
  where "userCourses"."userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/course/:courseId', (req, res, next) => {
  const courseId = parseInt(req.params.courseId);
  const sql = `
  select "courses"."courseName",
        "courses"."city",
        "courses"."holes"
  from "courses"
  where "courses"."courseId" = $1
  `;
  const params = [courseId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/scores/:roundId', (req, res, next) => {
  const roundId = parseInt(req.params.roundId);
  const sql = `
  select "scores"."holeNumber", "scores"."par", "scores"."score"
  from "scores"
  where "scores"."roundId" = $1
  `;
  const params = [roundId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/rounds/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const sort = req.query.sort;
  let sql = `
  select "courses"."courseName", "rounds"."date",
  "rounds"."totalScore", "rounds"."roundId"
  from "rounds"
  join "courses" using ("courseId")
  where "rounds"."userId" = $1
  order by "rounds"."roundId" desc
  `;
  if (sort === 'lastFive') {
    sql = `
  select "courses"."courseName", "rounds"."date",
  "rounds"."totalScore", "rounds"."roundId"
  from "rounds"
  join "courses" using ("courseId")
  where "rounds"."userId" = $1
  order by "rounds"."roundId" desc
  limit 5
  `;
  }
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("userName", "password")
      values ($1, $2)
      returning "userId", "userName"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  const sql = `
  select "userId", "password"
  from "users"
  where "userName" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId } = user;
      const hashedPassword = user.password;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, userId: userId });
        });
    })
    .catch(err => next(err));
});

app.post('/api/courses', (req, res, next) => {
  const { courseName, city, userId } = req.body;
  if (!courseName || !city) {
    throw new ClientError(400, 'courseName and city are required fields');
  }
  const holes = parseInt(req.body.holes);
  const sql = `
  insert into "courses" ("courseName", "city", "holes")
  values ($1, $2, $3)
  returning *
  `;
  const params = [courseName, city, holes];
  db.query(sql, params)
    .then(result => {
      const [newCourse] = result.rows;
      const courseId = newCourse.courseId;
      const sqlTwo = `
      insert into "userCourses" ("courseId", "userId")
      values ($1, $2)
      `;
      const paramsTwo = [courseId, userId];
      db.query(sqlTwo, paramsTwo);
      return newCourse;
    })
    .then(newCourse => {
      res.status(201).json(newCourse);
    })
    .catch(err => next(err));
});

app.post('/api/rounds', (req, res, next) => {
  const { round, scores } = req.body;
  const { userId, courseId, totalScore } = round;
  const date = 'now';
  const sql = `
  insert into "rounds" ("userId", "courseId", "totalScore", "date")
  values ($1, $2, $3, $4)
  returning *
  `;
  const params = [userId, courseId, totalScore, date];
  db.query(sql, params)
    .then(result => {
      const [newRound] = result.rows;
      const roundId = newRound.roundId;
      const scoreParams = [];
      let paramNumber = 0;

      const scoreValues = scores.map(score => {
        scoreParams.push(roundId, score.holeNumber, score.par, score.score);
        return `($${++paramNumber}, $${++paramNumber},
      $${++paramNumber}, $${++paramNumber})`;
      });
      const scoreSql = `
    insert into "scores" ("roundId", "holeNumber", "par", "score")
    values ${scoreValues.join(', ')}
    returning *
    `;
      return db.query(scoreSql, scoreParams);
    })
    .then(res.sendStatus(201))
    .catch(err => next(err));
});

app.patch('/api/edit-course/:courseId', (req, res, next) => {
  const courseId = req.params.courseId;
  const { courseName, city } = req.body;
  const holes = parseInt(req.body.holes);
  const sql = `
    update "courses"
       set "courseName" = $1,
           "city" = $2,
           "holes" = $3
     where "courseId" = $4
    `;
  const params = [courseName, city, holes, courseId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
