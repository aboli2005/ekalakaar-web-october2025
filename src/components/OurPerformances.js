import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './OurPerformances.css';

import enable1 from '../assets/performances/enable1.jpeg';
import enable2 from '../assets/performances/enable2.jpeg';
import enable3 from '../assets/performances/enable3.jpeg';
import engage1 from '../assets/performances/engage1.jpeg';
import engage2 from '../assets/performances/engage2.jpeg';
import engage3 from '../assets/performances/engage3.jpeg';
import elevate1 from '../assets/performances/elevate1.jpeg';
import elevate2 from '../assets/performances/elevate2.jpeg';
import elevate3 from '../assets/performances/elevate3.jpeg';

const performanceData = {
  enable: [
    { image: enable1, title: 'Performance Name', artForm: 'Art Form' },
    { image: enable2, title: 'Performance Name', artForm: 'Art Form' },
    { image: enable3, title: 'Performance Name', artForm: 'Art Form' },
  ],
  engage: [
    { image: engage1, title: 'Performance Name', artForm: 'Art Form' },
    { image: engage2, title: 'Performance Name', artForm: 'Art Form' },
    { image: engage3, title: 'Performance Name', artForm: 'Art Form' },
  ],
  elevate: [
    { image: elevate1, title: 'Performance Name', artForm: 'Art Form' },
    { image: elevate2, title: 'Performance Name', artForm: 'Art Form' },
    { image: elevate3, title: 'Performance Name', artForm: 'Art Form' },
  ],
};

const tabOrder = ['enable', 'engage', 'elevate'];

const OurPerformances = () => {
  const [selectedTab, setSelectedTab] = useState('engage');
  const performances = performanceData[selectedTab];

  const handleArrowClick = (direction) => {
    const currentIndex = tabOrder.indexOf(selectedTab);
    const newIndex =
      direction === 'left'
        ? (currentIndex - 1 + tabOrder.length) % tabOrder.length
        : (currentIndex + 1) % tabOrder.length;
    setSelectedTab(tabOrder[newIndex]);
  };

  return (
    <div className="w-full font-[Poppins] mt-[135px]">
      <h2 className="text-4xl  font-bold text-center text-[#AD2F3B] underline decoration-[#AD2F3B] decoration-2 underline-offset-8">
        OUR PERFORMANCES
      </h2>

      {/* Tab Navbar */}
      <div className="mt-24 flex justify-center">
        <div className="w-[746px] h-[78px] bg-[#AD2F3B] rounded-full flex items-center justify-between px-2 py-1">
          {tabOrder.map((label) => (
            <button
              key={label}
              className={`flex-1 h-full text-[20px] transition-all duration-300 rounded-full capitalize ${
                selectedTab === label
                  ? 'bg-white text-[#AD2F3B]'
                  : 'bg-transparent text-white hover:bg-white hover:text-[#AD2F3B] ml-2'
              }`}
              onClick={() => setSelectedTab(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Arrows + Carousel */}
      <div className="mt-24 flex justify-center">
  <div className="flex items-center justify-center gap-[60px]">

          {/* Left Arrow */}
          <button 
  onClick={() => handleArrowClick('left')} 
  className="mr-[30px] -mt-[80px]"
>
  <ArrowLeft size={40} className="text-[#AD2F3B] hover:scale-110 transition" />
</button>


          {/* Carousel Container */}
          <div className="scroll-wrapper">
            <div className="scroll-content">
              {[...performances, ...performances].map((item, index) => (
                <div key={index} className="performance-card">
                  <img
                    src={item.image}
                    alt={`Performance ${index + 1}`}
                    className="w-[400px] h-[400px] object-cover"
                  />
                  <div className="text-center mt-8">
                    <p className="text-black text-[28px] whitespace-nowrap">{item.title}</p>
                    <p className="text-black text-[22px] mt-6 whitespace-nowrap">{item.artForm}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button onClick={() => handleArrowClick('right')} className="ml-[30px] -mt-[80px]">
            <ArrowRight size={40} className="text-[#AD2F3B] hover:scale-110 transition" />
          </button>
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-[138px] flex justify-center mb-[20px]">
        <button className="bg-[#AD2F3B] text-white w-[200px] h-[50px] text-[20px] rounded-full">
          View All
        </button>
      </div>
    </div>
  );
};

export default OurPerformances;
   
 