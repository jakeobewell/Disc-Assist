set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "courses" (
	"courseId" serial NOT NULL,
	"courseName" TEXT NOT NULL,
	"holes" integer NOT NULL,
	CONSTRAINT "courses_pk" PRIMARY KEY ("courseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "scores" (
	"scoreId" serial NOT NULL,
	"roundId" integer NOT NULL,
	"holeNumber" integer NOT NULL,
	"par" integer NOT NULL,
	"score" integer NOT NULL,
	CONSTRAINT "scores_pk" PRIMARY KEY ("scoreId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userCourses" (
	"userId" integer NOT NULL,
	"courseId" integer NOT NULL,
	CONSTRAINT "userCourses_pk" PRIMARY KEY ("userId","courseId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "rounds" (
	"roundId" serial NOT NULL,
	"userId" integer NOT NULL,
	"courseId" integer NOT NULL,
	"date" TIMESTAMP NOT NULL,
	"totalScore" integer NOT NULL,
	CONSTRAINT "round_pk" PRIMARY KEY ("roundId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "scores" ADD CONSTRAINT "scores_fk0" FOREIGN KEY ("roundId") REFERENCES "round"("roundId");

ALTER TABLE "userCourses" ADD CONSTRAINT "userCourses_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "userCourses" ADD CONSTRAINT "userCourses_fk1" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId");

ALTER TABLE "round" ADD CONSTRAINT "round_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "round" ADD CONSTRAINT "round_fk1" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId");
