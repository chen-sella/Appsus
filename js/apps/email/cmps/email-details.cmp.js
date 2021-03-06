import { eventBus } from '../../../services/event-bus.service.js';
import { emailService } from '../services/email.service.js';

export default {
  name: 'emailDetails',
  template: `
          <section v-if="email" class="email-details-container">
            <div class="header-btns-container flex space-between align-center">
              <router-link :to="goBack" class="back-arrow">&#8592;</router-link>
              <div class="flex align-center">
                <a href="#" @click="markAsUnread"><i class="far fa-envelope unread-icon"></i></a>
                <a v-if="!isInTrash" href="#" @click="deleteMail"><i class="fas fa-trash-alt trash-icon"></i></a>
                <a v-if="isInTrash" href="#" @click="unDeleteMail"><i class="fas fa-trash-restore-alt trash-icon"></i></a>
              </div>
            </div>
            <div class="header-info-container flex align-center space-between">
              <div class="flex align-center">
                <div class="name-circle flex align-center justify-center" :style="setBackground">{{nameInitials}}</div>
                <div class="name-info flex column">
                  <h4>{{email.subject}}</h4>
                  <h4>{{email.mailInfo.sender}}</h4>
                </div>
              </div>
              <div class="reply-container flex align-center space-between">
                <p class="email-time">{{formattedTime}}</p>
                <img :src="changeStar" class="star-img" @click="toggleStarred">
                <a href="#"><i class="fas fa-reply"></i></a>
              </div>
            </div>
            <div class="body-container flex column space-between">
              <p>{{email.body}}</p>
              <div class="bottom-btns-container flex justify-start align-center">
                <button>Reply</button>
                <button>Forward</button>
              </div>
            </div>
          </section>
          `,
  data() {
    return {
      emailId: null,
      email: null,
      folder: null,
      isInTrash: false,
    };
  },
  methods: {
    toggleStarred() {
      const folderName = 'starred';
      emailService
        .toggleEmailFolder(this.emailId, folderName)
        .then(() => {
          return emailService.getById(this.emailId);
        })
        .then((email) => (this.email = email));
    },
    markAsUnread() {
      emailService.updateIsRead(this.emailId, true).then(() => {
        emailService.getById(this.emailId).then();
      });
    },
    deleteMail() {
      const msg = {
        txt: 'Email moved to Trash',
      };
      eventBus.$emit('show-msg', msg);
      return emailService.toggleEmailFolder(this.emailId, 'trash')
        .then(() => {
          emailService.getById(this.emailId);
        })
        .then((email) => {
          this.email = email
          this.folder = this.$route.params.folder;
          this.$router.push(`/email/${this.folder}`);
        })
    },
    unDeleteMail() {
      return emailService.removeFromTrash(this.emailId)
        .then(() => {
          emailService.getById(this.emailId);
        })
        .then((email) => {
          this.email = email
            this.$router.push('/email/inbox');
        })
    }
  },
  computed: {
    goBack() {
      this.folder = this.$route.params.folder;
      console.log(this.$route.params.folder);
      return `/email/${this.folder}`;
    },
    setBackground() {
      return {backgroundColor: this.email.style.backgroundColor,
        borderColor: this.email.style.borderColor};
    },
    nameInitials() {
      const name = this.email.mailInfo.sender;
      const firstNameLetter = name.charAt(0).toUpperCase();
      if (!name.includes(' ')) return firstNameLetter;
      else {
        const lastNameLetter = name
          .substr(name.indexOf(' ') + 1, 1)
          .toUpperCase();
        return `${firstNameLetter}${lastNameLetter}`;
      }
    },
    formattedTime() {
      return new Date(this.email.sentAt)
        .toLocaleTimeString()
        .replace(/:\d+ /, ' ');
    },
    changeStar() {
      if (this.email.folders.includes('starred')) {
        return 'img/star-full.png';
      } else {
        return 'img/star-empty.png';
      }
    },
  },
  created() {
    this.emailId = this.$route.params.emailId;
    emailService.getById(this.emailId).then((email) => {
      this.email = email;
      if (this.email.folders.includes('trash')) this.isInTrash = true;
      console.log('this.currEmail', this.email);
    });
  },
};
