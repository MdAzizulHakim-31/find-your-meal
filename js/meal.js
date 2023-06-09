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
            <button onclick="window.location.href = 'https://www.foodpanda.com.bd/'" type="button" class="btn btn-primary">Order Food</button>
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
    <h5><u>Ingredients:  </u></h5>${meal.strIngredient1}_[${meal.strMeasure1}], ${meal.strIngredient2}_[${meal.strMeasure2}], ${meal.strIngredient3}_[${meal.strMeasure3}], ${meal.strIngredient4}_[${meal.strMeasure4}], ${meal.strIngredient5}_[${meal.strMeasure5}], ${meal.strIngredient6}_[${meal.strMeasure6}], ${meal.strIngredient7}_[${meal.strMeasure7}], ${meal.strIngredient8}_[${meal.strMeasure8}], ${meal.strIngredient9}_[${meal.strMeasure9}], ${meal.strIngredient10}_[${meal.strMeasure10}], ${meal.strIngredient11}_[${meal.strMeasure11}], ${meal.strIngredient12}_[${meal.strMeasure12}], ${meal.strIngredient13}_[${meal.strMeasure13}], ${meal.strIngredient14}_[${meal.strMeasure14}], ${meal.strIngredient15}_[${meal.strMeasure15}], ${meal.strIngredient16}_[${meal.strMeasure16}], ${meal.strIngredient17}_[${meal.strMeasure17}], ${meal.strIngredient18}_[${meal.strMeasure18}], ${meal.strIngredient19}_[${meal.strMeasure19}], ${meal.strIngredient20}_[${meal.strMeasure20}]
    <h5><u>Instructions:   </u></h5>${meal.strInstructions}
    <h5><u>Youtube:   </u></h5><a>${meal.strYoutube}</a>
    `
}


loadMeals('fish');