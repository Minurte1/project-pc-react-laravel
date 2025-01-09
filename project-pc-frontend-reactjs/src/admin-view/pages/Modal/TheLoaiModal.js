import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { enqueueSnackbar } from "notistack";

const TheLoaiModal = ({ show, handleClose, theLoai, handleSubmit }) => {
    const [formData, setFormData] = useState({
        MATL: "",
        TENTL: "",
        MO_TA_TL: "",
        GHI_CHU_TL: "",
    });

    useEffect(() => {
        if (theLoai) {
            setFormData(theLoai);
        } else {
            setFormData({
                MATL: "",
                TENTL: "",
                MO_TA_TL: "",
                GHI_CHU_TL: "",
            });
        }
    }, [theLoai, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if (theLoai) {
                // Cập nhật thể loại
                await axios.post(
                    `http://localhost:8000/api/update-the-loai/${theLoai.MATL}`,
                    formData
                );
                enqueueSnackbar("Sửa thể loại thành công!", { variant: "success" });
            } else {
                // Thêm mới thể loại
                await axios.post("http://localhost:8000/api/save-the-loai", formData);
                enqueueSnackbar("Thêm thể loại mới thành công!", { variant: "success" });
            }
            handleSubmit();
            handleClose(); // Đóng modal sau khi xử lý xong
        } catch (error) {
            console.error("Lỗi khi xử lý thể loại:", error);
            enqueueSnackbar(
                `Đã xảy ra lỗi. Vui lòng thử lại. Cụ thể là: ${error.response?.data?.message || error.message}`,
                { variant: "error" }
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{theLoai ? "Sửa thể loại" : "Thêm thể loại mới"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="TENTL">
                                <Form.Label>Tên thể loại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENTL"
                                    value={formData.TENTL}
                                    onChange={handleChange}
                                    placeholder="Nhập tên thể loại"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="MO_TA_TL">
                                <Form.Label>Mô tả thể loại</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="MO_TA_TL"
                                    value={formData.MO_TA_TL}
                                    onChange={handleChange}
                                    placeholder="Nhập mô tả"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="GHI_CHU_TL">
                                <Form.Label>Ghi chú</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="GHI_CHU_TL"
                                    value={formData.GHI_CHU_TL}
                                    onChange={handleChange}
                                    placeholder="Nhập ghi chú"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        {theLoai ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default TheLoaiModal;