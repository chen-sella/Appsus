import notePreview from '../cmps/note-preview.cmp.js';
import { noteService } from '../services/note.service.js';

export default {
  name: 'noteList',
  template: `
        <ul v-if="noteList" class="note-list clean-list">
            <li v-for="note in noteList">
                <note-preview :note="note" :colors="colors" @changeColor="changeColor" @uploadImg="uploadImg"></note-preview>
            </li>
        </ul>
        `,
  data() {
    return {
      noteList: null,
      colors: null,
    }
  },
  methods: {
    changeColor(color, noteId) {
      noteService.updateColor(color, noteId).then((note) => {
        console.log(note);
        noteService.getNotes().then((notes)=>this.noteList = notes)
      });
    },
    uploadImg(ev){
      noteService.onImgInput(ev);
    }
  },
  computed: {},
  created() {
    this.colors = noteService.getColors();
    console.log(this.colors);
    noteService.getNotes().then((notes) => {
      this.noteList = notes;
      console.log(this.noteList);
    });
  },
  components: {
    notePreview,
  },
};
