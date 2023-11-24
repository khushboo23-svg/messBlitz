import React from 'react'
import errorImage from '../images/errorImage.png'

const Error = () => {
  return (
    <div style={{height : "100vh",backgroundColor : "#001F3F"}} className='text-light text-center'>
      <p className='text-center display-2 fw-bold text-primary'>Oops!</p>
      <br />
      <p className='text-light display-5'>Page Not Found</p>
      <br />
      <img src={errorImage} alt="Hostel Image" style={{ width: '340px', height: 'auto' }} />
    </div>
  )
}

export default Error
