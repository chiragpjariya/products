import axios from 'axios'

const api = axios.create({
    baseURL: 'https://dummyjson.com/products'
})


// getData
export const getProducts = async (arg) => {
    const res = await api.get(arg)
    return res;
}
