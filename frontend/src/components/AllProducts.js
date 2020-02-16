import React, {Component} from 'react'
import axios from 'axios'
import IndividualProduct from './IndividualProduct'

class AllProducts extends Component {
    constructor() {
        super()
        this.state = {
            vendorEmail: '',
            products: [],
            loading: true
        }
        this.removeProduct = this.removeProduct.bind(this)
        this.fetchCurrentProducts = this.fetchCurrentProducts.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
    }
    fetchCurrentProducts() {
        this.setState({
            loading: true
        })
        const vendor = {
            vendorEmail: this.state.vendorEmail
        }
        axios.post('http://localhost:4000/vendor/getCurrentProducts', vendor)
            .then(res => {
                this.setState({
                    products: res.data.message,
                    loading: false
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
        },() => this.fetchCurrentProducts())
        
    }
    removeProduct(id) {
        const product = {
            id: id
        }
        axios.post('http://localhost:4000/vendor/removeCurrentProduct', product)
        .then(res => {
            this.fetchCurrentProducts()
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        const allProducts = this.state.products.map(product => <IndividualProduct key = {product._id} item = {product} remove = {this.removeProduct}/>)
        return (
            <div>
                {this.state.loading === true ? 
                <p>Loading ...</p>:
                <div className = 'container-fluid fill' style = {{marginTop: '60px'}}>
                    <div className ="flex-container">
                        {allProducts}
                    </div>
                </div>

                }
            </div>

        )
    }
}

export default AllProducts