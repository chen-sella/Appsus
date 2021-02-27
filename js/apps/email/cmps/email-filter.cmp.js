export default {
    name: 'emailFilter',
    template: `
            <section class="email-filter-section flex">
              <input type="search" placeholder="Search mail" v-model="strSearch">
              <select name="" id="">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </section>
        `,
    data() {
      return {
        strSearch: '',
        searchBy: '',
      };
    },
    methods: {
      
    },
    computed: {},
    components: {},
  };
  