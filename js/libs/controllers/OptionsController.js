'use strict';

qiscus.controller('OptionsController', [
	'QServiceToken',
	'QHardCoded',
	'ch', function(qtoken, qhardcoded, ch) {

    _this = this;
		this.roomId = qhardcoded.getRoom();
		this.topicId = qhardcoded.getTopic();

		this.updateOption = function() {
      qhardcoded.setRoom(_this.roomId);
      qhardcoded.setTopic(_this.topicId);
      ch.storage.sync.set({'room_id': _this.roomId, 'topic_id': _this.topicId});
		};

	}
]);
