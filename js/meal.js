const loadMeals = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
}

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerText = '';
    meals.forEach(meal => {
        console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
<div class="card h-100">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title fs-3">${meal.strMeal}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.</p>
            <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                Details
            </button>

        </div>
</div>
`

        mealsContainer.appendChild(mealDiv);
    });
}

// ------------searching area-------------
const searchMeal = () => {
    const searchText = document.getElementById('search-field').value;
    console.log(searchText);
    loadMeals(searchText)
}

// search by Enter key
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMeal();
    }
});
// ----------------------------------------------

const loadMealDetail = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
        .catch(error => console.log(error))
}

const displayMealDetail = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealDetails = document.getElementById('mealDetailsBody');
    mealDetails.innerHTML = `
    <h5><u>Category:   </u></h5>${meal.strCategory}
    <h5><u>Area:   </u></h5>${meal.strArea}
    <h5><u>Ingredients:  </u></h5>${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}, ${meal.strIngredient6}, ${meal.strIngredient7}, ${meal.strIngredient8}, ${meal.strIngredient9}, ${meal.strIngredient10}, ${meal.strIngredient11}, ${meal.strIngredient12}, ${meal.strIngredient13}, ${meal.strIngredient14}, ${meal.strIngredient15}, ${meal.strIngredient16}, ${meal.strIngredient17}, ${meal.strIngredient18}, ${meal.strIngredient19}, ${meal.strIngredient20}
    <h5><u>Instructions:   </u></h5>${meal.strInstructions}
    <h5><u>Youtube:   </u></h5><a>(${meal.strYoutube})</a>
    `
}



loadMeals('fish');