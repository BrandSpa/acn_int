import React, { Component } from "react";
import Slide from "./headerSlide";

class headerSlider extends Component {
  static defaultProps = { slides: [], interval: 5000, anchor: "#" };
  state = { currentSlide: 0, left: "0" };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.nextSlide(false);
    }, this.props.interval);
  }

  nextSlide = (clear = true) => {
    if (clear) clearInterval(this.interval);
    let total = this.props.slides.length - 1;
    let left = this.state.currentSlide < total
      ? this.state.currentSlide + 1
      : 0;

    this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
  };

  prevSlide = () => {
    clearInterval(this.interval);
    let total = this.props.slides.length - 1;
    let left = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 0;
    this.setState({ left: "-" + left * 100 + "%", currentSlide: left });
  }

  getSizes = () => {
    const { slides } = this.props;
    const viewportWidth = `${100 * slides.length}%`;
    const slideWidth = `${100 / slides.length}%`;
    const windowHeight = window.innerHeight;

    const headerBannerHeight = document.querySelector(".header-banner")
      ? document.querySelector(".header-banner").offsetHeight
      : 0;

    const navHeight = document.querySelector(".nav")
      ? document.querySelector(".nav").offsetHeight
      : 0;

    const sliderHeight = windowHeight && navHeight && headerBannerHeight
      ? windowHeight - navHeight - headerBannerHeight
      : "auto";

    return {
      viewportWidth,
      sliderHeight,
      slideWidth
    }
  }

  render() {
    const {viewportWidth, sliderHeight, slideWidth } = this.getSizes();
    const viewportStyle = {
      width: viewportWidth,
      height: sliderHeight,
      left: this.state.left
    };

    const sliderStyle = { height: sliderHeight };

    return (
      <div className="slider" style={sliderStyle}>
        <div className="slider__viewport" style={viewportStyle}>
          {slides.map((slide, i) => {
            slide = { ...slide, width: slideWidth, height: sliderHeight };
            return <Slide key={i} { ...slide } />;
          })}
        </div>
        {slides.length > 1 &&
           <div className="slider__btns">
              <button className="slider__btns__prev" onClick={this.prevSlide}>
                <i className="ion-chevron-left" />
              </button>
              <button className="slider__btns__next" onClick={this.nextSlide}>
                <i className="ion-chevron-right" />
              </button>
            </div>
          }
          <style jsx>{`
            .slider {
              height: 100%
            }
            .slider__viewport {
              width: 100%;
              height: 100vh;
              left: 0
            }
          `}</style>
      </div>

    );
  }
}

export default headerSlider;
