import React from "react";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import AdminHeader from "../../components/adminComponents/AdminHeader";
import { Container, Card,Row,Col } from 'react-bootstrap';

function AdminHomeScreen() {
  return (
<>
<AdminHeader />
<Row>
  <Col md={2}>
    <AdminSidebar/>
  </Col>
  <Col md={10}>
  
  </Col>
</Row>
</>
  );
}

export default AdminHomeScreen;
