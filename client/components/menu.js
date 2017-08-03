import React, { Component } from "react";

class Menu extends Component {
  getLangs = () => {
    const { links } = this.props;
    const langs = links.filter(link => link.post_title == "Language switcher");
    const langsTitle = langs.filter(link => link.classes.indexOf("current-lang") !== -1);
    return (
      <li>
        <a href={langsTitle[0].url}>{langsTitle[0].title}</a>
        <div className="dropdown-content">
          {langs.map(lang => {
            return <a href={lang.url}>{lang.title}</a>
          })}
        </div>
      </li>
    )
  }

  render() {
    const { links } = this.props;

    return(
      <ul className="menu">
      {links.map(link => {
        if(link.classes.indexOf("current-lang") !== -1) {
          return this.getLangs();
        } else {
          return <li className={link.classes.join(" ")}><a href={link.url}>{link.title}</a></li>
        }

      })}
      </ul>
    )
  }
}

export default Menu;
