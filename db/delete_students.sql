delete from students
where id = $1;
delete from students
where id = $2;
update students
set workedwith = '{}'
where cohort_id = $3;
update students
set notworkedwith = '{}'
where cohort_id = $3;
select * from students
where cohort_id = $3
order by id;