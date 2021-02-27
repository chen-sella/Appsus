import { emailService } from '../services/email.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import emailSideNav from '../cmps/email-side-nav.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
  name: 'emailApp',
  template: `
          <section class="email-app-container flex app-main main-container">
            <div v-if="isSideMenuOpen" class="main-screen" @click.stop="isSideMenuOpen = false"></div>
            <section class="side-menu-container flex column" :style="onMobileStyle">
              <button class="compose-btn flex align-center" @click="compose = !compose"><i class="fas fa-plus compose-icon"></i>Compose</button>
              <email-side-nav :folders="folders"/>
            </section>
            <button class="compose-btn-mobile" @click="compose = !compose"><i class="fas fa-plus compose-icon"></i></button>
            <router-view></router-view>
            <email-compose v-if="compose" @onAddMail="addNewMail" @closeCompose="compose = false"></email-compose> 
          </section>  
        `,
  data() {
    return {
      folders: null,
      compose: null,
      isSideMenuOpen: false,
      isScreenShown: false,
    };
  },
  computed: {
    onMobileStyle() {
      if (!this.isSideMenuOpen) {
        return {backgroundColor: 'red', left: -200 + 'px'}
      }  
    }

  },
  methods: {
    getFolders() {
      this.folders = emailService.getFolders()
    },
    addNewMail(emailInfo) {
      emailService.createNewEmail(emailInfo)
      .then((emails) => {
        this.compose = false;
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

  eventBus.$on('clickedMenu', () => {
    this.isSideMenuOpen = !this.isSideMenuOpen;
    console.log('this.isSideMenuOpen',this.isSideMenuOpen);
  })
  },
  components: {
    emailSideNav,
    emailCompose,
  },
};
