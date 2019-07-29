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
    var body = $("#schedule-table");
    var row = $("<tr>").appendTo(body);

    row.append(`<td>${newPost.train}</td>`)
    row.append(`<td>${newPost.destination}</td>`)
    row.append(`<td>${newPost.frequency}</td>`)

    console.log(newPost);
    
  });
  /*  
    $(document).ready(function () {

        var mTest = moment().format("DD/MM/YY hh:mm A");
        console.log(mTest);
        var testText = 'Choo Choo Chee';
        var h1 = $('<h1>').addClass('hTest');
        var title = $('<span>' + testText +'</span>').html();
       
            $(h1).appendTo('#test');
            $('.hTest').append(title);


        database.ref().push({
            train: 'Amtrack 369',
            destination: 'Los Angeles',
            time: '21:00',
            frequency: 21,

        });
    });
*/
