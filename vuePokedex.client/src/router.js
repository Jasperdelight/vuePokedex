import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: loadPage('PokemonPage')
  },
  {
    path: '/item',
    name: 'Item',
    component: loadPage('ItemPage')
  },
  {
    path: '/ability',
    name: 'Ability',
    component: loadPage('AbilityPage')
  },
  {
    path: '/move',
    name: 'Move',
    component: loadPage('MovePage')
  },
  {
    path: '/guide',
    name: 'Guide',
    component: loadPage('GuidePage')
  },
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

