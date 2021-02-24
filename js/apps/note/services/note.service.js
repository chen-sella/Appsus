import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

export const noteService = {
  getNotes,
  updateColor,
  getColors,
  onImgInput,
  newNote
};

const NOTE_KEY = 'notesDB';

var gNotes = [
  {
    id: utilService.getRandId(4),
    type: 'noteTxt',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteImg',
    info: {
      url: '/img/Layer 2@1X.png',
      title: 'My Perfect Vacation',
    },
    style: {
      backgroundColor: '#F28B83',
    },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteTodos',
    info: {
      label: 'Chores for next week:',
      todos: [
        { txt: 'Buy new clothes', doneAt: null },
        { txt: 'Pay private trainer', doneAt: 187111111 },
        { txt: 'Do Laundry', doneAt: null },
      ],
    },
  },
  // {
  //   type: 'noteVideo',
  //   info: {
  //     url: '/img/html5.gif',
  //     title: 'My Perfect Vacation',
  //   },
  // },
];

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

function getNotes() {
  return storageService.query(NOTE_KEY).then((entities) => {
    console.log(entities);
    if (entities.length === 0) {
      console.log('saving for the first time...');
      utilService.saveToStorage(NOTE_KEY, gNotes);
      entities = utilService.loadFromStorage(NOTE_KEY);
    }
    console.log(entities);
    return Promise.resolve(entities);
  });
}

function getNoteById(noteId) {
  return storageService.get(NOTE_KEY, noteId);
}

function updateColor(color, noteId) {
  console.log('coloris:', color);
  return getNoteById(noteId).then((note) => {
    if (note.style) {
      note.style.backgroundColor = color.backgroundColor;
      note.style.borderColor = color.borderColor;
    } else {
      note.style = color;
    }
    return storageService.put(NOTE_KEY, note);
  });
}

function getColors() {
  return gColors;
}

function onImgInput(ev) {
  console.log(ev);
  loadImageFromInput(ev, console.log('img'));
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImg = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function newNote(type) {
  var info;
  if (type === 'noteTxt') {
    info = {
      txt: '',
    };
  }
  if (type === 'noteTodos') {
    info = {
      label: '',
      todos: [],
    };
  }
  if (type === 'noteImg') {
    info = {
      url: '',
      title: '',
    };
  }
  return {info};
}
