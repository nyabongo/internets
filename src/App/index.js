
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import compose from 'recompose/compose';
import withDataplans from './with-dataplans';
import Dataplans from '../components/dataplans';
import ISPs from '../components/isp-select';
import CurrencySelect from '../components/currency-select';
import withFilter from './with-filter';
import withFx from './with-fx';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const {
      classes, theme, dataplans, updateFilters, filters,
      currency, setCurrency,
    } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <CurrencySelect onChange={setCurrency} value={currency} />
        <ISPs
          dataplans={dataplans}
          filters={filters}
          updateFilters={updateFilters}
        />
      </div>
    );
    const { mobileOpen } = this.state;
    return (
      <div id="App" className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
            Dataplans
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{ paper: classes.drawerPaper }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Dataplans dataplans={dataplans} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  filters: PropTypes.shape({}).isRequired,
  dataplans: PropTypes.arrayOf(PropTypes.object),
  updateFilters: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
};
App.defaultProps = {
  dataplans: [],
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withDataplans,
  withFx,
  withFilter,
)(App);
