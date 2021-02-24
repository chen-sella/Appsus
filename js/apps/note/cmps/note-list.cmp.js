import notePreview from '../cmps/note-preview.cmp.js';
import { noteService } from '../services/note.service.js';

export default {
  name: 'noteList',
  template: `
        <ul v-if="noteList" class="note-list clean-list">
            <li v-for="note in noteList">
                <note-preview :note="note"></note-preview>
            </li>

        </ul>
            
        `,
  data() {
    return {
      noteList: null,
    };
  },
  methods: {},
  computed: {},
  created() {
    noteService.getNotes().then((notes) => {
      this.noteList = notes;
      console.log(this.noteList);
    });
  },
  components: {
    notePreview,
  },
};
