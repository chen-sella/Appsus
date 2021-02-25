import notePreview from '../cmps/note-preview.cmp.js';

export default {
  name: 'noteList',
  props: ['colors', 'notes'],
  template: `
        <ul class="note-list clean-list">
            <li v-for="note in notes">
                <note-preview :note="note" :colors="colors" @changeColor="changeColor"></note-preview>
            </li>
        </ul>
        `,
  data() {
    return {};
  },
  methods: {
    changeColor(color, noteId) {
      this.$emit('changeColor', color, noteId);
    },
  },
  computed: {},
  components: {
    notePreview,
  },
};
