import React from 'react';
import '../styles/HomeUser.css'

function HomeUser() {
  return (
    <div className='Home-section'>
      <div className='home-headline-img'></div>
      <div className='home-contents section group'>
        <div className='content-left'>
          <h1 className='title-top'>K' Mas Coffee</h1>
          <p className='title-description'>K'mas Coffee adalah sebuah toko kopi yang menjual aneka ragam minuman dan bahan minuman</p> 
        </div>
        <div className='content-right'></div>
      </div>
      <div className='sub-content group'>
        <div className='sub'>
          <h2>About Us</h2>
          <p>Kami bergabung bersama para Koperasi Petani di Daerah dan kami senantiasa membantu menyalurkan biji kopi yang Koperasi Petani jual</p>
        </div>
        <div className='sub'>
          <h2>How we can help you?</h2>
          <p>We're selling Products for coffee and non-coffee you can chek in our Shop!</p>
        </div>
      </div>
    </div>
  )
}

export default HomeUser