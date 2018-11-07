delete from students
where cohort_id = $1;
delete from cohorts
where id = $1;