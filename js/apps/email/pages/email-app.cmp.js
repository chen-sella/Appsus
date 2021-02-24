import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';

export default {
  name: '',
  template: `
          <section>
            <email-list :emails="emails"/>
          </section>  
        `,
  data() {
    return {
      emails: null,
    };
  },
  methods: {
    loadEmails() {
      emailService.query()
          .then(emails => this.emails = emails)
  },
  },
  computed: {},
  components: {
    emailList,
  },
  created() {
    this.loadEmails();
  }
};
