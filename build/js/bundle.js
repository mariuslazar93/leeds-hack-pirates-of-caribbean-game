webpackJsonp([0],{1055:function(e,t,n){"use strict";function r(){this.load.image("skull","https://mariuslazar93.github.io/leeds-hack-pirates-of-caribbean-game/build/assets/skull.png")}function o(){this.add.image(i.default.WIDTH/2,i.default.HEIGHT/2-50,"skull");var e=["Collect all the treasures","And stay away from the pirates"];this.pressX=this.add.text(i.default.WIDTH/2-135,i.default.HEIGHT-50,"PRESS X TO START",{fontSize:"30px",fill:"#000",backgroundColor:"#fff"}),this.instructions=this.add.text(25,100,e,{fontSize:"20px",fill:"#000",backgroundColor:"#fff"}),this.blink=1e3,this.startKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)}function s(e,t){this.blink-=t,this.blink<0&&(this.pressX.alpha=1===this.pressX.alpha?0:1,this.blink=500),this.startKey.isDown&&(this.scene.stop("bootScene"),this.scene.launch("pirateScene"))}Object.defineProperty(t,"__esModule",{value:!0});var i=n(199);t.default={key:"bootScene",active:!0,preload:r,create:o,update:s}},1056:function(e,t,n){"use strict";function r(){this.load.audio("overworld",["assets/music/overworld.ogg","assets/music/overworld.mp3"]),this.load.image("sky","https://mariuslazar93.github.io/leeds-hack-pirates-of-caribbean-game/build/assets/sky.png"),this.load.image("treasure","https://mariuslazar93.github.io/leeds-hack-pirates-of-caribbean-game/build/assets/treasure.png"),this.load.image("palm","https://mariuslazar93.github.io/leeds-hack-pirates-of-caribbean-game/build/assets/palm.png"),this.load.image("heart","https://mariuslazar93.github.io/leeds-hack-pirates-of-caribbean-game/build/assets/heart.png"),this.load.image("enemy-pirate","https://mariuslazar93.github.io/leeds-hack-pirates-of-caribbean-game/build/assets/pirate.png"),this.load.spritesheet("my-pirate","https://mariuslazar93.github.io/leeds-hack-pirates-of-caribbean-game/build/assets/dude.png",{frameWidth:32,frameHeight:48})}function o(){B=this,this.add.image(N/2,U/2,"sky").setScale(2),g=this.physics.add.sprite(50,50,"my-pirate"),g.setBounce(0),g.setCollideWorldBounds(!0),this.anims.create({key:"left",frames:this.anims.generateFrameNumbers("my-pirate",{start:0,end:3}),frameRate:10,repeat:-1}),this.anims.create({key:"turn",frames:[{key:"my-pirate",frame:4}],frameRate:10,repeat:-1}),this.anims.create({key:"right",frames:this.anims.generateFrameNumbers("my-pirate",{start:5,end:8}),frameRate:10,repeat:-1}),y=this.physics.add.group();for(var e=0;e<P;e++)a();v=this.physics.add.staticGroup();for(var e=0;e<L;e++)h(v,"treasure");A=this.physics.add.staticGroup();for(var e=0;e<j;e++)h(A,"palm");w=this.physics.add.group(),u(),this.physics.add.collider(y,A),this.physics.add.collider(A,v),this.physics.add.collider(g,A),this.physics.add.collider(g,v,i,null,this),this.physics.add.collider(g,y,f,null,this),this.physics.add.collider(y,v),b=this.input.keyboard.createCursorKeys(),x=this.add.text(16,16,"Score: 0 / 10",{fontSize:"16px",fill:"#000",backgroundColor:"#fff"}),T=this.add.text(N-200,16,"Lives: ",{fontSize:"16px",fill:"#000",backgroundColor:"#fff"}),S=this.add.text(150,64,"",{fontSize:"20px",fill:"#000",backgroundColor:"#fff"}),E=this.add.text(150,140,"",{fontSize:"20px",fill:"#000",backgroundColor:"#fff"}),k=this.add.text(150,16,"",{fontSize:"22px",fill:"#fff",backgroundColor:"#f00"}),C=this.add.text(150,16,"",{fontSize:"22px",fill:"#000",backgroundColor:"#0f0"})}function s(){q||(b.left.isDown?(g.setVelocityX(-160),g.anims.play("left",!0)):b.right.isDown?(g.setVelocityX(160),g.anims.play("right",!0)):b.up.isDown?(g.setVelocityY(-160),g.anims.play("turn",!0)):b.down.isDown?(g.setVelocityY(160),g.anims.play("turn",!0)):(g.setVelocityX(0),g.anims.play("turn")))}function i(e,t){t.disableBody(!0,!0),z+=1,x.setText("Score: "+z+" / "+L),0===v.countActive(!0)&&(this.physics.pause(),e.setTint(65280),e.anims.play("turn"),q=!0)}function a(){var e=Phaser.Math.Between(50,N-50),t=Phaser.Math.Between(50,U-50),n=y.create(e,t,"enemy-pirate");n.setBounce(1,1),n.setCollideWorldBounds(!0),n.setVelocity(Phaser.Math.Between(-200,200),20)}function u(){for(var e=N-100,t=0;t<H;t++)I.push(w.create(e+30*t,20,"heart"))}function c(){var e=I.pop();e&&e.disableBody(!0,!0)}function f(){console.log("pirate collide... begin pirate fight"),this.physics.pause(),g.anims.play("turn");O.default.get("https://hackers-of-the-caribbeans.herokuapp.com/fight/begin").then(function(e){return e.data}).then(function(e){d(e.insult,e.comebacks)}).catch(console.log)}function l(){var e=this;console.log("try resuming play...");O.default.get("https://hackers-of-the-caribbeans.herokuapp.com/fight/step").then(function(e){return e.data}).then(function(t){return t.dead&&(e.gameOver=!0),t.fight_finished?(C.setText("You have won the battle! Keep playing..."),S.setText(""),E.setText(""),void B.physics.resume()):t.insult===R?void setTimeout(l,D):(p(t.fight_steps_successful[t.fight_steps_successful.length-1]),void d(t.insult,t.comebacks))}).catch(console.log)}function d(e,t){console.log("comebacks:",t),R=e;var n=["Insult:\n"];n.push(e);var r=["Comebacks options:\n"];r=[r].concat(t.map(function(e,t){return t+1+"."+e})),S.setText(n),E.setText(r),setTimeout(l,D)}function p(e){e?(C.setText("You have won this round! Let's try another one..."),k.setText("")):(c(),C.setText(""),k.setText("You have lost this one! Try again..."))}function h(e,t){var n=m(50,N-50),r=m(50,U-50),o=e.create(n,r,t);o.setCollideWorldBounds(!0),o.setVelocity(0,0),o.setBounce(0,0)}function m(e,t){var n=e+Math.random()*(t-e);return Math.round(n)}Object.defineProperty(t,"__esModule",{value:!0});var y,g,v,b,w,x,T,S,E,C,k,R,A,B,O=n(1057),_=n(199),N=_.default.WIDTH,U=_.default.HEIGHT,P=_.default.ENEMIES_COUNT,j=_.default.PALMS_COUNT,L=_.default.TREASURES_COUNT,D=(_.default.LIVES,_.default.RETRY_PLAY_TIMEOUT_MS),I=[],H=3,z=0,q=!1;t.default={key:"pirateScene",active:!1,visible:!1,preload:r,create:o,update:s}},1057:function(e,t,n){e.exports=n(1058)},1058:function(e,t,n){"use strict";function r(e){var t=new i(e),n=s(i.prototype.request,t);return o.extend(n,i.prototype,t),o.extend(n,t),n}var o=n(25),s=n(426),i=n(1060),a=n(200),u=r(a);u.Axios=i,u.create=function(e){return r(o.merge(a,e))},u.Cancel=n(430),u.CancelToken=n(1074),u.isCancel=n(429),u.all=function(e){return Promise.all(e)},u.spread=n(1075),e.exports=u,e.exports.default=u},1059:function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},1060:function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new i,response:new i}}var o=n(200),s=n(25),i=n(1069),a=n(1070);r.prototype.request=function(e){"string"==typeof e&&(e=s.merge({url:arguments[0]},arguments[1])),e=s.merge(o,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},s.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(s.merge(n||{},{method:e,url:t}))}}),s.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(s.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},1061:function(e,t,n){"use strict";var r=n(25);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},1062:function(e,t,n){"use strict";var r=n(428);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},1063:function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},1064:function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(25);e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(o.isURLSearchParams(t))s=t.toString();else{var i=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),i.push(r(t)+"="+r(e))}))}),s=i.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},1065:function(e,t,n){"use strict";var r=n(25),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}}),i):i}},1066:function(e,t,n){"use strict";var r=n(25);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},1067:function(e,t,n){"use strict";function r(){this.message="String contains an invalid character"}function o(e){for(var t,n,o=String(e),i="",a=0,u=s;o.charAt(0|a)||(u="=",a%1);i+=u.charAt(63&t>>8-a%1*8)){if((n=o.charCodeAt(a+=.75))>255)throw new r;t=t<<8|n}return i}var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.code=5,r.prototype.name="InvalidCharacterError",e.exports=o},1068:function(e,t,n){"use strict";var r=n(25);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},1069:function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(25);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},1070:function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(25),s=n(1071),i=n(429),a=n(200),u=n(1072),c=n(1073);e.exports=function(e){return r(e),e.baseURL&&!u(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||a.adapter)(e).then(function(t){return r(e),t.data=s(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(r(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},1071:function(e,t,n){"use strict";var r=n(25);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},1072:function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},1073:function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},1074:function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(430);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e;return{token:new r(function(t){e=t}),cancel:e}},e.exports=r},1075:function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},199:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={WIDTH:1200,HEIGHT:600,ENEMIES_COUNT:10,PALMS_COUNT:20,TREASURES_COUNT:10,LIVES:3,RETRY_PLAY_TIMEOUT_MS:1e3}},200:function(e,t,n){"use strict";(function(t){function r(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=n(25),s=n(1061),i={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(427):void 0!==t&&(e=n(427)),e}(),transformRequest:[function(e,t){return s(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){a.headers[e]={}}),o.forEach(["post","put","patch"],function(e){a.headers[e]=o.merge(i)}),e.exports=a}).call(t,n(149))},25:function(e,t,n){"use strict";function r(e){return"[object Array]"===E.call(e)}function o(e){return"[object ArrayBuffer]"===E.call(e)}function s(e){return"undefined"!=typeof FormData&&e instanceof FormData}function i(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function a(e){return"string"==typeof e}function u(e){return"number"==typeof e}function c(e){return void 0===e}function f(e){return null!==e&&"object"==typeof e}function l(e){return"[object Date]"===E.call(e)}function d(e){return"[object File]"===E.call(e)}function p(e){return"[object Blob]"===E.call(e)}function h(e){return"[object Function]"===E.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function v(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function b(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}function w(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=w(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)b(arguments[n],e);return t}function x(e,t,n){return b(t,function(t,r){e[r]=n&&"function"==typeof t?T(t,n):t}),e}var T=n(426),S=n(1059),E=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:S,isFormData:s,isArrayBufferView:i,isString:a,isNumber:u,isObject:f,isUndefined:c,isDate:l,isFile:d,isBlob:p,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:v,forEach:b,merge:w,extend:x,trim:g}},426:function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},427:function(e,t,n){"use strict";(function(t){var r=n(25),o=n(1062),s=n(1064),i=n(1065),a=n(1066),u=n(428),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(1067);e.exports=function(e){return new Promise(function(f,l){var d=e.data,p=e.headers;r.isFormData(d)&&delete p["Content-Type"];var h=new XMLHttpRequest,m="onreadystatechange",y=!1;if("test"===t.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||a(e.url)||(h=new window.XDomainRequest,m="onload",y=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var g=e.auth.username||"",v=e.auth.password||"";p.Authorization="Basic "+c(g+":"+v)}if(h.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[m]=function(){if(h&&(4===h.readyState||y)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in h?i(h.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?h.response:h.responseText,r={data:n,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:t,config:e,request:h};o(f,l,r),h=null}},h.onerror=function(){l(u("Network Error",e,null,h)),h=null},h.ontimeout=function(){l(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},r.isStandardBrowserEnv()){var b=n(1068),w=(e.withCredentials||a(e.url))&&e.xsrfCookieName?b.read(e.xsrfCookieName):void 0;w&&(p[e.xsrfHeaderName]=w)}if("setRequestHeader"in h&&r.forEach(p,function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),l(e),h=null)}),void 0===d&&(d=null),h.send(d)})}}).call(t,n(149))},428:function(e,t,n){"use strict";var r=n(1063);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},429:function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},430:function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},431:function(e,t,n){e.exports=n(432)},432:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(201);var r=n(199),o=n(1055),s=n(1056),i={type:Phaser.AUTO,width:r.default.WIDTH,height:r.default.HEIGHT,physics:{default:"arcade",arcade:{debug:!1}},scene:[o.default,s.default]};new Phaser.Game(i)}},[431]);