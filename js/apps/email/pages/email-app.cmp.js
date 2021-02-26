import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailSideNav from '../cmps/email-side-nav.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
  name: 'emailApp',
  template: `
          <section class="email-app-container flex app-main main-container">
            <section class="side-menu-container flex column">
              <button class="compose-btn flex align-center" @click="compose = !compose"><i class="fas fa-plus compose-icon"></i>Compose</button>
              <email-side-nav :folders="folders"/>
            </section>
            <router-view></router-view>
            <email-compose v-if="compose" @onAddMail="addNewMail" @closeCompose="compose = false"></email-compose> 
          </section>  
        `,
  data() {
    return {
      folders: null,
      compose: null,
    };
  },
  methods: {
    getFolders() {
      this.folders = emailService.getFolders()
    },
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
  created() {
    this.getFolders();
  },
  mounted() {
    eventBus.$on('onAddMail', (newEmail) => {
      this.addNewMail(newEmail);
  });
  },
  components: {
    emailSideNav,
    emailCompose,
  },
};
