export const utilService = {
  getRandId,
  saveToStorage,
  loadFromStorage,
  getRandomColor,
  getColors
};

var gColors = [
  { backgroundColor: '#F28B83', borderColor: '#F28B83' },
  { backgroundColor: '#FCBC02', borderColor: '#FCBC02' },
  { backgroundColor: '#FFF475', borderColor: '#FFF475' },
  { backgroundColor: '#CCFF90', borderColor: '#CCFF90' },
  { backgroundColor: '#A7FFEB', borderColor: '#A7FFEB' },
  { backgroundColor: '#CBF0F8', borderColor: '#CBF0F8' },
  { backgroundColor: '#AECBFA', borderColor: '#AECBFA' },
  { backgroundColor: '#D7AEFB', borderColor: '#D7AEFB' },
  { backgroundColor: '#FDCFE8', borderColor: '#FDCFE8' },
  { backgroundColor: '#E6C9A8', borderColor: '#E6C9A8' },
  { backgroundColor: '#E8EAED', borderColor: '#E8EAED' },
  { backgroundColor: 'white', borderColor: '#8080809e' },
];

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getRandId(length = 11) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getColors(){
  return gColors;
}