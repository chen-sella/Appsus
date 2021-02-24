import noteList from '../cmps/note-list.cmp.js';
import noteCreate from '../cmps/note-create.cmp.js'

export default {
  name: 'noteApp',
  template: `
      <section class="note-app main-container">
        <note-create></note-create>
        <note-list></note-list>

      </section>
              
          `,
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    noteList,
    noteCreate
  },
};
