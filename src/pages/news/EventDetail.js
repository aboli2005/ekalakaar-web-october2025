import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GOOGLE_API_KEY = 'AIzaSyAfT-327xEdZC0G1j2Ksuj0fURc38DUxR8';
const CALENDAR_ID = 'ekalakaarevents@gmail.com';

const getImageUrl = (fileUrl) => {
  if (!fileUrl) return null;
  const match = fileUrl.match(/[-\w]{25,}/);
  return match ? `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000` : fileUrl;
};

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${eventId}?key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <div className="p-6 sm:p-10 text-base sm:text-lg">Loading event details...</div>;
  if (!event) return <div className="p-6 sm:p-10 text-red-500 text-base sm:text-lg">Event not found.</div>;

  const { summary, description, location, start, end, creator, attachments } = event;

  return (
    <div className="bg-white font-[Poppins]">
      <div className="xl:max-w-[60%] lg:max-w-[70%] md:max-w-[80%] max-w-[90%] mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#AD2F3B] mb-5 text-base sm:text-lg hover:underline"
        >
          ← Back to Events
        </button>

        {/* Event Image */}
        {attachments?.[0]?.fileUrl ? (
          <img
            src={getImageUrl(attachments[0].fileUrl)}
            alt={summary}
            className="w-full max-h-[350px] sm:max-h-[400px] object-cover rounded-xl mb-6"
          />
        ) : (
          <div className="w-full h-[300px] sm:h-[350px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl mb-6 text-sm sm:text-base">
            No image
          </div>
        )}

        {/* Event Info */}
        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#AD2F3B] mb-4">
          {summary}
        </h1>

        <p className="text-gray-600 text-sm sm:text-base mb-2">
          <strong>Date:</strong>{' '}
          {new Date(start.dateTime || start.date).toLocaleString()}
        </p>

        <p className="text-gray-600 text-sm sm:text-base mb-2">
          <strong>Ends:</strong>{' '}
          {new Date(end.dateTime || end.date).toLocaleString()}
        </p>

        {location && (
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            <strong>Location:</strong> {location}
          </p>
        )}

        {/* Description */}
        <div className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {description || 'No description available.'}
        </div>

        {/* Organizer */}
        <div className="mt-8 text-sm sm:text-base text-gray-500">
          <p>
            <strong>Organized by:</strong> {creator?.email || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
