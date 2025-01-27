/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new div for the game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
        `;

        // Append the game card to the container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with GAMES_JSON
addGamesToPage(GAMES_JSON);


    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;

// set the inner HTML for the total number of games
gamesCard.innerHTML = totalGames;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the number of unfunded games
    console.log("Number of unfunded games:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Debug: Log the number of unfunded games
    console.log(unfundedGames.length);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the number of funded games
    console.log("Number of funded games:", fundedGames.length);

    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);

    // Debug: Log the number of funded games
    console.log(fundedGames.length);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numberOfUnfundedGames = unfundedGames.length;

// calculate the total money raised
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// create a string that explains the number of unfunded games using the ternary operator
const companyMessage = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. 
    Currently, ${numberOfUnfundedGames} ${numberOfUnfundedGames === 1 ? "game remains" : "games remain"} unfunded. 
    We need your help to fund these amazing games!
`;

// create a new DOM element containing the template string and append it to the description container
const messageParagraph = document.createElement("p");
messageParagraph.innerHTML = companyMessage;
descriptionContainer.appendChild(messageParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged; // Sort games by pledged amount in descending order
});

// use destructuring and the spread operator to grab the first and second games
const [mostFunded, secondMostFunded] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `🏆 ${mostFunded.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner-up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `🥈 ${secondMostFunded.name}`;
secondGameContainer.appendChild(secondGameElement);

// BONUS FEATURE: Add a search bar to filter games by name

// Step 1: Create and append the search bar
const searchBarContainer = document.createElement("div");
searchBarContainer.setAttribute("id", "search-bar-container");
searchBarContainer.innerHTML = `
    <input id="search-bar" type="text" placeholder="Search for a game..." />
    <button id="search-button">Search</button>
`;
document.body.prepend(searchBarContainer); // Add the search bar at the top of the page

// Step 2: Add functionality to the search bar
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    const query = searchBar.value.toLowerCase(); // Get the search input and convert to lowercase
    const filteredGames = GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(query) // Match query with game names
    );

    deleteChildElements(gamesContainer); // Clear current games

    if (filteredGames.length > 0) {
        addGamesToPage(filteredGames); // Display filtered games
    } else {
        const noResultMessage = document.createElement("p");
        noResultMessage.textContent = "No games found matching your search.";
        gamesContainer.appendChild(noResultMessage);
    }
});
