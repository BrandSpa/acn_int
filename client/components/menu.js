import React, {Component} from "react";

class Menu extends Component {
  render() {
    const {links} = this.props;
    return(
      <ul className="menu">
      {links.map(link => {
        return <li className={link.classes.join(" ")}><a href={link.url}>{link.title}</a></li>
      })}
      </ul>
    )
  }
}

export default Menu;
