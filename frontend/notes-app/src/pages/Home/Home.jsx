import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import moment from "moment";
import {MdAdd} from "react-icons/md";
import Modal from 'react-modal';
import "./home.css"
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNote from "../../assets/img/addNote.png";
import noData from "../../assets/img/noData.png";


Modal.setAppElement('#root');
const Home = () => {
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data : null
    });

    const [allNotes,setAllNotes] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenAddEditModal({isShown : true, data : noteDetails, type : 'edit'});
    }

    //get user info
    //as soon as we login, we will get all the user login information which are defined from /get-user
    const getUserInfo = async () => {
        try{
            const response = await axiosInstance.get("/get-user"); //url from postman nodejs
            if(response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        }catch(error){
            if(error.response.status === 401){
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getAllNotes = async () => {
        try{
            const response = await axiosInstance.get("/get-all-notes");
            if(response.data && response.data.notes){
                setAllNotes(response.data.notes);
            }
        }catch(error){
            console.log("an unexpected error occur. try again");
        }
    }

    //delete note
    const deleteNote = async (data) => {
        const noteId = data._id;
        
        try{
            const response = await axiosInstance.delete("/delete-note/" + noteId);

            if(response.data && !response.data.error){
                // showToastMessage("Note Deleted successfullly");
                getAllNotes();
            }

        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                console.log("An unexpected error occurred. Try again")
            }
        }
    }

    //search
    const onSearchNote = async (query) => {
        try{
            const response = await axiosInstance.get("/search-notes", {
                params : { query }
            });

            if (response.data && response.data.notes){
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    }

    //update pin
    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id;
    try{
      const response = await axiosInstance.put("/update-note-pinned/" + noteId,{
        isPinned : !noteId.isPinned
      });

      if(response.data && response.data.note){
        getAllNotes();
      }

    }catch(error){
      console.log(error)
    }
    }

    //as soon as window load, funcs inside useEffect will work
    useEffect(() => {
        getAllNotes();
        getUserInfo();
        return () => {}
    },[]);


    return(
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
            <div className="container">
               {allNotes.length > 0 ? ( 
                    <div className="inner-container">
                        {allNotes.map((note)=> {
                            return(
                                <NoteCard 
                                key={note._id}
                                title={note.title}
                                date={moment(note.createdOn).format('DD MMM YYYY')}
                                content = {note.content}
                                tags ={note.tags}
                                isPinned={note.isPinned}
                                onEdit={()=>handleEdit(note)}
                                onDelete={()=>deleteNote(note)}
                                onPinNote={()=>updateIsPinned(note)}
                            />
                            )
                            
                        })}
                    
                </div>) : ( 
                        <EmptyCard 
                            imgSrc={isSearch ? noData : AddNote} 
                            message={isSearch ? `No Data is found. Please enter title or content you want to find` : `ADD your first note! Click 'ADD' button to write down your thoughts, tasks and many other things`}/> )}   
            </div>
            <button className="addBtn" onClick={()=>{
                setOpenAddEditModal({ isShown : true, type:"add", data:null})
            }}>
                <MdAdd className="add"/>
            </button>
            <Modal 
                isOpen={openAddEditModal.isShown}
                onRequestClose = {() => {}}
                style = {{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel = ""
                className="modal"
            >
            <AddEditNotes 
                type={openAddEditModal.type}
                noteData={openAddEditModal.data}
                onClose={() => {
                    setOpenAddEditModal({ isShown: false, type:"add", data:null})
                }}
                getAllNotes={getAllNotes}
            />
            </Modal>
            {/* <Toast
                isShown={showToastMsg.isShown} 
                message = {showToastMsg.message} 
                type = {showToastMsg.type}
                onClose = {handleCloseToast}
            /> */}
        </>
    )
}

export default Home;