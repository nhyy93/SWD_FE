import { Layout } from "antd";
import styles from "./Footer.module.css";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© 2025 CycWorld. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
