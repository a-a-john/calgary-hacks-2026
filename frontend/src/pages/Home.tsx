import React from 'react';
import "./Home.css";
import backgroundImage from '../assets/mmbg.png';

const Home: React.FC = () => {
  return (
      <div 
        className="bg-section" style={{background: "backgroundImage"}}>
        <h2 className="welcome-text">Welcome to</h2>
        <h1 className="main-title">Memory Mosaic</h1>
        <p className="subtitle">A CalgaryHacks 2026 Project</p>
        <button className="cta-button">Read More</button>
        <h1 className="main-title">About</h1>
        <p className="text">
Memory Mosaic is a platform dedicated to preserving real-world moments from people around the globe on specific days in time. Users contribute snapshots of their daily lives, creating a collective archive that captures the texture of everyday experience.</p>
<p className="text">Over time, Memory Mosaic becomes a living historical record, preserving personal perspectives for future generations, much like journals and diaries have served historians as authentic windows into the past.</p>

<h1 className="main-title">Meet The Team</h1>
<p className='text'>Hi there! We're computer science students at the University of Calgary, and we created this website for CalgaryHacks 2026.</p>
<p className='text'>By: Matthew Cuffe, Ethan Ostapiuk, Adhira John, Salma A.</p>
    </div>
  );
};

export default Home;