import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { enqueueSnackbar } from "notistack";
const SanPhamModal = ({ show, handleClose, sanpham, listTheLoai, handleSubmit }) => {
    const [formData, setFormData] = useState({
        MATL: "",
        TENSP: "",
        DON_GIA: "",
        TON_KHO_SP: "",
        CHIP: "",
        MAIN: "",
        VGA: "",
        NHA_SAN_XUAT: "",
        RAM: "",
        ROM: "",
        ANHSP: "",
        GHI_CHU_SP: "",
    });

    useEffect(() => {
        if (sanpham) {
            setFormData(sanpham);
        } else {
            setFormData({
                MATL: "",
                TENSP: "",
                DON_GIA: "",
                TON_KHO_SP: "",
                CHIP: "",
                MAIN: "",
                VGA: "",
                NHA_SAN_XUAT: "",
                RAM: "",
                ROM: "",
                ANHSP: "",
                GHI_CHU_SP: "",
            });
        }
    }, [sanpham, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("ANHSP", formData.ANHSP); // Gửi file ảnh
        formDataToSend.append("MATL", formData.MATL);
        formDataToSend.append("TENSP", formData.TENSP);
        formDataToSend.append("DON_GIA", formData.DON_GIA);
        formDataToSend.append("TON_KHO_SP", formData.TON_KHO_SP);
        formDataToSend.append("CHIP", formData.CHIP);
        formDataToSend.append("MAIN", formData.MAIN);
        formDataToSend.append("VGA", formData.VGA);
        formDataToSend.append("NHA_SAN_XUAT", formData.NHA_SAN_XUAT);
        formDataToSend.append("RAM", formData.RAM);
        formDataToSend.append("ROM", formData.ROM);
        formDataToSend.append("GHI_CHU_SP", formData.GHI_CHU_SP);

        try {
            if (sanpham) {
                // Cập nhật sản phẩm
                await axios.post(`http://localhost:8000/api/update-san-pham/${sanpham.MASP}`, formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                enqueueSnackbar("Sửa sản phẩm thành công!.", { variant: "success" });
            } else {
                // Thêm mới sản phẩm
                await axios.post("http://localhost:8000/api/save-san-pham", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                enqueueSnackbar("Thêm sản phẩm mới thành công!", { variant: "success" });
            }
            handleSubmit();
            handleClose(); // Đóng modal sau khi xử lý xong
        } catch (error) {
            console.error("Lỗi khi xử lý sản phẩm:", error);
            enqueueSnackbar(`Đã xảy ra lỗi. Vui lòng thử lại. Cụ thể là ${error}`, { variant: "error" });
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{sanpham ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="TENSP">
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TENSP"
                                    value={formData.TENSP}
                                    onChange={handleChange}
                                    placeholder="Nhập tên sản phẩm"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="MATL">
                                <Form.Label>Thể loại</Form.Label>
                                <Form.Select
                                    name="MATL"
                                    value={formData.MATL}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn thể loại</option>
                                    {listTheLoai.map((theLoai) => (
                                        <option key={theLoai.MATL} value={theLoai.MATL}>
                                            {theLoai.TENTL}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="DON_GIA">
                                <Form.Label>Đơn giá</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="DON_GIA"
                                    value={formData.DON_GIA}
                                    onChange={handleChange}
                                    placeholder="Nhập đơn giá"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="TON_KHO_SP">
                                <Form.Label>Tồn kho</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="TON_KHO_SP"
                                    value={formData.TON_KHO_SP}
                                    onChange={handleChange}
                                    placeholder="Nhập tồn kho"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="CHIP">
                                <Form.Label>Chip</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CHIP"
                                    value={formData.CHIP}
                                    onChange={handleChange}
                                    placeholder="Nhập thông tin chip"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="MAIN">
                                <Form.Label>Main</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="MAIN"
                                    value={formData.MAIN}
                                    onChange={handleChange}
                                    placeholder="Nhập thông tin main"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="VGA">
                                <Form.Label>VGA</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="VGA"
                                    value={formData.VGA}
                                    onChange={handleChange}
                                    placeholder="Nhập thông tin VGA"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="NHA_SAN_XUAT">
                                <Form.Label>Nhà sản xuất</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="NHA_SAN_XUAT"
                                    value={formData.NHA_SAN_XUAT}
                                    onChange={handleChange}
                                    placeholder="Nhập nhà sản xuất"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="RAM">
                                <Form.Label>RAM</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="RAM"
                                    value={formData.RAM}
                                    onChange={handleChange}
                                    placeholder="Nhập thông tin RAM"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="ROM">
                                <Form.Label>ROM</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ROM"
                                    value={formData.ROM}
                                    onChange={handleChange}
                                    placeholder="Nhập thông tin ROM"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="ANHSP">
                                <Form.Label>Ảnh sản phẩm</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="ANHSP"
                                    onChange={(e) => {
                                        const file = e.target.files[0]; // Lấy file đầu tiên được chọn
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            ANHSP: file, // Lưu file vào formData
                                        }));
                                    }}
                                />
                            </Form.Group>
                            <img
                                src={`http://localhost:8000/images/${sanpham.ANHSP}`}
                                alt="Ảnh sản phẩm"
                                style={{ width: 50, height: 50, objectFit: "cover" }}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="GHI_CHU_SP">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="GHI_CHU_SP"
                                    value={formData.GHI_CHU_SP}
                                    onChange={handleChange}
                                    placeholder="Nhập mô tả"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        {sanpham ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SanPhamModal;