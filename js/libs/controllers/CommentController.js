'use strict';

qiscus.controller('CommentController', [
    '$scope',
    '$q',
    'QEndPoints',
    'QHardCoded',
    'QServiceComment',
    'ch',

    function($scope, $q, endpoint, hardcoded, comment, ch) {

        var _this = this;
        _this.message = '';

        /*
        send chat message to server
        */
        this.sendChat = function() {

            // var topic_id = hardcoded.getTopic();

            var url = endpoint.getPostCommentUrl();
            var topic_id = '';

            var token = $scope.token_value;
            var message = _this.message;

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
            check_topic.then(function(topic) {

                /*
                send chat message to server
                */
                comment.setUrl(url);
                var chat = comment.postComment(message, token, topic);

                    /*
                    on error authorization
                    */
                    chat.success(function(data) {
                        if (data.error) {
                            alert('error authorization.');
                        }
                        var dataComment = {
                          id: data.comment_id,
                          message: data.message,
                          username_as: hardcoded.getUsername(),
                          created_at: data.sent
                        };

                        $scope.$emit('commentData', dataComment);
                    });

                    /*
                    based error status code
                    */
                    chat.error(function(data) {
                        alert('this is real error.');
                    });

                //clean up message
                _this.message = '';

            }, function(msg) {
                console.log('error post comment : ' + msg);
            });

        };

    }
]);
