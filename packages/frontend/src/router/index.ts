import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import ListUsers from '../views/User/List.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/users/list',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/',
      name: 'home',
      redirect: '/list-users',
      component: BaseLayout,
      children: [
        {
          path: 'list-users',
          name: 'list-users',
          // component: () => import('../views/User/List.vue'),
          component: ListUsers,
        },
      ],
    },
  ],
})

export default router
