"use client";

import React, { useEffect, useState } from 'react';
import './userheader.css';

function UserHeader() {
  const [dateTime, setDateTime] = useState({ date: '', time: 'Loading...' });
  const [loading, setLoading] = useState(true); // Loading state for time

  useEffect(() => {
    // Function to fetch date and time from World Time API
    const fetchDateTime = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata'); // Adjust the timezone if needed
        if (response.ok) {
          const data = await response.json();
          const date = new Date(data.datetime);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          setDateTime({ date: formattedDate, time: formattedTime });
          setLoading(false); // Set loading to false once data is fetched
        } else {
          console.error('Failed to fetch date and time');
        }
      } catch (error) {
        console.error('Error fetching date and time:', error);
      }
    };

    fetchDateTime(); // Initial fetch
    const intervalId = setInterval(fetchDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <header className="user-header">
      <div className="time">{loading ? 'Loading...' : dateTime.time}</div> {/* Conditionally render loading text */}
      <div className="date">{dateTime.date}</div>
    </header>
  );
}

export default UserHeader;
