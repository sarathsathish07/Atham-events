import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';
import bgimage1 from "../assets/images/pic4.webp";
import Footer from '../components/Footer';
import { useFetchCategoryQuery, useFetchItemsByCategoryQuery,useSubmitSelectionMutation } from '../slices/usersApiSlice';

const EventSelectionScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [scrolled, setScrolled] = useState(false);
  const [showFirstImage, setShowFirstImage] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const [submitSelection] = useSubmitSelectionMutation();
  const { data: categories = [], isLoading: categoriesLoading } = useFetchCategoryQuery();
  const { data: items = [], isLoading: itemsLoading } = useFetchItemsByCategoryQuery(selectedCategory?._id, { skip: !selectedCategory });

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]); 
    }
  }, [categories, selectedCategory]);


  const handleCheckboxChange = (category, item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [category]: {
        ...prevItems[category],
        [item]: !prevItems[category]?.[item],
      },
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCategoryChange = (category) => setSelectedCategory(category);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selections = Object.entries(selectedItems).map(([category, items]) => ({
      category,
      items: Object.keys(items).filter((item) => items[item])
    }));

    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      selections,
    };

    try {
      const response = await submitSelection(data).unwrap();
      console.log('Selection saved:', response);
    } catch (error) {
      console.error('Error saving selection:', error);
    }
  };


  return (
    <div className="">
      <div className="app-banner1">
        <div className={`image3 ${showFirstImage ? 'show' : ''}`} style={{ backgroundImage: `url(${bgimage1})` }}></div>
        <div className={`navbarmain ${scrolled ? 'navbarmain-scrolled' : ''}`} style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <Header />
        </div>
      </div>

      <Row className="mx-5 my-5">
        <Col md={2} sm={12}>
          <h3>Categories</h3>
          <div className="category-cards">
            {categoriesLoading ? (
              <p>Loading...</p>
            ) : (
              categories.map((category) => (
                <Card
                  key={category._id}
                  onClick={() => handleCategoryChange(category)}
                  className={`category-card ${selectedCategory?._id === category._id ? 'selected' : ''}`}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                >
                  <Card.Body
                    className="text-center"
                    style={{
                      backgroundColor: selectedCategory?._id === category._id ? '#BA8A28' : '#f8f9fa',
                      color: selectedCategory?._id === category._id ? 'white' : 'black',
                    }}
                  >
                    <Card.Title>{category.name}</Card.Title>
                  </Card.Body>

                  {isMobileView && selectedCategory?._id === category._id && (
                    <div className="px-3 py-2">
                      <h5>{selectedCategory.name} Items</h5>
                      {itemsLoading ? (
                        <p>Loading items...</p>
                      ) : (
                        <Form>
                          {items.map((item) => (
                            <Form.Check
                              key={item._id}
                              type="checkbox"
                              label={item.itemName}
                              checked={selectedItems[selectedCategory.name]?.[item.itemName] || false}
                              onChange={() => handleCheckboxChange(selectedCategory.name, item.itemName)}
                            />
                          ))}
                        </Form>
                      )}
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </Col>

        {!isMobileView && selectedCategory && (
          <Col md={7} className="px-4">
            <h4>{selectedCategory.name} Items</h4>
            {itemsLoading ? (
              <p>Loading items...</p>
            ) : (
              <Form>
                {items.map((item) => (
                  <Form.Check
                    key={item._id}
                    type="checkbox"
                    label={item.itemName}
                    checked={selectedItems[selectedCategory.name]?.[item.itemName] || false}
                    onChange={() => handleCheckboxChange(selectedCategory.name, item.itemName)}
                  />
                ))}
              </Form>
            )}
          </Col>
        )}

        <Col md={3}>
          <h4>Enter Your Details</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" style={{ width: '100%' }}>
              Submit Selection
            </Button>
          </Form>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default EventSelectionScreen;
