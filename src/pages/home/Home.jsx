import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios"

export default function Home() {
  const MONTHS =useMemo(()=>[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",

],[]);
    const [userStats, setuserStats] = useState([])
    useEffect(  ()=>{
      const getStats= async ()=>{
       try {
        const res = await axios.get("/users/stats",{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjNWE5NmQ2ZjkyYmJmNzI3MTVjNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDQxMjE1MCwiZXhwIjoxNjcwNTg0OTUwfQ.jLJBlT9qMoIs1Dmqu2S3PTih0I4o4NsUdntMPd1S99g"
          }
         });
         const statsList =res.data.sort(function (a,b){
          return a._id - b._id;
         })
         statsList.map(item=>setuserStats(prev=>[...prev,{name:MONTHS[item._id-1],"New User":item.total}]))
         //setuserStats(res.data);
       } catch (error) {
        console.log(error);
       }
    };
    getStats();
    },[MONTHS])
      
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
