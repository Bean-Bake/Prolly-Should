CREATE TABLE todolist
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    content VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    datecreated VARCHAR(50) NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false,
    datedone VARCHAR(50)
);

INSERT INTO todolist (content, category) VALUES ('Brush teeth', 'Health');
INSERT INTO todolist (content, category) VALUES ('Floss', 'Health');
INSERT INTO todolist (content, category) VALUES ('Go to the gym', 'Fitness');

CREATE TABLE notdolist
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);