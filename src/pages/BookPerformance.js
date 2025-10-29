// import React, { useState } from 'react';
// import mandala from '../assets/wallpaper.png';
// import axios from 'axios';
// import indianStatesAndCities from '../data/indian_states_cities';
// import Footer from '../components/Footer';
// import { useNavigate, Link } from 'react-router-dom';
// import ScrollToHashElement from './ScrollToHashElement'; // 👈 Import here

// const BookPerformance = () => {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     organisation: '',
//     email: '',
//     contactNumber: '',
//     state: '',
//     city: '',
//     requirements: '',
//     newsletter: 'yes',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);


//   const cityOptions = formData.state ? indianStatesAndCities[formData.state] || [] : [];

//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [showFinalMessage, setShowFinalMessage] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const isFormValid = () => {
//   return (
//     formData.name.trim() &&
//     formData.organisation.trim() &&
//     formData.email.trim() &&
//     formData.contactNumber.trim() &&
//     formData.state &&
//     formData.city &&
//     formData.requirements.trim()
//   );
// };


// const handleSubmit = async () => {
//   setIsSubmitting(true);
//   try {
//     const response = await axios.post('/api/book-performance', formData);
//     if (response.data.success) {
//       setShowFinalMessage(true);
//     } else {
//       alert('Error submitting booking. Please try again.');
//       setShowConfirmation(false);
//     }
//   } catch (error) {
//     console.error('Submission error:', error);
//     alert('An error occurred. Please try again later.');
//     setShowConfirmation(false);
//   } finally {
//     setIsSubmitting(false);
//   }
// };


// return (
//     <>
//       <div id="book" className="bg-white min-h-screen pt-10 px-4 sm:px-10 pb-20 " >
//         <ScrollToHashElement/>
//   <p className="text-[22px] ml-8  max-[440px]:ml-[-15px] max-[440px]:text-[14px] max-[440px]:mb-8 font-medium mb-6 max-[440px]:mb-3">
//     <Link to="/" className="text-gray-800 hover:underline">Home</Link> / <span className="text-[#AD2F3B]">Book Performance</span>
//   </p>

//         <h1 className="text-[28px] sm:text-[40px] font-bold text-[#AD2F3B] text-center mb-4 sm:mb-6">
//           Book Performance
//         </h1>
//         <p className="text-center text-[18px] sm:text-[28px] text-gray-700 mb-6 sm:mb-10">
//           Let eKalakaar curate a bespoke experience for you!
//         </p>

//         <div
//           className="relative rounded-xl shadow-md mx-auto p-5 sm:p-10 overflow-hidden bg-[#FDF6EE]"
//           style={{
//             width: '100%',
//             maxWidth: '1300px',
//             // height: '1000px',
//           }}
//         >
//           {/* Mandalas */}
//           <img
//             src={mandala}
//             alt="Mandala Top Right"
//             className="hidden sm:block absolute w-[450px] h-[450px] opacity-30 pointer-events-none z-0"
//             style={{ top: "-170px", right: "-170px" }}
//           />
//           <img
//             src={mandala}
//             alt="Mandala Center"
//             className="hidden sm:block absolute top-1/2 left-1/2 w-[600px] transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none z-0"
//           />
//           <img
//             src={mandala}
//             alt="Mandala Bottom Left"
//             className="hidden sm:block absolute w-[450px] h-[450px] opacity-30 pointer-events-none z-0"
//             style={{ bottom: "-170px", left: "-170px" }}
//           />

