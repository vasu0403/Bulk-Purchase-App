import React, {Component} from 'react'

class IndividualPreviousProduct extends Component {
    constructor() {
        super()
        this.state = {}
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        if(this.props.item.status === 'Invalid') {
            this.setState({
                status: 'Cancelled :(',
                color: 'black'
            })
        } else if(this.props.item.readyToDispatch === false) {
            this.setState({
                status: 'Waiting',
                color: 'white'
            })
        } else if(this.props.item.dispatched === false) {
            this.setState({
                status: 'Placed',
                color: 'yellow'
            })
        } else {
            this.setState({
                status: 'Dispatched',
                color: '#00C000'
            })
        }
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
                    <h3>{this.props.item.ProductName}</h3>
                    PRICE: {this.props.item.price}
                    <br/>
                    AMOUNT PURCHASED: {this.props.item.boughtAmount}
                    <br/>
                    ITEMS REMAINING: {this.props.item.available}
                    <br/>
                    VENDOR: {this.props.item.vendorEmail}
                    <div style = {{marginTop: '22px', bottom: '0', right: '0', textAlign: 'right', color: this.state.color}}>
                    {/* <br/> */}
                    status: {this.state.status}
                    {this.state.status == 'Waiting' ?
                    <div><input type='number' min='0' style = {{width: '120px'}} placeholder = 'Change Quantity' onChange = {(event) => this.props.handleQuantityChange(event, this.props.item.productId)}/> <button style = {{background: 'none', padding: '0', border: 'none', color: 'white'}} onClick = {(event) => this.props.changeOrder(event, this.props.item.productId, this.props.item.available, this.props.item.boughtAmount, this.props.item.soldItemId)}>CHANGE</button></div>:
                    null
                    }
                    </div>
            </div>
 
        )
    }
}

export default IndividualPreviousProduct