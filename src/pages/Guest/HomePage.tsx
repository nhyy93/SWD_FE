import { Button, Card, Row, Col } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section style={{ background: "#000", color: "#fff", textAlign: "center", padding: "50px" }}>
        <h1>Bikes</h1>
        <p>Like riding a bike, but better</p>
        <Button type="primary" size="large">See the bikes</Button>
      </section>

      {/* Choose Your Ride */}
      <section style={{ maxWidth: "1200px", margin: "auto", padding: "50px 0" }}>
        <h2 style={{ textAlign: "center" }}>Choose your ride</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col span={6}>
            <Card hoverable>Mountain Bikes</Card>
          </Col>
          <Col span={6}>
            <Card hoverable>Touring Bikes</Card>
          </Col>
          <Col span={6}>
            <Card hoverable>City Bikes</Card>
          </Col>
        </Row>
      </section>

      {/* Selling Fast */}
      <section style={{ maxWidth: "1200px", margin: "auto", padding: "50px 0" }}>
        <h2 style={{ textAlign: "center" }}>Selling Fast</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col span={6}>
            <Card hoverable>Bike 1</Card>
          </Col>
          <Col span={6}>
            <Card hoverable>Bike 2</Card>
          </Col>
        </Row>
      </section>

      {/* Technology Section */}
      <section style={{ textAlign: "center", padding: "50px", background: "#f9f9f9" }}>
        <h2>Light Assist E-Bikes Explained</h2>
        <Button type="default" size="large">Discover More</Button>
      </section>

      {/* Blog Section */}
      <section style={{ maxWidth: "1200px", margin: "auto", padding: "50px 0" }}>
        <h2 style={{ textAlign: "center" }}>Related Stories</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col span={6}>
            <Card hoverable>E-Bike Buyer's Guide</Card>
          </Col>
          <Col span={6}>
            <Card hoverable>Winter Cycling Tips</Card>
          </Col>
        </Row>
      </section>

      {/* Bestsellers */}
      <section style={{ maxWidth: "1200px", margin: "auto", padding: "50px 0" }}>
        <h2 style={{ textAlign: "center" }}>Bestsellers</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col span={6}>
            <Card hoverable>Bike A</Card>
          </Col>
          <Col span={6}>
            <Card hoverable>Bike B</Card>
          </Col>
        </Row>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
