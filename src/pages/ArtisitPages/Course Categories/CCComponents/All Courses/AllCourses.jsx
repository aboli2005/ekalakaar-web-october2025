import './AllCourses.css';
import EveryCourse from './EveryCourse';

const AllCourses = ({ CategoryName }) => {
  return (
    <>
      {/* Courses Grid */}
      <div id="AllCourses">
        {CategoryName.map((course) => (
          <EveryCourse key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div id="multiple-pages">
        <div id="back-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="30px"
            viewBox="0 0 14 23"
            fill="none"
          >
            <path d="M12.5 1L2 11.5L12.5 22" stroke="black" strokeWidth="2" />
          </svg>
        </div>

        <div id="page-number-box">
          <div className="page-number active">1</div>
          {/* Additional pages can be added dynamically */}
        </div>

        <div id="next-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14px"
            height="23px"
            viewBox="0 0 14 23"
            fill="none"
          >
            <path d="M1 1L11.5 11.5L1 22" stroke="black" strokeWidth="2" />
          </svg>
        </div>
      </div>
     s
     
    </>
  );
};

export default AllCourses;
