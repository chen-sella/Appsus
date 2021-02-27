export default {
  name: '',
  template: `
          <header class="app-header">
          <div class="header-content-container main-container flex space-between align-center">
              <div class="logo">
                  <h1>Appsus</h1>
              </div>
              <nav class="flex">
                  <div class="nav-container" @click="toggleNav">
                    <i class="fas fa-th fa-2x"></i>
                    <ul v-if="nav" class="router-links-list clean-list flex align-center">
                      <li>
                      <router-link @click="toggleNav" class="nav-link" to="/">
                        <i class="fas fa-home fa-2x"></i>
                      </router-link>
                      </li>
                      <li>
                      <router-link @click="toggleNav" class="nav-link" to="/email">
                        <i class="fas fa-envelope fa-2x"></i>
                      </router-link>
                      </li>
                      <li>
                      <router-link @click="toggleNav" class="nav-link" to="/keep">
                        <i class="fas fa-sticky-note fa-2x"></i>
                      </router-link>
                      </li>
                      <li>
                        <router-link @click="toggleNav" class="nav-link" to="/about">
                        <i class="fas fa-info fa-2x"></i>
                        </router-link>
                      </li>
                    </ul>
                  </div>
              </nav>
          </div>
          </header>    
      `,
  data() {
    return {
      nav:null,
    };
  },
  methods: {
    toggleNav(){
      this.nav = !this.nav
    }
  },
  computed: {},
  components: {},
};
