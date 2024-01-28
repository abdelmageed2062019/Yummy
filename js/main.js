let listOfData = document.getElementById("data-container");
let search = document.getElementById("search-container");
let submit;

$(document).ready(function () {
  //loading
  searchByName("").then(() => {
    $("#loading").fadeOut(500);
    $("body").css("display", "visible");
  });
});

//open and close sidebar
function openSide() {
  $("#sidebar").addClass("active");
  $("#toggle-icon").removeClass("fa-bars-staggered");
  $("#toggle-icon").addClass("fa-x");
}

function closeSide() {
  $("#sidebar").removeClass("active");
  $("#toggle-icon").addClass("fa-bars-staggered");
  $("#toggle-icon").removeClass("fa-x");
}

$("#toggle-icon").click(function () {
  if ($("#sidebar").hasClass("active")) {
    closeSide();
  } else {
    openSide();
  }
});

//get data

//1-get categories
async function getCategories() {
  $("#loading").fadeIn(300);
  listOfData.innerHTML = ``;

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $("#loading").fadeOut(300);
}

function displayCategories(arr) {
  let list = "";

  for (let i = 0; i < arr.length; i++) {
    list += `
        <div class="col-md-3">
          <div class="content" onclick="getCategoryMeals('${
            arr[i].strCategory
          }')">
            <div class="overlay">
              <h3>${arr[i].strCategory}</h3>
              <p>
               ${arr[i].strCategoryDescription
                 .split(" ")
                 .slice(0, 20)
                 .join(" ")}}
              </p>
            </div>

            <div class="img-container">
              <img src="${arr[i].strCategoryThumb}" />
            </div>
          </div>
        </div>

      `;
  }

  listOfData.innerHTML = list;
}

//get category meals
async function getCategoryMeals(category) {
  listOfData.innerHTML = ``;
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $("#loading").fadeOut(300);
}

//2-get area
async function getArea() {
  $("#loading").fadeIn(300);
  listOfData.innerHTML = ``;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $("#loading").fadeOut(300);
}

function displayArea(arr) {
  let list = "";
  for (let i = 0; i < arr.length; i++) {
    list += `
            <div class="col-md-3 p-5">
              <div class="content" onclick="getAreaMeals('${arr[i].strArea}')">
                <i class="fa-solid fa-house-laptop"></i>
                <h2>${arr[i].strArea}</h2>
              </div>
            </div>
    
          `;
  }

  listOfData.innerHTML = list;
}

//get area meals

async function getAreaMeals(area) {
  listOfData.innerHTML = ``;
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  response = await response.json();

  console.log(response);
  displayMeals(response.meals.slice(0, 20));
  $("#loading").fadeOut(300);
}

//3-get ingrediens
async function getIngredients() {
  $("#loading").fadeIn(300);
  listOfData.innerHTML = ``;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  $("#loading").fadeOut(300);
}

function displayIngredients(arr) {
  let list = "";
  for (let i = 0; i < arr.length; i++) {
    list += `
             <div class="col-md-3 p-5">
               <div class="content" onclick="getIngredientsMeals('${
                 arr[i].strIngredient
               }')">
               <i class="fa-solid fa-utensils"></i>
                 <h2>${arr[i].strIngredient}</h2>
                 <p>${arr[i].strDescription
                   .split(" ")
                   .slice(0, 20)
                   .join(" ")}</p>
               </div>
             </div>
     
           `;
  }

  listOfData.innerHTML = list;
}

// get ingredients meals

async function getIngredientsMeals(ingredients) {
  listOfData.innerHTML = ``;
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );

  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $("#loading").fadeOut(300);
}

//display meals

function displayMeals(arr) {
  let list = "";

  for (let i = 0; i < arr.length; i++) {
    list += `
          <div class="col-md-3">
          <div class="content" onclick="getMealDetails('${arr[i].idMeal}')">
            <div class="overlay">
              <h3>${arr[i].strMeal}</h3>
            </div>

            <div class="img-container">
              <img src="${arr[i].strMealThumb}" />
            </div>
          </div>
        </div>
         `;
  }

  listOfData.innerHTML = list;
}

//show search inputs
function showSearch() {
  search.innerHTML = `
     <div class="col-md-6 py-4">
     <input
       type="text"
       placeholder="Search By Name"
       class="w-100"
       onkeyup={searchByName(this.value)}
     />
   </div>
   <div class="col-md-6">
     <input
       type="text"
       placeholder="Search By First Letter"
       class="w-100"
       onkeyup={searchByLetter(this.value)}
       maxlength="1"
     />
   </div>
     `;

  listOfData.innerHTML = ``;
}

async function searchByName(name) {
  $("#loading").fadeIn(300);
  listOfData.innerHTML = ``;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $("#loading").fadeOut(300);
}

async function searchByLetter(letter) {
  $("#loading").fadeIn(300);

  listOfData.innerHTML = ``;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $("#loading").fadeOut(300);
}

//get meal details
async function getMealDetails(mealId) {
  $("#loading").fadeIn(300);
  listOfData.innerHTML = ``;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  displayMealDetails(response.meals[0]);
  $("#loading").fadeOut(300);
}

