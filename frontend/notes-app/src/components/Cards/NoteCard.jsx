import React from 'react';
import moment from "moment";
import {MdOutlinePushPin, MdDelete, MdCreate} from "react-icons/md";
const NoteCard = ({title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {
  return (
    <div className='note-container'>
        <div className='small-container'>
            <div>
                <h6 className='note-title'>{title}</h6>
                <span className='note-date'>{moment(date).format('DD MMM YYYY')}</span>
            </div>
            <MdOutlinePushPin className={`${isPinned ? "pinned" : "notPinned"}`} onClick={onPinNote}/>
        </div>
        <p className='content'> {content?.slice(0,60)} </p>
        <div className='tag-container'>
            <div className='note-tags'>{tags.map((items)=> `#${items}`)}</div>
            <div className='icons'>
                <MdCreate
                    className="icon-btn"
                    onClick={onEdit}
                />
                <MdDelete
                    className="icon-btn"
                    onClick={onDelete}
                />
            </div>
        </div>
    </div>
  )
}

export default NoteCard