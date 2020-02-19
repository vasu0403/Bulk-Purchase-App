import React, {Component} from 'react'
import { getJwt } from '../helpers/jwt'
import axios from 'axios'

class Authenticate extends Component {
    constructor() {
        super()
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
                this.props.history.push('/vendor')
            } else {
                this.props.history.push('/customer')
            }

        })
    }
    render() {
        return (
            null
        )
    }
}
export default Authenticate