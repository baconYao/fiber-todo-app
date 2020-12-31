import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const routes = [
    { name: "主頁", link: "/" },
    { name: "個人檔案", link: "/profile" },
    { name: "數據統計", link: "/statistic" }
  ];

  // 非手機版的 header
  const iconMenu = (
    <React.Fragment>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        size="medium"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {routes.map((route, i) => {
          const { name, link } = route;
          return (
            <MenuItem
              key={`${name}-${i}`}
              onClick={(event) => {handleClose()}}    
              component={Link}
              to={link}
            >
              {name}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  )

  // TODO: 手機版的 header
  const drawerMenu = (
    <React.Fragment>

    </React.Fragment>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && 
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" color="secondary" className={classes.title}>
            Yao Todo-List
          </Typography>
          { !isMobile && auth && (
            iconMenu
            
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
