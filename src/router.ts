import { createRouter, createWebHistory } from 'vue-router';
import TrucksPage from '@/modules/Truck/TrucksPage.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TrucksPage
  },
  {
    path: '/trucks',
    name: 'Trucks',
    component: TrucksPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
