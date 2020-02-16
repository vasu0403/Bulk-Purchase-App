import React, {Component} from 'react'
import { getJwt } from '../helpers/jwt'
import axios from 'axios'

class Customer extends Component {
    constructor() {
        super()
        this.state = {
            loading: true, 
            emial: ''
        }
    }
    componentDidMount() {
        const jwt = getJwt()
        if(!jwt) {
            this.props.history.push('/sign')
        }
        console.log(jwt)
        axios.get('http://localhost:4000/sign/authenticate', { headers: {authorization: `Bearer ${jwt}`}}).then(res => {
            const {data} = res  
            if(data.success === 'False') {
                this.props.history.push('/sign')
            } else if(data.typeOfUser === 'vendor') {
                alert('You are currenlyt logged in as a vendor !')
                this.props.history.push('/vendor')
            } else {
                this.setState({
                    email: data.email,
                    loading: false
                })
            }

        })
    }
    render() {
        return (
            <div>
                {this.state.loading === true ? 
                    <p>Loading ...</p>:
                    <p>I am a Customer</p>
                }
            </div>
        )
    }
}

export default Customer