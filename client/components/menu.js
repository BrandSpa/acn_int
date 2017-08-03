import React, { Component } from "react";

class Menu extends Component {
  render() {
    const {links} = this.props;
    const langs = links.filter(link => link.post_name == "language-switcher");
    const langsTitle = links.filter(link => "current-lang" in link.classes);
    console.log(langs, langsTitle);

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
