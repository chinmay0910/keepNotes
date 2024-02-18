import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";
import { AddNote } from "./AddNotes";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
    const context = useContext(NoteContext)
    const { Note, setNote, getNotes, editNote } = context;
    const [currNote, setcurNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [isValid, setisValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else{
            navigate('/signin');

        }

    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click()

        setcurNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setcurNote({ ...currNote, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(currNote);
        if (currNote.etitle.length < 5 || currNote.edescription.length < 5 || currNote.etag.length < 3) {
            setisValid(true);
        }
        editNote(currNote.id, currNote.etitle, currNote.edescription, currNote.etag)
        refClose.current.click();
        props.showAlert("Update Successfully", "success")
    }


    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="container mt-4">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter etitle" value={currNote.etitle} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name="edescription" placeholder="Enter edescription" value={currNote.edescription} rows="3" onChange={onChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter etag" value={currNote.etag} onChange={onChange} />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div className="container text-danger mt-4">
                                {isValid ? "Title and Desscription should atleast be of length 5 and Tag of length 3" : ""}
                            </div>

                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container notes mt-4">
                <h2>Your Notes</h2>

                <div className="container mx-4">
                    {Note.length === 0 ? "No notes available " : ""}
                </div>

                <div className="row mb-4" style={{display: "flex", justifyContent: "center"}}>
                    {Note.map((ele, index) => (
                        <NoteItem key={index} updateNote={updateNote} note={ele} showAlert={props.showAlert}/>

                    ))}

                </div>
            </div>

        </>
    )

}
