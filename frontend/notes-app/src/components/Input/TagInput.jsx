import React, { useState } from 'react'
import {MdAdd , MdClose} from 'react-icons/md'
const TagInput = ({tags, setTags}) => {
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        if (inputValue.trim() !== ""){
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter"){
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }
  return (
    <div>
        {
            tags?.length > 0 && (
                <div style={{display:"flex", alignItems:"center", gap:"5", flexWrap:"wrap", marginTop:"10px"}}>
                    {
                        tags.map((tag,index) => (
                            <span 
                                key={index} 
                                className=''
                                style={{ display:"flex", alignItems:"center", padding: "2px 10px", backgroundColor:"aliceblue", borderRadius:"5px", marginRight:"5px"}}
                            >
                                # {tag}
                                <button 
                                    onClick={() => {handleRemoveTag(tag)}}
                                    style={{backgroundColor:"transparent", color: "#1D4ED8", fontWeight:"bold", border:"0" ,fontSize:"20px", padding: "4px", marginLeft:"3px",cursor:"pointer"}}
                                >
                                    <MdClose/>
                                </button>
                            </span>
                        ))
                    }
                </div>
            )
        }
        
        <div style={{display : "flex", alignItems: 'center',gap: "8",marginTop : "20px"}}>
            <input 
                type='text'
                style={{ backgroundColor : "transparent", padding: " 10px 15px", borderRadius : "10px", outline:"none", border:"1px solid rgb(233, 229, 229)"}}
                placeholder='Add tags'
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={inputValue}
            />
            <button onClick={()=>{addNewTag();}} style={{backgroundColor:"transparent", color: "#1D4ED8", fontWeight:"bold", fontSize:"20px", padding: "4px 8px", borderRadius:"5px", marginLeft:"10px", borderColor:"#1D4ED8", cursor:"pointer"}}>
                <MdAdd></MdAdd>
            </button>
        </div>
    </div>
  )
}

export default TagInput