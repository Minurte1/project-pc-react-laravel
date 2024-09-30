import express from "express";
import bodyParser from "body-parser";
import APIController from "../controller/APIController.js";

let router = express.Router();
router.use(bodyParser.json());

const initAPIRoute = (app) => {
  router.get("/sanpham", APIController.getAllSanPham);
  router.get("/khachhang", APIController.getKhachHang);
  router.get("/sanpham/:id", APIController.getSanPhamById);
  router.get("/sanpham/slider", APIController.getSanPhamSlider);
  router.get("/sanphamDesktop", APIController.getSanPhamDesktop);
  router.get("/sanphamApple", APIController.getSanPhamApple);
  router.get("/sanphamASUS", APIController.getSanPhamASUS);

  router.post("/create-hoadon", APIController.createHoaDon);

  //API cũ
  router.post("/create-user", APIController.createNewUser); //method POST -> CREATE data
  router.put("/update-sanpham", APIController.updateSanPham); //method PUT -> UPDATE data
  router.delete("/delete-user/:id", APIController.deleteUser); //method DELETE -> DELETE data

  return app.use("/api/v1/", router);
};

export default initAPIRoute;
