import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

export const noteService = {
  getNotes,
};

const NOTE_KEY = 'notesDB';

var gNotes = [
  {
    type: 'NoteTxt',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
    type: 'NoteImg',
    info: {
      url: 'http://some-img/me',
      title: 'Me playing Mi',
    },
    style: {
      backgroundColor: '#00d',
    },
  },
  {
    type: 'NoteTodos',
    info: {
      label: 'How was it:',
      todos: [
        { txt: 'Do that', doneAt: null },
        { txt: 'Do this', doneAt: 187111111 },
      ],
    },
  },
];

function getNotes() {
  const notesFromStorage = storageService.query(NOTE_KEY);
  if (notesFromStorage === []) {
    console.log('saving for the first time...');
    utilService.saveToStorage(NOTE_KEY, gNotes);
    notesFromStorage = utilService.loadFromStorage(NOTE_KEY);
  }
  console.log(notesFromStorage);
  return notesFromStorage;
}
