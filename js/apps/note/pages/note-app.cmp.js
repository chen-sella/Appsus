import noteList from '../cmps/note-list.cmp.js';

export default {
  name: 'noteApp',
  template: `
      <section class="note-app main-container">
        <note-list></note-list>

      </section>
              
          `,
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    noteList
  },
};
