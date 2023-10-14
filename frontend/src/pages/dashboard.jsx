import React, { useState } from "react";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import UserNavigation from "../components/UserNavigation";
import axios from "axios";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  let user = location.state.user;

  const [images, setimages] = useState([]);
  const handleImageInput = (event) => {
    const file = event.target.files[0];
    setimages([...images, file]);
    console.log(images);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", images[0]);
    console.log(formdata);
    try {
      const senddata = await axios.post(
        " http://127.0.0.1:5000/plantdetection/",
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      navigate("/results", { state: { user, data: senddata.data } });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
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
          <button className="text-5xl">🔍</button>
        </form>
      </div>
    </div>
  );
}
