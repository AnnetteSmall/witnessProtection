

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
    console.log(user,begin,end)

  },
  startDate: function(name){
    var totalUsers = this.users.length;
    for ( var i = 0; i < totalUsers; i++){
      if (name === this.users[i].name){
        if (this.users[i].measurements.length>= 1){
          var min = this.users[i].measurements[0].measurmentDate;
          var beginWeight = this.users[i].measurements[0].weight
        }
        for ( var j = 1; j < this.users[i].measurements.length; j++){
          if (new Date(min) > new Date(this.users[i].measurements[j].measurmentDate)){
            min = this.users[i].measurements[j].measurmentDate;
            var beginWeight = this.users[i].measurements[j].weight
          }
        }
      }
    }

    return [min, beginWeight]
  },
  lastDate: function(name){
    var totalUsers = this.users.length;
    for ( var i = 0; i < totalUsers; i++){
      if (name === this.users[i].name){
        if (this.users[i].measurements.length>= 1){
          var max = this.users[i].measurements[0].date;
          var lastWeight = this.users[i].measurements[0].weight
        }
        for ( var j = 0; j < this.users[i].measurements.length; j++){
          if (new Date(max) < new Date(this.users[i].measurements[j].measurmentDate)){
            max = this.users[i].measurements[j].measurmentDate
            var lastWeight = this.users[i].measurements[j].weight
          }
        }
      }
    }
    return [max,lastWeight]
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
    var formProfileName = document.getElementById('newProfileName').value;
    var formdob = document.getElementById('newProfiledob').value;
    if (document.getElementById('newProfileGenderMale').checked === true){
      var formGender = document.getElementById('newProfileGenderMale').value
    } else if (document.getElementById('newProfileGenderFemale').checked === true){
      var formGender = document.getElementById('newProfileGenderFemale').value
    };
    if (document.getElementById('newProfileActivity1').checked === true){
      var formActivity = document.getElementById('newProfileActivity1').value
    } else if (document.getElementById('newProfileActivity2').checked === true) {
      var formActivity = document.getElementById('newProfileActivity2').value
    } else if (document.getElementById('newProfileActivity3').checked === true) {
      var formActivity = document.getElementById('newProfileActivity3').value
    } else if (document.getElementById('newProfileActivity4').checked === true) {
      var formActivity = document.getElementById('newProfileActivity4').value
    } else if (document.getElementById('newProfileActivity5').checked === true) {
      var formActivity = document.getElementById('newProfileActivity5').value
    };
    var formHeight = document.getElementById('newProfileHeight').value;
    // Add Startdate - Calculation
    // Add calculateBMI
    // Add calcAge
    // Add calculateKcal
    profile = {name: formProfileName, dob: formdob, gender: formGender, activity: formActivity, height: formHeight, measurements:[] };
    writeData('users', profile);
    document.getElementById('addNewUser').style.display = 'none';
    document.getElementById('addNewUser').reset();
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
  calculateBMI: function(name, weight, height){
    var bmi = weight / (height * height);
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
    if (gender == "female"){
      Kcal = (10 * weight) + (6.25 * (height * 100)) - (5 * age) - 161 ;
      // console.log(Kcal);
    } else {
      Kcal = (10 * weight) + (6.25 * (height * 100)) - (5 * age) + 5 ;
    }
    if (activity == "sedentary"){
      Kcal *= 1.2
    } else if(activity == "moderately"){
      Kcal *= 1.3
    } else if (activity == "active"){
      Kcal *= 1.4
    }
    return ~~Kcal
  }
}

