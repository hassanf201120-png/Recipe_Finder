const API_URL = "https://www.themealdb.com/api/json/v1/1/";


/* ================= GET ALL CATEGORIES ================= */

async function getAllCategories() {

    try {

        let response = await fetch(
            API_URL + "categories.php"
        );

        let data = await response.json();

        displayAllCategories(data.categories);

    } catch (error) {

        console.log("Error:", error);

    }
}


/* ================= DISPLAY CATEGORIES ================= */

function displayAllCategories(categories) {

    let container =
        document.getElementById("allCategoriesContainer");

    container.innerHTML = "";

    categories.forEach(category => {

        container.innerHTML += `

            <div class="col-lg-3 col-md-4 col-sm-6">

                <div
                    class="category-card category-click"
                    onclick="getCategoryMeals('${category.strCategory}')"
                >

                    <img
                        src="${category.strCategoryThumb}"
                        alt="${category.strCategory}"
                    >

                    <div class="card-content text-center">

                        <h4>
                            ${category.strCategory}
                        </h4>

                        <p class="text-muted">
                            ${category.strCategoryDescription.substring(0, 80)}...
                        </p>

                        <button
                            class="btn btn-outline-success btn-sm"
                        >
                            View Recipes
                        </button>

                    </div>

                </div>

            </div>

        `;

    });
}


/* ================= GET MEALS BY CATEGORY ================= */

async function getCategoryMeals(category) {

    try {

        let response = await fetch(
            API_URL + `filter.php?c=${category}`
        );

        let data = await response.json();

        displayCategoryMeals(
            data.meals,
            category
        );

    } catch (error) {

        console.log("Error:", error);

    }

}

function displayCategoryMeals(meals, category) {

    let section =
        document.getElementById("categoryRecipesSection");

    let container =
        document.getElementById("categoryRecipesContainer");

    let title =
        document.getElementById("selectedCategoryTitle");


    title.textContent = `${category} Recipes`;

    container.innerHTML = "";


    if (!meals) {

        container.innerHTML = `
            <div class="col-12 text-center">
                <h4>No recipes found</h4>
            </div>
        `;

    } else {

        meals.forEach(meal => {

            container.innerHTML += `

                <div class="col-lg-3 col-md-6">

                    <div class="recipe-card">

                        <img
                            src="${meal.strMealThumb}"
                            alt="${meal.strMeal}"
                        >

                        <div class="card-content">

                            <h5>
                                ${meal.strMeal}
                            </h5>

                            <button
                                class="btn btn-success btn-sm"
                                onclick="openRecipe(${meal.idMeal})"
                            >
                                View Ingredients
                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    }


    section.style.display = "block";

    section.scrollIntoView({
        behavior: "smooth"
    });

}


function openRecipe(id) {

    localStorage.setItem(
        "selectedMealId",
        id
    );

    window.location.href = "recipe_details.html";
}


function hideCategoryRecipes() {

    document.getElementById(
        "categoryRecipesSection"
    ).style.display = "none";

}


getAllCategories();