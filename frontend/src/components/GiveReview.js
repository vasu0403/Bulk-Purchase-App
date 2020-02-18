import React, {Component} from 'react'
import axios from 'axios'
import IndividualReviewProduct from './IndividualReviewProduct'

class GiveReview extends Component {
    constructor() {
        super()
        this.state = {
            customerEmail: '',
            products: [],
            loading: true
        } 
    }
    fetchProductsForReview() {
        const req = {
            customerEmail: this.state.customerEmail
        }
        axios.post('http://localhost:4000/customer/productsForReview', req)
            .then(res => {
                this.setState({
                    products: res.data.message,
                    loading: false
                }, () => {
                    console.log(this.state)
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    products: [],
                    loading: false
                })
            })
    }
    componentDidMount() {
        this.setState({
            customerEmail: this.props.customerEmail,
        },() => this.fetchProductsForReview())
    }
    render() {
        const reviewProducts = this.state.products.map(product => <IndividualReviewProduct item = {product}/>)
        return (
            <div>
                {this.state.loading === true ?
                <p>Loading ...</p>: 
                <div className = 'container-fluid fill' style = {{marginTop: '60px'}}>
                    <div className ="flex-container">
                        {reviewProducts}
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default GiveReview