var view ={
  displayUsers: function(){
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
  displayUser: function(){
    // var totalUsers = this.users.length;
      var displayProfile = document.getElementById('displayUserProfile');
      displayProfile.classList.toggle('display');
      var index = event.target.id;
      readOneData('users', parseInt(index)).
      then (function(user){
        var name =  user.name;
        var profileName = document.getElementById("profileName");
        profileName.textContent = name;
        for (var key in user) {
          if (user.hasOwnProperty(key) ) {
            var type = typeof user[key];
            // if type is an object
            if (type === "object" ){
              var currentKey = user[key];
              for (var subKey in currentKey){
                if (currentKey.hasOwnProperty(subKey)){
                  var currentMeasurements = user[key][subKey];
                  for (var measurementsKey in currentMeasurements){
                    current = document.getElementById(measurementsKey);
                    if (currentMeasurements[measurementsKey] === null){
                      current.classList.toggle('display')
                    } else {
                      current.style.display = "block";
                      current.textContent = measurementsKey + ": " + currentMeasurements[measurementsKey]
                    }
                  }
                }
              }
            } else {
              current = document.getElementById(key);
              if (key != 'Rowid'){
                current.style.display = "block";
                current.textContent = key + ": " + user[key];
              } else {
                current.style.display = "none";
                current.textContent = user[key];
              }
              }

          }
        }
      });
    }
};

// Toggle Display User List
var displayUsersButton = document.getElementById('displayUsersButton');
var clickCount = 0;
displayUsersButton.addEventListener('click', function(){
  // view.displayUsers();
  var usersUL = document.getElementById('userList');
  var child = usersUL.hasChildNodes();
  console.log(child);
  if (child){
    document.getElementById('userList').innerHTML = '';
  } else {
    view.displayUsers();
  }

  // clickCount ++
  // if (clickCount % 2 === 1){
  //   view.displayUsers();
  // } else {
  //   console.log('else')
  //   // document.getElementById('userList').innerHTML = '';
  //   var listUl = document.getElementById('userList')
  //   // listUl.classList.toggle('display');
  // }
});

// Return home
var home = document.getElementById('home');
home.addEventListener('click', function(event){
  var displayUserProfile = document.getElementById('displayUserProfile');
  var addMeasurmentsForm = document.getElementById('addMeasurmentsForm');
  displayUserProfile.classList.toggle('display');
  addMeasurmentsForm.classList.toggle('display');
  displayUsersButton.classList.toggle('display');
  addUserButton.classList.toggle('display');
});

// Display User Details
var userList = document.querySelector('ul')
userList.addEventListener('click', function(event){
  var displayUsersButton = document.getElementById('displayUsersButton');
  displayUsersButton.classList.toggle('display');
  var addUserButton = document.getElementById('addUserButton');
  addUserButton.classList.toggle('display');
  userList.classList.toggle('display');
  view.displayUser();

  // document.getElementById('userList').innerHTML = '';
});

// display form for adding a new User
var addUserFormButton = document.getElementById('addUserButton')
addUserFormButton.addEventListener('click', function(event){
  displayUsersButton.classList.toggle('display');
  addUserButton.classList.toggle('display');
  var formDisplay = document.getElementById('addNewUser');
  formDisplay.classList.toggle('display');
});

// display form for adding new measurments
var addMeasurmentsForm = document.getElementById('addMeasurementsButton')
addMeasurmentsForm.addEventListener('click', function(event){
  var formAddMeasurements = document.getElementById('addMeasurmentsForm');
  var MeasurementInputDate = document.getElementById('MeasurementInputDate');
  // MeasurementInputDate.value = new Date().toJson().slice(0,10).replace(/-/g,'/');
  formAddMeasurements.classList.toggle('display');

})


// Submit data from Form to add a new User - Save to local storage
var addNewProfile = document.getElementById('submitNewProfile');
addNewProfile.addEventListener('click', function(event){
  wp.addUser();
})

// Submit data from Form to add new measurments
var saveMeasurmentButton = document.getElementById('saveMeasurmentButton')

saveMeasurmentButton.addEventListener('click', function(event){
  console.log('click')
  var rowid = document.getElementById('Rowid').innerHTML;
  readOneData('users', parseInt(rowid)).
  then (function(user){
    // console.log(user);
    var fweight = document.getElementById('new_weight').value;
    var fshoulders = document.getElementById('new_shoulders').value;
    var fwaist = document.getElementById('new_waist').value;
    var fchest = document.getElementById('new_chest').value;
    var fhips = document.getElementById('new_hips').value;
    var farm = document.getElementById('new_upperArm').value;
    var fforarm = document.getElementById('new_forarm').value;
    var fthigh = document.getElementById('new_thigh').value;
    var fcalf = document.getElementById('new_calf').value;
    var fdate = document.getElementById('new_MeasurementInputDate').value;
    var measurements = {weight:fweight, shoulders:fshoulders, waist:fwaist, chest:fchest, hips:fhips, arm:farm, forarm:fforarm, thigh:fthigh, calf:fcalf, date:fdate};
    user['measurements'].push(measurements);
    // if (user[measurements]){
    //   user['measurements'].push(measurements)
    // } else {
    //   user['measurements'] = measurements;
    console.log(user);
    // }
    writeData("users", user);
  });
});

function init(){
  var formNewUserDisplay = document.getElementById('addNewUser');
  formNewUserDisplay.classList.toggle('display');
  var formNewMeasurement = document.getElementById('addMeasurmentsForm');
  formNewMeasurement.classList.toggle('display');
  var displayUserProfile = document.getElementById('displayUserProfile');
  displayUserProfile.classList.toggle('display');

    }

init();
