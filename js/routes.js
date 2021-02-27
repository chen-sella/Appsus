import appHome from './pages/app-home.cmp.js';
import about from './pages/about.cmp.js';
import noteApp from './apps/note/pages/note-app.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import emailDetails from './apps/email/cmps/email-details.cmp.js';
import emailCompose from './apps/email/cmps/email-compose.cmp.js';
import emailList from './apps/email/cmps/email-list.cmp.js';

const routes = [
  {
    path: '/',
    component: appHome,
  },
  {
    path: '/about',
    component: about,
  },
  {
    path: '/keep/:noteId?',
    component: noteApp,
  },
  {
    path: '/email',
    component: emailApp,
    redirect: '/email/inbox',
    children: [
      {
        path: ':folder',
        component: emailList,
      },
      {
        path: ':folder/:emailId',
        component: emailDetails,
      },
    ],
  },
  {
    path: '/email/compose',
    component: emailCompose,
  },
];

export const myRouter = new VueRouter({ routes });
