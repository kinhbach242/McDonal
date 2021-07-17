import { fetchAPI, fetchAndShowData,deleteOne } from './module.js'
const url = 'http://localhost:3000/'
const getCategoriesList = async function getCategoriesList(){
    try{
        const categoriesUrl = url + 'cat'
        const options = {
            method:"GET"
        }
        fetchAndShowData(categoriesUrl, options, processCategoriesList)
    }
    catch(err){
        console.log(err)
    }
}
const processCategoriesList = async (categories) => { 
    try{
        const content = document.querySelector('#content')
        let html = ''
        categories.forEach(category=>{
            html += `<tr>
            <td>${category.id}</td>
            <td>${category.nameCat}</td>
            <td class="text-center">
                <button  class="btn-delete btn btn-success" id="${category.id}">Delete</button>
            </td>
            <td>
                <button class="btn-edit btn btn-success" id="${category.id}">Edit</button>
            </td>
        </tr>`
        })
        content.innerHTML = html
        openModalCategories()
        const endPoint = 'cat'
        const btnDel = document.querySelectorAll('.btn-delete')
        btnDel.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                e.preventDefault()
                let id = btn.getAttribute('id')
                deleteOne(endPoint, id)
                
            })
        })
        openEditCategory()


   }
    catch(err){
        console.log(err)
    }

}
const postCategories = async function postCategories(){
    try{
        //get data from form
        const nameCat = document.querySelector('#name').value

        if(nameCat.trim().length == 0 ){
            alert('Please fill in all the fields')
            return
        }

        //url
        const categoriesUrl = url + 'cat'
        const data = {
            nameCat
        }
        const options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchAPI(categoriesUrl, options)
        getCategoriesList()
    }catch(err){
        console.log(err)
    }
   
}
const editCategory = async function editCategory(id){
    try{
        //get data from form
        const nameCat = document.querySelector('#name').value


        if(nameCat.trim().length == 0 ){
            alert('Please fill in all the fields')
            return
        }

        //url
        const categoriesUrl = url + `cat/${id}`
        const data = {
            nameCat
        }
        const options = {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        await fetchAPI(categoriesUrl, options)
        getCategoriesList()
    }catch(err){
        console.log(err)
    }
   
}
const openModalCategories = function(){
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
            const nameCategory = document.querySelector('#name')
            const id = document.querySelector('#id')
            id.value = 0
            nameCategory.value = ''
            const titleModal = document.querySelector('.title-modal')
            titleModal.innerHTML  = 'Add Category'
            const btnSubmit = document.querySelector('.btn-submit')
            btnSubmit.innerHTML = 'Add Category'
            const getId = parseInt(document.querySelector('#id').value)
            btnSubmit.onclick = (e) => {
                e.preventDefault()
                if(getId==0){
                    postCategories()  
                }else{
                    editCategory(getId)
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
const openEditCategory = async function(){
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
                const categoriesUrl = url + `cat/${this.getAttribute('id')}`
                const options = {
                    method:"GET"
                }
                const valueCategory = await fetchAPI(categoriesUrl, options)
                modal.style.opacity = "1";
                modal.style.display = "block"
                const nameCategory = document.querySelector('#name')
                const id = document.querySelector('#id')
                id.value = valueCategory.id
                nameCategory.value = valueCategory.nameCat
                const titleModal = document.querySelector('.title-modal')
                titleModal.innerHTML  = `Edit Product ${valueCategory.nameCat}`
                const btnSubmit = document.querySelector('.btn-submit')
                btnSubmit.innerHTML = 'Edit Product'
                const getId = parseInt(document.querySelector('#id').value)
                btnSubmit.onclick = (e) => {
                    e.preventDefault()
                    if(getId==0){
                        postCategories()  
                    }else{
                        editCategory(getId)
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
    getCategoriesList()
}