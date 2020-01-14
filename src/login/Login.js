import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Send from '@material-ui/icons/Send';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {api} from '../environment/environment';
import CustomizedSnackbars from '../logMessages/LogMessages';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
    margin:'0 auto',
    marginTop:'4rem'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  active:{
      background:"#2E9F1B",
      color:"white"
  },
  border:{
      border:'2px solid #DEB056'
  },
  default:{
    background:"rgba(196,196,196,0.3)",
    color:"grey"
  },
  marginLeft:{
    marginLeft:'15px'
  },
  redColor:{
    color:'red'
  }
}));

export default function Login() {
  const classes = useStyles();
  const theme = useTheme();
  const [messagee, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("");
  const [openMessage, setOpenMessage] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [loginData, setLoginData] = React.useState({
    Email:'',
    Password:'',
  });
  const [signInData, setSignInData] = React.useState({
    Ime:'',
    Prezime:'',
    Region:'',
    Email:'',
    Password:'',
    Rola:'Korisnik'
  });
  const [PasswordField, setPasswordField] = React.useState("");
  const [active, setActive]=React.useState("active");
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  function handleActive(event)
  {
      if(event.target.textContent=="Login")
      setActive("active");
      else
      setActive("default");

  }
  const handleSaveSingIn=e=>{
    if(e.target.localName=="span")
    {
      e.target.attributes.name="add";
      e.target.name="add";
    }    
    if(e.target.attributes.name !=undefined || e.keyCode == 13)
    if(e.keyCode == 13 || e.target.name=="add" || e.target.attributes.name.nodeValue=='add' )
    {
      
      fetch(`${api}/login`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        mode:'cors',
        body:JSON.stringify(signInData)
    }).then(x=>x.json()).then(y=>{
        if(y.Id!==undefined)
        {
          sessionStorage.setItem("jwt", y.token);

          window.location.href="http://localhost:3000/home";
        }
        else if(y.message!=undefined){
          setMessage(y.message);
          setVariant("error");
          setOpenMessage(true);
          return;
        }
        else{
         setMessage("Unesite podatke u sva polja.");
          setVariant("error");
          setOpenMessage(true);
          return;
        }

    
    }).catch(z=>console.log(z));
    }
  }
  const handleSave=e=>{
    if(e.target.localName=="span")
    {
      e.target.attributes.name="send";
      e.target.name="send";
    }
   if(e.target.attributes.name !=undefined || e.keyCode == 13)
    if(e.keyCode == 13 || e.target.name=="send" || e.target.attributes.name.nodeValue=='send' )
    {
      if(loginData.Email=='' || loginData.Password=='')
      {
        setMessage("Unesite sva polja.");
          setVariant("error");
          setOpenMessage(true);
          return;
      }
    fetch(`${api}/login/userLogin`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        mode:'cors',
        body:JSON.stringify(loginData)
    }).then(x=>x.json()).then(y=>{
        if(y.message==null)
        {
          console.log(y);
          sessionStorage.setItem("jwt", y.token);
          sessionStorage.setItem("id", y.user.Id);
          sessionStorage.setItem("region", y.user.Region);
          sessionStorage.setItem("rola", y.user.Rola);
          sessionStorage.setItem("email", y.user.Email);
          if(y.user.Rola=="Admin")
          window.location.href="http://localhost:3000/homeAdmin";
          else
          window.location.href="http://localhost:3000/home";

        }
        else {
          setMessage(y.message);
          setVariant("error");
          setOpenMessage(true);
          return;
        }
    
    }).catch(z=>console.log(z));
    }
  }
  const handleChangeLoginData=e=>{
    setLoginData({...loginData, [e.target.id]:e.target.value})
  }
  const handleChangeSignInData=e=>{
    setSignInData({...signInData, [e.target.id]:e.target.value})
  }
  function handleChangeIndex(index) {
    setValue(index);
  }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const handleClose = (boool) => {
    setOpenMessage(boool);
}
  const fabs = [
    {
        color: 'primary',
        name:'send',
        className: classes.fab,
        icon: <Send name="send"/>,
        label: 'Edit',
        function:handleSave
      },
    {
      color: 'primary',
      name:'add',
      className: classes.fab,
      icon: <AddIcon name="add"/>,
      label: 'Add',
      function:handleSaveSingIn
    }
    

  ];
  return (
    <div className={clsx(classes.root, classes.border)} >
      <AppBar position="static" color="default" >
      {
            openMessage==true? <CustomizedSnackbars handleClose={handleClose} handleOpen={openMessage} message={messagee} variant={variant}/> : false
        }
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
          
        >
          <Tab id="1" className={active=='active' ? classes["active"]: classes["default"]} label="Login" {...a11yProps(0)} onClick={handleActive}/>
          <Tab id="2" className={active=='default' ? classes["active"]: classes["default"]} label="Sign In " {...a11yProps(1)} onClick={handleActive} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <TextField
         fullWidth
        id="Email"
        label="Email"
        className={classes.textField}
        value={loginData.email}
        placeholder="kondisa.info@hotmail.com"
        onChange={handleChangeLoginData}
        margin="normal"
        variant="filled"
        onKeyDown={handleSave}
      />
      <TextField
       fullWidth
        id="Password"
        label="Password"
        className={classes.textField}
        value={loginData.password}
        placeholder="**************"
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        onChange={handleChangeLoginData}
        onKeyDown={handleSave}
        margin="normal"
        variant="filled"
        type={values.showPassword ? 'text' : 'password'}

      />
       <br/>
            <br/>
            <br/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <TextField
        id="Ime"
        label="Ime"
        className={classes.textField}
        value={signInData.ime}
        placeholder="Haris"
        onChange={handleChangeSignInData}
        margin="normal"
        variant="filled"
        onKeyDown={handleSaveSingIn}
        required
      />
      <TextField
       
        id="Prezime"
        label="Prezime"
        className={clsx(classes.textField,classes.marginLeft)}
        value={signInData.prezime}
        placeholder="Čengić"
        onChange={handleChangeSignInData}
        margin="normal"
        variant="filled"
        required
        onKeyDown={handleSaveSingIn}

      />
       <TextField
         fullWidth
        id="Email"
        label="Email"
        className={classes.textField}
        value={signInData.email}
        placeholder="kondisa.info@hotmail.com"
        onChange={handleChangeSignInData}
        margin="normal"
        variant="filled"
        required
        onKeyDown={handleSaveSingIn}

      />
      <TextField
         fullWidth
        id="Region"
        label="Region"
        className={classes.textField}
        value={signInData.region}
        placeholder="SK"
        onChange={handleChangeSignInData}
        margin="normal"
        variant="filled"
        required
        onKeyDown={handleSaveSingIn}

      />
      <TextField
       fullWidth
        id="Password"
        label="Password"
        className={classes.textField}
        value={signInData.password}
        placeholder="**************"
        required
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        onChange={handleChangeSignInData}
        onKeyDown={handleSaveSingIn}

        margin="normal"
        variant="filled"
        type={values.showPassword ? 'text' : 'password'}

      />
            <br/>
      <br/>
      <br/>
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.label}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
          name={fab.name}
          onClick={fab.function}
        >
           
          <Fab name={fab.name} aria-label={fab.label} className={fab.className} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
        
      ))}
    </div>
  );
}