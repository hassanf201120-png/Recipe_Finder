const API_URL = "https://www.themealdb.com/api/json/v1/1/";


/* ================= SEARCH ================= */

async function performSearch() {

    let searchType =
        document.getElementById("searchType").value;

    let searchValue =
        document.getElementById("searchInput").value.trim();


    if (searchValue === "") {

        alert("Please enter something to search.");

        return;
    }


    try {

        let url;


        /* Search by name */

        if (searchType === "name") {

            url =
                API_URL +
                `search.php?s=${encodeURIComponent(searchValue)}`;

        }


        /* Search by category */

        else if (searchType === "category") {

            url =
                API_URL +
                `filter.php?c=${encodeURIComponent(searchValue)}`;

        }


        /* Search by ingredient */

        else if (searchType === "ingredient") {

            url =
                API_URL +
                `filter.php?i=${encodeURIComponent(searchValue)}`;

        }


        let response = await fetch(url);

        let data = await response.json();


        displaySearchResults(
            data.meals,
            searchValue
        );


    } catch (error) {

        console.log("Search Error:", error);

    }

}


/* ================= DISPLAY RESULTS ================= */

function displaySearchResults(meals, searchValue) {

    let container =
        document.getElementById("searchResults");

    let title =
        document.getElementById("resultsTitle");

    let count =
        document.getElementById("resultsCount");


    container.innerHTML = "";


    if (!meals) {

        title.textContent = "No Results";

        count.textContent = "";

        container.innerHTML = `

            <div class="col-12 text-center">

                <div class="alert alert-warning">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    No recipes found for
                    <strong>${searchValue}</strong>

                </div>

            </div>

        `;

        return;
    }


    title.textContent =
        `Results for "${searchValue}"`;

    count.textContent =
        `${meals.length} recipes`;


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
                            class="btn btn-success btn-sm mt-2"
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


/* ================= OPEN DETAILS ================= */

function openRecipe(id) {

    localStorage.setItem(
        "selectedMealId",
        id
    );

    window.location.href =
        "recipe_details.html";

}


/* ================= LOAD HOME SEARCH ================= */

window.addEventListener("DOMContentLoaded", function () {

    let savedSearch =
        localStorage.getItem("searchQuery");


    if (savedSearch) {

        document.getElementById("searchInput").value =
            savedSearch;

        localStorage.removeItem("searchQuery");

        performSearch();

    }

});