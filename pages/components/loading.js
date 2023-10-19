import React, { useState, useEffect } from 'react';
import styles from '../../styles/loading.module.css';

function Loading() {
  const [showLoading, setShowLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.log("Loading component is displayed.");

    // Simulate a minimum loading time of 5 seconds
    const minimumLoadingTime = 5000; // 5 seconds
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);

      if (countdown === 1) {
        clearInterval(timer);
        setShowLoading(false); // Hide the loading component after 5 seconds
        console.log("Loading component is hidden after 5 seconds.");
      }
    }, 1000); // Update countdown every second

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
      console.log("Timer cleared.");
    };
  }, [countdown]);

  if (!showLoading) {
    return null; // Do not render the component until showLoading becomes false
  }

  return (
    <div className={styles['loading-container']}>
      <div className={styles['loading-spinner']}>
        <div className={styles['loading-circle']}></div>
        <div className={styles['loading-circle']}></div>
        <div className={styles['loading-circle']}></div>
      </div>
      <p className={styles['loading-text']}>Loading... ({countdown}s)</p>
    </div>
  );
}

export default Loading;
