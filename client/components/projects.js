import React from "react";
import debounce from "lodash/debounce";
import ProjectsIcons from "./projectsIcons";

const backgroundColors = {
  1: "#b91325",
  2: "#00355f",
  3: "#6e5785",
  4: "#95a0ad",
  5: "#156734",
  6: "#689038",
  7: "#7a2d04",
  8: "#b27009",
  9: "#E4A70F"
};

class Projects extends React.Component {

  state = {
    section: 9,
    bg: "#B91325",
    donateColor: "#B91325"
  }

  componentDidMount() {
    var num = 9;

    this.props.contents.map(function(content, ind) {
      if (content.hash_url == window.location.hash.replace("#", "")) {
        num = ind + 1;
      }
    });

    let patt = new RegExp(/#projects-[1-9]/);
    let hash = window.location.hash;

    window.addEventListener(
      "resize",
      debounce(event => {
        this.moveArrow(this.state.section);
      }, 200)
    );

    setTimeout(() => {
      this.moveArrow(num);
      this.changeContent(num);
    }, 1000);
  }

  moveArrow = num => {
    let left = this.el.querySelector(`.projects__icons li:nth-child(${num})`).offsetLeft;
    this.el.querySelector(".projects__arrow").style.left = `${left}px`;
  };

  updateUrl = hash => {
    history.pushState(null, null, `#${hash}`);
  };

  changeContent = num => {
    let color = backgroundColors[num];
    let ind = num - 1;
    this.setState({ bg: color, donateColor: color, section: num });
    this.moveArrow(num);

    if (this.props.contents.length > 0 && this.props.contents[ind].hash_url) {
      this.updateUrl(this.props.contents[ind].hash_url);
    }

    this.props.changeSection ? this.props.changeSection(num) : "";
  };

  render() {
    let { contents = [] } = this.props;
    let content = contents[this.state.section - 1] || {};
    const { title, text, imgUrl } = content;

    return (
      <div className="projects" ref={el => this.el = el}>
        <ProjectsIcons ref="projectIcons" onChange={this.changeContent} />

        <div className="projects__content">
          <div className="projects__arrow" />
          <div
            className="col-4-l projects__content__left"
            style={{background: this.state.bg}}
          >
            <h4>{title}</h4>
            <div
              className="projects__content__left__text"
              dangerouslySetInnerHTML={{ __html: text }}
            />
            <button className="bs-donate" style={{color: this.state.donateColor}}>
              {this.props.donate}
            </button>
          </div>
          <div
            className="col-8-l projects__content__right"
            style={{backgroundImage: `url(${imgUrl})`}}
          />
        </div>
        <style jsx>{`
          .projects__content__left {
            min-height: 500px
          }

          .projects__content__left__text {
            color: #fff;
            padding: 40px;
          }

          .projects__content__right {
            background-size: cover,
            background-position: center,
            min-height: 500px
          }

          .bs-donate {
            background: #fff,
            border-color: #fff,
            text-transform: uppercase
          }
        `}</style>
      </div>
    );
  }
}

export default Projects;
