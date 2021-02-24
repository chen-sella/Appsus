import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

export const noteService = {
  getNotes,
  updateColor
};

const NOTE_KEY = 'notesDB';

var gNotes = [
  {
    id:utilService.getRandId(4),
    type: 'noteTxt',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
    id:utilService.getRandId(4),
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
    id:utilService.getRandId(4),
    type: 'noteTodos',
    info: {
      label: 'Chores for next week:',
      todos: [
        { txt: 'Buy new clothes', doneAt: null },
        { txt: 'Pay private trainer', doneAt: 187111111 },
        { txt: 'Do Laundry', doneAt: null}
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

function getNoteById(noteId){
  return storageService.get(NOTE_KEY, noteId);
}

function updateColor(color, noteId){
  return getNoteById(noteId).then((note) => {
    note.style.backgroundColor = color;
    return storageService.put(NOTE_KEY, note);
  });

}
