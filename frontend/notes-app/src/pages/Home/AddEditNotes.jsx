import React, { useState } from 'react'
import './home.css'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({type,noteData,onClose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags,setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  //add note
  const addNewNote = async ()=>{
    try{
      const response = await axiosInstance.post("/add-note",{
        title,
        content,
        tags,
      });

      if(response.data && response.data.note){
        getAllNotes();
        onClose();
      }

    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  }

  //edit note
  const editNote = async ()=>{
    const noteId = noteData._id;
    // console.log(noteId);
    try{
      const response = await axiosInstance.put("/edit-note/" + noteId,{
        title ,
        content ,
        tags,
      });

      if(response.data && response.data.note){
        getAllNotes();
        onClose();
      }

    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  }

  const handleAddNote = ()=>{
    if (!title){
      setError("Please enter title");
      return;
    }
    if (!content){
      setError("Please enter content");
      return;
    }
    setError("");

    if(type === 'edit'){
      editNote()
    }else{
      addNewNote();
    }
  }

  return (
    <div style={{position : "relative"}}>
        <button onClick={onClose} style={{display:"flex", justifyContent:"center", alignItems:"center", position:"absolute", top:"-5px", right:"0", fontSize:"20px", border: "0", backgroundColor : "transparent", cursor:"pointer"}}>
            <MdClose/>
        </button>
        <div className='input-container'>
            <label className='input-label'>TITLE</label>
            <input 
                type='text'
                className='title-input'
                placeholder='Go to gym'
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />
        </div>
        <div className='content-container'>
          <label className='input-label'>CONTENT</label>
          <textarea className='input-content' placeholder='Content' rows={10} 
                value={content}
                onChange={({target}) => setContent(target.value)}/>
        </div>
        <div className='tags-box'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button onClick={handleAddNote} className='btn-primary'>{type === "edit" ? "UPDATE" : "ADD"}</button>
    </div>
  )
}

export default AddEditNotes