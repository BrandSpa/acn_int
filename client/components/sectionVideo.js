import React from "react";
import VideoModal from "./videoModal";

class SectionVideo extends React.Component {
  static defaultProps = {
    imgUrl: "",
    url: "https://www.youtube.com/embed/_lQvw2vSDbs",
    imageStyle: {}
  };

  showVideo = e => {
    e.preventDefault();
    this.modal.show();
  };

  render() {
    let linkStyle = { float: "left", lineHeight: "0" };
    let imageStyle = { width: "100px", margin: "0 auto" };
    imageStyle = { ...imageStyle, ...this.props.imageStyle };

    return (
      <div>
        <VideoModal ref={modal => (this.modal = modal)} url={this.props.url} />
        <a
          href="#"
          className="image-video__link"
          style={linkStyle}
          onClick={this.showVideo}
        >
          <img style={imageStyle} data-src={this.props.imgUrl} className="lazyload" />
        </a>
      </div>
    );
  }
}

export default SectionVideo;
