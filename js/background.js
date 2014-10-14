'use strict'

var pusher = new Pusher('896d049b53f1659213a2', {
    disableStats: true
});

var notifs = 0;
var channel = pusher.subscribe('q3e15345b4cf332a0746ada7ee0752004b1qe2');
    channel.bind('postcomment', function(data) {
        notifs += 1;

        if (notifs > 0) {
            chrome.browserAction.setBadgeText({text: notifs.toString()});
        }

    });
