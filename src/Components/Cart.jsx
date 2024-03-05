import React, { useContext } from "react";
import newContext from "../Context/shopcontext";
import { Card } from "react-bootstrap";
import { Navbar } from "react-bootstrap";



function Cart() {
	
		const { addToCart, setAddToCart } = useContext(newContext);
	  
		
	  
		// Calculate the total amount
		const totalAmount = addToCart.reduce(
		  (total, item) => total + (item.price),
		  0
		  //the zero is the starting value, thats is at the begging the total === 0 and it gets increased
		);
	  
		function removeItem(index) {
		  const removeConfirm = window.confirm(
			"Are you sure you want to remove this item ?"
		  );
	  
		  if (removeConfirm) {
			const removedItem = addToCart.filter((item) => {
			  return item.id !== index;
			});
	  
			setAddToCart(removedItem);
		  }
		}
	  
		return (
		  <div className="cartContainer">
			<Navbar />
	  
			<p className="cartCount"> {addToCart.length}</p>
	  
			{addToCart && addToCart.length > 0 ? (
			  <div className="Products ms-5 mb-5">
				{addToCart.map((item) => (
				  <div className=" text-center mt-3 Parent" key={item.id}>
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
	  
						<span
						  className="bi bi-x-circle-fill text-danger close-btn-icon"
						  onClick={() =>removeItem (item.id)}
						></span>
					  </Card.Body>
					</Card>
				  </div>
				))}
			  </div>
			) : (
			  <div className="text-center">
				<h1 className="d-block  mt-3 ">Your J-Cart is empty</h1>
				<img
				  src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png"
				  alt="cart is empty"
				  width={400}
				  
				/>
			  </div>
			)}
			<div className="bottom text-center mb-4">
			  <p className="fs-4">
				Subtotal ({addToCart.length}) : ₹ {totalAmount.toFixed(2)}
			  </p>
			  <button className="btn btn-warning fs-5">Proceed To Buy</button>
			</div>
		  </div>
		);
	  }
	
	  
	  export default Cart;