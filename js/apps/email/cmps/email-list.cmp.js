import { eventBus } from '../../../services/event-bus.service.js';
import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js';
import emailFilter from './email-filter.cmp.js';

export default {
  name: 'emailList',
  template: `
          <section class="email-list-container flex column">
            <email-filter @strSortBy="sortByStr" @readSortRead="sortByRead"></email-filter>
            <ul v-if="emails" class="email-list">
              <li v-for="email in emailsToShow" :key="email.id" class="clean-list">
                <email-preview :email="email" @sendStarEvent="updateFolder" @click.native="openDetails(email.id)" :folder="folder"></email-preview>
              </li>
            </ul>  
          </section> 
        `,
  data() {
    return {
      emails: null,
      folder: null,
      emailsToShow: null,
      currEmailId: null,
    };
  },
  methods: {
    loadEmails() {
      emailService.query().then((emails) => {
        this.emails = emails;
        this.mailsToShow();
      });
    },
    sortByStr(str) {
      console.log('sorting by str...');
      const searchStr = str.toLowerCase();
      const filteredEmails = this.emails.filter(email => {
        return (email.mailInfo.sender.toLowerCase().includes(searchStr) ||
                email.subject.toLowerCase().includes(searchStr) ||
                email.body.toLowerCase().includes(searchStr))
      })
      console.log('filteredEmails by str:',filteredEmails);
      this.emailsToShow = filteredEmails;
    },
    sortByRead(isRead) {
      let emailsToShow;
      if (isRead === 'all') {
        return this.emailsToShow = this.emails;
      }
      else if (isRead === 'read') isRead = true;
      else if (isRead === 'unread') isRead = false;
      emailsToShow = this.emails.filter((email) => {
        return email.isRead === isRead;
      });
      
      console.log('emailsToShow from isRead:',this.emailsToShow);
      this.emailsToShow = emailsToShow;
    },
    mailsToShow() {
      const showByFolder = this.emails.filter((email) => {
        return email.folders.includes(this.folder);
      });
      this.emailsToShow = showByFolder;
    },
    openDetails(emailId) {
      this.$router.push(`/email/${this.folder}/${emailId}`);
      this.changeIsRead(emailId);
    },
    changeIsRead(emailId) { 
      console.log('clicked the preview');
      emailService.updateIsRead(emailId, false)
      .then(emails => {
       this.emails = emails;
       this.mailsToShow();
      })
    },
    updateFolder(emailId, folderName) {
      emailService.toggleEmailFolder(emailId, folderName)
      .then(emails => {
        this.emails = emails;
        this.mailsToShow();
      });
    }  
  },
  watch: {
    '$route.params.folder'(folder) {
      this.folder = folder;
      this.mailsToShow();
    },
  },
  created() {
    this.folder = (this.$route.params.folder) ? this.$route.params.folder : 'inbox';
    this.loadEmails();
  },
  mounted() {
    eventBus.$on('storageUpdated', () => {
      this.loadEmails();
    })
  },
  components: {
    emailPreview,
    emailFilter,
  },
};
