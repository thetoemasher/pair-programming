update students
set notworkedwith = $2,
    workedwith = $3
where id = $1;