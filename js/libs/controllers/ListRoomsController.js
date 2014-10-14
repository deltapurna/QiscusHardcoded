'use strict';

qiscus.controller('ListRoomsController', [
    '$q',
    'QEndPoints',
    'QServiceRoom',
    'ch',

    function($q, endpoint, room, ch) {
      var url;
      var listRooms = this;

      listRooms.rooms = [];
      listRooms.roomIndex = '';
      listRooms.updateRoomOption = function(options) {
        var room = listRooms.rooms[listRooms.roomIndex];
        options.roomId = room.id;
        options.codeEn = room.code_en;
        options.topicId = room.last_topic_id;
      };

      var get_storage = function(token_key) {
          var deferred = $q.defer();

          /*
          check if already has user_token
          */
          ch.storage.sync.get(token_key, function(items) {
              if (items[token_key]) {
                  deferred.resolve(items[token_key]);
              } else {//if not logged in -> token not set yet
                  deferred.reject('failed');
              }
          });

          return deferred.promise;
      };

      var token = get_storage('user_token');
      token.then(function(token) {
          url = endpoint.getListRoomsUrl();
          room.setUrl(url);

          var getRooms = room.getListRooms(token);

          getRooms.success(function(data) {
            if (data.error) {
              console.log('error bro!');
              console.log(data);
            }
            else {
              console.log('successfully retrieve');
              console.log(data);
              listRooms.rooms = data.results.rooms;
            }
          });
      }, function(msg) {
        console.log(msg);
      });
    }
]);
