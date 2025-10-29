

// import React, { useState } from 'react';
// import axios from 'axios';
// import contactImage from '../assets/contact.jpeg'; // adjust path if needed
// import mandala from '../assets/wallpaper.png';
// import ScrollToHashElement from '../pages/ScrollToHashElement'; // 👈 Import here

// const Contact = () => {

  

//   return (
//     <div id='contact' className="w-full bg-white py-16 flex justify-center relative overflow-x-hidden">
//       <ScrollToHashElement/>
//       <div className="hidden sm:block">
//       <img
//         src={mandala}
//         alt="Mandala Top Right"
//         className="absolute top-[-200px] right-[-220px] w-[500px] opacity-[0.7] z-0"
//       />
//       <img
//         src={mandala}
//         alt="Mandala Top Left"
//         className="absolute top-[-200px] left-[-220px] w-[500px] opacity-[0.7] z-0"
//       /></div>
//       <div className="w-full flex flex-col items-center px-[40px]">
//         {/* Heading */}
//         <h2 className="text-[32px] font-bold text-[#AD2F3B] mt-[30px] mb-[100px] border-b-2 border-[#AD2F3B] leading-[55px] max-[440px]:text-[20px] max-[440px]:mb-8">
//           GET IN TOUCH
//         </h2>

//         {/* Content: Image + Form */}
//         <div className="w-full flex flex-col md:flex-row md:items-start  gap-12">
//           {/* Image */}
//           <div className="flex-shrink-0 mx-auto max-[440px]:mb-6">
//             <img
//               src={contactImage}
//               alt="Contact"
//               className="w-[620px] h-[650px] object-cover rounded-md max-[440px]:w-[350px] max-[440px]:h-[350px]"
//             />
//           </div>

//           {/* Form */}
//           <div className="flex-1 mt-[9px] max-[440px]:w-[350px]">
// <form className="grid grid-cols-1 md:grid-cols-2 gap-10 max-[440px]:gap-6  max-[440px]:mt-[-30px] max-[440px]:px-4" onSubmit={handleSubmit}>
//               {/* Name */}
//               <div>
//                 <label className="text-[#AD2F3B] font-semibold block mb-2 text-[19px] max-[440px]:text-[14px]">
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none text-[18px] max-[440px]:w-full placeholder:text-[18px] max-[440px]:text-[12px] max-[440px]:placeholder:text-[12px]"
//                 />
//               </div>

//               {/* Contact Number */}
//               <div>
//                 <label className="text-[#AD2F3B] font-semibold block mb-2 text-[19px] max-[440px]:text-[14px]">
//                   Contact number:
//                 </label>
//                 <input
//                   type="text"
//                   name="contactNumber"
//                   placeholder="Enter Contact No."
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 max-[440px]:w-full outline-none text-[18px] placeholder:text-[18px] max-[440px]:text-[12px] max-[440px]:placeholder:text-[12px]"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="text-[#AD2F3B] font-semibold block mb-2 text-[19px] max-[440px]:text-[14px]">
//                   Email ID:
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter Email ID"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none text-[18px] placeholder:text-[18px] max-[440px]:text-[12px] max-[440px]:placeholder:text-[12px]"
//                 />
//               </div>

//               {/* City */}
//               <div>
//                 <label className="text-[#AD2F3B] font-semibold block mb-2 text-[19px] max-[440px]:text-[14px]">
//                   City:
//                 </label>
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Enter City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none text-[18px] placeholder:text-[18px] max-[440px]:text-[12px] max-[440px]:placeholder:text-[12px]"
//                 />
//               </div>

//               {/* Purpose */}
//               <div className="md:col-span-2">
//                 <label className="text-[#AD2F3B] font-semibold block mb-2 text-[19px] max-[440px]:text-[14px]">
//                   Purpose:
//                 </label>
//                 <div className="relative w-full">
//                   <select
//                     name="purpose"
//                     value={formData.purpose}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 outline-none text-[18px] appearance-none text-gray-700 max-[440px]:text-[12px]"
//                   >
//                     <option value="">Select Purpose</option>
//                     <option>Business Enquiry</option>
//                     <option>General Enquiry</option>
//                     <option>Media Enquiry</option>
//                     <option>Work with us</option>
//                     <option>Feedback</option>
//                     <option>Volunteer</option>
//                     <option>Internship</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Message */}
//               <div className="md:col-span-2">
//                 <label className="text-[#AD2F3B] font-semibold block mb-2 text-[19px] max-[440px]:text-[14px]">
//                   Message:
//                 </label>
//                 <textarea
//                   name="message"
//                   placeholder="Enter your message here.."
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 h-[140px] resize-none outline-none text-[20px] placeholder:text-[18px] max-[440px]:text-[12px] max-[440px]:placeholder:text-[12px]"
//                 ></textarea>
//               </div>

//               {/* Submit Button */}
//               <div className="w-full flex justify-center ml-[240px] mt-4 max-[440px]:ml-0">
// <button
//   type="submit"
//   className="px-10 py-2 rounded-full border-2 border-[#AD2F3B] text-[#AD2F3B] bg-white hover:text-white hover:!bg-[#AD2F3B] text-[18px] ">
//   {loading ? 'Submitting...' : 'Submit'}
// </button>

//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from 'react';
import axios from 'axios';
import contactImage from '../assets/contact.jpeg';
import mandala from '../assets/wallpaper.png';
import ScrollToHashElement from '../pages/ScrollToHashElement';

const Contact = () => {
  // const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   contactNumber: '',
  //   email: '',
  //   city: '',
  //   purpose: '',
  //   message: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await axios.post('/api/contact', formData);
  //     alert('Form submitted successfully!');
  //     setFormData({
  //       name: '',
  //       contactNumber: '',
  //       email: '',
  //       city: '',
  //       purpose: '',
  //       message: '',
  //     });
  //   } catch (error) {
  //     console.error('Error submitting the form', error);
  //     alert('Error submitting the form. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const [loading, setLoading] = useState(false);
const API_A = process.env.REACT_APP_BACKEND_A;


  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    city: '',
    purpose: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true); // disable the button

    try {
      const response = await axios.post('https://ekalakaar.com/api/contact', formData);
     
      // console.log('New contact saved:', newContact);  // Debugging log
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        city: '',
        purpose: '',
        message: '',
      });  // Reset form after submission
    } catch (error) {
      console.error('Error submitting the form', error);
      alert('Error submitting the form. Please try again.');
    }
    finally {
    setLoading(false); // re-enable the button
  }
  };

  return (
    <section id="contact" className="relative bg-white overflow-hidden z-0">

      <ScrollToHashElement />

      {/* Mandala Backgrounds */}
      <div className="hidden sm:block">
        <img
  src={mandala}
  alt="Mandala Top Right"
  className="absolute 
    top-[-6rem] md:top-[-6rem] lg:top-[-8rem] xl:top-[-11.5rem] 
    right-[-5rem] md:right-[-6rem] lg:right-[-5rem] xl:right-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>

{/* Top Left */}
<img
  src={mandala}
  alt="Mandala Top Left"
  className="absolute 
    top-[-6rem] md:top-[-6rem] lg:top-[-8rem] xl:top-[-11.5rem] 
    left-[-5rem] md:left-[-6rem] lg:left-[-5rem] xl:left-[-7rem]
    w-[20rem] md:w-[17rem] lg:w-[19rem] xl:w-[25rem] 
    opacity-[0.7] z-0 hidden md:block"
/>
      </div>

      {/* Heading */}
      <div className=' mx-4  md:mx-6 lg:mx-0 xl:mx-16'>
      <div className="text-center mb-8 md:mb-12 lg:mb-16 mt-6 md:mt-10 lg:mt-12 xl:mt-14">
        <h2 className="text-[#AD2F3B] font-bold border-b-2 border-[#AD2F3B] pb- inline-block
          text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] leading-snug">
          GET IN TOUCH
        </h2>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-4 pb-12 md:pb-16 lg:pb-20">
        <div className="sm:px-2  md:px-8 lg:px-12  xl:px-6">
