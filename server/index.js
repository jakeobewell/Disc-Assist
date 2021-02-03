require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);


app.post('/api/courses', (req, res, next) => {
  const { courseName, city } = req.body;
  const holes = parseInt(req.body.holes);
  const sql = `
  insert into "courses" ("courseName, "city", "holes")
  values ($1, $2, $3)
  returning *
  `;
  const params = [courseName, city, holes]
  db.query(sql, params);
    .then(result => {
      const [newCourse] = result.rows;
      const courseId = newCourse.courseId;
      const userId = 1;
      const sqlTwo = `
      insert into "userCourses" ("courseId, "userId")
      values ($1, $2)
      `;
      return db.query(sqlTwo, params);
      .then(()=> {
        res.status(201).json(newCourse);
      })
    })
    .catch(err => next(err));
});


app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
