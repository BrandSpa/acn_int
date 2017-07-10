import React, { Component } from 'react';

class Counter extends Component {
  state = {
    currentNum: 0
  }

  componentDidMount() {
    const { time, delay } = this.props;
    let nums = [];
    let total = time / delay;
    let $el = $('.counter');
    let num = this.props.num;
    num = parseInt(num);

    for (var i = 0; i <= total; i++) {
      let n = parseInt(num / total * i);
      nums.push(n);
    }

    this.updateNum(nums);

    this.counterInterval = setInterval(this.updateNum.bind(null, nums), delay);
  }

  updateNum = (nums) => {
    let currentNum = nums.shift();

    if(currentNum >= num) {
      clearInterval(this.counterInterval);
    }

    this.setState({ currentNum });
  }

  render() {
    return (
      <div ref={counter => this.counter = counter}>
        {this.state.currentNum}
      </div>
    )
  }
}

export default Counter;
