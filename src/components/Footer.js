import React from 'react'
import '../styles/Footer.css'
import { BsWhatsapp, BsInstagram } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'

export default function Footer() {
  return (
    <div className='footers-container'>
        <div className='footer-contents group'>
            <div className='footer-content'>
                <h3>K'Mas Coffee</h3>
                <p>Puri Gading, Alam Raya 1 Blok K2 No.11, Jati Warna, Bekasi</p>
            </div>
            <div className='footer-content-right'>
                <div className='footer-contacts'>
                    <h3>Contacts</h3>
                    <p><BsWhatsapp /> 085920687294 Adam</p>
                    <p><HiOutlineMail /> kmas.coffee@gmail.com</p>
                </div>
                <div className='footer-contacts'>
                    <h3>Social Media</h3>
                    <p><BsInstagram /> Kmas.coffee</p>
                </div>
            </div>
        </div>
    </div>
  )
}
