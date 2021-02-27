import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props: ['folders'],
    name: 'emailSideNav',
    template: `
            <nav class="email-side-nav-container flex column">
            <router-link :to="'/email/'+folder" v-for="folder in folders" :key="folder"class="nav-link" @click.native="setFilter(folder)">{{folder}}</router-link>
            </nav>
        `,
    data() {
      return {
      };
    },
    methods: {
        setFilter(folder){
            this.$emit('filtered', folder);
            // eventBus.$emit('filtered', folder);
        }
    },
    computed: {},
    components: {
    },
    created() {
        
    }
  };