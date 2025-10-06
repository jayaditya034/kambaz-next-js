"use client";

import Link from "next/link";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: 420 }}>
      <h1 className="mb-3">Profile</h1>

      <Form>
        <Form.Control defaultValue="alice" placeholder="username" className="mb-2" />
        <Form.Control defaultValue="123" placeholder="password" type="password" className="mb-2" />
        <Form.Control defaultValue="Alice" placeholder="First Name" id="wd-firstname" className="mb-2" />
        <Form.Control defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" className="mb-2" />

        <Row className="mb-2">
          <Col>
            <Form.Control defaultValue="2000-01-01" type="date" id="wd-dob" />
          </Col>
        </Row>

        <Form.Control defaultValue="alice@wonderland" type="email" id="wd-email" className="mb-2" />

        <Form.Select defaultValue="FACULTY" id="wd-role" className="mb-3">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>

        <Link href="/Account/Signin" className="btn btn-danger w-100">Signout</Link>
      </Form>
    </div>
  );
}
