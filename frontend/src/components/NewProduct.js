import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
const styles = theme => ({

    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class NewProduct extends Component {
    constructor() {
        super()
        this.state = {
            productName: '',
            price: '',
            quantity: '',
            message: '',
            vendorEmail: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addProduct = this.addProduct.bind(this)
    }
    componentDidMount() {
        console.log(this.props.vendorEmail, 'outputting here')
        this.setState({ 
            productName: '',
            price: '',
            quantity: '',
            message: '',
            vendorEmail: this.props.vendorEmail
        });
    }
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state)
        });
    }
    addProduct(event) {
        event.preventDefault()
        let {productName, price, quantity} = this.state
        if(!productName) {
            this.setState({
                message: 'Product Name is a required field'
            })
            return
        }
        if(!price) {
            this.setState({
                message: 'Price is a required field'
            })
            return
        }
        if(!quantity) {
            this.setState({
                message: 'Quantity is a required field'
            })
            return
        }
        if(price < 0) {
            this.setState({
                message: 'Price cannot be negative'
            })
            return
        }
        if(quantity <=0 ) {
            this.setState({
                message: 'Quantity must be positive'
            })
            return
        }
        const Product = {
            vendorEmail: this.state.vendorEmail,
            status: 'valid',
            price: price,
            total: quantity,
            available: quantity,
            readyToDispatch: 'false',
            dispatched: 'false',
            productName: productName  
        }       
        axios.post('http://localhost:4000/vendor/addProducts', Product).then(res => {
            console.log(res.data)
            this.setState({
                message: res.data.message
            })
            if(res.data.success === 'True') {
                this.setState({
                    message: 'Product Added',
                    productName: '',
                    price: '',
                    quantity: ''
                })
            }
        })

    }
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                {/* <AddCircleIcon /> */}
                <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                New Product
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.addProduct}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        value={this.state.productName}
                        required
                        fullWidth
                        id="productName"
                        label="Product Name"
                        name="productName"
                        autoComplete="productName"
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="price"
                        value={this.state.price}
                        name="price"
                        variant="outlined"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        type='number'
                        min='0'
                        autoFocus
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        value={this.state.quantity}
                        required
                        fullWidth
                        id="quantity"
                        label="Quantity"
                        type='number'
                        min='1'
                        name="quantity"
                        autoComplete="quantity"
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    {this.state.message === 'Product Added' ? 
                        <Grid item xs={12} sm={12} className = 'text-center text-success font-weight-bold'>
                            {this.state.message}
                        </Grid>:
                        <Grid item xs={12} sm={12} className = 'text-center text-danger font-weight-bold'>
                            {this.state.message}
                        </Grid>
                    }
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Add Product
                </Button>
                </form>
            </div>
            </Container>
        );
    }
}
export default withStyles(styles)(NewProduct);

