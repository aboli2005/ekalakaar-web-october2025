// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Footer from '../../components/Footer'

// const Opportunities = () => {
//  const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//       const response = await axios.get('http://localhost:5000/api/book-performance');

// ;

// console.log("API response:", response.data);

//         setBookings(response.data.bookings);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <>
//       <div className="min-h-screen bg-[#FFFDF9] p-6 sm:p-10">
//         <h1 className="text-3xl sm:text-4xl font-bold text-[#AD2F3B] text-center mb-8">
//           Current Opportunities
//         </h1>

//         {loading ? (
//           <p className="text-center text-lg text-gray-600">
//             Loading opportunities...
//           </p>
//         ) : bookings.length === 0 ? (
//           <p className="text-center text-lg text-gray-600">
//             No opportunities available at the moment.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-10">
//             {bookings.map((booking, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between border-2 border-[#AD2F3B]"
//               >
//                 <div>
//                   <h2 className="text-xl font-bold text-[#9C3D3D] mb-3 text-center">
//                     {booking.organisation || "Anonymous Organisation"}
//                   </h2>
//                   <p>
//                     <strong>Event by:</strong> {booking.name}
//                   </p>
//                   <p>
//                     <strong>Location:</strong> {booking.city}, {booking.state}
//                   </p>
//                   <p>
//                     <strong>Performance Date:</strong>{" "}
//                     {new Date(booking.performanceDate).toLocaleDateString()}
//                   </p>
//                   {/* <p className="mt-2 text-gray-700">
//                     <strong>Requirements:</strong> <br />
//                     {booking.requirements}
//                   </p> */}
//                 </div>
//                 <div className="mt-4 text-center">
//                   <Link
//                     to="/register"
//                     className="inline-block bg-[#9C3D3D] text-decoration-none hover:bg-[#AD2F3B] text-white px-5 py-2 rounded-full font-medium transition"
//                   >
//                     Apply
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Opportunities



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Footer from '../../components/Footer';

// const Performances = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedBooking, setSelectedBooking] = useState(null);
// const [showModal, setShowModal] = useState(false);

// const openModal = (booking) => {
//   setSelectedBooking(booking);
//   setShowModal(true);
// };

// const closeModal = () => {
//   setSelectedBooking(null);
//   setShowModal(false);
// };


//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/book-performance');
//         console.log("API response:", response.data);
//         setBookings(response.data.bookings);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const handleDelete = async (bookingId) => {
//   if (window.confirm("Are you sure you want to delete this opportunity?")) {
//     try {
//       await axios.delete(`http://localhost:5000/api/book-performance/${bookingId}`);
//       setBookings(bookings.filter((booking) => booking._id !== bookingId));
//     } catch (error) {
//       console.error("Error deleting booking:", error);
//       alert("Failed to delete. Please try again.");
//     }
//   }
// };


//   return (
//     <>
//       <div className="min-h-screen bg-[#FFFDF9] p-6 sm:p-10">
//         <button
//   onClick={() => window.history.back()}
//   className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
// >
//   ← Back
// </button>

//         <h1 className="text-3xl sm:text-4xl font-bold text-[#AD2F3B] text-center mb-8">
//           Current Opportunities
//         </h1>

//         {loading ? (
//           <p className="text-center text-lg text-gray-600">Loading opportunities...</p>
//         ) : bookings.length === 0 ? (
//           <p className="text-center text-lg text-gray-600">No opportunities available at the moment.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-4 sm:mx-10">
// {bookings.map((booking, index) => (
// <div
//   key={index}
//   className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between border-2 border-[#AD2F3B]"
// >
//   <div>
//     <h2 className="text-xl font-bold text-[#9C3D3D] mb-3 text-center">
//       {booking.organisation || "Anonymous Organisation"}
//     </h2>
//     <p><strong>Event by:</strong> {booking.name}</p>
//     <p><strong>Email:</strong> {booking.email}</p>
// <p><strong>Mobile:</strong> {booking.contactNumber}</p>
//     <p><strong>Location:</strong> {booking.city}, {booking.state}</p>
//     <p><strong>Performance Date:</strong> {new Date(booking.performanceDate).toLocaleDateString()}</p>

