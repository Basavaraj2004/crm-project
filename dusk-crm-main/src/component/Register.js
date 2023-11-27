// // Register.js
// import React, { useState } from 'react';
// import { Button, TextField, Typography, Container, Paper, Grid, Link, Checkbox, FormControlLabel,inputProp } from '@mui/material';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import image1 from './final.jpg';
// import LoginIcon from '@mui/icons-material/AccountCircle';
// import { auth } from './firebase'; // Update the import path
// import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword  } from 'firebase/auth'; // Add this line
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { db } from './firebase'; // Make sure to update the import path

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [termsChecked, setTermsChecked] = useState(false);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleRegister = async () => {
//     if (!termsChecked) {
//       alert('Please accept the terms and conditions');
//       return;
//     }

//     // Check for the minimum password length
//     if (formData.password.length < 8) {
//       alert('Password must be at least 8 characters long');
//       return;
//     }

//     try {
//       const auth = getAuth();

//       // Check if the email is already registered
//       const emailQuery = query(collection(db, 'users'), where('email', '==', formData.email));
//       const emailQuerySnapshot = await getDocs(emailQuery);

//       if (!emailQuerySnapshot.empty) {
//         alert('Email is already registered. Please use a different email.');
//         return;
//       }

//       // Create a new user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;

//       // Save additional user data to Firestore
//       const userData = { email: user.email, uid: user.uid }; // Add any additional data you want to save
//       const docRef = await addDoc(collection(db, 'users'), userData);

//       console.log('User registered:', user);
//       console.log('User data saved to Firestore with ID:', docRef.id);

//       alert('Registration successful');
//       navigate('/login');
//     } catch (error) {
//       console.error('Error registering user:', error);
//       alert('Registration failed. Please try again.');
//     }
//   };
//   return (
//     <div style={{ backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/413/925/249/minimalism-abstract-pattern-digital-art-wallpaper-preview.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
//       <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <img src={image1} alt="Dusk CRM Logo" style={{ width: '260px', height: '60px', marginBottom: '20px', borderRadius: '5%' }} />
//           <LoginIcon style={{ fontSize: 50, color: 'black', marginBottom: '20px' }} />
//           <Typography component="h1" variant="h5">
//             Register
//           </Typography>
//           <form style={{ width: '100%', marginTop: 20 }}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               maxLength="5"
//               autoComplete="new-password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//             <FormControlLabel
//               control={<Checkbox checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />}
//               label="I agree to the"/><RouterLink to='/terms'>Terms and Conditions</RouterLink>
//             <Button
//               type="button"
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={handleRegister}
//               style={{ marginTop: 20 }}
//             >
//               Register
//             </Button>
//             <Grid container style={{ marginTop: 20 }}>
//               <Grid item>
//                 <Typography variant="body2">
//                   Already have an account? <RouterLink to="/">Login</RouterLink>
//                 </Typography>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default Register;




// Register.js
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import image1 from './final.jpg';
import LoginIcon from '@mui/icons-material/AccountCircle';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import AlertDialogSlide from './Terms';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '', // New field for username
    password: '',
    confirmPassword: '',
  });
  const [open, setOpen] = React.useState(false);
  const [termsChecked, setTermsChecked] = React.useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (!termsChecked) {
      alert('Please accept the terms and conditions');
      return;
    }
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }
    if (formData.username.trim() === '') {
      alert('Please enter a username');
      return;
    }

    try {
      const auth = getAuth();
      const emailQuery = query(collection(db, 'users'), where('email', '==', formData.email));
      const emailQuerySnapshot = await getDocs(emailQuery);

      if (!emailQuerySnapshot.empty) {
        alert('Email is already registered. Please use a different email.');
        return;
      }

      const usernameQuery = query(collection(db, 'users'), where('username', '==', formData.username));
      const usernameQuerySnapshot = await getDocs(usernameQuery);

      if (!usernameQuerySnapshot.empty) {
        alert('Username is already taken. Please choose a different username.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const userData = { email: user.email, username: formData.username, uid: user.uid };
      const docRef = await addDoc(collection(db, 'users'), userData);

      console.log('User registered:', user);
      console.log('User data saved to Firestore with ID:', docRef.id);

      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/413/925/249/minimalism-abstract-pattern-digital-art-wallpaper-preview.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={image1}
            alt="Dusk CRM Logo"
            style={{ width: '260px', height: '60px', marginBottom: '20px', borderRadius: '5%' }}
          />
          <LoginIcon style={{ fontSize: 50, color: 'black', marginBottom: '20px' }} />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form style={{ width: '100%', marginTop: 20 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={<Checkbox checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />}
              label="I agree to the" 
            />
            <AlertDialogSlide termsChecked={termsChecked} setTermsChecked={setTermsChecked} />

            </div>
            {/* <RouterLink to="/terms">Terms and Conditions</RouterLink> */}


            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRegister}
              style={{ marginTop: 20 }}
            >
              Register
            </Button>
            <Grid container style={{ marginTop: 20 }}>
              <Grid item>
                <Typography variant="body2">
                  Already have an account? <RouterLink to="/">Login</RouterLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;