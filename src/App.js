import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';   // icons
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './Components/Home';


import { useState } from 'react';
import newContext from './Context/shopcontext';
import Products from './Components/Products';
import Cart from './Components/Cart';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Admin from './Components/Admin';



function App() {


  const [addToCart, setAddToCart] = useState([]);
  const [products,setProducts] = useState(Products)

  const [updatedProducts, setUpdatedProducts] = useState(products)

  const values = {
    products,
    setProducts,

    updatedProducts, 
    setUpdatedProducts,
    
    addToCart,
    setAddToCart
  }


  


  return (
    <div>
   

     
        

      <Router>

      <newContext.Provider value={values}>
    

        <Routes>

          <Route path='/' element={<SignUp />}/>
      
          <Route path='/LogIn' element={<LogIn />}/>
          <Route path='/Home' element={<Home />}/>
          <Route path='/Cart' element={<Cart />}/>
          <Route path='/Admin' element={<Admin />}/>
        

         

        </Routes>

        </newContext.Provider>
      </Router>



     




      
   

   
      
        
       
    </div>
  );
}

export default App;