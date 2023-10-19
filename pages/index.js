import React, { useState, useEffect } from 'react';
import Loading from './components/loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading time (e.g., 5 seconds)
  useEffect(() => {
    // Simulate an asynchronous operation (e.g., data fetching)
    setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Adjust the time as needed

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading /> // Display the Loading component while loading
      ) : (
        <>
          <div>yoooooo</div>
          <a href="Loginpage">Loginpage</a>
        </>
      )}
    </>
  );
}
