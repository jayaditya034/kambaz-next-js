"use client";

import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function BootstrapForms() {
  return (
    <div id="wd-css-bootstrap-forms">
      {/* 2.3.10 — Forms */}
      <div id="wd-css-styling-forms" className="mb-4">
        <h2>Forms</h2>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
        <Form.Label className="mt-3">Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </div>

      {/* 2.3.11 — Dropdowns */}
      <div id="wd-css-styling-dropdowns" className="mb-4">
        <h3>Dropdowns</h3>
        <Form.Select defaultValue="0">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>

      {/* 2.3.12 — Switches */}
      <div id="wd-css-styling-switches" className="mb-4">
        <h3>Switches</h3>
        <Form.Check type="switch" defaultChecked={false} label="Unchecked switch checkbox input" />
        <Form.Check type="switch" defaultChecked label="Checked switch checkbox input" />
        <Form.Check
          type="switch"
          defaultChecked={false}
          label="Unchecked disabled switch checkbox input"
          disabled
        />
        <Form.Check
          type="switch"
          defaultChecked
          label="Checked disabled switch checkbox input"
          disabled
        />
      </div>

      {/* 2.3.13 — Range / slider */}
      <div id="wd-css-styling-range-and-sliders" className="mb-4">
        <h3>Range</h3>
        <Form.Label>Example range</Form.Label>
        <Form.Range min="0" max="5" step="0.5" />
      </div>

      {/* 2.3.14 — Addons */}
      <div id="wd-css-styling-addons" className="mb-4">
        <h3>Addons</h3>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
          <Form.Control />
        </InputGroup>
        <InputGroup>
          <Form.Control />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
      </div>

      {/* 2.3.15 — Responsive forms (example 1) */}
      <div id="wd-css-responsive-forms-1" className="mb-4">
        <h3>Responsive forms</h3>

        <Form.Group as={Row} className="mb-3" controlId="email1">
          <Form.Label column sm={2}>Email</Form.Label>
          <Col sm={10}>
            <Form.Control type="email" defaultValue="email@example.com" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password1">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control type="password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Form.Label column sm={2}>Bio</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" style={{ height: "100px" }} />
          </Col>
        </Form.Group>
      </div>

      {/* 2.3.15 — Responsive forms (example 2) */}
      <div id="wd-css-responsive-forms-2">
        <h3>Responsive forms 2</h3>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>Email</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>Password</Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>Radios</Form.Label>
              <Col sm={10}>
                <Form.Check type="radio" label="First radio" name="formHorizontalRadios" defaultChecked />
                <Form.Check type="radio" label="Second radio" name="formHorizontalRadios" />
                <Form.Check type="radio" label="Third radio" name="formHorizontalRadios" />
                <Form.Check type="checkbox" label="Remember me" />
              </Col>
            </Form.Group>
          </fieldset>

          <Col>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form>
      </div>
    </div>
  );
}
