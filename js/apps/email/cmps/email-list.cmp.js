import { eventBus } from '../../../services/event-bus.service.js';
import { emailService } from '../services/email.service.js';
import emailPreview from './email-preview.cmp.js';

export default {
  name: 'emailList',
  template: `
            <ul v-if="emails"class="email-list-container">
              <li v-for="email in emailsToShow" :key="email.id" class="clean-list">
                <email-preview :email="email" @sendStarEvent="updateFolder" @click.native="openDetails(email.id)" :folder="folder"></email-preview>
              </li>
            </ul>   
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
    mailsToShow() {
      const emailsToShow = this.emails.filter((email) => {
        return email.folders.includes(this.folder);
      });
      this.emailsToShow = emailsToShow;
    },
    openDetails(emailId) {
      this.$router.push(`/email/${this.folder}/${emailId}`);
    },
    changeIsRead() { ///this function needs to be called after closing details
      console.log('clicked the preview');
      emailService.updateIsRead(emailId)
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
    },
    
      
  },
  components: {
    emailPreview,
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
  }
};
