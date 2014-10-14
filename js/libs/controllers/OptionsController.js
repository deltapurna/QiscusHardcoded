'use strict';

qiscus.controller('OptionsController', [
	'$q',
	'$location',
	'ch', function($q, $location, ch) {

		this.roomId = '';
		this.topicId = '';
    this.codeEn = '';

		var get_storage = function(token_key) {
			var deferred = $q.defer();

			/*
			check if already has user_token
			*/
			ch.storage.sync.get(token_key, function(items) {
				if (items.room_id && items.topic_id && items.code_en) {
					deferred.resolve({room_id: items.room_id, topic_id: items.topic_id, code_en: items.code_en});
				} else {//if not logged in -> token not set yet
					deferred.reject('failed');
				}
			});

			return deferred.promise;
		};

		var _this = this;
		var check_room = get_storage(['room_id', 'topic_id', 'code_en']);
		check_room.then(function(storage) {
			_this.roomId = storage.room_id;
			_this.topicId = storage.topic_id;
      _this.codeEn = storage.code_en;
      console.log(_this);
		}, function(msg) {
			console.log(msg);
		});

		this.updateOption = function() {
	      	ch.storage.sync.set({
		        'room_id': _this.roomId,
		        'topic_id': _this.topicId,
            'code_en': _this.codeEn
			});

			$location.path('/popup');
		};
	//
	}
]);
