import { eventBus } from '../../../services/event-bus.service.js';

export default {
  name: 'emailCompose',
  template: `
            <section class="email-compose-container flex column">
              <div class="compose-header flex space-between align-center">
                <p>New message</p>
                <button class="x-btn" @click="closeCompose">X</button>
              </div>
              <form @submit.prevent="save(newEmail)">
                <div class="input-area-container flex space-between align-center">
                  <input type="email" placeholder="To:" name="sendTo" v-model="newEmail.mailInfo.sendTo" required>
                  <div>
                    <a href="#" v-if="!openCc" @click="openInputCc" class="cc-btn">Cc</a>
                    <a href="#" v-if="!openBcc" @click="openInputBcc" class="bcc-btn">Bcc</a>
                  </div>
                </div>
                <div v-if="openCc" class="input-area-container flex"><input type="text" placeholder="Cc:" name="cc" v-model="newEmail.mailInfo.cc"></div>
                <div v-if="openBcc" class="input-area-container flex"><input type="text" placeholder="Bcc:" name="bcc" v-model="newEmail.mailInfo.bcc"></div>
                <div class="input-area-container flex"><input type="text" placeholder="Subject:" name="subject" v-model="newEmail.subject" required></div>
                <div class="flex column space-between">
                  <div contenteditable="true" ref="newEmailBody" class="textarea flex-grow"></div>
                  <div class="form-btns-container flex space-between align-center">
                    <button class="save-btn">Send</button>
                    <button class="cancel-btn"><i class="fas fa-trash trash-icon"></i></button>
                  </div>
                </div>
              </form>
            </section>
        `,
  data() {
    return {
          newEmail: { 
            mailInfo: {
                  sender: '',
                  sendTo: '',
                  cc: '',
                  bcc: '',
                },
            subject: '', 
            body: '',  
          },
          openCc: false,
          openBcc: false,
          folder: null,
    }
  },
  methods: {
    save(newEmail) {
      this.newEmail.body = this.$refs.newEmailBody.innerText;
      eventBus.$emit('onAddMail', newEmail);
    },
    openInputCc() {
      this.openCc = true;
    },
    openInputBcc() {
      this.openBcc = true;
    },
    closeCompose() {
      this.$emit('closeCompose');
    },
  },
  created() {
      console.log(this.$route.params);
      this.folder = this.$route.params.folder
      console.log('this.folder',this.folder);
  },
};
