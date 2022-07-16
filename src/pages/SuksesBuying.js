import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/SuksesBuying.css'
import { BsBagCheck } from 'react-icons/bs'

function SuksesBuying() {
  return (
    <div className='sukses-buying group'>
        <BsBagCheck className='sukses-icons' />
        <h1>Pembayaran Berhasil</h1>
        <h3>Harap Menunggu Konfirmasi dari Admin</h3>
        <p>Harap menunggu konfirmasi melalui Email atau Nomor Telefon yang telah anda daftarkan</p>
        <p>Ingin berbelanja lagi? kembali ke<Link className="link-sukses" to={"/products"}> Halaman Produk!</Link></p>
    </div>
  )
}

export default SuksesBuying