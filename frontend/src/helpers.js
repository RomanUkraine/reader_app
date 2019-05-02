const BASE_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
  "http://localhost:3000"
  :
  "https://reader-app-strongsd.herokuapp.com/"

export {
    BASE_URL
}