//           {/* Form */}
//           <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-[100px] sm:gap-y-[50px]">
//             {[
//               { label: 'Name:', name: 'name', type: 'text', placeholder: 'Enter name here' },
//               { label: 'Organisation Name:', name: 'organisation', type: 'text', placeholder: 'Enter Company Name here' },
//               { label: 'Email:', name: 'email', type: 'email', placeholder: 'Enter Email here' },
//               { label: 'Contact Number:', name: 'contactNumber', type: 'text', placeholder: 'Enter Contact Number' }
//             ].map(({ label, name, type, placeholder }) => (
//               <div key={name}>
//                 <label className="block text-black mb-2 text-[18px] sm:text-[24px] font-poppins">{label}</label>
//                 <input
//                   name={name}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   type={type}
//                   placeholder={placeholder}
//                   className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[16px] sm:text-[22px] font-poppins text-black"
//                 />
//               </div>
//             ))}

//             {/* State */}
//             <div>
//               <label className="block text-black mb-2 text-[18px] sm:text-[24px] font-poppins">State:</label>
//               <select
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[16px] sm:text-[22px] font-poppins text-black"
//               >
//                 <option value="">Select Event State</option>
//                 {Object.keys(indianStatesAndCities).map((state) => (
//                   <option key={state} value={state}>{state}</option>
//                 ))}
//               </select>
//             </div>

//             {/* City */}
//             <div>
//               <label className="block text-black mb-2 text-[18px] sm:text-[24px] font-poppins">City:</label>
//               <select
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 disabled={!formData.state}
//                 className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[16px] sm:text-[22px] font-poppins text-black"
//               >
//                 <option value="">{formData.state ? 'Select City' : 'Select State First'}</option>
//                 {cityOptions.map((city) => (
//                   <option key={city} value={city}>{city}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Requirements */}
// <div>
//   <label className="!block !text-black !mb-2 !text-[18px] sm:!text-[24px] !font-poppins">
//     Requirements/Requests:
//   </label>
//   <textarea
//     name="requirements"
//     value={formData.requirements}
//     onChange={handleChange}
//     rows={4}
//     placeholder="Write your Requirements such as date, type of event/theme, venue and audience."
//     className="!w-full !border !border-black !rounded-[12px] !px-4 !py-2 !bg-transparent focus:!bg-white focus:!outline-none !text-[16px] sm:!text-[22px] !font-poppins !text-black !resize-none !min-h-[calc(1.5em*4+1rem)]"
//     style={{ lineHeight: '1.5' }}
//   />
// </div>

//             {/* Newsletter */}
//             <div className="sm:pl-6 mt-4">
//               <label className="block text-black mb-2 text-[18px] sm:text-[24px] font-poppins">
//                 Would you like to Subscribe to our Newsletter?
//               </label>
//               <div className="flex flex-col space-y-3 sm:space-y-6 sm:ml-6">
//                 {['yes', 'no'].map((val) => (
//                   <label key={val} className="flex items-center space-x-4">
//                     <input
//                       type="radio"
//                       name="newsletter"
//                       value={val}
//                       checked={formData.newsletter === val}
//                       onChange={handleChange}
//                       className="appearance-none w-5 h-5 border border-black rounded-full checked:bg-[#9C3D3D] checked:border-[#9C3D3D] relative"
//                     />
//                     <span className="text-[16px] sm:text-[22px] font-poppins capitalize">{val}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="col-span-1 sm:col-span-2 flex justify-center mt-10">
// <button
//   onClick={() => setShowConfirmation(true)}
//   disabled={!isFormValid()}
//   className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full transition duration-300 text-[14px] sm:text-[20px] font-poppins ${
//     isFormValid()
//       ? 'bg-[#9C3D3D] text-white hover:shadow-lg'
//       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//   }`}
// >
//   Submit Response
// </button>

//             </div>
//           </div>
//         </div>

