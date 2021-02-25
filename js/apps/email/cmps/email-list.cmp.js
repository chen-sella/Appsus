import emailPreview from './email-preview.cmp.js';

export default {
    name: 'emailList',
    props: ['emails','folders','folder'],
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
        currFolder: null,
      };
    },
    methods: {
      shareStarEvent(emailId, folderName) {
        this.$emit('addFolder', emailId, folderName);
      },
      // openDetails(emailId) {
      //   this.$emit('emailClicked', emailId);
      // }
    },
    computed: {},
    components: {
      emailPreview,
    },
    created() {

    }
  };
  