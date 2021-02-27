import noteTxt from '../cmps/note-types/note-txt.cmp.js';
import noteTodos from '../cmps/note-types/note-todos.cmp.js';
import noteImg from '../cmps/note-types/note-img.cmp.js';
import noteVideo from '../cmps/note-types/note-video.cmp.js';
import noteControls from './note-controls.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';

export default {
  name: 'notePreview',
  props: ['note', 'colors'],
  template: `
        <section class="note-preview" :style="theme" ref="previewContainer" @mouseover="noteOnfocus = true" @mouseleave="noteOnfocus = null">
          <component :is="note.type" :info="note.info" :id="note.id"></component>
          <div class="note-controls-container">
              <transition name="fade">
              <note-controls v-if="noteOnfocus" :note="note" :colors="colors" @colorPicked="changeColor" @pinned="pinnNote"></note-controls>
            </transition>
          </div>
        </section>
        `,
  data() {
    return {
      noteOnfocus: null,
    };
  },
  methods: {
    changeColor(color) {
      this.$emit('changeColor', color, this.note.id);
    },
    pinnNote() {
      this.$emit('pinned', this.note.id);
    },
  },
  computed: {
    theme() {
      if (this.note.style) {
        return {
          backgroundColor: this.note.style.backgroundColor,
          borderColor: this.note.style.borderColor,
        };
      }
      return { backgroundColor: 'white', borderColor: '#8080809e' };
    },
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
    noteControls,
  },
};
