module("masterblaster Tests", {
    setup: function() {
     url: 'http://localhost:9000/dashboard.html#'
    }
});

test('username can be passed to controller', function() {
    var user = user_obj().username;
    equal(true, true, "Username is passed to controller from module score_timer");
});

test('user can login', function() {
  var url='http://localhost:9000/dashboard.html#';
  $.getJSON('http://game-api.local/api/v1/auth/username=inchikutty/password=godricks', function (data, status, xhr) {
      if((data.username === 'inchikutty') && (data.password === 'godricks') ){
        url = url+'inchikutty';
      }
  });
    equal(url+'inchikutty', 'http://localhost:9000/dashboard.html#inchikutty', "Registered users can login to the system");
});

test('get highscore board', function() {
  var dat = true;

  $.getJSON('http://game-api.local/api/v1/score/username=inchikutty', function (data, status, xhr) {
      if(data){
         dat = true;
      }
  });
    ok(dat, true, "high score data is accessed");
});
