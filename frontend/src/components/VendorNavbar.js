import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function VendorNavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style = {{fontSize: '15px', marginLeft: '250px'}}>
            <Link to='/vendor/newProduct' style={{color: 'white', textDecoration: 'none'}}> 
                NEW PRODUCT
            </Link>
        </IconButton>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style = {{fontSize: '15px', marginLeft: '80px'}}>
            <Link to='/vendor/allProducts' style={{color: 'white', textDecoration: 'none'}}>                
                ALL PRODUCTS
            </Link>
        </IconButton>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style = {{fontSize: '15px', marginLeft: '80px'}}>
            <Link to='/vendor/readyToDispatch' style={{color: 'white', textDecoration: 'none'}}>
                READY TO DISPATCH
            </Link>
        </IconButton>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style = {{fontSize: '15px', marginLeft: '80px'}}>
            <Link to='/vendor/dispatched' style={{color: 'white', textDecoration: 'none'}}>
                DISPATCHED
            </Link>
        </IconButton>
        <Button color="inherit" style = {{fontSize: '15px', marginLeft: '240px'}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}