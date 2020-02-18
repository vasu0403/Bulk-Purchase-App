import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class VendorNavbar extends Component{
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }
  logout() {
    localStorage.removeItem('auth-token')
    window.location.reload()
  }
  render() {
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style = {{fontSize: '15px', marginLeft: '330px'}}>
            <Link to='/customer/findProducts' style={{color: 'white', textDecoration: 'none'}}> 
                FIND PRODUCTS
            </Link>
        </IconButton>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style = {{fontSize: '15px', marginLeft: '180px'}}>
            <Link to='/customer/yourOrders' style={{color: 'white', textDecoration: 'none'}}>                
                YOUR ORDERS
            </Link>
        </IconButton>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style = {{fontSize: '15px', marginLeft: '180px'}}>
            <Link to='/customer/giveReview' style={{color: 'white', textDecoration: 'none'}}>                
                GIVE REVIEWS
            </Link>
        </IconButton>
          <Button color="inherit" style = {{fontSize: '15px', marginLeft: '250px'}} onClick={() => this.logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}
export default withStyles(styles)(VendorNavbar);
