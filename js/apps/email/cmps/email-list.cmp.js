import { eventBus } from '../../../services/event-bus.service.js';
import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js';
import emailFilter from './email-filter.cmp.js';

export default {
  name: 'emailList',
  template: `
          <section class="email-list-container flex column">
            <email-filter @strSortBy="sortByStr" @readSortBy="sortByRead"></email-filter>
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
      folder: 'inbox',
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
    },
    sortByStr(isRead) {
      console.log('sorting by isRead...');
    },
    mailsToShow() {
      const emailsToShow = this.emails.filter((email) => {
        return email.folders.includes(this.folder);
      });
      this.emailsToShow = emailsToShow;
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
      console.log('this.folder',this.folder);
      this.mailsToShow();
    },
  },
  created() {
    this.loadEmails();
  },
  mounted() {
    eventBus.$on('storageUpdated', () => {
      console.log('got new email');
      this.loadEmails();
    })
  },
  components: {
    emailPreview,
    emailFilter,
  },
};
