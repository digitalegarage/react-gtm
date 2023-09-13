"use strict";

var _warn = require("./utils/warn");

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://developers.google.com/tag-manager/quickstart

var Snippets = {
  tags: function tags(_ref) {
    var id = _ref.id,
        src = _ref.src,
        events = _ref.events,
        dataLayer = _ref.dataLayer,
        dataLayerName = _ref.dataLayerName,
        preview = _ref.preview,
        auth = _ref.auth;

    var gtm_auth = "&gtm_auth=" + auth;
    var gtm_preview = "&gtm_preview=" + preview;
    var gtm_src = src;
    if (!id) (0, _warn2.default)("GTM Id is required");

    var iframe = "\n      <iframe src=\"" + gtm_src + "/ns.html?id=" + id + gtm_auth + gtm_preview + "\"\n        height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\" id=\"tag-manager\"></iframe>";

    var script = "(function (w, d, s, l, i) {\n        w[l] = w[l] || [];\n        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', " + JSON.stringify(events).slice(1, -1) + "});\n        var f = d.getElementsByTagName(s)[0],\n          j = d.createElement(s),\n          dl = l != \"dataLayer\" ? \"&l=\" + l : \"\";\n        j.async = true;\n        j.onerror = function () {\n          var j2 = d.createElement(s);\n          j2.async = true;\n          j2.src = \"https://pa.br.de/stats.js?id=\" + i + dl;\n          f.parentNode.removeChild(j);\n          f.parentNode.insertBefore(j2, f);\n        };\n        j.src = \"" + gtm_src + "/gtm.js?id=\" + i + dl + \"" + gtm_auth + gtm_preview + "\";\n        f.parentNode.insertBefore(j, f);\n      })(window, document, \"script\", \"" + dataLayerName + "\", \"" + id + "\");";

    var dataLayerVar = this.dataLayer(dataLayer, dataLayerName);

    return {
      iframe: iframe,
      script: script,
      dataLayerVar: dataLayerVar
    };
  },
  dataLayer: function dataLayer(_dataLayer, dataLayerName) {
    return "\n      window." + dataLayerName + " = window." + dataLayerName + " || [];\n      window." + dataLayerName + ".push(" + JSON.stringify(_dataLayer) + ")";
  }
};

module.exports = Snippets;