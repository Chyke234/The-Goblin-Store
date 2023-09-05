$(document).ready(function () {
  let products = [
    {
      name: "Supreme Goblin",
      price: 150,
      quantity: 0,
      image: "../../pics/sup.jpeg", 
    },
    {
      name: "Magical Goblin",
      price: 125,
      quantity: 0,
      image: "../../pics/mage.jpeg",
    },
    {
      name: "Elite Goblin",
      price: 110,
      quantity: 0,
      image: "../../pics/elite.jpeg",
    },
    {
      name: "Joker Goblin",
      price: 80,
      quantity: 0,
      image: "../../pics/joker.jpeg"
    },
    {
      name: "Mage Goblin",
      price: 65,
      quantity: 0,
      image: "../../pics/mag.webp"
    },
    {
      name: "Dancing Goblin",
      price: 55,
      quantity: 0,
      image: "../../pics/dancing.jpg"
    },
    {
      name: "Sad Goblin",
      price: 35,
      quantity: 0,
      image: "../../pics/sad.jpeg"
    },
    {
      name: "Broken Goblin",
      price: 25,
      quantity: 0,
      image: "../../pics/broken.png"
    },
    {
      name: "Crying Goblin",
      price: 15,
      quantity: 0,
      image: "../../pics/crying.png"
    },
    
  ];

  let itemNumber = 0;
  if (localStorage.getItem("items")) {
    products = JSON.parse(localStorage.getItem("items"));
    itemNumber = products.length;
  }
  $(".numberOfItems").text(itemNumber);

  
   // Function to calculate the total cost of items in the cart
   function calculateTotalCost() {
    let totalCost = 0;
    products.forEach((product) => {
      totalCost += product.price * product.quantity;
    });
    return totalCost;
  }

  // Function to update the modal content
  function updateModalContent() {
    let modalBody = $(".modal-body");
    modalBody.empty(); // Empty the initial contents of the modal body before adding new items

    // Check if the cart is empty
    if (products.length === 0) {
      modalBody.html('<p>No Items... Please add items to your cart.</p>');
      $(".total-cost").text("Total: $0.00"); // Set the total cost to $0.00
    } else {
      // Render cart items
      products.forEach((product) => {
        modalBody.append(`
          <div class="productWrapper" id="${product.name}">
            <div id="productInfo">
              <img src="${product.image}" alt="${product.name}" class="productImage">
              <div class="name">${product.name} - $${product.price}/item</div>
              <div class="quantity">x ${product.quantity}</div>
            </div>
            <div id="actions">
              <button class="btn btn-primary increaseQuantity" id="${product.name}">
                +
              </button>
              <button class="btn btn-danger decreaseQuantity" id="${product.name}">
                -
              </button>               
            </div>
          </div>
        `);
      });

      // Update the total cost in the modal footer
      $(".total-cost").text(`Total: $${calculateTotalCost().toFixed(2)}`);
    }
  }

  // When the user clicks the shopping cart button, update .modal-body with the items in the cart
  $(".buttonWrapper").click(function () {
    // Update the modal content
    updateModalContent();
  });

  // Handle increaseQuantity button click event
 // Click event handler for the "Increase Quantity" button
 $(document).on("click", ".increaseQuantity", function () {
  let productName = $(this).attr("id");
  let product = products.find((product) => product.name === productName);
  product.quantity++;

  // Update the quantity div's text
  $(this).closest(".productWrapper").find(".quantity").text(`x ${product.quantity}`);

  // Update the items in localStorage
  localStorage.setItem("items", JSON.stringify(products));

  // Recalculate and display total cost
  let totalCost = calculateTotalCost();
  $(".modal-body").find("p").text(`Total cost: $${totalCost.toFixed(2)}`);
});

// Click event handler for the "Decrease Quantity" button
$(document).on("click", ".decreaseQuantity", function () {
  let productName = $(this).attr("id");
  let product = products.find((product) => product.name === productName);

  if (product.quantity > 1) {
    product.quantity--;

    // Update the quantity div's text
    $(this).closest(".productWrapper").find(".quantity").text(`x ${product.quantity}`);

    // Update the items in localStorage
    localStorage.setItem("items", JSON.stringify(products));
  };
});
});


// Handle clearCartBtn click event
$(".clearCartBtn").click(function () {
  // Clear the cart items from localStorage
  localStorage.removeItem("items");

  // Clear the products array
  products = [];

  // Update the number of items in the cart
  $(".numberOfItems").text("0");

  // Clear the modal body
  $(".modal-body").empty();

  // Clear the total cost
  $(".total-cost").text("$0.00");
});
