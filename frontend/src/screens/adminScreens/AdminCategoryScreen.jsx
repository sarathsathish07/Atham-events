import React, { useState } from "react";
import { Form, Button, ListGroup, Row, Col, Card } from "react-bootstrap";
import { useFetchCategoriesQuery, useAddCategoryMutation, useAddItemMutation } from "../../slices/adminApiSlice.js";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import AdminHeader from "../../components/adminComponents/AdminHeader";

function AdminCategoryScreen() {
    const [categoryName, setCategoryName] = useState("");
    const [itemName, setItemName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [amount, setAmount] = useState(""); 

    const { data: categories = [], isLoading } = useFetchCategoriesQuery();
    const [addCategory, { isLoading: isAddingCategory }] = useAddCategoryMutation();
    const [addItem, { isLoading: isAddingItem }] = useAddItemMutation();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            toast.error("Category name is required.");
            return;
        }
        try {
            await addCategory({ name: categoryName }).unwrap();
            toast.success("Category added successfully");
            setCategoryName("");
        } catch (error) {
            toast.error("Failed to add category");
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!itemName.trim() || !selectedCategory) {
            toast.error("All fields are required.");
            return;
        }
        if (!amount.trim()) {
            toast.error("Amount is required.");
            return;
        }
        try {
            await addItem({
                name: itemName,
                categoryId: selectedCategory,
                amount,
            }).unwrap();
            toast.success("Item added successfully");
            setItemName("");
            setSelectedCategory("");
            setAmount(""); 
        } catch (error) {
            toast.error("Failed to add item");
        }
    };
    

    return (
        <>
            <AdminHeader />
            <Row>
                <Col md={2}>
                    <AdminSidebar />
                </Col>
                <Col md={9}>
                    <Row className="p-5">
                        {/* Add Category Card */}
                        <Col md={6}>
                            <Card className="p-3 shadow-sm" style={{ backgroundColor: "#f9f9f9" }}>
                                <Card.Body>
                                    <Card.Title className="mb-4">Add Category</Card.Title>
                                    <Form onSubmit={handleAddCategory}>
                                        <Form.Group controlId="categoryName">
                                            <Form.Label>Category Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter category name"
                                                value={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="mt-3"
                                            disabled={isAddingCategory}
                                        >
                                            {isAddingCategory ? "Adding..." : "Add Category"}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Add Item Card */}
                        <Col md={6}>
                            <Card className="p-3 shadow-sm" style={{ backgroundColor: "#f9f9f9" }}>
                                <Card.Body>
                                    <Card.Title className="mb-4">Add Item</Card.Title>
                                    <Form onSubmit={handleAddItem}>
                                        <Form.Group controlId="itemName">
                                            <Form.Label>Item Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter item name"
                                                value={itemName}
                                                onChange={(e) => setItemName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="categorySelect" className="mt-3">
                                            <Form.Label>Select Category</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="amount" className="mt-3">
    <Form.Label>Amount</Form.Label>
    <Form.Control
        type="text" 
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
    />
</Form.Group>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="mt-3"
                                            disabled={isAddingItem}
                                        >
                                            {isAddingItem ? "Adding..." : "Add Item"}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Available Categories */}
                    <Row className="mt-4">
                        <Col>
                            <Card className="p-3 shadow-sm">
                                <Card.Body>
                                    <Card.Title>Available Categories</Card.Title>
                                    {isLoading ? (
                                        <p>Loading categories...</p>
                                    ) : (
                                        <ListGroup>
                                            {categories.map((category) => (
                                                <ListGroup.Item key={category._id}>{category.name}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default AdminCategoryScreen;
