import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUser, setnewUser] = useState([]);
  useEffect(()=>{
    const getNewUsers = async ()=>{
      try {
        const res = await axios.get("/users?new=true",{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjNWE5NmQ2ZjkyYmJmNzI3MTVjNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDQxMjE1MCwiZXhwIjoxNjcwNTg0OTUwfQ.jLJBlT9qMoIs1Dmqu2S3PTih0I4o4NsUdntMPd1S99g"
          }
        });
        setnewUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getNewUsers();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((user)=> (
        <li className="widgetSmListItem">
          <img
            src={user.profilePic || "https://cdn.drawception.com/drawings/RWDTxl2nrF.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))};
      </ul>
    </div>
  );
}
