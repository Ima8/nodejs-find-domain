var dns = require('dns');
var http = require('http');
var fs = require('fs');

function check(u) {
        var options = {
            host: 'www.pathosting.co.th',
            path: '/domain/domain_checker?domain=' + u + '&ext=in.th&id=idRxin_th',
            port: '80',
        };
        callback = function(response) {
            var str = ''
            response.on('data', function(chunk) {
                str += chunk;
            });

            response.on('end', function() {

                if (!(str.indexOf("Whois") > -1)) {
                    console.log(u + ".in.th" + " Domain is available");
                    writefile(u + ".in.th");

                } else {
                    console.log(u + ".in.th : Domain is not available ");
                }
            });
        }

        var req = http.request(options, callback);
        req.end();
    }

function main() {

    start = new Date().getTime();
    var first = "a",
        last = "z";
    var s = "";
    for (var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {

        for (var j = first.charCodeAt(0); j <= last.charCodeAt(0); j++) {
            s = eval("String.fromCharCode(" + i + ")") + eval("String.fromCharCode(" + j + ")")
            check(s);
            s = "";
        }

    }

}

function writefile(s) {
    fs.appendFileSync("output.txt", "\r\n" + s, encoding = 'utf8');
}

main();
