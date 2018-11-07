update cohorts
set webhook = $1
where id = $2
returning *;