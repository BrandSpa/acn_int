import React, { Component } from 'react';

class Counter extends Component {
  state = {
    currentNum: 0
  }

  componentDidMount = () => {
    let emmiter = window.mitt;
    emmiter.on('runCounter', this.runCounter);
  }

  componentWillUnmount() {
    let emmiter = window.mitt;
    emmiter.off('runCounter', this.runCounter);
  }

  runCounter = () => {
    const { time, delay } = this.props;
    let nums = [];
    let total = time / delay;
    let $el = $('.counter');
    let num = this.props.num;
    let isFloat = /^[0-9]+\.[0-9]+$/.test(num);
    let decimalLength = isFloat ? (num.split('.')[1] || []).length : 0;
    num = parseInt(num);

    for (var i = 0; i <= total; i++) {
      let n = parseInt(num / total * i);

      if (isFloat) {
        n = parseFloat(num / total * i).toFixed(decimalLength);
      }

      nums.push(n);
    }

    this.updateNum(nums, num);

    this.counterInterval = setInterval(this.updateNum.bind(null, nums, num), delay);
  }

  updateNum = (nums, num) => {
    let currentNum = nums.shift();

    if(currentNum >= num) {
      clearInterval(this.counterInterval);
    }

    this.setState({ currentNum });
  }

  render() {
    return (
      <span>{this.state.currentNum}</span>
    )
  }
}

export default Counter;
