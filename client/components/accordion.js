import React from 'react';
import PropTypes from 'prop-types';

class Accordion extends React.Component {
  static defaultProps = {
    background: '#687f87',
    titleColor: '',
    content: '',
    btnTitle: '',
  }

  state = { show: false };

  componentDidMount() {
    return { content: '', btnTitle: 'Toggle' };
  }

  toggle = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { content, btnTitle, background, titleColor } = this.props;

    const btnStyle = {
      color: titleColor,
      background,
    };

    return (
      <div className="accordion">
        <button
          className="accordion__btn"
          style={btnStyle}
          onClick={this.toggle}
        >
          {btnTitle}
          {' '}
          <i
            className={this.state.show ? 'ion-chevron-up' : 'ion-chevron-down'}
          />
        </button>
        <div
          className="accordion__content"
          style={this.state.show ? { display: 'block' } : { display: 'none' }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <style jsx>{`
        .accordion__btn {
          width: 100%,
          height: 60px,
          border: none,
          border-radius: 0,
          font-size: 18px,
          font-weight: normal,
        }
        `}</style>
      </div>
    );
  }
}

Accordion.propTypes = {
  content: PropTypes.string,
  btnTitle: PropTypes.string,
  background: PropTypes.string,
  titleColor: PropTypes.string,
};

export default Accordion;
