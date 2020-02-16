import React, {Component} from 'react'

class IndividualReadyProduct extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className = 'individual-product-container1 shadow-lg p-3 mb-5  rounded'>
                    <h3>{this.props.item.productName}</h3>
                    PRICE: {this.props.item.price}
                    <br/>
                    QUANTITY: {this.props.item.total}
                    <div style = {{marginTop: '45px', bottom: '0', right: '0', textAlign: 'right', color: 'white'}}>
                        <button style = {{background: 'none', padding: '0', border: 'none', color: 'white'}} onClick = {() => this.props.dispatch(this.props.item._id)}>DISPATCH</button>
                    </div>
            </div>

        )
    }
}

export default IndividualReadyProduct