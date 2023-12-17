const http = require('http');
const fs = require('fs');
const qs = require('querystring');
//var path = require('path');
var index;

const port = 3000;
const fileWhitelist = ["models","arrowBack.png","favicon.ico","folderIcon.png","fileindex.txt","loading.webp", "script.js", "scriptf.js","style.css"]
//Whitelist only on the same level, directories that are mentioned here are fully accessible. Only fileindex and index.html are always included 

var indexFile = fs.readFile("./fileindex.txt", 'utf-8', function(errori, resindex) {
  //console.log(resindex);
  index = resindex;
  //console.log(index);
});

fs.readFile('./index.html', function(error, html) {
  if (error) throw error;
  console.log("Server started: Explorer");
  http.createServer((req, res) => {
    const { method, url } = req;
    
    var opt = {
      host: url.split("?")[0],
      param: url.split("?")[1]
    };
    //console.log(method, opt.host);

    //index.html bzw Home
    if (opt.host === "/") {
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
      //console.log("Base HTML sent");
      return;
    }
    else if (opt.host === "/fileindex") {
      res.writeHeader(200, {"Content-Type": "application/json"});
      //console.log(index);
      res.write(index);
      res.end();
      //console.log("Index sent");
      return;
    }
    else if (opt.host.substr(opt.host.length-15) === "annotations.txt") {
      //console.log("annotations requested: " + opt.host);
      try {
        if (!fs.existsSync("." + opt.host)) {
          throw new Error("Trying to access not existing annotations");
        }
        fs.readFile("." + opt.host, "utf-8", (errora, resa)=> {
          res.writeHeader(200, {"Content-Type": "application/json"});
          //console.log(resa, errora);
          res.write(resa);
          res.end();
          return;
        });
      } catch (e) {
        res.writeHeader(404);
        res.end();
      }
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
        //console.log("request " + opt.host + " in " + __dirname);
        if (fs.existsSync("." + opt.host)) {
          if (opt.host.indexOf(".") === -1) {
            throw new Error("Client trying to access a folder, would crash");
          }
          //Check if requested file is on whitelist
          var first = opt.host.split("/")[1];
          //console.log(first);
          var isOnWhitelist = false;
          for (n in fileWhitelist) {
            if (first === fileWhitelist[n]) {
              isOnWhitelist = true;
            }
          }
          if (!isOnWhitelist) {
            throw new Error("Client requested file is not on whitelist: " + first);
          }

          var resfile = fs.readFile("." + opt.host, function(errorf, resfile) {
            if (errorf) {
              //console.log(errorf);
              //throw errorf;
            }
            //console.log(ctype + " tried");
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
        console.error(e);
      }
    }


  }).listen(port)
});

function getAnnoPath(path) {
  var pathTXT = "";
  var ar = path.split("/");
  ar[ar.length-1] = "_" + ar[ar.length-1].substr(0, ar[ar.length-1].length-4);
  for (n in ar) {
    pathTXT = pathTXT + (ar[n] + "/");
  }
  pathTXT = pathTXT + "annotations.txt";
  return pathTXT;
}