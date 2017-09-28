var express = require("express");
var logfmt = require("logfmt");
var os = require("os");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.static('src'));

var port = Number(process.env.VCAP_APP_PORT || process.env.PORT);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, "0.0.0.0");
