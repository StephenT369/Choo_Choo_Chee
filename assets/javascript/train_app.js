//Choo Choo Chee :: Stephen Thompson \^/
const firebaseConfig = {
    apiKey: "AIzaSyBLBqfyi_oxoJn-8AmS7wS7ZqDv9AYGWlg",
    authDomain: "choochoochee-d9929.firebaseapp.com",
    databaseURL: "https://choochoochee-d9929.firebaseio.com",
    projectId: "choochoochee-d9929",
    storageBucket: "",
    messagingSenderId: "562914770632",
    appId: "1:562914770632:web:cb814c402d35e604"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Global Variables
  var database = firebase.database();
  var title = 'Anytime is Train Time';
  var lead = 'Choo Choo. Chee Chee.';
  var formTitle = 'Add Train';
  var scheduleTitle = 'Current Train Schedule';
  var trainH = 'Train Name';
  var destinationH = 'Destination';
  var frequencyH = 'Frequency (min)';
  var nextH = 'Next Arrival';
  var minH = 'Minutes Away';

  $(document).ready(function(){
    $('.display-4').append(title);
    $('.lead').append(lead);
    $('#formtitle').append(formTitle);
    $('#scheduletitle').append(scheduleTitle);
    $('#trainH').append(trainH);
    $('#destinationH').append(destinationH);
    $('#frequencyH').append(frequencyH);
    $('#nextH').append(nextH);
    $('#minH').append(minH);
  });

  $('.submit').on('click', function(){
    database.ref().push({
        train: $('#trainname').val().trim(),
        destination: $('#destination').val().trim(),
        time: $('#time').val().trim(),
        frequency: $('#frequency').val().trim(),
    });  
  });

  database.ref().on("child_added", function(snapshot) {
    var newPost = snapshot.val();
    var now = moment(moment());
    var firstTime = moment(newPost.time, 'HH mm');
    var parsedFrequency = parseInt(newPost.frequency);
   
  
    var minDiff = now.diff(firstTime, 'minutes');
    var timeMod = minDiff % parsedFrequency;
    var minAway = parsedFrequency - timeMod;
    var currTimeFmt = moment().format('hh:mm');
    var nextArrive = moment().add(minAway, 'minutes');
    var nextArriveDisp = moment(nextArrive).format('hh:mm A');
    var body = $("#schedule-table");
    var row = $("<tr>").appendTo(body);

    row.append(`<td>${newPost.train}</td>`)
    row.append(`<td>${newPost.destination}</td>`)
    row.append(`<td>${newPost.frequency}</td>`)
    row.append(`<td>`+ nextArriveDisp + `</td>`)
    row.append(`<td>`+ minAway + `</td>`)
  });