const isMobileMainJs = ()=>{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth < 1200) {
        return true
    } else {
        return false
    }
}

export default isMobileMainJs