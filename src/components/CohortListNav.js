import React, {Component} from 'react'
import glamorous from 'glamorous'

const List = glamorous.div({
    position: 'absolute'
})

class CohortListNav extends Component {
    constructor() {
        super()
        this.state = {
            cohorts: []
        }
    }

    render() {
        return (
            <List>
                <div>CohortList</div>
                <div>CohortList</div>
                <div>CohortList</div>
                <div>CohortList</div>
                <div>CohortList</div>
                <div>CohortList</div>
                <div>CohortList</div>
                <div>CohortList</div>
            </List>
        )
    }
}

export default CohortListNav