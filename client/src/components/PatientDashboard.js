


// ----------this is the perfectly woking one ------------------------------------

// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';

// // Component for Go-No-Go Test
// const GoNoGoTestComponent = ({ signal, onResponse }) => (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//     <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal}</h2>
//     <div className="flex gap-4">
//       <button
//         className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//         onClick={() => onResponse(true)}
//       >
//         Go
//       </button>
//       <button
//         className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
//         onClick={() => onResponse(false)}
//       >
//         No-Go
//       </button>
//     </div>
//   </div>
// );

// const PatientDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTest, setActiveTest] = useState(null);
//   const [signal, setSignal] = useState(null);
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
//       setUserData({
//         name: "John Doe",
//         email: "john@example.com",
//         nextTest: "Cognitive Assessment - April 20, 2024",
//       });
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const handleStartTest = async (testType) => {
//     const sessionId = "unique_session_id"; // Generate or fetch a session ID
//     const backendTestTypeMap = {
//       "Cognitive Assessment Test": "GoNoGo",
//       "Memory Test": "Memory", // Add other mappings as needed
//     };
//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           test_type: backendTestTypeMap[testType],
//         }),
//       });
//       const data = await response.json();
//       console.log("Test started:", data);
//       setSignal(data.signal); // Pass the signal to the test component
//       setActiveTest(testType); // Set the active test to render the component
//     } catch (error) {
//       console.error("Error starting test:", error);
//     }
//   };

//   const handleTestCompletion = (response) => {
//     const sessionId = "unique_session_id"; // Use the same session ID
//     fetch("http://127.0.0.1:5000/submit-response", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         session_id: sessionId,
//         is_go_response: response,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.results) {
//           console.log("Test completed:", data.results);
//           setSignal(""); // Clear signal
//           setResults(data.results); // Set results for display
//         } else {
//           setSignal(data.signal); // Update signal for the next trial
//         }
//       })
//       .catch((error) => {
//         console.error("Error submitting response:", error);
//       });
//   };

//   const handleReturnToDashboard = () => {
//     setActiveTest(null);
//     setResults(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Test component rendering
//   if (activeTest === "Cognitive Assessment Test" && !results) {
//     return (
//       <GoNoGoTestComponent
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   // Render results after test completion
//   if (results) {
//     return (
//       <div className="results text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
//         <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//         <p>Precision: {results.precision.toFixed(2)}%</p>
//         <p>Average Response Time: {results.avg_response_time.toFixed(2)} seconds</p>
//         <p>Response Time Variability: {results.response_time_variability.toFixed(2)} seconds</p>
//         <button
//           className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
//           onClick={handleReturnToDashboard}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Define available tests
//   const tests = [
//     {
//       id: 1,
//       title: "Cognitive Assessment Test",
//       description: "Test your cognitive abilities with our comprehensive assessment.",
//       duration: "20 min",
//       lastCompleted: "March 15, 2024",
//     },
//     {
//       id: 2,
//       title: "Memory Test",
//       description: "Evaluate your memory capabilities with our specialized test.",
//       duration: "15 min",
//       lastCompleted: "March 10, 2024",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Logout
//         </button>
//       </header>

//       {/* Welcome Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
//           <p className="text-gray-500">{userData.email}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
//           <p className="text-blue-600">{userData.nextTest}</p>
//         </div>
//       </div>

//       {/* Available Tests */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Tests</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test.id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
//               <p className="text-gray-600 mb-4">{test.description}</p>
//               <div className="flex justify-between text-sm text-gray-500 mb-4">
//                 <span>⏱️ {test.duration}</span>
//                 <span>🕒 Last: {test.lastCompleted}</span>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 onClick={() => handleStartTest(test.title)}
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PatientDashboard;


// =====================perfect working one end ---------------------------------------
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import GoNoGoTestComponent from './GoNoGoTestComponent';
import StroopTest from './StroopTest';
import CognitiveTestResults from './CognitiveTestResults';  // Import the CognitiveTestResults component
import StroopTestResults from './StroopTestResults';  // Import the StroopTestResults component

const PatientDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTest, setActiveTest] = useState(null);
  const [signal, setSignal] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
      setUserData({
        name: "John Doe",
        email: "john@example.com",
        nextTest: "Cognitive Assessment - April 20, 2024",
      });
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleStartTest = async (testType) => {
    const sessionId = "unique_session_id"; // Generate or fetch a session ID
    const backendTestTypeMap = {
      "Cognitive Assessment Test": "GoNoGo",
      "Memory Test": "Memory",
      "Stroop Test": "Stroop",  // Add mapping for Stroop Test
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/start-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          test_type: backendTestTypeMap[testType],
          language_code: 'en',  // Default to English
        }),
      });
      const data = await response.json();
      console.log("Test started:", data);
      setSignal(data.signal); // Pass the signal to the test component
      setActiveTest(testType); // Set the active test to render the component
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  const handleTestCompletion = (response) => {
    const sessionId = "unique_session_id"; // Use the same session ID
    fetch("http://127.0.0.1:5000/submit-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
        response: response,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          console.log("Test completed:", data.results);
          setSignal(""); // Clear signal
          setResults(data.results); // Set results for display
        } else {
          setSignal(data.signal); // Update signal for the next trial
        }
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
      });
  };

  const handleReturnToDashboard = () => {
    setActiveTest(null);
    setResults(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Test component rendering
  if (activeTest === "Cognitive Assessment Test" && !results) {
    return (
      <GoNoGoTestComponent
        signal={signal}
        onResponse={handleTestCompletion}
      />
    );
  }

  if (activeTest === "Stroop Test" && !results) {
    return (
      <StroopTest
        signal={signal}
        onResponse={handleTestCompletion}
      />
    );
  }

  // Render results after test completion
  if (results) {
    return (
      <div>
        {activeTest === "Cognitive Assessment Test" && <CognitiveTestResults results={results} />}
        {activeTest === "Stroop Test" && <StroopTestResults results={results} />}
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
          onClick={handleReturnToDashboard}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Define available tests
  const tests = [
    {
      id: 1,
      title: "Cognitive Assessment Test",
      description: "Test your cognitive abilities with our comprehensive assessment.",
      duration: "20 min",
      lastCompleted: "March 15, 2024",
    },
    {
      id: 2,
      title: "Memory Test",
      description: "Evaluate your memory capabilities with our specialized test.",
      duration: "15 min",
      lastCompleted: "March 10, 2024",
    },
    {
      id: 3,
      title: "Stroop Test",
      description: "Evaluate your cognitive flexibility with the Stroop Test.",
      duration: "10 min",
      lastCompleted: "March 12, 2024",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Logout
        </button>
      </header>

      {/* Welcome Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
          <p className="text-blue-600">{userData.nextTest}</p>
        </div>
      </div>

      {/* Available Tests */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>⏱️ {test.duration}</span>
                <span>🕒 Last: {test.lastCompleted}</span>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => handleStartTest(test.title)}
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;

//==============wroks for both tests with acc======================


// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import GoNoGoTestComponent from './GoNoGoTestComponent';
// import StroopTest from './StroopTest';  // Import the StroopTest component

// const PatientDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTest, setActiveTest] = useState(null);
//   const [signal, setSignal] = useState(null);
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
//       setUserData({
//         name: "John Doe",
//         email: "john@example.com",
//         nextTest: "Cognitive Assessment - April 20, 2024",
//       });
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const handleStartTest = async (testType) => {
//     const sessionId = "unique_session_id"; // Generate or fetch a session ID
//     const backendTestTypeMap = {
//       "Cognitive Assessment Test": "GoNoGo",
//       "Memory Test": "Memory",
//       "Stroop Test": "Stroop",  // Add mapping for Stroop Test
//     };
//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           test_type: backendTestTypeMap[testType],
//           language_code: 'en',  // Default to English
//         }),
//       });
//       const data = await response.json();
//       console.log("Test started:", data);
//       setSignal(data.signal); // Pass the signal to the test component
//       setActiveTest(testType); // Set the active test to render the component
//     } catch (error) {
//       console.error("Error starting test:", error);
//     }
//   };

//   const handleTestCompletion = (response) => {
//     const sessionId = "unique_session_id"; // Use the same session ID
//     fetch("http://127.0.0.1:5000/submit-response", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         session_id: sessionId,
//         response: response,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.results) {
//           console.log("Test completed:", data.results);
//           setSignal(""); // Clear signal
//           setResults(data.results); // Set results for display
//         } else {
//           setSignal(data.signal); // Update signal for the next trial
//         }
//       })
//       .catch((error) => {
//         console.error("Error submitting response:", error);
//       });
//   };

//   const handleReturnToDashboard = () => {
//     setActiveTest(null);
//     setResults(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Test component rendering
//   if (activeTest === "Cognitive Assessment Test" && !results) {
//     return (
//       <GoNoGoTestComponent
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   if (activeTest === "Stroop Test" && !results) {
//     return (
//       <StroopTest
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   // Render results after test completion
//   if (results) {
//     return (
//       <div className="results text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
//         <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//         <p>Precision: {results.precision.toFixed(2)}%</p>
//         <p>Average Response Time: {results.avg_response_time.toFixed(2)} seconds</p>
//       <p>Response Time Variability: {results.response_time_variability.toFixed(2)} seconds</p>


//         <button
//           className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
//           onClick={handleReturnToDashboard}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Define available tests
//   const tests = [
//     {
//       id: 1,
//       title: "Cognitive Assessment Test",
//       description: "Test your cognitive abilities with our comprehensive assessment.",
//       duration: "20 min",
//       lastCompleted: "March 15, 2024",
//     },
//     {
//       id: 2,
//       title: "Memory Test",
//       description: "Evaluate your memory capabilities with our specialized test.",
//       duration: "15 min",
//       lastCompleted: "March 10, 2024",
//     },
//     {
//       id: 3,
//       title: "Stroop Test",
//       description: "Evaluate your cognitive flexibility with the Stroop Test.",
//       duration: "10 min",
//       lastCompleted: "March 12, 2024",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Logout
//         </button>
//       </header>

//       {/* Welcome Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
//           <p className="text-gray-500">{userData.email}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
//           <p className="text-blue-600">{userData.nextTest}</p>
//         </div>
//       </div>

//       {/* Available Tests */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Tests</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test.id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
//               <p className="text-gray-600 mb-4">{test.description}</p>
//               <div className="flex justify-between text-sm text-gray-500 mb-4">
//                 <span>⏱️ {test.duration}</span>
//                 <span>🕒 Last: {test.lastCompleted}</span>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 onClick={() => handleStartTest(test.title)}
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PatientDashboard;

//----------------This is the one working with both tests but only acc is shown ----------------------------------------





















// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import GoNoGoTestComponent from './GoNoGoTestComponent';
// import StroopTest from './StroopTest';  // Import the StroopTest component

// const PatientDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTest, setActiveTest] = useState(null);
//   const [signal, setSignal] = useState(null);
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
//       setUserData({
//         name: "John Doe",
//         email: "john@example.com",
//         nextTest: "Cognitive Assessment - April 20, 2024",
//       });
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const handleStartTest = async (testType) => {
//     const sessionId = "unique_session_id"; // Generate or fetch a session ID
//     const backendTestTypeMap = {
//       "Cognitive Assessment Test": "GoNoGo",
//       "Memory Test": "Memory",
//       "Stroop Test": "Stroop",  // Add mapping for Stroop Test
//     };
//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           test_type: backendTestTypeMap[testType],
//           language_code: 'en',  // Default to English
//         }),
//       });
//       const data = await response.json();
//       console.log("Test started:", data);
//       setSignal(data.signal); // Pass the signal to the test component
//       setActiveTest(testType); // Set the active test to render the component
//     } catch (error) {
//       console.error("Error starting test:", error);
//     }
//   };

//   const handleTestCompletion = (response) => {
//     const sessionId = "unique_session_id"; // Use the same session ID
//     fetch("http://127.0.0.1:5000/submit-response", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         session_id: sessionId,
//         response: response,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.results) {
//           console.log("Test completed:", data.results);
//           setSignal(""); // Clear signal
//           setResults(data.results); // Set results for display
//         } else {
//           setSignal(data.signal); // Update signal for the next trial
//         }
//       })
//       .catch((error) => {
//         console.error("Error submitting response:", error);
//       });
//   };

//   const handleReturnToDashboard = () => {
//     setActiveTest(null);
//     setResults(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Test component rendering
//   if (activeTest === "Cognitive Assessment Test" && !results) {
//     return (
//       <GoNoGoTestComponent
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   if (activeTest === "Stroop Test" && !results) {
//     return (
//       <StroopTest
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   // Render results after test completion
//   if (results) {
//     return (
//       <div className="results text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
//         <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//         <p>Precision: {results.precision.toFixed(2)}%</p>
//          <p>Average Response Time: {results.avg_response_time.toFixed(2)} seconds</p>
//          <p>Response Time Variability: {results.response_time_variability.toFixed(2)} seconds</p>

//         <button
//           className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
//           onClick={handleReturnToDashboard}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Define available tests
//   const tests = [
//     {
//       id: 1,
//       title: "Cognitive Assessment Test",
//       description: "Test your cognitive abilities with our comprehensive assessment.",
//       duration: "20 min",
//       lastCompleted: "March 15, 2024",
//     },
//     {
//       id: 2,
//       title: "Memory Test",
//       description: "Evaluate your memory capabilities with our specialized test.",
//       duration: "15 min",
//       lastCompleted: "March 10, 2024",
//     },
//     {
//       id: 3,
//       title: "Stroop Test",
//       description: "Evaluate your cognitive flexibility with the Stroop Test.",
//       duration: "10 min",
//       lastCompleted: "March 12, 2024",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Logout
//         </button>
//       </header>

//       {/* Welcome Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
//           <p className="text-gray-500">{userData.email}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
//           <p className="text-blue-600">{userData.nextTest}</p>
//         </div>
//       </div>

//       {/* Available Tests */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Tests</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test.id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
//               <p className="text-gray-600 mb-4">{test.description}</p>
//               <div className="flex justify-between text-sm text-gray-500 mb-4">
//                 <span>⏱️ {test.duration}</span>
//                 <span>🕒 Last: {test.lastCompleted}</span>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 onClick={() => handleStartTest(test.title)}
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PatientDashboard;





// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import StroopTestComponent from './StroopTestComponent'; // Import the new component

// // Component for Go-No-Go Test
// const GoNoGoTestComponent = ({ signal, onResponse }) => (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//     <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal}</h2>
//     <div className="flex gap-4">
//       <button
//         className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//         onClick={() => onResponse(true)}
//       >
//         Go
//       </button>
//       <button
//         className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
//         onClick={() => onResponse(false)}
//       >
//         No-Go
//       </button>
//     </div>
//   </div>
// );

// const PatientDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTest, setActiveTest] = useState(null);
//   const [signal, setSignal] = useState(null);
//   const [results, setResults] = useState(null);
//   const [languageCode, setLanguageCode] = useState('en');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
//       setUserData({
//         name: "John Doe",
//         email: "john@example.com",
//         nextTest: "Cognitive Assessment - April 20, 2024",
//       });
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const handleStartTest = async (testType) => {
//     const sessionId = "unique_session_id"; // Generate or fetch a session ID
//     const backendTestTypeMap = {
//       "Cognitive Assessment Test": "GoNoGo",
//       "Memory Test": "Memory",
//       "Stroop Test": "Stroop", // Add Stroop Test mapping
//     };
//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           test_type: backendTestTypeMap[testType],
//           language_code: languageCode, // Pass the selected language code
//         }),
//       });
//       const data = await response.json();
//       console.log("Test started:", data);
//       setSignal(data.signal); // Pass the signal to the test component
//       setActiveTest(testType); // Set the active test to render the component
//     } catch (error) {
//       console.error("Error starting test:", error);
//     }
//   };

//   const handleTestCompletion = (response) => {
//     const sessionId = "unique_session_id"; // Use the same session ID
//     fetch("http://127.0.0.1:5000/submit-response", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         session_id: sessionId,
//         is_go_response: response,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.results) {
//           console.log("Test completed:", data.results);
//           setSignal(""); // Clear signal
//           setResults(data.results); // Set results for display
//         } else {
//           setSignal(data.signal); // Update signal for the next trial
//         }
//       })
//       .catch((error) => {
//         console.error("Error submitting response:", error);
//       });
//   };

//   const handleReturnToDashboard = () => {
//     setActiveTest(null);
//     setResults(null);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguageCode(event.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Test component rendering
//   if (activeTest === "Cognitive Assessment Test" && !results) {
//     return (
//       <GoNoGoTestComponent
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   if (activeTest === "Stroop Test") {
//     return (
//       <StroopTestComponent
//         onComplete={handleReturnToDashboard}
//         languageCode={languageCode}
//       />
//     );
//   }

//   // Render results after test completion
//   if (results) {
//     return (
//       <div className="results text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
//         <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//         <p>Precision: {results.precision.toFixed(2)}%</p>
//         <p>Average Response Time: {results.avg_response_time.toFixed(2)} seconds</p>
//         <p>Response Time Variability: {results.response_time_variability.toFixed(2)} seconds</p>
//         <button
//           className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
//           onClick={handleReturnToDashboard}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Define available tests
//   const tests = [
//     {
//       id: 1,
//       title: "Cognitive Assessment Test",
//       description: "Test your cognitive abilities with our comprehensive assessment.",
//       duration: "20 min",
//       lastCompleted: "March 15, 2024",
//     },
//     {
//       id: 2,
//       title: "Memory Test",
//       description: "Evaluate your memory capabilities with our specialized test.",
//       duration: "15 min",
//       lastCompleted: "March 10, 2024",
//     },
//     {
//       id: 3,
//       title: "Stroop Test",
//       description: "Test your cognitive flexibility and processing speed.",
//       duration: "10 min",
//       lastCompleted: "March 12, 2024",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Logout
//         </button>
//       </header>

//       {/* Welcome Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
//           <p className="text-gray-500">{userData.email}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
//           <p className="text-blue-600">{userData.nextTest}</p>
//         </div>
//       </div>

//       {/* Language Selection */}
//       <div className="mb-6">
//         <label className="text-xl font-bold text-gray-700 mb-2">Select Language:</label>
//         <select value={languageCode} onChange={handleLanguageChange} className="p-2 border rounded">
//           {Object.keys(supported_languages).map((code) => (
//             <option key={code} value={code}>
//               {supported_languages[code]}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Available Tests */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Cognitive Tests</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test.id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
//               <p className="text-gray-600 mb-4">{test.description}</p>
//               <div className="flex justify-between text-sm text-gray-500 mb-4">
//                 <span>⏱️ {test.duration}</span>
//                 <span>🕒 Last: {test.lastCompleted}</span>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 onClick={() => handleStartTest(test.title)}
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import StroopTestComponent from './StroopTestComponent'; // Import the new component

// // Define supported languages
// const supported_languages = {
//   en: 'English',
//   hi: 'Hindi',
//   bn: 'Bengali',
//   te: 'Telugu',
//   mr: 'Marathi',
//   ta: 'Tamil',
//   gu: 'Gujarati',
//   kn: 'Kannada',
//   ml: 'Malayalam',
//   pa: 'Punjabi'
// };

// // Component for Go-No-Go Test
// const GoNoGoTestComponent = ({ signal, onResponse }) => (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//     <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal}</h2>
//     <div className="flex gap-4">
//       <button
//         className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//         onClick={() => onResponse(true)}
//       >
//         Go
//       </button>
//       <button
//         className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
//         onClick={() => onResponse(false)}
//       >
//         No-Go
//       </button>
//     </div>
//   </div>
// );

// const PatientDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTest, setActiveTest] = useState(null);
//   const [signal, setSignal] = useState(null);
//   const [results, setResults] = useState(null);
//   const [languageCode, setLanguageCode] = useState('en');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
//       setUserData({
//         name: "John Doe",
//         email: "john@example.com",
//         nextTest: "Cognitive Assessment - April 20, 2024",
//       });
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const handleStartTest = async (testType) => {
//     const sessionId = "unique_session_id"; // Generate or fetch a session ID
//     const backendTestTypeMap = {
//       "Cognitive Assessment Test": "GoNoGo",
//       "Memory Test": "Memory",
//       "Stroop Test": "Stroop", // Add Stroop Test mapping
//     };
//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           test_type: backendTestTypeMap[testType],
//           language_code: languageCode, // Pass the selected language code
//         }),
//       });
//       const data = await response.json();
//       console.log("Test started:", data);
//       setSignal(data.signal); // Pass the signal to the test component
//       setActiveTest(testType); // Set the active test to render the component
//     } catch (error) {
//       console.error("Error starting test:", error);
//     }
//   };

//   const handleTestCompletion = (response) => {
//     const sessionId = "unique_session_id"; // Use the same session ID
//     fetch("http://127.0.0.1:5000/submit-response", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         session_id: sessionId,
//         is_go_response: response,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.results) {
//           console.log("Test completed:", data.results);
//           setSignal(""); // Clear signal
//           setResults(data.results); // Set results for display
//         } else {
//           setSignal(data.signal); // Update signal for the next trial
//         }
//       })
//       .catch((error) => {
//         console.error("Error submitting response:", error);
//       });
//   };

//   const handleReturnToDashboard = () => {
//     setActiveTest(null);
//     setResults(null);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguageCode(event.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Test component rendering
//   if (activeTest === "Cognitive Assessment Test" && !results) {
//     return (
//       <GoNoGoTestComponent
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   if (activeTest === "Stroop Test") {
//     return (
//       <StroopTestComponent
//         onComplete={handleReturnToDashboard}
//         languageCode={languageCode}
//       />
//     );
//   }

//   // Render results after test completion
//   if (results) {
//     return (
//       <div className="results text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
//         <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//         <p>Precision: {results.precision.toFixed(2)}%</p>
//         <p>Average Response Time: {results.avg_response_time.toFixed(2)} seconds</p>
//         <p>Response Time Variability: {results.response_time_variability.toFixed(2)} seconds</p>
//         <button
//           className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
//           onClick={handleReturnToDashboard}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Define available tests
//   const tests = [
//     {
//       id: 1,
//       title: "Cognitive Assessment Test",
//       description: "Test your cognitive abilities with our comprehensive assessment.",
//       duration: "20 min",
//       lastCompleted: "March 15, 2024",
//     },
//     {
//       id: 2,
//       title: "Memory Test",
//       description: "Evaluate your memory capabilities with our specialized test.",
//       duration: "15 min",
//       lastCompleted: "March 10, 2024",
//     },
//     {
//       id: 3,
//       title: "Stroop Test",
//       description: "Test your cognitive flexibility and processing speed.",
//       duration: "10 min",
//       lastCompleted: "March 12, 2024",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Logout
//         </button>
//       </header>

//       {/* Welcome Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
//           <p className="text-gray-500">{userData.email}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
//           <p className="text-blue-600">{userData.nextTest}</p>
//         </div>
//       </div>

//       {/* Language Selection */}
//       <div className="mb-6">
//         <label className="text-xl font-bold text-gray-700 mb-2">Select Language:</label>
//         <select value={languageCode} onChange={handleLanguageChange} className="p-2 border rounded">
//           {Object.keys(supported_languages).map((code) => (
//             <option key={code} value={code}>
//               {supported_languages[code]}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Available Tests */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Cognitive Tests</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test.id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
//               <p className="text-gray-600 mb-4">{test.description}</p>
//               <div className="flex justify-between text-sm text-gray-500 mb-4">
//                 <span>⏱️ {test.duration}</span>
//                 <span>🕒 Last: {test.lastCompleted}</span>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 onClick={() => handleStartTest(test.title)}
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// // export default PatientDashboard;
// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import StroopTestComponent from './StroopTestComponent'; // Import the new component

// // Define supported languages
// const supported_languages = {
//   en: 'English',
//   hi: 'Hindi',
//   bn: 'Bengali',
//   te: 'Telugu',
//   mr: 'Marathi',
//   ta: 'Tamil',
//   gu: 'Gujarati',
//   kn: 'Kannada',
//   ml: 'Malayalam',
//   pa: 'Punjabi'
// };

// // Component for Go-No-Go Test
// const GoNoGoTestComponent = ({ signal, onResponse }) => (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//     <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal}</h2>
//     <div className="flex gap-4">
//       <button
//         className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//         onClick={() => onResponse(true)}
//       >
//         Go
//       </button>
//       <button
//         className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
//         onClick={() => onResponse(false)}
//       >
//         No-Go
//       </button>
//     </div>
//   </div>
// );

// const PatientDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTest, setActiveTest] = useState(null);
//   const [signal, setSignal] = useState(null);
//   const [results, setResults] = useState(null);
//   const [languageCode, setLanguageCode] = useState('en');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
//       setUserData({
//         name: "John Doe",
//         email: "john@example.com",
//         nextTest: "Cognitive Assessment - April 20, 2024",
//       });
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const handleStartTest = async (testType) => {
//     const sessionId = "unique_session_id"; // Generate or fetch a session ID
//     const backendTestTypeMap = {
//       "Cognitive Assessment Test": "GoNoGo",
//       "Memory Test": "Memory",
//       "Stroop Test": "Stroop", // Add Stroop Test mapping
//     };
//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           test_type: backendTestTypeMap[testType],
//           language_code: languageCode, // Pass the selected language code
//         }),
//       });
//       const data = await response.json();
//       console.log("Test started:", data);
//       setSignal(data); // Pass the signal to the test component
//       setActiveTest(testType); // Set the active test to render the component
//     } catch (error) {
//       console.error("Error starting test:", error);
//     }
//   };

//   const handleTestCompletion = async (response) => {
//     const sessionId = "unique_session_id"; // Use the same session ID
//     try {
//       const res = await fetch("http://127.0.0.1:5000/submit-response", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           session_id: sessionId,
//           user_response: response,
//         }),
//       });
//       const data = await res.json();
//       if (data.results) {
//         console.log("Test completed:", data.results);
//         setSignal(null); // Clear signal
//         setResults(data.results); // Set results for display
//       } else {
//         setSignal(data); // Update signal for the next trial
//       }
//     } catch (error) {
//       console.error("Error submitting response:", error);
//     }
//   };

//   const handleReturnToDashboard = () => {
//     setActiveTest(null);
//     setResults(null);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguageCode(event.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Test component rendering
//   if (activeTest === "Cognitive Assessment Test" && !results) {
//     return (
//       <GoNoGoTestComponent
//         signal={signal?.signal || ''}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   if (activeTest === "Stroop Test") {
//     return (
//       <StroopTestComponent
//         onComplete={handleReturnToDashboard}
//         languageCode={languageCode}
//         signal={signal}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   // Render results after test completion
//   if (results) {
//     return (
//       <div className="results text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
//         <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//         <button
//           className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
//           onClick={handleReturnToDashboard}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Define available tests
//   const tests = [
//     {
//       id: 1,
//       title: "Cognitive Assessment Test",
//       description: "Test your cognitive abilities with our comprehensive assessment.",
//       duration: "20 min",
//       lastCompleted: "March 15, 2024",
//     },
//     {
//       id: 2,
//       title: "Memory Test",
//       description: "Evaluate your memory capabilities with our specialized test.",
//       duration: "15 min",
//       lastCompleted: "March 10, 2024",
//     },
//     {
//       id: 3,
//       title: "Stroop Test",
//       description: "Test your cognitive flexibility and processing speed.",
//       duration: "10 min",
//       lastCompleted: "March 12, 2024",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Logout
//         </button>
//       </header>

//       {/* Welcome Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
//           <p className="text-gray-500">{userData.email}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
//           <p className="text-blue-600">{userData.nextTest}</p>
//         </div>
//       </div>

//       {/* Language Selection */}
//       <div className="mb-6">
//         <label className="text-xl font-bold text-gray-700 mb-2">Select Language:</label>
//         <select value={languageCode} onChange={handleLanguageChange} className="p-2 border rounded">
//           {Object.keys(supported_languages).map((code) => (
//             <option key={code} value={code}>
//               {supported_languages[code]}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Available Tests */}
//       <section>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Cognitive Tests</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test.id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
//               <p className="text-gray-600 mb-4">{test.description}</p>
//               <div className="flex justify-between text-sm text-gray-500 mb-4">
//                 <span>⏱️ {test.duration}</span>
//                 <span>🕒 Last: {test.lastCompleted}</span>
//               </div>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 onClick={() => handleStartTest(test.title)}
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PatientDashboard;


// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import StroopTestComponent from "./StroopTestComponent"; // Import Stroop Test Component

// // Supported languages
// const supported_languages = {
//   en: "English",
//   hi: "Hindi",
//   bn: "Bengali",
//   te: "Telugu",
//   mr: "Marathi",
//   ta: "Tamil",
//   gu: "Gujarati",
//   kn: "Kannada",
//   ml: "Malayalam",
//   pa: "Punjabi",
// };

// // Go-No-Go Test Component
// const GoNoGoTestComponent = ({ signal, onResponse }) => (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//     <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal}</h2>
//     <div className="flex gap-4">
//       <button
//         className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//         onClick={() => onResponse(true)}
//       >
//         Go
//       </button>
//       <button
//         className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
//         onClick={() => onResponse(false)}
//       >
//         No-Go
//       </button>
//     </div>
//   </div>
// );

// const PatientDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTest, setActiveTest] = useState(null);
//   const [signal, setSignal] = useState(null);
//   const [results, setResults] = useState(null);
//   const [languageCode, setLanguageCode] = useState("en");

//   useEffect(() => {
//     // Simulate user data fetch
//     const fetchUserData = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
//       setUserData({
//         name: "John Doe",
//         email: "john@example.com",
//         nextTest: "Cognitive Assessment - April 20, 2024",
//       });
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);

//   const handleStartTest = async (testType) => {
//     const backendTestTypeMap = {
//       "Cognitive Assessment Test": "GoNoGo",
//       "Memory Test": "Memory",
//       "Stroop Test": "Stroop",
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:5000/start-test", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           test_type: backendTestTypeMap[testType],
//           language_code: languageCode,
//         }),
//       });
//       const data = await response.json();
//       setSignal(data); // Initial signal for the test
//       setActiveTest(testType); // Set active test
//     } catch (error) {
//       console.error("Error starting test:", error);
//     }
//   };

//   const handleTestCompletion = async (response) => {
//     try {
//       const res = await fetch("http://127.0.0.1:5000/submit-response", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_response: response }),
//       });
//       const data = await res.json();
//       if (data.results) {
//         setResults(data.results); // Final results
//         setSignal(null);
//       } else {
//         setSignal(data); // Update signal for next trial
//       }
//     } catch (error) {
//       console.error("Error submitting response:", error);
//     }
//   };

//   const handleReturnToDashboard = () => {
//     setActiveTest(null);
//     setResults(null);
//   };

//   const handleLanguageChange = (event) => {
//     setLanguageCode(event.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Conditional Rendering: Active Test Components
//   if (activeTest === "Cognitive Assessment Test" && !results) {
//     return (
//       <GoNoGoTestComponent
//         signal={signal?.signal || ""}
//         onResponse={handleTestCompletion}
//       />
//     );
//   }

//   if (activeTest === "Stroop Test") {
//     return (
//       <StroopTestComponent
//         languageCode={languageCode}
//         signal={signal}
//         onResponse={handleTestCompletion}
//         onComplete={handleReturnToDashboard}
//       />
//     );
//   }

//   // Results View
//   if (results) {
//     return (
//       <div className="results text-center">
//         <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
//         <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//         <button
//           className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
//           onClick={handleReturnToDashboard}
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   // Available Tests
//   const tests = [
//     {
//       id: 1,
//       title: "Cognitive Assessment Test",
//       description: "Test your cognitive abilities with our comprehensive assessment.",
//       duration: "20 min",
//     },
//     {
//       id: 2,
//       title: "Memory Test",
//       description: "Evaluate your memory capabilities with our specialized test.",
//       duration: "15 min",
//     },
//     {
//       id: 3,
//       title: "Stroop Test",
//       description: "Test your cognitive flexibility and processing speed.",
//       duration: "10 min",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6">
//       <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Patient Dashboard</h1>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Logout
//         </button>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">👤 Welcome, {userData.name}</h2>
//           <p className="text-gray-500">{userData.email}</p>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-bold text-gray-700">📅 Upcoming Test</h2>
//           <p className="text-blue-600">{userData.nextTest}</p>
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="text-xl font-bold text-gray-700 mb-2">Select Language:</label>
//         <select
//           value={languageCode}
//           onChange={handleLanguageChange}
//           className="p-2 border rounded"
//         >
//           {Object.keys(supported_languages).map((code) => (
//             <option key={code} value={code}>
//               {supported_languages[code]}
//             </option>
//           ))}
//         </select>
//       </div>

//       <section>
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Cognitive Tests</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tests.map((test) => (
//             <div
//               key={test.id}
//               className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
//             >
//               <h3 className="text-xl font-bold text-blue-600">{test.title}</h3>
//               <p className="text-gray-600 mb-4">{test.description}</p>
//               <button
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 onClick={() => handleStartTest(test.title)}
//               >
//                 Start Test
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PatientDashboard;
