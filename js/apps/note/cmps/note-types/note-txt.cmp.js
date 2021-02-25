import { eventBus } from "../../../../services/event-bus.service.js";

export default {
    name: 'noteTxt',
    props:['info', 'id'],
    template: `
        <p contenteditable="true" ref="txtPara" class="note-txt" @keyup.enter="updateTxt">{{info.txt}}</p>
        `,
    data() {
      return {};
    },
    methods: {
      updateTxt(){
        console.log(this.$refs.txtPara);
        console.log(this.$refs.txtPara.innerText);
        eventBus.$emit('updateTxt', this.$refs.txtPara.innerText, this.id)

      }
    },
    computed: {},
    components: {},
  };
  