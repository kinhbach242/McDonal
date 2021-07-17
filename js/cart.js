var  cart = [];
class shoppingCart{
    
  // Constructor
  constructor(id, price, quantity, size) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.size = size;
  }
    // Save cart
    saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
      // const iconCart = document.querySelector('.icon-cart')
      // iconCart.setAttribute('data-cart',cart.length)
    }
    
      // Load cart
     loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    addItemToCart(id,price, quantity, size) {
      for(let item in cart) {
        if(cart[item].id === id) {
          cart[item].quantity +=Number(quantity);
          this.saveCart();
          return;
        }
      }
      let obj= {id, price, quantity, size}
      cart.push(obj);
      this.saveCart();
    }
    updateItemFromCart(id,price, quantity, size) {
      for(let item in cart) {
        if(cart[item].id === id) {
          cart[item].quantity =Number(quantity);
          this.saveCart();
          return;
        }
      }
      let obj= {id,price, quantity, size}
      cart.push(obj);
      this.saveCart();
    }
    removeItemFromCart(id){
      for(var item in cart) {
        if(cart[item].id === id) {
          cart[item].quantity --;
          if(cart[item].quantity === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    this.saveCart();
  }
    //   // List cart
  listCart() {
    var cartCopy = [];
    for(let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for(let p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.unitPrice = Number(item.price * item.quantity).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
}

if (sessionStorage.getItem("shoppingCart") != null) {
  var  cart = new shoppingCart()
  cart.loadCart();
  // const iconCart = document.querySelector('.icon-cart')
  // iconCart.setAttribute('data-cart',cart.length)
}