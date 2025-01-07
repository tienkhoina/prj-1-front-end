// App.jsx
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const webcamRef = useRef(null);
    const { userId,setUserId } = useUser();
    const navigate = useNavigate();
  // Dữ liệu hiển thị
  const [name,setName] = useState("Name");
  const [email,setEmail] = useState("Email");
  const [id,setId] =useState(null)

  // Hàm gửi ảnh về server
  const sendImageToServer = async () => {
    if (webcamRef.current) {
      // Lấy chuỗi Base64 đầy đủ
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        // Loại bỏ tiền tố 'data:image/jpeg;base64,'
        const base64String = imageSrc.split(",")[1];

        try {
          const response = await axios.post("https://prj-1-face-info-backend.onrender.com/api/login", { image: base64String });
          setName(response.data.name);
          setEmail(response.data.email);
          setId(response.data.id);
        } catch (error) {
          console.error("Error sending image to server:", error);
        }
      }
    }
    };
    

  // Gửi ảnh mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(sendImageToServer, 5000);
    return () => clearInterval(interval);
  }, []);

  // Hàm xử lý login
  const handleLogin = (id) => {
      if (id) {
          setUserId(id);
          navigate('/');
      }
      else {
          alert("Unable to login");
      }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Vui lòng giữ khuôn mặt ít nhất 15s để nhận diện
      </h1>

      {/* Camera */}
      <div className="mb-6">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-72 h-56 border-4 border-blue-500 rounded-lg shadow-md"
        />
      </div>

      {/* Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(id);
          }}
        >
          {/* Name (hiển thị) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <div className="mt-1 w-full px-4 py-2 bg-gray-100 border rounded-lg text-gray-700">
              {name}
            </div>
          </div>

          {/* Email (hiển thị) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="mt-1 w-full px-4 py-2 bg-gray-100 border rounded-lg text-gray-700">
              {email}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;