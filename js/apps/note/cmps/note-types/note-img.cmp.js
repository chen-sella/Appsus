import { eventBus } from '../../../../services/event-bus.service.js';

export default {
  name: 'noteImg',
  props: ['info', 'id'],
  template: `
        <section class="note-img">
          <img :src="info.url">
          <div class="saveEdits-container flex">
            <transition name="fade">
              <div v-if="saveEdits" class="saveEdits" @click="updateTxt">
                <i class="fas fa-check"></i>
              </div>
            </transition>
          </div>
          <h3 contenteditable="true" @click.stop="editNote" ref="txtTitle">{{info.title}}</h3>
        </section>
        `,
  data() {
    return {
      saveEdits: null,
    };
  },
  methods: {
    updateTxt() {
      console.log(this.$refs.txtTitle.innerText);
      const title = this.$refs.txtTitle.innerText;
      eventBus.$emit('updateImgTitle', title, this.id);
      this.saveEdits = null;
    },
    editNote() {
      console.log('editing!');
      this.saveEdits = true;
    },
  },
  computed: {},
  created() {},
  components: {},
};
