import React, { useState } from "react";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import UserNavigation from "../components/UserNavigation";
import axios from "axios";
import Modal from "../components/Modal";
import './../components/Modal.css'
axios.defaults.withCredentials = true;
export default function Dashboard() {
  
  const [openModal,setOpenModal] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  let user = location.state.user;

  const [images, setimages] = useState();
  const handleImageInput = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Check if the selected file is an image
        if (file.type.startsWith('image/')) {
          // Handle the image file
          setimages(file);
          console.log(`Selected image: ${file.name}`);
        } else {
          // Display an error message or prevent file selection
          setimages(console.error('Please select an image file.'));
        }
      }
    console.log(images);
  };

  const handleVideoInput = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check if the selected file is a video
      if (selectedFile.type.startsWith('video/')) {
        // Handle the video file
        console.log(`Selected video: ${selectedFile.name}`);
        setIsVideoSelected(true);
      } else {
        // Display an error message or prevent file selection
        console.error('Please select a video file.');
        event.target.value = ''; 
        setIsVideoSelected(false);
      }
    };
  };

  const handleInputClick = () => {
    if (!isVideoSelected) {
      // Change isVideoSelected to true after a 1-second delay
      setTimeout(() => {
        setIsVideoSelected(true);
      }, 1000);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", images[0]);
    console.log(formdata);
    try {
      const senddata = await axios.post(
        "http://localhost:5000/api/search/",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(senddata);
      //navigate("/results", { state: { user, data: senddata.data } });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* <UserNavigation /> */}
      <Navigation user={user} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
          gap: 20,
        }}
      >
        <form onSubmit={handleSubmit}>
          <p
            style={{
              backgroundColor: "black",
              color: "white",
              paddingBlock: 20,
              paddingInline: 30,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            Upload Image in Choose file button below
          </p>
          <input type="file" accept="image/*" capture="camera" onChange={handleImageInput} />
          <button className="text-5xl modalBtn" onClick={(event)=> {event.preventDefault(); setOpenModal(true)}}>🔍</button>
          <br /><br /><br />
          <p
            style={{
              backgroundColor: "black",
              color: "white",
              paddingBlock: 20,
              paddingInline: 30,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            Upload a video
          </p>
          {user.role === 'Industrialist' && (
            <>
       <input type="file" accept="video/*"onChange={handleVideoInput} disabled={!isVideoSelected} onClick={handleInputClick} />
       <button className="text-5xl modalBtn" onClick={(event)=> {event.preventDefault(); setOpenModal(true)}}>🔍</button>
            </>
      )}
          <Modal open={openModal} onClose={()=> setOpenModal(false)}/>
        </form>
      </div>
    </div>
  );
}

