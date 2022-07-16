import React, { useState, useEffect } from 'react'
import '../styles/BuyingUser.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function BuyingUser({ namaProduk, deskripsiProduk, hargaProduk, tipeProduk }) {
  const [idUser, setIdUser] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [alamatUser, setAlamatUser] = useState("");
  const [nomorHpUser, setNomorHpUser] = useState("");
  const [number, setNumber] = useState(1);

  const [imagePrev, setImagePrev] = useState("");
  const [saveImage, setSaveImage] = useState();
  const result = hargaProduk * number;
  const navigate = useNavigate()

  useEffect(() => {
    ChekLocalStorage()
  }, [])

  useEffect(() => {
    getData()
  })

  const ChekLocalStorage = () => {
      const id = localStorage.getItem('id');
      setIdUser(id);
  }

  const getData = async () => {
      const response = await axios.get(`http://localhost:5000/login/${idUser}`)
      setNamaLengkap(response.data.namalengkap);
      setAlamatUser(response.data.alamat);
      setNomorHpUser(response.data.nomorhp);
  }

  const CountHarga = () => {
    return (
      <div className='modals-harga'>
        <p className='title-harga'>Total Harga</p>
        <p className='result-harga'>Rp. {result}</p>
      </div>
    )
  }

  const BuktiTransfer = () => {
    return (
      <div className='modals-bukti'>
        <div className='bukti-tf'>
          <img className='img-transfer' src={imagePrev} alt="" />
          <h2>Bukti Transfer</h2>
          {imagePrev !== "" ? <p className='bukti-tf green'>Bukti Transfer telah di Input</p> : <p className='bukti-tf red'>Masukkan Bukti Transfer</p>}
          <div className='btn-input-bukti'>
            <input type="file" className='buying-btn' onChange={(e) => handleUploadImage(e)}/>
            <button className='btn-batal-bukti' type='submit' onClick={() => setImagePrev("")}>Batal Bukti Transfer</button>
          </div>
        </div>
      </div>
    )
  }

  function submitBuying () {
    if(!saveImage) {
      alert('Upload Bukti Transfer')
    } else {

      let formData = new FormData();
      formData.append('namauser', namaLengkap)
      formData.append('alamatuser', alamatUser)
      formData.append('nomorhpuser', nomorHpUser)
      formData.append('namaproduk', namaProduk)
      formData.append('hargaproduk', hargaProduk)
      formData.append('jumlahproduk', number)
      formData.append('tipeproduk', tipeProduk)
      formData.append('totalharga', result)
      formData.append('img', saveImage)

      fetch('http://localhost:5000/transaksi/', {
        method:'POST',
        body: formData
      }).then((res) => res.json()).then(data => {
        if(data.status === "secces") { 
          window.location.href = data.image;
        }
      })

      navigate("/success")
    }
  }

  const handleUploadImage = (event) => {
    let uploaded = event.target.files[0];
    setImagePrev(URL.createObjectURL(uploaded))
    setSaveImage(uploaded)
}

  return (
    <>
    <form onSubmit={submitBuying} className="modal-container">
      <div className='modals'>
          <h2>{namaProduk}</h2>
          <p>{deskripsiProduk}</p>
        <div className='modals-barang'>
          <h2>Jumlah Barang</h2>
          <input className="input-jumlah" type="number" value={number} placeholder="Masukkan Jumlah Barang.." onChange={(e) => setNumber(e.target.value)}/>
        </div>
        <BuktiTransfer />
          <p className='title-harga'>BCA: 10117083 a/n Adam Sake Arfansyah</p>
        <CountHarga />
      </div>
      <div className='modal-button'>
        <button className='buying-btn' type='submit'>Submit</button>
        <button className='batal-btn' onClick={() => navigate("/")}>Batal</button>
      </div>
    </form>
    </>
  )
}
