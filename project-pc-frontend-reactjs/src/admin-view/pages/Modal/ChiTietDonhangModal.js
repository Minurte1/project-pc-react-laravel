import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { enqueueSnackbar } from "notistack";

const ChiTietDonHangModal = ({ show, handleClose, chitietdonhang, mahd, listSanPham, handleSubmit }) => {
    const [formData, setFormData] = useState({
        MAHD: mahd,
        MASP: "",
        SO_LUONG: "",
        GIAM_GIA: "",
        GHI_CHU_CTHD: "",
    });

    useEffect(() => {
        if (chitietdonhang) {
            setFormData({
                ...chitietdonhang,
            });
        } else {
            setFormData({
                MAHD: mahd,
                MASP: "",
                SO_LUONG: "",
                GIAM_GIA: "",
                GHI_CHU_CTHD: "",
            });
        }
    }, [chitietdonhang, show]);

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
            if (chitietdonhang) {
                // Cập nhật chi tiết đơn hàng
                await axios.post(
                    `http://localhost:8000/api/update-chi-tiet-don-hang/${chitietdonhang.MA_CTHD}`,
                    formData
                );
                enqueueSnackbar("Cập nhật chi tiết đơn hàng thành công!", { variant: "success" });
            } else {
                // Thêm chi tiết đơn hàng mới
                await axios.post("http://localhost:8000/api/save-chi-tiet-don-hang", formData);
                enqueueSnackbar("Thêm chi tiết đơn hàng mới thành công!", { variant: "success" });
            }
            handleSubmit(); // Gọi lại hàm xử lý sau khi gửi dữ liệu
            handleClose(); // Đóng modal
        } catch (error) {
            console.error("Lỗi khi xử lý chi tiết đơn hàng:", error);
            enqueueSnackbar(
                `Đã xảy ra lỗi. Vui lòng thử lại. Cụ thể là: ${error.response?.data?.message || error.message}`,
                { variant: "error" }
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{chitietdonhang ? "Sửa chi tiết đơn hàng" : "Thêm chi tiết đơn hàng mới"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="MASP">
                                <Form.Label>Sản phẩm</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="MASP"
                                    value={formData.MASP}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn sản phẩm</option>
                                    {listSanPham.map((sanpham) => (
                                        <option key={sanpham.MASP} value={sanpham.MASP}>
                                            {sanpham.TENSP}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="SO_LUONG">
                                <Form.Label>Số lượng</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="SO_LUONG"
                                    value={formData.SO_LUONG}
                                    onChange={handleChange}
                                    placeholder="Nhập số lượng"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="GIAM_GIA">
                                <Form.Label>Giảm giá (%)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="GIAM_GIA"
                                    value={formData.GIAM_GIA}
                                    onChange={handleChange}
                                    placeholder="Nhập phần trăm giảm giá"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="GHI_CHU_CTHD">
                                <Form.Label>Yêu cầu khác của khách</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="GHI_CHU_CTHD"
                                    value={formData.GHI_CHU_CTHD}
                                    onChange={handleChange}
                                    placeholder="Nhập ghi chú chi tiết"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        {chitietdonhang ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ChiTietDonHangModal;