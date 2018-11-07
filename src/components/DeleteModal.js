import React from 'react'
import glamorous from 'glamorous'

const ModalDiv = glamorous.div({
    height: '150px',
    width: '450px',
    backgroundColor: '#fff',
    padding: '25px'
})

const OuterDiv = glamorous.div({
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const Title = glamorous.div({
    fontSize: '25px',
    marginBottom: '25px'
})

const Buttons = glamorous.div({
    height: '25px',
    fontSize: '15px',
    backgroundColor: '#2aabe2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px black solid',
    marginRight: '10px',
    borderRadius: '4px',
    padding: '12px',
    ':hover': {
        cursor: 'pointer'
    }
},
(props) => ({
    backgroundColor: props.type === 'cancel' ? '#2aabe2' : props.type === 'delete' ? '#e2362a' : 'white',
    color: props.type === 'cancel' ? '#000' : props.type === 'delete' ? '#fff' : 'black'
}))

const ButtonDiv = glamorous.div({
    display: 'flex',
    flexDirection: 'row',
})

function DeleteModal(props) {
    const {toDelete, deleteFn, cancel, id} = props
        return(
            <OuterDiv onClick={cancel}>
                <ModalDiv onClick={e => e.stopPropagation()}>
                    <Title>Are you sure you want to remove {toDelete}?</Title>
                    <ButtonDiv>
                        <Buttons type='delete' onClick={() => deleteFn(id)}>Delete</Buttons>
                        <Buttons type='cancel' onClick={cancel}>Cancel</Buttons>
                    </ButtonDiv>
                </ModalDiv>
            </OuterDiv>
        )
}

export default DeleteModal