<div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center lg:items-start lg:h-[28rem] xl:h-[34rem]">
  {/* Image */}
  <div className="w-full lg:w-1/2 h-full z-10">
    <img
      src={contactImage}
      alt="Contact"
      className="w-full h-full object-cover rounded-md"
    />
  </div>

  {/* Form + Button */}
  <div className="w-full lg:w-1/2 h-full flex flex-col justify-between">
    <form
      
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-3 xl:gap-4">
      {/* Input Fields */}
      {[
        { label: 'Name:', name: 'name', type: 'text', placeholder: 'Enter Name' },
        { label: 'Contact Number:', name: 'contactNumber', type: 'tel', placeholder: 'Enter Contact No.' },
        { label: 'Email ID:', name: 'email', type: 'email', placeholder: 'Enter Email ID' },
        { label: 'City:', name: 'city', type: 'text', placeholder: 'Enter City' },
      ].map((field) => (
        <div key={field.name}>
          <label className="text-[#AD2F3B] font-semibold block mb-1 
            text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.925rem] xl:text-[1.05rem]">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.name !== 'city'}
            className="w-full border border-gray-300 rounded-lg px-2 py-1.5 outline-none 
              text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.925rem] xl:text-[1.05rem]"
          />
        </div>
      ))}

      {/* Purpose Dropdown */}
      <div className="md:col-span-2">
        <label className="text-[#AD2F3B] font-semibold block mb-1 
          text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.925rem] xl:text-[1.05rem]">
          Purpose:
        </label>
        <select
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-2 py-2 outline-none text-gray-700 
            text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.925rem] xl:text-[1.05rem]"
        >
          <option value="">Select Purpose</option>
          <option>Business Enquiry</option>
          <option>General Enquiry</option>
          <option>Media Enquiry</option>
          <option>Work with us</option>
          <option>Feedback</option>
          <option>Volunteer</option>
          <option>Internship</option>
          <option>Other</option>
        </select>
      </div>

      {/* Message */}
      <div className="md:col-span-2">
        <label className="text-[#AD2F3B] font-semibold block mb-1 
          text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.925rem] xl:text-[1.05rem]">
          Message:
        </label>
        <textarea
          name="message"
          placeholder="Enter your message here..."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-2 py-1.5 outline-none resize-none 
            h-[6rem] md:h-[7rem] lg:h-[7rem] xl:h-[8rem]
            text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.925rem] xl:text-[1.05rem]"
        ></textarea>
      </div>
      </div>
      <div className="w-full flex justify-center mt-4 lg:mt-2">
  <button
    type="submit"
    disabled={loading}
    className="px-5 md:px-6 py-2 rounded-full 
      bg-[#AD2F3B] text-white 
      hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
      transition-all duration-300 
      text-[0.75rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[0.95rem] xl:text-[1.05rem]"
  >
    {loading ? 'Submitting...' : 'Submit'}
  </button>
</div>
    </form>

    {/* Submit Button */}


            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

