import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container,Button, Spinner, Alert } from 'react-bootstrap';
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { setVerificationStatus } from '../store/auth'; // Import the action

const EmailVerify = () => {
  const dispatch = useDispatch();
  const verificationStatus = useSelector((state) => state.verification.status);
  const navigate = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);


   const sendEmailVerification = () => {
       // Show the spinner
        
       setShowSpinner(true);
       
    setVerificationMessage(
      'A verification email has been sent to your registered email address. Please check your email for the verification link. Thank you.'
    );
    

    // Send email verification request to Firebase
    const idToken = localStorage.getItem('token');
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBj8h0OYKwQY8xN_uzWw2Crp801EclmMJg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
        requestType: 'VERIFY_EMAIL',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        console.log('Verification email sent successfully');
          setShowSpinner(false);
        dispatch(setVerificationStatus('pending')); // Set status back to pending
        setTimeout(() => {
          // Check email verification status after a delay
          checkEmailVerificationStatus();
        }, 1000);
      })
      .catch((error) => {
        console.error('Error sending verification email:', error);
        setShowSpinner(false); // Hide the spinner
        setVerificationMessage('Error sending verification email. Please try again later.');
      });
  };

  const checkEmailVerificationStatus = () => {
      // Verify the email verification status using Firebase
    
    const idToken = localStorage.getItem('token');

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBj8h0OYKwQY8xN_uzWw2Crp801EclmMJg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
          const user = data.users[0];
        if (user.emailVerified) {
          dispatch(setVerificationStatus('verified')); // Set status to verified
          setTimeout(() => {
            navigate('/ComposeMail'); // Navigate after verification
          }, 2000); // Wait for 2 seconds before navigating
        } else {
          dispatch(setVerificationStatus('not-verified')); // Set status to not-verified
        }
      })
      .catch((error) => {
        console.error('Error checking email verification:', error);
        dispatch(setVerificationStatus('error')); // Set status to error
      });
  };

  useEffect(() => {
    // Check email verification status on component mount
    checkEmailVerificationStatus();
  }, []);

  return (
    <div>
      <div
        style={{
          minHeight: '100vh',
        }}
      >
        <Container className="py-4">
          {showSpinner ? (
            <div className="text-center">
              <Spinner animation="border" variant= "primary" />
              <p style={{marginTop: '20px' }}>Sending verification email...</p>
            </div>
          ) : (<div>
                      
              {verificationStatus === 'verified' && (
                <div className="text-center">
                    <BiCheckCircle size={150} color= "blue" />
                  <h1 style={{ marginTop: '20px' }}>Email verified!</h1>
                </div>
              )}
              {verificationStatus === 'not-verified' && (
                <div
                  className="py-4"
                  style={{
                    border: '2px solid black',
                    borderRadius: '10px',
                    margin: '20px',
                    padding: '20px',
                  }}
                >
                  <h3>Let's verify your email id</h3>
                  <Button onClick={sendEmailVerification} className="px-4 py-2">
                    Verify
                  </Button>
                </div>
              )}
              {verificationStatus === 'error' && (
                <Alert variant="danger">
                  Error checking email verification. Please try again later.
                </Alert>
              )}
              {verificationMessage && (
                <Alert variant="info" style={{ marginTop: '20px' }}>
                  {verificationMessage}
                </Alert>
              )}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default EmailVerify;