import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import '../styles/ProductList.css';
import BuyingUser from './BuyingUser';
import ImageUploading from 'react-images-uploading';
import { useEffect } from 'react';


export default function ShopUserListItem({ listDataProducts, tipeProdukFilter, searchProduk }) {
    const [id, setId] = useState("");
    const [namaProduk, setNamaProduk] = useState("");
    const [hargaProduk, setHargaProduk] = useState("");
    const [deskripsiProduk, setDeskripsiProduk] = useState("");
    const [tipeProduk, setTipeProduk] = useState("");
    const [imageProduk, setImageProduk] = useState()
    const [buyingOpen, setBuyingOpen] = useState(false);
    const navigate = useNavigate()

    const [token, setToken] = useState("");
    const [expiredToken, setExpiredToken] = useState("");

    const refreshToken = async() => {
      try {
          const response = await axios.get('https://pikbe.herokuapp.com/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setExpiredToken(decoded.exp);
      } catch (error) {
          if(error.response) {
            console.log(error.response.data)
          }
      }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async(config) => {

    const currentDate = new Date();

    if(expiredToken * 1000 < currentDate.getTime()) {
      const response = await axios.get('https://pikbe.herokuapp.com/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpiredToken(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  })
  
  const ChekLocalStorage = () => {
    const id = localStorage.getItem('id');
    if(id === "") {
      navigate('/userlogin')
    } else {
      refreshToken()
    }
  }

    const getDetailById = async(id) => {
      const response = await axiosJWT.get(`https://pikbe.herokuapp.com/product/${id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setId(response.data._id);
      setNamaProduk(response.data.namaproduk);
      setHargaProduk(response.data.hargaproduk);
      setTipeProduk(response.data.tipeproduk);
      setDeskripsiProduk(response.data.deskripsiproduk);
      setImageProduk(response.data.img)
    }

    const ModalDetail = () => {
      if(id !== "" ) {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(imageProduk.data.data))
        )
        return (
          <div className="modal-container">
            <img className='img-modal' src={`data:image/png;base64,${base64String}`} alt='test' />
            <h2>{namaProduk}</h2>
            <p>{tipeProduk}</p>
            <p>{deskripsiProduk}</p>
            <h3>Rp. {hargaProduk}</h3>
            <div className='btn-modal-container'>
              <button className='btn-x open'onClick={() => setBuyingOpen(true)}>Buy</button>
              <button className='btn-x close' onClick={() => setId("")}>Close</button>
            </div>
          </div>
        )
      }
    }

    const ProductsList = () => {
      if(id === "") {
        return (
          <div className='list-products-all group'>
          {listDataProducts.map((item, i) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(item.img.data.data))
            )
            return (
              <div className='product' onSubmit={refreshToken} key={i}>
                <img src={`data:image/png;base64,${base64String}`} alt='test' />
                <p className='nama-product'>{item.namaproduk}</p>
                <p className='harga-product'>Rp. {item.hargaproduk}</p>
                {token === "" ? <button onClick={() => ChekLocalStorage()}>Detail</button> : <button onClick={() => getDetailById(item._id)}>Detail</button>}
              </div>
            )
          })}
          </div>
        )
      }
    }

    const ListFiltered = () => {
      if(id === "") {
        return (
          <div className='list-products'>
            {listDataProducts
              .filter(name => name.namaproduk.toLowerCase().includes(searchProduk.toLowerCase()))
              .map((item, i) => {
                const base64String = btoa(
                  String.fromCharCode(...new Uint8Array(item.img.data.data))
                )
              return (
                <div className='product' onSubmit={refreshToken} key={i}>
                  <img src={`data:image/png;base64,${base64String}`} alt='test' />
                  <p  className='nama-product'>{item.namaproduk}</p>
                  <p className='harga-product'>Rp. {item.hargaproduk}</p>
                  {token === "" ? <button onClick={() => ChekLocalStorage()}>Detail</button> : <button onClick={() => getDetailById(item._id)}>Detail</button>}
                </div>
              )
            })}
          </div>
        )
      }
    }

    const ListFilterBtn = () => {
      if(id === "" || tipeProdukFilter === "") {
        return (
          <div className='list-products'>
            {listDataProducts
              .filter(name => name.tipeproduk.toLowerCase() === tipeProdukFilter.toLowerCase())
              .map((item, i) => {
                const base64String = btoa(
                  String.fromCharCode(...new Uint8Array(item.img.data.data))
                )
              return (
                <div className='product' onSubmit={refreshToken} key={i}>
                  <img src={`data:image/png;base64,${base64String}`} alt='test' />
                  <p  className='nama-product'>{item.namaproduk}</p>
                  <p className='harga-product'>Rp. {item.hargaproduk}</p>
                  {token === "" ? <button onClick={() => ChekLocalStorage()}>Detail</button> : <button onClick={() => getDetailById(item._id)}>Detail</button>}
                </div>
              )
            })}
          </div>
        )
      }
    }

    const Handler = () => {
      if(id !== "") { 
        return <ModalDetail />
      }

      if(searchProduk.length === 0 && tipeProdukFilter === "" ) {
        return <ProductsList />
      }

      if( searchProduk.length > 0 ) {
        return <ListFiltered />
      } 
      
      if( searchProduk.length <= 0) {
        return <ListFilterBtn />
      }

    }

  return (
    <>
    {buyingOpen === true ? 
    <BuyingUser 
      namaProduk={namaProduk}
      tipeProduk={tipeProduk}
      hargaProduk={hargaProduk}
      deskripsiProduk={deskripsiProduk}
    /> : <Handler />}
    </>
  )
}


