import React, {Component} from 'react'

class IndividualReviewProduct extends Component {
    constructor() {
        super()
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        
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
                        <textarea placeholder = 'Enter review' style = {{width: '550px', height: '120px', resize: 'none'}}/>
                        <input type = 'number' placeholder = 'Give rating' min = '0' max = '5' style = {{width: '100px'}}/>
                        {/* <button style = {{marginLeft: '10px', backgroundColor: '#0276FD'}}>Submit review</button> */}
                        <button type="button" class="btn btn-primary btn-sm" style = {{marginLeft: '10px'}}>Submit Review</button>
                    </div>
                </div>
                    
            </div>

        )
    }
}

export default IndividualReviewProduct