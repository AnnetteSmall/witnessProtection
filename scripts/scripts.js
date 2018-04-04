if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('serviceWorker.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
};

var wp = {
  users : [
    {
      name: "Annette",
      dob: "1974/12/18",
      gender: "female",
      activity: "sedentary",
      height: 1.66,
      measurements: [
        {
          weight: 61.3,
          shoulders: 106,
          waist: 82,
          chest: 92,
          hips: 97,
          arm: 26,
          forarm: 23.5,
          thigh: 54,
          calf: 37,
          measurmentDate: "2018/01/25"
        },
        {
          weight: 61.1,
          shoulders: 106,
          waist: 82,
          chest: 92,
          hips: 97,
          arm: 26,
          forarm: 23.5,
          thigh: 54,
          calf: 37,
          measurmentDate: "2018/01/26"
        },
        {
          weight: 61.8,
          shoulders: 106,
          waist: 82,
          chest: 92,
          hips: 97,
          arm: 26,
          forarm: 23.5,
          thigh: 54,
          calf: 37,
          measurmentDate: "2018/01/24"
        },
        {
          weight: 62,
          shoulders: 106,
          waist: 82,
          chest: 92,
          hips: 97,
          arm: 26,
          forarm: 23.5,
          thigh: 54,
          calf: 37,
          measurmentDate: "2018/01/22"
        }
      ],
      meals:[{
        mealDate:"2018/02/02",
        meal:[{
          category: "Breakfast",
          Food: ["Egg","Bacon", "Mayo"],
          Drink: ["Coffee", "Water"],
        },
              {
          category: "Lunch",
          Food: ["Coleslaw","Chicken Breast", "Chicken wing"],
          Drink: ["Coke Zero", "Water"],
        }],
      }],
    },
    {
      name: "Lawrie",
      dob: "1967/01/24",
      gender: "male",
      height: 1.8,
      activity: "sedentary",
      measurements: [{
      weight: 95.8,
      shoulders: null,
      waist: null,
      chest: null,
      hips: null,
      arm: null,
      forarm: null,
      thigh: null,
      calf: null,
      measurmentDate: "2018/01/25"
    }]
    }
  ],
  calcWeightLoss : function(index){
    var user = this.users[index].name;
    var begin = this.startDate(user);
    var end = this.lastDate(user);
    // console.log(user,begin,end)

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
    console.log(dateNow);
    console.log(datePicker);
    datePicker.value = dateNow;
    console.log(datePicker.value);
  },
  displayUser: function(name){
    totalUsers = this.users.length;
    for (var i = 0; i<totalUsers; i++){
      if (this.users[i].name === name){
        console.log("Name:",this.users[i].name);
        console.log("Date of Birth:",this.users[i].dob);
        var startDate = this.startDate(this.users[i].name);
        console.log("Start Date:", startDate[0]);
        console.log("Start Weight:", startDate[1]);
        var lastDate = this.lastDate(this.users[i].name);
        console.log("Last Update:", lastDate[0]);
        console.log("Last Weight:", lastDate[1]);
        var weightLoss = startDate[1]-lastDate[1];
        console.log("Weight Loss:",weightLoss);
        var age = this.calcAge(this.users[i].dob);
        console.log("Age:",age);
        console.log("Height:",this.users[i].height);
        var bmi = this.calculateBMI(name,
                          lastDate[1],
                          this.users[i].height);
        console.log("BMI:",bmi);
        var Kcal = this.calculateKcal(lastDate[1],
                                      this.users[i].height,
                                      this.users[i].dob,
                                      this.users[i].gender,
                                      this.users[i].activity);
        console.log("Kcal:",Kcal)
      }
    }
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
    // Add Startdate - Calculation
    // Add calculateBMI
    // Add calcAge
    // Add calculateKcal
    profile = {defaultUser: fdefaultUser, name: formProfileName, dob: formdob, gender: formGender, activity: formActivity, height: formHeight, weight:[] };
    writeData('users', profile);
    // document.getElementById('addNewUser').style.display = 'none';
    document.getElementById('addNewUser').reset();
    view.displayUsers();

  },
  addMeasurements: function(index,weight,shoulders,waist,chest,hips,arm,forarm,thigh,calf,date){
    this.users[index].measurements.push({
      weight: weight,
        shoulders: shoulders,
        waist: waist,
        chest: chest,
        hips: hips,
        arm:arm,
        forarm: forarm,
        thigh: thigh,
        calf: calf,
        date: date
    })
  },
  changeUserName: function(position, name){
    this.users[position].name = name;
    this.displayUser(name);
  },
  calculateBMI: function(weight, height){
    // console.log('weight: ', weight);
    // console.log('height: ', height);
    var bmi = weight / ((height/100) * (height/100));
    // console.log(~~bmi);
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
    // console.log(age);
    // console.log(age);
    if (gender == "female"){
      Kcal = (10 * weight) + (6.25 * height) - (5 * age) - 161 ;
      // console.log(Kcal);
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
        // console.log(usersData[i].defaultUser)
        if (usersData[i].defaultUser === 1){
          defaultUserid = usersData[i].Rowid;
          // console.log('rowid :'+defaultUserid)
          view.displayUser(defaultUserid)
        }
      }
    });
    // return defaultUserid ;
  },
  searchFoodItem: function(itemName){
    search4('food', 'name', itemName)
    .then (function(checkExistResults){
      // console.log('checkExists',checkExistResults);
      if (checkExistResults){
        console.log('Found ',itemName,' with Rowid :', checkExistResults.Rowid)
      } else {
        // not found so add
        console.log('did not find ', name)
      }
    });
  },
  autocomplete: function(){
    // var url =
  },
  loginOnline: function(){
    // performaing login to API online
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
            console.log('Login attempt UN-sucessful');
          }
            else {
                console.log('good, now then ', );

            }

          // Read the response as json.
          return response.json();
        //   return response;
        })
        .then(function(responseAsJson) {
            console.log(responseAsJson[0])
            var addDataList= {HuserID: responseAsJson[0].HUSERID,
                            currentUUID: responseAsJson[0].CURRENTUUID};
            console.log("addDataList : ", addDataList)
            //  addData('userProfile',addDataList);
            // loadPageIntoDiv('divNav','nav.html');

        })
        .catch(function(error) {

          console.log('Looks like there was a problem logging in: \n', error);
        });
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
      document.getElementById('weightLossValue').textContent = "Weight Loss: " + (start[1]-end[1]) + " Kg";
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
    console.log('Toggle element : ',element)
    element.classList.toggle('toggle');

  }
};

