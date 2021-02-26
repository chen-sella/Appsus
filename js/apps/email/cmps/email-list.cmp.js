import emailPreview from './email-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  name: 'emailList',
  template: `
            <ul v-if="emailsTo"class="email-list-container">
              <li v-for="email in emails" :key="email.id" class="clean-list">
                <!-- <router-link :to="'/email/'+folder/+email.id"></router-link> -->
                <!-- <router-link :to="'/email/'+folder/+email.id"><email-preview :email="email" @sendStarEvent="shareStarEvent" @click.native="openDetails"/></router-link> -->
                <email-preview :email="email" @sendStarEvent="shareStarEvent" @click.native="openDetails" :folder="folder"></email-preview>
                <!-- <router-link :to="'/car/'+car.id">Details</router-link> -->
                <!-- <router-link :to="'/car/edit/'+car.id">Edit</router-link> -->
              </li>
            </ul>   
        `,
  data() {
    return {
      emails: null,
      folder: 'inbox',
      currEmailId: null,
      emailsTo: null,
    };
  },
  methods: {
    shareStarEvent(emailId, folderName) {
      this.currEmailId = emailId;
      eventBus.$emit('addFolder', emailId, folderName);
    },
    openDetails() {
      console.log('clicked the preview');
    },
  },
  computed: {},
  components: {
    emailPreview,
  },
  created() {
    this.emailsTo = this.$route.params.emails;
    console.log(this.$route.params.emails);
    eventBus.$on('allEmails', (emails) => {
      this.emails = emails.filter((email) => {
        return email.folders.includes(this.folder);
      });
    });
  },
  mounted() {
    eventBus.$on('emailsByFilter', (filteredMails) => {
      this.emails = filteredMails;
    });
    eventBus.$on('filtered', (folder) => {
      this.folder = folder;
    });
    eventBus.$on('emailsChanged', (emails) => {
      this.emails = emails.filter((email) => {
        return email.folders.includes(this.folder);
      });
    });
  },
};
