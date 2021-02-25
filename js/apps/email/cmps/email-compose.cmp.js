export default {
  name: 'emailCompose',
  template: `
            <section class="email-compose-container flex column">
              <div class="compose-header flex space-between align-center">
                <p>New message</p>
                <button class="x-btn" @click="onCloseCompose">X</button>
              </div>
              <form @submit.prevent="save(newEmail)">
                <div class="input-area-container flex"><input type="text" placeholder="To:" name="sendTo" v-model="newEmail.mailInfo.sendTo"></div>
                <div class="input-area-container flex"><input type="text" placeholder="Cc:" name="cc" v-model="newEmail.mailInfo.cc"></div>
                <div class="input-area-container flex"><input type="text" placeholder="Bcc:" name="bcc" v-model="newEmail.mailInfo.bcc"></div>
                <div class="input-area-container flex"><input type="text" placeholder="Subject:" name="subject" v-model="newEmail.subject"></div>
                <textarea v-model="newEmail.body" class="textarea" cols="120" rows="20"></textarea>
                <div class="flex space-between">
                  <button>Save</button>
                  <button>Cancel</button>
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
    }
  },
  methods: {
    onCloseCompose() {
      this.$emit('closeCompose');
    },
    save(newEmail) {
      this.$emit('onAddMail', newEmail);
    },
  },
  computed: {},
  components: {},
};