//         {/* Confirmation Modal */}
//         {showConfirmation && (
//   <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-[90%] max-w-[400px] text-center">
//               {!showFinalMessage ? (
//                 <>
//                   <h2 className="text-[#9C3D3D] text-xl font-bold mb-4 font-poppins">Confirm Submission?</h2>
//                   <p className="text-gray-600 mb-6 font-poppins text-sm sm:text-base">
//                     Are you sure you want to submit form? You can edit previous section if necessary.
//                   </p>
//                   <div className="flex justify-around">
//                     <button
//                       onClick={() => setShowConfirmation(false)}
//                       className="border border-[#9C3D3D] text-[#9C3D3D] px-4 sm:px-6 py-2 rounded-full font-semibold font-poppins"
//                     >
//                       Edit
//                     </button>
// <button
//   onClick={handleSubmit}
//   disabled={isSubmitting}
//   className="bg-[#9C3D3D] text-white px-4 sm:px-6 py-2 rounded-full font-semibold font-poppins flex items-center justify-center"
// >
//   {isSubmitting ? 'Submitting...' : 'Submit'}
// </button>

//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-[#9C3D3D] text-xl font-bold mb-4 font-poppins">Thank you for your inquiry!</h2>
//                   <p className="text-gray-600 mb-6 font-poppins text-sm sm:text-base">
//                     Our Team will get in touch shortly to discuss and customize a performance that perfectly suits your event.
//                   </p>
//                   <button
//                     onClick={() => {
//                       setShowConfirmation(false);
//                       setShowFinalMessage(false);
//                       setFormData({
//                         name: '',
//                         organisation: '',
//                         email: '',
//                         contactNumber: '',
//                         state: '',
//                         city: '',
//                         requirements: '',
//                         newsletter: 'yes',
//                       });
//                     }}
//                     className="bg-[#9C3D3D] text-white px-6 py-3 rounded-full font-semibold font-poppins"
//                   >
//                     Done
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default BookPerformance;

import React, { useState } from 'react';
import mandala from '../assets/wallpaper.png';
import axios from 'axios';
import indianStatesAndCities from '../data/indian_states_cities';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import ScrollToHashElement from './ScrollToHashElement';

const BookPerformance = () => {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
  name: '',
  organisation: '',
  email: '',
  contactNumber: '',
  state: '',
  city: '',
  requirements: '',
  newsletter: 'yes',
  performanceDate: '',
  performanceOccasion: '',
  customPerformanceOccasion: '',
  artCategory: '',
  customArtCategory: '',
  artType: '',
  customArtType: '',
  language: '',
  customLanguage: '',
});


 const performanceOccasions = [
  'Annual Day',
  'Award Ceremony',
  'Awareness Program',
  'Birthday Celebration',
  'Cultural Night',
  'College Fest',
  'Convocation Ceremony',
  'Corporate Event',
  'Dance Competition',
  'Diwali Celebration',
  'Farewell',
  'Fest Launch',
  'Festival Celebration',
  'Fundraiser',
  'Government Function',
  'Inauguration Ceremony',
  'Independence Day',
  'Music Concert',
  'Navratri Celebration',
  'Orientation Program',
  
  'Public Gathering',
  'Republic Day',
  'Religious Function',
  'School Fest',
  'Social Gathering',
  'Stage Play or Drama',
  'Talent Hunt',
  'Traditional Day',
  'University Program',
  'Wedding Function',
  'Workshop',
  'Youth Festival',
  'other'
];


 // Art type options with corresponding categories
 const artTypeOptions = {
  'Dance': [
    'Classical',
    'Folk',
    'Contemporary',
    'Traditional',
    'Bollywood',
    'Semi-Classical',
    'Modern',
    'Street Dance',
    'Hip-Hop',
    'Fusion',
    'Thematic',
    'Dance Drama',
    'Other'
  ],
  'Music': [
    'Classical',
    'Folk',
    'Devotional',
    'Bhajan',
    'Ghazal',
    'Qawwali',
    'Sufi',
    'Bollywood',
    'Rock',
    'Pop',
    'Jazz',
    'Indie',
    'Contemporary',
    'Fusion',
    'Other'
  ],
  'Theatre': [
    'Drama',
    'Street Play (Nukkad Natak)',
    'Experimental',
    'Mime',
    'Improvisational',
    'Puppetry',
    'Solo Act',
    'Musical Theatre',
    'Stand-up Comedy',
    'Skit',
    'Other'
  ],
  'Instrumental': [
    'Classical',
    'Folk',
    'Fusion',
    'Western',
    'Carnatic',
    'Hindustani',
    'Percussion',
    'String',
    'Wind',
    'Solo',
    'Ensemble',
    'Other'
  ],
  'Vocals': [
    'Classical',
    'Folk',
    'Devotional',
    'Bhajan',
    'Ghazal',
    'Sufi',
    'Qawwali',
    'Bollywood',
    'Pop',
    'Rock',
    'Rap',
    'Contemporary',
    'Indie',
    'Western',
    'Other'
  ],

  // 'Storytelling': [
  //   'Mythological',
  //   'Folklore',
  //   'Historical',
  //   'Personal Narrative',
  //   'Contemporary',
  //   'Children',
  //   'Interactive',
  //   'Poetic Recitation',
  //   'Other'
  // ],
  // 'Magic & Illusion': [
  //   'Stage Magic',
  //   'Close-Up Magic',
  //   'Mentalism',
  //   'Illusion Acts',
  //   'Street Magic',
  //   'Other'
  // ],
  // 'Circus Arts': [
  //   'Juggling',
  //   'Aerial Arts',
  //   'Acrobatics',
  //   'Clowning',
  //   'Balancing Acts',
  //   'Fire Acts',
  //   'Other'
  // ],
  // 'Martial Arts Performance': [
  //   'Kalaripayattu',
  //   'Silambam',
  //   'Chhau',
  //   'Thang Ta',
  //   'Contemporary Martial Display',
  //   'Other'
  // ],
  'Other': ['Other']
};

  const typeOfArtOptions = Object.keys(artTypeOptions);


