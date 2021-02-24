import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

export const noteService = {
  getNotes,
};

const NOTE_KEY = 'notesDB';

var gNotes = [
  {
    type: 'noteTxt',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
    type: 'noteImg',
    info: {
      url: '/img/Layer 2@1X.png',
      title: 'Me playing Mi',
    },
    style: {
      backgroundColor: '#00d',
    },
  },
  {
    type: 'noteTodos',
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
