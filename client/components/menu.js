import React, {Component} from "react";

class Menu extends Component {
  render() {
    const {links} = this.props;
    return(
      <ul>
      {links.map(link => {
        return <li><a href={link.url}></a>{link.title}</li>
      })}
      </ul>
    )
  }
}

export default Menu;
