import React, { Component } from "react";

class Menu extends Component {
  render() {
    const {links} = this.props;
    const langs = links.filter(link => link.post_name == "language-switcher");
    const langsTitle = langs.filter(link => link.classes.indexOf("current-lang") !== -1);
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
