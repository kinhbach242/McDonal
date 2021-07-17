import { fetchAPI, fetchAndShowData,deleteOne } from './module.js'
const url = 'http://localhost:3000/'
const getProductsList = async function getProductsList(){
    try{
        const categoriesUrl = url + 'products'
        const options = {
            method:"GET"
        }
        fetchAndShowData(categoriesUrl, options, processProductsList)
    }
    catch(err){
        console.log(err)
    }
}
const processProductsList = async (products) => { 
    try{
        const content = document.querySelector('#content')
        let html = ''
        products.forEach(product=>{
            html += `<tr>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td><img style="width: 70px" src="${product.image}" alt=""></td>
            <td>${product.price}</td>
            <td>${product.idCat}</td>
            <td class="text-center">
                <button  class="btn-delete btn btn-success" id="${product.id}">Delete</button>
            </td>
            <td>
                <button class="btn-edit btn btn-success" id="${product.id}">Edit</button>
            </td>
        </tr>`
        })
        content.innerHTML = html
        openModalProducts()
        const endPoint = 'products'
        const btnDel = document.querySelectorAll('.btn-delete')
        btnDel.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                e.preventDefault()
                let id = btn.getAttribute('id')
                deleteOne(endPoint, id)
                
            })
        })
        openEditProduct()


   }
    catch(err){
        console.log(err)
    }

}
const postProducts = async function postProducts(){
    try{
        //get data from form
        const title = document.querySelector('#name').value
        const price = document.querySelector('#price').value
        const idCat = document.querySelector('#idCat').value

        if(title.trim().length == 0 || price.trim().length == 0 || idCat.lenth == 0){
            alert('Please fill in all the fields')
            return
        }

        //url
        const productsUrl = url + 'products'
        const data = {
            title,
            price,
            idCat
        }
        const options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchAPI(productsUrl, options)
        getProductsList()
    }catch(err){
        console.log(err)
    }
   
}
const editProduct = async function editProduct(id){
    try{
        //get data from form
        const title = document.querySelector('#name').value
        const price = document.querySelector('#price').value
        const idCat = document.querySelector('#idCat').value


        if(title.trim().length == 0 || price.trim().length == 0 || idCat.lenth == 0){
            alert('Please fill in all the fields')
            return
        }
        //url
        const productsUrl = url + `products/${id}`
        const data = {
            title,
            price,
            idCat
        }
        const options = {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        await fetchAPI(productsUrl, options)
        getProductsList()
    }catch(err){
        console.log(err)
    }
   
}
const openModalProducts = function(){
    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the button that opens the modal
    const btn = document.querySelector(".btn-modal");
    
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
        btn.onclick = function(e) {
            e.preventDefault()
            modal.style.opacity = "1";
            modal.style.display = "block"
            const nameProduct = document.querySelector('#name')
            const id = document.querySelector('#id')
            const price = document.querySelector('#price')
            const idCat = document.querySelector('#idCat')
            id.value = 0
            nameProduct.value = ''
            const titleModal = document.querySelector('.title-modal')
            titleModal.innerHTML  = 'Add product'
            const btnSubmit = document.querySelector('.btn-submit')
            btnSubmit.innerHTML = 'Add product'
            const getId = parseInt(document.querySelector('#id').value)
            btnSubmit.onclick = (e) => {
                e.preventDefault()
                if(getId==0){
                    postProducts()  
                }else{
                    editProduct(getId)
                }
            }
        }   
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.opacity = "0"
        setTimeout(()=>{modal.style.display = "none";
            },450)
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.opacity = "0"
        setTimeout(()=>{modal.style.display = "none";
            },450)
        }
    }
}
const openEditProduct = async function(){
    try{
        // Get the modal
        const modal = document.getElementById("myModal");

        // Get the button that opens the modal
        const btn = document.querySelectorAll(".btn-edit");
        
        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
        // When the user clicks the button, open the modal 
        btn.forEach(e=>{
            e.onclick = async function(e) {
                e.preventDefault()
                const productsUrl = url + `products/${this.getAttribute('id')}`
                const options = {
                    method:"GET"
                }
                const valueProduct = await fetchAPI(productsUrl, options)
                modal.style.opacity = "1";
                modal.style.display = "block"
                const title = document.querySelector('#name')
                const id = document.querySelector('#id')
                const price = document.querySelector('#price')
                const idCat = document.querySelector('#idCat')
                id.value = valueProduct.id
                title.value = valueProduct.title
                price.value = valueProduct.price
                idCat.value = valueProduct.idCat
                const titleModal = document.querySelector('.title-modal')
                titleModal.innerHTML  = `Edit Product ${valueProduct.title}`
                const btnSubmit = document.querySelector('.btn-submit')
                btnSubmit.innerHTML = 'Edit Product'
                const getId = parseInt(document.querySelector('#id').value)
                btnSubmit.onclick = (e) => {
                    e.preventDefault()
                    if(getId==0){
                        postProducts()  
                    }else{
                        editProduct(getId)
                    }
                }
            } 
            
        })
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.opacity = "0"
            setTimeout(()=>{modal.style.display = "none";
                },450)
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.opacity = "0"
            setTimeout(()=>{modal.style.display = "none";
                },450)
            }
        }


    }
    catch(err){
        console.log(err)
    }
}
window.onload = () => {
    getProductsList()
}