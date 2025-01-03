import React, { useState, useEffect } from "react";
import {
  getAllSanPham,
  createSanPham,
  updateSanPham,
  deleteSanPham,
} from "../../services/product-service"; // Import service functions
import ProductModal from "../modal-view/product-modal"; // Import Product Modal

const Users = () => {
  const [sanphams, setSanphams] = useState([]);
  const [selectedSanPham, setSelectedSanPham] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const sanphamsPerPage = 5;

  useEffect(() => {
    fetchSanPhams();
  }, []);

  const fetchSanPhams = async () => {
    try {
      const data = await getAllSanPham();
      setSanphams(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = () => {
    setSelectedSanPham(null);
    setOpenModal(true);
  };

  const handleEdit = (sanpham) => {
    setSelectedSanPham(sanpham);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await deleteSanPham(id);
        fetchSanPhams();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSave = async (sanpham) => {
    try {
      if (selectedSanPham) {
        await updateSanPham(selectedSanPham.MASP, sanpham);
      } else {
        await createSanPham(sanpham);
      }
      setOpenModal(false);
      fetchSanPhams();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastSanPham = currentPage * sanphamsPerPage;
  const indexOfFirstSanPham = indexOfLastSanPham - sanphamsPerPage;
  const currentSanPhams = sanphams
    .filter((sanpham) =>
      sanpham.TENSP.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstSanPham, indexOfLastSanPham);

  const totalPages = Math.ceil(sanphams.length / sanphamsPerPage);

  return (
    <div>
      <h5 className="card-title mb-4">Quản lý sản phẩm</h5>
      <div className="mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center mt-3">
          <div
            style={{ width: "350px" }}
            className="col-3 input-group admin-input-group"
          >
            <input
              type="text"
              className="col-3 form-control admin-input"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="btn btn-success admin-btn" onClick={handleCreate}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <table className="table table-bordered center-text">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá sản phẩm</th>
            <th>Tồn kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {createSanPham.map((sanpham) => (
            <tr key={sanpham.MASP}>
              <td>{sanpham.MASP}</td>
              <td>{sanpham.TENSP}</td>
              <td>{sanpham.DON_GIA} đ</td>
              <td>{sanpham.TON_KHO_SP}</td>
              <td className="text-center align-middle">
                <button
                  className="btn btn-primary admin-btn"
                  onClick={() => handleEdit(sanpham)}
                >
                  <i className="fa-solid fa-wrench"></i>
                </button>
                <button
                  className="btn btn-danger admin-btn"
                  onClick={() => handleDelete(sanpham.MASP)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end admin-pagination">
          <li
            className="page-item"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <a
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
                href="#"
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li
            className="page-item"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>

      <ProductModal
        sanpham={selectedSanPham}
        open={openModal}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Users;
