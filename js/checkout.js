
import {fetchAPI} from './module.js'
const proceedToCheckout = async function proceedToCheckout(){
    try {
        let array= new shoppingCart().listCart();
        if(array.length==0){
            document.querySelector('#content').innerHTML = `<h3 style="text-align:center">Không còn sản phẩm trong giỏ. <a href="shop.html">Quay lại mua sắm</a><h3>`
            return
        }
        console.log(array);
        const productsUrl = 'http://localhost:3000/products'
        const options = {
            method:"GET"
        }
        let products = await fetchAPI(productsUrl, options)
        let cart = []
        array.forEach(item=>
            products.forEach(product=>{
                if(product.id == item.id){
                    cart.push({...product, ...item})
                }
            })
        )
        let total = 0 
        cart.map(item=>total +=parseInt(item.unitPrice))
        cart.total = total
        console.log(cart)
        let html = `<div class="cart-wrapper__right">
        <h6 class="title">Hóa đơn</h6>
        <hr>
        <div class="order-row">
            <p class="order-row__bold">Giá sản phẩm:</p>
            <p class="order-row__normal" id="pricesOrder">$${total}</p>
        </div>
        <div class="order-row">
            <p class="order-row__bold">Phí ship:</p>
            <p class="order-row__normal" id="shipping">Miễn phí</p>
        </div>
        <div class="order-row">
            <p class="order-row__bold">Khách hàng:</p>
            <p class="order-row__normal" id="getFullname"></p>
        </div>
        <div class="order-row">
            <p class="order-row__bold">Số điện thoại:</p>
            <p class="order-row__normal" id="getPhoneNumber"></p>
        </div>
        <div class="order-row">
            <p class="order-row__bold">Địa chỉ:</p>
            <p class="order-row__normal" id="getAddress"></p>
        </div>
        <div class="total">
            <p>Tổng:</p>
            <p style="color: red" id="total">$${total}</p>
        </div>
        <a href="#" class="btn btn-cart btn-border-4" id="btnCheckout">
            Thanh toán
        </a> 
    </div>`
        document.querySelector('.pageCheckout').innerHTML+= html
        const fullname = document.querySelector('#fullname')
        const phoneNumber = document.querySelector('#phoneNumber')
        const address = document.querySelector('#address')
        const getFullname = document.querySelector('#getFullname')
        const getPhoneNumber = document.querySelector('#getPhoneNumber')
        const getAddress = document.querySelector('#getAddress')
        fullname.onkeyup = (e) =>{
            e.preventDefault()
            getFullname.innerHTML = fullname.value
        }
        phoneNumber.onkeyup = (e) =>{
            e.preventDefault()
            getPhoneNumber.innerHTML = phoneNumber.value
        }
        address.onkeyup = (e) =>{
            e.preventDefault()
            getAddress.innerHTML = address.value
        }
        const btnCheckout = document.querySelector('#btnCheckout')
        btnCheckout.onclick = async (e)=>{
            e.preventDefault()
            if(fullname.value.length==0){
                alert('Họ tên không được để trống !')
                return
            }else if(phoneNumber.value.length==0){
                alert('SĐT không được để trống!')
                return
            }else if(address.value.length==0){
                alert('Địa chỉ không được để trống!')
                return
            }
            const info = {
                            fullname:getFullname.textContent, 
                            phoneNumber:getPhoneNumber.textContent, 
                            address:getAddress.textContent
                        }
           await postOrder(info, cart)
            sessionStorage.removeItem('shoppingCart')
        }
    } catch (error) {
        console.log(error)
    } 
}
proceedToCheckout()
const postOrder = async function postOrder(info ,cart){
    try{
        //order
        const orderUrl = 'http://localhost:3000/orders'
        const order = {
            customer:info,
            product:cart,
            total:cart.total
        }
        const options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }
        await fetchAPI(orderUrl, options)

        //order detail
        const orderDetailUrl = 'http://localhost:3000/orderDetail'
        const cartLength = cart.length
        let orderDetail = {}
        for(let i=0;i<cartLength;i++){
            orderDetail={customer:info,product:cart[i]}
            const options2 = {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetail)
            }
            await fetchAPI(orderDetailUrl, options2)
        }
        alert('Thanh toán thành công')
        
    }catch(error){
        console.log(err)
    }
}


