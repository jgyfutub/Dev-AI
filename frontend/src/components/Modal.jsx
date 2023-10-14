import React from 'react'
import plant from '../pages/forest.jpg'
import './Modal.css'

const Modal = ({open, onClose}) => {
  if(!open) return null
  return (
    <div onClick={onClose} className='overlay'>
      <div onClick={(e)=> {
        e.stopPropagation()
      }}className="modalContainer">
        <img className='img-modal' src={plant} alt="" />
        <div className="modalRight">
          <p onClick={onClose} className="closeBtn">X</p>
          <div className="content">
            <p>Plant is nice, plant is good.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;