import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Home from '@/components/Home'
import Add from '@/components/blocks/Add'
import MyBlocks from '@/components/blocks/MyBlocks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/myblocks',
      name: 'MyBlocks',
      component: MyBlocks
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
