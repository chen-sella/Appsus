import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailSideNav from '../cmps/email-side-nav.cmp.js';
import { utilService } from '../../../services/util.service.js';

export default {
  name: 'emailApp',
  template: `
          <section class="email-app-container flex app-main">
            <email-side-nav @filtered="setFilter"/>
            <email-list v-if="emails" :emails="mailsToShow" @addFolder="updateFolder"/>
          </section>  
        `,
  data() {
    return {
      emails: null,
      currFolder: 'inbox',
    };
  },
  methods: {
    loadEmails() {
      emailService.query()
          .then(emails => {
            this.emails = emails
          })
    },
    setFilter(filterBy) {
      this.currFolder = filterBy;
    },
    updateFolder(emailId, folderName) {
      emailService.toggleEmailFolder(emailId, folderName)
      .then(emails => {
        this.emails = emails
      });
    }
  },
  computed: {
    mailsToShow() {
      const emailsToShow = this.emails.filter(email => {
          return email.folders.includes(this.currFolder)
      })
      return emailsToShow;
  }
  },
  components: {
    emailList,
    emailSideNav
  },
  created() {
    this.loadEmails();
  }
};
