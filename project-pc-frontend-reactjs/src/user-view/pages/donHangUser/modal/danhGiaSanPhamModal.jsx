import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
const api = process.env.REACT_APP_URL_SERVER;
const ProductReviewModal = ({ open, onClose, order, fetchOrders }) => {
  const [reviews, setReviews] = useState([]); // Reviews state
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (open) {
      // Set current product when modal opens
      setReviews(
        order?.products.map((product) => ({
          productId: product.IDCHITIETDONHANG,
          rating: product.DANHGIA || 0, // Set rating if exists
          comment: product.BINHLUAN || "", // Set comment if exists
        }))
      );
    }
  }, [open, order]);

  const handleReviewChange = (productId, field, value) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.productId === productId ? { ...review, [field]: value } : review
      )
    );
  };

  const handleSubmit = async () => {
    const reviewsToSend = reviews.map((review) => ({
      productId: review.productId,
      rating: review.rating,
      comment: review.comment,
    }));
    try {
      const response = await axios.post(`${api}/danh-gia/update-ratings`, {
        reviewsToSend,
      }); // Đảm bảo URL đúng với API của bạn
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    fetchOrders();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Đánh giá sản phẩm</DialogTitle>
      <DialogContent>
        {order?.products.map((product) => {
          const hasReview =
            product.DANHGIA !== null && product.BINHLUAN !== null;

          const productReview = reviews.find(
            (review) => review.productId === product.IDCHITIETDONHANG
          );

          return (
            <Box key={product.IDCHITIETDONHANG} mb={3}>
              <Typography variant="h6">{product.TENSANPHAM}</Typography>
              <img
                src={`${api}/images/${product.HINHANHSANPHAM}`}
                style={{ width: "80px", height: "80px" }}
                alt={product.TENSANPHAM}
              />
              <Rating
                value={productReview?.rating || 0}
                onChange={(event, newValue) =>
                  handleReviewChange(
                    product.IDCHITIETDONHANG,
                    "rating",
                    newValue
                  )
                }
                disabled={hasReview} // Disable if product has review
              />
              <TextField
                label="Bình luận"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                value={productReview?.comment || ""}
                onChange={(e) =>
                  handleReviewChange(
                    product.IDCHITIETDONHANG,
                    "comment",
                    e.target.value
                  )
                }
                disabled={hasReview} // Disable if product has review
              />
            </Box>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained">
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductReviewModal;
