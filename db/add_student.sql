insert into students(student_name, workedwith, notworkedwith, cohort_id, ordered)
values ($1, '{}', '{}', $3, (SELECT COUNT(*) FROM students WHERE cohort_id = $3) + 1),($2, '{}', '{}', $3, (SELECT COUNT(*) FROM students WHERE cohort_id = $3) + 2);
update students
set workedwith = '{}'
where cohort_id = $3;
update students
set notworkedwith = '{}'
where cohort_id = $3;
select * from students
where cohort_id = $3
order by id;