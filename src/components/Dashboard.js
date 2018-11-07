import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import glamorous from 'glamorous'
import AddModal from './AddModal'

const DashboardDiv = glamorous.div({
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})
const InnerDiv = glamorous.div({
    backgroundColor: '#fafafa',
    height: '65%',
    width: '75%',
    padding: '25px',
    overflow: 'auto',
})

const CohortsH2 = glamorous.h2({
    fontSize: '30px',
    fontWeight: '700'
})

const CohortList = glamorous.div({
    borderTop: '2px black solid',
    borderLeft: '2px black solid',
    borderRight: '2px black solid',
})

const CohortBox = glamorous.div({
    borderBottom: '2px black solid',
    padding: '15px 25px'
},
(props) => {
    return ({
    backgroundColor: props.index % 2 === 0 ? '#f0ffff' : '#fffff0'
})}
)

const CohortLink = glamorous(Link)({
    color: 'black',
    fontSize: '19px',
    textDecoration: 'none',
})

const AddButton = glamorous.div({
    fontSize: '15px',
    padding: '8px 10px',
    backgroundColor: '#2aabe2',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
        cursor: 'pointer'
    }
})

const TitleAndButton = glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    
})

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
          cohorts: [],
          cohortName: '',
          addCohort: false
        }
      }
    
      componentDidMount() {
        axios.get('/api/cohorts').then(results => {
          this.setState({cohorts: results.data})
        })
      }

      toggleAdd = () => {
        this.setState({addCohort: !this.state.addCohort, cohortName: ''})
      }

      handleCohortName = (e) => {
          this.setState({cohortName: e.target.value})
      }

      sendNewCohort = (e) => {
          e.preventDefault()
          axios.post('/api/cohort', {name: this.state.cohortName}).then(results => {
              this.setState({cohorts: results.data})
              this.toggleAdd()
          })
      }

    render() {
        let cohorts = this.state.cohorts.map((cohort , i) => {
            return (
                <CohortBox  key={cohort.id} index={i}>
                    <CohortLink to={`/cohort/${cohort.id}`}>{cohort.name}</CohortLink>
                </CohortBox >
            )
        })
        return (
            <DashboardDiv>
                    {
                        this.state.addCohort
                        &&
                        <AddModal
                            handleAdd={this.handleCohortName}
                            value={this.state.cohort}
                            toggle={this.toggleAdd}
                            sendAdd={this.sendNewCohort}
                            placeholder='Type Cohort Name'
                            toAdd='Cohort' />
                        
                    }
                <InnerDiv>
                    <TitleAndButton>
                    <CohortsH2>Cohorts</CohortsH2>
                    <AddButton onClick={this.toggleAdd}>Add A Cohort</AddButton>
                    </TitleAndButton>
                    <CohortList>
                        {cohorts}
                    </CohortList>
                </InnerDiv>
            </DashboardDiv>
        )
    }
}

export default Dashboard