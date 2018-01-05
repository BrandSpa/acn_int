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
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', 'justify-content': 'center' }}>
        <div className="col-12-l" style={{ margin: '40px 0' }}>
          <h2
            style={{
              color: '#fff',
              textAlign: 'center',
              textShadow: '0 2px 20px rgba(0,0,0,0.47)',
            }}
          >
            {this.state.section == 0 ? texts.title : texts.success_title}
          </h2>
          <h3
            style={{
              color: '#fff',
              textAlign: 'center',
              textShadow: '0 2px 20px rgba(0,0,0,0.47)',
              fontWeight: '300',
            }}
          >
            {this.state.section == 0 ? texts.subtitle : texts.success_subtitle}
          </h3>
        </div>
        <div
          className={'col-12 col-4-l'}
          style={{ background: '#fff', padding: '40px' }}
        >
          <Donate {...this.props} changeSection={this.changeSection} />
        </div>
      </div>
    );
  }
}

export default DonateSection;
