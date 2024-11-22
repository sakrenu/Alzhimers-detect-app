import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Ensure this CSS file is created for styling.

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

export default LandingPage;

// // export default LandingPage;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       const response = await fetch('/api/news');
//       const data = await response.json();
//       setArticles(data.articles);
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-800 to-gray-900 text-white p-4">
//       <nav className="flex justify-between items-center p-4 border-b-2 border-blue-600">
//         <h1 className="text-2xl font-bold">Alzheimer's Detection</h1>
//         <div className="space-x-4">
//           <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
//           <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign Up</Link>
//         </div>
//       </nav>
//       <div className="max-w-2xl mx-auto mt-10 text-center">
//         <h2 className="text-4xl font-bold mb-4">Welcome to Alzheimer's Support Platform</h2>
//         <p className="text-lg mb-8">
//           Learn more about early detection, support tools, and resources for
//           Alzheimer’s patients and caregivers.
//         </p>
//         <div className="space-y-4">
//           <h3 className="text-2xl font-semibold">Real-time Alzheimer's News</h3>
//           {articles.map((article, index) => (
//             <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
//               <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
//                 <h4 className="text-xl font-semibold mb-2">{article.title}</h4>
//               </a>
//               <p className="text-gray-400">{article.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