const languageOptions = [
  'Angika', 'Assamese', 'Awadhi', 'Bengali', 'Bhili', 'Bhojpuri', 'Bodo',
  'Braj', 'Chhattisgarhi', 'Dogri', 'English', 'Garhwali', 'Garo',
  'Gujarati', 'Haryanvi', 'Hindi', 'Ho', 'Kannada', 'Kashmiri', 'Khasi',
  'Kodava', 'Konkani', 'Kumaoni', 'Ladakhi', 'Lepcha', 'Magahi', 'Maithili',
  'Malayalam', 'Manipuri', 'Marathi', 'Marwari', 'Mizo', 'Nagamese',
  'Nepali', 'Odia', 'Oraon', 'Pali', 'Punjabi', 'Prakrit',
  'Rajasthani', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil', 'Telugu', 'Tribal Languages',
  'Tulu', 'Urdu', 'other'
];



  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');


  const cityOptions = formData.state ? indianStatesAndCities[formData.state] || [] : [];
  const artCategoryOptions = formData.artType ? artTypeOptions[formData.artType] || [] : [];



   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset category when art type changes
      ...(name === 'artType' ? { artCategory: '', customArtCategory: '' } : {})
    }));
  };


  const validateForm = () => {
    // Basic required fields
    const requiredFields = [
      { field: 'name', message: 'Please enter your name' },
      { field: 'organisation', message: 'Please enter your organisation name' },
      { field: 'email', message: 'Please enter your email address' },
      { field: 'contactNumber', message: 'Please enter your contact number' },
      { field: 'state', message: 'Please select your state' },
      { field: 'city', message: 'Please select your city' },
      { field: 'requirements', message: 'Please describe your requirements' },
      { field: 'performanceDate', message: 'Please select the performance date' },
      { field: 'performanceOccasion', message: 'Please select performance occasion' },
      { field: 'artType', message: 'Please select art type' },
      { field: 'artCategory', message: 'Please select art category' },
      { field: 'language', message: 'Please select language' }
    ];

    for (const { field, message } of requiredFields) {
      if (!formData[field]?.trim()) return message;
    }

    // Conditional required fields
    if (formData.performanceOccasion === 'Other' && !formData.customPerformanceOccasion.trim()) {
      return 'Please enter custom occasion';
    }
    if (formData.artCategory === 'Other' && !formData.customArtCategory.trim()) {
      return 'Please enter custom category';
    }
    if (formData.artType === 'Other' && !formData.customArtType.trim()) {
      return 'Please enter custom art type';
    }
    if (formData.language === 'Other' && !formData.customLanguage.trim()) {
      return 'Please enter custom language';
    }

    return '';
  };

  const handleSubmitClick = () => {
    const error = validateForm();
    if (error) {
      setValidationMessage(error);
      setShowValidationDialog(true);
      return;
    }
    setShowConfirmation(true);
  };

  // const handleSubmit = async () => {
  //   setIsSubmitting(true);
  //   try {
  //     // const response = await axios.post('/api/book-performance', formData);
      
  //     const response = await axios.post('http://localhost:5000/api/book-performance', formData);
  //     if (response.data.success) {
  //       setShowFinalMessage(true);
  //     } else {
  //       alert('Error submitting booking. Please try again.');
  //       setShowConfirmation(false);
  //     }
  //   } catch (error) {
  //     console.error('Submission error:', error);
  //     alert('An error occurred. Please try again later.');
  //     setShowConfirmation(false);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

 

  const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
 const payload = {
  ...formData,
  performanceOccasion: formData.performanceOccasion === 'Other' ? formData.customPerformanceOccasion : formData.performanceOccasion,
  artCategory: formData.artCategory === 'Other' ? formData.customArtCategory : formData.artCategory,
  artType: formData.artType === 'Other' ? formData.customArtType : formData.artType, // ✅ fixed key
  language: formData.language === 'Other' ? formData.customLanguage : formData.language,
};



