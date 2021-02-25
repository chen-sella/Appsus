export default {
    name: 'emailCompose',
    template: `
            <section class="email-compose-container flex column">
              <div class="compose-header flex space-between align-center">
                <p>New message</p>
                <button class="x-btn" @click="onCloseCompose">X</button>
              </div>
              <form @submit.prevent="save">
                <div class="input-area-container flex"><label for="sendTo">To:</label><input type="text" class="flex-grow" name="sendTo" v-model="sendTo"></div>
                <div class="input-area-container"><label for="cc">Cc:</label><input type="text" name="cc" v-model="cc"></div>
                <div class="input-area-container"><label for="bcc">Bcc:</label><input type="text" name="bcc" v-model="bcc"></div>
                <div class="input-area-container"><label for="subject">Subject:</label><input type="text" name="subject" v-model="subject"></div>
                <div><textarea v-model="body" placeholder="Your mail goes here"></textarea></div>
                <div class="flex space-between">
                  <button>Save</button>
                  <button>Cancel</button>
                </div>
              </form>
            </section>
        `,
    data() {
      return {
        sendTo: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
      };
    },
    methods: {
      onCloseCompose() {
        this.$emit('closeCompose');
      },
      save() {
        console.log('saving form');
      }
    },
    computed: {},
    components: {},
  };
  