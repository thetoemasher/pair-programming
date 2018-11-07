import React, {Component} from 'react'
import axios from 'axios'
import Student from './Student'
import DeleteModal from './DeleteModal'
import AddModal from './AddModal'
import ChangeStatus from './ChangeStatus'
import glamorous from 'glamorous'

const MainDiv = glamorous.div({
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
    fontWeight: '700',
    marginRight: '20px'
})

const StudentList = glamorous.div({
    borderTop: '2px black solid',
    borderLeft: '2px black solid',
    borderRight: '2px black solid',
})

const Buttons = glamorous.div({
    fontSize: '15px',
    padding: '7px 9px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    ':hover': {
        cursor: 'pointer'
    }
},
(props) => ({
    backgroundColor: props.type === 'add' ? '#2aabe2' : props.type === 'delete' ? '#e2362a' : 'white',
    color: props.type === 'add' ? '#000' : props.type === 'delete' ? '#fff' : 'black'
}))

const ButtonsDiv = glamorous.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px'
})

const Title = glamorous.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
})

const ReadyIcon = glamorous.div({
    fontSize: '20px',
    color: '#2ae261',
})
const NotReadyIcon = glamorous.div({
    fontSize: '20px',
    color: '#e2362a',
})

class Cohort extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            students: [],
            cohort: {},
            addStudent: false,
            deleteCohort: false,
            studentName: '',
            updateStatus: false,
        }
    }

    componentDidMount() {
        axios.get(`/api/cohort/${this.props.match.params.id}`).then(results => {
            let cohort = results.data
                axios.get(`/api/students/${this.props.match.params.id}`).then(res => {
                    let students = res.data
                    this.setState({
                        students,
                        cohort,
                        })
                })
        })
    }

    deleteCohort = (id) => {
        axios.delete(`/api/cohort/${id}`).then(() => {
            this.props.history.push('/dashboard')
        })
    }    

    toggleAddStudent = () => {
        this.setState({addStudent: !this.state.addStudent})
    }

    sendStudent = () => {
        if(this.state.studentName) {
            axios.post(`/api/students/add/${this.state.cohort.id}`, {name: this.state.studentName}).then(results => {
                this.setState({students: results.data, studentName: ''})
                this.toggleAddStudent()
            })
        }
    }

    deleteStudent = (id, toggle) => {
        axios.delete(`/api/students/delete/${this.state.cohort.id}/${id}`).then(results => {
            this.setState({students: results.data})
            toggle()
        })
    }

    updateStatus = (status) => {
            axios.put(`/api/cohort/${this.state.cohort.id}/ready?status=${status}`).then(results => {
                this.setState({cohort: results.data})
                this.toggleUpdateStatus()
            })
       
    }

    toggleDeleteCohort = () => {
        this.setState({deleteCohort: !this.state.deleteCohort})
    }

    handleStudentName = (e) => {
        this.setState({studentName: e.target.value})
    }

    toggleUpdateStatus = () => {
        this.setState({updateStatus: !this.state.updateStatus})
    }

    render() {
        const { cohort } = this.state
        let students = this.state.students.map((student, i) => {
            return (
                <Student 
                    key={student.id}
                    student={student}
                    deleteStudent={this.deleteStudent}
                    index={i} />
            )
        })
        return (
            <MainDiv>
                {
                    this.state.deleteCohort &&
                        <DeleteModal 
                                deleteFn={this.deleteCohort}
                                id={cohort.id} 
                                cancel={this.toggleDeleteCohort}
                                toDelete={cohort.name} />
                                }
                {
                    this.state.addStudent &&
                    <AddModal
                        handleAdd={this.handleStudentName}
                        value={this.state.studentName}
                        toggle={this.toggleAddStudent}
                        sendAdd={this.sendStudent}
                        placeholder='Type Student Name'
                        toAdd='Student' />
                        }
                {
                    this.state.updateStatus &&
                    <ChangeStatus
                    ready={cohort.ready}
                    updateStatus={this.updateStatus}
                    cohortName={cohort.name}
                    toggle={this.toggleUpdateStatus} />
                    
                }
                <InnerDiv>
                    <Title>
                        <CohortsH2>Students in {cohort.name}</CohortsH2>
                        {cohort.ready ?
                            <ReadyIcon><i className="far fa-check-circle"></i></ReadyIcon>
                        :
                            <NotReadyIcon><i className="far fa-times-circle"></i></NotReadyIcon>
                        }
                    </Title>
                    <ButtonsDiv>
                        <Buttons type='add' onClick={this.toggleAddStudent}>Add Student</Buttons>
                        <Buttons type='add' onClick={this.toggleUpdateStatus}>Change Status</Buttons>
                        <Buttons type='delete' onClick={this.toggleDeleteCohort}>Delete Cohort</Buttons>
                    </ButtonsDiv>
                    <StudentList>
                        {students}
                    </StudentList>
                </InnerDiv>
            </MainDiv>
        )
    }
}
export default Cohort