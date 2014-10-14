'use strict';

/*
spesific services for topic related tasks
*/
services.service('QServiceTopic',['QHttp', function(qhttp) {

    var url;

    /*
    set topic url
    */
    this.setUrl = function(login_url) {
        url = login_url;
    };

    /*
    get topic url
    */
    this.getUrl = function() {
        return url;
    };

    /*
    do topic request
    */
    this.getTopics = function(token, room_id) {

        var data = "token=" + token + "&room_id=" + room_id;

        /*
        setup http properties:
        > urlendpoint
        > data to send
        */
        qhttp.setUrl(url);
        qhttp.setData(data);

        var connection = qhttp.connect('POST');
        return connection;
    };

}]);
