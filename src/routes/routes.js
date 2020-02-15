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
    }
]

export default new VueRouter({
    routes
})


