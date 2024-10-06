import React, { Component } from "react";
import './Slider.scss';
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.fetchData();
        this.setupSliderNavigation();
        this.startAutoSlide();
    }

    componentWillUnmount() {
        this.stopAutoSlide();
    }

    startAutoSlide = () => {
        try {
            this.autoSlideInterval = setInterval(this.moveSliderNext, 5000);
        }
        catch (error) {

        }
    };

    stopAutoSlide = () => {
        clearInterval(this.autoSlideInterval);
    };

    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/sanpham");
            if (!response.ok) {
                throw new Error("Yêu cầu không thành công");
            }

            const jsonResponse = await response.json();
            this.setState({
                products: jsonResponse.data || [], // Handle the case when data is not available
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    setupSliderNavigation = () => {
        // Use ref to get the DOM element
        this.nextButtonRef.addEventListener('click', this.moveSliderNext);
        this.prevButtonRef.addEventListener('click', this.moveSliderPrev);
    };

    moveSliderNext = () => {
        let lists = document.querySelectorAll('.slide-item');
        document.getElementById('slide').appendChild(lists[0]);
    };

    moveSliderPrev = () => {
        let lists = document.querySelectorAll('.slide-item');
        document.getElementById('slide').prepend(lists[lists.length - 1]);
    };

    handleViewSanPham = (SanPham) => {
        const { history } = this.props;

        // Kiểm tra xem history có tồn tại không
        if (history) {
            history.push(`/SanPham/${SanPham.MaSP}`);
        } else {
            console.error("Lỗi: history không tồn tại hoặc không được truyền vào đúng cách.");
        }
    }


    render() {
        const { products } = this.state;
        return (
            <div className="slider-main">
                <div className="slide-container">
                    <div id="slide">
                        {products.map((item, index) => (
                            <div key={item.MaSP} className="slide-item" style={{ backgroundImage: `url(${item.imageUrl || ''})` }}>
                                <div className="slide-content">
                                    <div className="slide-name">{item.TenSP || ''}</div>
                                    <div className="slide-des">{item.DonGiaSP ? `${item.DonGiaSP.toLocaleString()} VNĐ` : ''}</div>
                                    <button className="btnSeeMore_Slider" onClick={() => this.handleViewSanPham(item)}>See more</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="slide-button">
                        <button ref={ref => this.prevButtonRef = ref} ><FontAwesomeIcon icon={faChevronLeft} /></button>
                        <button ref={ref => this.nextButtonRef = ref}><FontAwesomeIcon icon={faChevronRight} /></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Slider);
