import appHome from './pages/app-home.cmp.js'
import emailApp from './apps/email/pages/email-app.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js'
import noteApp from './apps/note/pages/note-app.cmp.js'

const routes = [
  {
      path: '/',
      component: appHome,
  },
  {
    path: '/email',
    component: emailApp,
  },
  // {
  //     path: '/about',
  //     component: about
  // },
  {
      path: '/kepp',
      component: noteApp
  },
  {
    path: '/email/:emailId',
    component: emailDetails,
  },
];

export const myRouter = new VueRouter({ routes });
 