import React, {Component} from 'react'

class IndividualProduct extends Component {
    constructor() {
        super()
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event, id) {
        console.log(id)
        const {value} = event.target
        this.setState({
            [id]: value
        }, () => {
            console.log(this.state)
        })
    }
    render() {
        return (
            <div className = 'individual-product-container1 shadow-lg p-3 mb-5  rounded'>
                    <h3>{this.props.item.productName}</h3>
                    PRICE: {this.props.item.price}
                    <br/>
                    ITEMS REMAINING: {this.props.item.available}
                    <br/>
                    VENDOR: {this.props.item.vendorEmail}
                    <div style = {{marginTop: '32px', bottom: '0', right: '0', textAlign: 'right', color: 'white'}}>
                    <input type='number' min='0' style = {{width: '120px'}} placeholder = 'Enter Quantity' onChange = {(event) => this.props.handleQuantityChange(event, this.props.item._id)}/> 
                    {' '}<button style = {{background: 'none', padding: '0', border: 'none', color: 'white'}} onClick = {(event) => this.props.buyProduct(event, this.props.item._id, this.props.item.available)}>BUY</button>
                    </div>
            </div>

        )
    }
}

export default IndividualProduct