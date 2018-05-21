// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('serviceWorker.js')
//     .then(function () {
//       console.log('Service worker registered!');
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// };


var wp = {
  calcWeightLoss : function(startWeight, endWeight){
    var loss = startWeight-endWeight;
    return loss
  },
  startDate: function(measurementsList){
    var totalEntries = measurementsList.length;
    // var measurementsList = user['measurements'];
    for (var i = 0; i<totalEntries; i++){
      if (measurementsList.length>= 1){
      var min = measurementsList[0].date;
      var beginWeight = measurementsList[0].weight;
      }
      for (var j = 1; j< totalEntries; j++){
        if (new Date(min) > new Date(measurementsList[j].date)){
          console.log(min, " date smaller than ", measurementsList[j].date)
          min = measurementsList[j].date;
          beginWeight = measurementsList[j].weight;

        }
      }
    }
    return [min, beginWeight]
  },
  lastDate: function(measurementsList){
    var totalEntries = measurementsList.length;
    // var measurementsList = user['measurements'];
    for (var i = 0; i<totalEntries; i++){
      if (measurementsList.length>= 1){
      var max = measurementsList[0].date;
      var lastWeight = measurementsList[0].weight;
      }
      for (var j = 1; j< totalEntries; j++){
        if (new Date(max) < new Date(measurementsList[j].date)){
          max = measurementsList[j].date;
          lastWeight = measurementsList[j].weight;

        }
      }
    }
    return [max, lastWeight]
  },
  dateTimeNow: function(id){
    // Pre determain today's date time for date picker
    var dateNow = new Date().toISOString();
    dateNow = dateNow.slice(0,16);
    var datePicker = document.getElementById(id);
    datePicker.value = dateNow;
  },
  displayUser: function(name){

  },
  addUser: function(){
    if (document.getElementById('markDefaultUser').checked === true) {
      var fdefaultUser = 1;
    } else {
      var fdefaultUser = 0;
    }
    var formProfileName = document.getElementById('newProfileName').value;
    var formdob = document.getElementById('newProfiledob').value;
    var formGender = document.getElementById('newProfileGender').value;
    var formActivity = document.getElementById('newProfileActivity').value;
    var formHeight = document.getElementById('newProfileHeight').value;
    profile = {defaultUser: fdefaultUser, name: formProfileName, dob: formdob, gender: formGender, activity: formActivity, height: formHeight, weight:[] };
    writeData('users', profile);
    document.getElementById('addNewUser').reset();
    view.displayUsers();
  },
  addMeasurements: function(){
  },
  changeUserName: function(){

  },
  calculateBMI: function(weight, height){
    var bmi = weight / ((height/100) * (height/100));
    return ~~bmi
  },
  calcAge: function(dateString) {
    var birthday = +new Date(dateString);
      return ~~((Date.now() - birthday) / (31557600000));
  },
  calculateKcal: function(weight,height,dob,gender,activity){
    // physical activity factors are 1.2 for sedentary people,
    //  1.3 for moderately active people and 1.4 for active people.
    //  females = 10 x (Weight in kg) + 6.25 x (Height in cm) - 5 x age - 161
    // for males= 10 x (Weight in kg) + 6.25 x (Height in cm) - 5 x age + 5
    var Kcal;
    var age = this.calcAge(dob);
    if (gender == "female"){
      Kcal = (10 * weight) + (6.25 * height) - (5 * age) - 161 ;
    } else {
      Kcal = (10 * weight) + (6.25 * height) - (5 * age) + 5 ;
    }
    if (activity == "sedentary"){
      Kcal *= 1.2
    } else if(activity == "moderately"){
      Kcal *= 1.3
    } else if (activity == "active"){
      Kcal *= 1.4
    }
    return ~~Kcal
  },
  defaultUser: function(){
    readAllData('users').
    then (function(usersData){
      var defaultUserid = '';
      for (var i in usersData){
        if (usersData[i].defaultUser === 1){
          defaultUserid = usersData[i].Rowid;
          view.displayUser(defaultUserid)
        }
      }
    });
    // return defaultUserid ;
  },
  searchFoodItem: function(itemName){
    search4('food', 'name', itemName)
    .then (function(checkExistResults){
      if (checkExistResults){
        console.log('Found ',itemName,' with Rowid :', checkExistResults.Rowid)
      } else {
        console.log('did not find ', name)
      }
    });
  },
  autocomplete: function(){

  },
  loginOnline: function(){
    console.log('Trying to login to API online');
    var formData  = new FormData();
    // formData.append('mobileNo', document.getElementById('f_mobileNo').value);
    // formData.append('userPassword', document.getElementById('f_password').value);
    formData.append('mobileNo','0824659470');
    formData.append('userPassword', 'jethro1012');

    var postURL = "https://www.digitalfields.co.za/lc/api/ws1.cfc?method=login&queryformat=struct";
    fetch(postURL, {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
        // console.log('Login attempt UN-sucessful');
      }
        else {
            // console.log('good, now then ', );
        }
      // Read the response as json.
      return response.json();
    //   return response;
    })
    .then(function(responseAsJson) {
        var addDataList= {HuserID: responseAsJson[0].HUSERID,
                        currentUUID: responseAsJson[0].CURRENTUUID};
    })
    .catch(function(error) {
      // console.log('Looks like there was a problem logging in: \n', error);
    });
  },
  createNode: function(data){
    for (var i = 0; i < data.length; i++){
      var food = data[i].food_name;
      var foodUL = document.getElementById('foodList');
      var foodLi = document.createElement('li');
      foodLi.id = data[i].food_id;
      var foodButton = document.createElement('Button');
      foodButton.id = "foodAddSelectButton";
      foodButton.textContent = food;
      var fooddata = data[i];
      foodButton.onclick = function(data){
        id = data.target.parentNode.id;
        var idurl = 'http://lifecoach.digitalfields.co.za/food/get/id?id='+id;
        fetch(idurl)
        .then((resp)=>resp.json())
        .then(function(data){
          var data = data[0];
          console.log(data);
          food = {name: data.food_name, id: data.food_id, serving: data.food_serving, carbs: data.food_carbs, protein: data.food_protein, fat:data.food_fat, calories:data.food_calories, type: data.food_type}
          writeData("food", food);
          while (foodUL.hasChildNodes()){
            foodUL.removeChild(foodUL.firstChild);
          }
          var card = wp.createItemCard(food);
          var display = document.getElementById('displayFoodItem');

          display.appendChild(card);
        })
      }
      foodLi.appendChild(foodButton);
      foodUL.appendChild(foodLi)
      }
  },
  createItemCard:function(food){
    console.log(food);
    var foodCard = document.createElement('div');
    foodCard.className = 'foodCard';
    var heading = document.createElement('h4');
    heading.textContent = food.name;
    var desc = document.createElement('p');
    desc.innerHTML = 'Serving: '+food.serving;
    var type = document.createElement('p');
    type.innerHTML = 'Type : '+food.type;
    var cal = document.createElement('p');
    cal.innerHTML = 'Calories: '+food.calories;
    var prot = document.createElement('p');
    prot.innerHTML = 'Protein: '+food.protein;
    var carb = document.createElement('p');
    carb.innerHTML = 'Carbs: '+food.carbs;
    var fat = document.createElement('p');
    fat.innerHTML = 'Fat: '+food.fat;
    var mealtype = document.createElement('select');
    var mealPlaceholder = document.createElement('option');
    mealPlaceholder.textContent = 'Select meal';
    mealtype.appendChild(mealPlaceholder);
    var breakfast = document.createElement('option');
    breakfast.value = 'breakfast';
    breakfast.textContent = 'Breakfast';
    mealtype.appendChild(breakfast);
    var lunch = document.createElement('option');
    lunch.value = 'lunch';
    lunch.textContent = 'Lunch';
    mealtype.appendChild(lunch);
    var dinner = document.createElement('option');
    dinner.value = 'dinner';
    dinner.textContent = 'Dinner';
    mealtype.appendChild(dinner);

    var servingsize = document.createElement('select');
    var servingPlaceholder = document.createElement('option');
    servingPlaceholder.textContent = 'Serving size';
    servingsize.appendChild(servingPlaceholder);
    var half = document.createElement('option');
    half.value = 0.5;
    half.textContent = '1/2';
    servingsize.appendChild(half);
    var one = document.createElement('option');
    one.value = 1;
    one.textContent = '1';
    servingsize.appendChild(one);
    var two = document.createElement('option');
    two.value = 2;
    two.textContent = '2';
    servingsize.appendChild(two);

    var newLine = document.createElement('br');
    var submit = document.createElement('button');
    submit.textContent = 'Submit';
    foodCard.appendChild(heading);
    foodCard.appendChild(desc);
    foodCard.appendChild(type);
    foodCard.appendChild(cal);
    foodCard.appendChild(prot);
    foodCard.appendChild(carb);
    foodCard.appendChild(fat);
    foodCard.appendChild(mealtype);
    foodCard.appendChild(servingsize);
    foodCard.appendChild(newLine);
    foodCard.appendChild(submit);
    foodCard.className = 'foodCard';

    return foodCard
  }
};

