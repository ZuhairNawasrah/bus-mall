'use strict';
const names = ['banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
const ext = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'gif', 'jpg', 'jpg'];
const left = document.getElementById('left');
const middle = document.getElementById('middle');
const right = document.getElementById('right');
const sec = document.getElementById('section');
BusMall.items = [];
let listenStop = 0;
let preLeftIndex;
let preMiddleIndex;
let preRightIndex;
//------------------------------------------init------------------------------------------------//
function randomNo(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}
function BusMall(name, ext) {
  this.name = name;
  this.path = `./images/${name}.${ext}`;
  this.votes = 0;
  this.showTimes = 0;
  this.avgLikes = 0;
  BusMall.items.push(this);
}
for (let i = 0; i < names.length; i++) {
  new BusMall(names[i], ext[i]);
}
console.log(BusMall.items);
//---------------------------------------addListener-------------------------------------------//
sec.addEventListener('click', product);
function product(event) {
  if (event.target.id !== 'sec') {
    for (let i = 0; i < (BusMall.items.length); i++) {
      if (BusMall.items[i].name === event.target.title) {
        BusMall.items[i].votes++;
        listenStop++;
      }
    }
    if (listenStop === 25) {
      sec.removeEventListener('click', product);
      rendChart();
      for (let i = 0; i < BusMall.items.length; i++) {
        BusMall.items[i].avgLikes = `${Math.floor((BusMall.items[i].votes / BusMall.items[i].showTimes) * 100)}%`;
      }
      results();
    } else {
      render();
    }
  }
}
//-----------------------------------renderFunction-----------------------------------------//
function render() {
  let leftIndex = randomNo(0, BusMall.items.length - 1);
  while (leftIndex === preLeftIndex || leftIndex === preMiddleIndex || leftIndex === preRightIndex) {
    leftIndex = randomNo(0, BusMall.items.length - 1);
  }
  left.src = BusMall.items[leftIndex].path;
  left.title = BusMall.items[leftIndex].name;
  left.alt = BusMall.items[leftIndex].name;
  let middleIndex = randomNo(0, BusMall.items.length - 1);
  while (middleIndex === leftIndex || middleIndex === preLeftIndex || middleIndex === preMiddleIndex || middleIndex === preRightIndex) {
    middleIndex = randomNo(0, BusMall.items.length - 1);
  }
  middle.src = BusMall.items[middleIndex].path;
  middle.title = BusMall.items[middleIndex].name;
  middle.alt = BusMall.items[middleIndex].name;
  let rightIndex = randomNo(0, BusMall.items.length - 1);
  while (rightIndex === leftIndex || rightIndex === middleIndex || rightIndex === preLeftIndex || rightIndex === preMiddleIndex || rightIndex === preRightIndex) {
    rightIndex = randomNo(0, BusMall.items.length - 1);
  }
  right.src = BusMall.items[rightIndex].path;
  right.title = BusMall.items[rightIndex].name;
  right.alt = BusMall.items[rightIndex].name;
  preLeftIndex = leftIndex;
  preMiddleIndex = middleIndex;
  preRightIndex = rightIndex;
  for (let i = 0; i < BusMall.items.length; i++) {
    switch (i) {
    case leftIndex:
    case middleIndex:
    case rightIndex:
      BusMall.items[i].showTimes++;
      break;
    default:
      break;
    }
  }
}
render();

function results() {
  const ulEl = document.createElement('ul');
  sec.appendChild(ulEl);
  for (let i = 0; i < BusMall.items.length; i++) {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${BusMall.items[i].name.toUpperCase()} had ${BusMall.items[i].votes} votes, and was shown ${BusMall.items[i].showTimes} times....it's liked by ${BusMall.items[i].avgLikes}`;
  }
}
function rendChart() {
  const ctx=document.getElementById('chart').getContext('2d');
  const names=[];
  const votes=[];
  const shown=[];
  const avg=[];
  for (let i = 0; i < BusMall.items.length; i++) {
    names.push(BusMall.items[i].name);
    votes.push(BusMall.items[i].votes);
    shown.push(BusMall.items[i].showTimes);
    avg.push(BusMall.items[i].avgLikes*100);
  }
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels:names,
      datasets: [{
        label:'votes#',
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 8,
        minBarLength: 2,
        data: votes
      },{
        label:'views#',
        barPercentage: 0.5,
        barThickness: 20,
        maxBarThickness: 8,
        minBarLength: 2,
        data: shown
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            offsetGridLines: true
          }
        }]
      }
    }
  });}
