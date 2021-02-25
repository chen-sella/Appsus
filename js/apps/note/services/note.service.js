import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';
import { eventBus } from '../../../services/event-bus.service.js';

export const noteService = {
  getNotes,
  updateColor,
  getColors,
  // onImgInput,
  newNote,
  postNote,
  deleteNote,
};

var gImg;
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
  {
    id: utilService.getRandId(4),
    type: 'noteImg',
    info: {
      url: '/img/Layer 4@1X.png',
      title: 'Amazing Times',
    },
    style: { backgroundColor: 'white', borderColor: '#8080809e' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteTodos',
    info: {
      label: 'Chores for Leetal:',
      todos: [
        { txt: 'Take put the dogs', doneAt: 187111111 },
        { txt: 'Do not spill coffe', doneAt: null },
        { txt: 'Rest', doneAt: null },
        { txt: 'Be Amazing', doneAt: 187111111 },
        { txt: 'Send some emails', doneAt: null },
      ],
    },
    style: { backgroundColor: 'white', borderColor: '#8080809e' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteTxt',
    isPinned: true,
    info: {
      txt:
        'I want this text note to be bigger then the others so im writing all of the text down and lets see how it goes',
    },
  },
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
  return utilService.getColors();
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
  return {
    type,
    info,
    isPinned: false,
    style: { backgroundColor: 'white', borderColor: '#8080809e' },
  };
}

function postNote(note) {
  return storageService.post(NOTE_KEY, note).then(() => {
    return storageService.query(NOTE_KEY);
  });
}

function deleteNote(noteId) {
  return storageService.remove(NOTE_KEY, noteId).then(() => {
    return storageService.query(NOTE_KEY);
  });
}

// function onImgInput(ev) {
//   console.log(ev);
//   loadImageFromInput(ev, returnImg);
//   setTimeout(() => {
//     return gImg.src;
//   }, 3000);
// }

// function loadImageFromInput(ev, onImageReady) {
//   var reader = new FileReader();

//   reader.onload = (event) => {
//     var img = new Image();
//     img.onload = onImageReady.bind(null, img);
//     img.src = event.target.result;
//     gImg = img;
//   };
//   reader.readAsDataURL(ev.target.files[0]);
// }

// function returnImg() {
//   console.log(gImg.src);
// }