var view ={
  displayUsers: function(){
    document.getElementById('userList').innerHTML='';
    readAllData('users').
    then (function(listUsers){
      for (var i in listUsers){
        var user = listUsers[i].name;
        var usersUL = document.getElementById('userList');
        var userLi = document.createElement('li');
        var userButton = document.createElement('Button');
        userButton.id = listUsers[i].Rowid;
        userButton.textContent = user;
        userLi.appendChild(userButton);
        usersUL.appendChild(userLi);
        }
    });
  },
  displayUser: function(index){
    readOneData('users', parseInt(index)).
    then (function(user){
      document.getElementById('Rowid').innerHTML = index;
      var start = wp.startDate(user['weight']);
      var end = wp.lastDate(user['weight']);
      currentWeight = end[1];
      var height = user['height'];
      var profileName = document.getElementById("profileName");
      profileName.textContent = user['name'];
      document.getElementById('weightLossValue').textContent = "Weight Loss: " + wp.calcWeightLoss(start[1], end[1]) + " Kg";
      document.getElementById('bmi').textContent = "BMI: " + (wp.calculateBMI(currentWeight, user['height']));
      document.getElementById('kcal').textContent = "Kcal: " + (wp.calculateKcal(currentWeight, user['height'],user['dob'],user['gender'],user['activity']));
    });
  },
  displayFoodOptions: function(){
    readAllData('food').
    then(function(listFood){
      for (var i in listFood){
        var foodItem = listFood[i].name;
        var foodSelect = document.getElementById('FoodEatenSelect');
        var foodOption = document.createElement('option');
        foodOption.value = foodItem;
        foodOption.id = listFood.Rowid;
        foodOptionDisplay = foodItem.charAt(0).toUpperCase() + foodItem.slice(1).toLowerCase();
        foodOption.textContent = foodOptionDisplay;
        foodSelect.appendChild(foodOption);

      }
    });
  },
  togglediv: function(element){
    element.classList.toggle('toggle');
  }
};


