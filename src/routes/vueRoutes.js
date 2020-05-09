import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../storage/store'
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect: to => {
            if(!localStorage.getItem('quizlogin')){
                console.log('route guard working')
                return '/login'
            }else{
                console.log('route guard failing')
                return '/creatingquiz'
            }
        }
    },
    {
        path: '/finalscore',
        name:'finalscore',
        component: ()=>import('../components/finalScore')
    },
    {
        path: '/creatingquiz',
        name:'creatingquiz',
        component: ()=>import('../components/creatingquiz')
    },
    {
        path: '/login',
        name: 'login',
        component:()=>import('../components/login')
    },
    {
        path: '/takequiz',
        name: 'takequiz',
        component:()=>import('../components/takequiz')
    },
    {
        path: '/signup',
        name: 'signup',
        component:()=>import('../components/signup')
    },
    {
        path: '/viewquiz',
        name: 'viewquiz',
        component:()=>import('../components/userquizzes/viewquiz')
    },
    {
        path: '/viewquiz/:id',
        name: 'userquiz',
        props: true,
        component:()=>import('../components/userquizzes/userquiz')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach( (to, from, next)=> {
    if(to.name !== 'signup'){
        setTimeout(() => {
            //this timeout needs to be used for now so if a user logins the can get routed correctly. Otherwise the router won't work
            // the first time you click login because to set the state of our users correct login we have to use an asynchronous call which triggers
            // after the router checks if the user has the correct login credentials
            if(store.state.username === '' && to.name !== 'login'){
                return next({
                    name:'login'
                })
            }
            else{
                return next()
            }
        }, 0);
    }else{
        console.log('not signup')
        next()
    }
})

export default router


