import appliedNoData from "./assets/appliedNoData.svg";
import "./appliedApplicationItems.css";
import NoDataTemplate from "./NoDataTemplate";
import { Link } from "react-router-dom";
import category from "./assets/category.svg";
import artNature from "./assets/natureOfArt.svg";
import location from "./assets/location.svg";
import dateOfPerformance from "./assets/dateOfPerformance.svg";
import amount from "./assets/amount.svg";
import language from "./assets/language.svg";
import appliDueDate from "./assets/applicationDueDate.svg";

const appli_Data = [
  { img: location, title: "Location of Performance :" },
  { img: language, title: "Language of Performance :" },
  { img: amount, title: "Amount :" },
  { img: dateOfPerformance, title: "Date of Performance :" },
  { img: dateOfPerformance, title: "Duration of Performance :" },
  { img: appliDueDate, title: "Application Due Date :" },
];

// function AppliedApplicationItems({ currentEvent, loading, jobData }) {
//   // ✅ Filter out expired or missing opportunities
//   const validJobs = jobData
//     ?.filter((event) => {
//       const opp = event?.opportunity;
//       if (!opp || Object.keys(opp).length === 0) return false;

//       // Optional: Filter expired by application end date (if available)
//       const endDate = opp?.applicationPeriod?.end;
//       if (endDate && new Date(endDate) < new Date()) return false;

//       return true;
//     })
//     // ✅ Sort latest applied first
//     ?.sort(
//       (a, b) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime()
//     );

//   return (
//     <div className="applied_Application_wrapper">
//       <p className="applied_event_text">
//         {currentEvent} Events : {validJobs.length}
//       </p>

//       <div className="applied_event_Detail_Container">
//         {loading ? (
//           <div className="custom-loader"></div>
//         ) : validJobs.length === 0 ? (
//           <NoDataTemplate
//             image={appliedNoData}
//             para={"You haven't applied for any events application"}
//           />
//         ) : (
//           <div className="applied_Event_details">
//             {validJobs.map((event, index) => {
//               const opp = event.opportunity;

//               return (
//                 <div key={index} className="single_applied_eventWrapper">
//                   <div>
//                     <div
//                       className="single_applied_top"
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <h1 className="single_applied_heading">{opp?.purpose}</h1>
//                       <div className="appliedOn_container">
//                         Applied On <br />
//                         {new Date(event?.appliedOn).toLocaleDateString("en-US", {
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </div>
//                     </div>

//                     <p
//                       style={{
//                         marginTop: "5px",
//                         color: "black",
//                         opacity: "70%",
//                       }}
//                       className="single_applied_para"
//                     >
//                       {opp?.description}
//                     </p>

//                     <div
//                       style={{ display: "flex", alignItems: "center" }}
//                       className="appli_detail_btn_wrapper"
//                     >
//                       <main className="appli_detail_container">
//                         {/* left side */}
//                         <div
//                           className="appli_detail_container_left"
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "2px",
//                           }}
//                         >
//                           {appli_Data.map((data, idx) => (
//                             <div key={idx} style={{ display: "flex", gap: "10px" }}>
//                               <img
//                                 src={data.img}
//                                 alt=""
//                                 style={{
//                                   marginBottom: "10px",
//                                 }}
//                               />
//                               <p
//                                 className="applied_appli_title"
//                                 style={{
//                                   color: "rgb(0,0,0,0.7)",
//                                   fontWeight: "500",
//                                   fontFamily: "Poppins",
//                                 }}
//                               >
//                                 {data.title}
//                               </p>
//                             </div>
//                           ))}
//                         </div>

//                         {/* right side */}
//                         <div
//                           className="appli_detail_container_right"
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "5px",
//                           }}
//                         >
//                           <p className="applied_appli_title">
//                             {opp?.location}
//                           </p>

//                           <p className="applied_appli_title">
//                             {opp?.languages}
//                           </p>

//                           <p className="applied_appli_title">
//                             {opp?.budget}
//                           </p>

//                           <p className="applied_appli_title">
//                             {new Date(opp?.performanceDate).toLocaleDateString(
//                               "en-US",
//                               {
//                                 day: "numeric",
//                                 month: "short",
//                                 year: "numeric",
//                               }
//                             )}
//                           </p>

