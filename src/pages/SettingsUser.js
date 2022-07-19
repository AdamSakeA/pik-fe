import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/SettingsUser.css'

export default function SettingsUser() {
  const [id, setId] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [alamatUser, setAlamatUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [nomorHp, setNomorHp] = useState("");

  const navigate = useNavigate()
  
  useEffect(() => {
    getIdFromLocal()
  }, [])
  
  useEffect(() => {
    getUserById()
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`https://pikbe.herokuapp.com/users/${id}`)
      setNamaLengkap(response.data.namalengkap)
      setAlamatUser(response.data.alamat)
      setEmailUser(response.data.email)
      setNomorHp(response.data.nomorhp)
  }
  
  const updateUser = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`https://pikbe.herokuapp.com/users/${id}`, {
        namalengkap: namaLengkap,
        alamat: alamatUser,
        email: emailUser,
        nomorhp: nomorHp
      })
      window.localStorage.removeItem('Nama User');
      window.localStorage.setItem('Nama User', emailUser);
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const getIdFromLocal = () => {
    const idUser = localStorage.getItem('id');
    setId(idUser)
  }

  const setBatal = () => {
    navigate("/")
  }


  return (
    <div className='forms group'>
    <form className='user-settings' onSubmit={updateUser}>
      <h1>Update Data</h1>
      <div className='form-settings'>
        <p>New Name :</p>
        <input type="text" value={namaLengkap} onChange={event => setNamaLengkap(event.target.value)} />
      </div>

      <div className='form-settings'>
        <p>New Email :</p>
        <input type="text" value={emailUser} onChange={event => setEmailUser(event.target.value)} />
      </div>

      <div className='form-settings'>
        <p>New Alamat :</p>
        <input type="text" value={alamatUser} onChange={event => setAlamatUser(event.target.value)} />
      </div>

      <div className='form-settings'>
        <p>New Phone Number :</p>
        <input type="text" value={nomorHp} onChange={event => setNomorHp(event.target.value)} />
      </div>

      <button type='submit'>Update</button>
    </form>
      <button onClick={() => setBatal()}>Batal</button>
    </div>

  )
}
