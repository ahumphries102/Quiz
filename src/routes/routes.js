import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/quiz',
        name: 'quiz',
        component:()=>import('../components/quiz')
    },
    {
        path: '/',
        name:'createQuiz',
        component: ()=>import('../components/createQuiz')
    }
]

export default new VueRouter({
    routes
})


