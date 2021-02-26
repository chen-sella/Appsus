export default {
  name: '',
  template: `<section class="home-page main-container app-main">
              <h2>Appsus. Everything you need is right here.</h2>
              <!-- <hr width="60%"> -->
              <div class="home-container">
                <section class="keep-display flex column align-center">
                  <div class="flex align-center">
                    <p>Keep all of your thoughts in one place. <br>
                        <!-- Easily manage your day.<br> -->
                        Prioritize, edit, delete and share like never before. 
                    </p>
                  </div>
                  <img src="img/keep-preview.png">
                  <router-link class="home-nav-link" to="/keep">keep</router-link>
                  <!-- <hr width="60%"> -->
                </section>
                <section class="email-display flex column align-center">
                  <div>
                    <p>Stay in touch with you loved ones. <br>
                        Instantly compose new messages, mange your data with folders.<br>
                    </p>
                  </div>
                   <video width="95%" controls autoplay>
                    <source src="img/email.mp4" type="video/mp4">
                  </video>
                <router-link class="home-nav-link" to="/email">Email</router-link>
                </section>
                </div>
            
            </section>
            
        `,
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
};
