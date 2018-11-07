import React from 'react'
import glamorous from 'glamorous'

const ModalDiv = glamorous.div({
    height: '180px',
    width: '400px',
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

const InputField = glamorous.input({
    height: '25px',
    width: '95%',
    fontSize: '15px',
    display: 'block',
    outline: 'none',
    padding: '0 5px',
    marginBottom: '25px',
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
    backgroundColor: props.buttonType === 'add' ? '#2aabe2' : props.buttonType === 'cancel' ? '#e2362a' : 'white',
    color: props.buttonType === 'add' ? '#000' : props.buttonType === 'cancel' ? '#fff' : 'black'
})
)

const ButtonDiv = glamorous.div({
    display: 'flex',
    flexDirection: 'row',
})

function AddCohort(props) {
    return (
        <OuterDiv onClick={props.toggle}>
            <ModalDiv onClick={e => e.stopPropagation()}>
            <Title>Add A {props.toAdd}</Title>
                    <InputField value={props.value} placeholder={props.placeholder} onChange={props.handleAdd} />
                    <ButtonDiv>
                        <Buttons buttonType='add' onClick={props.sendAdd}>Add</Buttons>
                        <Buttons buttonType='cancel' onClick={props.toggle}>Cancel</Buttons>
                    </ButtonDiv>
            </ModalDiv>
        </OuterDiv>
    )
}

export default AddCohort