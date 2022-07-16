import React from 'react'
import '../styles/CoffeeBar.css'

function CoffeeBar() {
  return (
    <div className='coffee-bar'>
      <div className='img-headline'></div>
      <div className='title-coffeebar group'>
        <h1>Our Coffee Bar</h1>
        <p>We dedicated with our menu and make a speciality coffee</p>
      </div>
      <div className='deskripsi-coffeebar group'>
        <div className='img-amerta'></div>
        <div className='desc-amerta'>
          <h2>Her Name is Amerta</h2>
          <p>She is a Moctail Coffee with strawberry assence</p>
        </div>
      </div>
    </div>
  )
}

export default CoffeeBar