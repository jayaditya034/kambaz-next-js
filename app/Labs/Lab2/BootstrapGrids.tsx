import { Row, Col } from "react-bootstrap";

export default function BootstrapGrids() {
  return (
    <>
      {/* 2.3.3 Grid system (from earlier) */}
      <h2>Bootstrap</h2>
      <div id="wd-bs-grid-system">
        <h2>Grid system</h2>

        <Row className="g-0">
          <Col className="bg-danger text-white p-2">
            <h3 className="m-0">Left half</h3>
          </Col>
          <Col className="bg-primary text-white p-2">
            <h3 className="m-0">Right half</h3>
          </Col>
        </Row>

        <Row className="g-0">
          <Col xs={4} className="bg-warning p-2">
            <h3 className="m-0">One third</h3>
          </Col>
          <Col xs={8} className="bg-success text-white p-2">
            <h3 className="m-0">Two thirds</h3>
          </Col>
        </Row>

        <Row className="g-0">
          <Col xs={2} className="bg-black text-white p-2">
            <h3 className="m-0">Sidebar</h3>
          </Col>
          <Col xs={8} className="bg-secondary text-white p-2">
            <h3 className="m-0">Main content</h3>
          </Col>
          <Col xs={2} className="bg-info p-2">
            <h3 className="m-0">Sidebar</h3>
          </Col>
        </Row>
      </div>

      {/* 2.3.4 Responsive grid system */}
      <div id="wd-bs-responsive-grids" className="mt-4">
        <h2>Responsive grid system</h2>
        <Row className="g-0">
          <Col xs={12} md={6} xl={3} className="bg-warning p-2">
            <h3 className="m-0">Column A</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-primary text-white p-2">
            <h3 className="m-0">Column B</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-danger text-white p-2">
            <h3 className="m-0">Column C</h3>
          </Col>
          <Col xs={12} md={6} xl={3} className="bg-success text-white p-2">
            <h3 className="m-0">Column D</h3>
          </Col>
        </Row>
      </div>

      {/* 2.3.4 “Dramatic” responsive grid */}
      <div id="wd-bs-responsive-dramatic" className="mt-4">
        <h2>Responsive grid system</h2>
        <Row className="g-1">
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning p-3"><h4 className="m-0">1</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white p-3"><h4 className="m-0">2</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white p-3"><h4 className="m-0">3</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white p-3"><h4 className="m-0">4</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning p-3"><h4 className="m-0">5</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white p-3"><h4 className="m-0">6</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white p-3"><h4 className="m-0">7</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white p-3"><h4 className="m-0">8</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning p-3"><h4 className="m-0">9</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white p-3"><h4 className="m-0">10</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white p-3"><h4 className="m-0">11</h4></Col>
          <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white p-3"><h4 className="m-0">12</h4></Col>
        </Row>
      </div>
    </>
  );
}
