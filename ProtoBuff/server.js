var ProtoBuf = require('protobufjs');
var http = require("http");
var mime = require('mime');
var gtfs2mongo = require('gtfs2mongo');

// create a protobuf decoder
var transit = ProtoBuf.protoFromFile('nyc-subway.proto').build('transit_realtime');
// your protobuf binary feed URL
var feedUrl = "http://datamine.mta.info/mta_esi.php?key=42a92f4ce13857688e611dcc66121124&feed_id=1";

// HTTP GET the binary feed
http.get(feedUrl, parse);

// process the feed
function parse(res) {
    // gather the data chunks into a list
    var data = [];
    res.on("data", function(chunk) {
        data.push(chunk);
    });
    res.on("end", function() {
        // merge the data to one buffer, since it's in a list
        data = Buffer.concat(data);
        // create a FeedMessage object by decooding the data with the protobuf object
        var msg = transit.FeedMessage.decode(data);
        // do whatever with the object
       // console.log(msg);
        for(var item in msg.entity){
            console.log(item);
            //console.log("");
        }
    });
};
