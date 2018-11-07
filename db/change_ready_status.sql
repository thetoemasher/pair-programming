update cohorts
set ready = $1
where id = $2
returning *;