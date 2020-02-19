import React, {Component} from 'react'
import axios from 'axios'
import IndividualPreviousProduct from './IndividualPreviousProduct'
class YourOrders extends Component {
    constructor() {
        super()
        this.state = {
            customerEmail: '',
            products: [],
            loading: true
        }
        this.fetchPreviousProducts = this.fetchPreviousProducts.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.changeOrder = this.changeOrder.bind(this)
    }
    fetchPreviousProducts() {
        const req = {
            customerEmail: this.state.customerEmail
        }
        this.setState({
            loading: true
        })
        axios.post('http://localhost:4000/customer/previousOrders', req)
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
        },() => this.fetchPreviousProducts())
    }
    handleQuantityChange(event, id) {
        console.log(id, 'here1')
        const {value} = event.target
        this.setState({
            [id]: value
        }, () => {
            console.log(this.state)
        })
    }
    changeOrder(event, productId, available, previousAmount, soldItemId) {
        const required = this.state[productId]
        const customerEmail = this.state.customerEmail
        if(required == undefined) {
            alert('You need to select a positive quantity of the product')
            return
        }
        available = available + previousAmount
        if(required > available) {
            alert('This much quantity is not available')
            return
        }
        const req = {
            productId: productId,
            soldItemId: soldItemId,
            required: required,
            previousAmount: previousAmount,
            customerEmail: customerEmail
        }
        axios.post('http://localhost:4000/customer/changeOrder', req)
            .then(res => {
                console.log(res)
                this.fetchPreviousProducts()
            })
    }
    render() {
        const previousProducts = this.state.products.map(product => <IndividualPreviousProduct item = {product} handleQuantityChange = {this.handleQuantityChange} changeOrder = {this.changeOrder}/>)
        console.log(previousProducts)
        return (
            <div>
                {this.state.loading === true ?
                <p>Loading ...</p>: 
                <div className = 'container-fluid fill' style = {{marginTop: '60px'}}>
                    <div className ="flex-container">
                        {previousProducts}
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default YourOrders