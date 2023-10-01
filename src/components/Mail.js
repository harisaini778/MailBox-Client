import React from "react";
import { Container, Stack, Row, Col, Form, Pagination } from "react-bootstrap";
import Refresh from "./Refresh";
import { FaEllipsisV } from "react-icons/fa";

const Mail = () => {



    return (<div>
        <Container>
            <Row>
                <Col className="me-auto">
                    <Stack direction="horizontal" gap="4"> 
                        <div>
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    label="Check this checkbox"
                                    id="checkboxId"
                                />
                            </Form>
                        </div>
                        <div>
                            <Refresh/>
                        </div>
                        <div>
                        <FaEllipsisV/>
                        </div>
                    </Stack>
                </Col>
                <Col className="ms-auto">
                 <div>
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis></Pagination.Ellipsis>

                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item disabled>{13}</Pagination.Item>
                                
                                <Pagination.Ellipsis></Pagination.Ellipsis>
                                <Pagination.Item>{20}</Pagination.Item>
                                <Pagination.Next />
                                <Pagination.Last/>
                            </Pagination>
                        </div>
                </Col>
            </Row>
        </Container>
    </div>);

}
export default Mail;