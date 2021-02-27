import { eventBus } from '../../../../services/event-bus.service.js';

export default {
  name: 'noteTxt',
  props: ['info', 'id'],
  template: `
    <section class="note-txt">
      <div class="saveEdits-container flex">
      <transition name="fade">
          <div v-if="saveEdits" class="saveEdits" @click="updateTxt">
            <i class="fas fa-check"></i>
          </div>
        </transition>
      </div>
      <h3 contenteditable="true" @click.stop="editNote" ref="txtTitle">{{info.title}}</h3>
      <p contenteditable="true" ref="txtPara" class="note-txt" @click.stop="editNote">{{info.txt}}</p>
    </section>
        `,
  data() {
    return {
      saveEdits: null,
    };
  },
  methods: {
    updateTxt() {
      console.log('saving');
      console.log(this.$refs.txtTitle.innerText);
      const title = this.$refs.txtTitle.innerText;
      const txt = this.$refs.txtPara.innerText;
      eventBus.$emit('updateTxt', {title, txt}, this.id);
      this.saveEdits = null;
    },
    editNote() {
      console.log('editing!');
      this.saveEdits = true;
    },
  },
  computed: {},
  components: {},
};
