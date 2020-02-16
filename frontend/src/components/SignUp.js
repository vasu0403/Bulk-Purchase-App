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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            'firstName': '',
            'lastName': '',
            'email': '',
            'password': '',
            'typeOfUser': 'Customer',
            'message': ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }
    componentDidMount() {
        this.setState({
            'firstName': '',
            'lastName': '',
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
        });
    }
    register(event) {
        event.preventDefault()
        
        let {firstName, lastName, email, password, typeOfUser} = this.state
        if(!firstName) {
            this.setState({
                'message': 'First Name is a required field !'
            })
            return
        } else if(!lastName) {
            this.setState({
                'message': 'Last Name is a required field !'
            })
            return
        } else if(!email) {
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
        const newUser = {
            firstName,
            lastName,
            email,
            password
        }
        if(typeOfUser === 'Customer') {
            axios.post('http://localhost:4000/sign/register/customer', newUser)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        'message': res.data.message
                    })
                })
        } else {
            axios.post('http://localhost:4000/sign/register/vendor', newUser)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        'message': res.data.message
                    })
                })
        }
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
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
                Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.register}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        value={this.state.firstName}
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        value={this.state.lastName}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        value={this.state.email}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange = {this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        value={this.state.password}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange = {this.handleChange}
                    />
                    </Grid>
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
                    {this.state.message === 'Account Created' ? 
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
                    Sign Up
                </Button>
                </form>
            </div>
            </Container>
        );
    }
}
export default withStyles(styles)(SignUp);

