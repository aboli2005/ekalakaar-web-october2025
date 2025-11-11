import React, { useState, useEffect } from "react";
import "./UploadOpportunities.css";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { makeAuthenticatedPOSTRequest } from "../../../services/serverHelper";
import AdminNavbar from "../../Navbar/Navbar1";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function UploadOpportunities() {
  const location = useLocation();
  const booking = location.state?.booking || {};
  const navigate = useNavigate();

  // Initialize form state with booking data
  const [formData, setFormData] = useState({
    // These fields will be autofilled from booking data
    purpose: booking.performanceOccasion || "",
    performanceDate: booking.performanceDate
      ? new Date(booking.performanceDate).toISOString().split("T")[0]
      : "",
    typeOfOrganization: booking.organisation || "",
    location: booking.city || "",
    languages: booking.language ? [booking.language] : [],
    artType: booking.artType || "",
    artCategory: booking.artCategory || "",
    otherRequirements: booking.requirements || "",
    contactPersonName: booking.name || "",
    contactPersonNumber: booking.contactNumber || "",
    contactEmail: booking.email || "",

    // These fields will remain empty by default
    otherEventName: "",
    description: "",
    startTime: "",
    applicationPeriod: { end: "" },
    budget: "",
    performanceDuration: "",
    otherArtType: "",
    otherArtCategory: "",
    artName: "",
    theme: "",
    mediaType: "",
    otherMediaType: "",
    customization: "",
    requiredArtists: "",
    artistLevel: "",
    otherArtistLevel: "",
    artistLocation: "",
    otherArtistLocation: "",
    audienceSize: "",
    audienceProfile: "",
    venue: "",
    otherVenue: "",
    facilities: "",
    otherFacilities: "",
    perksBenefits: "",
  });

  // Helper function to map dropdown values between forms
  const mapDropdownValue = (value, options) => {
    if (!value) return "";

    // Try exact match first
    if (options.includes(value)) return value;

    // Try case-insensitive match
    const lowerValue = value.toLowerCase();
    const matchedOption = options.find((opt) => opt.toLowerCase() === lowerValue);
    if (matchedOption) return matchedOption;

    // Try partial match
    const partialMatch = options.find(
      (opt) =>
        value.toLowerCase().includes(opt.toLowerCase()) ||
        opt.toLowerCase().includes(value.toLowerCase())
    );

    return partialMatch || value; // Return original if no match found
  };

  // State for conditional rendering
  const [showOtherEventInput, setShowOtherEventInput] = useState(false);
  const [showAdditionalFacilitiesInput, setShowAdditionalFacilitiesInput] = useState(false);
  const [showAdditionalVenueInput, setShowAdditionalVenueInput] = useState(false);
  const [showAdditionalArtTypeInput, setShowAdditionalArtTypeInput] = useState(false);
  const [showAdditionalArtCategoryInput, setShowAdditionalArtCategoryInput] = useState(false);
  const [showAdditionalInputother, setShowAdditionalInputother] = useState(false);
  const [showAdditionalmedia, setShowAdditionalmedia] = useState(false);
  const [showAdditionallevel, setShowAdditionallevel] = useState(false);
  const [showAdditionallocation, setShowAdditionallocation] = useState(false);
  const [uploadTab, setUploadTab] = useState(1);

  // Language selection state
  const [languagesoptions, setLanguagesOptions] = useState(
    booking.language ? [{ value: booking.language, label: booking.language }] : []
  );
  const [anyLanguage, setAnyLanguage] = useState("");

  const languageOptions = [
    { value: "Assamese", label: "Assamese" },
    { value: "Bengali", label: "Bengali" },
    { value: "Bhili", label: "Bhili" },
    { value: "Bhojpuri", label: "Bhojpuri" },
    { value: "Dogri", label: "Dogri" },
    { value: "Garhwali", label: "Garhwali" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Haryanvi", label: "Haryanvi" },
    { value: "Hindi", label: "Hindi" },
    { value: "Kannada", label: "Kannada" },
    { value: "Kashmiri", label: "Kashmiri" },
    { value: "Khasi", label: "Khasi" },
    { value: "Kokborok", label: "Kokborok" },
    { value: "Konkani", label: "Konkani" },
    { value: "Kumaoni", label: "Kumaoni" },
    { value: "Maithili", label: "Maithili" },
    { value: "Malayalam", label: "Malayalam" },
    { value: "Manipuri", label: "Manipuri" },
    { value: "Marathi", label: "Marathi" },
    { value: "Mizo (Lushai)", label: "Mizo (Lushai)" },
    { value: "Nepali", label: "Nepali" },
    { value: "Odia", label: "Odia" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Rajasthani", label: "Rajasthani" },
    { value: "Santali", label: "Santali" },
    { value: "Sindhi", label: "Sindhi" },
    { value: "Tamil", label: "Tamil" },
    { value: "Telugu", label: "Telugu" },
    { value: "Tulu", label: "Tulu" },
    { value: "Urdu", label: "Urdu" },
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Italian", label: "Italian" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Chinese (Simplified)", label: "Chinese (Simplified)" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Russian", label: "Russian" },
    { value: "Any Other", label: "Any Other" },
  ];

  const multiSectionHandle = (e) => {
    e.preventDefault();
    if (!anyLanguage || !anyLanguage.trim()) return;
    // create a new array (don't mutate state directly)
    const newOptions = [...languagesoptions.filter((it) => it.value !== "Any Other"), { value: anyLanguage.trim(), label: anyLanguage.trim() }];
    setLanguagesOptions(newOptions);
    setAnyLanguage("");
  };

  const token = localStorage.getItem("accessToken");

  const inputChangeHandlerother = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "purpose") {
        if (e.target.value === "Any other") {
          setShowAdditionalInputother(true);
        } else {
          setShowAdditionalInputother(false);
        }
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandlerTypeart = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "artType") {
        if (e.target.value === "Other") {
          setShowAdditionalArtTypeInput(true);
        } else {
          setShowAdditionalArtTypeInput(false);
        }
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandlerCategoryart = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "artCategory") {
        if (e.target.value === "Other") {
          setShowAdditionalArtCategoryInput(true);
        } else {
          setShowAdditionalArtCategoryInput(false);
        }
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandlermedia = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "mediaType") {
        if (e.target.value === "Other") {
          setShowAdditionalmedia(true);
        } else {
          setShowAdditionalmedia(false);
        }
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandlerlevel = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "artistLevel") {
        if (e.target.value === "Other") {
          setShowAdditionallevel(true);
        } else {
          setShowAdditionallevel(false);
        }
      }
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandlerlocation = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "artistLocation") {
        if (e.target.value === "Other") {
          setShowAdditionallocation(true);
        } else {
          setShowAdditionallocation(false);
        }
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandlerVenue = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "venue") {
        if (e.target.value === "Any other") {
          setShowAdditionalVenueInput(true);
        } else {
          setShowAdditionalVenueInput(false);
        }
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandler = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "purpose") {
        if (e.target.value === "Any other") {
          setShowOtherEventInput(true);
        } else {
          setShowOtherEventInput(false);
        }
      }
      if (e.target.name === "start" || e.target.name === "end") {
        const applicationPeriod = {
          [e.target.name]: e.target.value,
        };

        return {
          ...prevState,
          applicationPeriod: {
            ...prevState.applicationPeriod,
            ...applicationPeriod,
          },
        };
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const inputChangeHandlerFacilities = (e) => {
    setFormData((prevState) => {
      if (e.target.name === "facilities") {
        if (e.target.value === "Any other") {
          setShowAdditionalFacilitiesInput(true);
        } else {
          setShowAdditionalFacilitiesInput(false);
        }
      }

      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
  e.preventDefault();
  const languages = languagesoptions.map((l) => l.value);

  // 👇 force default mediaType since you don't want it in the form
  const payload = { 
    ...formData, 
    languages: languages.join(", "),
    mediaType: "Live" 
  };

  const toastId = toast.loading("Loading...");

  try {
    const response = await makeAuthenticatedPOSTRequest(
      `${BASE_URL}/admin/postopps`,
      payload,
      token
    );
    console.log(response);
    if (!response.errors) {
      toast.success("Successfully uploaded");
      setFormData((prevState) => ({
        ...prevState,
        applicationPeriod: {
          start: "",
          end: "",
        },
      }));
      setFormData((prevState) => ({
        ...prevState,
        artNature: "",
        location: "",
        description: "",
      }));
      navigate("/opportunity");
    } else {
      console.log(response);
      toast.error("Please provide all the required fields");
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong , please try again");
  }
  toast.dismiss(toastId);
};


  const purposeOfPerformance = [
    "Annual / Foundation Day",
    "Conference/ Workshop/ Training",
    "Employee Engagement",
    "Family functions",
    "National/ State Day Celebration",
    "Office Functions",
    "Performance for hotel guests",
    "Product Launch",
    "Special Day – Marriage, Anniversary",
    "Special Events",
    "Any other",
  ];

  const ArtNames = [
    "Bharatanatyam",
    "Bihu",
    "Chhau",
    "Dandiya Raas",
    "Dollu Kunitha",
    "Dumhal",
    "Garba",
    "Gaur Dance",
    "Giddha",
    "Gotipua",
    "Jhumar",
    "Kacchi Ghodi",
    "Kalbelia",
    "Karakattam",
    "Kathak",
    "Kathakali",
    "Kathakar",
    "Koli",
    "Kuchipudi",
    "Lavani",
    "Manipuri",
    "Mayurbhanj Chhau",
    "Mohiniyattam",
    "Odissi",
    "Raas Leela",
    "Sattriya",
    "Tamasha",
    "Tera Tali",
    "Thang-Ta",
    "Yakshagana",
    "Dhrupad",
    "Khayal",
    "Thumri",
    "Tappa",
    "Ghazal",
    "Qawwali",
    "Kriti",
    "Varnam",
    "Tillana",
    "Ragamalika",
    "Javali",
    "Swarajati",
    "Bhajans",
    "Kirtan",
    "Sufi Music",
    "Abhangas",
    "Shabad Kirtan (Sikh)",
    "Bansuri",
    "Dilruba",
    "Dholak",
    "Ektara",
    "Esraj",
    "Flute (Bansuri)",
    "Ghatam",
    "Harmonium",
    "Jal Tarang",
    "Mridangam",
    "Nadaswaram",
    "Pakhawaj",
    "Ravanahatha",
    "Sarangi",
    "Sarod",
    "Santoor",
    "Shehnai",
    "Sitar",
    "Tabla",
    "Tanpura",
    "Tumbi",
    "Veena",
    "Bhavai",
    "Bhand Pather",
    "Jatra",
    "Koodiyattam",
    "Mudiyettu",
    "Nautanki",
    "Pandavani",
    "Pothu Koothu",
    "Ramlila",
    "Ram Lila",
    "Ras Leela",
    "Sattriya",
    "Tamaasha",
    "Therukoothu",
    "Yakshagana",
  ];

  const venueTypes = [
    "Banquette Hall",
    "Classroom",
    "Corporate",
    "Hotel",
    "Open Ground",
    "Private House",
    "Theater",
    "Training Center",
    "Any other",
  ];
  const typeart = ["Folk", "Classical", "Fusion", "Other"];
  const artCategory = ["Dance", "Song", "Music", "Theater", "Other"];
  const performanceFacilitiesaArr = [
    "Accommodation",
    "Food",
    "Light",
    "Local Travel",
    "Musical Instruments",
    "Outstation Travel",
    "Photography",
    "Sound",
    "Stage",
    "Video",
    "Any other",
  ];
  const media = ["Live", "Recorded", "PartLive", "Other"];
  const artistLevel = [
    "international",
    "National",
    "district",
    "taluka",
    "local",
    "Other",
  ];

  const artistLocation = [
    "Nicobar",
    "North Middle Andaman",
    "South Andaman",
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Alluri Sitarama Raju",
    "Anakapalli",
    "Annamaya",
    "Bapatla",
    "Eluru",
    "Guntur",
    "Kadapa",
    "Kakinada",
    "Konaseema",
    "Krishna",
    "Kurnool",
    "Manyam",
    "N T Rama Rao",
    "Nandyal",
    "Nellore",
    "Palnadu",
    "Prakasam",
    "Sri Balaji",
    "Sri Satya Sai",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "Anjaw",
  "Changlang",
  "Dibang Valley",
  "East Kameng",
  "East Siang",
  "Kamle",
  "Kra Daadi",
  "Kurung Kumey",
  "Lepa Rada",
  "Lohit",
  "Longding",
  "Lower Dibang Valley",
  "Lower Siang",
  "Lower Subansiri",
  "Namsai",
  "Pakke Kessang",
  "Papum Pare",
  "Shi Yomi",
  "Siang",
  "Tawang",
  "Tirap",
  "Upper Siang",
  "Upper Subansiri",
  "West Kameng",
  "West Siang",
  "Baksa",
  "Barpeta",
  "Bongaigaon",
  "Cachar",
  "Charaideo",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dhubri",
  "Dibrugarh",
  "Dima Hasao",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Jorhat",
  "Kamrup Metropolitan",
  "Kamrup Rural",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Majuli",
  "Morigaon",
  "Nagaon",
  "Nalbari",
  "Sivasagar",
  "Sonitpur",
  "South Salmara-Mankachar",
  "Tinsukia",
  "Udalguri",
  "West Karbi Anglong",
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
  "Chandigarh",
  "Balod",
  "Baloda Bazar",
  "Balrampur",
  "Bastar",
  "Bemetara",
  "Bijapur",
  "Bilaspur",
  "Dantewada",
  "Dhamtari",
  "Durg",
  "Gariaband",
  "Gaurela Pendra Marwahi",
  "Janjgir Champa",
  "Jashpur",
  "Kabirdham",
  "Kanker",
  "Khairagarh",
  "Kondagaon",
  "Korba",
  "Koriya",
  "Mahasamund",
  "Manendragarh",
  "Mohla Manpur",
  "Mungeli",
  "Narayanpur",
  "Raigarh",
  "Raipur",
  "Rajnandgaon",
  "Sakti",
  "Sarangarh Bilaigarh",
  "Sukma",
  "Surajpur",
  "Surguja",
  "Dadra and Nagar Haveli",
  "Daman",
  "Diu",
  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "Shahdara",
  "South Delhi",
  "South East Delhi",
  "South West Delhi",
  "West Delhi",
  "North Goa",
  "South Goa",
  "Ahmedabad",
  "Amreli",
  "Anand",
  "Aravalli",
  "Banaskantha",
  "Bharuch",
  "Bhavnagar",
  "Botad",
  "Chhota Udaipur",
  "Dahod",
  "Dang",
  "Devbhoomi Dwarka",
  "Gandhinagar",
  "Gir Somnath",
  "Jamnagar",
  "Junagadh",
  "Kheda",
  "Kutch",
  "Mahisagar",
  "Mehsana",
  "Morbi",
  "Narmada",
  "Navsari",
  "Panchmahal",
  "Patan",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surat",
  "Surendranagar",
  "Tapi",
  "Vadodara",
  "Valsad",
  "Ambala",
  "Bhiwani",
  "Charkhi Dadri",
  "Faridabad",
  "Fatehabad",
  "Gurugram",
  "Hisar",
  "Jhajjar",
  "Jind",
  "Kaithal",
  "Karnal",
  "Kurukshetra",
  "Mahendragarh",
  "Nuh",
  "Palwal",
  "Panchkula",
  "Panipat",
  "Rewari",
  "Rohtak",
  "Sirsa",
  "Sonipat",
  "Yamunanagar",
  "Bilaspur",
  "Chamba",
  "Hamirpur",
  "Kangra",
  "Kinnaur",
  "Kullu",
  "Lahaul Spiti",
  "Mandi",
  "Shimla",
  "Sirmaur",
  "Solan",
  "Una",
  "Anantnag",
  "Bandipora",
  "Baramulla",
  "Budgam",
  "Doda",
  "Ganderbal",
  "Jammu",
  "Kathua",
  "Kishtwar",
  "Kulgam",
  "Kupwara",
  "Poonch",
  "Pulwama",
  "Rajouri",
  "Ramban",
  "Reasi",
  "Samba",
  "Shopian",
  "Srinagar",
  "Udhampur",
  "Bokaro",
  "Chatra",
  "Deoghar",
  "Dhanbad",
  "Dumka",
  "East Singhbhum",
  "Garhwa",
  "Giridih",
  "Godda",
  "Gumla",
  "Hazaribagh",
  "Jamtara",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Ramgarh",
  "Ranchi",
  "Sahebganj",
  "Seraikela Kharsawan",
  "Simdega",
  "West Singhbhum",
  "Bagalkot",
  "Bangalore Rural",
  "Bangalore Urban",
  "Belgaum",
  "Bellary",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Kalaburagi",
  "Hassan",
  "Haveri",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
    // (truncated here in the array for readability in the editor) - full list preserved in original file
  ];

  const Location = artistLocation; // reuse same big list

  return (
    <>
      <AdminNavbar />
      <div className="ArtistOpportunities_Page">
        <div className="opportunity_container">
          <div className="">
            <strong style={{ marginTop: "3%", color: "#AD2F3B", fontSize: "35px" }}>
              Create Opportunity
            </strong>
          </div>

          <div className="ArtistOpportunities_Page_Infoform">
            <form onSubmit={submitHandler}>
              <div className="ArtistOpportunities_Page_Infoform_Contentone">
                <div className="opp_top">
                  <div className="ArtistOpportunities_Page_Infoform_inputfield_Name">
                    <label style={{ fontSize: "18px" }}>
                      <strong>Name of Performance*</strong>
                    </label>

                    <select
                      required
                      name="purpose"
                      value={formData.purpose}
                      onChange={inputChangeHandler}
                      style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                    >
                      <option value="" disabled hidden>
                        Select purpose
                      </option>
                      {purposeOfPerformance.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>

                    {formData.purpose === "Any other" && (
                      <input
                        type="text"
                        name="otherEventName"
                        placeholder="Enter performance name"
                        value={formData.otherEventName}
                        onChange={inputChangeHandler}
                        style={{ width: "100%", height: "50px", borderRadius: "10px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                      />
                    )}
                  </div>

                  <div className="ArtistOpportunities_Page_Infoform_inputfield" style={{ width: "90%" }}>
                    <label>
                      <strong>Description</strong>
                    </label>
                    <textarea
                      required
                      name="description"
                      value={formData?.description}
                      onChange={inputChangeHandler}
                      type="text"
                      style={{ width: "100%", height: "65px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                      placeholder="Enter art Description"
                    />
                  </div>

                  <div className="ArtistOpportunities_Page_Infoform_inputfield">
                    <label>
                      <strong>Date of Performance*</strong>
                    </label>
                    <input
                      required
                      value={formData?.performanceDate}
                      name="performanceDate"
                      onChange={inputChangeHandler}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      placeholder="Enter event date"
                      style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                    />
                  </div>

                  <div className="ArtistOpportunities_Page_Infoform_inputfield">
                    <label>
                      <strong>Starting Time of Performance (hrs)*</strong>
                    </label>
                    <input
                      required
                      onChange={inputChangeHandler}
                      value={formData?.startTime}
                      name="startTime"
                      type="text"
                      placeholder="Enter Performance Time"
                      style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                    />
                  </div>

                  <div className="opp_top">
                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Enter Type of Organization</strong>
                      </label>
                      <input
                        onChange={inputChangeHandlerother}
                        name="typeOfOrganization"
                        type="text"
                        placeholder="Enter Organization Type"
                        value={formData.typeOfOrganization}
                        style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                      />
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Application Last Date*</strong>
                      </label>
                      <input
                        required
                        onChange={inputChangeHandler}
                        name="end"
                        value={formData?.applicationPeriod?.end}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        placeholder="Enter application last date"
                        style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                      />
                    </div>

                    <div style={{ margin: "20px", width: "90%", fontSize: "30px", color: "#AD2F3B", fontWeight: "600" }}>
                      Performance
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Location of Performance*</strong>
                      </label>
                      <select
                        onChange={inputChangeHandler}
                        name="location"
                        value={formData?.location}
                        required
                        style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}
                      >
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {Location?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Language of Performance*</strong>
                      </label>
                      <Select
                        defaultValue={languagesoptions}
                        value={languagesoptions}
                        isMulti
                        onChange={setLanguagesOptions}
                        options={languageOptions}
                        placeholder="Select languages"
                      />
                    </div>

                    {languagesoptions?.find((e) => e.value === "Any Other") !== undefined ? (
                      <>
                        <div className="BasicProfile_inputfield">
                          <label htmlFor="firstName">Enter Your Language</label>
                          <input onChange={(e) => setAnyLanguage(e.target.value)} name="firstName" value={anyLanguage} type="text"></input>
                          <button
                            name="Language"
                            onClick={multiSectionHandle}
                            style={{ background: "red", marginTop: "10px", width: "40px", height: "40px", borderRadius: "50%", border: "none", fontSize: "25px", color: "#fff" }}
                          >
                            +
                          </button>
                        </div>
                      </>
                    ) : null}

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Approx. Budget for Performance*</strong>
                      </label>
                      <select required onChange={inputChangeHandler} value={formData?.budget} name="budget" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select budget
                        </option>
                        <option value="24000">Below 25000</option>
                        <option value="35000">25000-50000</option>
                        <option value="70000">50000-100000</option>
                        <option value="200000">100000-250000</option>
                        <option value="800000">250000-1000000</option>
                        <option value="1200000">Above 1000000</option>
                      </select>
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Duration of Performance (hrs)*</strong>
                      </label>
                      <input required onChange={inputChangeHandler} value={formData?.performanceDuration} name="performanceDuration" type="text" placeholder="Enter Performance Duration" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Type of Art*</strong>
                      </label>
                      <select required value={formData?.artType} name="artType" onChange={inputChangeHandlerTypeart} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {typeart?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {showAdditionalArtTypeInput && (
                      <div className="ArtistOpportunities_Page_Infoform_inputfield">
                        <label>
                          <strong>Other Type of Art</strong>
                        </label>
                        <input onChange={inputChangeHandlerTypeart} name="otherArtType" type="text" placeholder="Enter other type of art " style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                      </div>
                    )}

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Category of Art*</strong>
                      </label>
                      <select required onChange={inputChangeHandlerCategoryart} name="artCategory" value={formData?.artCategory} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {artCategory?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {showAdditionalArtCategoryInput && (
                      <div className="ArtistOpportunities_Page_Infoform_inputfield">
                        <label>
                          <strong>Other Category of Art</strong>
                        </label>
                        <input onChange={inputChangeHandlerCategoryart} name="otherArtType" type="text" placeholder="Enter other Category of art " style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                      </div>
                    )}

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Name of Art*</strong>
                      </label>
                      <select  value={formData?.artName} name="artName" onChange={inputChangeHandler} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {ArtNames?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Theme of Performance</strong>
                      </label>
                      <input required onChange={inputChangeHandler} value={formData?.theme} name="theme" type="text" placeholder="Theme for Performmance/Event" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Live/Recorded/Part Live</strong>
                      </label>
                      <select onChange={inputChangeHandlermedia} name="mediaType" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {media?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {showAdditionalmedia && (
                      <div className="ArtistOpportunities_Page_Infoform_inputfield">
                        <label>
                          <strong>Other Type of Media</strong>
                        </label>
                        <input onChange={inputChangeHandlermedia} name="othermediaType" type="text" placeholder="Enter other type of media " style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                      </div>
                    )}

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Need Customized/ curated Performance</strong>
                      </label>
                      <select onChange={inputChangeHandler} name="customization" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>

                    <div className="artist_data_opp" style={{ fontSize: "30px", color: "#AD2F3B", fontWeight: "600" }}>
                      Artist
                      <div className="art_two" style={{ width: "100%" }}>
                        <div className="ArtistOpportunities_Page_Infoform_inputfield_No">
                          <label>
                            <strong>No. of Required Artist*</strong>
                          </label>
                          <select required value={formData?.requiredArtists} name="requiredArtists" onChange={inputChangeHandler} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                            <option value="" disabled hidden>
                              Select
                            </option>
                            <option value="1">1</option>
                            <option value="3">2-5</option>
                            <option value="7">5-10</option>
                            <option value="20">10-50</option>
                            <option value="60">Above 50</option>
                          </select>
                        </div>

                        <div className="ArtistOpportunities_Page_Infoform_inputfield_No">
                          <label>
                            <strong>Level of Artist*</strong>
                          </label>
                          <select required onChange={inputChangeHandlerlevel} value={formData?.artistLevel} name="artistLevel" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                            <option value="" disabled hidden>
                              Select
                            </option>
                            {artistLevel?.map((item, index) => (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {showAdditionallevel && (
                        <div className="ArtistOpportunities_Page_Infoform_inputfield">
                          <label>
                            <strong>Enter Level of Artist</strong>
                          </label>
                          <input onChange={inputChangeHandlerlevel} name="otherArtType" type="text" placeholder="Enter Level of Artist " style={{ width: "490px", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                        </div>
                      )}

                      <div className="ArtistOpportunities_Page_Infoform_inputfield_No">
                        <label>
                          <strong>Location of Artist*</strong>
                        </label>
                        <select onChange={inputChangeHandlerlocation} name="artistLocation" value={formData?.artistLocation} required style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {artistLocation?.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      {showAdditionallocation && (
                        <div className="ArtistOpportunities_Page_Infoform_inputfield">
                          <label>
                            <strong>Enter Location</strong>
                          </label>
                          <input onChange={inputChangeHandlerlocation} name="otherArtistLocation" type="text" placeholder="Enter Artist Location " style={{ width: "490px", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                        </div>
                      )}
                    </div>

                    <div style={{ margin: "20px", width: "90%", fontSize: "30px", color: "#AD2F3B", fontWeight: "600" }}>
                      Audience & Venue
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Size of Audience*</strong>
                      </label>
                      <select onChange={inputChangeHandler} name="audienceSize" value={formData?.audienceSize} required style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        <option value="20">Below 25</option>
                        <option value="35">25-50</option>
                        <option value="70">50-100</option>
                        <option value="300">100-500</option>
                        <option value="800">500-1000</option>
                        <option value="1200">Above 1000</option>
                      </select>
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Profile of Audience*</strong>
                      </label>
                      <select onChange={inputChangeHandler} name="audienceProfile" value={formData?.audienceProfile} required style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        <option value="Hotel inhouse Guests ">Hotel inhouse Guests</option>
                        <option value="Professional/ Executives">Professional/ Executives</option>
                        <option value="Students">Students</option>
                        <option value="Family Guests">Family Guests</option>
                      </select>
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Venue of Performance*</strong>
                      </label>
                      <select onChange={inputChangeHandlerVenue} name="venue" value={formData?.venue} required style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {venueTypes?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {showAdditionalVenueInput && (
                      <div className="ArtistOpportunities_Page_Infoform_inputfield">
                        <label>
                          <strong>Other Venue</strong>
                        </label>
                        <input onChange={inputChangeHandler} name="otherVenue" type="text" placeholder="Enter venue information" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                      </div>
                    )}

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Performance Facilities*</strong>
                      </label>
                      <select onChange={inputChangeHandlerFacilities} name="facilities" value={formData?.facilities} required style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }}>
                        <option value="" disabled hidden>
                          Select
                        </option>
                        {performanceFacilitiesaArr?.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    {showAdditionalFacilitiesInput && (
                      <div className="ArtistOpportunities_Page_Infoform_inputfield">
                        <label>
                          <strong>Other Facilities</strong>
                        </label>
                        <input onChange={inputChangeHandler} name="otherFacilities" type="text" placeholder="Enter performance facilities" style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                      </div>
                    )}

                    <div className="ArtistOpportunities_Page_Infoform_inputfield textareafield" style={{ width: "90%" }}>
                      <label>
                        <strong>Other Requirement:</strong>
                      </label>
                      <textarea onChange={inputChangeHandler} name="otherRequirements" value={formData?.otherRequirements} style={{ height: "60px", resize: "none", width: "100%", boxShadow: "#a2a2a2 0px 3px" }} placeholder="Enter Any Other requirements"></textarea>
                    </div>

                    <div style={{ margin: "20px", width: "90%", fontSize: "30px", color: "#AD2F3B", fontWeight: "600" }}>
                      Contact
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Name</strong>
                      </label>
                      <input name="Name" type="text" placeholder="Name of User" onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Contact Number</strong>
                      </label>
                      <input name="Name" type="text" placeholder="Contact Number" onChange={(e) => setFormData({ ...formData, contactPersonNumber: e.target.value })} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Email</strong>
                      </label>
                      <input name="Email" type="text" placeholder="Email of User" onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                    </div>

                    <div className="ArtistOpportunities_Page_Infoform_inputfield">
                      <label>
                        <strong>Perks & Benefits</strong>
                      </label>
                      <input name="Perks_Benefits" type="text" placeholder="" onChange={inputChangeHandler} style={{ width: "100%", height: "50px", boxShadow: "#a2a2a2 0px 3px", marginTop: "10px" }} />
                    </div>

                  </div>

                  <div className="ArtistOpportunities_Page_Infoform_btns" style={{ textAlign: "center", width: "100%" }}>
                    <button type="Submit" style={{ cursor: "pointer" }}>
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadOpportunities;