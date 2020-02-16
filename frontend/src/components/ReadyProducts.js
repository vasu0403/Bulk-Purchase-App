import React, {Component} from 'react'
import axios from 'axios'
import IndividualReadyProduct from './IndividualReadyProduct'
class ReadyProducts extends Component {
    constructor() {
        super()
        this.state = {
            vendorEmail: '',
            products: [],
            loading: true
        }
        this.fetchReadyProducts = this.fetchReadyProducts.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    fetchReadyProducts() {
        this.setState({
            loading: true
        })
        const vendor = {
            vendorEmail: this.state.vendorEmail
        }
        axios.post('http://localhost:4000/vendor/getReadyProducts', vendor)
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
        },() => this.fetchReadyProducts())
        
    }
    dispatch(id) {
        console.log('dispatching')
        const product = {
            id: id
        }
        axios.post('http://localhost:4000/vendor/dispatchProduct', product)
        .then(res => {
            this.fetchReadyProducts()
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        const ReadyProducts = this.state.products.map(product => <IndividualReadyProduct key = {product._id} item = {product} dispatch = {this.dispatch}/>)
        return (
            <div>
                {this.state.loading === true ? 
                <p>Loading ...</p>:
                <div className = 'container-fluid fill' style = {{marginTop: '60px'}}>
                    <div className ="flex-container">
                        {ReadyProducts}
                    </div>
                </div>

                }
            </div>
        )
    }
}

export default ReadyProducts