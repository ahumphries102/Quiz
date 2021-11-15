import fetchData from '../restClient'
const storageKey = 'quizlogin'

const store = {
    emailInfo: {
        emails: [],
        from: '',
        inbox: 0,
        unread: 0
    },
    state: {
        userName: '',
        token: '',
    },
    async checkEmail() {
        let response = await fetchData("POST", "/checkmail", {
            userName: this.state.userName,
        });
        this.emailInfo.unread = response.requestData.filter(ele => !ele.reviewed).length
        return response.requestData
    },
    updateToken() {
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(store.state))
        } else {
            store.state = JSON.parse(localStorage.getItem(storageKey))
        }
    },
    clearStorage() {
        store.state = {
            userName: '',
            token: '',
        }
        localStorage.removeItem(storageKey)
    }
}
if (localStorage.getItem(storageKey)) {
    store.state = JSON.parse(localStorage.getItem(storageKey))
}
export default store