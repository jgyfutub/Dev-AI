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
  const [plant,setplant]=useState([])
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  let user = location.state.user;
  const[Rolle,setRolle]=useState(user.role)
  console.log(Rolle)
  const [info,setinfo]=useState([])
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
    console.log(Rolle)
    e.preventDefault();
    const formdata = new FormData();
    console.log(user.role)
    if (Rolle=="Student"){
      formdata.append("image", images);
      console.log(formdata);
      const sendimage=await axios.post(' http://127.0.0.1:2001/plantdetection/',formdata,  {
            withCredentials: true, // Enable credentials (cookies, authentication headers)
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type of your request
              'Access-Control-Allow-Origin': '*', // Allow any origin to access your server
            },
          })
          setdata(sendimage.data.objects)
          for(const i of Object.keys(data)){
            setplant([...plant,i])
          }
          for(const i of Object.values(data)){
            setinfo([...info,toString(i)])
          }
      }


      else if (Rolle=="researcher"){
        formdata.append("image", images);
        console.log("hjkoijhgv")
        console.log(Rolle)
        console.log(formdata);
        const sendimage=await axios.post(' http://127.0.0.1:2001/research/',formdata,  {
              withCredentials: true, // Enable credentials (cookies, authentication headers)
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type of your request
                'Access-Control-Allow-Origin': '*', // Allow any origin to access your server
              },
            })
          setdata(sendimage.data)
          for(const i of Object.keys(sendimage.data.Detected)){
            const formdata1=new FormData()
            formdata.append("plant",i)
            const sendplantname=await axios.post('http://127.0.0.1:2001/plantpapers/',formdata,  {
              withCredentials: true, 
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Access-Control-Allow-Origin': '*', 
              },
            })
            console.log(sendplantname.data.data)
            setresearch([...research,sendplantname.data.data])
          }
        setdata(sendimage.data.Detected)
        for(const i of data){
          console.log(i)
          setplant([...plant,i])
          setinfo([...info,data[i]])
        }
      }


      else if(Rolle=="Industry"){
        formdata.append('video',images)
        console.log(formdata)
        const senddata=await axios.post(' http://127.0.0.1:2001/industry/',formdata,  {
            withCredentials: true, // Enable credentials (cookies, authentication headers)
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // Specify the content type of your request
              'Access-Control-Allow-Origin': '*', // Allow any origin to access your server
            },
          })
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
          <input type="file" onChange={handleImageInput} />
          <button className="text-5xl modalBtn" >🔍</button>
<br /><br /><br />

        </form>
      </div>
      <p style={{color:"black"}}>{plant}</p>
      <p style={{color:"black"}}>{info}</p>
    </div>
  );
}

