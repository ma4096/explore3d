const http = require('http');
var fs = require('fs');
//var path = require('path');
var index;

const port = 3000;

var indexFile = fs.readFile("./fileindex.txt", 'utf-8', function(errori, resindex) {
  //console.log(resindex);
  index = resindex;
  //console.log(index);
});

fs.readFile('./index.html', function(error, html) {
  console.log("User connected");
  if (error) throw error;
  http.createServer((req, res) => {
    const { method, url } = req;
    
    var opt = {
      host: url.split("?")[0],
      param: url.split("?")[1]
    };
    console.log(method, opt.host);
    

    //index.html bzw Home
    if (opt.host === "/") {
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
      console.log("Base HTML sent");
      return;
    }
    if (opt.host == "/fileindex") {
      res.writeHeader(200, {"Content-Type": "application/json"});
      //console.log(index);
      res.write(index);
      res.end();
      console.log("Index sent");
      return;
    }

    //Alle anderen Files
    else {
      var fileEnding = url.split(".")[url.split(".").length -1];
      var ctype = ""; //path = ".";
      switch (fileEnding) {
        case 'js':
          ctype = "text/javascript";
          break;
        case 'css':
          ctype = "text/css";
          break;
        case 'jpg':
          //path = "./models";
          ctype = "image/jpg";
          break;
        //case 'glb':
        //case undefined:
          //path = "./models";
          //opt.host = opt.host.concat(".glb");
        default:
          ctype = "text/html";
      }
      try {
        console.log("request " + opt.host + " in " + __dirname);
        if (fs.existsSync("." + opt.host)) {
          console.log("File found");
          var resfile = fs.readFile("." + opt.host, function(errorf, resfile) {
            if (errorf) {
              console.log(errorf);
              //throw errorf;
            }
            console.log(ctype + " tried");
            res.writeHeader(200, {"Content-Type": ctype});
            res.write(resfile);
            res.end();

            
          });
        } else {
          console.log("File not found");
          res.writeHeader(404);
          res.end();
        }
      } catch (e) {
        res.writeHeader(404);
        res.end();
        console.log("Error catched by try-catch:")
        console.error(e);
      }
    }


  }).listen(port)
});
