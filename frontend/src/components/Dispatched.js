import React, {Component} from 'react'
import axios from 'axios'
import IndividualDispatchedProducts from './IndividualDispatchedProducts'

class Dispatched extends Component {
    constructor() {
        super()
        this.state = {
            vendorEmail: '',
            products: [],
            loading: true
        }
        this.fetchDispatchedProducts = this.fetchDispatchedProducts.bind(this)
    }
    fetchDispatchedProducts() {
        this.setState({
            loading: true
        })
        const vendor = {
            vendorEmail: this.state.vendorEmail
        }
        axios.post('http://localhost:4000/vendor/getDispatchedProducts', vendor)
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
            vendorEmail: this.props.vendorEmail
        },() => this.fetchDispatchedProducts())
    }
    render() {
        const DispatchedProducts = this.state.products.map(product => <IndividualDispatchedProducts key = {product._id} item = {product}/>)
        return (
            <div>
            {this.state.loading === true ? 
            <p>Loading ...</p>:
            <div className = 'container-fluid fill' style = {{marginTop: '60px'}}>
                <div className ="flex-container">
                    {DispatchedProducts}
                </div>
            </div>
            }
        </div>
        )
    }
}
export default Dispatched