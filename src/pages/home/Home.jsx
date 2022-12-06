import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useState ,useEffect } from "react";
import axios from "axios";


const Home = ({type}) => {
  const [lists, setlists] = useState([]);
  const [genre, setgenre] = useState(null);
  useEffect(() => {
  const getRandomLists = async ()=>{
   try {
     const res = await axios.get(`lists${type ?"?type=" + type:""}${genre ? "&genre="+genre:""}`,{
      headers:{
        token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODFjNWE5NmQ2ZjkyYmJmNzI3MTVjNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDIzMzAzNiwiZXhwIjoxNjcwNDA1ODM2fQ.eG-xk203od8xr50QBQUEwRyr3XV9yKbV3OxIC6IGxjU"
      }
     }
     );
    setlists(res.data);

   } catch (error) {
    console.log(error)
   }
  } 
  getRandomLists();
  }, [type,genre])
  
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      { lists.map((list)=>(
      <List list={list}/>
))}
    </div>
  );
};

export default Home;
