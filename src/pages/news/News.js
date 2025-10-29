// src/pages/news/News.js
import React, { useState,useEffect } from 'react';
import Newsletter from './Newsletter';
import Footer from '../../components/Footer';
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar-style.css';
import mandala from '../../assets/wallpaper.png'; // adjust if it's .png or .jpg
import { useNavigate } from 'react-router-dom';

const GOOGLE_API_KEY = 'AIzaSyAfT-327xEdZC0G1j2Ksuj0fURc38DUxR8';
const EK_EVENTS_CALENDAR_ID = 'ekalakaarevents@gmail.com';
const GENERAL_EVENTS_CALENDAR_ID = '28308fdb11ba42c8a91c8e0f52751870f62574a891b049a1ebf4b2dcc7f612ae@group.calendar.google.com';


const News = () => {

   const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeCalendar, setActiveCalendar] = useState('ek'); // default is EK Events

  const navigate = useNavigate();



useEffect(() => {
  const fetchEvents = async () => {
    const calendarId =
      activeCalendar === 'ek'
        ? EK_EVENTS_CALENDAR_ID
        : GENERAL_EVENTS_CALENDAR_ID;

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${GOOGLE_API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`
      );
      const data = await response.json();
      setEvents(data.items || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  fetchEvents();
}, [activeCalendar]); // 👈 refetch when user switches calendar


const decodeHTML = (html) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};



const getUpcomingEvents = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const uniqueEventsMap = new Map();

  events.forEach((event) => {
    const start = new Date(event.start.dateTime || event.start.date);
    const end = new Date(event.end.dateTime || event.end.date);

    // Normalize to midnight for accurate all-day comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const eventKey = event.recurringEventId || event.id;

    // Include only if the event is today or in the future
  if (start >= today && !uniqueEventsMap.has(eventKey)) {
      uniqueEventsMap.set(eventKey, event);
    }
  });



  return Array.from(uniqueEventsMap.values()).slice(0, 3);
};



  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate.toDateString() === new Date(date).toDateString();
    });
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

const getImageUrl = (fileUrl) => {
  if (!fileUrl) return null;

  // Try to extract Google Drive file ID
  const match = fileUrl.match(/[-\w]{25,}/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`;
  }

  // Otherwise return original URL if it's not a Drive URL
  return fileUrl;
};


  return (
    <>
      <div className="px-8 relative overflow-hidden md:px-[100px] py-12 bg-gradient-to-br from-white to-[#f9f9ff] min-h-screen font-[Poppins]">
        <div className="max-[440px]:hidden">
          {/* Bottom Right Mandala */}
          <img
            src={mandala}
            alt="Mandala bottom right"
            className="absolute 
             xl:bottom-[-15.625rem] xl:right-[-12.5rem] xl:w-[37.5rem]  // default for xl and up
             lg:bottom-[-12.5rem] lg:right-[-10rem] lg:w-[29rem]  // for lg
             md:bottom-[-10rem] md:right-[-8rem] md:w-[25rem]  // for md
             opacity-[0.7] z-0"
          />

          {/* Top Right Mandala */}
          {/* <img
  src={mandala}
  alt="Mandala top right"
  className="absolute 
             top-[-17.5rem] right-[-15.625rem] w-[38.5rem]  // default for xl and up
             xl:top-[-14rem] xl:right-[-12.5rem] xl:w-[36rem]  // for lg
             lg:top-[-14rem] lg:right-[-12.5rem] lg:w-[30rem]  // for lg
             md:top-[-11rem] md:right-[-10rem] md:w-[25rem]  // for md
             opacity-[0.7] z-0"
/> */}
        </div>

        {/* Breadcrumb */}
        <p className="text-[18px] sm:text-[22px] font-medium mb-6">
          <Link to="/" className="text-gray-800 hover:underline">
            Home
          </Link>{" "}
          / <span className="text-[#AD2F3B]">News</span>
        </p>
        <Newsletter />

        {/* Title */}
        <h1 className="text-[34px] md:text-[28px] font-bold text-[#AD2F3B] mb-10 ">
          Upcoming Events
        </h1>

        <div className="flex justify-end mb-6 gap-4 text-[#AD2F3B] font-medium font-poppin text-[14px] sm:text-[16px]">
  <span
    onClick={() => setActiveCalendar('ek')}
    className={`cursor-pointer ${activeCalendar === 'ek' ? 'underline font-semibold' : ''}`}
  >
    EK Events
  </span>
  /
  <span
    onClick={() => setActiveCalendar('general')}
    className={`cursor-pointer ${activeCalendar === 'general' ? 'underline font-semibold' : ''}`}
  >
    General Events
  </span>
</div>


        <div className="flex flex-col lg:flex-row items-start gap-6 xl:gap-10 xl:max-w-[90%]  ">
          {/* Calendar */}
          <div
            className="bg-white rounded-xl shadow-xl border-[#AD2F3B] border-2
     w-full sm:max-w-[80%] md:max-w-[70%] lg:w-[35%] xl:w-[40%]
     p-3 sm:p-6 md:p-6 lg:p-8
     max-h-[32rem] overflow-auto mx-auto"
          >
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date }) => {
                const isToday =
                  new Date().toDateString() === date.toDateString();
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                if (isToday) return "calendar-today";
                if (isSelected) return "calendar-selected";
                return "";
              }}
              className="w-full"
            />
          </div>

          {/* Top 3 Upcoming Events */}
          <div
            className="flex flex-col gap-4 
               w-full lg:w-[65%] xl:w-[60%] 
               z-10"
          >
            {getUpcomingEvents().map((event, index) => (
              <div
                key={index}
                onClick={() => navigate(`/event/${event.id}`)}
                className="bg-white rounded-xl shadow-md flex border border-gray-200
                   w-full min-h-[6rem] h-auto max-h-[9rem] overflow-hidden"
              >
                {event.attachments?.[0]?.fileUrl ? (
                  <img
                    src={getImageUrl(event.attachments[0].fileUrl)}
                    alt={event.summary}
                    className="w-[100px] min-w-[100px] object-cover h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                    }}
                  />
                ) : (
                  <div className="w-[100px] min-w-[100px] h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                    No image
                  </div>
                )}
                <div className="p-3 text-sm flex flex-col justify-center w-full overflow-hidden">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 text-sm lg:text-xs">
                    {event.summary}
                  </h3>
                  <p className="text-gray-500 text-xs mb-1">
                    {new Date(
                      event.start.dateTime || event.start.date
                    ).toDateString()}
                  </p>
                  <div
                    className="text-gray-600 line-clamp-2 text-xs"
                    dangerouslySetInnerHTML={{
                      __html: event.description || "No description available.",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Events */}
        <div className="mt-20  ">
          <h2 className="text-[18px] md:text-2xl  font-semibold mb-6 text-[#AD2F3B] flex justify-center lg:justify-start">
            {selectedDate
              ? `Events on ${new Date(selectedDate).toDateString()}`
              : `Today's Events (${new Date().toDateString()})`}
          </h2>

          {selectedDateEvents.length === 0 ? (
            <p className="text-gray-500 text-lg flex justify-center lg:justify-start ">No events for this day.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-16 mx-8 md:mx-4 lg:mx-0 xl:mx-4 ">
              {selectedDateEvents.map((event, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-xl border-2 border-[#AD2F3B]
                      flex flex-col overflow-hidden 
                      w-full max-w-[400px]
                      h-auto md:h-auto lg:h-auto  // ⬅️ Reduced height for lg
                      p-4 sm:p-5 md:p-6 lg:p-4 xl:p-6
                      ${
                        selectedDateEvents.length === 3 &&
                        index === 2 &&
                        "md:col-span-2 md:mx-auto lg:col-span-1 lg:mx-0"
                      }
                      mx-auto`}
                >
                  {event.attachments?.[0]?.fileUrl ? (
                    <img
                      src={getImageUrl(event.attachments[0].fileUrl)}
                      alt={event.summary}
                      className="w-full h-[220px] object-cover rounded mb-4 md:h-[150px] lg:h-[150px] xl:h-[220px]" // ⬅️ Image shorter on lg
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[200px] bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-4">
                      No image
                    </div>
                  )}

                  <h3 className="text-[18px] lg:text-[16px] xl:text-[20px] font-semibold mb-1 text-[#AD2F3B] line-clamp-1">
                    {event.summary}
                  </h3>
                  <p className="text-[16px] lg:text-[14px] xl:text-[16px] text-gray-500 mb-2">
                    {new Date(
                      event.start.dateTime || event.start.date
                    ).toDateString()}
                  </p>
                  <div
                    className="text-[15px] lg:text-[14px] text-gray-700 line-clamp-2 mb-4 leading-snug"
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(
                        event.description || "No description available."
                      ),
                    }}
                  ></div>

                  <Link
                    to={`/event/${event.id}`}
                    className="mt-auto bg-[#AD2F3B] text-white py-2 px-4 rounded-lg text-center
                       hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-shadow duration-200 text-[16px] lg:text-[14px]
                   text-decoration-none"
                  >
                    View More
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
