let navIcon = document.getElementsByClassName("nav-icon")[0];

navIcon.addEventListener("click", () => {
  const sideBar = document.getElementById("sideBar");
  sideBar.classList.toggle("nav-toggle");
});

document.addEventListener("DOMContentLoaded", async () => {
  let menuData = null;

  menuData = await fetchData();

  displayMenu(menuData)

  takeOrder(menuData)
  .then((order) => {
    console.log("Order: ", order);
    return orderPrep();
  })
  .then((prepStatus) => {
    console.log("Order Prepared: ", prepStatus);
    return payOrder();
  })
  .then((paymentStatus) => {
    console.log("Payment Status:", paymentStatus);
    if(paymentStatus.paid){
        thankyouFnc();
        // console.log(menuData)
    }
  })
  .catch((error) => {
    console.log("Error", error);
  })
  


});

async function fetchData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

function displayMenu(menuData) {
    const menuContainer = document.getElementById("menu-cards");
    menuData.forEach((item) => {
        let menuCard = document.createElement("div");
        menuCard.className = "card";
        menuCard.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <div class="menu-info">
                <div class="info">
                    <h3>${item.name}</h3>
                    <h4>$${item.price}</h4>
                </div>
                <button class="btn"><i class="fa-solid fa-plus"></i></button>
            </div>
        `;
        menuContainer.appendChild(menuCard);
    });

    function takeOrder(menuData){

    }
}

function takeOrder(menuData){
    return new Promise((resolve) => {
        setTimeout(() => {
            const selectedItems = [];
            for(let i = 0; i < 3; i++){
                const randomIndex = Math.floor(Math.random() * menuData.length);

                selectedItems.push(menuData[randomIndex]);
            }
            const order = {items: selectedItems};
            // console.log(order);
            resolve(order);
        }, 2500);
    })
}

function orderPrep(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({order_status: true, paid: false});
        }, 1500);
    })
}

function payOrder(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({order_status: true, paid: true});
        })
    })
}

function thankyouFnc(){
    alert("Thank you for your order! Enjoy your meal.");
}