//     {/* Art Form Details */}
//     {booking.performanceOccasion && (
//       <p><strong>Occasion:</strong> {booking.performanceOccasion}</p>
//     )}
//     {booking.artCategory && (
//       <p><strong>Art Category:</strong> {booking.artCategory}</p>
//     )}
//    {/* In both the card and modal components */}
// {booking.artType && (
//   <p><strong>Type of Art:</strong> {booking.artType}</p>
// )}
//     {booking.language && (
//       <p><strong>Language:</strong> {booking.language}</p>
//     )}

//     {booking.requirements && (
//       <p className="text-gray-700 mt-2"><strong>Requirements:</strong> {booking.requirements}</p>
//     )}
//   </div>
//  <div className="mt-4 flex justify-center gap-4">
//  <button
//   onClick={() => openModal(booking)}
//   className="bg-[#9C3D3D] hover:bg-[#AD2F3B] text-white px-4 py-2 rounded-full font-medium transition"
// >
//   Review
// </button>

//   <button
//     onClick={() => handleDelete(booking._id)}
//     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition"
//   >
//     Delete
//   </button>
// </div>

// </div>

// ))}

//           </div>
//         )}
//       </div>
//       {showModal && selectedBooking && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
//     <div className="bg-white w-full max-w-2xl rounded-2xl border-4 border-[#9C3D3D] p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
//       {/* Close Button */}
//       <button
//         onClick={closeModal}
//         className="absolute top-3 right-4 text-2xl text-[#9C3D3D] font-bold hover:text-[#AD2F3B] focus:outline-none"
//       >
//         &times;
//       </button>

//       {/* Booking Info */}
//       <h2 className="text-2xl font-bold text-[#9C3D3D] mb-4 text-center">
//         {selectedBooking.organisation || "Anonymous Organisation"}
//       </h2>
//       <div className="space-y-2 text-gray-700">
//         <p><strong>Event by:</strong> {selectedBooking.name}</p>
//         <p><strong>Email:</strong> {selectedBooking.email}</p>
//         <p><strong>Mobile:</strong> {selectedBooking.contactNumber}</p>
//         <p><strong>Location:</strong> {selectedBooking.city}, {selectedBooking.state}</p>
//         <p><strong>Performance Date:</strong> {new Date(selectedBooking.performanceDate).toLocaleDateString()}</p>

//         {selectedBooking.performanceOccasion && (
//           <p><strong>Occasion:</strong> {selectedBooking.performanceOccasion}</p>
//         )}
//         {selectedBooking.artCategory && (
//           <p><strong>Art Category:</strong> {selectedBooking.artCategory}</p>
//         )}
//         {selectedBooking.artType && (
//           <p><strong>Type of Art:</strong> {selectedBooking.artType}</p>
//         )}
//         {selectedBooking.language && (
//           <p><strong>Language:</strong> {selectedBooking.language}</p>
//         )}
//         {selectedBooking.requirements && (
//           <p><strong>Requirements:</strong> {selectedBooking.requirements}</p>
//         )}
//       </div>
//     </div>
//   </div>
// )}

//       <Footer />
//     </>
//   );
// };

// export default Performances;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import Footer from '../../components/Footer';

// const Performances = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [heldBookings, setHeldBookings] = useState([]);
//   const navigate = useNavigate();


//   const openModal = (booking) => {
//     setSelectedBooking(booking);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedBooking(null);
//     setShowModal(false);
//   };

//   const handleReview = (booking) => {
//   navigate('/UploadOpportunities', { state: { booking } });
// };


//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/book-performance');
//         console.log("API response:", response.data);
//         setBookings(response.data.bookings);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const handleDelete = async (bookingId) => {
//     if (window.confirm("Are you sure you want to delete this opportunity?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/book-performance/${bookingId}`);
//         setBookings(bookings.filter((booking) => booking._id !== bookingId));
//       } catch (error) {
//         console.error("Error deleting booking:", error);
//         alert("Failed to delete. Please try again.");
//       }
//     }
//   };

//   const handleHold = (bookingId) => {
//   setHeldBookings((prev) =>
//     prev.includes(bookingId) ? prev.filter((id) => id !== bookingId) : [...prev, bookingId]
//   );
// };


//   return (
//     <>
//       <div className="min-h-screen bg-[#FFFDF9] p-6 sm:p-10">
//         <button
//           onClick={() => window.history.back()}
//           className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
//         >
//           ← Back
//         </button>

//         <h1 className="text-3xl sm:text-4xl font-bold text-[#AD2F3B] text-center mb-8">
//           Current Opportunities
//         </h1>

