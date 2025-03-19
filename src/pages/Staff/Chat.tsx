import styles from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      <h2>💬 Chat với khách hàng</h2>
      <p>Đây là giao diện chat dành cho nhân viên hỗ trợ khách hàng.</p>
    </div>
  );
};

export default Chat;
