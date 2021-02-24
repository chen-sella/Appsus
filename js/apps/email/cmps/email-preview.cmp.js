export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
            <section class="email-preview-container flex">
              <div class="name-circle"></div>
              <div class="email-preview-details flex column space-between">
                <h4>{{email.sender}}</h4>
                <h4>{{email.subject}}</h4>
                <p>{{email.body}}</p>
              </div>
            </section>
        `,
    data() {
      return {};
    },
    methods: {},
    computed: {},
    components: {},
  };
  