import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailSideNav from '../cmps/email-side-nav.cmp.js';

export default {
  name: 'emailApp',
  template: `
          <section class="email-app-container flex app-main">
            <email-side-nav @filtered="setFilter"/>
            <email-list v-if="emails" :emails="mailsToShow"/>
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
            console.log('this.emails',this.emails);
          })
    },
    setFilter(filterBy) {
      this.currFolder = filterBy;
      console.log('this.currFolder',this.currFolder);
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
