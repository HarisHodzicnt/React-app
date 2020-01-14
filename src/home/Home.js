import React,{useState,useEffect} from 'react';
import Save from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {api} from '../environment/environment';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import CustomizedSnackbars from '../logMessages/LogMessages';
import Email from '@material-ui/icons/Email';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import Report from '../report/Report';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
    MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import 'date-fns';
import Rute from '../user/Rute';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop:'4rem',
    },
    dense: {
        marginTop: theme.spacing(2),
      },

    box:{
        padding:'20px',
        textAlign:'center',
        marginLeft:'.7rem',
        marginTop:'.4rem',
        // '&:hover':{
        //     cursor:'pointer',
        //     transform:'scale(1.05,1.05)',
        //     boxShadow:'10px 7px 29px -19px rgba(0,0,0,0.75)',
        //     borderRadius:'20%'
        // }
    },
    fab:{
        float:'right',
        marginRight:'2.5rem',
        marginTop:'30px',
        marginBottom:'25px'
    },
    fabsFullWidth:{
     marginTop:'7.8rem'
    },
    fabsSmallWidth:{
     marginTop:'1.6rem'
    },
    gorivoFullWidth:{
    marginLeft:'2.5rem'
    },
    gorivoSmallWidth:{
    marginLeft:'0rem'
    },  
    gradFullWidth:{
        marginLeft:'6.8rem'
        },
    gradSmallWidth:{
        marginLeft:'0rem'
        },
    nazivFullWidth:{
        marginLeft:'1.7rem'
        },
    nazivSmallWidth:{
        marginLeft:'0rem'
        },
    textField:{
        height:'48px',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    kilometraza:{
        display:'inline-block',
        marginTop:'32px', 
         marginRight:'15px'
    },
    nazivBenzFull:{
        display:'block',
        marginTop:'32px',
        textAlign:'left', 
        marginLeft:'35px'
    },
    nazivBenzSmall:{
        display:'block',
        marginTop:'32px',
    },
    gradFull:{
        display:'block',
        marginTop:'32px',
        textAlign:'left', 
        marginLeft:'60px'
    },
    gradSmall:{
        display:'block',
        marginTop:'32px',
    },
    kilometrazaText:{
        marginLeft:'15px'
    }
}));
function Home()
{
    const matches = useMediaQuery('(min-width:738px)');
    const matchesHeight = useMediaQuery('(min-width:1000px)');
    const classes=useStyles();
    const id=sessionStorage.getItem("id");
    const region=sessionStorage.getItem("region");
    const [emailOpen,setOpenEmail]=useState(false);
			console.log("radi");
    useEffect(x=>{
        fetch(`${api}/izvjestaj/datum/${id}`).then(x=>x.json()).then(y=>{
            if(y.message=='Nema zapisa')
            {
                return 0;
            }
            var date1=new Date(y.VrijemePolaska.toString());
            var date2=new Date(y.VrijemeDolaska.toString());
             var time1=`${date1.getHours()}`.padStart(2, '0')+':'+`${date1.getMinutes()}`.padStart(2, '0')+':'+`${date1.getSeconds()}`.padStart(2, '0');
            var time2=`${date2.getHours()}`.padStart(2, '0')+':'+`${date2.getMinutes()}`.padStart(2, '0')+':'+`${date2.getSeconds()}`.padStart(2, '0');
            setselectedStart(date1);
            setselectedEnd(date2);
            var komentari=[];
            if(y.PocetnaKilometraza==0)
            {
                y.PocetnaKilometraza='';
            }
            if(y.KonacnaKilometraza==0)
            {
                y.KonacnaKilometraza='';
            }
            if(y.Komentar!='')
            {
                var commentString='';
                for(var i=0;i<y.Komentar.length;i++)
                {
                    if(y.Komentar[i]==',')
                    {
                        komentari.push(commentString);
                        commentString='';
                    }
                    else{
                        commentString+=y.Komentar[i];
                    }
                }
            }
            if(y.NazivRute!='' && y.NazivRute!=null)
            {
                var routesString='';
                var selectedRoutes=[];
                var comments1={};
                for(var i=0;i<y.NazivRute.length;i++)
                {
                    if(y.NazivRute[i]==',')
                    {
                        selectedRoutes.push(routesString);                
                        routesString='';
                    }
                    else{
                        routesString+=y.NazivRute[i];
                    }
                }
                for(var i=0;i<selectedRoutes.length;i++)
                {
                    comments1[selectedRoutes[i]]=komentari[i];                   
                }
                setComments(comments1);
                setSelectedRoute(selectedRoutes);
                
            }

            setData({

                ...data,
                PocetnaKilometraza:y.PocetnaKilometraza,
                KonacnaKilometraza:y.KonacnaKilometraza,
                VrijemePolaska:y.VrijemePolaska,
                VrijemeDolaska:y.VrijemeDolaska,
                Date:y.Date,
                BrojRute:y.BrojRute
        })
    });
      },[]);
    var date=new Date();
    var time= date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const [selectedStart, setselectedStart] = React.useState(date);
    const [selectedRoute, setSelectedRoute] = React.useState([]);
    const [message, setMessage] = React.useState(date);
    const [variant, setVariant] = React.useState(date);
    const [openMessage, setOpenMessage] = React.useState(date);
    const [selectedEnd, setselectedEnd] = React.useState(date);
    const [comments, setComments] = React.useState('');
    const [report, setReport]=React.useState([]);

    const [data,setData]=useState({
       UserId:id,
       PocetnaKilometraza:'',
       KonacnaKilometraza:'',
       VrijemePolaska:'',
       VrijemeDolaska:'',
       Date:'',
       Podatci:'',
       BrojRute:'',
       Komentar:'',
       KolicinaGoriva:'',
       Grad:'',
       NazivBenzinskePumpe:''

    })
    const [emailData,setEmailData]=useState({
        MailTo:'',
        MailFrom:sessionStorage.getItem("email"),
        Password:'',
        Subject:'',
        Body:'',
        Html:''
 
     })
     const handleChange = name => event => {
        setEmailData({ ...emailData    , [name]: event.target.value });
      };
    const handleOpenEmail=()=>{
        var today=new Date();
        var datum=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        fetch(`${api}/izvjestaj/${datum}/${datum}/${id}`).then(x=>x.json()).then(y=>{setReport(y); console.log(y); setOpenEmail(true);});
        setOpenEmail(true);
        
    }
    const handleCloseEmail = () => {
        setOpenEmail(false);
      };
    function handleStartChange(date) {
        setselectedStart(date);
        HandleChange(date,'VrijemePolaska');
      }
      function handleEndChange(date) {
        setselectedEnd(date);
        HandleChange(date, 'VrijemeDolaska');
      }
      function HandleChange(e,string){
        var date=new Date();
        var currentDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        if(e.target!=null)
        {
            if(e.target.id=="PocetnaKilometraza" || e.target.id=="KonacnaKilometraza")
            {
                if(e.target.value=='')
                var integer=e.target.value;
                else
                var integer=parseInt(e.target.value);
         
                setData({...data,['Date']:currentDate , [e.target.id]:integer})
            }
            else{
                setData({...data,['Date']:currentDate , [e.target.id]:e.target.value})

            }
           

        }
        else{
            var time=e.getHours()+':'+e.getMinutes()+':'+e.getSeconds();
            setData({...data,['Date']:currentDate , [string]:time})
        }
      }
      function HandleSave(){
        for (var key in data) {
            if(data[key]=='')
            {
                var date=new Date();
                if(key=='PocetnaKilometraza' || key=='KonacnaKilometraza')
                data[key]=0;
               else if(key=='Date')
                    data[key]=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
               else if(key=='BrojRute')
                    data[key]=0;
               else if(key=='Komentar')
                    data[key]='';
               else if(key=='Podatci')
               data[key]=null;
                
                
            else{
                var currentTime=date.getHours()+':'+(date.getMinutes()+1)+':'+date.getSeconds();
                data[key]=currentTime;

            }
        }
        }
        fetch(`${api}/izvjestaj`, {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            mode:'cors',
            body:JSON.stringify(data)
        }).then(x=>x.json()).then(y=>{
            setMessage("Uspješno spremljeno.");
            setVariant("success");
            setOpenMessage(true);
          
            
      }
            ).catch(z=>{
                setMessage("Greška u redu.");
            setVariant("error");
            setOpenMessage(true);
            });
      }
      const handleSaveEmail=()=>{
        var html=document.getElementById("report").innerHTML;
        emailData.Html=html;
        console.log(html);
        fetch(`${api}/izvjestaj/mails`, {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            mode:'cors',
            body:JSON.stringify(emailData)
        }).then(x=>x.json()).then(y=>{
            console.log(y);
            setMessage("Uspješno poslano.");
            setVariant("success");
            setOpenMessage(true);
            setOpenEmail(false);
            
      }
            ).catch(z=>{
                setMessage("Mail se nije poslao, provjerite podatke.");
            setVariant("error");
            setOpenMessage(true);
            });
      }
      
      const handleClose = (boool) => {
        setOpenMessage(boool);
    }
    const handleSelectedRoute=(e)=>{
        if(e.target.value!=undefined)
        {
            setData({...data,BrojRute:e.target.name});
            setSelectedRoute(e.target.value);
        }
    }
    const HandleChangeComments=(e)=>{    
            setComments({...comments,
                [e.target.id]:e.target.value 
            })
            setData({...data, Podatci:comments});   

    }
    const HandleSaveComments=()=>{
       
        for (var key in data) {
            if(data[key]=='')
            {
                var date=new Date();
                if(key=='PocetnaKilometraza' || key=='KonacnaKilometraza')
                data[key]=0;
               else if(key=='Date')
                    data[key]=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
               else if(key=='BrojRute')
                    {
                        data[key]=0;
                    }
               else if(key=='Podatci')
                    {
                        data[key]=null;
                    }
               else if(key=='Komentar')
                    {
                        data[key]='';
                    }
            else{
                var currentTime=date.getHours()+':'+(date.getMinutes()+1)+':'+date.getSeconds();
                data[key]=currentTime;

            }
        }
        }
        fetch(`${api}/izvjestaj`, {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            mode:'cors',
            body:JSON.stringify(data)
        }).then(x=>x.json()).then(y=>{
            setMessage("Uspješno spremljeno.");
            setVariant("success");
            setOpenMessage(true);
          
            
      }
            ).catch(z=>{
                setMessage("Greška u redu.");
            setVariant("error");
            setOpenMessage(true);
            });
      }
    return(
        <div>
        {
            openMessage==true? <CustomizedSnackbars handleClose={handleClose} handleOpen={openMessage} message={message} variant={variant}/> : false
        }
            
            <Grid container justify="center" style={{marginTop:'2rem'}}>
                    <Grid item xs={7} style={{textAlign:'center'}}>
                        <div>
                            <span className={classes.kilometraza} >Početna kilometraža: </span>
                            <span className={classes.kilometrazaText} ><TextField
        id="PocetnaKilometraza"
        className={classes.textField}
        value={data.PocetnaKilometraza}
        placeholder="192 300 km"
        margin="normal"
        variant="filled"
        required
        onChange={HandleChange}
        InputProps={{
            className: classes.textField
          }}
      />
      </span>
                        </div>
                   
            <div>
             <span className={classes.kilometraza}>Konačna kilometraža: </span>
             <span className={classes.kilometrazaText}><TextField
        id="KonacnaKilometraza"
        className={classes.textField}
        value={data.KonacnaKilometraza}
        placeholder="192 700 km"
        margin="normal"
        variant="filled"
        onChange={HandleChange}
        required
        InputProps={{
            className: classes.textField
          }}
      />
      </span>
      
                        </div>
      <div className={matches==true ? classes.gorivoFullWidth : classes.gorivoSmallWidth}>
        <span className={classes.kilometraza}>Količina goriva:</span>
             <span className={classes.kilometrazaText}><TextField
        id="KolicinaGoriva"
        className={classes.textField}
        value={data.KolicinaGoriva}
        placeholder="22l"
        margin="normal"
        variant="filled"
        onChange={HandleChange}
        InputProps={{
            className: classes.textField
          }}
      />
      </span>
                        </div>
        <Grid container justify="center">
            <Grid item xs={12} sm={4} md={3}>
            <span className={matches==true ? classes.nazivBenzFull : classes.nazivBenzSmall}>Benzinska P: </span>
             <span className={classes.kilometrazaText}><TextField
        id="NazivBenzinskePumpe"
        className={classes.textField}
        value={data.NazivBenzinskePumpe}
        placeholder="Gasprom"
        margin="normal"
        variant="filled"
        onChange={HandleChange}
        InputProps={{
            className: classes.textField
          }}
      />
      </span>

      
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
             <span className={matches==true ? classes.gradFull : classes.gradSmall}>Grad: </span>
             <span className={classes.kilometrazaText}><TextField
        id="Grad"
        className={classes.textField}
        value={data.Grad}
        placeholder="Sarajevo"
        margin="normal"
        variant="filled"
        onChange={HandleChange}
        InputProps={{
            className: classes.textField
          }}
      />
      </span>
      
            </Grid>
        </Grid>
                        
                        
                      
                </Grid>
                <Grid item xs={5} style={{textAlign:'center'}}>
                        <div>
                            <span className={classes.kilometraza} >Polazak: </span>
                            <span className={classes.kilometrazaText} >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="VrijemePolazak"
                                label="Odaberite vrijeme"
                                value={selectedStart}
                                onChange={handleStartChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                                
      </span>
                        </div>
                   
            <div>
             <span className={classes.kilometraza}>Dolazak: </span>
             <span className={classes.kilometrazaText}>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <KeyboardTimePicker
          margin="normal"
          id="VrijemeDolaska"
          label="Odaberite vrijeme"
          value={selectedEnd}
          onChange={handleEndChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
          </MuiPickersUtilsProvider>
      </span>
      <div style={{width:'100%'}} className={matchesHeight? classes.fabsFullWidth : classes.fabsSmallWidth}>
                <Fab color="primary" onClick={HandleSave} className={classes.fab}>

            <Save />
        </Fab>

        </div>
                        </div>         
                </Grid>
                
                <hr style={{width: '100%'}}/>
                <h1 style={{textAlign:'center', width:'100%'}}>RUTE</h1>
                
                <Grid container justify="center" style={{marginTop:'1.3rem'}}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(x=>{
                    return(
                        <Grid key={x} item sm={2} xs={4} style={{textAlign:'center', position:'static'}}>
                        <Rute selectedRoute={handleSelectedRoute} broj={x} region={region}/>
                    </Grid>
                    )
                })}
               
               </Grid>
            </Grid>
            <hr style={{width: '100%', marginTop:'1rem'}}/>
            <Grid container justify="center" style={{marginTop:'2rem'}}>
                    {
                        selectedRoute.map(x=>{
                            return(
                               <div key={x}> 
                                <Grid item xs={12} sm={12} >
                                    <span>Putanja  {x}: </span>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id={x}
                                        label="Komentar"
                                        placeholder="Upišite Komentar"
                                        className={classes.textField}
                                        margin="normal"
                                        onChange={HandleChangeComments}
                                        variant="filled"
                                        value={comments[x]}
                                    />
                                </Grid>
                                </div>
                            )
                        })
                    }

                </Grid>
          
                   {
                       selectedRoute.length >0 ? <Fab color="primary" onClick={HandleSaveComments} className={classes.fab}>
                       <Save />
                   </Fab> : false
                   }
                    
                    <Fab color="default" onClick={handleOpenEmail} className={classes.fab}>
                        <Email style={{color:'black'}}/>
                    </Fab>
                    <Dialog open={emailOpen} onClose={handleCloseEmail} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dnevni izvjestaj</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Slanje dnevnog izvjestaja putem E-maila
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email To"
            type="email"
            fullWidth
            value={emailData.EmailTo}
            onChange={handleChange("MailTo")}
          />
          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            fullWidth
            value={emailData.Subject}
            onChange={handleChange("Subject")}
          />
          <TextField
        id="body"
        label="Body"
        multiline
        fullWidth
        rowsMax="16"
        value={emailData.EmailTo}
        onChange={handleChange("Body")}
        className={classes.body}
        margin="normal"
        helperText="Poštovani, šaljem Vam dnevni izvjestaj."
        variant="outlined"
      />
           <TextField
            margin="dense"
            id="password"
            label="Password ( vašeg emaila )"
            type="password"
            fullWidth
            value={emailData.Password}
            onChange={handleChange("Password")}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmail} color="default">
            Cancel
          </Button>
          <Button  onClick={handleSaveEmail} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <div id="report" >
      <Report  data={report} />
      </div>
        </div>
    )
}
export default Home;