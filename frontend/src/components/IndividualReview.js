import React, {Component} from 'react'
import axios from 'axios'

class IndividualDispatchedProducts extends Component {
    constructor() {
        super()
        this.state = {
            loading: false
        }
    }
    render() {  
        return (
            <div className = 'individual-product-container2 shadow-lg p-3 mb-5  rounded'>
            {this.state.loading == true ?
            <p>Loading</p>:
            <div className = 'flex-container2'>
                <div className = 'review-information-forVender'>
                    <h3>{this.props.item.productName}</h3>
                    CUSTOMER: {this.props.item.customerEmail}
                </div>
                <div className = 'customer-review-for-customer'>
                    <h6>REVIEW:</h6>
                    {this.props.item.review}
                </div>
            </div>
            }
            </div>    
        )
    }
}

export default IndividualDispatchedProducts