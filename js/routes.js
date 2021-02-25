import appHome from './pages/app-home.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import emailDetails from './apps/email/pages/email-details.cmp.js';
// import emailCompose from './apps/email/cmps/email-compose.cmp.js';
import noteApp from './apps/note/pages/note-app.cmp.js';

const routes = [
  {
    path: '/',
    component: appHome,
  },
  // {
  //     path: '/about',
  //     component: about
  // },
  {
    path: '/keep/:noteId?',
    component: noteApp,
  },
  {
    path: '/email',
    component: emailApp,
  },
  // {
  //   path: '/email/compose',
  //   component: emailCompose,
  // },
  {
    path: '/email/:emailId',
    component: emailDetails,
  },
];

export const myRouter = new VueRouter({ routes });
