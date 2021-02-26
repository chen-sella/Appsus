import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async.storage.service.js';

const EMAIL_KEY = 'emails';
var gEmails = [
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Shmulik Cochav',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Hi There',
    body: 'How are you? Have a nice day',
    isRead: false,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['inbox', 'starred'],
  },
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Dana Levi',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Whatsup?',
    body:
      'Hi there how are you today? I was wondering if you can please take the pages and show them to your boss, that will be amazing! thanks a lot! see you soon!',
    isRead: true,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['inbox'],
  },
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Yoav Tal',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Whatsup?',
    body: 'Let me know when is the meeting',
    isRead: false,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['sent', 'starred'],
  },
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Sharon Guttman',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Whatsup?',
    body:
      'Let me know when is the meeting I will try to get there on time! If not please contact them and let them know.',
    isRead: true,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['trash'],
  },
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Shiri',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Hi There',
    body: 'How are you? Have a nice day',
    isRead: false,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['inbox', 'starred'],
  },
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Or Rezen',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Whatsup?',
    body: 'Let me know when is the meeting',
    isRead: true,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['inbox'],
  },
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Ofek Shavit',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Whatsup?',
    body: 'Let me know when is the meeting',
    isRead: false,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['sent', 'starred'],
  },
  {
    id: utilService.getRandId(),
    mailInfo: {
      sender: 'Mika Eiluk',
      sendTo: '',
      cc: '',
      bcc: '',
    },
    subject: 'Whatsup?',
    body:
      'Hi there how are you today? I was wondering if you can please take the pages and show them to your boss, that will be amazing! thanks a lot! see you soon!',
    isRead: true,
    sentAt: Date.now(),
    color: utilService.getRandBackground(),
    folders: ['trash'],
  },
];

const folders = ['inbox', 'starred', 'sent', 'trash'];

export const emailService = {
  query,
  remove,
  save,
  getById,
  createNewEmail,
  toggleEmailFolder,
  getFolders,
  updateIsRead,
};

function getFolders() {
  console.log('getting folders from service...');
  return folders;
}

function updateIsRead(email) {
  email.isRead = true;
  return save(email).then((email) => {
    console.log('email', email);
    return query().then((emails) => {
      return emails;
    });
  });
}

function toggleEmailFolder(emailId, folderName) {
  return getById(emailId).then((email) => {
    if (email.folders.includes(folderName)) {
      const folderIdx = email.folders.findIndex((folder) => {
        return folder === folderName;
      });
      email.folders.splice(folderIdx, 1);
    } else {
      email.folders.push(folderName);
    }
    return storageService.put(EMAIL_KEY, email).then(() => {
      return storageService.query(EMAIL_KEY).then((emails) => {
        return emails;
      });
    });
  });
}

function createNewEmail(emailInfo) {
  emailInfo.id = utilService.getRandId();
  emailInfo.sender = 'David Cohen';
  emailInfo.isRead = false;
  emailInfo.sentAt = Date.now();
  emailInfo.color = utilService.getRandBackground();
  emailInfo.folders = ['inbox'];

  console.log('new full email:', emailInfo);
  return storageService.post(EMAIL_KEY, emailInfo).then(() => {
    return storageService.query(EMAIL_KEY).then((emails) => {
      console.log('emails', emails);
      return emails;
    });
  });
}

function query() {
  let inbox = storageService.query(EMAIL_KEY);
  if (!inbox || !inbox.length) {
    // inbox = gInbox;
    utilService.saveToStorage(EMAIL_KEY, gEmails);
    inbox = storageService.query(EMAIL_KEY);
  }
  return inbox;
}

function remove(emailId) {
  return storageService.remove(EMAIL_KEY, emailId);
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAIL_KEY, email);
  } else {
    return storageService.post(EMAIL_KEY, email);
  }
}

function getById(id) {
  return storageService.get(EMAIL_KEY, id);
}
