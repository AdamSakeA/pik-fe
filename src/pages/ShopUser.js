import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../styles/ProductList.css'
import ShopUserListItem from './ShopUserItem';
import '../styles/ProductList.css'

function ShopUser() {
    const [listDataProducts, setListDataProducts] = useState([]);
    const [searchProduk, setSearchProduk] = useState("");
    const [tipeProdukFilter, setTipeProdukFilter] = useState("")

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async() => {
        try {
            const response = await axios.get("https://pikbe.herokuapp.com/product/");
            setListDataProducts(response.data)
        } catch (error) {
            if(error.response) {
                console.log(error.response.data)
            }
        }
    }

    return (
        <div className='shop-container group'>
            <h1>PRODUCT</h1>
            <div className='shop-filter-search'>
                <input className="search" type="text" placeholder='Search Product Name..' value={searchProduk} onChange={e => setSearchProduk(e.target.value)}/>
            </div>
            <div className='shop-filter-button'>
                <button className={tipeProdukFilter === "" ? "filter-tipe-button active" : "filter-tipe-button"} onClick={() => setTipeProdukFilter("")}>All</button>
                <button className={tipeProdukFilter === "coffee" ? "filter-tipe-button active" : "filter-tipe-button"} onClick={() => setTipeProdukFilter("coffee")}>Coffee</button>
                <button className={tipeProdukFilter === "noncoffee" ? "filter-tipe-button active" : "filter-tipe-button"} onClick={() => setTipeProdukFilter("noncoffee")}>Non-Coffee</button>
            </div>

            <ShopUserListItem 
                listDataProducts={listDataProducts}
                tipeProdukFilter={tipeProdukFilter}
                searchProduk={searchProduk}
            />
        </div>
    )
}

export default ShopUser