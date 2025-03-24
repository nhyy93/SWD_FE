import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { ShoppingCart, Search } from "lucide-react";

interface Shop {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  shop: Shop;
}

const BuyProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<number | "">("");
  const [selectedCategory, setSelectedCategory] = useState<string | "">("");
  const [selectedBrand, setSelectedBrand] = useState<string | "">("");

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, []);

  const handleSearch = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const result = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerSearchTerm) ||
        product.brand.toLowerCase().includes(lowerSearchTerm) ||
        product.category.toLowerCase().includes(lowerSearchTerm)
    );
    setFilteredProducts(result);
  };

  const handleFilter = () => {
    let result = [...products];
    if (selectedShop !== "") {
      result = result.filter((p) => p.shop.id === selectedShop);
    }
    if (selectedCategory !== "") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedBrand !== "") {
      result = result.filter((p) => p.brand === selectedBrand);
    }
    setFilteredProducts(result);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const uniqueShops = Array.from(
    new Set(products.map((p) => p.shop.id))
  ).map((id) => products.find((p) => p.shop.id === id)?.shop);

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={4}>
          <FormControl
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button onClick={handleSearch}>
            <Search size={16} /> Search
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Select
            value={selectedShop}
            onChange={(e) => setSelectedShop(Number(e.target.value) || "")}
          >
            <option value="">All Shops</option>
            {uniqueShops.map(
              (shop) =>
                shop && (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                )
            )}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {uniqueBrands.map((brand, index) => (
              <option key={index}>{brand}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md="auto">
          <Button onClick={handleFilter}>Apply Filters</Button>
        </Col>
      </Row>

      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  <strong>Brand:</strong> {product.brand} <br />
                  <strong>Category:</strong> {product.category} <br />
                  <strong>Price:</strong> ${product.price} <br />
                  <strong>Rating:</strong> {product.rating} ⭐ (
                  {product.reviewCount} reviews)
                </Card.Text>
                <Button variant="success" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart size={16} className="me-2" />
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyProductPage;
