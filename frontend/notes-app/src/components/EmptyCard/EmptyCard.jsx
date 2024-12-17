import React from 'react'

function EmptyCard({imgSrc, message}) {
  return (
    <div style={{width: "50%", textAlign : "center" ,margin : "70px auto"}} >
        <img src={imgSrc} alt='no notes'/>
        <p>{message}</p>
    </div>
  )
}

export default EmptyCard