const API_URL = "https://www.themealdb.com/api/json/v1/1/";

/* ================= GET CATEGORIES ================= */

async function getCategories() {

    try {

        let response = await fetch(
            API_URL + "categories.php"
        );

        let data = await response.json();

        displayCategories(data.categories);

    }
    catch (error) {

        console.log("Error:", error);

    }
}


/* ================= DISPLAY CATEGORIES ================= */

function displayCategories(categories) {

    let container =
        document.getElementById("categoriesContainer");

    if (!container) return;

    container.innerHTML = "";

    categories.slice(0, 6).forEach(category => {


        container.innerHTML += `

            <div class="col-lg-2 col-md-4 col-6">

                <div class="category-card">

                    <img
                        src="${category.strCategoryThumb}"
                        alt="${category.strCategory}"
                    >

                    <div class="card-content text-center">

                        <h5>
                            ${category.strCategory}
                        </h5>

                    </div>

                </div>

            </div>

        `;

    });
}


/* ================= GET POPULAR RECIPES ================= */

async function getPopularRecipes() {

    try {

        let response = await fetch(
            API_URL + "search.php?s="
        );

        let data = await response.json();

        displayRecipes(data.meals);

    } catch (error) {

        console.log("Error:", error);

    }
}


/* ================= DISPLAY RECIPES ================= */

function displayRecipes(meals) {

    let container =
        document.getElementById("recipesContainer");

    if (!container) return;

    container.innerHTML = "";

    meals.slice(0, 8).forEach(meal => {

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

                        <p class="text-muted">
                            ${meal.strCategory || "Recipe"}
                        </p>

                        <div class="rating">
                           <i class="fa-solid fa-star"></i>
                           <i class="fa-solid fa-star"></i>
                           <i class="fa-solid fa-star"></i>
                           <i class="fa-solid fa-star"></i>
                           <i class="fa-solid fa-star"></i>
                        </div>

                        <button
                            class="btn btn-success btn-sm mt-2"
                            onclick="openRecipe(${meal.idMeal})"
                        >
                            View Recipe
                        </button>

                    </div>

                </div>

            </div>

        `;

    });
}


/* ================= RANDOM MEAL ================= */

async function getRandomMeal() {

    try {

        let response = await fetch(
            API_URL + "random.php"
        );

        let data = await response.json();

        displayRandomMeal(data.meals[0]);

    } catch (error) {

        console.log("Error:", error);

    }
}


/* ================= DISPLAY RANDOM MEAL ================= */

function displayRandomMeal(meal) {

    let container =
        document.getElementById("randomMealContainer");

    if (!container) return;

    container.innerHTML = `

        <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
        >

        <h3 class="mt-3">
            ${meal.strMeal}
        </h3>

        <p class="text-muted">
            ${meal.strCategory} • ${meal.strArea}
        </p>

    `;
}


function openRecipe(id) {

    localStorage.setItem(
        "selectedMealId",
        id
    );

    window.location.href = "recipe_details.html";
}


/* ================= HOME SEARCH ================= */

function searchFromHome() {

    let search =
        document.getElementById("homeSearch").value;

    if (search.trim() === "") {

        alert("Please enter a recipe name");

        return;
    }

    localStorage.setItem(
        "searchQuery",
        search
    );

    window.location.href = "search.html";
}

getCategories();

getPopularRecipes();

getRandomMeal();