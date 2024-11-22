import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Ensure this CSS file is created for styling.
import backgroundImage from './imgald.png'; // Ensure the image is inside the LandingPage folder.

// const LandingPage = () => {
//   return (
//     <div className="landing-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="overlay">
//         <div className="content-wrapper">
//           <h1>Welcome to Our Alzheimer’s Support Platform</h1>
//           <p>Alzheimer's disease is a progressive disorder that causes brain cells to degenerate and die. It affects memory, thinking, and behavior, impacting millions of individuals and their loved ones. Join us to access helpful resources and supportive tools.</p>

//           <div className="button-group">
//             <Link to="/login" className="button">Login</Link>
//             <Link to="/signup" className="button">Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <h1>Alzheimer's Detection</h1>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>
      <div className="landing-content">
        <h2>Welcome to Alzheimer's Support Platform</h2>
        <p>
          Learn more about early detection, support tools, and resources for
          Alzheimer’s patients and caregivers.
        </p>
      </div>
    </div>
  );
};

// export default LandingPage;

export default LandingPage;
