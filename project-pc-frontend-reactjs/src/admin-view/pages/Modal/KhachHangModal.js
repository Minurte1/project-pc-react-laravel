import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { enqueueSnackbar } from "notistack";

const KhachHangModal = ({ show, handleClose, khachhang, listPhanQuyen, handleSubmit }) => {
    const [formData, setFormData] = useState({
        MA_TK: "",
        MA_PHAN_QUYEN: "",
        MA_KH: "",
        TEN_DANG_NHAP: "",
        MAT_KHAU: "",
        SDT_KH: "",
        TEN_KHACH_HANG: "",
        DIA_CHI: "",
        GHI_CHU_KH: "",
    });

    useEffect(() => {
        if (khachhang) {
            setFormData(khachhang);
        } else {
            setFormData({
                MA_TK: "",
                MA_PHAN_QUYEN: "",
                MA_KH: "",
                TEN_DANG_NHAP: "",
                MAT_KHAU: "",
                SDT_KH: "",
                TEN_KHACH_HANG: "",
                DIA_CHI: "",
                GHI_CHU_KH: "",
            });
        }
    }, [khachhang, show]);

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
            if (khachhang) {
                // Cập nhật khách hàng
                await axios.post(
                    `http://localhost:8000/api/update-khach-hang/${khachhang.MA_KH}`,
                    formData
                );
                enqueueSnackbar("Sửa khách hàng thành công!", { variant: "success" });
            } else {
                // Thêm mới khách hàng
                await axios.post("http://localhost:8000/api/save-khach-hang", formData);
                enqueueSnackbar("Thêm khách hàng mới thành công!", { variant: "success" });
            }
            handleSubmit();
            handleClose(); // Đóng modal sau khi xử lý xong
        } catch (error) {
            console.error("Lỗi khi xử lý khách hàng:", error);
            enqueueSnackbar(
                `Đã xảy ra lỗi. Vui lòng thử lại. Cụ thể là: ${error.response?.data?.message || error.message}`,
                { variant: "error" }
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{khachhang ? "Sửa khách hàng" : "Thêm khách hàng mới"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="TEN_KHACH_HANG">
                                <Form.Label>Tên khách hàng</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TEN_KHACH_HANG"
                                    value={formData.TEN_KHACH_HANG}
                                    onChange={handleChange}
                                    placeholder="Nhập tên khách hàng"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="SDT_KH">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SDT_KH"
                                    value={formData.SDT_KH}
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="DIA_CHI">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DIA_CHI"
                                    value={formData.DIA_CHI}
                                    onChange={handleChange}
                                    placeholder="Nhập địa chỉ"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="TEN_DANG_NHAP">
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TEN_DANG_NHAP"
                                    value={formData.TEN_DANG_NHAP}
                                    // onChange={handleChange}
                                    placeholder="Nhập tên đăng nhập"
                                    required
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="MAT_KHAU">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    // type="text"
                                    name="MAT_KHAU"
                                    value={formData.MAT_KHAU}

                                    placeholder="Nhập mật khẩu"
                                    required={!khachhang}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="MA_PHAN_QUYEN">
                                <Form.Label>Phân quyền</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="MA_PHAN_QUYEN"
                                    value={formData.MA_PHAN_QUYEN}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn phân quyền</option>
                                    {listPhanQuyen.map((phanQuyen) => (
                                        <option key={phanQuyen.MA_PHAN_QUYEN} value={phanQuyen.MA_PHAN_QUYEN}>
                                            {phanQuyen.TEN_PHAN_QUYEN}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="GHI_CHU_KH">
                                <Form.Label>Loại khách hàng</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="GHI_CHU_KH"
                                    value={formData.GHI_CHU_KH}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Đang hoạt động">Đang hoạt động</option>
                                    <option value="Ngưng hoạt động">Ngưng hoạt động</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        {khachhang ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default KhachHangModal;