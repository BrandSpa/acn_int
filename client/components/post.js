import React from "react";

const uniq = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

const cleanEmpty = (arrArg) => {
  return arrArg.filter(item => {
    return item.length > 0;
  })
}

class Post extends React.Component {
  static defaultProps = {
    post: {
      post_title: ""
    }
  };

  handleImageLoaded = () => {
    this.props.onImageLoaded();
  };

  render() {
    const { post, type, read_more } = this.props;
    const { post_image = '', post_title = '' } = post;
    let title = post_title;
    if (window.innerWidth <= "767") {
      title = post_title.substring(0, 70) + "...";
    }

    return (
      <div
        className={type == "main" ? "grid-item grid-item--main" : "grid-item"}
      >
        <div
          className={
            type == "main"
              ? "grid-item__content grid-item--main__content"
              : "grid-item__content"
          }
        >
          <a href={post.post_permalink}>
            {
              post_image.length > 0
              ? <img src={post_image} onLoad={this.handleImageLoaded} />
              : <div/>
            }
          </a>
          <div
            className={
              type == "main"
                ? "grid-item__content__texts grid-item--main__content__texts"
                : "grid-item__content__texts"
            }
            style={img == "" ? { width: "100%" } : {}}
          >
            <h5><a href={post.post_permalink}>{title}</a></h5>
            <p>{`${post.post_short.substring(0, 220)}...`}</p>
            <a
              href={post.post_permalink}
              className="grid-item__content__texts__readmore"
            >
              {read_more}...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
