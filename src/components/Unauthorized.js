import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
class Unauthorized extends Component {
    constructor() {
        super()
        this.state = {
            unauthorized: false
        }
    }
    componentDidMount() {
        axios.get('/api/is-logged-in').then(results => {
            if(results.data){
                if(results.data.isAllowed) {
                    this.setState({unauthorized: true})
                    this.props.history.push('/dashboard')
                } else {
                    this.setState({unauthorized: false})
                }
            } else {
                window.location = `${process.env.REACT_APP_BASE_URL}/api/auth`
            }
        })
    }
    render() {
        if(!this.state.unauthorized) {
            return (
                <div>
                    Y'ain't Authorized!
                </div>
            )
        } else {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
    }
}

export default withRouter(Unauthorized)
