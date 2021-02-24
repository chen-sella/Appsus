import {noteService} from '../services/note.service.js'

export default {
    name: '',
    template: `
        <section class="note-create flex space-between">
          <input type="text" :placeholder="flaceHolder">
          <ul class="type-controllers clean-list flex">
            <li @click="setType('noteTxt')"><i class="fas fa-font"></i></li>
            <li @click="setType('noteImg')"><i class="fas fa-image"></i></li>
            <li @click="setType('noteTodos')"><i class="fas fa-list"></i></li>
          </ul>
        </section>
            
        `,
    data() {
      return {
        note:{
          type:'',
          info:{

          } 
        }
      };
    },
    methods: {
      setType(type){
        this.note.type = type;
        this.note.info = noteService.newNote(this.note.type);
        console.log(this.note.type);
        console.log(this.note.info);
      }
    },
    computed: {
      flaceHolder(){
        if (!this.note.type) return 'Take a note...'
        if(this.note.type === 'noteTxt') return 'Enter text...'
        if(this.note.type === 'noteImg') return 'Enter Img...'
        if(this.note.type === 'noteTodos') return 'Enter comma separeted list...'
      }
    },
    components: {},
  };
  