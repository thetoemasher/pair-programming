
create table cohorts (
id serial primary key,
name varchar(50),
ready boolean,
);

create table students(
    id serial primary key,
    student_name varchar(50),
    workedwith integer [],
    notworkedwith integer [],
    ordered integer,
    cohort_id integer references cohorts(id)
);

insert into cohorts(name, ready)
values ('WSL1', false);


insert into students(student_name, workedwith, notworkedwith, ordered, cohort_id)
values('Kyle Barnett', '{}', '{}', 1, (select id from cohorts where name = 'WSL1')),
('Palmer Campbell', '{}', '{}', 2, (select id from cohorts where name = 'WSL1')),
('Alexa Hart', '{}', '{}', 3, (select id from cohorts where name = 'WSL1')),
('Baylee Noe', '{}', '{}', 4, (select id from cohorts where name = 'WSL1')),
('Tiler Smith', '{}', '{}', 5, (select id from cohorts where name = 'WSL1')),
('Andrew Watters', '{}', '{}', 6, (select id from cohorts where name = 'WSL1')),
('Forest Alther', '{}', '{}', 7, (select id from cohorts where name = 'WSL1')),
('Ian Blake', '{}', '{}', 8, (select id from cohorts where name = 'WSL1')),
('Aaron Harris', '{}', '{}', 9, (select id from cohorts where name = 'WSL1')),
('Aaron Hatch', '{}', '{}', 10, (select id from cohorts where name = 'WSL1')),
('Taylor Montgomery', '{}', '{}', 11, (select id from cohorts where name = 'WSL1')),
('Ryan Whitecar', '{}', '{}', 12, (select id from cohorts where name = 'WSL1')),
('Steven Overton', '{}', '{}', 13, (select id from cohorts where name = 'WSL1')),
('Find A Group', '{}', '{}', 14, (select id from cohorts where name = 'WSL1'));
