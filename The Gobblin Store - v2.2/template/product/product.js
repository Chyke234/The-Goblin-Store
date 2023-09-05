// Function to fetch games data from the API
async function fetchGames() {
  const apiKey = "36e37a2bf6ec45398ac099d3d3307ae2";
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2020-09-01,2023-09-30&platforms=18,1,7`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const games = data.results;

    // Extract the required details: name, release date, genre, and image
    const gameDetails = games.map(game => ({
      name: game.name,
      release_date: game.released,
      genre: game.genres.map(genre => genre.name).join(", "),
      image: game.background_image,
      // The price will be fetched separately using fetchGamePrice function
      price: null, // Set initial price to null
    }));
  
    return gameDetails;
  } catch (error) {
    console.error("Error fetching game data:", error);
    return [];
  }
}

// Click event handler for the game cards
$(document).on("click", ".game-card", async function() {
  event.preventDefault();
  const gameId = $(this).attr("data-game-id");
  const games = await fetchGames();
  const game = games.find(game => game.name === gameId);

  //Logic to handle the game card click event
  const gameDetails = `
  Game Name: ${game.name}
  Release Date: ${game.release_date}
  Genre: ${game.genre}`;

  // Display game details in an alert
  alert(gameDetails);
});

// Function to display game data on the page
async function displayGames(games) {
  const mainContent = $("#product-container");
  mainContent.empty(); // Clear previous content

  games.forEach(game => {
    const gameCard = $("<a>").addClass("game-card").attr("data-game-id", game.name);

    const gameImage = $("<img>").attr("src", game.image).attr("alt", game.name);
    gameCard.append(gameImage);

    const gameName = $("<h2>").text(game.name);
    gameCard.append(gameName);

    const gameReleaseDate = $("<p>").text("Release Date: " + game.release_date);
    gameCard.append(gameReleaseDate);

    const gameGenre = $("<p>").text("Genre: " + game.genre);
    gameCard.append(gameGenre);

    mainContent.append(gameCard);
  });
}

// Function to fetch products and display them on the page
async function showProducts() {
  const games = await fetchGames();
  displayGames(games);
}

$(document).ready(() => {
  $("#header").load("../../template/header/header.html", () => {
    $("#headerHome").removeClass().addClass("nav-link active text-black fw-bold");
  });

  $("#footer").load("../../template/footer/footer.html", () => {
    $("#footerHome").removeClass().addClass("nav-link active text-black fw-bold");
  });



  // Hover effect for the game cards
  $(document).on("mouseenter", ".game-card", function() {
    $(this).css('cursor', 'pointer');
    $(this).css('transform', 'scale(1.05)');
    $(this).css('box-shadow', '0 0 10px rgba(0, 0, 0, 0.2)');
  }).on("mouseleave", ".game-card", function() {
    $(this).css('cursor', 'default');
    $(this).css('transform', 'scale(1)');
    $(this).css('box-shadow', 'none');
  });

  // Call showProducts to display games on the page
  showProducts();
});
