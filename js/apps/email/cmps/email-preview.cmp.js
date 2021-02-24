export default {
    name: 'emailPreview',
    props: ['email'],
    template: `
            <section>
              <h2>Name: {{email.sender}}</h2>
              <h2>Title: {{email.subject}}</h2>
              <p>Body: {{email.body}}</p>
            </section>
        `,
    data() {
      return {};
    },
    methods: {},
    computed: {},
    components: {},
  };
  