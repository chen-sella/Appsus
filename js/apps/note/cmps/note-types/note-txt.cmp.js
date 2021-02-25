import { eventBus } from '../../../../services/event-bus.service.js';

export default {
  name: 'noteTxt',
  props: ['info', 'id'],
  template: `
    <section class="note-txt">
      <h3>{{info.title}}</h3>
      <p contenteditable="true" ref="txtPara" class="note-txt" @keyup.enter="updateTxt">{{info.txt}}</p>
    </section>
        `,
  data() {
    return {};
  },
  methods: {
    updateTxt() {
      eventBus.$emit('updateTxt', this.$refs.txtPara.innerText, this.id);
    },
  },
  computed: {},
  components: {},
};
