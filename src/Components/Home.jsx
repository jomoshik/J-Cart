import React, { useContext, useState } from "react";
import Navbar from "./navbar";
import Products from './Products';
import { Card,Button  } from 'react-bootstrap'
import newContext from "../Context/shopcontext";
import './Cart.css';


function Home() {
  
const {addToCart,setAddToCart} = useContext(newContext)
const {updatedProducts, setUpdatedProducts} = useContext(newContext)



  const [search , setSearch] = useState("");


  // categorizing and searching

  const  filtering = (category) =>{
    const filteredProducts = Products.filter((item)=>{
     return  item.category.toLowerCase() === category.toLowerCase();
    })

    setUpdatedProducts(filteredProducts)
  }


  function searchedProduct(e){
    e.preventDefault();
    
    try{
      if(search){
        const result = Products.filter((item)=>{
          return item.productName.toLowerCase().includes(search.toLowerCase())
        })
    
        setUpdatedProducts(result)
        setSearch("")
      }

      else{
        alert("No Product Found")
        setSearch("")
      }
    }

    catch(error){
      console.log("error occurred" + error)
    }
  
  }


  // Add to cart

  function toCart(index){
    const cartProduct = updatedProducts.find((item)=>{
      return  item.id === index
    })

   
    if(cartProduct){
      
      const productIsPresent = addToCart.some((curentProduct)=>(
        curentProduct.id === index
    
      ))

      if(productIsPresent){
        alert("Product is already there")
        
      }
      else {
        setAddToCart((prev) => [...prev, cartProduct]);
      }
      
    }
    

   

  }


  return (
    <div className="homeContainer">
      <Navbar />

      <div className="intro"> 
      <p>J-Cart</p>
    </div>

      <p className="cartCount"> {addToCart.length}</p>


<div className="secondNav">
  
        <div className="btnGroup">
          <button onClick={()=>setUpdatedProducts(Products)} className="btn btn-dark">All</button>
  
          <button onClick={()=>filtering("Mobile")} className="btn btn-dark">Mobile</button>
  
          <button onClick={()=>filtering("laptop")} className="btn btn-dark">laptop</button>
  
          <button onClick={()=>filtering("Headphone")} className="btn btn-dark">Headphone</button>
  
          <button onClick={()=>filtering("Speaker")} className="btn btn-dark">Speaker</button>
        </div>
  
  
        <form className="SearchBar text-center" autoComplete="off" onSubmit={(e)=>searchedProduct(e)}>
      <input type="text"
      placeholder="Search Products" 
      value={search}
      onChange={(e)=>setSearch(e.target.value)}/>

      <button type="submit" className="btn btn-success">Search</button>
        </form>


</div>

<div className='Products ms-5 mb-5' >
      {
          updatedProducts.map((item,index)=>(
          <div className=' text-center mt-3 Parent' key={item.id}>

          <Card className='card shadow p-3  bg-body rounded' style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{height: '15rem', width : '15rem' }} src= {item.productImage} />
      <Card.Body>
        <Card.Title >{item.productName}</Card.Title>
       
        <Card.Title>Rs {item.price}</Card.Title>
       
     
        <Button variant="outline-secondary"
                onClick={() => toCart(item.id)}
                className="btn btn-outline-dark"
              >
              Add to Cart
 </Button>
      </Card.Body>
    </Card>


     
            </div>
          
        ))}
      </div>
    </div>
  );
}

export default Home;
