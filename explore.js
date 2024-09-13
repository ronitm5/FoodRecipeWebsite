const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
const foodDetailsContent = document.querySelector('.food-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getfoodList);
foodList.addEventListener('click', getfoodRecipe);
recipeCloseBtn.addEventListener('click', () => {
    foodDetailsContent.parentElement.classList.remove('showRecipe');
});


// get food list that matches with the ingredients
function getfoodList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch('www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.foods){
            data.foods.forEach(food => {
                html += `
                    <div class = "food-item" data-id = "${food.idfood}">
                        <div class = "food-img">
                            <img src = "${food.strfoodThumb}" alt = "food">
                        </div>
                        <div class = "food-name">
                            <h3>${food.strfood}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            foodList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any food!";
            foodList.classList.add('notFound');
        }

        foodList.innerHTML = html;
    });
}


// get recipe of the food
function getfoodRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let foodItem = e.target.parentElement.parentElement;
        fetch(`https://www.thefooddb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodRecipeModal(data.foods));
    }
}

// create a modal
function foodRecipeModal(food){
    console.log(food);
    food = food[0];
    let html = `
        <h2 class = "recipe-title">${food.strfood}</h2>
        <p class = "recipe-category">${food.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${food.strInstructions}</p>
        </div>
        <div class = "recipe-food-img">
            <img src = "${food.strfoodThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${food.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    foodDetailsContent.innerHTML = html;
    foodDetailsContent.parentElement.classList.add('showRecipe');
}