function displayMealDetails(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) {
    tags = [];
  }

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
         <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let mealD = `
     <div class="col-md-4">
                 <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                     alt="">
                     <h2>${meal.strMeal}</h2>
             </div>
             <div class="col-md-8">
                 <h2>Instructions</h2>
                 <p>${meal.strInstructions}</p>
                 <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                 <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                 <h3>Recipes :</h3>
                 <ul class="d-flex g-3 flex-wrap">
                     ${ingredients}
                 </ul>
 
                 <h3>Tags :</h3>
                 <ul class="d-flex g-3 flex-wrap">
                     ${tagsStr}
                 </ul>
 
                 <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                 <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
             </div>`;

  listOfData.innerHTML = mealD;
}

//show contact
function showContact() {
  listOfData.innerHTML = `
  <form>
        <div class="row">
            <div class="form-group col-md-6">
                <label for="inputName">Name</label>
                <input type="text" class="form-control" id="inputName" placeholder="Enter Your Name">

                <div id="nameFeedback" class="invalid-feedback">
                Special characters and numbers not allowed
               </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="Enter Your Email">

                <div id="emailFeedback" class="invalid-feedback">
                Email not valid *exemple@yyy.zzz
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-6">
                <label for="inputPhone">Phone</label>
                <input type="tel" class="form-control" id="inputPhone" placeholder="Enter Your Phone">

                <div id="phoneFeedback" class="invalid-feedback">
                Enter valid Phone Number
           </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputAge">Age</label>
                <input type="number" class="form-control" id="inputAge" placeholder="Enter Your Age">

                <div id="ageFeedback" class="invalid-feedback">
                Enter valid Age
           </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-6">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" autocomplete  placeholder="Enter Your Password">

                <div id="passwordFeedback" class="invalid-feedback">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
           </div>
            </div>
            <div class="form-group col-md-6">
                <label for="inputPasswordAgain">Password Again</label>
                <input type="password" class="form-control" id="inputPasswordAgain" autocomplete placeholder="Enter Your Password Again">

                <div id="passwordAgainFeedback" class="invalid-feedback">
                Enter valid repassword
           </div>
            </div>
        </div>

        <div class="row align-items-center justify-content-center mt-4">
            <div class="col-auto">
                <button type="submit" class="btn btn-primary" disabled id="submitBtn">Submit</button>
            </div>
        </div>
    </form>
     `;
  submit = document.getElementById("submitBtn");

  document.getElementById("inputName").addEventListener("input", () => {
    inputsValidation();
  });

  document.getElementById("inputEmail").addEventListener("input", () => {
    inputsValidation();
  });

  document.getElementById("inputPhone").addEventListener("input", () => {
    inputsValidation();
  });

  document.getElementById("inputAge").addEventListener("input", () => {
    inputsValidation();
  });

  document.getElementById("inputPassword").addEventListener("input", () => {
    inputsValidation();
  });

  document
    .getElementById("inputPasswordAgain")
    .addEventListener("input", () => {
      inputsValidation();
    });
  search.innerHTML = ``;
}

function inputsValidation() {
  if (nameVal()) {
    document.getElementById("nameFeedback").style.display = "none";
  } else {
    document.getElementById("nameFeedback").style.display = "block";
  }

  if (emailVal()) {
    document.getElementById("emailFeedback").style.display = "none";
  } else {
    document.getElementById("emailFeedback").style.display = "block";
  }

  if (phoneVal()) {
    document.getElementById("phoneFeedback").style.display = "none";
  } else {
    document.getElementById("phoneFeedback").style.display = "block";
  }

  if (ageVal()) {
    document.getElementById("ageFeedback").style.display = "none";
  } else {
    document.getElementById("ageFeedback").style.display = "block";
  }

  if (passwordVal()) {
    document.getElementById("passwordFeedback").style.display = "none";
  } else {
    document.getElementById("passwordFeedback").style.display = "block";
  }

  if (passwordAgainVal()) {
    document.getElementById("passwordAgainFeedback").style.display = "none";
  } else {
    document.getElementById("passwordAgainFeedback").style.display = "block";
  }

  if (
    nameVal() &&
    emailVal() &&
    phoneVal() &&
    ageVal() &&
    passwordVal() &&
    passwordAgainVal()
  ) {
    submit.removeAttribute("disabled");
  } else {
    submit.setAttribute("disabled", "");
  }
}

function nameVal() {
  let nameRegex = /^[A-Za-z -]+$/;
  return nameRegex.test(document.getElementById("inputName").value);
}

function emailVal() {
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(document.getElementById("inputEmail").value);
}

function phoneVal() {
  let phoneRegex = /^01[0125][0-9]{8}$/;
  return phoneRegex.test(document.getElementById("inputPhone").value);
}

function ageVal() {
  let ageRegex = /^(0?[1-9]|[1-9][0-9]{1,2})$/;
  return ageRegex.test(document.getElementById("inputAge").value);
}

function passwordVal() {
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(document.getElementById("inputPassword").value);
}

function passwordAgainVal() {
  return (
    document.getElementById("inputPasswordAgain").value ==
    document.getElementById("inputPassword").value
  );
}
