import React, {Component} from 'react'

class IndividualProduct extends Component {
    constructor() {
        super()
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
                    <div style = {{marginTop: '40px', bottom: '0', right: '0', textAlign: 'right', color: 'white'}}>
                        <button style = {{background: 'none', padding: '0', border: 'none', color: 'white'}}>REMOVE</button>
                    </div>
            </div>

        )
    }
}

export default IndividualProduct