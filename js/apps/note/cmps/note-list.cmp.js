import notePreview from '../cmps/note-preview.cmp.js';

export default {
  name: 'noteList',
  props: ['colors', 'notes', 'pinned'],
  template: `
        <ul class="note-list clean-list">
            <li v-for="note in notes">
                <note-preview v-if="notesToRender" :note="note" :colors="colors" @changeColor="changeColor"></note-preview>
            </li>
        </ul>
        `,
  data() {
    return {
    };
  },
  methods: {
    changeColor(color, noteId) {
      this.$emit('changeColor', color, noteId);
    },
  },
  computed: {
    notesToRender() {
      console.log(this.pinned);
      console.log(note);
      if (this.pinned) return this.note.isPinned;
      else return !this.note.isPinned;
    },
  },
  components: {
    notePreview,
  },
};
