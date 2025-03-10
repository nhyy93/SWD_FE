import { Layout } from "antd";
import "./Footer.module.css";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <div className="footer-content">
        <p>© 2025 CycWorld. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
