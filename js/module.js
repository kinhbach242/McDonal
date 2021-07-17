const url = 'http://localhost:3000/'
const fetchAPI = async function fetchAPI(url, options){
    try{
        let res = await fetch(url, options)
        let datas = await res.json()
        return datas
    }
    catch(err){
        console.log(err)
    }
}
// const fetchAPIReverse = async function fetchAPIReverse(url, options, limit){
//     try{
//         let res = await fetch(url, options)
//         let datas = await res.json()
//         datas.reverse()
//         let result = []
//         for(let i=0; i<limit; i++){
//             result.push(datas[i])
//         }
//         return result
//     }
//     catch(err){
//         console.log(err)
//     }
// }
const fetchAndShowData = async function fetchAndShowData(url, options, cb){
    try{
        let res = await fetch(url, options)
        let datas = await res.json()
        return cb(datas)
    }
    catch(err){
        console.log(err)
    }
}
// const fetchAndShowDataReverse = async function fetchAndShowDataReverse(url, options, limit, cb){
//     try{
//         let res = await fetch(url, options)
//         let datas = await res.json()
//         datas.reverse()
//         let result = []
//         for(let i=0; i<limit; i++){
//             result.push(datas[i])
//         }
//         return cb(result)
//     }
//     catch(err){
//         console.log(err)
//     }
// }

//products

const getAllProducts= async function getAllProducts(){
    const productsUrl= url + 'products'
    const options= {
        method: "GET"
    }
    fetchAndShowData(productsUrl, options, showProducts )
}
const showProducts = (products)=>{
    const showItems= document.querySelector('#items_center');
    let productHTML= '';
    products.forEach(product => {
        productHTML += `<div class="item">
        <div class="item-img">
        <figure><img src="${product.image}" alt=""></figure>
        </div>
        <div class="item-footer">
            <h5 class="item-footer-title">${product.title}</h5>
            <div class="item-footer-rating">
                <ul>
                    <li><a href="#"><img src="images/star-icon.png"></a></li>
                    <li><a href="#"><img src="images/star-icon.png"></a></li>
                    <li><a href="#"><img src="images/star-icon.png"></a></li>
                    <li><a href="#"><img src="images/star-icon.png"></a></li>
                    <li><a href="#"><img src="images/star-icon.png"></a></li>
                </ul>
            </div>
        </div>
        <div class="item-bottom">
            <div class="item-bottom-btn">
                <a href="" class="add-to-cart btn btn-border-4" href="">Add To Card</a>
                <a href="detail.html?id=${product.id}" class="btn btn-border-4" href="">View</a>
            </div>
            <input type="hidden" value="${product.id}"/>
            <div class="item-bottom-price">${product.price} VNĐ</div>
        </div>
    </div>`
    showItems.innerHTML = productHTML;
    const addToCart = document.querySelectorAll('.add-to-cart')
        addToCart.forEach(item=>{
            item.addEventListener("click", function(e){
                e.preventDefault()
                const id = this.parentElement.parentElement.children[1].value
                const price = parseInt(this.parentElement.parentElement.children[2].textContent)
                let item = new shoppingCart()
                 item.addItemToCart(id, price, +1,1)
                 alert('Đã thêm thành công vào giỏ hàng!')
            })
    })
    });
}


//categories

const getCategories = async function getCategories(){
    const categoriesUrl= url + 'cat'
    const options={
        method: "GET"
    }
    fetchAndShowData(categoriesUrl, options, showCategories)
}
const showCategories = (categories)=>{
    const showCat= document.querySelector('.box_center')
    let catHTML = `<ul class="menu">`;
    categories.forEach(cat =>{
        catHTML += 
        // `<li><a href="#" id="${cat.id}" class="box category">${cat.nameCat}</a></li>`
        `<li  class="category"><a href="#" id="${cat.id}" class="">${cat.nameCat}</a></li>`
    })
    catHTML += `<li class="slider"></li>
    </ul>`
    showCat.innerHTML = catHTML;
    const arrCat = document.querySelectorAll('.category')
    arrCat.forEach(category=>{
        category.addEventListener("click",()=>{
            if( category.classList.contains('active')){
                category.classList.remove('active')
                getAllProducts()
            }else{
                arrCat.forEach(item=>{item.classList.remove('active')})
                category.classList.add('active')
                let val= category.classList.contains('active')
                const idCategory= Number(category.children[0].attributes['id'].value)
                console.log(category);
                filterByCategory(idCategory)
            }
        })
    })
}
const filterByCategory= async function filterByCategory(category){
    try{
        const productsUrl= url + 'products'
        const product = await fetchAPI(productsUrl)
        const productsByCategory= product.filter(product=> product.idCat == category)
        showProducts(productsByCategory);
    }catch (err){
        console.log(err);
    }
}

//detail

const getProductDetail= async function getProductDetail(id){
    const detailUrl= url + `products/${id}`
    const options={
        method: "GET"
    }
    fetchAndShowData(detailUrl,options, showDetail )
}
const showDetail= (product)=>{
    const showItemDetail= document.querySelector(".data-product-detail")
    let detailHTML= `
    <div class="img-card">
                <div class='img'>
                <img src="${product.image}" />
                </div>
            </div>
            <div class="product-details">
                <h2>${product.title}</h2>
                <p><i style="color: orange; margin-right: 10px;" class="fas fa-star"></i>4.5 | <span>2.5k reviews</span></p>
                <p>Price</p>
                <p><span>${product.price} VNĐ</span></p>
                <input type="hidden" value="${product.id}"/>
                <a class="add-to-cart btn btn-border-4 detailbtn" href="">Add to Cart</a>
            </div>`
    // let detailHTML= `
    // <div class="detail-main-thump">
    //             <img src="${product.image}" alt="">
    //         </div>
    //         <div class="detail-main-footer">
    //             <h5 class="title">${product.title} </h5>
    //             <h5 class="price">${product.price}</h5>
    //             <input type="hidden" value="${product.id}"/>
    //             <button type="button" class="btn btn-outline-dark">Add to Cart</button></button>
    //         </div>`;
     showItemDetail.innerHTML = detailHTML;
     const addToCart = document.querySelectorAll('.add-to-cart')
        addToCart.forEach(item=>{
            item.addEventListener("click", function(e){
                e.preventDefault()
                const id = this.parentElement.children[4].value
                console.log(id);
                const price = parseInt(this.parentElement.children[3].textContent)
                console.log(price);
                console.log( this.parentElement);
                let item = new shoppingCart()
                item.addItemToCart(id, price, +1,1)
                 alert('Đã thêm thành công vào giỏ hàng!')
            })
    })
}

const deleteOne = async function deleteOne(endPoint,id){
    try{
        const deleteUrl = url + `${endPoint}/${id}` 
        const options = {
            method:"DELETE"
        }
        fetchAPI(deleteUrl, options)
    }
    catch(err){
        console.log(err)
    }
}


export {

    getAllProducts,
    getCategories,
    getProductDetail,
    fetchAPI,
    fetchAndShowData,
    deleteOne,
}