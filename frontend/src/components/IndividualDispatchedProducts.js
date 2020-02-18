import React, {Component} from 'react'
import axios from 'axios'

class IndividualDispatchedProducts extends Component {
    constructor() {
        super()
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        this.setState({
            vendorEmail: this.props.vendorEmail,
            product: this.props.item,
        }, () => {
            const req = {
                vendorEmail: this.state.vendorEmail,
                productId: this.state.product._id
            }
            axios.post('http://localhost:4000/vendor/getDispatchedProductsReview', req)
                .then(res => {
                    this.setState({
                        reviews: res.data.message,
                        loading: true
                    }, () => {
                        let allReviews = this.state.reviews.map(review => <li>{review.customerEmail}: {review.review}</li>)
                        this.setState({
                            allReviews: allReviews,
                            loading: false
                        })
                    })
                })
                .catch(err => {
                    this.setState({
                        reviews: [],
                        loading: false
                    })
                })
        })
    }
    render() {
        return (
            <div className = 'individual-product-container2 shadow-lg p-3 mb-5  rounded'>
            {this.state.loading == true ?
            <p>Loading</p>:
            <div className = 'flex-container2'>
                <div className = 'review-information-forVender'>
                    <h3>{this.props.item.productName}</h3>
                    PRICE: {this.props.item.price}
                    <br/>
                    QUANTITY: {this.props.item.total}
                </div>
                <div className = 'customer-review-for-vendor'>
                    CUSTOMER REVIEWS:<br/>
                    <ul>
                        {this.state.allReviews}
                    </ul>
                </div>
            </div>
            }
            </div>    
        )
    }
}

export default IndividualDispatchedProducts