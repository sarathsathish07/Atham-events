import React, { useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useFetchSelectionsQuery, useFetchSelectionByIdQuery } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import AdminHeader from "../../components/adminComponents/AdminHeader";
import jsPDF from "jspdf";

function AdminCustomerListScreen() {
    const { data: selections = [], isLoading } = useFetchSelectionsQuery();
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handlePreview = (id) => {
        setSelectedCustomer(id);
        setShowModal(true);
    };

    const handleDownload = async () => {
        if (!selectedCustomer) return;
        try {
            const { data } = await useFetchSelectionByIdQuery(selectedCustomer).unwrap();
            const doc = new jsPDF();
            doc.text(`Customer Name: ${data.name}`, 10, 10);
            doc.text(`Phone: ${data.phone}`, 10, 20);
            doc.text(`Email: ${data.email}`, 10, 30);
            data.selections.forEach((selection, index) => {
                doc.text(`${selection.category}: ${selection.items.join(", ")}`, 10, 40 + index * 10);
            });
            doc.save("customer_selection.pdf");
            toast.success("PDF downloaded successfully.");
        } catch (error) {
            toast.error("Failed to download PDF.");
        }
    };

    return (
        <>
            <AdminHeader />
            <Row>
                <Col md={2}>
                    <AdminSidebar />
                </Col>
                <Col md={10}>
                    <h1 className="mt-4">Customer Selections</h1>
                    <Row>
                        {isLoading ? (
                            <p>Loading customers...</p>
                        ) : (
                            selections.map((selection) => (
                                <Col md={4} key={selection._id}>
                                    <Card className="mb-3 shadow-sm">
                                        <Card.Body>
                                            <Card.Title>{selection.name}</Card.Title>
                                            <Card.Text>
                                                <strong>Phone:</strong> {selection.phone}
                                                <br />
                                                <strong>Email:</strong> {selection.email}
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                className="me-2"
                                                onClick={() => handlePreview(selection._id)}
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleDownload}
                                                disabled={!selectedCustomer}
                                            >
                                                Download PDF
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>

                    {/* Modal for Preview */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Customer Selection Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedCustomer ? (
                                <PreviewDetails customerId={selectedCustomer} />
                            ) : (
                                <p>Loading...</p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </>
    );
}

function PreviewDetails({ customerId }) {
    const { data, isLoading } = useFetchSelectionByIdQuery(customerId);

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <p>
                <strong>Name:</strong> {data.name}
                <br />
                <strong>Phone:</strong> {data.phone}
                <br />
                <strong>Email:</strong> {data.email}
            </p>
            <ul>
                {data.selections.map((selection, index) => (
                    <li key={index}>
                        <strong>{selection.category}:</strong> {selection.items.join(", ")}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AdminCustomerListScreen;
