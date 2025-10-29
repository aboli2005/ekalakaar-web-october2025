// import React from 'react';
// import Heading from './Heading';
// import Photos from './photos'; // Make sure this component is correct
// import WhyChooseUs from './WhyChooseUs';
// import Footer from '../../components/Footer';
// import GenesisSection from './GenesisSection';
// import VisionMissionSection from './VisionMissionSection';
// import MilestoneAchieved from './MilestoneAchieved';
// import AwardsCarousel from './AwardsCarousel';
// import SliderSection from './SliderSection'; // <-- Adjust path


// // // Import your images
// import teamMember1 from '../../assets/aboutUs_heading/team/sanjay.png';
// import teamMember2 from '../../assets/aboutUs_heading/team/amit sir.jpeg';
// import teamMember3 from '../../assets/aboutUs_heading/team/yogii.png';
// // import teamMember4 from '../../assets/images/team4.jpg';
// // import teamMember5 from '../../assets/images/team5.jpg';

// import expert1 from '../../assets/aboutUs_heading/experts/narayanan.png';
// import expert2 from '../../assets/aboutUs_heading/experts/nidhi basu.png';
// import expert3 from '../../assets/aboutUs_heading/experts/shriram darba.png';
// import expert4 from '../../assets/aboutUs_heading/experts/maitryei.png';
// import expert5 from '../../assets/aboutUs_heading/experts/amit bhargav.png';
// import expert6 from '../../assets/aboutUs_heading/experts/sobnis.png';
// import expert7 from '../../assets/aboutUs_heading/experts/harish dash.png';
// import expert10 from '../../assets/aboutUs_heading/experts/girish.jpeg';


// import advisor1 from '../../assets/aboutUs_heading/advisors/mrutyunjay.png';
// import advisor2 from '../../assets/aboutUs_heading/advisors/WhatsApp Image 2025-05-24 at 11.32.49 PM.jpeg';
// import advisor3 from '../../assets/aboutUs_heading/advisors/t krishna.png';
// import advisor4 from '../../assets/aboutUs_heading/advisors/col. Prakash Tiwari.jpg';
// import advisor5 from '../../assets/aboutUs_heading/advisors/Untitled design (29).png';


// import expert8 from '../../assets/aboutUs_heading/experts/Rakhee Ji.png';


// const Aboutus = () => {
  
  
  
 
//   return (
//     <div className="pt-2 !mb-0 !bg-white">
      
//       <Heading />
//       <GenesisSection />
//       <VisionMissionSection />
//       <MilestoneAchieved />
//       <div className="relative">  
//   <AwardsCarousel />
// </div>

//       <SliderSection id="team"
//         title="MEET OUR TEAM"
//         underlineWidth={330}
//         data={teamMembers}
//         component={Photos}
//       />

//       <SliderSection 
//       id="experts"
//         title="eK EXPERTS"
//         underlineWidth={250}
//         data={experts}
//         component={Photos}
//       />

//       <SliderSection
//       id="advisors"
//         title="eK ADVISORS"
//         underlineWidth={270}
//         data={expertAdvisors}
//         component={Photos}
//       />

//       <WhyChooseUs />
//       <Footer />
//     </div>
//   );
// };

// export default Aboutus;
import React from 'react';
import Heading from './Heading';
import Photos from './photos';
import WhyChooseUs from './WhyChooseUs';
import Footer from '../../components/Footer';
import GenesisSection from './GenesisSection';
import VisionMissionSection from './VisionMissionSection';
import MilestoneAchieved from './MilestoneAchieved';
import AwardsCarousel from './AwardsCarousel';
import SliderSection from './SliderSection';



// Team
import teamMember1 from '../../assets/aboutUs_heading/team/sanjay.png';
import teamMember2 from '../../assets/aboutUs_heading/team/amit sir.jpeg';
import teamMember3 from '../../assets/aboutUs_heading/team/yogii.png';