//         {loading ? (
//           <p className="text-center text-lg text-gray-600">Loading opportunities...</p>
//         ) : bookings.length === 0 ? (
//           <p className="text-center text-lg text-gray-600">No opportunities available at the moment.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-4 sm:mx-10">
//             {bookings.map((booking, index) => (
//               <div
//                 key={index}
//                className={`bg-white shadow-md rounded-xl p-6 flex flex-col justify-between border-2 ${
//     heldBookings.includes(booking._id)
//       ? 'bg-yellow-100 border-yellow-600'
//       : 'border-[#AD2F3B]'
//   }`}
//               >
//                 <div className="space-y-3">
//                   {/* Organization */}
//                   <h2 className="text-xl font-bold text-[#9C3D3D] text-center">
//                     {booking.organisation || "Anonymous Organisation"}
//                   </h2>
                  
//                   {/* Event by */}
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Event by:</span> {booking.name}
//                   </p>
                  
//                   {/* Location */}
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Location:</span> {booking.city}, {booking.state}
//                   </p>
                  
//                   {/* Performance Occasion */}
//                   {booking.performanceOccasion && (
//                     <p className="text-gray-700">
//                       <span className="font-semibold">Occasion:</span> {booking.performanceOccasion}
//                     </p>
//                   )}
                  
//                   {/* Performance Date */}
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Date:</span> {new Date(booking.performanceDate).toLocaleDateString()}
//                   </p>
                  
//                   {/* Type of Art */}
//                   {booking.artType && (
//                     <p className="text-gray-700">
//                       <span className="font-semibold">Art Type:</span> {booking.artType}
//                     </p>
//                   )}
//                 </div>

//                 <div className="mt-4 flex justify-center gap-4">
//                   <button
//                     onClick={() => openModal(booking)}
//                     className="bg-[#9C3D3D] hover:bg-[#AD2F3B] text-white px-4 py-2 rounded-full font-medium transition"
//                   >
//                    See More
//                   </button>
//                   {/* <button
//                     onClick={() => handleDelete(booking._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition"
//                   >
//                     Delete
//                   </button> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal - remains unchanged */}
//       {showModal && selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
//           <div className="bg-white w-full max-w-2xl rounded-2xl border-4 border-[#9C3D3D] p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-4 text-2xl text-[#9C3D3D] font-bold hover:text-[#AD2F3B] focus:outline-none"
//             >
//               &times;
//             </button>

//             <h2 className="text-2xl font-bold text-[#9C3D3D] mb-4 text-center">
//               {selectedBooking.organisation || "Anonymous Organisation"}
//             </h2>
//             <div className="space-y-2 text-gray-700">
//               <p><strong>Event by:</strong> {selectedBooking.name}</p>
//               <p><strong>Email:</strong> {selectedBooking.email}</p>
//               <p><strong>Mobile:</strong> {selectedBooking.contactNumber}</p>
//               <p><strong>Location:</strong> {selectedBooking.city}, {selectedBooking.state}</p>
//               <p><strong>Performance Date:</strong> {new Date(selectedBooking.performanceDate).toLocaleDateString()}</p>
//               {selectedBooking.performanceOccasion && (
//                 <p><strong>Occasion:</strong> {selectedBooking.performanceOccasion}</p>
//               )}
//               {selectedBooking.artCategory && (
//                 <p><strong>Art Category:</strong> {selectedBooking.artCategory}</p>
//               )}
//               {selectedBooking.artType && (
//                 <p><strong>Type of Art:</strong> {selectedBooking.artType}</p>
//               )}
//               {selectedBooking.language && (
//                 <p><strong>Language:</strong> {selectedBooking.language}</p>
//               )}
//               {selectedBooking.requirements && (
//                 <p><strong>Requirements:</strong> {selectedBooking.requirements}</p>
//               )}
//             </div>
//             <div className="mt-6 flex justify-center gap-4">
//   <button
//     onClick={() => handleReview(selectedBooking)}
//     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//   >
//     Review
//   </button>
//   <button
//     onClick={() => handleHold(selectedBooking._id)}
//     className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
//   >
//     Hold
//   </button>
//   <button
//     onClick={() => handleDelete(selectedBooking._id)}
//     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
//   >
//     Delete
//   </button>
// </div>

