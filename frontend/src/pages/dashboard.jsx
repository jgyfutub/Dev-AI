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
  const [research,setresearch]=useState([])
  const [data,setdata]=useState([])
    const handleImageInput = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Check if the selected file is an image
        if (file.type.startsWith('image/' || file.type.startsWith('video/'))) {
          // Handle the image file
          setimages(file);
          console.log(`Selected image: ${file.name}`);
          setIsVideoSelected(true);
        } else {
          // Display an error message or prevent file selection
          setimages(console.error('Please select an image file.'));
          event.target.value = null; 
          setIsVideoSelected(false);
}
      }
    console.log(images);
  };

  // const handleVideoInput = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     // Check if the selected file is a video
  //     if (selectedFile.type.startsWith('video/')) {
  //       // Handle the video file
  //       console.log(`Selected video: ${selectedFile.name}`);
  //       setIsVideoSelected(true);
  //     } else {
  //       // Display an error message or prevent file selection
  //       console.error('Please select a video file.');
  //       event.target.value = null; 
  //       setIsVideoSelected(false);
  //     }
  //   };
  // };

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
    if (user.roll=="Student"){
      formdata.append("image", images);
      console.log(formdata);
      const sendimage=await axios.post(' http://127.0.0.1:2001/plantdetection/',formdata,  {
            withCredentials: true, // Enable credentials (cookies, authentication headers)
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type of your request
              'Access-Control-Allow-Origin': '*', // Allow any origin to access your server
            },
          })
        setdata(sendimage.data)
      }
      else if (user.roll=="Research"){
        formdata.append("image", images);
        console.log(formdata);
        const sendimage=await axios.post(' http://127.0.0.1:2001/research/',formdata,  {
              withCredentials: true, // Enable credentials (cookies, authentication headers)
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type of your request
                'Access-Control-Allow-Origin': '*', // Allow any origin to access your server
              },
            })
          setdata(sendimage.data)
      }
      else if(user.roll=="Industry"){
        formdata.append('video',images)
        console.log(formdata)
        const senddata=await axios.post(' http://127.0.0.1:2001/industry/',formdata,  {
            withCredentials: true, // Enable credentials (cookies, authentication headers)
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type of your request
              'Access-Control-Allow-Origin': '*', // Allow any origin to access your server
            },
          })
          for(const i of Object.keys(senddata.data.Detected)){
            const formdata1=new FormData()
            formdata.append("plant",i)
            const sendplantname=await axios.post('http://127.0.0.1:2001/plantpapers/',formdata,  {
              withCredentials: true, 
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Access-Control-Allow-Origin': '*', 
              },
            })
            setresearch([...research,sendplantname.data.data])
          }
        setdata(senddata.data)
      }
    // try {
    //   const senddata = await axios.post(
    //     "http://localhost:5000/api/search/",
    //     formdata,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log(senddata);
    //   //navigate("/results", { state: { user, data: senddata.data } });
    // } catch (err) {
    //   console.log(err);
    // }
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
       <input type="file" accept="video/*" disabled={!isVideoSelected} onClick={handleInputClick} />
       <button className="text-5xl modalBtn" onClick={(event)=> {event.preventDefault(); setOpenModal(true)}}>🔍</button>
            </> 
      )}
          <Modal open={openModal} onClose={()=> setOpenModal(false)}/>
        </form>
      </div>
    </div>
  );
}

