
export default function counter(time = 500, delay = 10) {
  let nums = [];
  let total = time / delay;
  let $el = $('.counter');
  let num = $el.text();
  num = parseInt(num);

  for (var i = 0; i <= total; i++) {
    nums.push(num / total * i);
  }

  $el.text(0);

  function updateNum() {
    let currentNum = nums.shift();

    if(currentNum == num) {
      clearInterval(counterInterval);
    }
    $el.text(currentNum);
    return currentNum;
  }


  let counterInterval = setInterval(updateNum, delay);
}
