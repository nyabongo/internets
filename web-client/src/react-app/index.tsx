import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  createStyles, withStyles, Theme, Drawer, CssBaseline,
  AppBar, Toolbar, Typography, IconButton, ListItem, ListItemText, withWidth,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { init, DBProvider } from '../db';
import HomeNav from './components/home-nav';
import PageRouter from './components/page-router';
import ServiceProviderList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';
import Database from '../db/dyna-db';
import { Data } from '../db/dyna-db/data';
import LoadingIndicator from './components/loading-indicator';
import PlansTable from './components/view-widgets/plans/table';
import { Filter, FilterProvider, reducer } from '../db/filter';

const styles = createStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    right: 'auto',
  },
  nav: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      width: '0',
    },
    // padding: '4px 2px',
  },
  openNav: {
    [theme.breakpoints.up('sm')]: {
      width: '320px',
    },
    padding: '4px 2px',
  },
  drawerPaper: {
    width: '320px',
  },
  content: {
    paddingTop: '64px',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: '-320px',
    },
    // marginLeft: '-320px',
  },
  contentWithClosedNav: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
}));

interface ParamTypes {
  providerId: string;
  showServices?: boolean;
  showPlans?: boolean;
  serviceId?: string;
  planId?: string;
}

export interface View {
  showPage: (pageName: string, params?: ParamTypes) => void;
}


const App = ({ classes, width }: { classes: any; width: string }) => {
  const [page, setPage] = useState('');
  const [sheetId] = useState('1rvw0C2CB0cgEOjDxMDK_kcwDxzlu7Xt_yXX04Jg5pg4');
  const [data, setData] = useState();
  const [providerId, setProviderId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [planId, setPlanId] = useState('');
  const [showServices, setShowServices] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [filter, dispatch] = useReducer(reducer, new Filter());
  const [openDrawer, setDrawer] = useState(true);

  const view: View = {
    showPage: (pageName: string, params?: ParamTypes) => {
      setPage(pageName);
      if (params) {
        setProviderId(params.providerId);
        filter.setProvider(params.providerId || '');
        setServiceId(params.serviceId || '');
        filter.setService(params.serviceId || '');
        setPlanId(params.planId || '');
        setShowServices(params.showServices || false);
        setShowPlans(params.showPlans || false);
      } else {
        setProviderId('');
        setServiceId('');
        setPlanId('');
      }
    },
  };
  useEffect(() => {
    init(sheetId).then((result) => {
      const fetchedData = result as Data;
      setData(new Database(fetchedData));
    }).catch(() => {
      // likely already initialised
    });
  }, [sheetId]);

  filter.setDispatch(dispatch);
  const isTabletOrSmaller = ['xs', 'sm'].includes(width);
  return (
    <BrowserRouter>
      <FilterProvider value={filter}>
        <DBProvider value={data}>
          <PageRouter view={view} />
          {data ? (
            <div className={classes.root}>
              <CssBaseline />
              <Drawer
                variant={isTabletOrSmaller ? 'temporary' : 'persistent'}
                className={`${classes.nav} ${openDrawer ? `${classes.contentShift} ${classes.openNav}` : ''}`}
                classes={{ paper: classes.drawerPaper }}
                open={openDrawer}
                onClose={() => { setDrawer(false); }}
              >
                <ListItem button divider onClick={() => { setDrawer(false); }}>
                  <ListItemText primary=" " />
                  <ChevronLeftIcon />
                </ListItem>
                {page === 'home' && <HomeNav />}
                {page === 'providers' && <ServiceProviderList />}
                {page === 'provider' && (
                  <ProviderPage
                    providerId={providerId}
                    serviceId={serviceId}
                    planId={planId}
                    showServices={showServices}
                    showPlans={showPlans}
                  />
                )}
              </Drawer>
              <main className={`${classes.content} ${openDrawer ? classes.contentShift : classes.contentWithClosedNav}`}>
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    {!openDrawer && (
                      <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => { setDrawer(true); }}
                      >
                        <MenuIcon />
                      </IconButton>
                    )}
                    <Typography variant="h6" color="inherit" noWrap>
                      Internets
                    </Typography>
                  </Toolbar>
                </AppBar>
                {!planId && <PlansTable />}
              </main>
            </div>
          ) : (
            <div style={{ padding: '256px 0' }}>
              <LoadingIndicator />
            </div>
          )
          }
        </DBProvider>
      </FilterProvider>
    </BrowserRouter>
  );
};

export default withWidth()(withStyles(styles)(App));
