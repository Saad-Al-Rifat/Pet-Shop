// render category button
async function renderCategoryButton(){
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const array = await res.json();
    const data = await array.categories;
    data.forEach(datum => {
        const categorySection = document.getElementById('category-button');
        categorySection.innerHTML += 
        `
        <button class="all-category-btn" onclick='activeRoutAndRender("${datum.id}", "${datum.category}")' id="${datum.id}"><img src="${datum.category_icon}" alt="${datum.category}">${datum.category}</button>
        `
    });
}
renderCategoryButton();

// render all cards
async function renderCards(){
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const array = await res.json()
    const data = await array.pets
    data.forEach(datum =>{
        const cardsContainer = document.getElementById('all-cards');
        cardsContainer.classList.add('grid');
        cardsContainer.classList.remove('center')
        cardsContainer.innerHTML += 
        `
        <div class="cards-div">
            <div><img src="${datum.image}"></div>
            <div>
                <h3 style="margin-bottom: 8px;">${datum.pet_name ? datum.pet_name : 'No Info Available'}</h3>
                <p><i class="fa-solid fa-boxes-stacked"></i>Breed: ${datum.breed ? datum.breed : 'No Info Available'}</p>
                <p><i class="fa-regular fa-calendar-days"></i>Birth: ${datum.date_of_birth ? datum.date_of_birth : 'No Info Available'}</p>
                <p><i class="fa-solid fa-mercury"></i>Gender: ${datum.gender ? datum.gender : 'No Info Available'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i>Price: $${datum.price ? datum.price : 'NO Info Available'}</p>
            </div>
            <div class="card-button">
                <button class="click-to-like-this-image"><i class="fa-solid fa-thumbs-up"></i></button>
                <button>Adopt</button>
                <button>Details</button>
            </div>
        </div>
        `
    })
    const allBtn = document.querySelectorAll('.click-to-like-this-image');
    allBtn.forEach((el)=>{
        el.addEventListener('click', (e)=>{
            const cardDiv = e.target.closest('.cards-div');
            const imgSource = cardDiv.querySelector('img').src;
            let imgContainer = document.getElementById("aside");
            imgContainer.innerHTML +=
            `
            <img src="${imgSource}">
            `
        })
    })
}
renderCards();

// Active Route And Render
function activeRoutAndRender(btnId, categoryName){
    const allBtn = document.getElementsByClassName('all-category-btn');
    const activeBtn = document.getElementById(btnId)
    for(const button of allBtn){
        button.classList.remove('active-route');
    }
    activeBtn.classList.add('active-route')
    

    fetchByCategory(categoryName)
}

async function fetchByCategory(categoryName){
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    const array = await res.json();
    const data = array.data
    const cardsContainer = document.getElementById('all-cards');
    cardsContainer.classList.add('grid');
    cardsContainer.classList.remove('center')
    cardsContainer.innerHTML = ''
    data.forEach(datum =>{
        cardsContainer.classList.add('grid');
        cardsContainer.innerHTML += 
    `
        <div class="cards-div">
            <div><img src="${datum.image}"></div>
            <div>
                <h3 style="margin-bottom: 8px;">${datum.pet_name ? datum.pet_name : 'No Info Available'}</h3>
                <p><i class="fa-solid fa-boxes-stacked"></i>Breed: ${datum.breed ? datum.breed : 'No Info Available'}</p>
                <p><i class="fa-regular fa-calendar-days"></i>Birth: ${datum.date_of_birth ? datum.date_of_birth : 'No Info Available'}</p>
                <p><i class="fa-solid fa-mercury"></i>Gender: ${datum.gender ? datum.gender : 'No Info Available'}</p>
                <p><i class="fa-solid fa-dollar-sign"></i>Price: $${datum.price ? datum.price : 'NO Info Available'}</p>
            </div>
            <div class="card-button">
                <button class="like-btn click-to-like-this-image"><i class="fa-solid fa-thumbs-up"></i></button>
                <button>Adopt</button>
                <button>Details</button>
            </div>
        </div>
        `
    })
    const allBtn = document.querySelectorAll('.click-to-like-this-image');
    allBtn.forEach((el)=>{
        el.addEventListener('click', (e)=>{
            const cardDiv = e.target.closest('.cards-div');
            const imgSource = cardDiv.querySelector('img').src;
            let imgContainer = document.getElementById("aside");
            imgContainer.innerHTML +=
            `
            <img src="${imgSource}">
            `
        })
    })
    if(data.length === 0){
        cardsContainer.classList.remove('grid')
        cardsContainer.classList.add('center')
        cardsContainer.innerHTML =
        `
       <img src="assets/error.webp" alt="Man With big black Gun" width="300">
        `
    }
}



