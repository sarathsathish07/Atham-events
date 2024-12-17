import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedItems,resetSelectedItems } from '../slices/selectedItemsSlice'; 
import Header from "../components/Header";
import bgimage1 from "../assets/images/pic4.webp";
import Footer from "../components/Footer";
import {
  useFetchCategoryQuery,
  useFetchItemsByCategoryQuery,
  useSubmitSelectionMutation,
  useFetchAllCategoriesWithItemsQuery
} from "../slices/usersApiSlice";

const EventSelectionScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [scrolled, setScrolled] = useState(false);
  const [showFirstImage, setShowFirstImage] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const dispatch = useDispatch();
  const selectedItems = useSelector((state) => state.selectedItems); 
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

  const [submitSelection] = useSubmitSelectionMutation();
  const { data: categories = [], isLoading: categoriesLoading } =
    useFetchCategoryQuery();
  const { data: items = [], isLoading: itemsLoading } =
    useFetchItemsByCategoryQuery(selectedCategory?._id, {
      skip: !selectedCategory,
    });
    const { data: allCategoriesWithItems = [], isLoading: allCategoriesLoading } =
    useFetchAllCategoriesWithItemsQuery();
  

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const handleCheckboxChange = (category, item) => {
    const itemSelected = !selectedItems[category]?.[item]?.selected;
    const itemQuantity = selectedItems[category]?.[item]?.quantity || 1;

    // Dispatch action to update Redux store
    dispatch(setSelectedItems({ category, item, selected: itemSelected, quantity: itemQuantity }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (category, item, quantity) => {
    if (quantity <= 0) return; // Prevent negative quantity

    // Dispatch action to update quantity in Redux
    dispatch(setSelectedItems({ category, item, selected: true, quantity }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selections = Object.entries(selectedItems).map(
      ([category, items]) => ({
        category,
        items: Object.entries(items)
          .filter(([_, details]) => details.selected)
          .map(([itemName, details]) => ({ itemName, quantity: details.quantity })),
      })
    );

    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      selections,
    };

    try {
      const response = await submitSelection(data).unwrap();
      toast.success("Selection submitted successfully!");
      setFormData({ name: "", phone: "", email: "" });
      dispatch(resetSelectedItems()); 
    } catch (error) {
      toast.error("Failed to submit selection. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="app-banner1">
        <div
          className={`image3 ${showFirstImage ? "show" : ""}`}
          style={{ backgroundImage: `url(${bgimage1})` }}
        ></div>
        <div
          className={`navbarmain ${scrolled ? "navbarmain-scrolled" : ""}`}
          style={{ position: "sticky", top: 0, zIndex: 1000 }}
        >
          <Header />
        </div>
      </div>

      <Row className="mx-5 my-5">
      {isMobileView && (
  <>
    <div className="px-3 py-2">
      {categoriesLoading ? (
        <p>Loading categories...</p>
      ) : (
        <>
          {categories.map((category) => {
            // Directly access items from the response
            const categoryData = allCategoriesWithItems.find(
              (cat) => cat.categoryId === category._id
            );

            return categoryData ? (
              <div key={category._id} className="mb-4">
                {/* Category Name */}
                <h4 className="category-name">{category.name}</h4>
                <hr />

                {/* Items List */}
                {allCategoriesLoading ? (
                  <p>Loading items...</p>
                ) : (
                  <Form>
                    <div className="header-row">
                      <div style={{ width: "40%" }}>Item</div>
                      <div style={{ width: "20%" }}>Amount</div>
                      <div style={{ width: "20%" }}>Qty</div>
                    </div>

                    {/* Render Items */}
                    {categoryData.items.map((item) => (
                      <div key={item.itemId} className="d-flex align-items-center mb-2">
                        {/* Checkbox for item selection */}
                        <Form.Check
                          type="checkbox"
                          label={item.itemName}
                          onChange={() =>
                            handleCheckboxChange(category.name, item.itemName)
                          }
                          checked={
                            selectedItems[category.name]?.[item.itemName]?.selected || false
                          }
                          className="me-3"
                          style={{ width: "40%" }}
                        />

                        {/* Amount */}
                        <div style={{ width: "20%" }}>₹{item.amount}</div>

                        {/* Quantity Input */}
                        <Form.Control
                          type="number"
                          min="1"
                          value={
                            selectedItems[category.name]?.[item.itemName]?.quantity || 1
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              category.name,
                              item.itemName,
                              parseInt(e.target.value)
                            )
                          }
                          style={{ width: "20%" }}
                        />
                      </div>
                    ))}
                  </Form>
                )}
              </div>
            ) : null;
          })}
        </>
      )}
    </div>
  </>
)}





  

        {!isMobileView && selectedCategory && (
          <>
           <Col md={2} sm={12}>
           <h3>Categories</h3>
           <div className="category-cards">
             {categoriesLoading ? (
               <p>Loading...</p>
             ) : (
               categories.map((category) => (
                 <Card
                   key={category._id}
                   onClick={() => setSelectedCategory(category)}
                   className={`category-card ${
                     selectedCategory?._id === category._id ? "selected" : ""
                   }`}
                 >
                   <Card.Body className="text-center">
                     <Card.Title>{category.name}</Card.Title>
                   </Card.Body>
                   </Card>
               )))}
               </div>
               </Col>
          <Col md={7} className="px-4">
            {itemsLoading ? (
              <p>Loading items...</p>
            ) : (
              <Form>
                <div className="header-row">
                  <div style={{ width: "40%" }}>Item</div>
                  <div style={{ width: "20%" }}>Amount</div>
                  <div style={{ width: "20%" }}>Qty</div>
                </div>

                {items.map((item) => (
                  <div key={item._id} className="d-flex align-items-center mb-2">
                    <Form.Check
                      type="checkbox"
                      label={item.itemName}
                      onChange={() => handleCheckboxChange(selectedCategory.name, item.itemName)}
                      checked={selectedItems[selectedCategory.name]?.[item.itemName]?.selected || false}
                      className="me-3"
                      style={{ width: "40%" }}
                    />
                    <div style={{ width: "20%" }}>₹{item.amount}</div>
                    <Form.Control
                      type="number"
                      min="1"
                      value={selectedItems[selectedCategory.name]?.[item.itemName]?.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(selectedCategory.name, item.itemName, parseInt(e.target.value))
                      }
                      style={{ width: "20%" }}
                    />
                  </div>
                ))}
              </Form>
            )}
          </Col>
          </>
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

            <Button variant="primary" type="submit" className="mt-3" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default EventSelectionScreen;