console.log(payload);

    // const response = await axios.post('/api/book-performance', payload); 
    // // use payload instead of formData

    const response = await axios.post('https://ekalakaar.com/api/book-performance', payload);
// const response = await axios.post(`${API_A}/book-performance`, payload);
    if (response.data.success) {
      setShowFinalMessage(true);
    } else {
      alert('Error submitting booking. Please try again.');
      setShowConfirmation(false);
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('An error occurred. Please try again later.');
    setShowConfirmation(false);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
  <>
    <div id="book" className="bg-white min-h-screen pt-10 px-4 sm:px-10 pb-20">
      <ScrollToHashElement/>
      <p className="text-[0.875rem] md:text-[1.25rem] lg:text-[1.325rem] ml-8 max-[440px]:ml-[-15px] max-[440px]:text-[0.875rem] max-[440px]:mb-2 font-medium mb-4">
        <Link to="/" className="text-gray-800 hover:underline">Home</Link> / <span className="text-[#AD2F3B]">Book Performance</span>
      </p>

      <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] font-bold text-[#AD2F3B] text-center mb-4 sm:mb-6">
        Book Performance
      </h1>
      <p className="text-center text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] text-gray-700 mb-6 sm:mb-10">
        Let eKalakaar curate a bespoke experience for you!
      </p>

      <div
        className="relative rounded-xl shadow-md mx-auto p-5 sm:p-10 overflow-hidden bg-[#FDF6EE]"
        style={{
          width: '90%',
          maxWidth: '1300px',
        }}
      >
        {/* Mandalas (unchanged) */}
        <img
          src={mandala}
          alt="Mandala Top Right"
          className="hidden sm:block absolute w-[450px] h-[450px] opacity-30 pointer-events-none z-0"
          style={{ top: "-170px", right: "-170px" }}
        />
        <img
          src={mandala}
          alt="Mandala Center"
          className="hidden sm:block absolute top-1/2 left-1/2 w-[600px] transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none z-0"
        />
        <img
          src={mandala}
          alt="Mandala Bottom Left"
          className="hidden sm:block absolute w-[450px] h-[450px] opacity-30 pointer-events-none z-0"
          style={{ bottom: "-170px", left: "-170px" }}
        />

        {/* Form */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-x-[100px] sm:gap-y-[50px]">
          {[
            { label: 'Name:', name: 'name', type: 'text', placeholder: 'Enter name here' },
            { label: 'Organisation Name:', name: 'organisation', type: 'text', placeholder: 'Enter Company Name here' },
            { label: 'Email:', name: 'email', type: 'email', placeholder: 'Enter Email here' },
            { label: 'Contact Number:', name: 'contactNumber', type: 'text', placeholder: 'Enter Contact Number' }
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">{label}</label>
              <input
                name={name}
                value={formData[name]}
                onChange={handleChange}
                type={type}
                placeholder={placeholder}
                className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-poppins text-black"
              />
            </div>
          ))}

          {/* State */}
          <div>
            <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">State:</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-poppins text-black"
            >
              <option value="">Select Event State</option>
              {Object.keys(indianStatesAndCities).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">City:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
              className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-poppins text-black"
            >
              <option value="">{formData.state ? 'Select City' : 'Select State First'}</option>
              {cityOptions.map((city, index) => (
  <option key={`${city}-${index}`} value={city}>{city}</option>
))}

            </select>
          </div>
 <div>
  <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">Performance Occasion:</label>
  <select
    name="performanceOccasion"
    value={formData.performanceOccasion}
    onChange={handleChange}
    className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
  >
    <option value="">Select Occasion</option>
    {performanceOccasions.map((item, index) => (
      <option key={index} value={item}>{item}</option>
    ))}
  </select>
  {formData.performanceOccasion === 'Other' && (
    <input
      type="text"
      name="customPerformanceOccasion"
      value={formData.customPerformanceOccasion}
      onChange={handleChange}
      placeholder="Enter custom occasion"
      className="w-full border border-black mt-2 rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
    />
  )}
</div>


{/* Category of Art */}
 <div>
    <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">Type of Art:</label>
    <select
      name="artType"
      value={formData.artType}
      onChange={handleChange}
      className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
    >
      <option value="">Select Art Type</option>
      {typeOfArtOptions.map((item, index) => (
        <option key={index} value={item}>{item}</option>
      ))}
    </select>
    {formData.artType === 'Other' && (
      <input
        type="text"
        name="customArtType"
        value={formData.customArtType}
        onChange={handleChange}
        placeholder="Enter custom type"
        className="w-full border border-black mt-2 rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
      />
    )}
  </div>

  {/* Category of Art - now dynamic based on artType */}
  <div>
    <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">Category of Art:</label>
    <select
      name="artCategory"
      value={formData.artCategory}
      onChange={handleChange}
      disabled={!formData.artType}
      className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
    >
      <option value="">{formData.artType ? 'Select Category' : 'Select Art Type First'}</option>
      {artCategoryOptions.map((item, index) => (
        <option key={index} value={item}>{item}</option>
      ))}
    </select>
    {formData.artCategory === 'Other' && (
      <input
        type="text"
        name="customArtCategory"
        value={formData.customArtCategory}
        onChange={handleChange}
        placeholder="Enter custom category"
        className="w-full border border-black mt-2 rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
      />
    )}
  </div>

{/* Language */}
<div>
  <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">Language:</label>
  <select
    name="language"
    value={formData.language}
    onChange={handleChange}
    className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
  >
    <option value="">Select Language</option>
    {languageOptions.map((item, index) => (
      <option key={index} value={item}>{item}</option>
    ))}
  </select>
  {formData.language === 'Other' && (
    <input
      type="text"
      name="customLanguage"
      value={formData.customLanguage}
      onChange={handleChange}
      placeholder="Enter custom language"
      className="w-full border border-black mt-2 rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-black"
    />
  )}
</div>



          {/* Requirements */}
          <div>
            <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">
              Requirements/Requests:
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              placeholder="Write your Requirements such as date, type of event/theme, venue and audience."
              className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-poppins text-black resize-none min-h-[calc(1.5em*4+1rem)]"
              style={{ lineHeight: '1.5' }}
            />
          </div>

          {/* Newsletter */}
          <div className="sm:pl-6 mt-4">
            <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">
              Would you like to Subscribe to our Newsletter?
            </label>
            <div className="flex flex-col space-y-3 sm:space-y-6 sm:ml-6">
              {['yes', 'no'].map((val) => (
                <label key={val} className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="newsletter"
                    value={val}
                    checked={formData.newsletter === val}
                    onChange={handleChange}
                    className="appearance-none w-5 h-5 border border-black rounded-full checked:bg-[#9C3D3D] checked:border-[#9C3D3D] relative"
                  />
                  <span className="text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-poppins capitalize">{val}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Performance Date */}
<div>
  <label className="block text-black mb-2 text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-poppins">Date of Performance:</label>
  <input
    type="date"
    name="performanceDate"
    value={formData.performanceDate}
    onChange={handleChange}
    className="w-full border border-black rounded-[12px] px-4 py-2 bg-transparent focus:bg-white focus:outline-none text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-poppins text-black"
  />
</div>


          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 flex justify-center mt-10">
            <button
              onClick={handleSubmitClick}
              className="px-4 sm:px-8 py-2 sm:py-3 rounded-full transition duration-300 text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-poppins bg-[#9C3D3D] text-white hover:shadow-lg"
            >
              Submit Response
            </button>
          </div>
        </div>
      </div>

      {/* Validation Error Dialog */}
      {showValidationDialog && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-[90%] max-w-[24rem] text-center">
            <h2 className="text-[#9C3D3D] text-[1.25rem] font-bold mb-4 font-poppins">Incomplete Form</h2>
            <p className="text-gray-600 mb-6 font-poppins text-[0.875rem] sm:text-[1rem]">
              {validationMessage}
            </p>
            <button
              onClick={() => setShowValidationDialog(false)}
              className="bg-[#9C3D3D] text-white px-6 py-2 rounded-full font-semibold font-poppins"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-[90%] max-w-[24rem] text-center">
            {!showFinalMessage ? (
              <>
                <h2 className="text-[#9C3D3D] text-[1.25rem] font-bold mb-4 font-poppins">Confirm Submission?</h2>
                <p className="text-gray-600 mb-6 font-poppins text-[0.875rem] sm:text-[1rem]">
                  Are you sure you want to submit form? You can edit previous section if necessary.
                </p>
                <div className="flex justify-around">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="border border-[#9C3D3D] text-[#9C3D3D] px-4 sm:px-6 py-2 rounded-full font-semibold font-poppins"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#9C3D3D] text-white px-4 sm:px-6 py-2 rounded-full font-semibold font-poppins flex items-center justify-center"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-[#9C3D3D] text-[1.25rem] font-bold mb-4 font-poppins">Thank you for your inquiry!</h2>
                <p className="text-gray-600 mb-6 font-poppins text-[0.875rem] sm:text-[1rem]">
                  Our Team will get in touch shortly to discuss and customize a performance that perfectly suits your event.
                </p>
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setShowFinalMessage(false);
                    setFormData({
  name: '',
  organisation: '',
  email: '',
  contactNumber: '',
  state: '',
  city: '',
  requirements: '',
  newsletter: 'yes',
  performanceDate: '',
  performanceOccasion: '',
  customPerformanceOccasion: '',
  artCategory: '',
  customArtCategory: '',
  artType: '',
  customArtType: '',
  language: '',
  customLanguage: '',
});

                  }}
                  className="bg-[#9C3D3D] text-white px-6 py-3 rounded-full font-semibold font-poppins"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    <Footer />
  </>
);
};

export default BookPerformance;
