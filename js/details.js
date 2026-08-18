const API_URL =
    "https://www.themealdb.com/api/json/v1/1/";

let currentMeal = null;


/* ================= GET MEAL ID ================= */

const mealId =
    localStorage.getItem("selectedMealId");


/* ================= GET RECIPE ================= */

async function getRecipeDetails() {

    if (!mealId) {

        showError("No recipe selected.");

        return;

    }


    try {

        let response = await fetch(
            API_URL + `lookup.php?i=${mealId}`
        );

        let data = await response.json();


        if (!data.meals) {

            showError("Recipe not found.");

            return;

        }


        currentMeal = data.meals[0];

        displayRecipe(currentMeal);


    } catch (error) {

        console.log(error);

        showError(
            "Something went wrong while loading the recipe."
        );

    }

}


/* ================= DISPLAY RECIPE ================= */

function displayRecipe(meal) {

    document.getElementById("loading").style.display =
        "none";


    document.getElementById("recipeDetails").style.display =
        "block";


    /* Image */

    document.getElementById("mealImage").src =
        meal.strMealThumb;


    document.getElementById("mealImage").alt =
        meal.strMeal;


    /* Name */

    document.getElementById("mealName").textContent =
        meal.strMeal;


    /* Category */

    document.getElementById("mealCategory").textContent =
        meal.strCategory;


    /* Area */

    document.getElementById("mealArea").textContent =
        meal.strArea;


    /* Ingredients */

    displayIngredients(meal);


    /* Instructions */

    displayInstructions(meal);


    /* YouTube */

    displayVideo(meal);


    /* Check Favorite */

    updateFavoriteButton();

}


/* ================= INGREDIENTS ================= */

function displayIngredients(meal) {

    let container =
        document.getElementById(
            "ingredientsContainer"
        );


    container.innerHTML = "";


    for (let i = 1; i <= 20; i++) {

        let ingredient =
            meal[`strIngredient${i}`];


        let measure =
            meal[`strMeasure${i}`];


        if (
            ingredient &&
            ingredient.trim() !== ""
        ) {

            container.innerHTML += `

                <div class="col-md-6 col-lg-4">

                    <div class="ingredient-card">

                        <i class="fa-solid fa-check"></i>

                        <span>
                            ${measure || ""}
                            ${ingredient}
                        </span>

                    </div>

                </div>

            `;

        }

    }

}


/* ================= INSTRUCTIONS ================= */

function displayInstructions(meal) {

    let container =
        document.getElementById(
            "instructionsContainer"
        );


    let instructions =
        meal.strInstructions;


    if (!instructions) {

        container.innerHTML =
            "<p>No instructions available.</p>";

        return;

    }


    /*
        Some recipes have multiple paragraphs.
        We split them into steps.
    */

    let steps =
        instructions
            .split(/\r?\n/)
            .filter(step => step.trim() !== "");


    container.innerHTML = "";


    steps.forEach((step, index) => {

        container.innerHTML += `

            <div class="instruction-step">

                <div class="step-number">
                    ${index + 1}
                </div>

                <p>
                    ${step}
                </p>

            </div>

        `;

    });

}


/* ================= YOUTUBE VIDEO ================= */
function displayVideo(meal) {

    let videoSection =
        document.getElementById("videoSection");

    let iframe =
        document.getElementById("youtubeVideo");


    if (!meal.strYoutube) {

        videoSection.style.display = "none";

        return;

    }


    try {

        let url =
            new URL(meal.strYoutube);

        let videoId =
            url.searchParams.get("v");


        if (videoId) {

            iframe.src =
                `https://www.youtube.com/embed/${videoId}`;

            videoSection.style.display = "block";

        } else {

            videoSection.style.display = "none";

        }

    } catch (error) {

        videoSection.style.display = "none";

    }

}



/* ================= FAVORITES ================= */

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

}


/* ================= TOGGLE FAVORITE ================= */

function toggleFavorite() {

    if (!currentMeal) return;


    let favorites =
        getFavorites();


    let exists =
        favorites.some(
            meal => meal.idMeal === currentMeal.idMeal
        );


    if (exists) {

        favorites =
            favorites.filter(
                meal =>
                    meal.idMeal !== currentMeal.idMeal
            );

    } else {

        /*
            We only save the information
            needed for the Favorites page.
        */

        favorites.push({

            idMeal: currentMeal.idMeal,

            strMeal: currentMeal.strMeal,

            strMealThumb: currentMeal.strMealThumb,

            strCategory: currentMeal.strCategory

        });

    }


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    updateFavoriteButton();

}


/* ================= UPDATE BUTTON ================= */

function updateFavoriteButton() {

    let button =
        document.getElementById(
            "favoriteBtn"
        );


    let favorites =
        getFavorites();


    let exists =
        favorites.some(
            meal =>
                meal.idMeal === currentMeal.idMeal
        );


    if (exists) {

        button.innerHTML = `

            <i class="fa-solid fa-heart"></i>

            Remove from Favorites

        `;

        button.classList.remove(
            "btn-outline-danger"
        );

        button.classList.add(
            "btn-danger"
        );

    } else {

        button.innerHTML = `

            <i class="fa-regular fa-heart"></i>

            Add to Favorites

        `;

        button.classList.remove(
            "btn-danger"
        );

        button.classList.add(
            "btn-outline-danger"
        );

    }

}


/* ================= ERROR ================= */

function showError(message) {

    document.getElementById("loading").innerHTML = `

        <div class="alert alert-danger">

            ${message}

        </div>

    `;

}


/* ================= START ================= */

getRecipeDetails();