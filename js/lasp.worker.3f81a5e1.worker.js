(function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/audio-input/",e(e.s="1877")})({"0117":function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},"0288":function(t,n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(r){"object"===typeof window&&(e=window)}t.exports=e},"13d0":function(t,n,e){var r=e("35a9"),i=e("30cf"),o=e("ef69");t.exports=r?function(t,n,e){return i.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},1877:function(t,n,e){"use strict";e.r(n);e("3b62");function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function i(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}var a=function(){function t(n,e,i,o){r(this,t),this.x=0,this.y=0,this.z=0,this.w=0,this.x=n,this.y=e,this.z=i,this.w=o}return o(t,[{key:"multiply",value:function(n){return new t(this.x*n,this.y*n,this.z*n,this.w*n)}},{key:"hadamard",value:function(n){return new t(this.x*n.x,this.y*n.y,this.z*n.z,this.w*n.w)}},{key:"add",value:function(n){return new t(this.x+n.x,this.y+n.y,this.z+n.z,this.w+n.w)}},{key:"minus",value:function(n){return new t(this.x-n.x,this.y-n.y,this.z-n.z,this.w-n.w)}},{key:"equal",value:function(t){this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w}}]),t}(),u=function(){function t(){r(this,t),this._a0=new a(0,0,0,0),this._a1=new a(0,0,0,0),this._a2=new a(0,0,0,0),this._z1=new a(0,0,0,0),this._z2=new a(0,0,0,0),this._b1=0,this._b2=0,this._xmask=new a(0,1,1,1)}return o(t,[{key:"setParameter",value:function(t,n){var e=Math.tan(Math.PI*t),r=1/(1+e/n+e*e);this._a0.x=1,this._a1.x=0,this._a2.x=0,this._a0.y=e*e*r,this._a1.y=2*this._a0.y,this._a2.y=this._a0.y,this._a0.z=e/n*r,this._a1.z=0,this._a2.z=-this._a0.z,this._a0.w=r,this._a1.w=-2*this._a0.w,this._a2.w=this._a0.w,this._b1=2*(e*e-1)*r,this._b2=(1-e/n+e*e)*r}},{key:"feedSample",value:function(t){var n=this._a0.multiply(t).add(this._z1.hadamard(this._xmask));return this._z1=this._a1.multiply(t).add(this._z2).minus(n.multiply(this._b1)),this._z2=this._a2.multiply(t).minus(n.multiply(this._b2)),n}}]),t}(),f=function(){function t(n,e,i){r(this,t),this.filters=[],this.channels=0,this.sampleRatae=0,this.filterFc=0,this.filterQ=.15;for(var o=0;o<n;o++)this.filters.push(new u);this.channels=n,this.sampleRatae=e,this.filterFc=960/this.sampleRatae,this.onProcessResult=i}return o(t,[{key:"processAudioData",value:function(t){if(0!=t.length){var n=new a(0,0,0,0),e=this.filters[0];e.setParameter(this.filterFc,this.filterQ);for(var r=0;r<t.length;r++){var i=e.feedSample(t[r]);n=n.add(i.hadamard(i))}var o=1/t.length,u=n.multiply(o),f=new a(Math.sqrt(u.x),Math.sqrt(u.y),Math.sqrt(u.z),Math.sqrt(u.w));this.onProcessResult({x:this.normalize(f.x),y:this.normalize(f.y),z:this.normalize(f.z),w:this.normalize(f.w)})}}},{key:"normalize",value:function(t){return this.clamp01((this.dbps(t)+6)/12+1)}},{key:"dbps",value:function(t){return 20*Math.log10(t/.7071+15849e-17)}},{key:"clamp01",value:function(t){return t<0?0:t>1?1:t}}]),t}(),c=self,s=new f(1,44100,(function(t){c.postMessage({action:"update",payload:{x:t.x,y:t.y,z:t.z,w:t.w}})}));c.onmessage=function(t){var n=t.data,e=n.action,r=n.payload;switch(e){case"audio-buffer":s.processAudioData(r);break}},c.onerror=function(t){console.error("Error in worker",t.message)};n["default"]=null},"18ff":function(t,n,e){var r=e("efd0"),i=e("13d0");t.exports=function(t,n){try{i(r,t,n)}catch(e){r[t]=n}return n}},"1b38":function(t,n,e){var r=e("aad0"),i=/#|\.prototype\./,o=function(t,n){var e=u[a(t)];return e==c||e!=f&&("function"==typeof n?r(n):!!n)},a=o.normalize=function(t){return String(t).replace(i,".").toLowerCase()},u=o.data={},f=o.NATIVE="N",c=o.POLYFILL="P";t.exports=o},"1bbe":function(t,n,e){var r=e("28a9"),i=e("7a85"),o=r("keys");t.exports=function(t){return o[t]||(o[t]=i(t))}},2092:function(t,n,e){var r=e("0117"),i=e("3274"),o=e("af7d").indexOf,a=e("be34");t.exports=function(t,n){var e,u=i(t),f=0,c=[];for(e in u)!r(a,e)&&r(u,e)&&c.push(e);while(n.length>f)r(u,e=n[f++])&&(~o(c,e)||c.push(e));return c}},"21e0":function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on "+t);return t}},"260a":function(t,n,e){var r=e("efd0"),i=e("18ff"),o="__core-js_shared__",a=r[o]||i(o,{});t.exports=a},"28a9":function(t,n,e){var r=e("7fe9"),i=e("260a");(t.exports=function(t,n){return i[t]||(i[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.8.0",mode:r?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},"2a94":function(t,n,e){var r=e("efd0"),i=e("c2b3"),o=r.WeakMap;t.exports="function"===typeof o&&/native code/.test(i(o))},"2fcd":function(t,n,e){var r=e("0117"),i=e("996e"),o=e("977b"),a=e("30cf");t.exports=function(t,n){for(var e=i(n),u=a.f,f=o.f,c=0;c<e.length;c++){var s=e[c];r(t,s)||u(t,s,f(n,s))}}},"30cf":function(t,n,e){var r=e("35a9"),i=e("cb62"),o=e("b973"),a=e("bab3"),u=Object.defineProperty;n.f=r?u:function(t,n,e){if(o(t),n=a(n,!0),o(e),i)try{return u(t,n,e)}catch(r){}if("get"in e||"set"in e)throw TypeError("Accessors not supported");return"value"in e&&(t[n]=e.value),t}},3274:function(t,n,e){var r=e("4bfa"),i=e("21e0");t.exports=function(t){return r(i(t))}},"35a9":function(t,n,e){var r=e("aad0");t.exports=!r((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},"3b29":function(t,n){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},"3b62":function(t,n,e){var r=e("485e"),i=Math.log,o=Math.LOG10E;r({target:"Math",stat:!0},{log10:function(t){return i(t)*o}})},"485e":function(t,n,e){var r=e("efd0"),i=e("977b").f,o=e("13d0"),a=e("d496"),u=e("18ff"),f=e("2fcd"),c=e("1b38");t.exports=function(t,n){var e,s,l,h,p,b,y=t.target,d=t.global,v=t.stat;if(s=d?r:v?r[y]||u(y,{}):(r[y]||{}).prototype,s)for(l in n){if(p=n[l],t.noTargetGet?(b=i(s,l),h=b&&b.value):h=s[l],e=c(d?l:y+(v?".":"#")+l,t.forced),!e&&void 0!==h){if(typeof p===typeof h)continue;f(p,h)}(t.sham||h&&h.sham)&&o(p,"sham",!0),a(s,l,p,t)}}},4890:function(t,n,e){var r=e("efd0"),i=e("3b29"),o=r.document,a=i(o)&&i(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},"4a35":function(t,n,e){var r=e("b804"),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},"4b56":function(t,n,e){var r=e("f5b6"),i=e("efd0"),o=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,n){return arguments.length<2?o(r[t])||o(i[t]):r[t]&&r[t][n]||i[t]&&i[t][n]}},"4bfa":function(t,n,e){var r=e("aad0"),i=e("c7d8"),o="".split;t.exports=r((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==i(t)?o.call(t,""):Object(t)}:Object},"6b64":function(t,n,e){var r=e("2092"),i=e("f74b"),o=i.concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},"7a85":function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++e+r).toString(36)}},"7fe9":function(t,n){t.exports=!1},9349:function(t,n){n.f=Object.getOwnPropertySymbols},"977b":function(t,n,e){var r=e("35a9"),i=e("bbfb"),o=e("ef69"),a=e("3274"),u=e("bab3"),f=e("0117"),c=e("cb62"),s=Object.getOwnPropertyDescriptor;n.f=r?s:function(t,n){if(t=a(t),n=u(n,!0),c)try{return s(t,n)}catch(e){}if(f(t,n))return o(!i.f.call(t,n),t[n])}},"996e":function(t,n,e){var r=e("4b56"),i=e("6b64"),o=e("9349"),a=e("b973");t.exports=r("Reflect","ownKeys")||function(t){var n=i.f(a(t)),e=o.f;return e?n.concat(e(t)):n}},aad0:function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},af7d:function(t,n,e){var r=e("3274"),i=e("4a35"),o=e("fd0b"),a=function(t){return function(n,e,a){var u,f=r(n),c=i(f.length),s=o(a,c);if(t&&e!=e){while(c>s)if(u=f[s++],u!=u)return!0}else for(;c>s;s++)if((t||s in f)&&f[s]===e)return t||s||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},b804:function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},b973:function(t,n,e){var r=e("3b29");t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},bab3:function(t,n,e){var r=e("3b29");t.exports=function(t,n){if(!r(t))return t;var e,i;if(n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;if("function"==typeof(e=t.valueOf)&&!r(i=e.call(t)))return i;if(!n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},bbfb:function(t,n,e){"use strict";var r={}.propertyIsEnumerable,i=Object.getOwnPropertyDescriptor,o=i&&!r.call({1:2},1);n.f=o?function(t){var n=i(this,t);return!!n&&n.enumerable}:r},be34:function(t,n){t.exports={}},c2b3:function(t,n,e){var r=e("260a"),i=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return i.call(t)}),t.exports=r.inspectSource},c7d8:function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},cb62:function(t,n,e){var r=e("35a9"),i=e("aad0"),o=e("4890");t.exports=!r&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},d496:function(t,n,e){var r=e("efd0"),i=e("13d0"),o=e("0117"),a=e("18ff"),u=e("c2b3"),f=e("f806"),c=f.get,s=f.enforce,l=String(String).split("String");(t.exports=function(t,n,e,u){var f,c=!!u&&!!u.unsafe,h=!!u&&!!u.enumerable,p=!!u&&!!u.noTargetGet;"function"==typeof e&&("string"!=typeof n||o(e,"name")||i(e,"name",n),f=s(e),f.source||(f.source=l.join("string"==typeof n?n:""))),t!==r?(c?!p&&t[n]&&(h=!0):delete t[n],h?t[n]=e:i(t,n,e)):h?t[n]=e:a(n,e)})(Function.prototype,"toString",(function(){return"function"==typeof this&&c(this).source||u(this)}))},ef69:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},efd0:function(t,n,e){(function(n){var e=function(t){return t&&t.Math==Math&&t};t.exports=e("object"==typeof globalThis&&globalThis)||e("object"==typeof window&&window)||e("object"==typeof self&&self)||e("object"==typeof n&&n)||function(){return this}()||Function("return this")()}).call(this,e("0288"))},f5b6:function(t,n,e){var r=e("efd0");t.exports=r},f74b:function(t,n){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},f806:function(t,n,e){var r,i,o,a=e("2a94"),u=e("efd0"),f=e("3b29"),c=e("13d0"),s=e("0117"),l=e("260a"),h=e("1bbe"),p=e("be34"),b=u.WeakMap,y=function(t){return o(t)?i(t):r(t,{})},d=function(t){return function(n){var e;if(!f(n)||(e=i(n)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return e}};if(a){var v=l.state||(l.state=new b),x=v.get,w=v.has,m=v.set;r=function(t,n){return n.facade=t,m.call(v,t,n),n},i=function(t){return x.call(v,t)||{}},o=function(t){return w.call(v,t)}}else{var g=h("state");p[g]=!0,r=function(t,n){return n.facade=t,c(t,g,n),n},i=function(t){return s(t,g)?t[g]:{}},o=function(t){return s(t,g)}}t.exports={set:r,get:i,has:o,enforce:y,getterFor:d}},fd0b:function(t,n,e){var r=e("b804"),i=Math.max,o=Math.min;t.exports=function(t,n){var e=r(t);return e<0?i(e+n,0):o(e,n)}}});