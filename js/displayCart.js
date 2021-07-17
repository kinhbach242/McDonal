const content = document.querySelector('.products')
async function fetchAllProducts(url){
    const res = await fetch(url)
    const datas = await res.json()
    return datas
}

async function displayCart(){
    let cartArray = new shoppingCart().listCart();
    let products = await fetchAllProducts('http://localhost:3000/products')
    let cart = [];
    cartArray.forEach(item=>
        products.forEach(product=>{
            if(product.id == item.id){
                cart.push({...product, ...item})
            }
        })

    )
    let htmlCart = "";
    cart.forEach(product=>{
        htmlCart += `
        <div class="product">
        <div class="product-image">
        <img src="${product.image}">
      </div>
      <div class="product-details">
        <div class="product-title">${product.title}</div>

      </div>
      <div class="product-price">${product.price}</div>
      <div class="product-quantity">
      <input type="number" min="1" max="10" name="quantity" 
                        data-id="${product.id}" 
                        data-price="${product.price}" 
                        data-total="${product.total}"
                      class="quantity" value="${product.quantity}"/>
      </div>
      <div class="product-removal">
        <button data-id="${product.id}" class="remove-product">
          Xóa
        </button>
      </div>
      <div class="product-line-price">${product.unitPrice} VNĐ</div>
      </div>`
        
        })
        let total = 0 
        cart.map(item=>total +=parseInt(item.unitPrice))
        htmlCart+=`<div class="totals">
        <div class="totals-item">
          <label>Tổng tiền</label>
          <div class="totals-value" id="cart-subtotal">${total} VNĐ</div>
        </div>
    </div>
    <a href="pay.html" class="btn checkout btn-border-4">Thanh toán</a>
    `
        innerCart(htmlCart)
        const update = document.querySelectorAll('.quantity')
        update.forEach(item=>{
            item.onchange = function(){
                let getId = this.dataset.id
                let getPrice = Number(this.dataset.price)
                let getQuantity = this.value
                let getSize = this.dataset.size
                let cartArray = new shoppingCart()
                cartArray.updateItemFromCart(getId, getPrice, getQuantity, getSize)
                displayCart()
            }
        })
        const removeCart = document.querySelectorAll('.remove-product')
        removeCart.forEach(item=>{
            item.onclick = function(){
                let id = this.dataset.id
                let cartArray = new shoppingCart()
                cartArray.removeItemFromCart(id)
                displayCart()
            }
        })
}

function innerCart(val){
    content.innerHTML = val
}

displayCart()