//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default Performances;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const Performances = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [heldBookings, setHeldBookings] = useState([]);
  const navigate = useNavigate();

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  const handleReview = (booking) => {
    navigate('/UploadOpportunities', { state: { booking } });
  };

 const API_A = process.env.REACT_APP_BACKEND_A;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://ekalakaar.com/api/book-performance"
        );
        // const response = await axios.get(`${API_A}/book-performance`);
        console.log("API response:", response.data);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      try {
        await axios.delete(`https://ekalakaar.com/api/book-performance/${bookingId}`);
        // await axios.delete(`${API_A}/book-performance/${bookingId}`);
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        closeModal(); // Close the modal after successful deletion
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  const handleHold = (bookingId) => {
    setHeldBookings((prev) => {
      const newHeldBookings = prev.includes(bookingId) 
        ? prev.filter((id) => id !== bookingId) 
        : [...prev, bookingId];
      
      // Store in localStorage for persistence
      localStorage.setItem('heldBookings', JSON.stringify(newHeldBookings));
      return newHeldBookings;
    });
  };

  // Load held bookings from localStorage on component mount
  useEffect(() => {
    const savedHeldBookings = localStorage.getItem('heldBookings');
    if (savedHeldBookings) {
      setHeldBookings(JSON.parse(savedHeldBookings));
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#FFFDF9] p-6 sm:p-10">
        <button
          onClick={() => window.history.back()}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#AD2F3B] text-center mb-8">
          Current Opportunities
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading opportunities...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No opportunities available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-4 sm:mx-10">
            {bookings.map((booking, index) => (
<div
  key={index}
  className={`shadow-md rounded-xl p-6 flex flex-col justify-between border-2 ${
    heldBookings.includes(booking._id)
      ? 'bg-yellow-100 border-[#9C3D3D]' // Yellow background with maroon border
      : 'bg-white border-[#9C3D3D]' // White background with maroon border
  }`}
>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-[#9C3D3D] text-center">
                    {booking.organisation || "Anonymous Organisation"}
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-semibold">Event by:</span> {booking.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Location:</span> {booking.city}, {booking.state}
                  </p>
                  {booking.performanceOccasion && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Occasion:</span> {booking.performanceOccasion}
                    </p>
                  )}
                  <p className="text-gray-700">
                    <span className="font-semibold">Date:</span> {new Date(booking.performanceDate).toLocaleDateString()}
                  </p>
                  {booking.artType && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Art Type:</span> {booking.artType}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={() => openModal(booking)}
                    className="bg-[#9C3D3D] hover:bg-[#AD2F3B] text-white px-4 py-2 rounded-full font-medium transition"
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl border-4 border-[#9C3D3D] p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-2xl text-[#9C3D3D] font-bold hover:text-[#AD2F3B] focus:outline-none"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-[#9C3D3D] mb-4 text-center">
              {selectedBooking.organisation || "Anonymous Organisation"}
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Event by:</strong> {selectedBooking.name}</p>
              <p><strong>Email:</strong> {selectedBooking.email}</p>
              <p><strong>Mobile:</strong> {selectedBooking.contactNumber}</p>
              <p><strong>Location:</strong> {selectedBooking.city}, {selectedBooking.state}</p>
              <p><strong>Performance Date:</strong> {new Date(selectedBooking.performanceDate).toLocaleDateString()}</p>
              {selectedBooking.performanceOccasion && (
                <p><strong>Occasion:</strong> {selectedBooking.performanceOccasion}</p>
              )}
              {selectedBooking.artCategory && (
                <p><strong>Art Category:</strong> {selectedBooking.artCategory}</p>
              )}
              {selectedBooking.artType && (
                <p><strong>Type of Art:</strong> {selectedBooking.artType}</p>
              )}
              {selectedBooking.language && (
                <p><strong>Language:</strong> {selectedBooking.language}</p>
              )}
              {selectedBooking.requirements && (
                <p><strong>Requirements:</strong> {selectedBooking.requirements}</p>
              )}
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => handleReview(selectedBooking)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Review
              </button>
          <button
  onClick={() => {
    handleHold(selectedBooking._id);
  }}
  className={`${
    heldBookings.includes(selectedBooking._id)
      ? 'bg-yellow-500 hover:bg-yellow-600'
      : 'bg-gray-500 hover:bg-gray-600'
  } text-white px-4 py-2 rounded-md`}
>
  {heldBookings.includes(selectedBooking._id) ? 'Held' : 'Hold'}
</button>
              <button
                onClick={() => handleDelete(selectedBooking._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Performances;