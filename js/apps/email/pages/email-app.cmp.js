import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailSideNav from '../cmps/email-side-nav.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
  name: 'emailApp',
  template: `
          <section class="email-app-container flex app-main">
            <section class="side-menu-container flex column align-center">
              <button class="compose-btn" @click="toggleCompose"><i class="fas fa-plus compose-icon"></i>Compose</button>
              <!-- <email-compose /> -->
              <!-- <router-link tag="button" class="compose-btn" :to="'/email/compose'"><i class="fas fa-plus compose-icon"></i>Compose</router-link> -->
              <email-side-nav @filtered="setFilter" @callCloseCompose="closeCompose"/>
            </section>
            <email-compose v-if="compose" @closeCompose="toggleCompose" @onAddMail="addNewMail"/>
            <email-list v-if="emails && compose === false" :emails="mailsToShow" @addFolder="updateFolder"/>
          </section>  
        `,
  data() {
    return {
      emails: null,
      currFolder: 'inbox',
      compose: false,
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
    },
    toggleCompose() {
      this.compose = !this.compose;
    },
    closeCompose() {
      this.compose = false;
    },
    addNewMail(emailInfo) {
      return emailService.createNewEmail(emailInfo)
      .then(emails => {
        this.emails = emails
        this.compose = false;
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
    emailSideNav,
    emailCompose,
  },
  created() {
    this.loadEmails();

  },
};