//                           <p
//   className="applied_appli_title"
//   style={{
//     fontFamily: "Poppins",
//     fontWeight: "500",
//     color: "black",
//   }}
// >
//   {opp?.performanceDuration || "Not specified"}
// </p>


//                           <p className="applied_appli_title">
//                             {new Date(
//                               opp?.applicationPeriod?.end
//                             ).toLocaleDateString("en-US", {
//                               day: "numeric",
//                               month: "short",
//                               year: "numeric",
//                             })}
//                           </p>
//                         </div>
//                       </main>

//                       <Link to={`/Artist_OpportunityDetails`} state={{ job: opp }}>
//                         <button className="view_information_btn">
//                           View Information
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


function AppliedApplicationItems({ currentEvent, loading, jobData }) {
  // ✅ Filter out expired or missing opportunities
  const validJobs = jobData
    ?.filter((event) => {
      const opp = event?.opportunity;
      if (!opp || Object.keys(opp).length === 0) return false;

      // Optional: Filter expired by application end date (if available)
      const endDate = opp?.applicationPeriod?.end;
      if (endDate && new Date(endDate) < new Date()) return false;

      return true;
    })
    // ✅ Sort latest applied first
    ?.sort(
      (a, b) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime()
    );

  return (
    <div className="applied_Application_wrapper">
      <p className="applied_event_text">
        {currentEvent} Events : {validJobs.length}
      </p>

      <div className="applied_event_Detail_Container">
        {loading ? (
          <div className="custom-loader"></div>
        ) : validJobs.length === 0 ? (
          <NoDataTemplate
            image={appliedNoData}
            para={"You haven't applied for any events application"}
          />
        ) : (
          <div className="applied_Event_details">
            {validJobs.map((event, index) => {
              const opp = event.opportunity;

              return (
                <div key={index} className="single_applied_eventWrapper">
                  <div>
                    <div
                      className="single_applied_top"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h1 className="single_applied_heading">{opp?.purpose}</h1>
                      <div className="appliedOn_container">
                        Applied On <br />
                        {new Date(event?.appliedOn).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <p
                      style={{
                        marginTop: "5px",
                        color: "black",
                        opacity: "70%",
                      }}
                      className="single_applied_para"
                    >
                      {opp?.description}
                    </p>

                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="appli_detail_btn_wrapper"
                    >
                      <main className="appli_detail_container">
                        {/* left side */}
                        <div
                          className="appli_detail_container_left"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          {appli_Data.map((data, idx) => (
                            <div key={idx} style={{ display: "flex", gap: "10px" }}>
                              <img
                                src={data.img}
                                alt=""
                                style={{
                                  marginBottom: "10px",
                                }}
                              />
                              <p
                                className="applied_appli_title"
                                style={{
                                  color: "rgb(0,0,0,0.7)",
                                  fontWeight: "500",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {data.title}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* right side (Corrected) */}
                        <div
                          className="appli_detail_container_right"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          {/* --- Start of UI Alignment Fix --- */}
                          <p className="applied_appli_title">
                            {opp?.location || "Not specified"}
                          </p>

                          <p className="applied_appli_title">
                            {opp?.languages && opp.languages.length > 0
                              ? opp.languages.join(", ")
                              : "Not specified"}
                          </p>

                          <p className="applied_appli_title">
                            {opp?.budget ? `₹${opp.budget}` : "Not specified"}
                          </p>

                          <p className="applied_appli_title">
                            {new Date(opp?.performanceDate).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>

                          <p
                            className="applied_appli_title"
                            style={{
                              fontFamily: "Poppins",
                              fontWeight: "500",
                              color: "black",
                            }}
                          >
                            {opp?.performanceDuration || "Not specified"}
                          </p>

                          <p className="applied_appli_title">
                            {new Date(
                              opp?.applicationPeriod?.end
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          {/* --- End of UI Alignment Fix --- */}
                        </div>
                      </main>

                      <Link to={`/Artist_OpportunityDetails`} state={{ job: opp }}>
                        <button className="view_information_btn">
                          View Information
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default AppliedApplicationItems;
