import React, {Component} from 'react'
import { getJwt } from '../helpers/jwt'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import CustomerNavbar from './CustomerNavbar'
import FindProducts from './FindProducts'

class Customer extends Component {
    constructor() {
        super()
        this.state = {
            loading: true, 
            email: ''
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
            <div>
                <Router>
                    <CustomerNavbar />
                    <Switch>
                        {/* <Route path = '/customer/findProducts'
                        render={() => <NewProduct vendorEmail={this.state.email} />}
                        /> */}
                        <Route path = '/customer/findProducts'
                        render={() => <FindProducts customerEmail = {this.state.email}/>}
                        />
                        {/* <Route path = '/customer/yourOrders'
                        render={() => <AllProducts vendorEmail={this.state.email} />}
                        /> */}
                        <Route path = '/customer/yourOrders'>
                            previous orders here
                        </Route>
                        {/* <Route exact path = '/vendor/'
                            render={() => <NewProduct vendorEmail={this.state.email} />}
                        /> */}
                        <Route exact path = '/customer/' 
                        render={() => <FindProducts customerEmail = {this.state.email}/>}
                        />
                    </Switch>
                </Router>
            </div>
            }
        </div>
        )
    }
}

export default Customer