import { emailService } from '../services/email.service.js';
export default {
  name: 'emailDetails',
  template: `
          <section class="email-details-container">
            <h1>Details page</h1>
          <!-- <div class="flex align-center">
                <div class="name-circle flex align-center justify-center" :style="setBackground">{{nameInitials}}</div>
                <div class="email-preview-details flex column space-between">
                  <h4 :class="toggleBold">{{email.mailInfo.sender}}</h4>
                  <h4 :class="toggleBold">{{email.subject}}</h4>
                  <p v-if="!isLongText">{{email.body}}</p>
                  <long-text v-else-if="isLongText" :txt="email.body" :length="length"/>
                </div>
              </div> -->
          </section>
          `,
  data() {
    return {};
  },
  methods: {},
  computed: {
    setBackground() {
      return {backgroundColor: this.email.color};
    },
    nameInitials() {
      const name = this.email.mailInfo.sender;
      const firstNameLetter = name.charAt(0).toUpperCase();
      if (!name.includes(' ')) return firstNameLetter;
      else {const lastNameLetter = name.substr(name.indexOf(' ')+1, 1).toUpperCase();
      return `${firstNameLetter}${lastNameLetter}`};
    },
  },
  components: {},
};
