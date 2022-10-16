INSERT INTO initiative (name)
VALUES ('Initiative 1'), ('Initiative 2'), ('Initiative 3'), ('Initiative 4');

SELECT * FROM initiative;

INSERT INTO
    activity (name, initiative_id)
VALUES ('Activity 1', 1), ('Activity 2', 1), ('Activity 3', NULL), ('Activity 4', 4);

SELECT * FROM activity;