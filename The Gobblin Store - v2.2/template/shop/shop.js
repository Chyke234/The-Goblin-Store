// on document ready
$(document).ready(() => {
  
  $("#header").load("../../template/header/header.html", () => {
    $("#headerShop")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });

 
  $("#footer").load("../../template/footer/footer.html", () => {
    $("#footerShop")
      .removeClass()
      .addClass("nav-link active text-black fw-bold");
  });

  // Load shoppingCart.html
  $("#shoppingCart").load("../../template/shoppingCart/shoppingCart.html");

       
       $(".card").click(function () {
        let products = [];
    
        // populate the products array with the current product's info
        if (localStorage.getItem("items")) {
          products = JSON.parse(localStorage.getItem("items"));
        }
    
        const itemElement = $(this).find(".card-text").text(); // Supreme Goblin$100
        const itemName = itemElement.split("£")[0]; // Supreme Goblin
        const itemPrice = itemElement.split("£")[1]; // 100
    
    
    
        // check if the item is already in the cart
        let itemExists = false;
        products.forEach((product) => {
          if (product.name === itemName) {
            itemExists = true;
            product.quantity += 1;
          }
        });
    
        // if the item is not in the cart, add it to the cart
        if (!itemExists) {
          products.push({
            name: itemName,
            price: itemPrice,
            quantity: 1,
          });
        }
    
        // save the products array to localStorage
        localStorage.setItem("items", JSON.stringify(products));
    
        // Open shoppingCartButton.html and update .numberOfItems div
        $("#shoppingCart").load("../../template/shoppingCart/shoppingCart.html", () => {
          $(".numberOfItems").text(products.length);
        });
      });
    });

    
    $(document).ready(() => {
      // Load shoppingCart.html
      $("#shoppingCart").load("../../template/shoppingCart/shoppingCart.html");
    
      // Rest of the code for products array, itemNumber, calculateTotalCost, updateModalContent, etc.
    
       // Function to handle "Add item" button click
    $(".addItemBtn").click(function () {
      let products = [];

      // populate the products array with the current product's info
      if (localStorage.getItem("items")) {
        products = JSON.parse(localStorage.getItem("items"));
      }

      const itemElement = $(this).siblings(".card").find(".card-text").text(); // Supreme Goblin$150
      const itemName = itemElement.split("£")[0].trim(); // Supreme Goblin
      const itemPrice = parseFloat(itemElement.split("£")[1]); // 150

      // check if the item is already in the cart
      let itemExists = false;
      products.forEach((product) => {
        if (product.name === itemName) {
          itemExists = true;
          product.quantity += 1;
        }
      });

      // if the item is not in the cart, add it to the cart
      if (!itemExists) {
        products.push({
          name: itemName,
          price: itemPrice,
          quantity: 1,
        });
      }

      // save the products array to localStorage
      localStorage.setItem("items", JSON.stringify(products));

      // Open shoppingCartButton.html and update .numberOfItems div
      $("#shoppingCart").load("../../template/shoppingCart/shoppingCart.html", () => {
        $(".numberOfItems").text(products.length);
      });
    });

  
// Hover effect for 'game-card' class
  $('.game-card').hover(
    function () {
      $(this).css('cursor', 'pointer');
      $(this).css('transform', 'scale(1.05)');
      $(this).css('box-shadow', '0 0 10px rgba(0,0,0,0.2)');
    },
    function () {
      $(this).css('cursor', 'default');
      $(this).css('transform', 'scale(1)');
      $(this).css('box-shadow', 'none');
    }
  );

  });