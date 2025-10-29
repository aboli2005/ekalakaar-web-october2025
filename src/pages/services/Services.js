

// import React, { useRef, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import CulturalPartner from './CulturalPartner';
// import Footer from '../../components/Footer';
// import { servicesData } from '../../data/servicesData';
// import ServiceSection from './ServiceSection';
// import '../../style/common.css'; // adjust path based on where Services.js is


// const Services = () => {
//   const location = useLocation();
//   const sectionRefs = useRef({});

//   useEffect(() => {
//     const hash = location.hash.replace('#', '');
//     setTimeout(() => {
//       const target = sectionRefs.current[hash];
//       if (target) target.scrollIntoView({ behavior: 'smooth' });
//     }, 100);
//   }, [location]);

//   return (
//     <div className="!bg-white">
//       <CulturalPartner />
//       {servicesData.map((section) => (
//   <div
//     key={section.id}
//     id={section.id}
//     ref={(el) => (sectionRefs.current[section.id] = el)}
//     style={{ scrollMarginTop: '6.25rem' }}
//   >
//     <ServiceSection section={section} />

//     {/* Insert "Book Performance" button after Elevate section */}
//     {section.id === 'elevate' && (
//       <div className="flex justify-center my-12">
//         <a href="/book" className="btn-main .btn-main:hover ">
//           Book a Performance
//         </a>
//       </div>
//     )}
//   </div>
// ))}

//       <Footer />
//     </div>
//   );
// };

// export default Services;
// src/pages/Services.jsx

import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CulturalPartner from './CulturalPartner';
import Footer from '../../components/Footer';
import { servicesData } from '../../data/servicesData';
import ServiceSection from './ServiceSection';
import '../../style/common.css';

const Services = () => {
  const location = useLocation();
  const sectionRefs = useRef({});

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    setTimeout(() => {
      const target = sectionRefs.current[hash];
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [location]);

  return (
    <div className="bg-white w-full">
      <CulturalPartner />
      {servicesData.map((section) => (
        <div
          key={section.id}
          id={section.id}
          ref={(el) => (sectionRefs.current[section.id] = el)}
          style={{ scrollMarginTop: '6.25rem' }}
        >
          <ServiceSection section={section} />

          {section.id === 'elevate' && (
            <div className="flex justify-center my-12">
              <a href="/book" className="btn-main btn-main:hover ">
                Book a Performance
              </a>
            </div>
          )}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Services;
