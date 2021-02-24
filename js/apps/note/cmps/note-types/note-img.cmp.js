export default {
  name: 'noteImg',
  props: ['info'],
  template: `
        <section class="note-img">
          <img :src="info.url">
          <h3>{{info.title}}</h3>
        </section>
        `,
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
  components: {},
};
