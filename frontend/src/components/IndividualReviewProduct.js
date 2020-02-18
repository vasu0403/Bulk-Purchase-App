import React, {Component} from 'react'

class IndividualReviewProduct extends Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        
    }
    render() {
        
        return (     
            <div className = 'individual-product-container2 shadow-lg p-3 mb-5  rounded'>
                <div className = 'flex-container2'>
                    <div className = 'review-information'>
                        <h3>{this.props.item.ProductName}</h3>
                        PRICE: {this.props.item.price}
                        <br/>
                        AMOUNT BOUGHT: {this.props.item.boughtAmount}
                        <br/>
                        VENDOR: {this.props.item.vendorEmail}
                    </div>
                    <div className = 'customer-review'>
                        <textarea placeholder = 'Enter review' style = {{width: '550px', height: '120px', resize: 'none'}} onChange = {(event) => this.props.handleReviewChange(event, this.props.item.itemNo)}/>
                        <input type = 'number' placeholder = 'Give rating' min = '0' max = '5' style = {{width: '100px'}} onChange = {(event) => this.props.handleReviewChange(event, this.props.item.itemNo)}/>
                        <button type="button" className="btn btn-primary btn-sm" style = {{marginLeft: '10px'}} onClick = {(event) => this.props.submitReview(event, this.props.item.itemNo, this.props.item.productId, this.props.item.ProductName, this.props.item.vendorEmail, this.props.item.soldItemId)}>Submit Review</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default IndividualReviewProduct