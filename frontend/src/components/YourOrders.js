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
    }
    fetchPreviousProducts() {
        const req = {
            customerEmail: this.state.customerEmail
        }
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
    render() {
        const previousProducts = this.state.products.map(product => <IndividualPreviousProduct item = {product}/>)
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