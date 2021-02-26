import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailSideNav from '../cmps/email-side-nav.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
  name: 'emailApp',
  template: `
          <section class="email-app-container flex app-main main-container">
            <section class="side-menu-container flex column">
              <!-- <router-link :to="linkToCompose" tag="button" class="compose-btn flex align-center" @click.native="compose = true"><i class="fas fa-plus compose-icon"></i>Compose</router-link> -->
              <button class="compose-btn flex align-center" @click="compose = true"><i class="fas fa-plus compose-icon"></i>Compose</button>
              <email-side-nav :folders="folders"/>
              <!-- <email-side-nav @filtered="setFilter" :folders="folders" :filteredMails="mailsToShow" @getFolder="setFolder"/> -->
            </section>
            <router-view></router-view>
            <email-compose v-if="compose" @onAddMail="addNewMail" @closeCompose="compose = false"></email-compose> 
            <!-- <router-view v-if="emails && compose === false" :folders="folders" :folder="currFolder" :emails="mailsToShow" @addFolder="updateFolder"></router-view> -->


            <!-- <email-compose v-if="compose" @closeCompose="toggleCompose" @onAddMail="addNewMail"/> -->
            <!-- <email-list v-if="emails && compose === false" :emails="mailsToShow" @addFolder="updateFolder" @emailClicked="openDetails"/> -->
            <!-- <router-view to="/email/:folder/:emailId" v-if="currMail"></router-view> -->
            <!-- <email-details v-if="currMail"/> -->
          </section>  
        `,
  data() {
    return {
      folders: null,
      compose: null,
      // emails: null,
      // currFolder: 'inbox',
      // currMail: null,
      // currMailId: null,
      // emailsToShow: null,
    };
  },
  methods: {
    // loadEmails() {
    //   emailService.query()
    //       .then(emails => {
    //         this.emails = emails
    //         // const inboxMails = this.mailsToShow();
    //         eventBus.$emit('allEmails', emails);
    //       })
    // },

    getFolders() {
      this.folders = emailService.getFolders()
    },

    // setFilter(filterBy) {
    //   this.currFolder = filterBy;
    //   this.mailsToShow();
    // },
  //   mailsToShow() {
  //     this.emailsToShow = this.emails.filter(email => {
  //         return email.folders.includes(this.currFolder)
  //     })
  //     eventBus.$emit('emailsByFilter', this.emailsToShow);
  //     return this.emailsToShow;
  // },
 
    addNewMail(emailInfo) {
      emailService.createNewEmail(emailInfo)
      .then((emails) => {
        console.log('emails',emails);
        this.compose = false;
        console.log('heared');
        eventBus.$emit('storageUpdated');
      })
    },
    
  },
  // computed: {
  //   linkToCompose() {
  //     return `/email/${this.currFolder}/compose`;
  //   }
  // },
  created() {
    // this.loadEmails();
    this.getFolders();
  },
  mounted() {
    // eventBus.$on('addFolder', (emailId, folderName) => {
    //   this.updateFolder(emailId, folderName);
    // });
    eventBus.$on('onAddMail', (newEmail) => {
      this.addNewMail(newEmail);
  });
  // eventBus.$on('mailRead', (email) => {
  //   return emailService.updateIsRead(email)
  //   .then(emails => {
  //    this.emails = emails;
  //   }).then(() => eventBus.$emit('emailsChanged', emails))

  //   })
  },
  components: {
    emailSideNav,
    emailCompose,
  },
};
