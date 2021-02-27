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
  changePinnState,
  updateTxt,
};

const NOTE_KEY = 'notesDB';

var gNotes = [
  {
    id: utilService.getRandId(4),
    type: 'noteTxt',
    isPinned: false,
    info: {
      title: 'Amazing note',
      txt: 'Fullstack Me Baby!',
    },
    style: { backgroundColor: '#AECBFA', borderColor: '#AECBFA' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteImg',
    isPinned: false,
    info: {
      url: 'img/vacation.jpg',
      title: 'My Perfect Vacation',
    },
    style: { backgroundColor: '#F28B83', borderColor: '#F28B83' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteTodos',
    isPinned: false,
    info: {
      title: 'Chores for next week:',
      todos: [
        { txt: 'Buy new clothes', doneAt: null },
        { txt: 'Pay private trainer', doneAt: 187111111 },
        { txt: 'Do Laundry', doneAt: null },
      ],
    },
    style: { backgroundColor: 'white', borderColor: '#8080809e' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteImg',
    isPinned: false,
    info: {
      url: 'img/cat.jpg',
      title: 'Cat',
    },
    style: { backgroundColor: '#FCBC02', borderColor: '#FCBC02' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteTodos',
    isPinned: true,
    info: {
      title: 'Chores for Leetal:',
      todos: [
        { txt: 'Take put the dogs', doneAt: 187111111 },
        { txt: 'Do not spill coffee', doneAt: null },
        { txt: 'Rest', doneAt: null },
        { txt: 'Be Amazing', doneAt: 187111111 },
        { txt: 'Send some emails', doneAt: null },
      ],
    },
    style: { backgroundColor: '#CCFF90', borderColor: '#CCFF90' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteTxt',
    isPinned: false,
    info: {
      title: 'Note',
      txt:
        'I want this text note to be bigger then the others so im writing all of the text down and lets see how it goes',
    },
    style: { backgroundColor: '#FDCFE8', borderColor: '#FDCFE8' },
  },
  {
    id: utilService.getRandId(4),
    type: 'noteImg',
    isPinned: false,
    info: {
      url: 'img/plants.jpg',
      title: 'Good Morning',
    },
    style: { backgroundColor: 'white', borderColor: '#8080809e' },
  },
];

function getNotes() {
  return storageService.query(NOTE_KEY).then((entities) => {
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
      title: '',
    };
  }
  if (type === 'noteTodos') {
    info = {
      title: '',
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
  console.log({ note });
  return storageService.post(NOTE_KEY, note).then(() => {
    return storageService.query(NOTE_KEY);
  });
}

function deleteNote(noteId) {
  return storageService.remove(NOTE_KEY, noteId).then(() => {
    return storageService.query(NOTE_KEY);
  });
}

function changePinnState(noteId) {
  return getNoteById(noteId).then((note) => {
    note.isPinned = !note.isPinned;
    return storageService.put(NOTE_KEY, note).then(() => {
      return storageService.query(NOTE_KEY);
    });
  });
}

function updateTxt(newNote, noteId, type) {
  return getNoteById(noteId).then((note) => {
    if (type === 'noteTxt') {
      note.info.txt = newNote.txt;
      note.info.title = newNote.title;
    }
    if (type === 'noteTodos') {
      note.info.title = newNote.title;
      note.info.todos = newNote.todos;
    }
    if(type === 'noteImg'){
      note.info.title = newNote;
    }
    return storageService.put(NOTE_KEY, note).then(() => {
      return storageService.query(NOTE_KEY);
    });
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
