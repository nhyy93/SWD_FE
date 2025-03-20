import { useState } from "react";
import styles from "./Staff.module.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "customer", text: "Hi, I need help with my order." },
    { sender: "staff", text: "Sure! Could you provide your order ID?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "staff", text: input }]);
      setInput("");
    }
  };

  return (
    <div className={styles.staffContainer}>
      <h2 className={styles.pageTitle}>💬 Customer Chat</h2>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "staff" ? styles.staffMessage : styles.customerMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
