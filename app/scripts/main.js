(function() {
/*
Route::get('http://game-api.local/api/v1/auth/username={user}/password={pw}', ['uses' => 'HomeController@getAuth']);
Route::post('http://game-api.local/api/v1/register/username={user}/password={pw}', ['uses' => 'HomeController@register']);
Route::post('http://game-api.local/api/v1/score/username={user}/score={score}', ['uses' => 'HomeController@postScore']);
Route::get('http://game-api.local/api/v1/score/username={user}', ['uses' => 'HomeController@getHighScore']);
*/
var user = null;
$( "#login" ).submit(function( event ) {
  var username = $( "#login #username" ).val();
  var password = $("#login #pwd").val();
  $.getJSON('http://game-api.local/api/v1/auth/username=' + username + '/password=' + password, function (data, status, xhr) {
      if((data.username === username) && (data.password === password) ){
        window.location.href = "http://localhost:9000/dashboard.html#"+username;
        user = data;
      }
      else{
        $( "span" ).text( "Incorrect credentials!" ).show().fadeOut( 5000 );
      }
  });
  event.preventDefault();
});

$( "#register" ).submit(function( event ) {
  var username = $( "#register #username" ).val();
  var password = $("#register #pwd").val();
  var pw = $("#register #pwd1").val();
  if( password === pw){
      $.post('http://game-api.local/api/v1/register/username=' + username + '/password=' + password, function (data, status, xhr) {
         console.log(data);
         if( data === "user exists" ){
            $( "span" ).text( "user already exists, Please login to continue" ).show().fadeOut( 5000 );
         }
         else{
            $( "span" ).text( "user added, Please login to continue" ).show().fadeOut( 5000 );
        }
     });
   }
  else{
     $( "span" ).text( "passwords do not match!" ).show().fadeOut( 5000 );
  }
   event.preventDefault();
});
user = user_obj().username;
countTime();
function countTime(){
  var count=45;
  var counter = setInterval(timer, 1000);
  var score = 0;
  function timer(){
    count=count-1;
    score = $('#score').text();
      if ((count <= -1)){
        clearInterval(counter);
        return;
      }
      $("#counter").text( count + " secs");
      if ((count===0)||(score===120)){
        $("#canvas").empty();
        $("#game").append('<div id="msg" class = "jumbotron"><h1>Game Over</h1><button id="restart" type="button" class="btn btn-primary btn-lg">Restart</button></div>');
        $("#restart").on('click', function() {
           $("#game #msg").remove();
           $("#game #canvas").append( game_obj());
           count = 46;
           countTime();
        });
        $.post('http://game-api.local/api/v1/score/username='+ user +'/score='+score, function (data, status, xhr) {
           console.log(data);
           event.preventDefault();
        });
     }
  }
}

$("#canvas").append( game_obj());

$.when(score_timer(user)).then(function( data ) {

   $("#score_board").append('<table class="table table-striped"><thead><tr><th>User</th><th>Score</th><th>Date</th></tr></thead>'+
     '<tbody><tr><td>'+ data.user1.username +'</td><td>'+ data.user1.score +'</td><td>'+ data.user1.date +'</td></tr></tbody>'+
     '<tbody><tr><td>'+ data.user2.username +'</td><td>'+ data.user2.score +'</td><td>'+ data.user2.date +'</td></tr></tbody>'+
     '<tbody><tr><td>'+ data.user3.username +'</td><td>'+ data.user3.score +'</td><td>'+ data.user3.date +'</td></tr></tbody>'+
     '<tbody><tr><td>'+ data.user4.username +'</td><td>'+ data.user4.score +'</td><td>'+ data.user4.date +'</td></tr></tbody>'
   );
});




}());
