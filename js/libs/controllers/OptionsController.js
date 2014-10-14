'use strict';

qiscus.controller('OptionsController', [
	'QHardCoded',
	'ch', function(qhardcoded, ch) {

    var _this = this;
		this.roomId = qhardcoded.getRoom();
		this.topicId = qhardcoded.getTopic();

		this.updateOption = function() {
      qhardcoded.setRoom(_this.roomId);
      qhardcoded.setTopic(_this.topicId);
      ch.storage.sync.set({
        'room_id': _this.roomId, 
        'topic_id': _this.topicId});
      ch.storage.sync.get([ 'room_id', 'topic_id' ], function(item){
        console.log(item);
      });
		};

	}
]);
