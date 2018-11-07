update students
set student_name = $1
where id = $2;
select * from students
where cohort_id = $3
order by id;