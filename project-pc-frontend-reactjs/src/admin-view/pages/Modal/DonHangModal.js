import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { enqueueSnackbar } from "notistack";

const DonHangModal = ({ show, handleClose, donhang, listUsers, listSanPham, handleSubmit }) => {
    const [formData, setFormData] = useState({
        MA_KH: "",
        DIA_CHI_SHIP: "",
        SDT_LIEN_HE_KH: "",
        GHI_CHU_HOA_DON: "",
        MASP: "",
        SO_LUONG: "",
        GIAM_GIA: "",
        GHI_CHU_CTHD: "",
    });

    useEffect(() => {
        if (donhang) {
            setFormData(donhang);
        } else {
            setFormData({
                MA_KH: "",
                DIA_CHI_SHIP: "",
                SDT_LIEN_HE_KH: "",
                GHI_CHU_HOA_DON: "",
                MASP: "",
                SO_LUONG: "",
                GIAM_GIA: "",
                GHI_CHU_CTHD: "",
            });
        }
    }, [donhang, show]);

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
            if (donhang) {
                await axios.post(
                    `http://localhost:8000/api/update-don-hang/${donhang.MAHD}`,
                    formData
                );
                enqueueSnackbar("Cập nhật đơn hàng thành công!", { variant: "success" });
            } else {
                await axios.post("http://localhost:8000/api/save-don-hang", formData);
                enqueueSnackbar("Thêm đơn hàng mới thành công!", { variant: "success" });
            }
            handleSubmit();
            handleClose();
        } catch (error) {
            console.error("Lỗi khi xử lý đơn hàng:", error);
            enqueueSnackbar(
                `Đã xảy ra lỗi. Vui lòng thử lại. Cụ thể là: ${error.response?.data?.message || error.message}`,
                { variant: "error" }
            );
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{donhang ? "Sửa đơn hàng" : "Thêm đơn hàng mới"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="MA_KH">
                                <Form.Label>Khách hàng</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="MA_KH"
                                    value={formData.MA_KH}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn khách hàng</option>
                                    {listUsers.map((users) => (
                                        <option key={users.MA_KH} value={users.MA_KH}>
                                            {users.TEN_DANG_NHAP} - {users.TEN_KHACH_HANG}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
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
                        <Col md={12}>
                            <Form.Group controlId="DIA_CHI_SHIP">
                                <Form.Label>Nhập địa chỉ nhận hàng</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DIA_CHI_SHIP"
                                    value={formData.DIA_CHI_SHIP}
                                    onChange={handleChange}
                                    placeholder="Nhập địa chỉ nhận hàng"
                                    required
                                />
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
                        <Col md={6}>
                            <Form.Group controlId="SDT_LIEN_HE_KH">
                                <Form.Label>SĐT nhận hàng</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SDT_LIEN_HE_KH"
                                    value={formData.SDT_LIEN_HE_KH}
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại liên hệ"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="GHI_CHU_HOA_DON">
                                <Form.Label>Trạng thái hóa đơn</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="GHI_CHU_HOA_DON"
                                    value={formData.GHI_CHU_HOA_DON}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Đơn đang chờ xử lý">Đơn đang chờ xử lý</option>
                                    <option value="Đơn thanh toán thành công">Đơn thanh toán thành công</option>
                                    <option value="Đơn hàng đã hủy">Đơn hàng đã hủy</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="GHI_CHU_CTHD">
                                <Form.Label>Ghi chú khác của khách</Form.Label>
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
                        {donhang ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default DonHangModal;