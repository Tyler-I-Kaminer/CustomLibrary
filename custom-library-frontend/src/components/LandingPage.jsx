
import { Link } from 'react-router-dom';
import './LandingPage.css';
import shipGif from '../Assets/ship.gif';
import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [isSnowing, setIsSnowing] = useState(true); // Toggle snow state

    useEffect(() => {
        const snowContainer = document.getElementById('snow-container');
        if (isSnowing) {
            // Clear existing snowflakes
            snowContainer.innerHTML = '';
            // Generate snowflakes
            for (let i = 0; i < 100; i++) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
        
                // Random position
                snowflake.style.left = Math.random() * 100 + 'vw';
        
                // Random speed
                snowflake.style.animationDuration = 3 + Math.random() * 7 + 's';
        
                // Random size
                snowflake.style.width = snowflake.style.height = Math.random() * 10 + 5 + 'px';
        
                // Random shape
                const shapes = ['circle(50%)', 'polygon(50% 0%, 0% 100%, 100% 100%)', 'ellipse(50% 50%, 75% 50%)'];
                snowflake.style.clipPath = shapes[Math.floor(Math.random() * shapes.length)];
        
                snowContainer.appendChild(snowflake);
            }
        
        } else {
            // Stop snow by clearing container
            snowContainer.innerHTML = '';
        }
    }, [isSnowing]); // Rerun effect whenever isSnowing changes

    return (
        <div className="landing-container">
            <div id="snow-container"></div> {/* Snowflakes container */}
            <div className="ship-animation">
                <img
                    src={shipGif} // Replace with your ship image path
                    alt="Ship"
                    className="ship"
                />
            </div>
            <h1 className="welcome-message">Login or register to get started today</h1>
            <h2 className="invictus-phrase">Invictus Horizon: Inspired by Resilience, Driven by Excellence</h2>
            <div className="button-container">
                
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Register</Link>
                <a
                    href="linkedin.com/in/tyler-kaminer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn linkedin-btn"
                >
                    LinkedIn
                </a>
                <button onClick={() => setIsSnowing(!isSnowing)} className="btn toggle-snow-btn">
                    {isSnowing ? 'Stop Snow' : 'Start Snow'}
                </button>
            </div>
        
        </div>
    );
};

export default LandingPage;
