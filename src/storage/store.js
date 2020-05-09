const storageKey = 'quizlogin'

const store = {
    state:{
        username:'',
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
            username:'',
            token:'',
        }
        localStorage.removeItem(storageKey)
    }
}
if(localStorage.getItem(storageKey)){
    store.state = JSON.parse(localStorage.getItem(storageKey))
}
export default store