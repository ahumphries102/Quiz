const storageKey = 'quizlogin'

const store = {
    emailInfo:{
        from:'',
        inbox:0,
    },
    state:{
        userName:'',
        token:'',
    },
    updateToken(){
        if(!localStorage.getItem(storageKey)){
            localStorage.setItem(storageKey, JSON.stringify(store.state))
        }else{
            store.state = JSON.parse(localStorage.getItem(storageKey))
        }
    },
    clearStorage(){
        store.state = {
            userName:'',
            token:'',
        }
        localStorage.removeItem(storageKey)
    }
}
if(localStorage.getItem(storageKey)){
    store.state = JSON.parse(localStorage.getItem(storageKey))
}
export default store