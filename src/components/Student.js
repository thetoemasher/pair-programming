import React, {Component} from 'react'
import DeleteModal from './DeleteModal'
import glamorous from 'glamorous'

const StudentBox = glamorous.div({
    borderBottom: '2px black solid',
    padding: '15px 25px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
(props) => {
    return ({
    backgroundColor: props.index % 2 === 0 ? '#f0ffff' : '#fffff0'
})}
)

const DeleteButton = glamorous.div({
    fontSize: '13px',
    padding: '5px 7px',
    backgroundColor: '#e2362a',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    alignItems: 'center',
    ':hover': {
        cursor: 'pointer'
    }
})


class Student extends Component {
    constructor() {
        super()
        this.state = {
            toDelete: false
        }
    }

    toggleToDelete = () => {
        this.setState({toDelete: !this.state.toDelete})
    }

    deleteStudent = (id) => {
        this.props.deleteStudent(id, this.toggleToDelete)
    }

    render() {
        const {student} = this.props
        return(
            <StudentBox index={this.props.index}>
            {
                this.state.toDelete
                ?
                (
                        <DeleteModal 
                            deleteFn={this.deleteStudent}
                            id={student.id} 
                            cancel={this.toggleToDelete}
                            toDelete={student.student_name} />
                )
                :
                null
            }
            <p>{student.student_name}</p>
                {
                    (student.student_name !== 'Find A Group')
                    ?
                    <DeleteButton onClick={this.toggleToDelete}>Delete Student</DeleteButton>
                    :   
                    null
                }
                </StudentBox>
        )
    }
}

export default Student