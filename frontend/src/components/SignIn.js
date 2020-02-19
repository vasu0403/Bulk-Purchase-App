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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { getJwt } from '../helpers/jwt'

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

class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            'email': '',
            'password': '',
            'typeOfUser': 'Customer',
            'message': ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.signIn = this.signIn.bind(this)
    }
    componentDidMount() {
        const jwt = getJwt()
        if(!jwt) {
            this.props.history.push('/sign')
        }
        console.log(jwt)
        axios.get('http://localhost:4000/sign/authenticate', { headers: {authorization: `Bearer ${jwt}`}}).then(res => {
            const {data} = res  
            if(data.success === 'False') {
                this.props.history.push('/sign')
            } else if(data.typeOfUser === 'vendor') {
                this.props.history.push('/vendor')
            } else {
                this.props.history.push('/customer')
            }

        })
        this.setState({
            'email': '',
            'password': '',
            'typeOfUser': 'Customer',
            'message': ''
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

    signIn(event) {
        event.preventDefault()
        let {email, password, typeOfUser} = this.state
        if(!email) {
            this.setState({
                'message': 'Email is a required field !'
            })
            return
        } else if(!password) {
            this.setState({
                'message': 'Password is a required field !'
            })
            return
        }
        const User = {
            email,
            password
        }
        if(typeOfUser === 'Customer') {
            axios.post('http://localhost:4000/sign/signIn/customer', User)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        'message': res.data.message
                    })
                    console.log(res.data.success)
                    if(res.data.success === 'True') {
                        console.log('here')
                        localStorage.setItem('auth-token', res.data.accessToken)
                        this.props.history.push('/customer')
                    }   
                })
        } else {
            axios.post('http://localhost:4000/sign/signIn/vendor', User)
                .then(res => {
                    // console.log(res.data)
                    this.setState({
                        'message': res.data.message
                    })
                    if(res.data.success === 'True') {
                        localStorage.setItem('auth-token', res.data.accessToken)
                        this.props.history.push('/vendor')
                    }
                })
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit = {this.signIn}>
                <TextField
                    variant="outlined"
                    value={this.state.email}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChange}
                />
                <TextField
                    variant="outlined"
                    value={this.state.password}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange = {this.handleChange}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <input
                            type='radio'
                            name='typeOfUser'
                            value='Customer'
                            checked={this.state.typeOfUser === 'Customer'}
                            onChange={this.handleChange}
                        /> <b>Customer</b>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <input
                            type='radio'
                            name='typeOfUser'
                            value='Vendor'
                            checked={this.state.typeOfUser === 'Vendor'}
                            onChange={this.handleChange}
                        /> <b>Vendor</b>
                    </Grid>
                    {this.state.message === 'Logged In' ? 
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
                    Sign In
                </Button>
                </form>
            </div>
            </Container>
        );
    }
}

export default withStyles(styles)(SignIn);