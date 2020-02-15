import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Quiz',
        component:()=>import('../components/Quiz')
    },
    {
        path: '/users',
        name:'CreateQuiz',
        component: ()=>import('../components/CreateQuiz')
    },
    {
        path: '/routetest',
        name: 'routertest',
        component: ()=>import('../components/testroute')
    },
    {
        path: '/routetest/:id',
        name: 'characters',
        props:true,
        component: ()=>import('../components/characters')
    },
]

export default new VueRouter({
    routes
})


