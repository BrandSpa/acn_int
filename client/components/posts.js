import React from "react";
import qs from "qs";
import request from "axios";
import Minigrid from "minigrid";
import debounce from "lodash/debounce";
import Post from "./post";
import fetchwp from '../lib/fetch_wp';

class Posts extends React.Component {
  state = { posts: [], paged: 1, seeMore: true }

  componentDidUpdate() {
    this.initGrid();
  }

  componentDidMount() {
    window.addEventListener("resize", debounce(this.initGrid, 300));
    this.getPosts();
    this.initGrid();
  }

  getPosts = () => {
    fetchwp("get_posts")
    .then(({data = []}) => this.setState({posts: data}))
  }

  initGrid = () => {
    if (this.props.posts && this.props.posts.length > 0) {
      let container = this.grid;
      var grid = new Minigrid({ container, item: ".grid-item" });

      grid.mount();
    }
  };

  goToPosts = () => {
    window.location = this.props.see_more_link;
  }

  render() {
    const { posts = [] } = this.state;

    const postMain = posts.map((post, i) => {
      if (i == 0) {
        return (
          <Post
            key={i}
            onImageLoaded={this.initGrid}
            {...this.props}
            type="main"
            post={post}
          />
        );
      }
    });

    const postsNodes = posts.map((post, i) => {
      if (i !== 0) {
        return (
          <Post
            key={i}
            onImageLoaded={this.initGrid}
            {...this.props}
            type="item"
            post={post}
          />
        );
      }
    });

    return (
      <div>
        <div ref={grid => (this.grid = grid)}>
          {postMain}
          <div className="grid-items">
            {postsNodes}
          </div>
        </div>
        <button
          style={{ display: "block" }}
          onClick={this.goToPosts}
          className={this.state.seeMore ? "bs-see-more" : "hidden"}
        >
          {this.props.see_more}
        </button>
      </div>
    );
  }
}

export default Posts;
