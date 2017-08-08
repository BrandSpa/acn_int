import React, { Component } from "react";

class PostShare extends Component {

  render() {
    const currentUrl = window.location.href;
    const {title, subtitle} = this.props;
    
    return (
      <span style="text-align: center; font-size: 20px; color: #3C515F; display:block; margin: 40px auto">{title}</span>

      <div class="bs-post__share" style="background: #F7F7F7">
      	<div class="l-wrap" style="text-align: center">
      	 <span style="display: inline-block;font-size: 20px;color: #3C515F;">{subtitle}</span>

      		<ul style="display: inline-block">
      			<li style="display: inline-block; margin-right: 15px">
            	<a key={1}
                className="icon"
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}>
              	<i class="ion-social-facebook"></i></a>
            </li>
      			<li style="display: inline-block; margin-right: 15px">
      				<a key={2} className="icon" href={`https://twitter.com/intent/tweet?text=${currentUrl}`}>
      					<i class="ion-social-twitter"></i></a>
      			</li>
      			<li style="display: inline-block; margin-right: 15px">
      				<a key={3} className="icon" href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}>
      					<i class="ion-social-linkedin"></i></a>
      			</li>
      			<li style="display: inline-block; margin-right: 15px">
      				<a className="icon"
                href={`whatsapp://send?text=${currentUrl}`}>
      					<i class="ion-social-whatsapp-outline"></i>
      				</a>
      			</li>
      		</ul>
      	</div>
        <style jsx>{`
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
