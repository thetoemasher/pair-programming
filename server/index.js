require('dotenv').config()


const express = require('express')
    , bodyParser = require('body-parser')
    , path = require('path')
    , massive = require('massive')
    , CronJob = require('cron').CronJob
    , axios = require('axios')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Devmtn = require('devmtn-auth')
    , DevmtnStrategy = Devmtn.Strategy
    , devmtnAuthConfig = require('./devmtnAuthConfig.js')
    , letsDoThis = require('./utils.js')
    , pairsController = require('./controllers/pairsController.js')
    , cohortsController = require('./controllers/cohortsController.js')
    , RedisStore = require('connect-redis')(session)


const app = express();

const {
    CONNECTION_STRING, 
    SERVER_PORT,
    SESSION_SECRET,
} = process.env


massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log('connected')
}).catch(err => {
    console.error('there was an error connecting to db:', err)
})

app.use(bodyParser.json())
app.use(cors())

app.use(session({
    secret: SESSION_SECRET,
    // store: new RedisStore({ host: 'redis_server' }),
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/../build'))

passport.use('devmtn', new DevmtnStrategy(devmtnAuthConfig, function(jwtoken, user, done) {
    let isInstructor = Devmtn.checkRoles(user, 'instructor')
        let isLead = Devmtn.checkRoles(user, 'lead_instructor')
        let isMentor = Devmtn.checkRoles(user, 'mentor')
        let isAdmin = Devmtn.checkRoles(user, 'admin')
        if(isInstructor || isLead || isMentor || isAdmin) {
           user.isAllowed = true
        } else {
            user.isAllowed = false
        }
        done(null, user)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})


new CronJob('0 0 13 * * 1-4', function() {
        const db = app.get('db')
        db.get_cohorts().then(cohorts => {
            cohorts.forEach(cohort => {
                if(cohort.ready) {
                    letsDoThis(db, cohort.id).then(pairs=> {
                        let pairNames = pairs.join('\n')
    
                        let payload = {
                            setHeaders: function (res, path, stat) {
                                res.set('Content-Type', 'application/json')
                            },
                            username: 'Pairs',
                            icon_emoji: ':devmtn-inverted:',
                            channel: `#${cohort.name}`,
                            text: `${pairNames}`
                        }
                        axios.post('https://hooks.slack.com/services/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', payload)
                    })
                }
            })
        })
}, null, true, 'America/Boise')


app.get('/api/is-logged-in', (req, res) => {
    res.status(200).send(req.user)
})

app.get('/api/auth', passport.authenticate('devmtn'), (req, res) => {})
app.get('/api/auth/callback', passport.authenticate('devmtn'), (req, res) => {
    if(req.user.isAllowed) {
        res.redirect(`${process.env.FRONT_END_URL}#/dashboard`)
    } else {
        res.redirect(`${process.env.FRONT_END_URL}#/dashboard`)
    }
})


app.get('/api/students/pairs/:cohort', pairsController.getPairs)
app.post('/api/students/add/:cohort', pairsController.addStudent)
app.delete('/api/students/delete/:cohort/:id', pairsController.deleteStudent)


app.get('/api/cohorts', cohortsController.getCohorts)
app.get('/api/students/:id', cohortsController.getStudentsByCohort)
app.get('/api/cohort/:id', cohortsController.getCohortById)
app.put('/api/cohort/:id/ready', cohortsController.changeReadyStatus)
app.post('/api/cohort', cohortsController.addCohort)
app.delete('/api/cohort/:id', cohortsController.deleteCohort)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// })

app.listen(SERVER_PORT, () => console.log('You are who you chose to be', SERVER_PORT))
