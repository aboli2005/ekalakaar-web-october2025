import React from "react";
import Artist_navbar from "../Artist_navbar";
import "./Artist_Profile.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { artistProfilePoints } from "../../services/apis";
import 'react-calendar/dist/Calendar.css';
import { useHistory } from "react-router-dom";
import ArtistNavbar from '../Artist_navbar'


import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPATCHRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticated_Multi_Patch_REQ,
} from "../../services/serverHelper";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function Artist_limited_Profile() {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [count,setCount] = useState(0);
  const [rotation,setRotation] = useState(0);

  //  const calculateProgressPercentage = () => {
  //   const totalFields = 40;
  //   const filledFields = 20;
  //   const percentage = (filledFields / totalFields) * 100;
  //    const rotation = (percentage / 100) * 360;
  //    setRotation(rotation)
  //   return percentage;
  // };
  const languages = [
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Punjabi",
    "Malayalam",
    "Odia",
    "Assamese",
    "Bhojpuri",
    "Haryanvi",
    "Rajasthani",
    "Sindhi",
    "Konkani",
    "Manipuri",
    "Maithili",
    "Santali",
    "Kashmiri",
    "Nepali",
    "Dogri",
    "Kokborok",
    "Khasi",
    "Mizo (Lushai)",
    "Tulu",
    "Garhwali",
    "Kumaoni",
    "Bhili",
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Russian",
  ];
  

  const CategoryArt = ["Dance", "Music", "Song", "Theatre", "Any Other"];

  // const experience = [
  //   "0",
  //   "1-10",
  //   "10-25",
  //   "25-50",
  //   "50-100",
  //   "100-250",
  //   "250 above",
  // ];

  const Dance = [
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
  ];

  const Song = [
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
  ];

  const Theatre = [
    "Bhavai",
    "Bhand Pather",
    "folk theatre",
     "modern theator",
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

  const Music = [
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
    "Any Other",
  ];

  

  let defaultPic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [profileAvatar, setProfileAvatar] = useState(defaultPic);

  const artdata = {
    Dance: Dance,
    Song: Song,
    Theatre: Theatre,
    Music: Music,
  };
  const [perfVideo, setPerfVideo] = useState("");

  const handleButtonClick = () => {

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpg, .jpeg, .png";
    fileInput.onchange = handleFileChange;
    fileInput.click();
  };

  // ---------- IMAGE UPLOAD + PREVIEWS -------------
  // This implementation:
  // - creates previews with URL.createObjectURL immediately
  // - uploads files to server via makeAuthenticated_Multi_Patch_REQ
  // - on successful server response, replaces previews with server URLs
  // - allows removing any image (preview or uploaded) and revokes blob URLs

 const handelMultipleImages = async (e) => {
  const Files = e.target.files;
  if (!Files || Files.length === 0) return;

  const newImages = Array.from(Files);

  let formData = new FormData();
  let sizeCounter = 0;
  let EachImageSize = true;

  newImages.forEach((image) => {
    let size = image.size / 1024;
    if (size >= 1024) {
      EachImageSize = false;
    }
    sizeCounter = sizeCounter + size;
    formData.append(`images`, image);
  });

  if (!EachImageSize || sizeCounter >= 16384) {
    return toast.error(
      "Image Size exceeds, Single Image Should Not be more than 1 mb"
    );
  }

  // create previews immediately (blob URLs)
  const previews = newImages.map((file) => URL.createObjectURL(file));

  // append previews to UI so user sees selected images instantly
  setBasicFormData((prev) => ({
    ...prev,
    performanceInfo: {
      ...prev.performanceInfo,
      perfImgs: [...(prev.performanceInfo?.perfImgs || []), ...previews],
    },
  }));

  const toastId = toast.loading("Uploading...");
  try {
    const response = await makeAuthenticated_Multi_Patch_REQ(
      artistProfilePoints.UPLOAD_PERF_IMAGES,
      formData,
      accessToken
    );

    toast.dismiss(toastId);

    if (response.status !== "error") {
      // revoke the created blob urls (they are replaced by server URLs)
      previews.forEach((p) => {
        try {
          URL.revokeObjectURL(p);
        } catch (err) {}
      });

      // ✅ Get returned images and clean them
      const returned = response.data.performanceInfo?.perfImgs || [];
      const normalized = returned.map((img) => {
        if (!img) return img;
        
        // Clean the path - remove any prefix
        return img
          .replace(/^\/public\/images\//, '')
          .replace(/^public\/images\//, '')
          .replace(/^\/images\//, '')
          .replace(/^images\//, '')
          .replace(/^https:\/\/api\.ekalakaar\.com\/uploads\/performance\//, '');
      });

      setBasicFormData((prev) => ({
        ...prev,
        performanceInfo: {
          ...prev.performanceInfo,
          perfImgs: normalized,
        },
      }));
      return toast.success("Performance Images Uploaded");
    } else {
      toast.error("Upload failed");
    }
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.message || "Upload error");
    console.log(error);
  }
};

  // const removeImage = (imgUrl) => {
  //   // if it's a blob URL, revoke it
  //   try {
  //     if (imgUrl && imgUrl.startsWith("blob:")) {
  //       URL.revokeObjectURL(imgUrl);
  //     }
  //   } catch (err) {}

  //   setBasicFormData((prev) => ({
  //     ...prev,
  //     performanceInfo: {
  //       ...prev.performanceInfo,
  //       perfImgs: prev.performanceInfo.perfImgs.filter((img) => img !== imgUrl),
  //     },
  //   }));

  //   // OPTIONAL: If you want to delete from server as well, call delete API here
  //   // e.g.
  //   // if (!imgUrl.startsWith('blob:')) {
  //   //   await makeAuthenticatedPOSTRequest(artistProfilePoints.DELETE_IMAGE_API, { image: imgUrl }, accessToken);
  //   // }
  // };

  // ------------ END IMAGE HANDLING ----------------

  const [profileLoading, setProfileLoading] = useState(false);

  // ---------- helper: normalize image values to backend /images/<filename> ----------
  const getFullImageUrl = (imageValue) => {
    if (!imageValue) return "/default-avatar.png";

    try {
      let raw = String(imageValue).replace(/[\u0000-\u001F\u007F]+/g, "").trim();
      if (!raw) return "/default-avatar.png";

      // blob URL (local preview)
      if (raw.startsWith("blob:")) return raw;

      // If string contains absolute URL anywhere (sometimes backend returns weird concatenation), extract first http(s)
      const absMatch = raw.match(/https?:\/\/[^\s]+/i);
      if (absMatch && absMatch[0]) {
        // return absolute URL directly (preserve)
        return absMatch[0];
      }

      // protocol-relative
      if (raw.startsWith("//")) return "https:" + raw;

      // strip leading slashes and common prefixes
      let cleaned = raw
        .replace(/^\/+/, "")
        .replace(/^public\/images\//i, "")
        .replace(/^public\/uploads\//i, "")
        .replace(/^uploads\/performance\//i, "")
        .replace(/^uploads\//i, "")
        .replace(/^images\//i, "")
        .replace(/^api\/v1\/images\//i, "")
        .replace(/^api\/images\//i, "")
        .replace(/^https?:\/\/api\.ekalakaar\.com\/api\/v1\/images\//i, "")
        .replace(/^https?:\/\/api\.ekalakaar\.com\/uploads\/performance\//i, "")
        .replace(/^https?:\/\/api\.ekalakaar\.com\//i, "")
        .trim();

      // Build host from env or default
      const envBase = process.env.REACT_APP_BASE_URL || "https://api.ekalakaar.com";
      // Ensure we keep only host (strip any /api/v1 etc)
      let API_HOST = String(envBase).replace(/\/api(\/v?1)?(\/.*)?$/i, "").replace(/\/+$/i, "");
      if (!API_HOST.startsWith("http")) {
        API_HOST = "https://" + API_HOST;
      }

      // Use /images/<filename> endpoint which your backend serves
      return `${API_HOST}/images/${cleaned}`;
    } catch (err) {
      console.error("getFullImageUrl error:", err, imageValue);
      return "/default-avatar.png";
    }
  };

  // ! this is to add the avatar
  // ! this is to add the avatar
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log(
      "🚀 ~ file: Artist_Profile.js:1444 ~ handleFileChange ~ selectedFile:",
      selectedFile
    );

    if (selectedFile) {
      let fileSizeKiloBytes = selectedFile.size / 1024;

      if (fileSizeKiloBytes >= 1024) {
        return toast.error("Image should be be less than 1mb");
      }
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      setProfileLoading(true);
      const toastId = toast.loading("Updating");
      try {
        const response = await makeAuthenticated_Multi_Patch_REQ(
          artistProfilePoints.UPDATE_ARTIST_AVATAR_API,
          formData,
          accessToken
        );
        console.log("res", response);
        setProfileAvatar(response?.data?.avatar?.url);
        toast.dismiss(toastId);
        toast.success("Avatar Updated");
        setProfileLoading(false);
      } catch (error) {
        console.log(error);
        setProfileLoading(false);
        // toast.success(res)
      }
    }
  };

  // avialable options
  const artCategoryoptions = CategoryArt.map((item) => ({
    value: item,
    label: item,
  }));
  const languageOptions = languages.map((item) => ({
    value: item,
    label: item,
  }));
  // const artnatureoptions=[...Dance, ...Song, ...Theator, ...Music].map((item) => ({ value: item, label: item }));
  const [artnatureoptions, setartnatureoptions] = useState([]);

  const [basicFormData, setBasicFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "",
      languages: languages[0],
    },
    contactNumber: {
      countryCode: "",
      number: "",
    },
    address: {
      state: "",
      city: "",
      pincode: "",
    },
    artinfo: {
      artCategory: "",
      artName: "",
    },
    performanceInfo: {
      experience: "",
      totalPerfs: 0,
      perfImgs: [],
      perfVideos: [],
    },
  });

  const [go, setgo] = useState(false);

  //selected options
  const [Categoryartoptions, setCategoryartoptions] = useState([]);
  const [languagesoptions, setlanguagesoptions] = useState([]);
  const [natureOfArtoptions, setnatureOfArtoptions] = useState([]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
   
    if (name.startsWith("address.")) {
      PinFetch(value);
      // If the change is related to address, update the nested state
      setBasicFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("personalInfo.")) {
      setBasicFormData((prevData) => ({
        ...prevData,
        personalInfo: {
          ...prevData.personalInfo,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("artinfo.")) {
      setBasicFormData((prevData) => ({
        ...prevData,
        artinfo: {
          ...prevData.artinfo,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("performanceInfo.")) {
      setBasicFormData((prevData) => ({
        ...prevData,
        performanceInfo: {
          ...prevData.performanceInfo,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setBasicFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

const fetchUserData = async () => {
  try {
    const response = await makeAuthenticatedGETRequest(
      artistProfilePoints.FETCH_PROFILE_DATA_API,
      accessToken
    );
    console.log("ress", response);
    
    const { personalInfo } = response.data;
    if (personalInfo?.avatar?.url) {
      setProfileAvatar(personalInfo?.avatar?.url);
    }

    if (response.status === "success") {
      const { firstName, lastName, email, age, languages, gender } =
        response.data.personalInfo;
      const { artCategory, artName } = response.data.artInfo;
      const { pincode, state, city } = response.data.address;
      const { experience, totalPerfs, perfImgs, perfVideos } =
        response.data.performanceInfo;

      // ✅ Normalize perfImgs: clean paths and store only filename
      const normalizedPerfImgs = (perfImgs || []).map((img) => {
        if (!img) return img;
        
        // Remove any prefix paths
        return img
          .replace(/^\/public\/images\//, '')
          .replace(/^public\/images\//, '')
          .replace(/^\/images\//, '')
          .replace(/^images\//, '')
          .replace(/^https:\/\/api\.ekalakaar\.com\/uploads\/performance\//, '');
      });

      setBasicFormData({
        personalInfo: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          age: age,
          gender: gender,
          languages: languages,
        },
        address: {
          state: state,
          city: city,
          pincode: pincode,
        },
        artinfo: {
          artCategory: artCategory,
          artName: artName,
        },
        performanceInfo: {
          experience: experience,
          totalPerfs: totalPerfs,
          perfVideos,
          perfImgs: normalizedPerfImgs, // ✅ Use cleaned filenames
        },
      });
      
      // ... rest of your code
    }
  } catch (error) {
    console.log(error);
  }
};

const PinFetch = async (value) => {
    try {
      if (value.length === 6) {
        const url = `https://api.postalpincode.in/pincode/` + value;
        const Responce = await fetch(url);
        const data = await Responce.json();
        // console.log("checkPin",data[0].Status);
        if (data[0].Status === "Success") {
          setBasicFormData((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              state: data[0].PostOffice[0].State,
              city: data[0].PostOffice[0].District,
            },
          }));
        } else {
          toast.error("PIN Code not found");
        }
      } else {
        // fixed bug: call setBasicFormData instead of basicFormData(...) 
        setBasicFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            state: "",
            city: "",
          },
        }));
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchUserData();
    //   const newProgress = calculateProgressPercentage();
    // setCount(newProgress);
  }, []);

  useEffect(() => {

    // const newProgress = calculateProgressPercentage();
    // setCount(newProgress);
    
    console.log("Categoryartoptions", Categoryartoptions);
    if (Categoryartoptions === null || Categoryartoptions.length === 0) {
      setartnatureoptions([]);
      return;
    }
    const dataart = Categoryartoptions?.map((option) => option.value);
    const newOptions = dataart.flatMap((item) =>
      artdata[item]?.map((subItem) => ({ value: subItem, label: subItem }))
    );

    setartnatureoptions(newOptions);
    console.log("artnatureoptions", artnatureoptions);
  }, [Categoryartoptions]);

  useEffect(() => {
    if (
      basicFormData.personalInfo.age !== "" &&
      basicFormData.personalInfo.firstName !== "" &&
      basicFormData.personalInfo.lastName !== "" &&
      basicFormData.personalInfo.email !== "" &&
      basicFormData.personalInfo.gender !== "" &&
      basicFormData.personalInfo.language !== "" &&
      basicFormData.address.pincode !== "" &&
      basicFormData.address.state !== "" &&
      basicFormData.address.city !== "" &&
      basicFormData.artinfo.artCategory !== "" &&
      basicFormData.artinfo.artName !== "" &&
      basicFormData.performanceInfo.totalPerfs !== 0 &&
      basicFormData.performanceInfo.experience !== ""
    ) {
       console.log(basicFormData);
       console.log("00000");
       navigate("/artist_profile");
    }
     console.log(basicFormData);
     console.log("11111")
  }, [go]);

  const basicSubmitHandler = async (event) => {
    event.preventDefault();

    const toastId = toast.loading("Loading...");

    let firstName = basicFormData.firstName;
    let address = basicFormData.address;
    let personalInfo = basicFormData.personalInfo;
    let performanceInfo = basicFormData.performanceInfo;
    let artInfo = basicFormData.artinfo;
    artInfo.artCategory = Categoryartoptions?.map((option) => option.value);
    personalInfo.languages = languagesoptions?.map((option) => option.value);
    artInfo.artName = natureOfArtoptions?.map((option) => option.value);
    try {
      const response = await makeAuthenticatedPATCHRequest(
        artistProfilePoints.UPDATE_PROFILE_DATA_API,
        { address, personalInfo, artInfo, performanceInfo },
        accessToken
      );

      if (response.status === "success") {
        toast.success(" successFully updated", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/artist_profile");
      } else {
        toast.error(response.message, {
          position: "top-center",
        });
        toast.error("server error please try again", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
    toast.dismiss(toastId);
  };
  const [anyLanguage, setAnyLanguage] = useState("");
  const [artName, setArtName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  
  const multiSectionHandle = (e) => {
    const { name } = e.target;
    if (name === "Category") {
      Categoryartoptions.push({ value: newCategory, label: newCategory });
      const NewCategoryOption = Categoryartoptions.filter(
        (item) => item.value !== "Any Other"
      );
      setCategoryartoptions(NewCategoryOption);
      setNewCategory("");
    }

    if (name === "Language") {
      languagesoptions.push({ value: anyLanguage, label: anyLanguage });
      const NewLanguageOption = languagesoptions?.filter(
        (item) => item.value !== "Any Other"
      );
      setlanguagesoptions(NewLanguageOption);
      setAnyLanguage("");
    }
  };
  

  return (
    <>
    <ArtistNavbar/>
      <div
        style={{ fontFamily: "Poppins", width: "90%" }}
        className="BasicProfile_Infoform"
      >
        <form onSubmit={basicSubmitHandler}>
        <div className="BasicProfile_avatar">
            {/* <img loading="lazy" src={(profileAvatar === undefined || profileAvatar === null) ?(`https://ui-avatars.com/api/?name=${basicFormData.firstName}+${basicFormData.lastName}`):(`https://api.ekalakaar.com/uploads/avatars/${profileAvatar}`)} /> */}
            <div className="profileImg" style={{background:`conic-gradient(#AD2F3B ${rotation}deg, #d9d9d9 0deg)`}}>
              {/* <img loading="lazy" src={defaultPic} /> */}
              {/* ---------- use helper for avatar so '@' / weird prefixes are handled ---------- */}
              <img
                loading="lazy"
                src={getFullImageUrl(profileAvatar || "")}
                alt="Profile avatar"
                onError={(e) => {
                  console.error("Avatar load failed:", e.target.src);
                  try {
                    // try fallback: construct from original value
                    const fallback = getFullImageUrl(profileAvatar || "");
                    if (fallback && fallback !== e.target.src) {
                      e.target.onerror = null;
                      e.target.src = fallback;
                      return;
                    }
                    // try decode %40 -> @ fallback
                    if (e.target.src.includes("%40")) {
                      e.target.onerror = null;
                      e.target.src = e.target.src.replace(/%40/g, "@");
                      return;
                    }
                  } catch (err) {
                    console.warn("avatar fallback error", err);
                  }
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
                style={{ width: 220, height: 220, objectFit: "cover", borderRadius: "50%" }}
              />
              {/* <div className="progressBar" style={{  transform: `rotate(${rotation}deg)translate(0px , -115px)rotate(-${rotation}deg)`}}>{count}%</div> */}
             
            </div>
            {/* <p style={{ fontWeight: "500", fontSize: "30px" }}>
              {" "}
              {basicFormData?.firstName?.toUpperCase()}{" "}
              {basicFormData?.lastName?.toUpperCase()}(eK ID: 12334)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle cx="25" cy="25" r="25" fill="#61C6FF" />
                <path
                  d="M14 26.7143L19.4935 32.2791C19.885 32.6757 20.5252 32.6757 20.9168 32.2791L36 17"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <b></b>
            </p> */}

            <div
  style={{
    display: "flex",
    alignItems: "center", // vertically center
    gap: "10px", // space between name and tick
    fontWeight: 500,
    fontSize: "30px",
  }}
>
  <span>
    {basicFormData?.firstName?.toUpperCase()}{" "}
    {basicFormData?.lastName?.toUpperCase()} (eK ID: 12334)
  </span>
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 50 50"
    fill="none"
  >
    <circle cx="25" cy="25" r="25" fill="#61C6FF" />
    <path
      d="M14 26.7143L19.4935 32.2791C19.885 32.6757 20.5252 32.6757 20.9168 32.2791L36 17"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
</div>


            <button
              onClick={handleButtonClick}
              className="BasicProfile_editavatar"
            >
              Upload/Edit Profile Picture
            </button>
          </div>

          <div className="BasicProfile_PersonalINfo">
            <div className="BasicProfile_inputfield" style={{ width: "40%" }}>
              <label htmlFor="firstName">First Name</label>
              <input
                onChange={changeHandler}
                name="firstName"
                value={basicFormData.personalInfo.firstName}
                type="text"
                className="input"
              ></input>
            </div>
            <div className="BasicProfile_inputfield" style={{ width: "50%" }}>
              <label htmlFor="firstName">Last Name</label>
              <input
                onChange={changeHandler}
                name="firstName"
                value={basicFormData.personalInfo.lastName}
                type="text"
                className="input"
              ></input>
            </div>
            <div className="BasicProfile_inputfield" style={{ width: "100%" }}>
              <label htmlFor="firstName">Email</label>
              <input
                onChange={changeHandler}
                name="firstName"
                value={basicFormData.personalInfo.email}
                type="text"
                className="input"
              ></input>
            </div>
          </div>

          <div className="BasicProfile_PersonalINfo">
            <div className="BasicProfile_inputfield" style={{ width: "40%" }}>
              <label htmlFor="age">
                Age <span className="red">*</span>
              </label>

              <select
              className="input"
                name="personalInfo.age"
                onChange={changeHandler}
                value={basicFormData.personalInfo.age}
                style={{ width: "100%" }}
                required
              >
                {Array.from({ length: 100 - 17 }, (_, index) => (
                  <option key={index} value={index + 18}>
                    {index + 18}
                  </option>
                ))}
              </select>
            </div>

            {/* abhishek */}

            <div
              className="BasicProfile_inputfield gender"
              style={{ width: "50%" }}
            >
              <label>
                Gender <span className="red">*</span>
              </label>
              <div className="Genderinfo1">
                <select
                  style={{
                    width: "100%",
                    fontFamily: "Poppins",
                    background: "transparent",
                    color: "black",
                    height: "60px",
                    border: "1px solid black",
                  }}
                  className="input"
                  name="personalInfo.gender"
                  value={basicFormData.personalInfo.gender}
                  onChange={changeHandler}
                  required
                >
                  <option selected hidden>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Transgender</option>
                  <option value="Any other">Any other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="BasicProfile_inputfield" style={{ width: "100%" }}>
              <label htmlFor="age">
                Language <span className="red">*</span>
              </label>
              {/* <select
                onChange={changeHandler}
                required
                style={{
                  fontFamily: "Poppins",
                  background: "transparent",
                  color: "black",
                  height: "60px",
                  width: "100%",
                  border: "1px solid black",
                }}
                name="personalInfo.language"
                id=""
                value={basicFormData.personalInfo.language}
              >
                <option value="" selected defaultChecked>
                  You can select languages
                </option>
                {languages?.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select> */}
              <Select
              className="input"
                      styles={{overflowY:"auto",height:"50px"}}
                      defaultValue={languagesoptions}
                      value={languagesoptions}
                      isMulti
                      onChange={setlanguagesoptions}
                      options={languageOptions}
                    />
                  </div>
                  {languagesoptions?.find((e) => e.value === "Any Other") !==
                  undefined ? (
                    <>
                      <div className="BasicProfile_inputfield">
                        <label htmlFor="firstName">Enter Your Language</label>
                        <input
                        className="input"
                          onChange={(e) => setAnyLanguage(e.target.value)}
                          name="firstName"
                          value={anyLanguage}
                          type="text"
                        ></input>
                        <button
                          name="Language"
                          onClick={multiSectionHandle}
                          style={{
                            background: "red",
                            marginTop: "10px",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "none",
                            fontSize: "25px",
                            color: "#fff",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
          </div>

          <div className="BasicProfile_Address">
            <div className="BasicProfile_Addressshort">
              <div className="BasicProfile_inputfield"
              //  style={{ width: "50%" }}
               >
                <label>
                  Pincode*
                </label>
                <input
                className="input"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  min="100000"
                  max="999999"
                  onChange={changeHandler}
                  value={basicFormData.address.pincode}
                  name="address.pincode"
                  type="number"
                  style={{ width: "100%" }}
                  required
                ></input>
              </div>
              <div className="BasicProfile_inputfield" 
              // style={{ width: "50%" }}
              >
                <label>State</label>
                <select
                className="input"
                  onChange={changeHandler}
                  name="address.state"
                  value={basicFormData.address.state}
                  style={{ width: "100%" }}
                  required
                >
                  {/* <option selected hidden>
                    Select State
                  </option> */}
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadar and Nagar Haveli">
                    Dadar and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>
              <div className="BasicProfile_inputfield"
              //  style={{ width: "100%" }}
               >
                <label>City</label>
                <input
                className="input"
                  onChange={changeHandler}
                  name="address.city"
                  value={basicFormData.address.city}
                  type="text"
                  style={{ width: "100%" }}
                  required
                ></input>
              </div>
            </div>
          </div>

          <div className="BasicProfile_PersonalINfo">
            <div className="BasicProfile_OtherDetails">
              <div className="BasicProfile_inputfield">
                <label>Category of Art* </label>
                {/* <select
                  onChange={changeHandler}
                  name="artinfo.artCategory"
                  value={basicFormData.artinfo.artCategory}
                  required
                >
                  <option selected hidden>
                    Select Category of Art
                  </option>
                  {natureofArt?.map((option) => (
                  <option value={option}>{option}</option>
                ))}
                </select> */}
                <Select
                className="input"
                  defaultValue={Categoryartoptions}
                  value={Categoryartoptions}
                  isMulti
                  onChange={setCategoryartoptions}
                  options={artCategoryoptions}
                  required
                />
              </div>
              {Categoryartoptions.find((e) => e.value === "Any Other") !==
              undefined ? (
                <>
                  <div className="BasicProfile_inputfield">
                    <label htmlFor="firstName">Enter Your Art Category</label>
                    <input
                    className="input"
                      onChange={(e) => setNewCategory(e.target.value)}
                      value={newCategory}
                      type="text"
                    ></input>
                    <button
                      name="Category"
                      onClick={multiSectionHandle}
                      style={{
                        background: "red",
                        marginTop: "10px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "none",
                        fontSize: "25px",
                        color: "#fff",
                      }}
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="BasicProfile_inputfield">
                <label>Name of Art* </label>
                {/* <select
                  onChange={changeHandler}
                  name="artinfo.artName"
                  value={basicFormData.artinfo.artName}
                  required
                >
                  <option selected hidden>
                    Select Name of Art
                  </option>
                  {nameofart?.map((option) => (
                  <option value={option}>{option}</option>
                ))}
                </select> */}
                <Select
                className="input"
                  defaultValue={natureOfArtoptions}
                  value={natureOfArtoptions}
                  isMulti
                  onChange={setnatureOfArtoptions}
                  options={artnatureoptions}
                  required
                />
              </div>
              <div className="BasicProfile_inputfield">
                <label>Experience(yrs)* </label>
              
                <select
                className="input"
                  required
                  onChange={changeHandler}
                  name="performanceInfo.experience"
                  value={basicFormData.performanceInfo.experience}
                >
                  {[...Array(101).keys()]?.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
    </div>
              <div className="BasicProfile_inputfield">
                <label>Total Number of Performances* </label>
          
              <select
                      onChange={changeHandler}
                      name="performanceInfo.totalPerfs"
                      value={basicFormData.performanceInfo.totalPerfs}
                    >
                      <option value="" disabled selected>
                        Select
                      </option>
                      {[...Array(251).keys()].map((item, index) => {
                        if (item === 250) {
                          return (
                            <option key={item} value="250+">
                              250+
                            </option>
                          );
                        }
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                
              </div>
              <div
                className="BasicProfile_inputfield "
                style={{ position: "relative" }}
              >
                <label
                  htmlFor="performanceImages"
                  className="custom-file-input"
                >
                  Performance Photograph
                </label>

                <input
                  style={{ color: "white" }}
                  onChange={handelMultipleImages}
                  type="file"
                  accept="image/*"
                  multiple
                  name="performanceImages"
                />

                <svg
                  className="possso"
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </div>

              <div className="BasicProfile_inputfield">
                <label htmlFor="perfVideo">Performance Video</label>
                <input
                  onChange={(e) => setPerfVideo(e.target.value)}
                  id="perfVideo "
                  placeholder="Enter Video links"
                  name="perfVideo"
                  type="text"
                />
              </div>
            </div>
            <div className="thumbnail-cc">
  {basicFormData?.performanceInfo.perfImgs?.map((item, index) => {
    // allow blob previews directly
    let imageUrl = item;

    if (!String(imageUrl).startsWith("blob:")) {
      // build normalized URL using helper which preserves '@' and handles prefixes
      imageUrl = getFullImageUrl(imageUrl);
    }

    return (
      <div 
        key={index} 
        style={{ 
          position: "relative", 
          display: "inline-block", 
          margin: 10 
        }}
      >
        <img 
          src={imageUrl} 
          className="thumbnail-cc-img" 
          alt={`perf-${index}`} 
          onError={(e) => {
            console.error(`Failed to load image ${index}:`, e.target.src);
            try {
              // try fallback constructed from original item
              const constructed = getFullImageUrl(item);
              if (constructed && constructed !== e.target.src) {
                e.target.onerror = null;
                e.target.src = constructed;
                return;
              }
              // try decode encoded @ if any
              if (e.target.src.includes("%40")) {
                e.target.onerror = null;
                e.target.src = e.target.src.replace(/%40/g, "@");
                return;
              }
            } catch (err) {
              console.warn("thumbnail fallback error:", err);
            }
            e.target.onerror = null;
            e.target.style.border = '2px solid red';
            e.target.alt = 'Failed to load';
          }}
          style={{ 
            width: 120, 
            height: 120, 
            objectFit: "cover", 
            borderRadius: 8 
          }} 
        />
      </div>
    );
  })}
</div>

          </div>

          <button className="updateBtn">Submit</button>
        </form>
      </div>
    </>
  );
}
