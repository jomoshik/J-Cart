import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import newContext from "../Context/shopcontext"; 
import { Card } from "react-bootstrap";
import './Cart.css';

function Admin() {
  const storedUserData = JSON.parse(localStorage.getItem("userData")) || []; //registered users

  const { products, setProducts } = useContext(newContext);
  const { updatedProducts,setUpdatedProducts } = useContext(newContext);


  const [showUsers, setShowUser] = useState([]);

  const [editedPrice, setEditedPrice] = useState("");
  const [editedRating, setEditedRating] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  function listUsers() {
    setShowUser(storedUserData);
  }

  function removeUser(index) {
    let remove = window.confirm("Do you want to remove this user?");

    if (remove) {
      const usersToRemove = showUsers.filter((user, userIndex) => {
        return userIndex !== index;
      });
      setShowUser(usersToRemove);
      localStorage.setItem("userData", JSON.stringify(usersToRemove));
    }
  }

  function handleSave(index) {
    const updatedOnes = [...products];
    updatedOnes[index] = {
      ...updatedOnes[index],
      price: editedPrice,
      rating: editedRating,
    };

    setProducts(updatedOnes);
    
    setEditIndex(null);

setUpdatedProducts(updatedOnes)
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditedPrice(products[index].price);
    setEditedRating(products[index].rating);
  }

  function handleRemove(index){
    const removeItem = products.filter((items)=>(
      items.id !== index
    ))
    setProducts(removeItem)

    setUpdatedProducts([...removeItem,updatedProducts])
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mx-5 my-3">
        <h1>Welcome Back Jomon</h1>
        <Link to="/Home" className="fs-4">
          Home
        </Link>
      </div>

     

     
       
      

      <div className="cards">
        {products.map((item, index) => (
          <div key={index} className="Productcard">
            {editIndex === index ? (
              <div className=" p-5 editproduct">
                <label>
                  Price :
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                </label>

                <label>
                  Ratig :
                  <input
                    type="text"
                    placeholder="New Rating"
                    value={editedRating}
                    onChange={(e) => setEditedRating(e.target.value)}
                  />
                </label>

                <div className="d-flex justify-content-around my-3">
                  <button
                    onClick={() => handleSave(index)}
                    className="btn btn-danger"
                  >
                  
                    Save
                  </button>
                  <button
                    onClick={() => handleSave(null)}
                    className="btn btn-primary"
                  >
                  
                    cancel
                  </button>
                </div>
              </div>
            ) : (
              <Card
                className="card shadow p-3  bg-body rounded"
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  style={{ height: "15rem", width: "15rem" }}
                  src={item.productImage}
                />
                <Card.Body>
                  <Card.Title>{item.productName}</Card.Title>
                  <Card.Title>Rs {item.price}</Card.Title>

                  <Card.Text></Card.Text>
                  

                  <div className="extraOption">
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn btn-success me-3"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-danger me-3"
                    >
                      Remove
                    </button>
                    </div>
                    </Card.Body>
                    </Card>    

               
                 
               
             
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


export default Admin;