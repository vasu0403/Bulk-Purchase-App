import React, {Component} from 'react'
import axios from 'axios'
import IndividualCustomerProduct from './IndividualCustomerProduct'
class FindProducts extends Component {
    constructor() {
        super()
        this.state = {
            customerEmail: '',
            products: [],
            loading: true,
            findProduct: '',
            sortBy: ''
        }
        this.fetchAllProducts = this.fetchAllProducts.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.search = this.search.bind(this)
        this.buyProduct = this.buyProduct.bind(this)
    }
    fetchAllProducts(req) {
        this.setState({
            loading: true
        })
        axios.post('http://localhost:4000/customer/fetchAllProducts', req)
            .then(res => {
                this.setState({
                    products: res.data.message,
                    loading: false,
                    sortBy: 'Sort By'
                }, () => {
                    console.log(this.state)
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    products: [],
                    loading: false,
                    sortBy: 'Sort By'
                })
            })
    }
    componentDidMount() {
        const req = {
            filter: "False",
            name: ""
        }
        this.setState({
            customerEmail: this.props.customerEmail,
            findProduct: ''
        },() => this.fetchAllProducts(req))
        
    }
    handleChange(event) {
        const {name, value, type} = event.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state)

            if(type == 'select-one') {
                if(value === 'Sort By') {
                    return
                }
                if(value === 'Price') {
                    let products = this.state.products
                    products.sort(function(a, b) {return a.price - b.price})
                    this.setState({
                        products: products
                    })
                    return
                }
                if(value === 'Quantity Left') {
                    let products = this.state.products
                    products.sort(function(a, b) {return a.available - b.available})
                    this.setState({
                        products: products
                    })
                    return
                }
                if(value === 'Rating') {
                    let products = this.state.products
                    console.log(products)
                    products.sort(function(a, b) {return a.vendorRating - b.vendorRating})
                    this.setState({
                        products: products
                    })
                    return
                }
            }
        }) 
    }
    handleQuantityChange(event, id) {
        console.log(id)
        const {value} = event.target
        this.setState({
            [id]: value
        }, () => {
            console.log(this.state)
        })
    }    
    buyProduct(event, id, available) {
        event.preventDefault()
        const required = this.state[id]
        const customerEmail = this.state.customerEmail
        if(required == undefined) {
            alert('You need to select a positive quantity of the product')
            return
        }
        else if(required > available) {
            alert('This much quantity is not available')
            return
        }
        const req = {
            id: id,
            required: required,
            customerEmail: customerEmail
        }
        axios.post('http://localhost:4000/customer/buyProduct', req)
            .then(res => {
                console.log(res)
                this.fetchAllProducts({filter: 'False', name: ''})
            })
    }
    search() {
        const {findProduct} = this.state
        const req = {
            filter: "True",
            name: findProduct
        }
        this.fetchAllProducts(req)
        
    }

    render() {
        const allProducts = this.state.products.map(product => <IndividualCustomerProduct key = {product._id} item = {product} handleQuantityChange = {this.handleQuantityChange} buyProduct = {this.buyProduct}/>)
        return (
            <div>
                {this.state.loading === true ? 
                <p>Loading ...</p>:
                    <div>
                        <br/>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                style={{width: '200px'}} 
                                placeholder='Search for products'
                                name='findProduct' 
                                onChange = {this.handleChange}
                            />
                            <br/>
                            <span className="input-group-btn">
                                <button 
                                    className="btn btn-default" 
                                    type="button"
                                    onClick = {() => this.search()}
                                >
                                        FIND
                                </button>
                                <button 
                                    className="btn btn-default" 
                                    type="button"
                                    onClick = {() => this.fetchAllProducts({filter: "False", name: ""})}
                                >
                                        ALL PRODUCTS
                                </button>
                                <select name = 'sortBy' value = {this.state.sortBy} className="custom-select mr-sm-2" id="inlineFormCustomSelect" style = {{width: '200px'}} onChange = {this.handleChange}>
                                    <option selected value = 'Sort By'>Sort By</option>
                                    <option value="Price">Price</option>
                                    <option value="Quantity Left">Quantity Left</option>
                                    <option value="Rating">Rating</option>
                                </select>
                            </span>     
                        </div>
                        
                        <div className = 'container-fluid fill' style = {{marginTop: '60px'}}>
                            <div className ="flex-container">
                                {allProducts}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default FindProducts