import emailPreview from './email-preview.cmp.js';

export default {
    name: 'emailList',
    props: ['emails'],
    template: `
            <ul class="email-list-container">
              <li v-for="email in emails" :key="email.id" class="clean-list">
                <email-preview :email="email" @click.native="openDetails(email.id)" @sendStarEvent="shareStarEvent"/>
              </li>
            </ul>   
        `,
    data() {
      return {};
    },
    methods: {
      shareStarEvent(emailId, folderName) {
        this.$emit('addFolder', emailId, folderName);
      },
      openDetails(emailId) {
        this.$emit('emailClicked', emailId);
      }
    },
    computed: {},
    components: {
      emailPreview,
    },
  };
  