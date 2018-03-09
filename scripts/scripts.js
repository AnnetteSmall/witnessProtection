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
  displayUsers: function(){
    var totalUsers = this.users.length;
    if (totalUsers === 0 ){
      console.log("No users entered");
    } else {
      for (var i = 0;i<totalUsers; i++ ){
        console.log(this.users[i].name);
      }
    }
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
  addUser: function(name,dob,gender,activity,height,weight,shoulders,waist,chest,hips,arm,forarm,thigh,calf,date){
    this.users.push({
      name: name,
      dob: dob,
      gender: gender,
      activity: activity,
      height: height,
      measurements:[{
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
      }]
    });
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
    var usersUL = document.querySelector('ul');
    // usersUL.innerHTML = 'Hello';
    // console.log(wp.users.length);
    for (var i = 0; i< wp.users.length ; i++){
      var user = wp.users[i].name;
      var userLi = document.createElement('li');
      var userButton = document.createElement('Button');
      userButton.id = i;
      userButton.textContent = user;
      userLi.appendChild(userButton);
      usersUL.appendChild(userLi);
      // console.log(wp.users[i]);
      // console.log(userLi);
    }
  }
}

// console.log(wp);
view.displayUsers();

var userUl = document.querySelector('ul')
userUl.addEventListener('click', function(event){
  index = event.target.id;
  var user = wp.users[index];
  var name = wp.users[index].name;
  wp.displayUser(name);
  var profileName = document.getElementById("profileName");
  profileName.textContent = user.name;
  // Display data per key
  for (var key in user) {

    if (user.hasOwnProperty(key)) {
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
                current.style.display = "none";
              } else {
                current.style.display = "block";
                current.textContent = measurementsKey + ": " + currentMeasurements[measurementsKey]
              }


            }
          }
        }
      } else {
        current = document.getElementById(key);
        current.style.display = "block";
        current.textContent = key + ": " + user[key];

      }

    }
}
})
