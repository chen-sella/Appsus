import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const EMAIL_INBOX_KEY = 'email-inbox';
var gInbox = [
      {
        id: utilService.getRandId(),
        sender: 'Shmulik Cochav',
        subject: 'Hi There',
        body: 'How are you? Have a nice day',
        isRead: false,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['inbox', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Dana Levi',
        subject: 'Whatsup?',
        body: 'Hi there how are you today? I was wondering if you can please take the pages and show them to your boss, that will be amazing! thanks a lot! see you soon!',
        isRead: true,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['inbox']
      },
      {
        id: utilService.getRandId(),
        sender: 'Yoav Tal',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: false,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['sent', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Sharon Guttman',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting I will try to get there on time! If not please contact them and let them know.',
        isRead: true,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['trash']
      },
      {
        id: utilService.getRandId(),
        sender: 'Shiri',
        subject: 'Hi There',
        body: 'How are you? Have a nice day',
        isRead: false,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['inbox', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Or Rezen',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: true,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['inbox']
      },
      {
        id: utilService.getRandId(),
        sender: 'Ofek Shavit',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: false,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['sent', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Mika Eiluk',
        subject: 'Whatsup?',
        body: 'Hi there how are you today? I was wondering if you can please take the pages and show them to your boss, that will be amazing! thanks a lot! see you soon!',
        isRead: true,
        sentAt: Date.now(),
        color: utilService.getRandomColor(),
        folders: ['trash']
      }
];

export const emailService = {
  query,
  remove,
  save,
  getById,
  createNewEmail,
};

function addFolder(emailId) {
    getById(id)
    .then(email => {
        email.folders.push('starred')
        console.log('added folder to email:',email);
    })
}

function createNewEmail() {
  return {
    id: utilService.getRandId(),
    sender: '',
    subject: '',
    body: '',
    isRead: false,
    sentAt: Date.now(),
  };
}

function query() {
    let inbox = storageService.query(EMAIL_INBOX_KEY);
    if (!inbox || !inbox.length) {
        // inbox = gInbox;
        utilService.saveToStorage(EMAIL_INBOX_KEY, gInbox);
        inbox = storageService.query(EMAIL_INBOX_KEY);
    }
    console.log('getting inbox from storage:',inbox);
  return inbox;
}

function remove(emailId) {
  return storageService.remove(EMAIL_INBOX_KEY, emailId);
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAIL_INBOX_KEY, email);
  } else {
    return storageService.post(EMAIL_INBOX_KEY, email);
  }
}

function getById(id) {
  return storageService.get(EMAIL_INBOX_KEY, id);
}
