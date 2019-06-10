import axios from 'axios'
const AX = axios.create({
    baseURL : 'https://paw-2019.firebaseio.com/'
})
export default AX;