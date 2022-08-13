import axios from "axios";

const instance= axios.create({
    baseURL:"https://luminous-liquor.herokuapp.com"
})

export default instance;