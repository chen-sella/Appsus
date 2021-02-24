import longText from '../../../cmps/long-text.cmp.js';
export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
            <section class="email-preview-container flex">
              <div class="name-circle"></div>
              <div class="email-preview-details flex column space-between">
                <h4>{{email.sender}}</h4>
                <h4>{{email.subject}}</h4>
                <p v-if="!isLongText">{{email.body}}</p>
                <long-text v-else-if="isLongText" :txt="email.body" :length="40"/>
              </div>
              <p class="email-time">{{formattedTime}}</p>
            </section>
        `,
    data() {
      return {
        isLongText: false,
      };
    },
    methods: {
      checkTxtLength() {
        this.isLongText = (this.email.body.length > 40) ? true : false;
      },
    },
    computed: {
      formattedTime() {
        return new Date(this.email.sentAt).toLocaleTimeString();
      }
    },
    created() {
      this.checkTxtLength();
    },
    components: {
      longText,
    },
  };
  