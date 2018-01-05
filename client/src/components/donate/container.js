import React, { Component } from 'react';
import Donate from './index';

class DonateContainer extends Component {
  static defaultProps = {
    content: '',
    titles: [],
  };

  state = {
    section: 0,
  };

  changeSection = (section) => {
    this.setState({ section });
  };

  render() {
    const { texts } = this.props;
    console.log('container')
    return (
        <Donate {...this.props} changeSection={this.changeSection} />
    );
  }
}

export default DonateContainer;
