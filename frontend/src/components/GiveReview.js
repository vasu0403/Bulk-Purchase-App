import React, {Component} from 'react'
import axios from 'axios'
import IndividualReviewProduct from './IndividualReviewProduct'

class GiveReview extends Component {
    constructor() {
        super()
        this.mapping = {}
        this.state = {
            customerEmail: '',
            products: [],
            loading: true
        } 
        this.handleReviewChange = this.handleReviewChange.bind(this)
        this.submitReview = this.submitReview.bind(this)
    }
    fetchProductsForReview() {
        this.setState({
            loading: true
        })
        const req = {
            customerEmail: this.state.customerEmail
        }
        axios.post('http://localhost:4000/customer/productsForReview', req)
            .then(res => {
                this.setState({
                    products: res.data.message,
                    loading: false
                }, () => {
                    for(var i = 0 ; i < this.state.products.length; i++) {
                        this.mapping[this.state.products[i].itemNo] = this.state.products[i].productId
                    }
                    console.log(this.mapping)
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
    submitReview(event, id, productId, productName, vendorEmail, soldItemId) {
        console.log(soldItemId, 'finally')
        const review = this.state[`review ${id}`]
        const rating = this.state[`rating ${id}`]
        if(rating == undefined) {
            alert('rating is a required field')
            return
        }
        if(rating > 5 || rating < 0) {
            alert('rating must be between 0 and 5')
            return
        }
        if(review == undefined) {
            alert('review is a required field')
            return
        }
        const req = {
            productName: productName,
            productId: productId,
            vendorEmail: vendorEmail,
            customerEmail: this.state.customerEmail,
            review: review,
            rating: rating,
            soldItemId: soldItemId 
        }
        axios.post('http://localhost:4000/customer/postReview', req)
            .then(res => {
                console.log(res)
                this.fetchProductsForReview()
            })

    }
    componentDidMount() {
        this.setState({
            customerEmail: this.props.customerEmail,
        },() => this.fetchProductsForReview())
    }
    handleReviewChange(event, id) {
        if(event.target.type === 'textarea') {
            const temp = `review ${id}`
            this.setState({
                [temp]: event.target.value
            }, () => {
                console.log(this.state)
            })
        } else {    
            const temp = `rating ${id}`
            this.setState({
                [temp]: event.target.value
            }, () => {
                console.log(this.state)
            })
        }
    }
    render() {
        const reviewProducts = this.state.products.map(product => <IndividualReviewProduct key = {product.itemNo} item = {product} handleReviewChange = {this.handleReviewChange} submitReview = {this.submitReview}/>)
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