//function to fetch cart items from localStorage
function getCartItems() {
  return JSON.parse(localStorage.getItem("items")) || [];
}

// Function to calculate the total cost of items in the cart
function calculateTotalCost(cartItems) {
  let totalCost = 0;
  cartItems.forEach((item) => {
    totalCost += item.price * item.quantity;
  });
  return totalCost;
}

// Function to display cart items and total cost in the cartItems div
function displayCartItems() {
  const cartItems = getCartItems();
  const cartItemsList = document.getElementById("cartItemsList");
  const totalCostElement = document.getElementById("totalCost");

  cartItemsList.innerHTML = ""; // Clear the previous content

  if (cartItems.length > 0) {
    let totalCost = 0;

    cartItems.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.innerHTML = `<p>${item.name} -£${(
        item.price * item.quantity
      ).toFixed(2)}</p>`; 
      cartItemsList.appendChild(listItem);

      totalCost += item.price * item.quantity;
    });

    // Update the total cost
    totalCostElement.textContent = `Total cost: £${totalCost.toFixed(2)}`;
  } else {
    cartItemsList.innerHTML = "<p>No items in the cart.</p>";
    totalCostElement.textContent = "Total cost: £0.00";
  }
}

// Event listener to display cart items when the DOM is loaded
document.addEventListener("DOMContentLoaded", displayCartItems);

// Function to validate the form fields
function validateForm() {
  // Get form field values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const creditCard = document.getElementById("creditCard").value.trim();
  const expiry = document.getElementById("expiry").value.trim();

  //Check if all fields are filled and credit card number is valid
  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    phone === "" ||
    address === "" ||
    creditCard === "" ||
    expiry === ""
  ) {
    // Show an error message or take appropriate action
    alert("Please fill in all required fields.");
    return false;
  }

  // Validate the credit card number 
  if (!isValidCreditCard(creditCard)) {
    alert("Invalid credit card number.");
    return false;
  }


  // If all validations pass, return true
  return true;
}

// Custom function to validate credit card number
function isValidCreditCard(creditCard) {
  // To remove all non-digit characters from the credit card string
  const cleanCreditCard = creditCard.replace(/\D/g, "");

  // To check if the credit card number is 16 digits long
  if (cleanCreditCard.length !== 16) {
    return false;
  }

  // To check if the credit card number contains only digits
  if (!/^\d+$/.test(cleanCreditCard)) {
    return false;
  }

  return true;
}


// Firebase configuration for connecting to the Firebase Realtime Database. It imports the necessary Firebase modules and initializes the Firebase app.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2cYSckJ4GLZMPPcB0d0-LLLQk8EMan-w",
  authDomain: "goblinstore-1cc4f.firebaseapp.com",
  databaseURL: "https://goblinstore-1cc4f-default-rtdb.firebaseio.com",
  projectId: "goblinstore-1cc4f",
  storageBucket: "goblinstore-1cc4f.appspot.com",
  messagingSenderId: "576184891173",
  appId: "1:576184891173:web:0380f1bb604ff79c64cccc",
  measurementId: "G-FTRRR100GF", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var address = document.getElementById("address");

function storeData() {
  // Get the values from the form fields
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const emailValue = email.value;
  const phoneValue = phone.value;
  const addressValue = address.value;

  // Prepare the data as an object
  const data = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
    phone: phoneValue,
    address: addressValue,
  };

  // Reference to the collection in the Firebase Realtime Database where to store the data
  const usersRef = ref(database, "users");

  // To push the data to the collection and automatically generate a unique key for each entry
  push(usersRef, data)
    .then(() => {
      console.log("Data stored successfully!");
      alert("Data stored successfully!");
    })
    .catch((error) => {
      console.error("Error storing data:", error);
      alert("Error storing data. Please try again later.");
    });
}

// Handle the form submission
const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Get form field values and cart items
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const creditCard = document.getElementById("creditCard").value.trim();
  const expiry = document.getElementById("expiry").value.trim();

  // Validate the form
  if (validateForm()) {
    // Get cart items and total cost
    const cartItems = getCartItems();
    const totalCost = calculateTotalCost(cartItems);

    // To call the sendConfirmationEmail function with the required parameters
    sendConfirmationEmail(
      firstName,
      lastName,
      email,
      phone,
      address,
      creditCard,
      expiry,
      cartItems,
      totalCost
    );
    storeData(firstName, lastName, email, phone, address);
  }
});

// Function to send the email confirmation using emailjs
function sendConfirmationEmail(
  firstName,
  lastName,
  email,
  phone,
  address,
  creditCard,
  _expiry,
  cartItems,
  totalCost
) {
  emailjs.init("ETNE0YnDGn-ZCl78o");

  // Email service setup 
  const emailService = "service_j4pfjnp";
  const templateId = "template_0v02j55";

  // Blur out the first 12 digits and display only the last 4 of the credit card
  const blurredCreditCard = creditCard.replace(/^\d{12}/, "**** **** **** ");

  // Prepare email parameters
  const params = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    address: address,
    creditCard: blurredCreditCard,
    cartItems: cartItems,
    totalCost: totalCost.toFixed(2), 
  };

  emailjs
    .send(emailService, templateId, params)
    .then((response) => {
      console.log("Email sent successfully!", response);
     
      // Clear form fields after successful email sending
      document.getElementById("expiry").value = "";
      document.getElementById("securityCode").value = "";
      document.getElementById("creditCard").value = "";
      
      // Display success message or take any other actions as needed
      alert("Payment submitted successfully!");
      
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      // Display an error message 
      alert("Error sending email. Please try again later.");
    });
}