var fs = require("fs");
var handlebars = require("handlebars");

var presskitData = require("./presskit.json");
var presskitTemplate = "./presskit.hbs";
var presskitDestination = "./site/press/index.html";

createPresskit(presskitData, presskitTemplate, presskitDestination);

function createPresskit(data, template, destination) {
  fs.writeFileSync(destination, renderFromExternalTemplate(template, data));
}

function renderFromExternalTemplate(templateFile, data){
  var file = fs.readFileSync(templateFile, "utf8");
  var template = handlebars.compile(file);
  return template(data);
}

// function replaceAll(str, find, replace) {
//   return str.replace(new RegExp(find, 'g'), replace);
// }

// function getPageLinks(pages) {
//   var data = [];
//     for (var i = 0; i < pages.length; i++) {
//       data.push({
//         "fileName": pages[i].fileName,
//         "pageName": pages[i].pageName
//       });
//     }
//     return data;
// }