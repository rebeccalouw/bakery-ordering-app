import { foodItemsData } from "./data.js"

const orderSummary = document.getElementById('order-summary')
const modal = document.getElementById('modal')

let ordersArray = []


// Add to basket button
document.addEventListener("click", (e) => {
    if (e.target.matches(".add-btn")) {
    addItemToBasket(e.target.dataset.add)}
  })


// Remove from basket button
document.addEventListener("click", (e) => {
    if (e.target.matches(".remove-btn")) {
        let itemIndex = ordersArray.findIndex(object => {
            return object.id === e.target.dataset.remove
        })
        ordersArray.splice(itemIndex, 1)
    }
    renderBasket()
  })


// Complete order button
document.addEventListener("click", (e) => {
    if (e.target.matches("#complete-order-btn")) {
    renderModal()
    }
})


// Close payment modal button
document.addEventListener("click", (e) => {
    if (e.target.matches("#modal-close-btn")) {
        modal.style.display = "none"
    }
})


// Pay button
document.addEventListener("submit", (e) => {
    if (e.target.matches("#payment-form")) {
        e.preventDefault()
        let name = document.getElementById("fullName")
        renderOrderConfirmation(name.value)
    }
})



function getFoodItemsHtml() {

    let foodItemsHtml = ``

    foodItemsData.forEach(function(item) {
        foodItemsHtml += `
            <div class="food-item">
                <img class="item-img" src="${item.itemImage}" alt="${item.alt}">
                <div class="item-info">
                    <h4 class="item-name">${item.itemName}</h4>
                    <p class="item-description">${item.itemDescription}</p>
                    <p class="item-price">$${item.itemPrice.toFixed(2)}</p>
                </div>
                <a class="add-btn" data-add="${item.id}" href="#order-summary">+</a>
            </div>
        `})
    return foodItemsHtml
}



function render(){
    document.getElementById('food-options-div').innerHTML = getFoodItemsHtml()
}



function addItemToBasket(foodItemId) {

    const targetFoodItem = foodItemsData.filter(function(foodItem){
        return foodItem.id === foodItemId
    })[0]

    ordersArray.push(targetFoodItem)

    renderBasket()
}


function renderBasket() {
    let ordersHtml = ``
    let totalPrice = 0

    ordersArray.forEach(function(item) {
        ordersHtml += `
            <div class="order-item">
                <h4 class="order-item-name">${item.itemName}</h4>
                <button class="remove-btn" data-remove="${item.id}">remove</button>
                <p class="item-price">$<span>${item.itemPrice.toFixed(2)}</span></p>
            </div>
        `
    })

    ordersArray.forEach( (item) => totalPrice += item.itemPrice )


    if (ordersArray.length > 0) {
        orderSummary.innerHTML = `
            <h2 class="order">Your order</h2>
            ${ordersHtml}
            <div class="order-total">
                <h4 class="order-item-name">Total price:</h4>
                <p class="item-price">$<span>${totalPrice.toFixed(2)}</span></p>
            </div>
            <div class="order-btn-container">
                <a class="order-btn" href="#header">Continue shopping</a>
                <a class="order-btn" id="complete-order-btn">Complete order</a>
            </div>
        `

    } else {
        orderSummary.innerHTML = ``
    }
}



function renderModal() {
    let modalHtml = ``

    modalHtml = `
            <button class="modal-close-btn" id="modal-close-btn">x</button>
            <h2>Enter card details</h4>
            <form class="payment-form" id="payment-form">
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    aria-label="Full Name"
                    required />
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Enter card number"
                    aria-label="Card number"
                    required />
                <input
                    type="text"
                    name="cardCVV"
                    placeholder="Enter CVV"
                    aria-label="Card CVV"
                    required />
                    <button class="modal-pay-btn" id="modal-pay-btn">Pay</button> 
            </form>
    `

    modal.innerHTML = modalHtml
    modal.style.display = "block"
}



function renderOrderConfirmation(nameInput) {
    let orderConfirmationHtml = ``

    orderConfirmationHtml = `
        <button class="modal-close-btn" id="modal-close-btn">x</button>
        <div class="order-confirmation-modal">
            <h2>Thank you, ${nameInput}!</h2> 
            <h3>Your order is on it's way!</h3>
            <p>crumb.</p>
            <img src="./images/bread-background2.jpeg" class="modal-img">
        <div>
    `

    modal.innerHTML = orderConfirmationHtml
    modal.style.display = "block"

    setTimeout( () => modal.style.display = "none", 3000)

    ordersArray = []
    renderBasket()
    window.scrollTo(0, 0)
}


render()




