
module.exports.register = function (Handlebars) {

  Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {

    if (haystack && needle) {
      return haystack.replace(needle, replacement);
    } else {
      return '';
    }
  });

  Handlebars.registerHelper('excerp', function (string) {
    var split = string.split("<!--more-->");
    return new Handlebars.SafeString(split[0]);
  });

  Handlebars.registerHelper('sameUrl', function(url1, url2, options) {
    if(!url1 || !url2) {
      return;
    }

    if(url1.indexOf('/') !== 0) url1 = "/" + url1;
    if(url2.indexOf('/') !== 0) url2 = "/" + url2;

    if(url1 === "/" && url2.indexOf("index") !== -1) return options.fn(this);

    if(url1 === url2) return options.fn(this);

    if(options.inverse) return options.inverse(this);

    return false;
  });
};
