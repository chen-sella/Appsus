import emailPreview from './email-preview.cmp.js';

export default {
    name: 'emailList',
    props: ['emails'],
    template: `
            <ul class="email-list-container">
              <li v-for="email in emails" :key="email.id" class="clean-list">
                <email-preview :email="email"/>
              </li>
            </ul>   
        `,
    data() {
      return {};
    },
    methods: {},
    computed: {},
    components: {
      emailPreview,
    },
  };
  