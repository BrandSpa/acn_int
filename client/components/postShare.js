import React, { Component } from "react";

class PostShare extends Component {

  onRedirect = (e) => {
    e.preventDefault();
    let href = e.target.href;
    console.log(href);
  }

  render() {
    const currentUrl = window.location.href;
    const { title, subtitle } = this.props;

    return (
      <div>
      <span className="title">{title}</span>

      <div className="bs-post__share">
      	<div className="l-wrap">
      	 <span className="bs-post__share-subtitle">{subtitle}</span>
      		<ul>
      			<li>
            	<a
                onClick={this.onRedirect}
                className="icon"
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              >
              	<i className="ion-social-facebook"></i>
              </a>
            </li>
      			<li>
      				<a
                onClick={this.onRedirect}
                className="icon"
                href={`https://twitter.com/intent/tweet?text=${currentUrl}`}
              >
      					<i className="ion-social-twitter"></i>
              </a>
      			</li>
      			<li>
      				<a
                onClick={this.onRedirect}
                className="icon"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
              >
      					<i className="ion-social-linkedin"></i>
              </a>
      			</li>
      			<li>
      				<a
                onClick={this.onRedirect}
                className="icon"
                href={`whatsapp://send?text=${currentUrl}`}
              >
      					<i className="ion-social-whatsapp-outline"></i>
      				</a>
      			</li>
      		</ul>
      	</div>
      </div>
      <style jsx>{`
        .bs-post__share {
          background: #F7F7F7
        }

        .bs-post__share-subtitle {
          display: inline-block;
          font-size: 20px;
          color: #3C515F
        }

        .l-wrap {
          text-align: center
        }

        ul {
          display: inline-block
        }

        ul li {
          display: inline-block;
          margin-right: 15px
        }

        .title {
          text-align: center;
          font-size: 20px;
          color: #3C515F;
          display:block;
          margin: 40px auto
        }
        .icon {
          color: #939597;
          width: 40px;
          height: 40px;
          border-radius: 40px;
          text-align: center;
          display: block;
          border: 1px solid #939597;
          padding: 5px;
          font-size: 20px;
        }
      `}</style>
      </div>
    )
  }
}

export default PostShare;
