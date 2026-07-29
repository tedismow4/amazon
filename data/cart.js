export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart){
  cart = [];
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  }else{
    cart.push({
    productId,
    quantity: Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
  });
  }
  saveToStorage();
}

export function removeItem(productId){
  const newCart = [];

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === productId){
      cart[index].quantity = newQuantity;
    }
  });
  saveToStorage();
}
