  var config = {
    apiKey: "AIzaSyBvCJmUQWgyyYucuBEegcqbD2-FzB8jUQ4",
    authDomain: "train-scheduler-ec96f.firebaseapp.com",
    databaseURL: "https://train-scheduler-ec96f.firebaseio.com",
    projectId: "train-scheduler-ec96f",
    storageBucket: "train-scheduler-ec96f.appspot.com",
    messagingSenderId: "316082908294"
  };
  firebase.initializeApp(config);

    var database = firebase.database();
    var TrainSchedule = database.ref("TrainSchedule");
    var newTrain = {};;

    $("button").on("click", function() {
        event.preventDefault();
        newTrain.name = $("#exampleInputTrainName").val().trim();
        newTrain.destination = $("#exampleInputDestination").val().trim();
        newTrain.time = $("#exampleInputTrainTime").val().trim();
        newTrain.frequency = $("#exampleInputTrainFrequency").val().trim();
        console.log(newTrain);

        TrainSchedule.push(newTrain);

        $("#exampleInputTrainName").val("");
        $("#exampleInputDestination").val("");
        $("#exampleInputTrainTime").val("");
        $("#exampleInputTrainFrequency").val("");
    });

     TrainSchedule.on("child_added", function(childSnapshot,  prevChildKey) {

    var tFrequency = childSnapshot.val().frequency;
   
    var firstTime = childSnapshot.val().time;

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));
   
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("diff in time: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("min till train: " + tMinutesTillTrain);
   
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    console.log("arrival time: " + nextTrain);


          var newRow =    $('<tr id="' + childSnapshot.key + '"><td>' + childSnapshot.val().name + '</td><td>' + childSnapshot.val().destination + '</td><td class = "big">' + childSnapshot.val().time + '</td><td>' + childSnapshot.val().frequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td><td>').append('<button id="up">' + "Update" + '</button><button id="down">' + "Remove" + '</button><button id="ups">' + "Save" + '</button>');

            $('.table').append(newRow);  
 });
    
   $(document).on('click', '#down', function () {
    var $row = $(this).closest('tr');

    var trainKey = $row.attr('id');
    console.log(trainKey);

    database.ref('TrainSchedule' + trainKey).remove();
    $row.remove();

    return false;
 });
   
   var update = $(document).on('click', '#up', function () {

    var par = $(this).closest('tr'); 
    var tdName = par.children("td:nth-child(1)"); 
    var tdDestination = par.children("td:nth-child(2)"); 
    var tdfirstTime = par.children("td:nth-child(3)"); 
    var tdFrequency = par.children("td:nth-child(4)"); 

    tdName.html("<input type='text' id='txtName' value='"+tdName.html()+"'/>"); 
    tdDestination.html("<input type='text' id='txtdestination' value='"+tdDestination.html()+"'/>");
    tdfirstTime.html("<input type ='time' id = 'txttime' value='"+tdfirstTime.html()+"'/>");
    tdFrequency.html("<input type='number' id='txtfrequency' value='"+tdFrequency.html()+"'/>"); 

      $(document).on('click', '#ups', function () { 
     var $row = $(this).closest('tr');
     var trainKey = $row.attr('id');
     var Name = tdName.children("input[type=text]").val();
     var Destination= tdDestination.children("input[type=text]").val();
     var Time =tdfirstTime.children("input[type=time]").val();
     var Frequency= tdFrequency.children("input[type=number]").val();

      var trainKeyNew= {
             name: Name,
      destination: Destination,
       time: Time,
       frequency: Frequency 
    };
   
    database.ref('TrainSchedule' + trainKey).update(trainKeyNew);

     tdName.html(Name); 
      tdDestination.html(Destination); 
      tdfirstTime.html(Time); 
      tdFrequency.html(Frequency); 

        });
  });
	    function StartClock() {
        clockInterval = setInterval(function() {
     
            TrainSchedule.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                           
                    var trainName = childSnapshot.val().name;
                    var destination = childSnapshot.val().destination;
                    var firstDeparture = childSnapshot.val().time;
                    var frequency = childSnapshot.val().frequency;
                    
                    var tFrequency = childSnapshot.val().frequency;
                     
                      var firstTime = childSnapshot.val().time;
                    
                    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
                    console.log(firstTimeConverted);
                     
                    var currentTime = moment();
                     console.log("current time: " + moment(currentTime).format("hh:mm"));
                    
                     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
                     console.log("diff in time: " + diffTime);
                     
                    var tRemainder = diffTime % tFrequency;
                    console.log(tRemainder);
                   
                   var updatetMinutesTillTrain = tFrequency - tRemainder;
                   console.log("min till train: " + updatetMinutesTillTrain);
                   
                   var updatenextTrain = moment().add(updatetMinutesTillTrain, "minutes").format("hh:mm A");
                  console.log("arrival time: " + updatenextTrain);


                    trainName = $("#exampleInputTrainName").val().trim();
                    destination = $("#exampleInputDestination").val().trim();
                    firstDeparture = $("#exampleInputTrainTime").val().trim();
                    frequency = $("#exampleInputTrainFrequency").val().trim();

               var newRow = $('<tr id="' + childSnapshot.key + '"><td>' + childSnapshot.val().name + '</td><td>' + childSnapshot.val().destination + '</td><td class = "big">' + childSnapshot.val().time + '</td><td>' + childSnapshot.val().frequency + '</td><td>' + updatenextTrain + '</td><td>' + updatetMinutesTillTrain + '</td><td>'
                 ).append('<button id="up">' + "Update" + '</button><button id="down">' + "Remove" + '</button><button id="ups">' + "Save" + '</button>');
                }); 
            });
    
        }, 1000 * 60);
    }   
    StartClock(); 




