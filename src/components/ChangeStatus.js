import React from 'react'
import glamorous from 'glamorous'

const ModalDiv = glamorous.div({
    height: '150px',
    width: '520px',
    backgroundColor: '#fff',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
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
    backgroundColor: props.type === 'yes' ? '#2aabe2' : props.type === 'no' ? '#e2362a' : 'white',
    color: props.type === 'yes' ? '#000' : props.type === 'no' ? '#fff' : 'black'
}))

const ButtonDiv = glamorous.div({
    display: 'flex',
    flexDirection: 'row',
})

function ChangeStatus(props) {
        return(
            <OuterDiv onClick={props.toggle}>
                <ModalDiv onClick={e => e.stopPropagation()}>
                    <Title>Is {props.cohortName} ready to be paired?</Title>
                    <ButtonDiv>
                        <Buttons type='yes' onClick={() => props.ready ? props.toggle() : props.updateStatus(true)}>Yes</Buttons>
                        <Buttons type='no' onClick={() => props.ready ? props.updateStatus(false) : props.toggle()}>No</Buttons>
                    </ButtonDiv>
                </ModalDiv>
            </OuterDiv>
        )
}

export default ChangeStatus