const API_URL =
    "https://www.themealdb.com/api/json/v1/1/";

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


/* ================= GET RECIPES ================= */

async function loadRecipes() {

    let select =
        document.getElementById("mealSelect");

    try {

        let response = await fetch(
            API_URL + "search.php?s="
        );

        let data = await response.json();

        select.innerHTML =
            `<option value="">
                Select a recipe
            </option>`;


        data.meals.forEach(meal => {

            select.innerHTML += `

                <option value="${meal.idMeal}">
                    ${meal.strMeal}
                </option>

            `;

        });

    } catch (error) {

        console.log(error);

        select.innerHTML =
            `<option>
                Unable to load recipes
            </option>`;

    }

}


/* ================= GET PLANNER ================= */

function getPlanner() {

    return JSON.parse(
        localStorage.getItem("mealPlanner")
    ) || {};

}


/* ================= ADD MEAL ================= */

function addMeal() {

    let day =
        document.getElementById("daySelect").value;

    let mealSelect =
        document.getElementById("mealSelect");

    let mealId =
        mealSelect.value;

    let mealName =
        mealSelect.options[
            mealSelect.selectedIndex
        ]?.text;


    if (!mealId) {

        alert("Please select a recipe.");

        return;

    }


    let planner =
        getPlanner();


    if (!planner[day]) {

        planner[day] = [];

    }


    planner[day].push({

        id: mealId,

        name: mealName

    });


    localStorage.setItem(
        "mealPlanner",
        JSON.stringify(planner)
    );


    displayPlanner();

}


/* ================= DISPLAY PLANNER ================= */

function displayPlanner() {

    let container =
        document.getElementById(
            "plannerContainer"
        );


    let planner =
        getPlanner();


    container.innerHTML = "";


    days.forEach(day => {

        let meals =
            planner[day] || [];


        let mealsHTML = "";


        if (meals.length === 0) {

            mealsHTML = `

                <p class="text-muted">
                    No meals planned
                </p>

            `;

        } else {

            meals.forEach((meal, index) => {

                mealsHTML += `

                    <div class="planned-meal">

                        <span>
                            ${meal.name}
                        </span>

                        <div>

                            <button
                                class="meal-view-btn"
                                onclick="viewMeal('${meal.id}')"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>

                            <button
                                onclick="removeMeal('${day}', ${index})"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>

                `;

            });

        }


        container.innerHTML += `

            <div class="col-lg-4 col-md-6">

                <div class="day-card">

                    <div class="day-title">

                        <i class="fa-solid fa-calendar-day"></i>

                        ${day}

                    </div>

                    <div class="day-meals">

                        ${mealsHTML}

                    </div>

                </div>

            </div>

        `;

    });

}


/* ================= REMOVE MEAL ================= */

function removeMeal(day, index) {

    let planner =
        getPlanner();


    planner[day].splice(index, 1);


    localStorage.setItem(
        "mealPlanner",
        JSON.stringify(planner)
    );


    displayPlanner();

}


/* ================= VIEW MEAL ================= */

function viewMeal(id) {

    localStorage.setItem(
        "selectedMealId",
        id
    );

    window.location.href =
        "recipe_details.html";

}


/* ================= START ================= */

loadRecipes();

displayPlanner();