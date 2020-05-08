const apiURL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const cardsContainer = document.querySelector("#cards");
let data = [];


// Fetch data from API URL
async function fetchCards() {
    let response =  await fetch(apiURL)
    return await response.json()
}

// Rendering cards and maping
function renderCards(cards) {
    cardsContainer.innerHTML = "";
    cards.map(renderCard);
}

function renderCard(card) {
    const div = document.createElement("div");

    div.style.width = "20rem";
    div.style.margin = "2rem";
    div.className = "card";

    div.innerHTML = `
    
        <img src="${card.photo}" class="card-img-top" alt="${card.name}" />
        
        <div class="card-body">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text"> 
                Tipo: ${card.property_type}
            </p>
            <p class="card-text">
                Preço: R$${card.price},00
            </p>
        </div>
    `;

    cardsContainer.appendChild(div);
}

async function render() {
    data = await fetchCards();

    if(data) {
        renderCards(data);
    }
}

render();

//* Ordenar cards

function orderByNameAZ() {
    data.sort(function (a, b) {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    });

    renderCards(data);
}

function orderByNameZA() {
    data.sort(function (a, b) {
        return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
    });

    renderCards(data);
}

function orderByType() {
    data.sort(function (a, b) {
        return a.property_type > b.property_type
            ?  1 : b.property_type > a.property_type
            ? -1 : 0;
    });

    renderCards(data);
}

function orderByPriceCrescent() {
    data.sort(function (a, b) {
        return a.price > b.price ? 1 : b.price > a.price ? -1 : 0;
    });

    renderCards(data);
}

function orderByPriceDecreasing() {
    data.sort(function (a, b) {
        return a.price < b.price ? 1 : b.price < a.price ? -1 : 0;
    });

    renderCards(data);
}

function handleSearch() {
    let valueInput = document.querySelector("#searchInput").value.toUpperCase();

    const filteredResults = data.filter((places) => {
            const placesToSearchByName = places.name.toUpperCase();

            if (placesToSearchByName.search(valueInput) > -1) {
                return places;
            }
    });

    renderCards(filteredResults);
}
    


