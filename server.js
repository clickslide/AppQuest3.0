var GtfsRealtimeBindings = require('gtfs-realtime-bindings'),
    request = require('request'),
    fs = require('fs'),
    mime = require('mime'),
    gtfs2mongo = require('gtfs2mongo'),
    http = require('http'),
    options = {
        host: "datamine.mta.info",
        path: '/mta_esi.php?key=42a92f4ce13857688e611dcc66121124&feed_id=1'
    },
    gtfsData = '',
    util = require('util'),
    Db = require('mongodb').Db;

// create a protobuf decoder
//var transit = ProtoBuf.protoFromFile('ProtoBuff/nyc-subway.proto').build('transit_realtime');
// your protobuf binary feed URL
var feedUrl = "http://datamine.mta.info/mta_esi.php?key=42a92f4ce13857688e611dcc66121124&feed_id=1";

var requestSettings = {
    method: 'GET',
    url: feedUrl,
    encoding: null
};

function updateRealtimeData() {
    request(requestSettings, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
            feed.entity.forEach(function (entity) {
                if (entity.trip_update) {
                    if(entity.trip_update.stop_time_update){
                        var stop_update = entity.trip_update.stop_time_update;
                        if(util.isArray(stop_update)){
                            stop_update.forEach(function (item){
                                console.log('');
                                console.log('');
                                console.log('>>>>>> '+item.stop_id);
                                console.log('>> Departure:');
                                console.log(item.departure);
                                if(item.departure && item.departure.delay){
                                    console.log("++++ DELAY ++++");
                                }
                                if(item.departure && item.departure.time){
                                    var day = new Date((parseInt(item.departure.time) * 1000));
                                    console.log(">>> " +day );
                                }
                                console.log('>> Arrival:');
                                console.log(item.arrival);
                                if(item.arrival && item.arrival.time){
                                    var day = new Date((parseInt(item.arrival.time) * 1000));
                                    console.log(">>> " +day );
                                }
                                if(item.arrival && item.arrival.delay){
                                    console.log("++++ DELAY ++++");
                                }
                                console.log('<<<<<<');
                            });
                        }
                    }
                }
            });
        }
    });
}
updateRealtimeData();
