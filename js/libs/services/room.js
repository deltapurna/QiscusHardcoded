'use strict';

/*
register service comment: to post comment (chat message) to server
*/
services.service('QServiceRoom', ['QHttp', function(qhttp) {

    var url;

    /*
    setup url api endpoint
    */
    this.setUrl = function(api_url) {
        url = api_url
    };

    this.getUrl = function() {
        return url;
    };

    /*
     * get list of rooms
     */
    this.getListComments = function(token) {
        qhttp.setUrl(url+"?token="+token);

        var connection = qhttp.connect('GET');
        return connection;
    }
}]);