// Experts
import expert1 from '../../assets/aboutUs_heading/experts/narayanan.png';
import expert2 from '../../assets/aboutUs_heading/experts/nidhi basu.png';
import expert3 from '../../assets/aboutUs_heading/experts/shriram darba.png';
import expert4 from '../../assets/aboutUs_heading/experts/maitryei.png';
import expert5 from '../../assets/aboutUs_heading/experts/amit bhargav.png';
import expert6 from '../../assets/aboutUs_heading/experts/sobnis.png';
import expert7 from '../../assets/aboutUs_heading/experts/harish dash.png';
import expert10 from '../../assets/aboutUs_heading/experts/girish.jpeg';
import expert8 from '../../assets/aboutUs_heading/experts/Rakhee Ji.png';




// Advisors
import advisor1 from '../../assets/aboutUs_heading/advisors/mrutyunjay.png';
import advisor2 from '../../assets/aboutUs_heading/advisors/WhatsApp Image 2025-05-24 at 11.32.49 PM.jpeg';
import advisor3 from '../../assets/aboutUs_heading/advisors/t krishna.png';
import advisor4 from '../../assets/aboutUs_heading/advisors/col. Prakash Tiwari.jpg';
import advisor5 from '../../assets/aboutUs_heading/advisors/Untitled design (29).png';




