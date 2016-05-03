var score_timer = (function(username) {
  var def = $.Deferred();
  $.getJSON('http://game-api.local/api/v1/score/username=' + username)
      .done(function(data){
          //resolve the deferred, passing it our custom data
            def.resolve({
                user1:data[0],
                user2:data[1],
                user3:data[2],
                user4:data[3],
                user5:data[4]
            });
        });
return def.promise();
});
