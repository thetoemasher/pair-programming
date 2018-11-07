update students
set workedwith = '{}',
    notworkedwith = '{}'
where cohort_id = $1;

select * from students
where cohort_id = $1
order by id;