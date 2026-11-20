import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventDetailView from '../views/EventDetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MyRegistrationsView from '../views/MyRegistrationsView.vue'
import OrganizerPanelView from '../views/OrganizerPanelView.vue'
import EventFormView from '../views/EventFormView.vue'
import AttendeesView from '../views/AttendeesView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/eventos/:id', name: 'event-detail', component: EventDetailView },
    { path: '/ingresar', name: 'login', component: LoginView, meta: { guest: true } },
    { path: '/registro', name: 'register', component: RegisterView, meta: { guest: true } },
    { path: '/mis-inscripciones', name: 'my-registrations', component: MyRegistrationsView, meta: { requiresAuth: true } },
    { path: '/panel', name: 'organizer-panel', component: OrganizerPanelView, meta: { requiresOrganizer: true } },
    { path: '/panel/eventos/nuevo', name: 'event-create', component: EventFormView, meta: { requiresOrganizer: true } },
    { path: '/panel/eventos/:id', name: 'event-edit', component: EventFormView, meta: { requiresOrganizer: true } },
    { path: '/panel/eventos/:id/inscritos', name: 'event-attendees', component: AttendeesView, meta: { requiresOrganizer: true } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore();
  const requiresAuth = to.meta.requiresAuth || to.meta.requiresOrganizer;
  if (requiresAuth && !auth.token) {
    return { path: '/ingresar' };
  }
  return true;
});

export default router
