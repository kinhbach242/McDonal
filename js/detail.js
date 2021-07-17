import {getProductDetail,getAllProducts, getCategories} from './module.js'
window.onload = () => {
	let id =parseInt(window.location.href.slice(37,window.location.href.length)) 
    console.log(id);
	getProductDetail(id)
    getAllProducts(),
    getCategories()
    
}