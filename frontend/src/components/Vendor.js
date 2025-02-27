import React, {Component} from 'react'
import { getJwt } from '../helpers/jwt'
import axios from 'axios'
import VendorNavbar from './VendorNavbar'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import NewProduct from './NewProduct'
import AllProducts from './AllProducts'
import ReadyProducts from './ReadyProducts'
import Dispatched from './Dispatched'

class Vendor extends Component {
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
            } else if(data.typeOfUser === 'customer') {
                alert('You are currenlyt logged in as a customer !')
                this.props.history.push('/customer')
            } else {
                this.setState({
                    loading: false,
                    email: data.email
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
                        <VendorNavbar/>
                        <Switch>
                            <Route path = '/vendor/newProduct'
                            render={() => <NewProduct vendorEmail={this.state.email} />}
                            />
                            <Route path = '/vendor/allProducts'
                            render={() => <AllProducts vendorEmail={this.state.email} />}
                            />
                            <Route path = '/vendor/readyToDispatch'
                            render={() => <ReadyProducts vendorEmail={this.state.email} />}
                            />
                            <Route path = '/vendor/dispatched'
                            render={() => <Dispatched vendorEmail={this.state.email} />}
                            />
                            <Route exact path = '/vendor/'
                            render={() => <NewProduct vendorEmail={this.state.email} />}
                            />
                        </Switch>
                    </Router>
                </div>
                }
            </div>
        )
    }
}

export default Vendor