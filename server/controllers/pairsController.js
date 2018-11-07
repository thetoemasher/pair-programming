const axios = require('axios')
const letsDoThis = require('../utils.js')

module.exports = {
    getPairs: (req, res) => {
        const db = req.app.get('db')
        const { cohort } = req.params
        db.get_cohort_by_id([cohort]).then(results => {
            letsDoThis(db, cohort).then(pairs => {
                let pairNames = pairs.join('\n')
                let payload = {
                    setHeaders: function (res, path, stat) {
                        res.set('Content-Type', 'application/json')
                    },
                    username: 'Pairs',
                    icon_emoji: ':devmtn-inverted:',
                    channel: `#${results[0].name}`,
                    text: `${pairNames}`
                }
                axios.post('https://hooks.slack.com/services/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', payload)
                res.status(200).send(pairNames)
            })
        })
    },
    addStudent: (req, res) => {
        const db = req.app.get('db')
        const cohort = +req.params.cohort
        const { name } = req.body
        db.get_students([cohort]).then(results => {
            let index = results.findIndex(s => s.student_name === 'Find A Group')
            if(index >= 0) {
                let id = results[index].id
                db.update_student([name, id, cohort]).then(results => {
                    res.status(200).send(results)
                })
            } else {
                db.add_student([name, 'Find A Group', cohort]).then(results => {
                    res.status(200).send(results)
                })
            }
        })
    },
    deleteStudent: (req, res) => {
        const db = req.app.get('db')
        const cohort = +req.params.cohort
        const id = +req.params.id
        db.get_students([cohort]).then(results => {

            let index = results.findIndex(s => s.student_name === 'Find A Group')
            if(index >= 0) {
                let findGroupId = results[index].id
                db.delete_students(id, findGroupId, cohort).then(results => {
                    res.status(200).send(results)
                })
            } else {
                db.update_student(['Find A Group', id, cohort]).then(results => {
                    res.status(200).send(results)
                })
            }
        })
    }
}