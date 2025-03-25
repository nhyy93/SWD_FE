import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaHome, FaUserCircle, FaUsers, FaBell, FaShoppingCart, FaMapMarkedAlt, FaBox, FaHistory, FaComments } from "react-icons/fa";
import styles from "./Profile.module.css";

export default function MyCartPage() {
    const [cart, setCart] = useState([
        { id: 1, name: "Water Bottle Holder", price: 15.99, quantity: 1, image: "https://i.ibb.co/6J8gtdx/bottle-holder.png" },
        { id: 2, name: "Bike Helmet", price: 45.99, quantity: 1, image: "https://i.ibb.co/jWkTb7W/helmet.png" },
        { id: 3, name: "Bike Lock", price: 29.99, quantity: 1, image: "https://i.ibb.co/0QzzZKx/lock.png" },
    ]);

    const shippingFee = 20;

    const increaseQty = (id: number) => {
        setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQty = (id: number) => {
        setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const removeItem = (id: number) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);
    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subTotal + shippingFee;

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>CycWorld</h2>
                <ul>
                    <li><FaHome /><Link to="/">Home</Link></li>
                    <li><FaUserCircle /><Link to="/profile">Profile</Link></li>
                    <li><FaUsers /><Link to="/group-ride">My Group</Link></li>
                    <li><FaBell /><Link to="/notifications">Notifications</Link></li>
                    <li className={styles.active}><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
                    <li><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
                    <li><FaBox /><Link to="/orders">Orders Status</Link></li>
                    <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
                    <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
                </ul>
            </aside>

            {/* Cart Content */}
            <div className={styles.mainContent}>
                <h2>Shopping Cart</h2>
                <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                        <tr>
                            <th>IMAGE</th><th>PRODUCT</th><th>PRICE</th><th>QTY</th><th>TOTAL</th><th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
                                <td><img src={item.image} alt={item.name} style={{ width: "80px" }} /></td>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => decreaseQty(item.id)}>-</button> {item.quantity} <button onClick={() => increaseQty(item.id)}>+</button>
                                </td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                <td><FaTrash color="red" style={{ cursor: "pointer" }} onClick={() => removeItem(item.id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ marginTop: "20px" }}>
                    <button onClick={clearCart} style={{ backgroundColor: "red", color: "#fff", padding: "10px 20px" }}>CLEAR CART</button>
                </div>

                <div style={{ marginTop: "30px", background: "#e0e0e0", color: "#fff", padding: "20px", width: "300px", borderRadius: "10px" }}>
                    <p>Sub Total: <span style={{ float: "right" }}>${subTotal.toFixed(2)}</span></p>
                    <p>Shipping: <span style={{ float: "right" }}>${shippingFee}</span></p>
                    <hr style={{ borderColor: "#fff" }} />
                    <p style={{ fontWeight: "bold" }}>Total: <span style={{ float: "right", color: "#ffcc00" }}>${total.toFixed(2)}</span></p>
                    <button style={{ backgroundColor: "#ff4d4d", color: "#fff", width: "100%", padding: "10px", marginTop: "10px" }}>CHECKOUT</button>
                </div>
            </div>
        </div>
    );
}
