import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/admin" className="nav-link">Dashboard</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/admin/category" className="nav-link">Category</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/admin/add-to-list" className="nav-link">Add to List</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/admin/customer-list" className="nav-link">Customer List</Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default AdminSidebar;
