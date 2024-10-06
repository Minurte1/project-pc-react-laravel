import React from "react";
import './Slider.scss';

import slider1 from '../../assets/images/slider/1.jpg'
import slider2 from '../../assets/images/slider/2.jpg'
import slider3 from '../../assets/images/slider/3.jpg'
import slider4 from '../../assets/images/slider/4.jpg'
import slider5 from '../../assets/images/slider/5.jpg'
import slider6 from '../../assets/images/slider/6.jpg'
import slider7 from '../../assets/images/slider/7.jpg'

class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            error: null,
        };
    }

    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/sanpham", {
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
    }

    plusSlides = (n) => {
        // Truy cập và cập nhật slideIndex thông qua this.state
        this.showSlides(this.state.slideIndex + n);
    }

    currentSlide = (n) => {
        // Truy cập và cập nhật slideIndex thông qua this.state
        this.showSlides(n);
    }

    showSlides = (n) => {
        let { slideIndex } = this.state;
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { n = 1; }
        if (n < 1) { n = slides.length; }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[n - 1].style.display = "block";
        dots[n - 1].className += " active";

        // Cập nhật slideIndex trong state
        this.setState({ slideIndex: n });
    }

    render() {
        const { data, loading, error } = this.state;
        return (
            <>
                <div className="slideshow-container">

                    {data && data.length > 0 &&
                        data.map((item, index) => (
                            <div className="mySlides fade">
                                <div className="numbertext">{index + 1} / 7</div>
                                <img src={item.imageUrl} style={{ width: "100%" }} />
                                <div className="text">Caption Text</div>
                            </div>
                        ))
                    }

                    {/*<div className="mySlides fade">
                        <div className="numbertext">1 / 7</div>
                        <img src={slider1} style={{ width: "100%" }} alt="Slide 1" />
                        <div className="text">Caption Text</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">2 / 7</div>
                        <img src={slider2} style={{ width: "100%" }} alt="Slide 2" />
                        <div className="text">Caption Two</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">3 / 7</div>
                        <img src={slider3} style={{ width: "100%" }} alt="Slide 3" />
                        <div className="text">Caption Three</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">4 / 7</div>
                        <img src={slider4} style={{ width: "100%" }} alt="Slide 4" />
                        <div className="text">Caption Four</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">5 / 7</div>
                        <img src={slider5} style={{ width: "100%" }} alt="Slide 5" />
                        <div className="text">Caption Five</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">6 / 7</div>
                        <img src={slider6} style={{ width: "100%" }} alt="Slide 6" />
                        <div className="text">Caption Six</div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">7 / 7</div>
                        <img src={slider7} style={{ width: "100%" }} alt="Slide 7" />
                        <div className="text">Caption Seven</div>
                    </div> */}

                    <a className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={() => this.plusSlides(1)}>&#10095;</a>
                </div>
                <br />

                <div style={{ textAlign: "center" }}>

                    {data && data.length > 0 &&
                        data.map((item, index) => (
                            <span className="dot" onClick={() => this.currentSlide(1)}></span>
                        ))
                    }

                    {/* <span className="dot" onClick={() => this.currentSlide(1)}></span>
                    <span className="dot" onClick={() => this.currentSlide(2)}></span>
                    <span className="dot" onClick={() => this.currentSlide(3)}></span>
                    <span className="dot" onClick={() => this.currentSlide(4)}></span>
                    <span className="dot" onClick={() => this.currentSlide(5)}></span>
                    <span className="dot" onClick={() => this.currentSlide(6)}></span>
                    <span className="dot" onClick={() => this.currentSlide(7)}></span> */}
                </div>
            </>
        );
    }
}

export default Slider;
