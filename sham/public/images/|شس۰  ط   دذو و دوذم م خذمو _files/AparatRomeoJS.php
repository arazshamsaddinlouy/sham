
window.playerResourceBaseUrl = "https://www.aparat.com/assets/web/player/romeo/";
var loadjs=function(){var l=function(){},c={},f={},u={};function s(e,n){if(e){var t=u[e];if(f[e]=n,t)for(;t.length;)t[0](e,n),t.splice(0,1)}}function o(e,n){e.call&&(e={success:e}),n.length?(e.error||l)(n):(e.success||l)(e)}function h(t,r,i,c){var s,o,e=document,n=i.async,f=(i.numRetries||0)+1,u=i.before||l,a=t.replace(/^(css|img)!/,"");c=c||0,/(^css!|\.css$)/.test(t)?(s=!0,(o=e.createElement("link")).rel="stylesheet",o.href=a):/(^img!|\.(png|gif|jpg|svg)$)/.test(t)?(o=e.createElement("img")).src=a:((o=e.createElement("script")).src=t,o.async=void 0===n||n),!(o.onload=o.onerror=o.onbeforeload=function(e){var n=e.type[0];if(s&&"hideFocus"in o)try{o.sheet.cssText.length||(n="e")}catch(e){n="e"}if("e"==n&&(c+=1)<f)return h(t,r,i,c);r(t,n,e.defaultPrevented)})!==u(t,o)&&e.head.appendChild(o)}function t(e,n,t){var r,i;if(n&&n.trim&&(r=n),i=(r?t:n)||{},r){if(r in c)throw"LoadJS";c[r]=!0}!function(e,r,n){var t,i,c=(e=e.push?e:[e]).length,s=c,o=[];for(t=function(e,n,t){if("e"==n&&o.push(e),"b"==n){if(!t)return;o.push(e)}--c||r(o)},i=0;i<s;i++)h(e[i],t,n)}(e,function(e){o(i,e),s(r,e)},i)}return t.ready=function(e,n){return function(e,t){e=e.push?e:[e];var n,r,i,c=[],s=e.length,o=s;for(n=function(e,n){n.length&&c.push(e),--o||t(c)};s--;)r=e[s],(i=f[r])?n(r,i):(u[r]=u[r]||[]).push(n)}(e,function(e){o(n,e)}),t},t.done=function(e){s(e,[])},t.reset=function(){c={},f={},u={}},t.isDefined=function(e){return e in c},t}();
loadjs([

"https://www.aparat.com/assets/web/player/romeo/vendors.8bf96783a12e5f1e76b0.bundle.js?ed5340dd315fc0937964",

"https://www.aparat.com/assets/web/player/romeo/commons.72847a4561f916e962ba.bundle.js?ed5340dd315fc0937964",



], function() {
  loadjs([





"https://www.aparat.com/assets/web/player/romeo/romeo.e1d05211be8af4080f4a.bundle.js?ed5340dd315fc0937964"

  ], function() {
  var event = window.document.createEvent("Event");
  event.initEvent("RomeoLoaded", false, true);
  window.dispatchEvent(event);
  });
});