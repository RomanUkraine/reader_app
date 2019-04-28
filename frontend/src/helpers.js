const BASE_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
  "http://localhost:3000"
  :
  "https://frozen-brushlands-74105.herokuapp.com"

export {
    BASE_URL
}


