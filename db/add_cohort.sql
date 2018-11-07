insert into cohorts(name, ready)
values ($1, false);
select * from cohorts
order by id;