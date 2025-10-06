"use client";

import { useParams } from "next/navigation";
import { Button, Col, Form, Row, Card } from "react-bootstrap";

export default function EditAssignmentPage() {
  const { aid, cid } = useParams<{ aid: string; cid: string }>();

  return (
    <div id="wd-edit-assignment" className="mt-2">
      <h2 className="mb-3">Assignments &nbsp;›&nbsp; {aid}</h2>

      <Card className="p-3">
        <Form>
          <Form.Group className="mb-3" controlId="assignmentName">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control size="lg" defaultValue={aid} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="assignmentDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={6}
              defaultValue={`The assignment is available online\n\nSubmit your link here...`} />
          </Form.Group>

          <Row>
            <Form.Group as={Col} md={4} className="mb-3" controlId="points">
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" defaultValue={100} />
            </Form.Group>
            <Form.Group as={Col} md={4} className="mb-3" controlId="group">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={4} className="mb-3" controlId="displayAs">
              <Form.Label>Display Grade as</Form.Label>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md={4} className="mb-3" controlId="due">
              <Form.Label>Due</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
            <Form.Group as={Col} md={4} className="mb-3" controlId="from">
              <Form.Label>Available from</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
            <Form.Group as={Col} md={4} className="mb-3" controlId="until">
              <Form.Label>Until</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
          </Row>

          <div className="d-flex gap-2">
            <Button variant="primary">Save</Button>
            <Button variant="secondary" href={`/Courses/${cid}/Assignments`} as="a">
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