// select User to show full profile
var userList = document.getElementById('userList');
userList.addEventListener('click', function(event){
  var rowid = event.target.id;
  view.displayUser(rowid);
  // view.togglediv(document.getElementById('displayUserProfile'));
});

// Submit data from Form to add a new User - Save to local storage
var addNewProfile = document.getElementById('submitNewProfile');
addNewProfile.addEventListener('click', function(event){
  wp.addUser();
})

// Submit data from Form to add new measurments
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

// Submit data from Form to add new food items
var saveFoodItemButton = document.getElementById('saveFoodItemButton');
saveFoodItemButton.addEventListener('click', function(event){
  var foodToAdd = document.getElementById('formFoodItemToAdd').value;
  foodToAdd = foodToAdd.replace(/\s+/g, '%20');
  var url = "https://api.nutritionix.com/v1_1/search/"+ foodToAdd +"?brand_id=513fbc1283aa2dc80c000053&results=0%3A50&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories%2Cbrand_name&appId=ff882c0d&appKey=8c1b421a227f561199e051212e62c7b7"
  // var url = "http://api.nutritionix.com/v1_1/search/"+foodToAdd+"?results=0:20&fields=*&appId=ff882c0d&appKey=8c1b421a227f561199e051212e62c7b7"
  fetch(url)
  .then((resp)=>resp.json())
  .then(function(data){
    // console.log(data.hits);
    // data.hits.forEach(myFunction);
    console.log(foodToAdd);
    newItem = {name: foodToAdd};
    writeData('food',newItem);
    view.togglediv(document.getElementById('toggleAddFoodItemForm'));
  });

  function myFunction(item, index){
    var listFood = document.getElementById('listFood');
    console.log('item: ' + item.fields.item_name + '*-* Brand: ' + item.fields.brand_name);
    // listFood.innerHTML = listFood['fields'][item_name].innerHTML + item + "<br>";
  }
  // food = {name: foodToAdd}
  // writeData("food",food);
  document.getElementById('addFoodItemForm').reset();
  // view.togglediv(document.getElementById('toggleAddFoodItemForm'));
  });

// select menu option to show input form/fields for Food
var showAddFoodItemForm = document.getElementById('showAddFoodItemForm');
showAddFoodItemForm.addEventListener('click', function(){
  var showBox = document.getElementById('toggleAddFoodItemForm');
  view.togglediv(showBox);
});


// select menu option for measurments and show input form
var showAddMeasurementForm = document.getElementById('showAddMeasurementForm');
showAddMeasurementForm.addEventListener('click', function(){
  // console.log('show measurements', showAddMeasurementForm);
  var showMeasurementsBox = document.getElementById('toggleAddMeasurmentsForm');
  // console.log(showBox);
  view.togglediv(showMeasurementsBox);
});


var showUsersList = document.getElementById('showUsersList');
showUsersList.addEventListener('click', function(){
  var toggleList = document.getElementById('userListBox');
  view.togglediv(toggleList);
});

var showSelectFoodOptions = document.getElementById('showFoodOptionsSelect');
showFoodOptionsSelect.addEventListener('click', function(){
  view.displayFoodOptions();
  var toggleFoodEatenForm = document.getElementById('toggleFoodEatenForm');
  view.togglediv(toggleFoodEatenForm);
  var datePicker = document.getElementById('new_FoodInputDate');
  wp.dateTimeNow('new_FoodInputDate');
});

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

var showAddNewUser = document.getElementById('showAddNewUser');
showAddNewUser.addEventListener('click', function(){
  var toggleAddUserForm = document.getElementById('toggleAddUserForm');
  view.togglediv(toggleAddUserForm);
});

var logIn = document.getElementById('logInButton');
logIn.addEventListener('click', function(){
  wp.loginOnline();
})

function init(){
  wp.loginOnline();
  view.displayUsers();
  //Default users
  wp.defaultUser();
  wp.dateTimeNow('new_MeasurementInputDate');
  view.togglediv(document.getElementById('userListBox'));

  rest.post(fatSecretRestUrl, {
    data: reqObj,
  }).on('complete', function(data, response) {
    console.log(response);
    console.log("DATA: " + data + "\n");
  });

}

init();
