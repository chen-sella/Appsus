export default {
  props:[],
  name: 'emailCompose',
  template: `
            <section class="email-compose-container flex column">
              <div class="compose-header flex space-between align-center">
                <p>New message</p>
                <button class="x-btn" @click="onCloseCompose">X</button>
              </div>
              <form @submit.prevent="save(newEmail)">
                <div class="input-area-container flex space-between align-center">
                  <input type="text" placeholder="To:" name="sendTo" v-model="newEmail.mailInfo.sendTo">
                  <div>
                    <a href="#" v-if="!openCc" @click="openInputCc" class="cc-btn">Cc</a>
                    <a href="#" v-if="!openBcc" @click="openInputBcc" class="bcc-btn">Bcc</a>
                  </div>
                </div>
                <div v-if="openCc" class="input-area-container flex"><input type="text" placeholder="Cc:" name="cc" v-model="newEmail.mailInfo.cc"></div>
                <div v-if="openBcc" class="input-area-container flex"><input type="text" placeholder="Bcc:" name="bcc" v-model="newEmail.mailInfo.bcc"></div>
                <div class="input-area-container flex"><input type="text" placeholder="Subject:" name="subject" v-model="newEmail.subject"></div>
                <!-- <textarea v-model="newEmail.body" class="textarea" cols="120" rows="20"></textarea> -->
                <div class="flex column space-between">
                  <div contenteditable="true" ref="newEmailBody" class="textarea flex-grow"></div>
                  <div class="form-btns-container flex space-between align-center">
                    <button class="save-btn">Save</button>
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
    }
  },
  methods: {
    onCloseCompose() {
      this.$emit('closeCompose');
    },
    save(newEmail) {
      this.newEmail.body = this.$refs.newEmailBody.innerText;
      this.$emit('onAddMail', newEmail);
    },
    openInputCc() {
      this.openCc = true;
    },
    openInputBcc() {
      this.openBcc = true;
    }
  },
  computed: {},
  components: {},
};