const Aboutus = () => {
  // const teamMembers = [
  //   {
  //     image: teamMember1,
  //     title: 'Dr. Sanjaya Pradhan',
  //     details: 'Sanjaya is an accomplished and versatile leader...',
  //     post: 'Founder',
  //   },
  //   {
  //     image: teamMember2,
  //     title: 'Mr. Amit Dutta',
  //     details: 'Amit is a senior strategy leader...',
  //     post: 'Co-Founder',
  //   },
  //   {
  //     image: teamMember3,
  //     title: 'Mr. Yogesh Pandey',
  //     details: 'Yogesh is a seasoned professional and multi-talented artist...',
  //     post: 'Head - Operations',
  //   },
  // ];

  // const experts = [
  //   {
  //     image: expert3,
  //     title: 'Dr. Shriram Darbha',
  //     details: 'Dr. Shriram Darbha is a National Expert...',
  //     post: 'National Expert - Art & Hospitality',
  //   },
  //   {
  //     image: expert4,
  //     title: 'Ms. Maitreyi Tripathyi',
  //     details: 'Ms. Maitreyi is a National Expert in Communication...',
  //     post: 'National Expert - Communication',
  //   },
  //   {
  //     image: expert6,
  //     title: 'Mr. Sobins Kuriakose',
  //     details: 'Mr. Sobins is a National Expert in Partnerships...',
  //     post: 'National Expert - Partnerships',
  //   },
  //   {
  //     image: expert5,
  //     title: 'Mr. Amit Bhargava',
  //     details: 'Mr. Amit is an HR expert and founder of ProCURE HR...',
  //     post: 'National Expert - Industry & HR',
  //   },
  //   {
  //     image: expert7,
  //     title: 'Shri Harish Dash',
  //     details: 'Harish brings 23+ years in tech, innovation, and leadership...',
  //     post: 'National Expert – Technology',
  //   },
  //   {
  //     image: expert2,
  //     title: 'Ms. Nidhi Basu',
  //     details: 'Ms. Nidhi is a voice artist and cultural promoter...',
  //     post: 'National Expert - Art',
  //   },
  //   {
  //     image: expert1,
  //     title: 'Ms. Shraddha Narayan',
  //     details: 'Shraddha is a leader in HR and program strategy...',
  //     post: 'National Expert – Strategy & Impact Leadership',
  //   },
  //   {
  //     image: expert8,
  //     title: 'Ms. Rakhee Bakshee',
  //     details: 'Rakhee is a communication and storytelling advisor...',
  //     post: 'Media & Cultural Outreach',
  //   },
  //   {
  //     image: expert10,
  //     title: 'Dr. Girish Srivastava',
  //     details: 'Girish is a governance expert with 30+ years of policy experience...',
  //     post: 'Governance Expert',
  //   },
  // ];

  // const expertAdvisors = [
  //   {
  //     image: advisor1,
  //     title: 'Dr. Mrityunjay Athreya',
  //     details: 'Padma Bhushan awardee and management thinker...',
  //     post: 'Chief Mentor',
  //   },
  //   {
  //     image: advisor2,
  //     title: 'Dr. Amarendra Khatua',
  //     details: 'Former IFS Officer and cultural advisor...',
  //     post: 'IFS (Retd.)',
  //   },
  //   {
  //     image: advisor3,
  //     title: 'Dr. T Krishna Prasad',
  //     details: 'Retired IPS officer with grassroots engagement...',
  //     post: 'IPS (Retd.)',
  //   },
  //   {
  //     image: advisor4,
  //     title: 'Col Prakash Tewari',
  //     details: 'Army veteran and leadership expert...',
  //     post: 'Armed Forces (Retd.)',
  //   },
  //   {
  //     image: advisor5,
  //     title: 'Dr. Anilesh Seth',
  //     details: 'Corporate mentor and GCC leader...',
  //     post: 'Corporate Consultant',
  //   },
  // ];
 const teamMembers = [
    {
      image: teamMember1 ,
      title: 'Dr. Sanjaya Pradhan',
      details: 'Sanjaya is an accomplished and versatile leader with a strong social compass. He brings over two decades of experience working with Corporates, Governments and NGOs in CSR, Skills & Livelihoods, Disability & Inclusion. He has worked with organizations - Tata Power, Mahindra, National Skill Development Corporation and Gram Vikas. He is an Erasmus Mundus Scholar, Ph. D, and M.A. in Social Work (MSW) from TISS.',
      post: 'Founder',
    },
    
    {
      image: teamMember2,
      title: 'Mr. Amit Dutta',
      details: 'Amit is a senior strategy leader, who is passionate about social impact.  He brings 20+ years of experience in Government & Social Sector Consulting, Strategy and Implementation with Firms like EY & KPMG. He has led national level programs related to Private Sector Development, Skills & Livelihoods, Social Welfare and Sanitation. He is an MBA in Marketing and has a certification in Leading Innovation from Stanford University.',
      post: 'Co-Founder',
    },
    {
      image: teamMember3,
      title: 'Mr. Yogesh pandey',
      details: 'Yogesh is a seasoned professional and multi-talented artist. He has over 15 years of experience in Administration & Operations gained through an impressive career in the armed forces. He is a creative artist himself, excelling in the areas of script writing, poetry and singing. Yogesh is passionate about discovering talented arts and artists and showcasing them.',
      post: '(Head - Operations)',
    },
  ];

  const experts = [
    {
      image: expert3,
      title: 'Dr. Shriram Darbha',
      details: 'Dr. Shriram Darbha is a National Expert in Art and Hospitality with 30+ years of HR leadership, including as Head-HR at BSE. He holds a Master’s in HR from TISS and a Ph.D., and has received national and international HR awards. Founder of www.gotogita.in, he offers psycho-spiritual counseling blending ancient wisdom with modern management. A promoter of Indian arts and Vedanta values, he is known as a Practical Vedantin and Work-Life Guru.',
      post: 'National Expert - Art, & Hospitality',
    },
    {
      image: expert4,
      title: 'Ms. Maitreyi Tripathyi',
      details: 'Ms. Maitreyi Tripathyi is a National Expert in Communication with over 20 years of experience in the field. She has led communication and stakeholder relations for PMKVY (Skill India) at NSDC and headed communications for UNIDO. Currently, she leads Organizational Change Management and Communication at HCL Technologies. Known for her strong communication skills and strategic approach, she is a valuable asset in driving complex organizational change and stakeholder engagement.',
      post: 'National Expert - Art, & Hospitality',
    },
    {
      image: expert6,
      title: 'Mr. Sobins Kuriakose',
      details: 'Mr. Sobins Kuriakose is a National Expert in Partnership with over 15 years of experience across governmental and non-governmental sectors, including the World Bank, NSDC, MoHUDA, Government of Gujarat, and JPAL. He specializes in skill development, livelihoods, and public policy implementation, with a strong background in policy formulation, government programs, and social mobilization. He is known for his expertise in designing and executing large-scale projects.',
      post: 'National Expert - Art, & Hospitality',
      
    },
    {
      image: expert5,
      title: 'Mr. Amit Bhargava',
      details: 'Mr. Amit Bhargava is a National Expert in Industry Partnership and HR with over 20 years of experience in HR and entrepreneurship. He is the founder of ProCURE HR Services Pvt. Ltd., offering HR solutions across three countries and 20+ cities. A pioneer of Work From Home and Flexhours culture, he champions Diversity and Inclusion. His expertise spans shared services, recruitment, compliance, learning, engagement, assessment, and tech enablement. He previously served as Group Manager HR at Bharti Airtel and holds an MBA and HR diploma from NMIMS, Mumbai.',
      post: 'National Expert - Art, & Hospitality',
    },
    {
      image: expert7,
      title: 'Shri Harish Dash',
      details: 'Shri Harish Dash is a National Expert in Technology with over 23 years of experience in entrepreneurship, business excellence, product management, and sustainability. He holds a B.Tech from NIT and an M.Tech from BITS Pilani. As a founder and mentor to successful startups, he has also held leadership roles at Tata Motors, GE, and Tata Capital. His expertise spans product launches, digital transformation, sustainability, strategy, and fundraising. He is deeply committed to using technology for business innovation and social impact.',
      post: 'National Expert – Technology ',
    },
    {
      image: expert2,
      title: 'Ms. Nidhi Basu ',
      details: 'Ms. Nidhi Basu is a National Expert in Art and the co-founder of Logicbox Communications Pvt. Ltd., a reputed media services company with national and international reach. She is a celebrated voice actor, known for her work across premium trains, national museums, banks, and e-learning platforms. As the founder of "Hindi Diary"  she empowers individuals by enhancing their Hindi communication skills to support livelihood opportunities. A passionate promoter of Indian cultural heritage since her NIFT Delhi days, she remains dedicated to preserving and promoting India’s rich cultural and artistic traditions.',
      post: 'National Expert - Art',
    },
    {
      image: expert1,
      title: 'Ms. Shraddha Narayan',
      details: 'Shraddha Narayanan is an impact-driven general management professional with over 16 years of diverse experience across program strategy, stakeholder engagement, operations, and talent development. She has built HR systems at N Coldpressed and led national initiatives at INK, combining strategic insight with people-centered leadership. Currently pursuing an MBA at IIM Bangalore, she brings a deep commitment to conscious leadership, shaped by her journey as a speaker, dancer, Zumba® instructor, and long-time Isha meditator. Her work reflects a strong belief in nurturing human potential for sustainable and meaningful growth.',
      post: 'National Expert – Strategy & Impact Leadership',
    },

    {
  image: expert8,
  title: 'Ms. Rakhee Bakshee',
  details: 'Rakhee Bakshee is a seasoned media and communication expert with over 20 years of experience in public engagement, journalism, and government outreach. Currently a Communication Advisor at IIPA (DoPT), she has held senior roles at Zee News, Doordarshan, and Rajya Sabha TV, reporting from conflict zones and spearheading impactful media campaigns. As founder of Her World India and advisor to national events like Mahakumbh 2025, she blends media, culture, and policy. A visiting mentor at IIT Kanpur and Miranda House, she is a respected analyst, speaker, and advocate for storytelling as a tool for transformation.',
  post: 'Communication, Media & Cultural Outreach',
},

    {
  image: expert10,
  title: 'Dr. Girish Srivastava',
  details: 'Dr. Girish, with over 30 years of experience, holds a Ph.D. in Management from IIFT and a B.Tech from NIT Warangal. He has led key roles at IBDF, NASSCOM, and Bechtel, contributing across policy, strategy, trade, advocacy, and technology. He has driven initiatives in content self-regulation, regulatory affairs, and global media promotion. A respected member of several government committees, he has also led impactful research for the Government of India, private sectors, and donor agencies, showcasing his commitment to policy and governance reforms.',
  post: 'Governance Expert',
},

  ];

  const expertAdvisors = [
    {
      image: advisor1 ,
      title: 'Dr. Mrityunjay Athreya',
      details: 'Dr. Mrityunjay Athreya is a pioneer of the Indian Management Movement, with nearly five decades of impactful work in education, research, and consulting. A former professor at IIM Calcutta, London Business School, and Strathclyde Business School, he holds a Doctorate in Business Administration from Harvard University. He founded the Sampradaan Indian Centre for Philanthropy to encourage giving among high-net-worth individuals. Widely respected as an independent advisor to corporates, governments, and NGOs, he has been honoured with the Padma Bhushan and the title of Dharma Pracharak for his lifelong commitment to Dharmic values and leadership.',
      post: 'Chief Mentor',
    },
    {
      image: advisor2,
      title: 'Dr. Amarendra Khatua',
      details: 'Dr. Amarendra is a senior Indian Foreign Service (IFS), Former Secretary (Special Assignment) at Ministry of External Affairs, Govt of India and Director General, Indian Council for Cultural Relations. He was the former High Commissioner of India to Argentina, Ivory Coast. He has been mentoring several social and cultural enterprises.',
      post: 'IFS (Retd.)',
    },
    {
      image: advisor3,
      title: 'Dr. T Krishna Prasad',
      details: 'He is retired Telangana Director General of Police (DGP). He studied Engineering in REC Warangal and masters from IIM Ahmedabad. He has been working with vulnerable groups particularly from rural and tribal areas. He advises eKalakaar for bringing hidden talents from unknown areas and create opportunity for them.',
      post: 'IPS (Retd.)',
    },
    {
      image: advisor4,
      title: 'Col Prakash Tewari',
      details: 'Col Prakash Tewari, is a retired Indian Army veteran. He currently sits on the Board of the Grameen Foundation. He has worked with DLF Ltd., Jindal Steel and Power Limited and Tata Power Company Limited. He has written a book on Leadership Development “Bunker to Bliss”.',
      post: 'Armed Forces (Retd.) ',
    },
        {
      image: advisor5,
      title: 'Dr. Anilesh Seth',
      details: 'Global Captives (GIC/GCC/GCOE) leader with expertise in setting up, scaling, and managing 7000+ FTE offshore centers. Ex-IIT Madras, IIM Bangalore (Gold Medalist), EFPM from ISB. Worked with Anthem, LG, Toyota, NIIT, HCL. Cofounder of GigVistas; Mentor at NSRCEL, IIMB; Charter Member, TiE.',
      post: 'Corporate Consultant ',
    },

  ];

  return (
    <div className="pt-4 bg-white">
      <Heading />
      <GenesisSection />
      <VisionMissionSection />
      <MilestoneAchieved />
      <div className="relative z-10">
        <AwardsCarousel />
      </div>

      <SliderSection
        id="team"
        title="MEET OUR TEAM"
        underlineWidth={330}
        data={teamMembers}
        component={Photos}
      />

      <SliderSection
        id="experts"
        title="eK EXPERTS"
        underlineWidth={250}
        data={experts}
        component={Photos}
      />

      <SliderSection
        id="advisors"
        title="eK ADVISORS"
        underlineWidth={270}
        data={expertAdvisors}
        component={Photos}
      />

      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Aboutus;
