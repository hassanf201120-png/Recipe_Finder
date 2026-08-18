/* ================= GET FAVORITES ================= */

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

}


/* ================= DISPLAY FAVORITES ================= */

function displayFavorites() {

    let container =
        document.getElementById(
            "favoritesContainer"
        );


    let favorites =
        getFavorites();


    container.innerHTML = "";


    /* No favorites */

    if (favorites.length === 0) {

        container.innerHTML = `

            <div class="col-12 text-center">

                <div class="empty-favorites">

                    <i
                        class="fa-regular fa-heart"
                    ></i>

                    <h3>
                        No Favorite Recipes Yet
                    </h3>

                    <p>
                        Start adding recipes to your favorites.
                    </p>

                    <a
                        href="search.html"
                        class="btn btn-success"
                    >
                        Find Recipes
                    </a>

                </div>

            </div>

        `;

        return;

    }


    /* Display favorites */

    favorites.forEach(meal => {

        container.innerHTML += `

            <div class="col-lg-3 col-md-6">

                <div class="recipe-card favorite-card">

                    <div class="favorite-image">

                        <img
                            src="${meal.strMealThumb}"
                            alt="${meal.strMeal}"
                        >

                        <button
                            class="remove-favorite"
                            onclick="removeFavorite('${meal.idMeal}')"
                        >

                            <i
                                class="fa-solid fa-heart"
                            ></i>

                        </button>

                    </div>


                    <div class="card-content">

                        <h5>
                            ${meal.strMeal}
                        </h5>


                        <p class="text-muted">

                            ${meal.strCategory || "Recipe"}

                        </p>


                        <button
                            class="btn btn-success btn-sm"
                            onclick="openRecipe('${meal.idMeal}')"
                        >

                            View Recipe

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


/* ================= REMOVE FAVORITE ================= */

function removeFavorite(id) {

    let favorites =
        getFavorites();


    favorites =
        favorites.filter(
            meal => meal.idMeal !== id
        );


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    displayFavorites();

}


/* ================= OPEN RECIPE ================= */

function openRecipe(id) {

    localStorage.setItem(
        "selectedMealId",
        id
    );

    window.location.href =
        "recipe_details.html";

}


/* ================= START ================= */

displayFavorites();