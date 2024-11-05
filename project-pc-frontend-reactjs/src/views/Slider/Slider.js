import "./Slider.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Slider = () => {
  const [products, setProducts] = useState([]);
  const autoSlideInterval = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    setupSliderNavigation();
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, []);

  const startAutoSlide = () => {
    try {
      // autoSlideInterval.current = setInterval(moveSliderNext, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sanpham");
      // console.log("response.data.data: ", response.data.data);
      if (response.status === 200) {
        setProducts(response.data.data || []);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const setupSliderNavigation = () => {
    if (nextButtonRef.current) {
      nextButtonRef.current.addEventListener("click", moveSliderNext);
    }
    if (prevButtonRef.current) {
      prevButtonRef.current.addEventListener("click", moveSliderPrev);
    }
  };

  const moveSliderNext = () => {
    let lists = document.querySelectorAll(".slide-item");
    document.getElementById("slide").appendChild(lists[0]);
  };

  const moveSliderPrev = () => {
    let lists = document.querySelectorAll(".slide-item");
    document.getElementById("slide").prepend(lists[lists.length - 1]);
  };

  const handleViewSanPham = (SanPham) => {
    if (SanPham) {
      navigate(`/SanPham/${SanPham.MASP}`);
    }
  };

  return (
    <div className="slider-main">
      <div className="slide-container">
        <div id="slide">
          {products.map((item) => (
            <div
              key={item.MASP}
              className="slide-item"
              style={{
                backgroundImage: `url(${item.imageUrl ? item.imageUrl : 'http://localhost:8000/images/no_image_available.png'})`,
              }}
            >
              <div className="slide-content">
                <div className="slide-name">{item.TENSP || ""}</div>
                <div className="slide-des">
                  {item.DON_GIA ? `${Number(item.DON_GIA).toLocaleString()} VNĐ` : ""}
                </div>
                <button
                  className="btnSeeMore_Slider"
                  onClick={() => handleViewSanPham(item)}
                >
                  See more
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="slide-button">
          <button ref={prevButtonRef}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button ref={nextButtonRef} className="slide-button-2">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;