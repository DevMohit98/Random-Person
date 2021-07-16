import React, { useEffect, useState } from "react"
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
import "./App.css"
 const App=()=>{
  const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
  const url = 'https://randomuser.me/api/'
  const getData=async()=>{
    const response= await fetch(url);
    const data=await response.json();
    const person =data.results[0];
    const {phone,email}=person;
    const {large:img}=person.picture;
    const {password}=person.login;
    const {first,last}=person.name;
    const {dob:{age}}=person
    const {street:{number},}=person.location;
    const newPerson={
      name:`${first} ${last}`,
      email,
      img,
      password,
      age,
      phone,
      street:`${number}`
    };
    console.log(newPerson);

    setLoading(false);
    setPerson(newPerson);
    setValue(newPerson.name);
    setTitle('name');

  }
  useEffect(()=>{
    getData();
  },[]);
   const [Loading,setLoading]=useState(true);
   const [person,setPerson]=useState(null);
   const [value,setValue]=useState("random person");
   const [title,setTitle]=useState("name");
   const HandleChnage=(e)=>{
     if(e.target.classList.contains("btn"))
     {
       const newValue=e.target.dataset.label;
       setValue(person[newValue]);
       console.log(setValue);
       setTitle(newValue);
     }
   }
   return(
     <main>
   <div className="block bcg-black"></div>
   <div className="block">
     <div className="container">
       <img src={(person && person.img )|| defaultImage} alt="img" className="user-img"/>
       <p className="user-title">My {title} is</p>
       <p className="user-value">{value}</p>
       <div className="values-list">
         <button className="btn" data-label="name" onMouseOver={HandleChnage}>   <FaUser /></button>
         <button className="btn" data-label="email" onMouseOver={HandleChnage}>   <  FaEnvelopeOpen /></button>
         <button className="btn" data-label="age" onMouseOver={HandleChnage}>   <FaCalendarTimes /></button>
         <button className="btn" data-label="street" onMouseOver={HandleChnage}>   <FaMap /></button>
         <button className="btn" data-label="phone" onMouseOver={HandleChnage}>   < FaPhone /></button>
         <button className="btn" data-label="password" onMouseOver={HandleChnage}>   <FaLock/></button>
   </div>
   <button className="btn" onClick={getData}>{Loading? " Loading...." :"Random person"}</button>
     </div>
     
   </div>
     </main>

   )
 }
 export default App