import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi'; 
import { Stack } from "react-bootstrap";
import './ProgressLoader.css'; 



const ProgressLoader = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 25);
      } else {
        // Redirect to the home page after the progress reaches 100%
        navigate('/home');
        clearInterval(timer);
      }
    }, 1000);

    // Clear the timer if the component unmounts
    return () => clearInterval(timer);
  }, [navigate, progress]);


   useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
          <div className="loading-container">
          <div className="loading-content">
        <FiMail className="envelope-icon scale-icon" size={200} color="white" />

        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />

        <Stack direction={isSmaller ? "vertical" : "horizontal"} gap={2} className="justify-content-center m-3">
          <h1>Welcome to </h1>
          <h1 style={{ fontFamily: "Dancing Script,cursive", fontSize : isSmaller? "2.5rem": "3.0rem" }}
        className="text-primary font-weight-bolder">Hemrix Mail!</h1>
        </Stack>


        <div className="progress-bar-container">
          <ProgressBar striped variant="primary" now={progress} />
        </div>
      </div>
    </div>
  
  );
};

export default ProgressLoader;
