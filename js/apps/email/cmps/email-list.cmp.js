import emailPreview from './email-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';


export default {
    name: 'emailList',
    // props: ['emails','folder'],
    template: `
            <ul class="email-list-container">
              <li v-for="email in emails" :key="email.id" class="clean-list">
                <router-link :to="'/email/'+folder/+email.id"><email-preview :email="email" @sendStarEvent="shareStarEvent"/></router-link>
                <!-- <router-link :to="'/car/'+car.id">Details</router-link> -->
                <!-- <router-link :to="'/car/edit/'+car.id">Edit</router-link> -->

              </li>
            </ul>   
        `,
    data() {
      return {
        emails: null,
        folder: 'inbox',
      };
    },
    methods: {
      shareStarEvent(emailId, folderName) {
        eventBus.$emit('addFolder', emailId, folderName);
      },
    },
    computed: {
      
      
    },
    components: {
      emailPreview,
    },
    created() {
      eventBus.$on('allEmails', (emails) => {
        this.emails = emails.filter(email => {
          return email.folders.includes(this.folder)
      })
    })
    },
    mounted() {
      eventBus.$on('emailsByFilter', (filteredMails) => {
        this.emails = filteredMails;
    })
      eventBus.$on('filtered', (folder) => {
        this.folder = folder;
    })
      eventBus.$on('emailsChanged', (emails) => {
        this.emails = emails.filter(email => {
          return email.folders.includes(this.folder)
        })
      })
    }
  };
  