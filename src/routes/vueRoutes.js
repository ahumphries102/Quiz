import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../storage/store'
Vue.use(VueRouter)
const userUrlName = '/:userName'
const routes = [{
        path: '/',
        redirect: to => {
            if (!localStorage.getItem('quizlogin')) {
                return {
                    name: 'login'
                }
            } else {
                return ({
                    name: 'creatingquiz',
                    params: userUrlName
                })
            }
        }
    },
    {
        path: userUrlName + '/creatingquiz',
        name: 'creatingquiz',
        component: () => import('../components/creatingquiz')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/login')
    },
    {
        path: userUrlName + '/quizreview',
        name: 'quizreview',
        component: () => import('../components/quizreview')
    },
    {
        path: userUrlName + '/takequiz',
        name: 'takequiz',
        component: () => import('../components/takequiz/takequiz')
    },
    {
        path: userUrlName + '/takequiz/:id',
        name: 'whichquiz',
        component: () => import('../components/takequiz/whichquiz')
    },
    {
        path: userUrlName + '/signup',
        name: 'signup',
        component: () => import('../components/signup')
    },
    {
        path: userUrlName + '/viewallquizzes',
        name: 'viewallquizzes',
        component: () => import('../components/allquizzes/viewallquizzes')
    },
    {
        path: userUrlName + '/viewallquizzes/:id',
        name: 'broaduserquiz',
        component: () => import('../components/allquizzes/broaduserquiz')
    },
    {
        path: userUrlName + '/viewquiz',
        name: 'viewquiz',
        component: () => import('../components/userquizzes/viewquiz')
    },
    {
        path: userUrlName + '/viewquiz/:id',
        name: 'userquiz',
        props: true,
        component: () => import('../components/userquizzes/userquiz')
    },
    {
        path: '/404',
        name: 'pageNotFound',
        component: () => import('../components/404')
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.params.userName !== store.state.userName && to.name !== 'pageNotFound') {
        return next({
            name: 'pageNotFound'
        })
    }
        if (to.name !== 'signup') {
            setTimeout(() => {
                // If a user logins they'll get routed correctly. Otherwise the router won't work
                // the first time you click login, to set the state of our users correct login we have to use an asynchronous call which triggers
                // after the router checks if the user has the correct login credentials
                if (store.state.userName === '' && to.name !== 'login') {
                    return next({
                        name: 'login'
                    })
                } else {
                    return next()
                }
            }, 0);
        } else {
            console.log('not signup')
            next()
        }
})

export default router
