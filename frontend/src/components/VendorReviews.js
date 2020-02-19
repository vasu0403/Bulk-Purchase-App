import React, {Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom'
import IndividualReview from './IndividualReview'
class VendorReviews extends Component {
    constructor() {
        super()
        this.state = {
            vendorEmail: '',
            loading: true
        }
    }
    componentDidMount() {
        
        const { match: { params } } = this.props;
        this.setState({
            vendorEmail: params.id
        }, () => {
            this.setState({
                loading: true
            })
            const vendor = {
                vendorEmail: this.state.vendorEmail
            }
            axios.post('http://localhost:4000/customer/vendorReviews', vendor)
                .then(res => {
                    this.setState({
                        reviews: res.data.message,
                        loading: false
                    }, () => {
                        const allReviews = this.state.reviews.map(review => <IndividualReview item = {review}/>)
                        this.setState({
                            allReviews: allReviews
                        })
                        console.log(this.state)
                    });
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        reviews: [],
                        loading: false
                    })
                })
        })
    }
    render() {
        return (
            <div>
            {this.state.loading === true ? 
            <p>Loading ...</p>:
            <div className = 'container-fluid fill' style = {{marginTop: '60px'}}>
                <div className ="flex-container">
                    {this.state.allReviews}
                </div>
            </div>
            }
        </div>
        )
    }
}


export default VendorReviews