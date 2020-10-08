const isMobileMainJs = ()=>{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('we on phone')
        return true
    } else {
        console.log('we on pc')
        return false
    }
}

export default isMobileMainJs