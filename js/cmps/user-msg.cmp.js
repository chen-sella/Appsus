import { eventBus } from '../services/event-bus.service.js';

export default {
  name: 'userMsg',
  template: `
    <section v-if="msg" class="user-msg flex space-between" :class="msg.type">
      <p>{{msg.txt}}</p>
      <button v-if="msg.isAction" @click="doAction">{{msg.isAction}}</button>
      <button @click="msg=null">x</button>
    </section>    
  `,
  data() {
    return {
      msg: null,
    };
  },
  methods: {
    setMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
    doAction() {
      eventBus.$emit('makeAction');
    },
  },
  created() {
    eventBus.$on('show-msg', this.setMsg);
  },
};
