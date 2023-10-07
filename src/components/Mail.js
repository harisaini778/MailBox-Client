import React from "react";
import { Container, Stack, Row, Col, Form, Pagination } from "react-bootstrap";
import Refresh from "./Refresh";
import { FaEllipsisV } from "react-icons/fa";
import Inbox from "./Inbox";
import { useDispatch } from "react-redux";
import { setSelectAll } from "../store/dataStore";

const Mail = () => {
    
    const dispatch = useDispatch();

    const handleSelectAll = () => {
        dispatch(setSelectAll(true));
    }

    return (<div>
        <Container className="mt-2 mb-2">
            <Row>
                <Col xs={12} sm={12} lg={4} x-lg={4} className="justify-content-center">
                    <Stack direction="horizontal" gap="4" className="justify-content-center m-1">
                        <div>
                            <Form>
                                <Form.Check onClick={handleSelectAll}
                                    type="checkbox"
                                    label="Select All"
                                    id="checkboxId"
                                />
                            </Form>
                        </div>
                        <div>
                            <Refresh />
                        </div>
                        <div>
                            <FaEllipsisV />
                        </div>
                    </Stack>
                </Col>
                <Col xs={12} sm={12} lg={6} x-lg={6} className="justify-content-center">
                    <Container>
                        <Pagination className="justify-content-center m-1">
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis></Pagination.Ellipsis>

                            <Pagination.Item active >{5}</Pagination.Item>
                            <Pagination.Item disabled>{6}</Pagination.Item>
                                
                            <Pagination.Ellipsis></Pagination.Ellipsis>
                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </Container>
                </Col>
            </Row>
        </Container>
        <Inbox />
    </div>);

};
export default Mail;