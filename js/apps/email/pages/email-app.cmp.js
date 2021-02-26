import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailSideNav from '../cmps/email-side-nav.cmp.js';

export default {
  name: 'emailApp',
  template: `
          <section class="email-app-container flex app-main main-container">
            <section class="side-menu-container flex column">
              <router-link to="/email/compose" tag="button" class="compose-btn flex align-center"><i class="fas fa-plus compose-icon"></i>Compose</router-link>
              <!-- <router-link tag="button" class="compose-btn" :to="'/email/compose'"><i class="fas fa-plus compose-icon"></i>Compose</router-link> -->
              <email-side-nav @filtered="setFilter" :folders="folders"/>
              <!-- <email-side-nav @filtered="setFilter" :folders="folders" :filteredMails="mailsToShow" @getFolder="setFolder"/> -->
            </section>
            <router-view></router-view>
            <!-- <router-view v-if="compose" @closeCompose="toggleCompose" @onAddMail="addNewMail"></router-view>  -->
            <!-- <router-view v-if="emails && compose === false" :folders="folders" :folder="currFolder" :emails="mailsToShow" @addFolder="updateFolder"></router-view> -->


            <!-- <email-compose v-if="compose" @closeCompose="toggleCompose" @onAddMail="addNewMail"/> -->
            <!-- <email-list v-if="emails && compose === false" :emails="mailsToShow" @addFolder="updateFolder" @emailClicked="openDetails"/> -->
            <!-- <router-view to="/email/:folder/:emailId" v-if="currMail"></router-view> -->
            <!-- <email-details v-if="currMail"/> -->
          </section>  
        `,
  data() {
    return {
      emails: null,
      folders: null,
      currFolder: 'inbox',
      currMail: null,
      // currMailId: null,
      emailsToShow: null,
    };
  },
  methods: {
    loadEmails() {
      emailService.query()
          .then(emails => {
            this.emails = emails
            // const inboxMails = this.mailsToShow();
            eventBus.$emit('allEmails', emails);
          })
    },

    getFolders() {
      this.folders = emailService.getFolders()
    },

    setFilter(filterBy) {
      this.currFolder = filterBy;
      this.mailsToShow();
    },
    mailsToShow() {
      this.emailsToShow = this.emails.filter(email => {
          return email.folders.includes(this.currFolder)
      })
      eventBus.$emit('emailsByFilter', this.emailsToShow);
      return this.emailsToShow;
  },
    updateFolder(emailId, folderName) {
      emailService.toggleEmailFolder(emailId, folderName)
      .then(emails => {
        this.emails = emails;
        eventBus.$emit('emailsChanged', this.emails);
      });
    },
 
    addNewMail(emailInfo) {
      return emailService.createNewEmail(emailInfo)
      .then(emails => {
        this.emails = emails
        this.compose = false;
      });
    },
    // setFolder(folder) {
    //   this.currFolder = folder;
    // },
    
  },
  computed: {
  },
  created() {
    this.loadEmails();
    this.getFolders();
  },
  mounted() {
    eventBus.$on('addFolder', (emailId, folderName) => {
      this.updateFolder(emailId, folderName);
    });
    eventBus.$on('onAddMail', (newEmail) => {
      this.addNewMail(newEmail);
  });
  },
  components: {
    emailSideNav,
  },
};
