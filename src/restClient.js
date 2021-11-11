const fetchData = async(method, url, data) => {
    let mode = 'cors'
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    let opt = {}
    if (data) {
      opt = {
        method,
        mode,
        headers,
        body: JSON.stringify(data)
      }
    } else {
      opt = {
        method,
        mode,
        headers
      }
    }

    let request
    try {
      request = await fetch(url, opt)
      
    } catch (err) {
      throw err
    }

    let requestData
    try {
      requestData = await request.json()
    } catch (err) {
      throw err
    }
    return {requestData, request}
  }

  export default fetchData