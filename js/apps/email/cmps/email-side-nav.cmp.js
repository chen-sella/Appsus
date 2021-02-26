import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props: ['folders'],
    name: 'emailSideNav',
    template: `
            <nav class="email-side-nav-container flex column">
            <router-link :to="'/email/'+folder" v-for="folder in folders" class="nav-link" @click.native="setFilter(folder)">{{folder}}</router-link>
                <!-- <a v-for="folder in folders" class="nav-link" @click="setFilter(folder)">{{folder}}</a> -->
            </nav>
        `,
    data() {
      return {
      };
    },
    methods: {
        setFilter(folder){
            this.$emit('filtered', folder);
            eventBus.$emit('filtered', folder);
            // this.$router.push(`/email/${folder}`);
            // this.$route.params.folder = folder;
        }
    },
    computed: {},
    components: {
    },
    created() {
        
    }
  };