// ****************************************************************
// **********   Event Listners to Submit Form Data ****************
// ****************************************************************
// add a new User
var addNewProfile = document.getElementById('submitNewProfile');
addNewProfile.addEventListener('click', function(event){
  wp.addUser();
})

// add new measurments
var saveMeasurmentButton = document.getElementById('saveMeasurmentButton');
saveMeasurmentButton.addEventListener('click', function(event){
  console.log(document.getElementById('Rowid').innerHTML);
  var rowid = document.getElementById('Rowid').innerHTML;
  readOneData('users', parseInt(rowid)).
  then (function(user){
    // console.log(user);
    var fweight = document.getElementById('new_weight').value;
    var fdate = document.getElementById('new_MeasurementInputDate').value;
    var weightCaptured = {weight:fweight, date:fdate};
    var newWeightCaptured = new Object(weightCaptured);
    console.log('newWeight',newWeightCaptured);
    user['weight'].push(newWeightCaptured);
    writeData("users", user);
    document.getElementById("addMeasurmentsForm").reset();
    wp.dateTimeNow('new_MeasurementInputDate');
    // addMeasurmentsForm.classList.toggle('display');
    view.displayUser(rowid);
    view.togglediv(document.getElementById("toggleAddMeasurmentsForm"));
  });
});

