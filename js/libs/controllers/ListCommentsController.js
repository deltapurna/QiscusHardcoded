'use strict';

qiscus.controller('ListCommentsController', [
    '$scope',
    '$q',
    'QEndPoints',
    'QHardCoded',
    'QServiceComment',
    'ch',

    function($scope, $q, endpoint, hardcoded, comment, ch) {
      var url;
      var topic_id = '';
      var lastcomment_id = 100000;

      var listComments = this;
      listComments.comments = [];

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

      var check_topic = get_storage('topic_id');
      var check_token = get_storage('user_token');

      check_topic.then(function(topic) {

          check_token.then(function(token) {
              url = 'http://qiscus-staging.herokuapp.com/api/v1/mobile/topic/' + topic + '/comment/' + lastcomment_id + '/token/';
              comment.setUrl(url);
              var getComments = comment.getListComments(token, topic_id, lastcomment_id);

              getComments.success(function(data) {
                if (data.error) {
                  console.log('error bro!');
                  console.log(data);
                }
                else {
                  console.log('successfully retrieve');
                  // console.log(data);
                  listComments.comments = data.results.comments;
                }
              });
          });

      }, function(msg) {
          console.log(msg);
      });

      listComments.isMyComment = function(username){
        return hardcoded.getUsername() === username;
      };

        $scope.$on('commentData', function(event, data){
            listComments.comments.push(data);
        });

        $scope.$on('commentPusher', function(event, data) {
            var converted = {
                id: data.comment_id,
                message: data.real_comment,
                username_as: data.username,
                username_real: data.username_real,
                created_at: data.created_at,
                deleted: false
            };

            listComments.comments.push(converted);
            $scope.$apply();
        });
    }
]);
