import React from "react";
import "./Slider.scss";

class Sliders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true,
      error: null,
      slideIndex: 1,
    };

    this.slidesRef = React.createRef();
    this.dotsRef = React.createRef();
  }

  fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/sanpham", {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Yêu cầu không thành công");
      }

      const jsonResponse = await response.json();

      this.setState({
        data: jsonResponse.data,
        loading: false,
      });

      console.log(jsonResponse);
    } catch (error) {
      console.error(error.message);
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.fetchData();
    this.showSlides(this.state.slideIndex);

    setTimeout(() => {
      this.showSlides(1);
    }, 1000);

    // Gọi hàm chuyển slide mỗi 5 giây
    this.slideInterval = setInterval(() => {
      this.plusSlides(1);
    }, 5000);
  }

  componentWillUnmount() {
    // Xóa interval khi component bị unmount để tránh memory leaks
    clearInterval(this.slideInterval);
  }

  plusSlides = (n) => {
    this.showSlides(this.state.slideIndex + n);
  };

  currentSlide = (n) => {
    this.showSlides(n);
  };

  showSlides = (n) => {
    let { slideIndex } = this.state;
    let slides = this.slidesRef.current
      ? this.slidesRef.current.getElementsByClassName("mySlides")
      : [];
    let dots = this.dotsRef.current
      ? this.dotsRef.current.getElementsByClassName("dot")
      : [];

    if (!slideIndex) {
      slideIndex = 1;
    }

    if (n > slides.length) {
      n = 1;
    }
    if (n < 1) {
      n = slides.length;
    }

    // Hiển thị ảnh đầu tiên khi trang được tải lên
    if (slideIndex === 1) {
      slides[0] && (slides[0].style.display = "block");
      dots[0] && (dots[0].className += " active");
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[n - 1] && (slides[n - 1].style.display = "block");
    dots[n - 1] && (dots[n - 1].className += " active");

    this.setState({ slideIndex: n });
  };

  render() {
    const { data, loading } = this.state;

    return (
      <>
        <div className="slideshow-container" ref={this.slidesRef}>
          {data &&
            data.slice(0, 5).map((item, index) => (
              <div
                key={item.MaSP}
                className={`mySlides fade ${index + 1 === this.state.slideIndex ? "show" : "hide"
                  }`}
              >
                <div className="numbertext">{index + 1} / 5</div>
                <img
                  src={item.imageUrl}
                  style={{ width: "100%" }}
                  alt={`Slide ${index + 1}`}
                />
                {/* <div className="text">Caption Text</div> */}
              </div>
            ))}

          <a className="prev" onClick={() => this.plusSlides(-1)}>
            &#10094;
          </a>
          <a className="next" onClick={() => this.plusSlides(1)}>
            &#10095;
          </a>
        </div>
        <br />

        <div style={{ textAlign: "center" }} ref={this.dotsRef}>
          {data &&
            data
              .slice(0, 5)
              .map((item, index) => (
                <span
                  key={item.MaSP}
                  className="dot"
                  onClick={() => this.currentSlide(index + 1)}
                ></span>
              ))}
        </div>
      </>
    );
  }
}

export default Sliders;
