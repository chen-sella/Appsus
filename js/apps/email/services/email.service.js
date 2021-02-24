import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const EMAIL_INBOX_KEY = 'email-inbox';
var gInbox = [
      {
        id: '12CB35',
        sender: 'Shmulik',
        subject: 'Hi There',
        body: 'How are you? Have a nice day',
        isRead: false,
        sentAt: 1551133930594,
        folders: ['inbox', 'starred']
      },
      {
        id: '56SO98',
        sender: 'Dana',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: true,
        sentAt: 1551133934895,
        folders: ['inbox']
      },
      {
        id: '56SO04',
        sender: 'Yoav',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
        isRead: false,
        sentAt: 1551133934895,
        folders: ['sent', 'starred']
      },
      {
        id: '56SO95',
        sender: 'Sharon',
        subject: 'Whatsup?',
        body: 'Let me know when is the meeting',
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
