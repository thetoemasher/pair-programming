module.exports = {
    getCohorts: (req, res) => {
        let db = req.app.get('db')
        db.get_cohorts().then(results => {
            res.status(200).send(results)
        })
    },
    getStudentsByCohort: (req, res) => {
        let db = req.app.get('db')
        let id = +req.params.id
        db.get_students_by_cohort(id).then( results => {
            res.status(200).send(results)
        })
    },
    getCohortById: (req, res) => {
        let db = req.app.get('db')
        let id = +req.params.id
        db.get_cohort_by_id(id).then( results => {
            res.status(200).send(results[0])
        })
    },
    deleteCohort: (req, res) => {
        let db = req.app.get('db')
        let id = + req.params.id
        db.delete_cohort(id).then(() => {
            res.sendStatus(200)
        })
    },
    changeReadyStatus: (req, res) => {
        let db = req.app.get('db')
        let id = +req.params.id
        let {status} = req.query
        let ready = null
        if(status === 'true') ready = true
        if(status === 'false') ready = false
        db.change_ready_status([ready, id]).then(results => {
            res.status(200).send(results[0])
        })
    },
    addCohort: (req, res) => {
        let db = req.app.get('db')
        let {name} = req.body
        if(name) {
            db.add_cohort([name]).then( results => {
                res.status(200).send(results)
            })
        } else {
            res.status(400).send('must include a name')
        }
    },
}