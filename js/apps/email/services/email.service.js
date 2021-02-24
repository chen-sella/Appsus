import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const EMAIL_INBOX_KEY = 'email-inbox';
var gInbox = [
      {
        id: utilService.getRandId(),
        sender: 'Shmulik',
        subject: 'Hi There',
        body: 'How are you? Have a nice day',
        isRead: false,
        sentAt: Date.now(),
        folders: ['inbox', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Dana',
        subject: 'Whatsup?',
        body: 'Hi there how are you today? I was wondering if you can please take the pages and show them to your boss, that will be amazing! thanks a lot! see you soon!',
        isRead: true,
        sentAt: Date.now(),
        folders: ['inbox']
      },
      {
        id: utilService.getRandId(),
        sender: 'Yoav',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: false,
        sentAt: Date.now(),
        folders: ['sent', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Sharon',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting I will try to get there on time! If not please contact them and let them know.',
        isRead: true,
        sentAt: Date.now(),
        folders: ['trash']
      },
      {
        id: utilService.getRandId(),
        sender: 'Shiri',
        subject: 'Hi There',
        body: 'How are you? Have a nice day',
        isRead: false,
        sentAt: 1551133930594,
        folders: ['inbox', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Or',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: true,
        sentAt: 1551133934895,
        folders: ['inbox']
      },
      {
        id: utilService.getRandId(),
        sender: 'Ofek',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: false,
        sentAt: 1551133934895,
        folders: ['sent', 'starred']
      },
      {
        id: utilService.getRandId(),
        sender: 'Mika',
        subject: 'Whatsup?',
        body: 'Hi there how are you today? I was wondering if you can please take the pages and show them to your boss, that will be amazing! thanks a lot! see you soon!',
        isRead: true,
        sentAt: 1551133934895,
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
