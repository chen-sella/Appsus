import appHeader from './cmps/app-header.cmp.js';
import { myRouter } from './routes.js';

const options = {
  el: '#app',
  router: myRouter,
  template: `<section>
                <app-header></app-header>
                <router-view></router-view>
            </section>`,
  components: {
    appHeader,
  },
};

const app = new Vue(options);