// add new food items
var searchFoodItemButton = document.getElementById('searchFoodItemButton');
searchFoodItemButton.addEventListener('click', function(event){
  var item = document.getElementById('formFoodItemToAdd').value;
  console.log(item);
  var url = "http://lifecoach.digitalfields.co.za/food/get/item?item="+item
  fetch(url)
  .then((resp)=> resp.json())
  .then(function(data){
    if (data.length == 0) {
      console.log('Hit fatsecret');
      var fsurl = 'http://lifecoach.digitalfields.co.za/fatsecret/'+item;
      console.log(fsurl);
      fetch(fsurl)
      .then((resp)=>resp.json())
      .then(function(data){
        console.log(data.foods.food.length);
        wp.createNode(data.foods.food);
        })
      } else {
        wp.createNode(data);
      }
    })
  });


// Add Food eaten
var saveFoodEatenButton = document.getElementById('saveFoodEatenButton');
saveFoodEatenButton.addEventListener('click', function(){
  var rowid = Rowid.innerHTML;
  readOneData('users', parseInt(rowid)).
  then(function(user){

    var formFood = document.getElementById('FoodEatenSelect').value;
    var formQty = document.getElementById('formQty').value;
    var formUOM = document.getElementById('formUOM').value;
    var formDate = document.getElementById('new_FoodInputDate').value;
    var Meal = {food:formFood,qty:formQty,uom:formUOM, logDate: formDate};
    var newFood = new Object(Meal);
    if (user.food){
        user['food'].push(newFood);
    }else{
      user.food = [new Object(newFood)];
    };
    writeData("users", user);
    document.getElementById("AddFoodEatenForm").reset();
    wp.dateTimeNow('new_FoodInputDate');
    view.togglediv(document.getElementById("toggleFoodEatenForm"));
  });
})

// ****************************************************************
// **********   Event Listners to Show Form Selected **************
// ****************************************************************
// new user
var showAddNewUser = document.getElementById('showAddNewUser');
showAddNewUser.addEventListener('click', function(){
  var toggleAddUserForm = document.getElementById('toggleAddUserForm');
  view.togglediv(toggleAddUserForm);
});

// Food Item
var showAddFoodItemForm = document.getElementById('showAddFoodItemForm');
showAddFoodItemForm.addEventListener('click', function(){
  view.togglediv(document.getElementById("displayUserProfile"));
  var showBox = document.getElementById('toggleAddFoodItemForm');
  view.togglediv(showBox);
});
//FoodListItem


// New Measurements
var showAddMeasurementForm = document.getElementById('showAddMeasurementForm');
showAddMeasurementForm.addEventListener('click', function(){
  // console.log('show measurements', showAddMeasurementForm);
  var showMeasurementsBox = document.getElementById('toggleAddMeasurmentsForm');
  // console.log(showBox);
  view.togglediv(showMeasurementsBox);
});

// User List
var showUsersList = document.getElementById('showUsersList');
showUsersList.addEventListener('click', function(){
  var toggleList = document.getElementById('userListBox');
  view.togglediv(toggleList);
});

// New Meal
var showSelectFoodOptions = document.getElementById('showFoodOptionsSelect');
showFoodOptionsSelect.addEventListener('click', function(){
  view.displayFoodOptions();
  var toggleFoodEatenForm = document.getElementById('toggleFoodEatenForm');
  view.togglediv(toggleFoodEatenForm);
  var datePicker = document.getElementById('new_FoodInputDate');
  wp.dateTimeNow('new_FoodInputDate');
});

// Full profile of user selected
var userList = document.getElementById('userList');
userList.addEventListener('click', function(event){
  var rowid = event.target.id;
  view.displayUser(rowid);
  // view.togglediv(document.getElementById('displayUserProfile'));
});


// log in
var logIn = document.getElementById('logInButton');
logIn.addEventListener('click', function(){
  wp.loginOnline();
})

function init(){
  wp.loginOnline();
  view.displayUsers();
  wp.defaultUser();
  wp.dateTimeNow('new_MeasurementInputDate');
  view.togglediv(document.getElementById('userListBox'));

  // rest.post(fatSecretRestUrl, {
  //   data: reqObj,
  // }).on('complete', function(data, response) {
  //   console.log(response);
  //   console.log("DATA: " + data + "\n");
  // });
}

init();
