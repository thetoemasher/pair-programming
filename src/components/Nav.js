import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import CohortListNav from './CohortListNav'
import glamorous from 'glamorous'

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            cohortList: false,
            cohorts: []
        }
    }

    toggleList = (boo, height) => {
        this.setState({cohortList: boo, height})
    }
    render() {
        return(
            <div className="nav-bar">
                <img src={require('../logoonly.png')} alt='DevMountain Logo' />
                <h1 className='nav-header'>Pair Programming</h1>
                <div className='nav-link'>
                    <div className=''>
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                    {/* <div onMouseEnter={() => this.toggleList(true, '20px')} onMouseOut={() => this.toggleList(false, '150px')}>
                        Cohorts
                    {
                        this.state.cohortList
                        ?
                        <CohortListNav toggleList={this.toggleList}/>
                        :
                        null
                    }
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Nav