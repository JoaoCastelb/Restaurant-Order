import { menuArray } from "./data.js";

const btn = document.getElementById("show-menu")
const modalEl = document.getElementById("modal-inner")
const consentForm = document.getElementById("form")
const finish = document.getElementById("none")
let selectedMenu = []
let total = 0

btn.addEventListener("click", renderMenu)

consentForm.addEventListener('submit', function(e){
    e.preventDefault() 

    const userName = document.getElementById("user")
    const menssage =document.getElementById("final")
    menssage.innerHTML=`<p>Thanks, ${userName.value}! Your order is on its way!</p>`

    document.getElementById("form").reset();
    finish.style.display="none"
})

document.addEventListener("click", function(e){
    if(e.target.dataset.plus){
        orderMenu(e.target.dataset.plus)
    }
    if(e.target.dataset.menos){
        removeFood(e.target.dataset.menos)
    }  
})

function getMenu(){
    let showMenu =''

    menuArray.forEach(function(food){
        showMenu += `<div class="food-display" id="${food.id}">
                        <div class="test">
                            <h1 class="icon">${food.emoji}</h1>

                            <div class="content">
                                <h1>${food.name}</h1>
                                <p>${food.ingredients}</p>
                                <h3>${food.price}€</h3>
                            </div>
                        </div>
                        <div class="btns">
                            <button class="mais"data-plus="${food.id}"> + </button>
                            <button class="menos" data-menos="${food.id}"> - </button>
                        </div>  
                    </div>`    
    })
    return showMenu   
}

function closeBtn(){
    document.getElementById("close-btn").addEventListener("click", function(){
        document.getElementById("menu").className = "none"
    })
}

function orderMenu(order){
    document.getElementById("order").innerHTML = ''
    

    menuArray.forEach(function(food){
        if(food.id === order){ 
            selectedMenu.unshift(food.name)
            total = total + food.price
            food.quantity++
        }
        
        if(food.quantity!=0){
            document.getElementById("order").innerHTML += `<div class="food-table"><p>${food.name} (${food.quantity})</p><p>${food.price*food.quantity }€</p></div>`
            document.getElementById("total-price").innerHTML = `<p>Total: ${total} € </p><button id="order-btn">Complete order</button>`
        }
    })

    document.getElementById("order-btn").addEventListener("click", showModal)
    document.getElementById("close-modal").addEventListener("click", closeModal)
}

function removeFood(order){
    document.getElementById("order").innerHTML = ''

    menuArray.forEach(function(food){
        if(food.id === order){ 
            if(food.quantity>0){
            selectedMenu.unshift(food.name)
            total = total - food.price
            food.quantity-- 
            }
        }
        
        if(food.quantity>0){ 
            document.getElementById("order").innerHTML += `<div class="food-table"><p>${food.name} (${food.quantity}) </p><p>${food.price*food.quantity }€</p></div>`
        }  

        if (total === 0){
            document.getElementById("total-price").innerHTML = ``

        }else{
            document.getElementById("total-price").innerHTML = `<p>Total: ${total} € </p><button id="order-btn">Complete order</button>`
        }    
    })  
    
    document.getElementById("order-btn").addEventListener("click", showModal)
    document.getElementById("close-modal").addEventListener("click", closeModal)
}

function showModal(){
    modalEl.style.display="flex"
}

function closeModal(){
    modalEl.style.display="none"
}

function renderMenu(){
    document.getElementById("menu").className = "menu"
    document.getElementById("menu").innerHTML= getMenu() + `<button class="close-btn" id="close-btn"> close </button>`
    closeBtn()  
}





