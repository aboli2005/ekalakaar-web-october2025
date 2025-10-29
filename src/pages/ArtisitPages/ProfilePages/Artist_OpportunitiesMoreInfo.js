import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Artist_OpportunitiesMoreInfo.css";
import { useState } from "react";
import Artist_navbar from "../Artist_navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPOSTRequestWithoutBody,
} from "../../services/serverHelper";
import { artistOpportunityPoints } from "../../services/apis";

export function Artist_OpportunitiesMoreInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  let job = location.state?.job;

  const [currentId, setCurrentId] = useState(null);
  const [OpportunityapplynowPopup, setOpportunityapplynowPopup] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);
  const [applyAns, setApplyAns] = useState({quotedPrice:"",answer:""});
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    setCurrentId(job?._id);
    setJobData(job);
  }, [job]);

  const applySubmitHandler = async (event) => {
    const toastId = toast.loading("Submitting application...", {
      position: "top-center",
    });
    try {
      event.preventDefault();
      const response = await makeAuthenticatedPOSTRequest(
        artistOpportunityPoints.APPLY_OPPOR_API + `/${job._id}`,
        { applyAns },
        accessToken
      );

      if (response.status === "success") {
        toast.success("Application submitted successfully!", {
          position: "top-center",
        });
        setOpportunityapplynowPopup(null);
        setApplyAns({quotedPrice:"",answer:""});
        navigate("/statusOfApplication");
      } else {
        toast.error(response.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error, please try again", {
        position: "top-center",
      });
    }
    toast.dismiss(toastId);
  };

  const savedHandler = async () => {
    const toastId = toast.loading("Saving opportunity...", {
      position: "top-center",
    });
    try {
      const response = await makeAuthenticatedPOSTRequestWithoutBody(
        artistOpportunityPoints.SAVE_OPPR_BY_ID + `/${currentId}`,
        accessToken
      );
      if (response.status === "success") {
        toast.success("Opportunity saved successfully!", {
          position: "top-center",
        });
        navigate("/statusOfApplication");
      } else {
        toast.error(response.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again", {
        position: "top-center",
      });
    }
    toast.dismiss(toastId);
  };

  const shareHandler = async () => {
    const toastId = toast.loading("Preparing to share...", {
      position: "top-center",
    });
    try {
      const shareData = {
        title: jobData?.purpose || 'Art Opportunity',
        text: `Check out this amazing opportunity: ${jobData?.purpose}

Location: ${jobData?.location}
Budget: ₹${jobData?.budget}
Due Date: ${new Date(jobData?.applicationPeriod?.end).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`,
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully!", {
          position: "top-center",
        });
      } else {
        const shareText = `${shareData.title}

${shareData.text}

${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        toast.success("Link copied to clipboard!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("Share error:", error);
      if (error.name !== 'AbortError') {
        try {
          const fallbackText = `${jobData?.purpose || 'Art Opportunity'}

Location: ${jobData?.location}
Budget: ₹${jobData?.budget}
Check it out: ${window.location.href}`;
          await navigator.clipboard.writeText(fallbackText);
          toast.success("Link copied to clipboard!", {
            position: "top-center",
          });
        } catch (clipboardError) {
          toast.error("Unable to share. Please copy the URL manually.", {
            position: "top-center",
          });
        }
      }
    }
    toast.dismiss(toastId);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper functions for better formatting
  const formatLanguages = (languages) => {
    if (Array.isArray(languages)) {
      return languages.join(', ');
    }
    return languages || 'Not specified';
  };

  const formatCurrency = (amount) => {
    return amount ? `₹${parseInt(amount).toLocaleString('en-IN')}` : 'Not specified';
  };

  return (
    <>
      <Artist_navbar />
      <div className="opportunities-more-info-page">
        {/* Header Section */}
        <div className="opportunity-header-card">
          <div className="header-content">
            <div className="title-section">
              <h1 className="opportunity-title">{jobData?.purpose}</h1>
              <div className="basic-info">
                <div className="info-item">
                  <span className="info-label">Posted on:</span>
                  <span className="info-value">
                    {new Date(jobData?.applicationPeriod?.start).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Due Date:</span>
                  <span className="info-value">
                    {new Date(jobData?.applicationPeriod?.end).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <button onClick={shareHandler} className="action-btn share-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share
              </button>
              <button onClick={savedHandler} className="action-btn save-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="opportunity-details-card">
          {/* Description Section */}
          <section className="description-section">
            <h2 className="section-title">Description</h2>
            <p className="description-text">{jobData?.description}</p>
          </section>

          {/* Details Section */}
          <section className="details-section">
            <h2 className="section-title">Opportunity Details</h2>
            <div className="details-grid">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Location of Performance:</span>
                  <span className="detail-value">{jobData?.location || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Language of Performance:</span>
                  <span className="detail-value">{formatLanguages(jobData?.languages)}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Budget for Performance:</span>
                  <span className="detail-value budget-highlight">{formatCurrency(jobData?.budget)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Performance:</span>
                  <span className="detail-value">
                    {jobData?.performanceDate && new Date(jobData.performanceDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Duration of Performance:</span>
                  <span className="detail-value">{jobData?.performanceDuration || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Application Last Date:</span>
                  <span className="detail-value">
                    {new Date(jobData?.applicationPeriod?.end).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>

              {(jobData?.artType || jobData?.artCategory) && (
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Type of Art:</span>
                    <span className="detail-value">{jobData?.artType || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Category of Art:</span>
                    <span className="detail-value">{jobData?.artCategory || 'Not specified'}</span>
                  </div>
                </div>
              )}

              {(jobData?.artName || jobData?.theme) && (
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">Name of Art:</span>
                    <span className="detail-value">{jobData?.artName || 'Not specified'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Theme of Performance:</span>
                    <span className="detail-value">{jobData?.theme || 'Not specified'}</span>
                  </div>
                </div>
              )}

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Media Type:</span>
                  <span className="detail-value">{jobData?.mediaType || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Customization Required:</span>
                  <span className="detail-value">{jobData?.customization || 'Not specified'}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Required Artists:</span>
                  <span className="detail-value">{jobData?.requiredArtists || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Artist Location:</span>
                  <span className="detail-value">{jobData?.artistLocation || 'Not specified'}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Audience Size:</span>
                  <span className="detail-value">{jobData?.audienceSize || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Audience Profile:</span>
                  <span className="detail-value">{jobData?.audienceProfile || 'Not specified'}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Venue:</span>
                  <span className="detail-value">{jobData?.venue || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Facilities:</span>
                  <span className="detail-value">{jobData?.facilities || 'Not specified'}</span>
                </div>
              </div>

              {jobData?.otherRequirements && (
                <div className="detail-row full-width">
                  <div className="detail-item">
                    <span className="detail-label">Other Requirements:</span>
                    <span className="detail-value">{jobData.otherRequirements}</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Perks and Benefits */}
          {jobData?.opportunity?.incentives?.length > 0 && (
            <section className="benefits-section">
              <h2 className="section-title">Perks and Benefits</h2>
              <div className="benefits-grid">
                {jobData.opportunity.incentives.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {benefit}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Action Buttons */}
          <div className="bottom-actions">
            {job?.status === "Applied" ||
            job?.status === "In-Progress" ||
            job?.status === "Rejected" ||
            job?.status === "Hired" ? (
              <div className="applied-status">
                <div className="status-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Already Applied
                </div>
              </div>
            ) : (
              <div className="action-buttons-bottom">
                <button className="back-btn" onClick={() => navigate(-1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Back
                </button>
                <button
                  className="apply-btn"
                  onClick={() => setOpportunityapplynowPopup(true)}
                >
                  Apply Now
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Application Popup */}
        {OpportunityapplynowPopup && (
          <div className="application-popup-overlay">
            <div className="application-popup">
              <div className="popup-header">
                <h3>{jobData?.purpose}</h3>
                <button 
                  className="close-popup-btn"
                  onClick={() => setOpportunityapplynowPopup(false)}
                >
                  ×
                </button>
              </div>

              <div className="popup-content">
                <div className="job-summary">
                  <div className="summary-item">
                    <span className="summary-label">Posted on:</span>
                    <span className="summary-value">
                      {new Date(job?.applicationPeriod?.start).toLocaleDateString("en-US", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Last Date to apply:</span>
                    <span className="summary-value">
                      {new Date(job?.applicationPeriod?.end).toLocaleDateString("en-US", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Budget:</span>
                    <span className="summary-value budget-highlight">{formatCurrency(jobData?.budget)}</span>
                  </div>
                </div>

                <form onSubmit={applySubmitHandler} className="application-form">
                  <div className="form-group">
                    <label htmlFor="quotedPrice">My Quoted Price (₹) *</label>
                    <input 
                      type="number"
                      id="quotedPrice"
                      name="quotedPrice" 
                      value={applyAns.quotedPrice} 
                      onChange={(e) => setApplyAns((prevData) => ({
                        ...prevData,
                        quotedPrice: e.target.value
                      }))} 
                      required
                      placeholder="Enter your quoted price"
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="answer">Why do you want to apply for this role? *</label>
                    <textarea
                      id="answer"
                      name="answer"
                      value={applyAns.answer}
                      onChange={(e) => setApplyAns((prevData) => ({
                        ...prevData,
                        answer: e.target.value
                      }))}
                      required
                      placeholder="Tell us why you're the perfect fit for this opportunity..."
                      rows="4"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={() => setOpportunityapplynowPopup(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
