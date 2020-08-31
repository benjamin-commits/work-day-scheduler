$(document).ready(function() {
  
  var test = false;

  var nowHour24 = moment().format('H');
  var nowHour12 = moment().format('h');

  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }

  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (test) { console.log(storedPlans); }

  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {

    planTextArr = new Array(9);
  }

  if (test) { console.log("full array of planned text",planTextArr); }

  var $planDiv = $('#planner');

  $planDiv.empty();

  if (test) { console.log("current time",nowHour12); }


  for (var hour = 9; hour <= 17; hour++) {

    var index = hour - 9;

    // rows
    var $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);

    var $timeDiv = $('<div>');
    $timeDiv.addClass('col-2');
  
    var $timeSpan = $('<span>');

    $timeSpan.attr('class','timeBox');
    

    var displayHour = 0;
    var ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    if (hour == 12){
        displayHour = 12;
        ampm = "pm";
    }
    
    $timeSpan.text(`${displayHour} ${ampm}`);

    $rowDiv.append($timeDiv);
    $timeDiv.append($timeSpan);

    var $planSpan = $('<input>');

    $planSpan.attr('id',`input-${index}`);
    $planSpan.attr('hour-index',index);
    $planSpan.attr('type','text');
    $planSpan.attr('class','dailyPlan');


    $planSpan.val( planTextArr[index] );
    

    var $colDiv = $('<div>');
    $colDiv.addClass('col-9');

    $rowDiv.append($colDiv);
    $colDiv.append($planSpan);

    var $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-1');

    var $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);


    rowColor($rowDiv, hour);
    

    $planDiv.append($rowDiv);
  };


  function rowColor ($hourRow,hour) { 

    if (test) { console.log("rowColor ",nowHour24, hour); }

    if ( hour < nowHour24) {
 
      if (test) { console.log("lessThan"); }
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > nowHour24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (test) { console.log("eqaul"); }
      $hourRow.css("background-color","tomato")
    }
  };


  $(document).on('click','i', function(event) {
    event.preventDefault();  

    if (test) { console.log('click text before '+ planTextArr); }

    var $index = $(this).attr('save-id');

    var inputId = '#input-'+$index;
    var $value = $(inputId).val();

    planTextArr[$index] = $value;


    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click text after '+ planTextArr); }


    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  

  $(document).on('change','input', function(event) {
    event.preventDefault();  
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }



    var i = $(this).attr('hour-index');

    $(`#saveid-${i}`).addClass('shadowPulse');
  });
});