// import React from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';

// export default function Terms(){
//     return(
  //         <div>
  //             <h3>By clicking "I agree to the terms and conditions", you agree to the following terms and condition</h3>
  //             <br/>
  //             <p>1. You agree to give this project a 100/100 marks</p>
  //             <p>2. You agree that this project is cool ;)</p>
  //             <br/>
  //             <p><RouterLink to='/register'>click here</RouterLink> to go back to the registration page</p>
  //         </div>
  //     )
  // }
  
  import * as React from 'react';
  import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ termsChecked, setTermsChecked }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setTermsChecked(true);
    handleClose();
  };

  const handleDisagree = () => {
    setTermsChecked(false);
    handleClose();
  };

  return (
    <div>
      <Link  onClick={handleClickOpen} style={{fontSize:'16px',marginLeft:'0',paddingLeft:'0', cursor:'pointer'}}>
        Terms & Conditions
      </Link>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Terms & Conditions: "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            1. You agree to give this project a 100/100 rating.
            <br />
            2. You agree that this project is undeniably cool ;)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

