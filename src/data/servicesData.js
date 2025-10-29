// src/data/servicesData.js

import enableImg from '../assets/services/impact1.png';
import engageImg from '../assets/services/engage/Screenshot 2025-03-21 205039.png';
import elevateImg from '../assets/services/elevate/Screenshot 2025-03-22 141845.png';

export const servicesData = [
  {
    id: 'enable',
    title: 'ENABLE',
    subtitle: 'Social & Rural Marketing',
    descriptionPoints: [
      'Connect corporates and social organizations with their last-mile rural and suburban stakeholders.',
      'Design impactful awareness campaigns using local insights and traditional storytelling.',
      'Drive business growth or social behaviour change through culturally rooted outreach.',
      'Clients: Corporates, ESG/Development sector, Organisations, Governments.',
    ],
    mainImage: require('../assets/services/impact1.png'),
    highlights: [
      {
        title: 'Tata Power (Odisha)',
        image: require('../assets/services/WhatsApp Image 2025-05-06 at 6.11.52 PM.jpeg'),
        theme:
          'Awareness on digital payments app through folk storytelling and dance-drama across rural Odisha',
        outreach: 'Spanned 50 villages across 5 districts of Odisha, covering over 5000 rural consumers.',
        impact: '25% improvement in app downloads and digital payments',
      },
      {
        title: 'Ministry of Social Justice & Empowerment (Prayagraj)',
        image: require('../assets/services/mahakumbh.jpg'),
        theme:
          'Awareness on Government welfare schemes for SC education, employment, entrepreneurship and health through a thematic dance-drama at Maha Kumbha Mela',
        outreach: '+90 performances covering thousands of pilgrims and local attendees',
        impact:
          'Increase in awareness levels and understanding of scheme benefits among target beneficiaries, especially youth',
      },
    ],
  },
  {
    id: 'engage',
    title: 'ENGAGE',
    subtitle: 'Conferences & Events',
    descriptionPoints: [
      'Curate bespoke, thematic cultural performances for corporate events and conferences.',
      'Create immersive experiences that align with event goals and narratives.',
      'Facilitate meaningful engagement with audiences through powerful storytelling.',
      'Clients: Corporates, Industrial & ESG/Development Sector Organisations, Academia.',
    ],
    mainImage: require('../assets/services/engage/Picture1.png'),
    highlights: [
      {
        title: 'GIZ (Bhubaneswar)',
        image: require('../assets/services/engage/Screenshot 2025-03-19 140000.png'),
        theme:
          'Curated a Mayurbhanj Chhau performance depicting lives and livelihoods of fisherfolk at a multi-stakeholder aquaculture conference at Hotel Mayfair',
        outreach:
          'Key stakeholders in sustainable aquaculture such as Government agencies, NGOs and start-ups',
        impact:
          'Enhanced stakeholder engagement and facilitated stronger connection and networking among stakeholders',
      },
      {
        title: 'INK Talks (Bengaluru)',
        image: require('../assets/services/engage/Screenshot 2025-03-21 205039.png'),
        theme:
          'Folk Kamsale performance at the Power of Culture session at TiE Global Summit 2024 at Bangalore International Centre',
        outreach: 'International audience of over 200 innovators and thought leaders',
        impact:
          'Demonstrated how creative expression can foster community, offer hope, and preserve heritage',
      },
    ],
  },
  {
    id: 'elevate',
    title: 'ELEVATE',
    subtitle: 'Cultural Entertainment',
    descriptionPoints: [
      'Curate unique cultural performances for private HNI events and elite gatherings at clubs and hotels',
      'Deliver uplifting festive experiences for special occasions and celebrations.',
      'Collaborate with renowned folk and classical artists to create unforgettable moments.',
      'Clients: Corporates, Luxury Hotels & Resorts, Elite Clubs, HNI Events',
    ],
    mainImage: require('../assets/services/elevate/Screenshot 2025-03-27 132810-Picsart-AiImageEnhancer.png'),
    highlights: [
      {
        title: 'Goregaon Sports Club (Mumbai)',
        image: require('../assets/services/elevate/Screenshot 2025-03-22 141845.png'),
        theme: 'Annual “Diwali Pahaat” morning devotional concert',
        outreach: 'Over 200 elite club members and guests celebrating Diwali.',
        impact:
          'Enraptured audience with rich classical and folk devotional song, music and dance performance for two years.',
      },
      {
        title: 'High-profile Private HNI Dinner (Gurgaon)',
        image: require('../assets/services/elevate/Untitled design (31).png'),
        theme:
          'High-energy Rajasthani folk entertainment at Grand Hyatt, Gurgaon for HNI function',
        outreach: 'Celebrity folk artists from Jaisalmer entertained over 100 guests',
        impact:
          'Culturally vibrant entertainment for an unforgettable evening for elite guests.',
      },
    ],
  },
];
