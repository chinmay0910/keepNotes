import React, { useContext, useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {

    const s1 = [{
        "_id": "658dcea3e03a2ccb129556fd",
        "user": "658d4c267eb044580deba921",
        "title": "chxaxassssss",
        "description": "gmassaacscsdaxcil.com",
        "tag": "oopsxsxssxscda sccxs",
        "date": "2023-12-28T19:38:11.509Z",
        "__v": 0
    },
    {
        "_id": "658dceade03a2ccb129556ff",
        "user": "658d4c267eb044580deba921",
        "title": "axassssss",
        "description": "gmassaacscsdaxxcil.com",
        "tag": "oopsxsxssxscda sccxs",
        "date": "2023-12-28T19:38:21.713Z",
        "__v": 0
    },
    {
        "_id": "658dceec6d65866fe2d900d8",
        "user": "658d4c267eb044580deba921",
        "title": "axasssssss",
        "description": "gmassaac scsdaxxcil.com",
        "tag": "oopsxsxssxscda sccxs",
        "date": "2023-12-28T19:39:24.290Z",
        "__v": 0
    },
    {
        "_id": "658dceec6d65866fe2d900d8",
        "user": "658d4c267eb044580deba921",
        "title": "axasssssss",
        "description": "gmassaac scsdaxxcil.com",
        "tag": "oopsxsxssxscda sccxs",
        "date": "2023-12-28T19:39:24.290Z",
        "__v": 0
    },
    {
        "_id": "658dcef16d65866fe2d900da",
        "user": "658d4c267eb044580deba921",
        "title": "axasssssss",
        "description": "gmassaac scsdax xcil.com",
        "tag": "oopsxsxssxscda sccxs",
        "date": "2023-12-28T19:39:29.687Z",
        "__v": 0
    },]

    const [Note, setNote] = useState(s1);
    
    // Fetch all notes
    const getNotes=async()=>{
        // API call
        const response = await fetch('https://keepnotesbackend-d8ye.onrender.com/api/notes/fetchallnotes', {
            method: "GET",  
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          const json = await response.json();

          setNote(json)

    }

    // Add note
    const addNote = async(title, description, tag) => {
        // Api Call
        const response = await fetch('https://keepnotesbackend-d8ye.onrender.com/api/notes/addnote', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
          });
          const json = await response.json();
        //   console.log(json);
        console.log("Added a note");

        // logic
        setNote(Note.concat(json))
    }


    // Delete note
    const deleteNote = async (id) => {
        // Api Call
        const response = await fetch(`https://keepnotesbackend-d8ye.onrender.com/api/notes//deletenote/${id}`, {
            method: "DELETE",  
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        //   const json = await response.json();


        // logic
        const element = Note.filter((currentValue)=>currentValue._id !== id)
        setNote(element)
    }
    // edit note
    const editNote = async(id, title, description, tag) => {
        // Api Call
        const response = await fetch(`https://keepnotesbackend-d8ye.onrender.com/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
          });
        //   const json = await response.json();
        //   console.log(json);
        // console.log("Edited a note");    

        // Logic
        for (let i = 0; i < Note.length; i++) {
            const element = Note[i];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }

    }




    return (
        <NoteContext.Provider value={{Note, setNote, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )


}

export default NoteState;