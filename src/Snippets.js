import warn from "./utils/warn";

// https://developers.google.com/tag-manager/quickstart

const Snippets = {
  tags: function ({
    id,
    src,
    events,
    dataLayer,
    dataLayerName,
    preview,
    auth,
  }) {
    const gtm_auth = `&gtm_auth=${auth}`;
    const gtm_preview = `&gtm_preview=${preview}`;
    const gtm_src = src;
    if (!id) warn("GTM Id is required");

    const iframe = `
      <iframe src="${gtm_src}/ns.html?id=${id}${gtm_auth}${gtm_preview}"
        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`;

    const script = `(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(
          events
        ).slice(1, -1)}});
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.onerror = function () {
          var j2 = d.createElement(s);
          j2.async = true;
          j2.src = "https://pa.br.de/stats.js?id=" + i + dl;
          f.parentNode.removeChild(j);
          f.parentNode.insertBefore(j2, f);
        };
        j.src = "${gtm_src}/gtm.js?id=" + i + dl + "${gtm_auth}${gtm_preview}";
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "${dataLayerName}", "${id}");`;

    const dataLayerVar = this.dataLayer(dataLayer, dataLayerName);

    return {
      iframe,
      script,
      dataLayerVar,
    };
  },
  dataLayer: function (dataLayer, dataLayerName) {
    return `
      window.${dataLayerName} = window.${dataLayerName} || [];
      window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`;
  },
};

module.exports = Snippets;
