import React from 'react'
import './Footer.css'
import instagram1 from '../Assets/instagram 1.png'
import facebook from '../Assets/facebook.png'
import whatsapp from '../Assets/whatsapp.png'

const Footer = () => {
  return (
    <div className='footer'>
      
      <ul className="footer-links">
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={instagram1} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={facebook} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
