export default {
  name: '',
  template: `
          <header class="app-header">
          <div class="header-content-container main-container flex space-between align-center">
              <div class="logo">
                  <h1>Appsus</h1>
              </div>
              <nav class="flex">
                  <router-link class="nav-link" to="/">Home</router-link>
                  <router-link class="nav-link" to="/email">Email</router-link>
                  <router-link class="nav-link" to="/keep">keep</router-link>
              </nav>
          </div>
          </header>    
      `,
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
};
