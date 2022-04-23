import React, { useEffect } from 'react';
import tableStyles from './common/styles/table.module.css'
import axios from "axios";
export default function Home() {
  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser")
    const user = JSON.parse(loginUser)
    if (loginUser === null) {
        axios.get("http://localhost:5000/api/now").then((res) => {
          var data = res.data;
          document.getElementById("timeZone").innerHTML = '<h1>현재시간: '+data.now+'<h1>'
        });
    } else {
        document.getElementById("timeZone").innerHTML = '<h1>환영합니다: ' + user.name + '</h1>'
        axios.post("https://dev.aistudios.com/api/odin/getModelInfo", {
            "appId":"aistudios.com", "platform":"web", "isClientToken":true, "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImFpc3R1ZGlvcy5jb20iLCJwbGF0Zm9ybSI6IndlYiIsImlhdCI6MTY1MDU4OTUxOCwiZXhwIjoxNjUwNjc1OTE4fQ.iBGjriMaDfEXmT0WIskBJzvDjzLo4fhin6KR5_vnXQQ", "uuid":"6443234b-77d5-4013-bfd6-bb9399f317d9", "sdk_v":"1.0", "clientHostname":"aistudios.com", "model": "ysy"
        })
        .then(res => console.log(res))
    }
  },[]);
  return (
    <table className={tableStyles.table}>
    <thead>
        <tr>
            <th><h2>HOME</h2></th>
        </tr>
    </thead>
    <tbody>
        <tr >
        <td>
            <div id="timeZone">현재시간</div></td>
        </tr>
    </tbody>
  </table>
  )
}