import "./App.css";
import React, { useState } from "react";

import axios from "axios";

function App() {
  const [array, setArray] = useState([]);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const handleChange = (event) => {
    let arrayImg = array.concat([event.target.files[0]]);
    setArray(arrayImg);
    setFile(URL.createObjectURL(event.target.files[0]));
    setFile1(event.target.files[0]);
  };
  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleChange} />
        {array.map((x) => (
          <img style={{ height: 100 }} src={URL.createObjectURL(x)} />
        ))}
      </div>
      <h1
        onClick={() => {
          if(array.length==0){
            alert("chưa chọn hình")
            return false
          }
          const data = new FormData();
          for (let i = 0; i < array.length; i++) {
            data.append("file", array[i]);
          }
          axios
            .post("http://192.168.1.56:8086/upload", data, {
              // receive two    parameter endpoint url ,form data
            })
            .then((res) => {
              // then print response status
              console.log(res.statusText);
              if(res.statusText=="OK"){
                alert("Thành công")
              }else{
                alert("Thất bại")
              }
            });
        }}
      >
        upload
      </h1>
    </div>
  );
}

export default App;
