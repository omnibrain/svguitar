/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var constants = {
    /**
     * The viewbox width of the svg
     */
    width: 400,
};

function t(t,e,s){if(t&&t.length){const[n,a]=e,o=Math.PI/180*s,h=Math.cos(o),r=Math.sin(o);t.forEach((t=>{const[e,s]=t;t[0]=(e-n)*h-(s-a)*r+n,t[1]=(e-n)*r+(s-a)*h+a;}));}}function e(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}function s(e,s){const n=s.hachureAngle+90;let a=s.hachureGap;a<0&&(a=4*s.strokeWidth),a=Math.max(a,.1);const o=[0,0];if(n)for(const s of e)t(s,o,n);const h=function(t,e){const s=[];for(const e of t){const t=[...e];t[0].join(",")!==t[t.length-1].join(",")&&t.push([t[0][0],t[0][1]]),t.length>2&&s.push(t);}const n=[];e=Math.max(e,.1);const a=[];for(const t of s)for(let e=0;e<t.length-1;e++){const s=t[e],n=t[e+1];if(s[1]!==n[1]){const t=Math.min(s[1],n[1]);a.push({ymin:t,ymax:Math.max(s[1],n[1]),x:t===s[1]?s[0]:n[0],islope:(n[0]-s[0])/(n[1]-s[1])});}}if(a.sort(((t,e)=>t.ymin<e.ymin?-1:t.ymin>e.ymin?1:t.x<e.x?-1:t.x>e.x?1:t.ymax===e.ymax?0:(t.ymax-e.ymax)/Math.abs(t.ymax-e.ymax))),!a.length)return n;let o=[],h=a[0].ymin;for(;o.length||a.length;){if(a.length){let t=-1;for(let e=0;e<a.length&&!(a[e].ymin>h);e++)t=e;a.splice(0,t+1).forEach((t=>{o.push({s:h,edge:t});}));}if(o=o.filter((t=>!(t.edge.ymax<=h))),o.sort(((t,e)=>t.edge.x===e.edge.x?0:(t.edge.x-e.edge.x)/Math.abs(t.edge.x-e.edge.x))),o.length>1)for(let t=0;t<o.length;t+=2){const e=t+1;if(e>=o.length)break;const s=o[t].edge,a=o[e].edge;n.push([[Math.round(s.x),h],[Math.round(a.x),h]]);}h+=e,o.forEach((t=>{t.edge.x=t.edge.x+e*t.edge.islope;}));}return n}(e,a);if(n){for(const s of e)t(s,o,-n);!function(e,s,n){const a=[];e.forEach((t=>a.push(...t))),t(a,s,n);}(h,o,-n);}return h}class n{constructor(t){this.helper=t;}fillPolygons(t,e){return this._fillPolygons(t,e)}_fillPolygons(t,e){const n=s(t,e);return {type:"fillSketch",ops:this.renderLines(n,e)}}renderLines(t,e){const s=[];for(const n of t)s.push(...this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],e));return s}}class a extends n{fillPolygons(t,n){let a=n.hachureGap;a<0&&(a=4*n.strokeWidth),a=Math.max(a,.1);const o=s(t,Object.assign({},n,{hachureGap:a})),h=Math.PI/180*n.hachureAngle,r=[],i=.5*a*Math.cos(h),c=.5*a*Math.sin(h);for(const[t,s]of o)e([t,s])&&r.push([[t[0]-i,t[1]+c],[...s]],[[t[0]+i,t[1]-c],[...s]]);return {type:"fillSketch",ops:this.renderLines(r,n)}}}class o extends n{fillPolygons(t,e){const s=this._fillPolygons(t,e),n=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),a=this._fillPolygons(t,n);return s.ops=s.ops.concat(a.ops),s}}class h{constructor(t){this.helper=t;}fillPolygons(t,e){const n=s(t,e=Object.assign({},e,{hachureAngle:0}));return this.dotsOnLines(n,e)}dotsOnLines(t,s){const n=[];let a=s.hachureGap;a<0&&(a=4*s.strokeWidth),a=Math.max(a,.1);let o=s.fillWeight;o<0&&(o=s.strokeWidth/2);const h=a/4;for(const r of t){const t=e(r),i=t/a,c=Math.ceil(i)-1,l=t-c*a,u=(r[0][0]+r[1][0])/2-a/4,p=Math.min(r[0][1],r[1][1]);for(let t=0;t<c;t++){const e=p+l+t*a,r=u-h+2*Math.random()*h,i=e-h+2*Math.random()*h,c=this.helper.ellipse(r,i,o,o,s);n.push(...c.ops);}}return {type:"fillSketch",ops:n}}}class r{constructor(t){this.helper=t;}fillPolygons(t,e){const n=s(t,e);return {type:"fillSketch",ops:this.dashedLine(n,e)}}dashedLine(t,s){const n=s.dashOffset<0?s.hachureGap<0?4*s.strokeWidth:s.hachureGap:s.dashOffset,a=s.dashGap<0?s.hachureGap<0?4*s.strokeWidth:s.hachureGap:s.dashGap,o=[];return t.forEach((t=>{const h=e(t),r=Math.floor(h/(n+a)),i=(h+a-r*(n+a))/2;let c=t[0],l=t[1];c[0]>l[0]&&(c=t[1],l=t[0]);const u=Math.atan((l[1]-c[1])/(l[0]-c[0]));for(let t=0;t<r;t++){const e=t*(n+a),h=e+n,r=[c[0]+e*Math.cos(u)+i*Math.cos(u),c[1]+e*Math.sin(u)+i*Math.sin(u)],l=[c[0]+h*Math.cos(u)+i*Math.cos(u),c[1]+h*Math.sin(u)+i*Math.sin(u)];o.push(...this.helper.doubleLineOps(r[0],r[1],l[0],l[1],s));}})),o}}class i$1{constructor(t){this.helper=t;}fillPolygons(t,e){const n=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,a=e.zigzagOffset<0?n:e.zigzagOffset,o=s(t,e=Object.assign({},e,{hachureGap:n+a}));return {type:"fillSketch",ops:this.zigzagLines(o,a,e)}}zigzagLines(t,s,n){const a=[];return t.forEach((t=>{const o=e(t),h=Math.round(o/(2*s));let r=t[0],i=t[1];r[0]>i[0]&&(r=t[1],i=t[0]);const c=Math.atan((i[1]-r[1])/(i[0]-r[0]));for(let t=0;t<h;t++){const e=2*t*s,o=2*(t+1)*s,h=Math.sqrt(2*Math.pow(s,2)),i=[r[0]+e*Math.cos(c),r[1]+e*Math.sin(c)],l=[r[0]+o*Math.cos(c),r[1]+o*Math.sin(c)],u=[i[0]+h*Math.cos(c+Math.PI/4),i[1]+h*Math.sin(c+Math.PI/4)];a.push(...this.helper.doubleLineOps(i[0],i[1],u[0],u[1],n),...this.helper.doubleLineOps(u[0],u[1],l[0],l[1],n));}})),a}}const c={};class l{constructor(t){this.seed=t;}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}const u={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:2,t:2,V:1,v:1,Z:0,z:0};function p(t,e){return t.type===e}function f(t){const e=[],s=function(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:0,text:RegExp.$1},t=t.substr(RegExp.$1.length);else {if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return [];e[e.length]={type:1,text:`${parseFloat(RegExp.$1)}`},t=t.substr(RegExp.$1.length);}return e[e.length]={type:2,text:""},e}(t);let n="BOD",a=0,o=s[a];for(;!p(o,2);){let h=0;const r=[];if("BOD"===n){if("M"!==o.text&&"m"!==o.text)return f("M0,0"+t);a++,h=u[o.text],n=o.text;}else p(o,1)?h=u[n]:(a++,h=u[o.text],n=o.text);if(!(a+h<s.length))throw new Error("Path data ended short");for(let t=a;t<a+h;t++){const e=s[t];if(!p(e,1))throw new Error("Param not a number: "+n+","+e.text);r[r.length]=+e.text;}if("number"!=typeof u[n])throw new Error("Bad segment: "+n);{const t={key:n,data:r};e.push(t),a+=h,o=s[a],"M"===n&&(n="L"),"m"===n&&(n="l");}}return e}function d(t){let e=0,s=0,n=0,a=0;const o=[];for(const{key:h,data:r}of t)switch(h){case"M":o.push({key:"M",data:[...r]}),[e,s]=r,[n,a]=r;break;case"m":e+=r[0],s+=r[1],o.push({key:"M",data:[e,s]}),n=e,a=s;break;case"L":o.push({key:"L",data:[...r]}),[e,s]=r;break;case"l":e+=r[0],s+=r[1],o.push({key:"L",data:[e,s]});break;case"C":o.push({key:"C",data:[...r]}),e=r[4],s=r[5];break;case"c":{const t=r.map(((t,n)=>n%2?t+s:t+e));o.push({key:"C",data:t}),e=t[4],s=t[5];break}case"Q":o.push({key:"Q",data:[...r]}),e=r[2],s=r[3];break;case"q":{const t=r.map(((t,n)=>n%2?t+s:t+e));o.push({key:"Q",data:t}),e=t[2],s=t[3];break}case"A":o.push({key:"A",data:[...r]}),e=r[5],s=r[6];break;case"a":e+=r[5],s+=r[6],o.push({key:"A",data:[r[0],r[1],r[2],r[3],r[4],e,s]});break;case"H":o.push({key:"H",data:[...r]}),e=r[0];break;case"h":e+=r[0],o.push({key:"H",data:[e]});break;case"V":o.push({key:"V",data:[...r]}),s=r[0];break;case"v":s+=r[0],o.push({key:"V",data:[s]});break;case"S":o.push({key:"S",data:[...r]}),e=r[2],s=r[3];break;case"s":{const t=r.map(((t,n)=>n%2?t+s:t+e));o.push({key:"S",data:t}),e=t[2],s=t[3];break}case"T":o.push({key:"T",data:[...r]}),e=r[0],s=r[1];break;case"t":e+=r[0],s+=r[1],o.push({key:"T",data:[e,s]});break;case"Z":case"z":o.push({key:"Z",data:[]}),e=n,s=a;}return o}function g(t){const e=[];let s="",n=0,a=0,o=0,h=0,r=0,i=0;for(const{key:c,data:l}of t){switch(c){case"M":e.push({key:"M",data:[...l]}),[n,a]=l,[o,h]=l;break;case"C":e.push({key:"C",data:[...l]}),n=l[4],a=l[5],r=l[2],i=l[3];break;case"L":e.push({key:"L",data:[...l]}),[n,a]=l;break;case"H":n=l[0],e.push({key:"L",data:[n,a]});break;case"V":a=l[0],e.push({key:"L",data:[n,a]});break;case"S":{let t=0,o=0;"C"===s||"S"===s?(t=n+(n-r),o=a+(a-i)):(t=n,o=a),e.push({key:"C",data:[t,o,...l]}),r=l[0],i=l[1],n=l[2],a=l[3];break}case"T":{const[t,o]=l;let h=0,c=0;"Q"===s||"T"===s?(h=n+(n-r),c=a+(a-i)):(h=n,c=a);const u=n+2*(h-n)/3,p=a+2*(c-a)/3,f=t+2*(h-t)/3,d=o+2*(c-o)/3;e.push({key:"C",data:[u,p,f,d,t,o]}),r=h,i=c,n=t,a=o;break}case"Q":{const[t,s,o,h]=l,c=n+2*(t-n)/3,u=a+2*(s-a)/3,p=o+2*(t-o)/3,f=h+2*(s-h)/3;e.push({key:"C",data:[c,u,p,f,o,h]}),r=t,i=s,n=o,a=h;break}case"A":{const t=Math.abs(l[0]),s=Math.abs(l[1]),o=l[2],h=l[3],r=l[4],i=l[5],c=l[6];if(0===t||0===s)e.push({key:"C",data:[n,a,i,c,i,c]}),n=i,a=c;else if(n!==i||a!==c){k(n,a,i,c,t,s,o,h,r).forEach((function(t){e.push({key:"C",data:t});})),n=i,a=c;}break}case"Z":e.push({key:"Z",data:[]}),n=o,a=h;}s=c;}return e}function M(t,e,s){return [t*Math.cos(s)-e*Math.sin(s),t*Math.sin(s)+e*Math.cos(s)]}function k(t,e,s,n,a,o,h,r,i,c){const l=(u=h,Math.PI*u/180);var u;let p=[],f=0,d=0,g=0,b=0;if(c)[f,d,g,b]=c;else {[t,e]=M(t,e,-l),[s,n]=M(s,n,-l);const h=(t-s)/2,c=(e-n)/2;let u=h*h/(a*a)+c*c/(o*o);u>1&&(u=Math.sqrt(u),a*=u,o*=u);const p=a*a,k=o*o,y=p*k-p*c*c-k*h*h,m=p*c*c+k*h*h,w=(r===i?-1:1)*Math.sqrt(Math.abs(y/m));g=w*a*c/o+(t+s)/2,b=w*-o*h/a+(e+n)/2,f=Math.asin(parseFloat(((e-b)/o).toFixed(9))),d=Math.asin(parseFloat(((n-b)/o).toFixed(9))),t<g&&(f=Math.PI-f),s<g&&(d=Math.PI-d),f<0&&(f=2*Math.PI+f),d<0&&(d=2*Math.PI+d),i&&f>d&&(f-=2*Math.PI),!i&&d>f&&(d-=2*Math.PI);}let y=d-f;if(Math.abs(y)>120*Math.PI/180){const t=d,e=s,r=n;d=i&&d>f?f+120*Math.PI/180*1:f+120*Math.PI/180*-1,p=k(s=g+a*Math.cos(d),n=b+o*Math.sin(d),e,r,a,o,h,0,i,[d,t,g,b]);}y=d-f;const m=Math.cos(f),w=Math.sin(f),x=Math.cos(d),P=Math.sin(d),v=Math.tan(y/4),O=4/3*a*v,S=4/3*o*v,L=[t,e],T=[t+O*w,e-S*m],D=[s+O*P,n-S*x],A=[s,n];if(T[0]=2*L[0]-T[0],T[1]=2*L[1]-T[1],c)return [T,D,A].concat(p);{p=[T,D,A].concat(p);const t=[];for(let e=0;e<p.length;e+=3){const s=M(p[e][0],p[e][1],l),n=M(p[e+1][0],p[e+1][1],l),a=M(p[e+2][0],p[e+2][1],l);t.push([s[0],s[1],n[0],n[1],a[0],a[1]]);}return t}}const b={randOffset:function(t,e){return A$1(t,e)},randOffsetWithRange:function(t,e,s){return D(t,e,s)},ellipse:function(t,e,s,n,a){const o=P(s,n,a);return v(t,e,a,o).opset},doubleLineOps:function(t,e,s,n,a){return I(t,e,s,n,a,!0)}};function y$2(t,e,s,n,a){return {type:"path",ops:I(t,e,s,n,a)}}function m(t,e,s){const n=(t||[]).length;if(n>2){const a=[];for(let e=0;e<n-1;e++)a.push(...I(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&a.push(...I(t[n-1][0],t[n-1][1],t[0][0],t[0][1],s)),{type:"path",ops:a}}return 2===n?y$2(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function w(t,e,s,n,a){return function(t,e){return m(t,!0,e)}([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],a)}function x$2(t,e){let s=_(t,1*(1+.2*e.roughness),e);if(!e.disableMultiStroke){const n=_(t,1.5*(1+.22*e.roughness),function(t){const e=Object.assign({},t);e.randomizer=void 0,t.seed&&(e.seed=t.seed+1);return e}(e));s=s.concat(n);}return {type:"path",ops:s}}function P(t,e,s){const n=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),a=Math.ceil(Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*n)),o=2*Math.PI/a;let h=Math.abs(t/2),r=Math.abs(e/2);const i=1-s.curveFitting;return h+=A$1(h*i,s),r+=A$1(r*i,s),{increment:o,rx:h,ry:r}}function v(t,e,s,n){const[a,o]=z(n.increment,t,e,n.rx,n.ry,1,n.increment*D(.1,D(.4,1,s),s),s);let h=W(a,null,s);if(!s.disableMultiStroke&&0!==s.roughness){const[a]=z(n.increment,t,e,n.rx,n.ry,1.5,0,s),o=W(a,null,s);h=h.concat(o);}return {estimatedPoints:o,opset:{type:"path",ops:h}}}function O(t,e,s,n,a,o,h,r,i){const c=t,l=e;let u=Math.abs(s/2),p=Math.abs(n/2);u+=A$1(.01*u,i),p+=A$1(.01*p,i);let f=a,d=o;for(;f<0;)f+=2*Math.PI,d+=2*Math.PI;d-f>2*Math.PI&&(f=0,d=2*Math.PI);const g=2*Math.PI/i.curveStepCount,M=Math.min(g/2,(d-f)/2),k=E(M,c,l,u,p,f,d,1,i);if(!i.disableMultiStroke){const t=E(M,c,l,u,p,f,d,1.5,i);k.push(...t);}return h&&(r?k.push(...I(c,l,c+u*Math.cos(f),l+p*Math.sin(f),i),...I(c,l,c+u*Math.cos(d),l+p*Math.sin(d),i)):k.push({op:"lineTo",data:[c,l]},{op:"lineTo",data:[c+u*Math.cos(f),l+p*Math.sin(f)]})),{type:"path",ops:k}}function S(t,e){const s=[];for(const n of t)if(n.length){const t=e.maxRandomnessOffset||0,a=n.length;if(a>2){s.push({op:"move",data:[n[0][0]+A$1(t,e),n[0][1]+A$1(t,e)]});for(let o=1;o<a;o++)s.push({op:"lineTo",data:[n[o][0]+A$1(t,e),n[o][1]+A$1(t,e)]});}}return {type:"fillPath",ops:s}}function L(t,e){return function(t,e){let s=t.fillStyle||"hachure";if(!c[s])switch(s){case"zigzag":c[s]||(c[s]=new a(e));break;case"cross-hatch":c[s]||(c[s]=new o(e));break;case"dots":c[s]||(c[s]=new h(e));break;case"dashed":c[s]||(c[s]=new r(e));break;case"zigzag-line":c[s]||(c[s]=new i$1(e));break;case"hachure":default:s="hachure",c[s]||(c[s]=new n(e));}return c[s]}(e,b).fillPolygons(t,e)}function T(t){return t.randomizer||(t.randomizer=new l(t.seed||0)),t.randomizer.next()}function D(t,e,s,n=1){return s.roughness*n*(T(s)*(e-t)+t)}function A$1(t,e,s=1){return D(-t,t,e,s)}function I(t,e,s,n,a,o=!1){const h=o?a.disableMultiStrokeFill:a.disableMultiStroke,r=C(t,e,s,n,a,!0,!1);if(h)return r;const i=C(t,e,s,n,a,!0,!0);return r.concat(i)}function C(t,e,s,n,a,o,h){const r=Math.pow(t-s,2)+Math.pow(e-n,2),i=Math.sqrt(r);let c=1;c=i<200?1:i>500?.4:-.0016668*i+1.233334;let l=a.maxRandomnessOffset||0;l*l*100>r&&(l=i/10);const u=l/2,p=.2+.2*T(a);let f=a.bowing*a.maxRandomnessOffset*(n-e)/200,d=a.bowing*a.maxRandomnessOffset*(t-s)/200;f=A$1(f,a,c),d=A$1(d,a,c);const g=[],M=()=>A$1(u,a,c),k=()=>A$1(l,a,c),b=a.preserveVertices;return o&&(h?g.push({op:"move",data:[t+(b?0:M()),e+(b?0:M())]}):g.push({op:"move",data:[t+(b?0:A$1(l,a,c)),e+(b?0:A$1(l,a,c))]})),h?g.push({op:"bcurveTo",data:[f+t+(s-t)*p+M(),d+e+(n-e)*p+M(),f+t+2*(s-t)*p+M(),d+e+2*(n-e)*p+M(),s+(b?0:M()),n+(b?0:M())]}):g.push({op:"bcurveTo",data:[f+t+(s-t)*p+k(),d+e+(n-e)*p+k(),f+t+2*(s-t)*p+k(),d+e+2*(n-e)*p+k(),s+(b?0:k()),n+(b?0:k())]}),g}function _(t,e,s){const n=[];n.push([t[0][0]+A$1(e,s),t[0][1]+A$1(e,s)]),n.push([t[0][0]+A$1(e,s),t[0][1]+A$1(e,s)]);for(let a=1;a<t.length;a++)n.push([t[a][0]+A$1(e,s),t[a][1]+A$1(e,s)]),a===t.length-1&&n.push([t[a][0]+A$1(e,s),t[a][1]+A$1(e,s)]);return W(n,null,s)}function W(t,e,s){const n=t.length,a=[];if(n>3){const o=[],h=1-s.curveTightness;a.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<n;e++){const s=t[e];o[0]=[s[0],s[1]],o[1]=[s[0]+(h*t[e+1][0]-h*t[e-1][0])/6,s[1]+(h*t[e+1][1]-h*t[e-1][1])/6],o[2]=[t[e+1][0]+(h*t[e][0]-h*t[e+2][0])/6,t[e+1][1]+(h*t[e][1]-h*t[e+2][1])/6],o[3]=[t[e+1][0],t[e+1][1]],a.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]});}if(e&&2===e.length){const t=s.maxRandomnessOffset;a.push({op:"lineTo",data:[e[0]+A$1(t,s),e[1]+A$1(t,s)]});}}else 3===n?(a.push({op:"move",data:[t[1][0],t[1][1]]}),a.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===n&&a.push(...I(t[0][0],t[0][1],t[1][0],t[1][1],s));return a}function z(t,e,s,n,a,o,h,r){const i=[],c=[];if(0===r.roughness){t/=4,c.push([e+n*Math.cos(-t),s+a*Math.sin(-t)]);for(let o=0;o<=2*Math.PI;o+=t){const t=[e+n*Math.cos(o),s+a*Math.sin(o)];i.push(t),c.push(t);}c.push([e+n*Math.cos(0),s+a*Math.sin(0)]),c.push([e+n*Math.cos(t),s+a*Math.sin(t)]);}else {const l=A$1(.5,r)-Math.PI/2;c.push([A$1(o,r)+e+.9*n*Math.cos(l-t),A$1(o,r)+s+.9*a*Math.sin(l-t)]);const u=2*Math.PI+l-.01;for(let h=l;h<u;h+=t){const t=[A$1(o,r)+e+n*Math.cos(h),A$1(o,r)+s+a*Math.sin(h)];i.push(t),c.push(t);}c.push([A$1(o,r)+e+n*Math.cos(l+2*Math.PI+.5*h),A$1(o,r)+s+a*Math.sin(l+2*Math.PI+.5*h)]),c.push([A$1(o,r)+e+.98*n*Math.cos(l+h),A$1(o,r)+s+.98*a*Math.sin(l+h)]),c.push([A$1(o,r)+e+.9*n*Math.cos(l+.5*h),A$1(o,r)+s+.9*a*Math.sin(l+.5*h)]);}return [c,i]}function E(t,e,s,n,a,o,h,r,i){const c=o+A$1(.1,i),l=[];l.push([A$1(r,i)+e+.9*n*Math.cos(c-t),A$1(r,i)+s+.9*a*Math.sin(c-t)]);for(let o=c;o<=h;o+=t)l.push([A$1(r,i)+e+n*Math.cos(o),A$1(r,i)+s+a*Math.sin(o)]);return l.push([e+n*Math.cos(h),s+a*Math.sin(h)]),l.push([e+n*Math.cos(h),s+a*Math.sin(h)]),W(l,null,i)}function $(t,e,s,n,a,o,h,r){const i=[],c=[r.maxRandomnessOffset||1,(r.maxRandomnessOffset||1)+.3];let l=[0,0];const u=r.disableMultiStroke?1:2,p=r.preserveVertices;for(let f=0;f<u;f++)0===f?i.push({op:"move",data:[h[0],h[1]]}):i.push({op:"move",data:[h[0]+(p?0:A$1(c[0],r)),h[1]+(p?0:A$1(c[0],r))]}),l=p?[a,o]:[a+A$1(c[f],r),o+A$1(c[f],r)],i.push({op:"bcurveTo",data:[t+A$1(c[f],r),e+A$1(c[f],r),s+A$1(c[f],r),n+A$1(c[f],r),l[0],l[1]]});return i}function G$1(t){return [...t]}function R(t,e){return Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)}function q(t,e,s){const n=R(e,s);if(0===n)return R(t,e);let a=((t[0]-e[0])*(s[0]-e[0])+(t[1]-e[1])*(s[1]-e[1]))/n;return a=Math.max(0,Math.min(1,a)),R(t,j(e,s,a))}function j(t,e,s){return [t[0]+(e[0]-t[0])*s,t[1]+(e[1]-t[1])*s]}function F(t,e,s,n){const a=n||[];if(function(t,e){const s=t[e+0],n=t[e+1],a=t[e+2],o=t[e+3];let h=3*n[0]-2*s[0]-o[0];h*=h;let r=3*n[1]-2*s[1]-o[1];r*=r;let i=3*a[0]-2*o[0]-s[0];i*=i;let c=3*a[1]-2*o[1]-s[1];return c*=c,h<i&&(h=i),r<c&&(r=c),h+r}(t,e)<s){const s=t[e+0];if(a.length){(o=a[a.length-1],h=s,Math.sqrt(R(o,h)))>1&&a.push(s);}else a.push(s);a.push(t[e+3]);}else {const n=.5,o=t[e+0],h=t[e+1],r=t[e+2],i=t[e+3],c=j(o,h,n),l=j(h,r,n),u=j(r,i,n),p=j(c,l,n),f=j(l,u,n),d=j(p,f,n);F([o,c,p,d],0,s,a),F([d,f,u,i],0,s,a);}var o,h;return a}function V(t,e){return Z(t,0,t.length,e)}function Z(t,e,s,n,a){const o=a||[],h=t[e],r=t[s-1];let i=0,c=1;for(let n=e+1;n<s-1;++n){const e=q(t[n],h,r);e>i&&(i=e,c=n);}return Math.sqrt(i)>n?(Z(t,e,c+1,n,o),Z(t,c,s,n,o)):(o.length||o.push(h),o.push(r)),o}function Q(t,e=.15,s){const n=[],a=(t.length-1)/3;for(let s=0;s<a;s++){F(t,3*s,e,n);}return s&&s>0?Z(n,0,n.length,s):n}const H="none";class N{constructor(t){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,seed:0,disableMultiStroke:!1,disableMultiStrokeFill:!1,preserveVertices:!1},this.config=t||{},this.config.options&&(this.defaultOptions=this._o(this.config.options));}static newSeed(){return Math.floor(Math.random()*2**31)}_o(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_d(t,e,s){return {shape:t,sets:e||[],options:s||this.defaultOptions}}line(t,e,s,n,a){const o=this._o(a);return this._d("line",[y$2(t,e,s,n,o)],o)}rectangle(t,e,s,n,a){const o=this._o(a),h=[],r=w(t,e,s,n,o);if(o.fill){const a=[[t,e],[t+s,e],[t+s,e+n],[t,e+n]];"solid"===o.fillStyle?h.push(S([a],o)):h.push(L([a],o));}return o.stroke!==H&&h.push(r),this._d("rectangle",h,o)}ellipse(t,e,s,n,a){const o=this._o(a),h=[],r=P(s,n,o),i=v(t,e,o,r);if(o.fill)if("solid"===o.fillStyle){const s=v(t,e,o,r).opset;s.type="fillPath",h.push(s);}else h.push(L([i.estimatedPoints],o));return o.stroke!==H&&h.push(i.opset),this._d("ellipse",h,o)}circle(t,e,s,n){const a=this.ellipse(t,e,s,s,n);return a.shape="circle",a}linearPath(t,e){const s=this._o(e);return this._d("linearPath",[m(t,!1,s)],s)}arc(t,e,s,n,a,o,h=!1,r){const i=this._o(r),c=[],l=O(t,e,s,n,a,o,h,!0,i);if(h&&i.fill)if("solid"===i.fillStyle){const h=Object.assign({},i);h.disableMultiStroke=!0;const r=O(t,e,s,n,a,o,!0,!1,h);r.type="fillPath",c.push(r);}else c.push(function(t,e,s,n,a,o,h){const r=t,i=e;let c=Math.abs(s/2),l=Math.abs(n/2);c+=A$1(.01*c,h),l+=A$1(.01*l,h);let u=a,p=o;for(;u<0;)u+=2*Math.PI,p+=2*Math.PI;p-u>2*Math.PI&&(u=0,p=2*Math.PI);const f=(p-u)/h.curveStepCount,d=[];for(let t=u;t<=p;t+=f)d.push([r+c*Math.cos(t),i+l*Math.sin(t)]);return d.push([r+c*Math.cos(p),i+l*Math.sin(p)]),d.push([r,i]),L([d],h)}(t,e,s,n,a,o,i));return i.stroke!==H&&c.push(l),this._d("arc",c,i)}curve(t,e){const s=this._o(e),n=[],a=x$2(t,s);if(s.fill&&s.fill!==H&&t.length>=3){const e=Q(function(t,e=0){const s=t.length;if(s<3)throw new Error("A curve must have at least three points.");const n=[];if(3===s)n.push(G$1(t[0]),G$1(t[1]),G$1(t[2]),G$1(t[2]));else {const s=[];s.push(t[0],t[0]);for(let e=1;e<t.length;e++)s.push(t[e]),e===t.length-1&&s.push(t[e]);const a=[],o=1-e;n.push(G$1(s[0]));for(let t=1;t+2<s.length;t++){const e=s[t];a[0]=[e[0],e[1]],a[1]=[e[0]+(o*s[t+1][0]-o*s[t-1][0])/6,e[1]+(o*s[t+1][1]-o*s[t-1][1])/6],a[2]=[s[t+1][0]+(o*s[t][0]-o*s[t+2][0])/6,s[t+1][1]+(o*s[t][1]-o*s[t+2][1])/6],a[3]=[s[t+1][0],s[t+1][1]],n.push(a[1],a[2],a[3]);}}return n}(t),10,(1+s.roughness)/2);"solid"===s.fillStyle?n.push(S([e],s)):n.push(L([e],s));}return s.stroke!==H&&n.push(a),this._d("curve",n,s)}polygon(t,e){const s=this._o(e),n=[],a=m(t,!0,s);return s.fill&&("solid"===s.fillStyle?n.push(S([t],s)):n.push(L([t],s))),s.stroke!==H&&n.push(a),this._d("polygon",n,s)}path(t,e){const s=this._o(e),n=[];if(!t)return this._d("path",n,s);t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");const a=s.fill&&"transparent"!==s.fill&&s.fill!==H,o=s.stroke!==H,h=!!(s.simplification&&s.simplification<1),r=function(t,e,s){const n=g(d(f(t))),a=[];let o=[],h=[0,0],r=[];const i=()=>{r.length>=4&&o.push(...Q(r,e)),r=[];},c=()=>{i(),o.length&&(a.push(o),o=[]);};for(const{key:t,data:e}of n)switch(t){case"M":c(),h=[e[0],e[1]],o.push(h);break;case"L":i(),o.push([e[0],e[1]]);break;case"C":if(!r.length){const t=o.length?o[o.length-1]:h;r.push([t[0],t[1]]);}r.push([e[0],e[1]]),r.push([e[2],e[3]]),r.push([e[4],e[5]]);break;case"Z":i(),o.push([h[0],h[1]]);}if(c(),!s)return a;const l=[];for(const t of a){const e=V(t,s);e.length&&l.push(e);}return l}(t,1,h?4-4*s.simplification:(1+s.roughness)/2);return a&&("solid"===s.fillStyle?n.push(S(r,s)):n.push(L(r,s))),o&&(h?r.forEach((t=>{n.push(m(t,!1,s));})):n.push(function(t,e){const s=g(d(f(t))),n=[];let a=[0,0],o=[0,0];for(const{key:t,data:h}of s)switch(t){case"M":{const t=1*(e.maxRandomnessOffset||0),s=e.preserveVertices;n.push({op:"move",data:h.map((n=>n+(s?0:A$1(t,e))))}),o=[h[0],h[1]],a=[h[0],h[1]];break}case"L":n.push(...I(o[0],o[1],h[0],h[1],e)),o=[h[0],h[1]];break;case"C":{const[t,s,a,r,i,c]=h;n.push(...$(t,s,a,r,i,c,o,e)),o=[i,c];break}case"Z":n.push(...I(o[0],o[1],a[0],a[1],e)),o=[a[0],a[1]];}return {type:"path",ops:n}}(t,s))),this._d("path",n,s)}opsToPath(t,e){let s="";for(const n of t.ops){const t="number"==typeof e&&e>=0?n.data.map((t=>+t.toFixed(e))):n.data;switch(n.op){case"move":s+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":s+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"lineTo":s+=`L${t[0]} ${t[1]} `;}}return s.trim()}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,n=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:H};break;case"fillPath":e={d:this.opsToPath(t),stroke:H,strokeWidth:0,fill:s.fill||H};break;case"fillSketch":e=this.fillSketch(t,s);}e&&n.push(e);}return n}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||H,strokeWidth:s,fill:H}}}class B{constructor(t,e){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.gen=new N(e);}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.ctx,a=t.options.fixedDecimalPlaceDigits;for(const o of e)switch(o.type){case"path":n.save(),n.strokeStyle="none"===s.stroke?"transparent":s.stroke,n.lineWidth=s.strokeWidth,s.strokeLineDash&&n.setLineDash(s.strokeLineDash),s.strokeLineDashOffset&&(n.lineDashOffset=s.strokeLineDashOffset),this._drawToContext(n,o,a),n.restore();break;case"fillPath":{n.save(),n.fillStyle=s.fill||"";const e="curve"===t.shape||"polygon"===t.shape||"path"===t.shape?"evenodd":"nonzero";this._drawToContext(n,o,a,e),n.restore();break}case"fillSketch":this.fillSketch(n,o,s);}}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2),t.save(),s.fillLineDash&&t.setLineDash(s.fillLineDash),s.fillLineDashOffset&&(t.lineDashOffset=s.fillLineDashOffset),t.strokeStyle=s.fill||"",t.lineWidth=n,this._drawToContext(t,e,s.fixedDecimalPlaceDigits),t.restore();}_drawToContext(t,e,s,n="nonzero"){t.beginPath();for(const n of e.ops){const e="number"==typeof s&&s>=0?n.data.map((t=>+t.toFixed(s))):n.data;switch(n.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"lineTo":t.lineTo(e[0],e[1]);}}"fillPath"===e.type?t.fill(n):t.stroke();}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,s,n,a){const o=this.gen.line(t,e,s,n,a);return this.draw(o),o}rectangle(t,e,s,n,a){const o=this.gen.rectangle(t,e,s,n,a);return this.draw(o),o}ellipse(t,e,s,n,a){const o=this.gen.ellipse(t,e,s,n,a);return this.draw(o),o}circle(t,e,s,n){const a=this.gen.circle(t,e,s,n);return this.draw(a),a}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s),s}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s),s}arc(t,e,s,n,a,o,h=!1,r){const i=this.gen.arc(t,e,s,n,a,o,h,r);return this.draw(i),i}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s),s}path(t,e){const s=this.gen.path(t,e);return this.draw(s),s}}const J="http://www.w3.org/2000/svg";class K{constructor(t,e){this.svg=t,this.gen=new N(e);}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.svg.ownerDocument||window.document,a=n.createElementNS(J,"g"),o=t.options.fixedDecimalPlaceDigits;for(const h of e){let e=null;switch(h.type){case"path":e=n.createElementNS(J,"path"),e.setAttribute("d",this.opsToPath(h,o)),e.setAttribute("stroke",s.stroke),e.setAttribute("stroke-width",s.strokeWidth+""),e.setAttribute("fill","none"),s.strokeLineDash&&e.setAttribute("stroke-dasharray",s.strokeLineDash.join(" ").trim()),s.strokeLineDashOffset&&e.setAttribute("stroke-dashoffset",`${s.strokeLineDashOffset}`);break;case"fillPath":e=n.createElementNS(J,"path"),e.setAttribute("d",this.opsToPath(h,o)),e.setAttribute("stroke","none"),e.setAttribute("stroke-width","0"),e.setAttribute("fill",s.fill||""),"curve"!==t.shape&&"polygon"!==t.shape||e.setAttribute("fill-rule","evenodd");break;case"fillSketch":e=this.fillSketch(n,h,s);}e&&a.appendChild(e);}return a}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2);const a=t.createElementNS(J,"path");return a.setAttribute("d",this.opsToPath(e,s.fixedDecimalPlaceDigits)),a.setAttribute("stroke",s.fill||""),a.setAttribute("stroke-width",n+""),a.setAttribute("fill","none"),s.fillLineDash&&a.setAttribute("stroke-dasharray",s.fillLineDash.join(" ").trim()),s.fillLineDashOffset&&a.setAttribute("stroke-dashoffset",`${s.fillLineDashOffset}`),a}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t,e){return this.gen.opsToPath(t,e)}line(t,e,s,n,a){const o=this.gen.line(t,e,s,n,a);return this.draw(o)}rectangle(t,e,s,n,a){const o=this.gen.rectangle(t,e,s,n,a);return this.draw(o)}ellipse(t,e,s,n,a){const o=this.gen.ellipse(t,e,s,n,a);return this.draw(o)}circle(t,e,s,n){const a=this.gen.circle(t,e,s,n);return this.draw(a)}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s)}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s)}arc(t,e,s,n,a,o,h=!1,r){const i=this.gen.arc(t,e,s,n,a,o,h,r);return this.draw(i)}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s)}path(t,e){const s=this.gen.path(t,e);return this.draw(s)}}var U={canvas:(t,e)=>new B(t,e),svg:(t,e)=>new K(t,e),generator:t=>new N(t),newSeed:()=>N.newSeed()};

var defs = "\n<defs>\n  <style>\n    @font-face {\n      font-family: 'Patrick Hand';\n      font-style: normal;\n      font-weight: 400;\n      font-display: swap;\n      src: local('Patrick Hand'), local('PatrickHand-Regular'), url(data:font/woff2;base64,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) format('woff2');\n      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n    }\n  </style>\n</defs>\n";

var Alignment;
(function (Alignment) {
    Alignment["LEFT"] = "left";
    Alignment["MIDDLE"] = "middle";
    Alignment["RIGHT"] = "right";
})(Alignment || (Alignment = {}));
var Renderer = /** @class */ (function () {
    function Renderer(container) {
        this.container = container;
    }
    Renderer.trianglePath = function (x, y, size) {
        return "M".concat(x + size / 2, " ").concat(y, " L").concat(x + size, " ").concat(y + size, " L").concat(x, " ").concat(y + size);
    };
    Renderer.ngonPath = function (x, y, size, edges) {
        var i;
        var a;
        var degrees = 360 / edges;
        var radius = size / 2;
        var points = [];
        var curX = x;
        var curY = y;
        for (i = 0; i < edges; i += 1) {
            a = i * degrees - 90;
            curX = radius + radius * Math.cos((a * Math.PI) / 180);
            curY = radius + radius * Math.sin((a * Math.PI) / 180);
            points.push([curX, curY]);
        }
        var lines = points.reduce(function (acc, _a) {
            var _b = __read(_a, 2), posX = _b[0], posY = _b[1];
            return "".concat(acc, " L").concat(posX, " ").concat(posY);
        }, '');
        return "M".concat(curX, " ").concat(curY, " ").concat(lines);
    };
    Renderer.toClassName = function (classes) {
        if (!classes) {
            return '';
        }
        return Array.isArray(classes) ? classes.join(' ') : classes;
    };
    return Renderer;
}());

/* istanbul ignore file */
/**
 * Currently the font is hard-coded to 'Patrick Hand' when using the handdrawn chord diagram style.
 * The reason is that the font needs to be base64 encoded and embedded in the SVG. In theory a web-font
 * could be downloaded, base64 encoded and embedded in the SVG but that's too much of a hassle. But if the
 * need arises it should be possible.
 */
var FONT_FAMLILY = 'Patrick Hand';
var RoughJsRenderer = /** @class */ (function (_super) {
    __extends(RoughJsRenderer, _super);
    function RoughJsRenderer(container) {
        var _this = _super.call(this, container) || this;
        // initialize the container
        if (container instanceof HTMLElement) {
            _this.containerNode = container;
        }
        else {
            _this.containerNode = container;
            var node = document.querySelector(container);
            if (!node) {
                throw new Error("No element found with selector \"".concat(container, "\""));
            }
            _this.containerNode = node;
        }
        // create an empty SVG element
        _this.svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        _this.svgNode.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        _this.svgNode.setAttribute('version', '1.1');
        _this.svgNode.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        _this.svgNode.setAttribute('xmlns:svgjs', 'http://svgjs.com/svgjs');
        _this.svgNode.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        _this.svgNode.setAttribute('viewBox', '0 0 400 400');
        _this.embedDefs();
        _this.containerNode.appendChild(_this.svgNode);
        _this.rc = U.svg(_this.svgNode);
        return _this;
    }
    /**
     * This will embed all defs defined in the defs.html file. Specifically this is used to embed the base64
     * encoded font into the SVG so that the font always looks correct.
     */
    RoughJsRenderer.prototype.embedDefs = function () {
        var _this = this;
        /*
        Embed the base64 encoded font. This is done in a timeout because roughjs also creates defs which will simply overwrite existing defs.
        By putting this in a timeout we make sure that the style tag is added after roughjs finished rendering.
        ATTENTION: This will only work as long as we're synchronously rendering the diagram! If we ever switch to asynchronous rendering a different
        solution must be found.
        */
        setTimeout(function () {
            var _a, _b, _c;
            // check if defs were already added
            if (_this.svgNode.querySelector('defs [data-svguitar-def]')) {
                return;
            }
            var currentDefs = _this.svgNode.querySelector('defs');
            if (!currentDefs) {
                currentDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                _this.svgNode.prepend(currentDefs);
            }
            // create dom nodes from HTML string
            var template = document.createElement('template');
            template.innerHTML = defs.trim();
            // typescript is complaining when I access content.firstChild.children, therefore this ugly workaround.
            var defsToAdd = (_c = (_b = (_a = template.content.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.children;
            if (defsToAdd) {
                Array.from(defsToAdd).forEach(function (def) {
                    def.setAttribute('data-svguitar-def', 'true');
                    currentDefs === null || currentDefs === void 0 ? void 0 : currentDefs.appendChild(def);
                });
            }
        });
    };
    RoughJsRenderer.prototype.title = function (title) {
        var titleEl = document.createElement('title');
        titleEl.textContent = title;
        this.svgNode.appendChild(titleEl);
    };
    RoughJsRenderer.prototype.circle = function (x, y, diameter, strokeWidth, strokeColor, fill, classes) {
        var _a;
        var options = {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        };
        if (strokeWidth > 0) {
            options.strokeWidth = strokeWidth;
        }
        var circle = this.rc.circle(x + diameter / 2, y + diameter / 2, diameter, options);
        (_a = circle.classList).add.apply(_a, __spreadArray([], __read(RoughJsRenderer.toClassArray(classes)), false));
        this.svgNode.appendChild(circle);
        return RoughJsRenderer.boxToElement(circle.getBBox(), function () {
            return circle ? circle.remove() : undefined;
        });
    };
    RoughJsRenderer.prototype.clear = function () {
        while (this.svgNode.firstChild) {
            this.svgNode.removeChild(this.svgNode.firstChild);
        }
        this.rc = U.svg(this.svgNode);
        this.embedDefs();
    };
    RoughJsRenderer.prototype.remove = function () {
        this.svgNode.remove();
    };
    RoughJsRenderer.prototype.line = function (x1, y1, x2, y2, strokeWidth, color, classes) {
        var _a;
        if (strokeWidth > 5 && (x1 - x2 === 0 || y1 - y2 === 0)) {
            if (Math.abs(x1 - x2) > Math.abs(y1 - y2)) {
                this.rect(x1, y1, x2 - x1, strokeWidth, 0, color, color);
            }
            else {
                this.rect(x1 - strokeWidth / 2, y1, strokeWidth, y2 - y1, 0, color, color);
            }
        }
        else {
            var line = this.rc.line(x1, y1, x2, y2, {
                strokeWidth: strokeWidth,
                stroke: color,
            });
            (_a = line.classList).add.apply(_a, __spreadArray([], __read(RoughJsRenderer.toClassArray(classes)), false));
            this.svgNode.appendChild(line);
        }
    };
    RoughJsRenderer.prototype.rect = function (x, y, width, height, strokeWidth, strokeColor, classes, fill, radius) {
        var _a, _b;
        var rect2 = this.rc.rectangle(x, y, width, height, {
            // fill: fill || 'none',
            fill: 'none',
            fillWeight: 2,
            strokeWidth: strokeWidth,
            stroke: strokeColor,
            roughness: 2.8,
            fillStyle: 'cross-hatch',
            hachureAngle: 60,
            hachureGap: 4,
        });
        var rectRadius = radius || 0;
        var path = RoughJsRenderer.roundedRectData(width, height, rectRadius, rectRadius, rectRadius, rectRadius);
        var rect = this.rc.path(path, {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        rect.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        (_a = rect.classList).add.apply(_a, __spreadArray([], __read(RoughJsRenderer.toClassArray(classes)), false));
        (_b = rect2.classList).add.apply(_b, __spreadArray([], __read(RoughJsRenderer.toClassArray(classes)), false));
        this.svgNode.appendChild(rect);
        this.svgNode.appendChild(rect2);
        return RoughJsRenderer.boxToElement(rect.getBBox(), function () { return rect.remove(); });
    };
    RoughJsRenderer.prototype.triangle = function (x, y, size, strokeWidth, strokeColor, classes, fill) {
        var _a;
        var triangle = this.rc.path(Renderer.trianglePath(0, 0, size), {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        triangle.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        (_a = triangle.classList).add.apply(_a, __spreadArray([], __read(RoughJsRenderer.toClassArray(classes)), false));
        this.svgNode.appendChild(triangle);
        return RoughJsRenderer.boxToElement(triangle.getBBox(), function () { return triangle.remove(); });
    };
    RoughJsRenderer.prototype.pentagon = function (x, y, size, strokeWidth, strokeColor, fill, classes, spikes) {
        var _a;
        if (spikes === void 0) { spikes = 5; }
        var pentagon = this.rc.path(Renderer.ngonPath(0, 0, size, spikes), {
            fill: fill || 'none',
            fillWeight: 2.5,
            stroke: strokeColor || fill || 'none',
            roughness: 1.5,
        });
        pentagon.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
        (_a = pentagon.classList).add.apply(_a, __spreadArray([], __read(RoughJsRenderer.toClassArray(classes)), false));
        this.svgNode.appendChild(pentagon);
        return RoughJsRenderer.boxToElement(pentagon.getBBox(), function () { return pentagon.remove(); });
    };
    RoughJsRenderer.prototype.size = function (width, height) {
        this.svgNode.setAttribute('viewBox', "0 0 ".concat(Math.ceil(width), " ").concat(Math.ceil(height)));
    };
    RoughJsRenderer.prototype.background = function (color) {
        var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttributeNS(null, 'width', '100%');
        bg.setAttributeNS(null, 'height', '100%');
        bg.setAttributeNS(null, 'fill', color);
        this.svgNode.insertBefore(bg, this.svgNode.firstChild);
    };
    RoughJsRenderer.prototype.text = function (text, x, y, fontSize, color, fontFamily, alignment, classes, plain) {
        var _a;
        // Place the SVG namespace in a variable to easily reference it.
        var txtElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txtElem.setAttributeNS(null, 'x', String(x));
        txtElem.setAttributeNS(null, 'y', String(y));
        txtElem.setAttributeNS(null, 'font-size', String(fontSize));
        txtElem.setAttributeNS(null, 'font-family', FONT_FAMLILY);
        txtElem.setAttributeNS(null, 'align', alignment);
        txtElem.setAttributeNS(null, 'fill', color);
        if (plain) {
            txtElem.setAttributeNS(null, 'dominant-baseline', 'central');
        }
        txtElem.appendChild(document.createTextNode(text));
        this.svgNode.appendChild(txtElem);
        var bbox = txtElem.getBBox();
        var xOffset;
        switch (alignment) {
            case Alignment.MIDDLE:
                xOffset = -(bbox.width / 2);
                break;
            case Alignment.LEFT:
                xOffset = 0;
                break;
            case Alignment.RIGHT:
                xOffset = -bbox.width;
                break;
            default:
                throw new Error("Invalid alignment ".concat(alignment));
        }
        (_a = txtElem.classList).add.apply(_a, __spreadArray([], __read(RoughJsRenderer.toClassArray(classes)), false));
        txtElem.setAttributeNS(null, 'x', String(x + xOffset));
        txtElem.setAttributeNS(null, 'y', String(y + (plain ? 0 : bbox.height / 2)));
        return RoughJsRenderer.boxToElement(txtElem.getBBox(), txtElem.remove.bind(txtElem));
    };
    RoughJsRenderer.boxToElement = function (box, remove) {
        return {
            width: box.width,
            height: box.height,
            x: box.x,
            y: box.y,
            remove: remove,
        };
    };
    RoughJsRenderer.roundedRectData = function (w, h, tlr, trr, brr, blr) {
        return ("M 0 ".concat(tlr, " A ").concat(tlr, " ").concat(tlr, " 0 0 1 ").concat(tlr, " 0") +
            " L ".concat(w - trr, " 0") +
            " A ".concat(trr, " ").concat(trr, " 0 0 1 ").concat(w, " ").concat(trr, " L ").concat(w, " ").concat(h - brr, " A ").concat(brr, " ").concat(brr, " 0 0 1 ").concat(w - brr, " ").concat(h, " L ").concat(blr, " ").concat(h, " A ").concat(blr, " ").concat(blr, " 0 0 1 0 ").concat(h - blr, " Z"));
    };
    RoughJsRenderer.toClassArray = function (classes) {
        if (!classes) {
            return [];
        }
        return Renderer.toClassName(classes).split(' ');
    };
    return RoughJsRenderer;
}(Renderer));

const methods$1 = {};
const names = [];

function registerMethods (name, m) {
  if (Array.isArray(name)) {
    for (const _name of name) {
      registerMethods(_name, m);
    }
    return
  }

  if (typeof name === 'object') {
    for (const _name in name) {
      registerMethods(_name, name[_name]);
    }
    return
  }

  addMethodNames(Object.getOwnPropertyNames(m));
  methods$1[name] = Object.assign(methods$1[name] || {}, m);
}

function getMethodsFor (name) {
  return methods$1[name] || {}
}

function getMethodNames () {
  return [ ...new Set(names) ]
}

function addMethodNames (_names) {
  names.push(..._names);
}

// Map function
function map (array, block) {
  var i;
  var il = array.length;
  var result = [];

  for (i = 0; i < il; i++) {
    result.push(block(array[i]));
  }

  return result
}

// Degrees to radians
function radians (d) {
  return d % 360 * Math.PI / 180
}

// Convert dash-separated-string to camelCase
function camelCase (s) {
  return s.toLowerCase().replace(/-(.)/g, function (m, g) {
    return g.toUpperCase()
  })
}

// Convert camel cased string to string seperated
function unCamelCase (s) {
  return s.replace(/([A-Z])/g, function (m, g) {
    return '-' + g.toLowerCase()
  })
}

// Capitalize first letter of a string
function capitalize (s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Calculate proportional width and height values when necessary
function proportionalSize (element, width, height, box) {
  if (width == null || height == null) {
    box = box || element.bbox();

    if (width == null) {
      width = box.width / box.height * height;
    } else if (height == null) {
      height = box.height / box.width * width;
    }
  }

  return {
    width: width,
    height: height
  }
}

function getOrigin (o, element) {
  // Allow origin or around as the names
  const origin = o.origin; // o.around == null ? o.origin : o.around
  let ox, oy;

  // Allow the user to pass a string to rotate around a given point
  if (typeof origin === 'string' || origin == null) {
    // Get the bounding box of the element with no transformations applied
    const string = (origin || 'center').toLowerCase().trim();
    const { height, width, x, y } = element.bbox();

    // Calculate the transformed x and y coordinates
    const bx = string.includes('left') ? x
      : string.includes('right') ? x + width
      : x + width / 2;
    const by = string.includes('top') ? y
      : string.includes('bottom') ? y + height
      : y + height / 2;

    // Set the bounds eg : "bottom-left", "Top right", "middle" etc...
    ox = o.ox != null ? o.ox : bx;
    oy = o.oy != null ? o.oy : by;
  } else {
    ox = origin[0];
    oy = origin[1];
  }

  // Return the origin as it is if it wasn't a string
  return [ ox, oy ]
}

// Default namespaces
const ns = 'http://www.w3.org/2000/svg';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';
const svgjs = 'http://svgjs.com/svgjs';

const globals = {
  window: typeof window === 'undefined' ? null : window,
  document: typeof document === 'undefined' ? null : document
};

class Base {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}

const elements = {};
const root = '___SYMBOL___ROOT___';

// Method for element creation
function create (name) {
  // create element
  return globals.document.createElementNS(ns, name)
}

function makeInstance (element) {
  if (element instanceof Base) return element

  if (typeof element === 'object') {
    return adopter(element)
  }

  if (element == null) {
    return new elements[root]()
  }

  if (typeof element === 'string' && element.charAt(0) !== '<') {
    return adopter(globals.document.querySelector(element))
  }

  var node = create('svg');
  node.innerHTML = element;

  // We can use firstChild here because we know,
  // that the first char is < and thus an element
  element = adopter(node.firstChild);

  return element
}

function nodeOrNew (name, node) {
  return node instanceof globals.window.Node ? node : create(name)
}

// Adopt existing svg elements
function adopt (node) {
  // check for presence of node
  if (!node) return null

  // make sure a node isn't already adopted
  if (node.instance instanceof Base) return node.instance

  // initialize variables
  var className = capitalize(node.nodeName || 'Dom');

  // Make sure that gradients are adopted correctly
  if (className === 'LinearGradient' || className === 'RadialGradient') {
    className = 'Gradient';

  // Fallback to Dom if element is not known
  } else if (!elements[className]) {
    className = 'Dom';
  }

  return new elements[className](node)
}

let adopter = adopt;

function register (element, name = element.name, asRoot = false) {
  elements[name] = element;
  if (asRoot) elements[root] = element;

  addMethodNames(Object.getOwnPropertyNames(element.prototype));

  return element
}

function getClass (name) {
  return elements[name]
}

// Element id sequence
let did = 1000;

// Get next named element id
function eid (name) {
  return 'Svgjs' + capitalize(name) + (did++)
}

// Deep new id assignment
function assignNewId (node) {
  // do the same for SVG child nodes as well
  for (var i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i]);
  }

  if (node.id) {
    return adopt(node).id(eid(node.nodeName))
  }

  return adopt(node)
}

// Method for extending objects
function extend (modules, methods, attrCheck) {
  var key, i;

  modules = Array.isArray(modules) ? modules : [ modules ];

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) {
      let method = methods[key];
      if (attrCheck) {
        method = wrapWithAttrCheck(methods[key]);
      }
      modules[i].prototype[key] = method;
    }
  }
}

// export function extendWithAttrCheck (...args) {
//   extend(...args, true)
// }

function wrapWithAttrCheck (fn) {
  return function (...args) {
    const o = args[args.length - 1];

    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o)
    } else {
      return fn.apply(this, args)
    }
  }
}

// Get all siblings, including myself
function siblings () {
  return this.parent().children()
}

// Get the curent position siblings
function position () {
  return this.parent().index(this)
}

// Get the next element (will return null if there is none)
function next () {
  return this.siblings()[this.position() + 1]
}

// Get the next element (will return null if there is none)
function prev () {
  return this.siblings()[this.position() - 1]
}

// Send given element one step forward
function forward () {
  var i = this.position() + 1;
  var p = this.parent();

  // move node one step forward
  p.removeElement(this).add(this, i);

  // make sure defs node is always at the top
  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node);
  }

  return this
}

// Send given element one step backward
function backward () {
  var i = this.position();

  if (i > 0) {
    this.parent().removeElement(this).add(this, i - 1);
  }

  return this
}

// Send given element all the way to the front
function front () {
  var p = this.parent();

  // Move node forward
  p.node.appendChild(this.node);

  // Make sure defs node is always at the top
  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node);
  }

  return this
}

// Send given element all the way to the back
function back () {
  if (this.position() > 0) {
    this.parent().removeElement(this).add(this, 0);
  }

  return this
}

// Inserts a given element before the targeted element
function before (element) {
  element = makeInstance(element);
  element.remove();

  var i = this.position();

  this.parent().add(element, i);

  return this
}

// Inserts a given element after the targeted element
function after (element) {
  element = makeInstance(element);
  element.remove();

  var i = this.position();

  this.parent().add(element, i + 1);

  return this
}

function insertBefore (element) {
  element = makeInstance(element);
  element.before(this);
  return this
}

function insertAfter (element) {
  element = makeInstance(element);
  element.after(this);
  return this
}

registerMethods('Dom', {
  siblings,
  position,
  next,
  prev,
  forward,
  backward,
  front,
  back,
  before,
  after,
  insertBefore,
  insertAfter
});

// Parse unit value
const numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i;

// Parse hex value
const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

// Parse rgb value
const rgb = /rgb\((\d+),(\d+),(\d+)\)/;

// Parse reference id
const reference = /(#[a-z0-9\-_]+)/i;

// splits a transformation chain
const transforms = /\)\s*,?\s*/;

// Whitespace
const whitespace = /\s/g;

// Test hex value
const isHex = /^#[a-f0-9]{3,6}$/i;

// Test rgb value
const isRgb = /^rgb\(/;

// Test for blank string
const isBlank = /^(\s+)?$/;

// Test for numeric string
const isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

// Test for image url
const isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i;

// split at whitespace and comma
const delimiter = /[\s,]+/;

// The following regex are used to parse the d attribute of a path

// Matches all hyphens which are not after an exponent
const hyphen = /([^e])-/gi;

// Replaces and tests for all path letters
const pathLetters = /[MLHVCSQTAZ]/gi;

// yes we need this one, too
const isPathLetter = /[MLHVCSQTAZ]/i;

// matches 0.154.23.45
const numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi;

// matches .
const dots = /\./g;

// Return array of classes on the node
function classes () {
  var attr = this.attr('class');
  return attr == null ? [] : attr.trim().split(delimiter)
}

// Return true if class exists on the node, false otherwise
function hasClass (name) {
  return this.classes().indexOf(name) !== -1
}

// Add class to the node
function addClass (name) {
  if (!this.hasClass(name)) {
    var array = this.classes();
    array.push(name);
    this.attr('class', array.join(' '));
  }

  return this
}

// Remove class from the node
function removeClass (name) {
  if (this.hasClass(name)) {
    this.attr('class', this.classes().filter(function (c) {
      return c !== name
    }).join(' '));
  }

  return this
}

// Toggle the presence of a class on the node
function toggleClass (name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name)
}

registerMethods('Dom', {
  classes, hasClass, addClass, removeClass, toggleClass
});

// Dynamic style generator
function css (style, val) {
  const ret = {};
  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText.split(/\s*;\s*/)
      .filter(function (el) {
        return !!el.length
      })
      .forEach(function (el) {
        const t = el.split(/\s*:\s*/);
        ret[t[0]] = t[1];
      });
    return ret
  }

  if (arguments.length < 2) {
    // get style properties in the array
    if (Array.isArray(style)) {
      for (const name of style) {
        const cased = camelCase(name);
        ret[cased] = this.node.style[cased];
      }
      return ret
    }

    // get style for property
    if (typeof style === 'string') {
      return this.node.style[camelCase(style)]
    }

    // set styles in object
    if (typeof style === 'object') {
      for (const name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style[camelCase(name)]
          = (style[name] == null || isBlank.test(style[name])) ? '' : style[name];
      }
    }
  }

  // set style for property
  if (arguments.length === 2) {
    this.node.style[camelCase(style)]
      = (val == null || isBlank.test(val)) ? '' : val;
  }

  return this
}

// Show element
function show () {
  return this.css('display', '')
}

// Hide element
function hide () {
  return this.css('display', 'none')
}

// Is element visible?
function visible () {
  return this.css('display') !== 'none'
}

registerMethods('Dom', {
  css, show, hide, visible
});

// Store data values on svg nodes
function data (a, v, r) {
  if (typeof a === 'object') {
    for (v in a) {
      this.data(v, a[v]);
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr('data-' + a))
    } catch (e) {
      return this.attr('data-' + a)
    }
  } else {
    this.attr('data-' + a,
      v === null ? null
      : r === true || typeof v === 'string' || typeof v === 'number' ? v
      : JSON.stringify(v)
    );
  }

  return this
}

registerMethods('Dom', { data });

// Remember arbitrary data
function remember (k, v) {
  // remember every item in an object individually
  if (typeof arguments[0] === 'object') {
    for (var key in k) {
      this.remember(key, k[key]);
    }
  } else if (arguments.length === 1) {
    // retrieve memory
    return this.memory()[k]
  } else {
    // store memory
    this.memory()[k] = v;
  }

  return this
}

// Erase a given memory
function forget () {
  if (arguments.length === 0) {
    this._memory = {};
  } else {
    for (var i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]];
    }
  }
  return this
}

// This triggers creation of a new hidden class which is not performant
// However, this function is not rarely used so it will not happen frequently
// Return local memory object
function memory () {
  return (this._memory = this._memory || {})
}

registerMethods('Dom', { remember, forget, memory });

let listenerId = 0;
const windowEvents = {};

function getEvents (instance) {
  let n = instance.getEventHolder();

  // We dont want to save events in global space
  if (n === globals.window) n = windowEvents;
  if (!n.events) n.events = {};
  return n.events
}

function getEventTarget (instance) {
  return instance.getEventTarget()
}

function clearEvents (instance) {
  const n = instance.getEventHolder();
  if (n.events) n.events = {};
}

// Add event binder in the SVG namespace
function on (node, events, listener, binding, options) {
  var l = listener.bind(binding || node);
  var instance = makeInstance(node);
  var bag = getEvents(instance);
  var n = getEventTarget(instance);

  // events can be an array of events or a string of events
  events = Array.isArray(events) ? events : events.split(delimiter);

  // add id to listener
  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId;
  }

  events.forEach(function (event) {
    var ev = event.split('.')[0];
    var ns = event.split('.')[1] || '*';

    // ensure valid object
    bag[ev] = bag[ev] || {};
    bag[ev][ns] = bag[ev][ns] || {};

    // reference listener
    bag[ev][ns][listener._svgjsListenerId] = l;

    // add listener
    n.addEventListener(ev, l, options || false);
  });
}

// Add event unbinder in the SVG namespace
function off (node, events, listener, options) {
  var instance = makeInstance(node);
  var bag = getEvents(instance);
  var n = getEventTarget(instance);

  // listener can be a function or a number
  if (typeof listener === 'function') {
    listener = listener._svgjsListenerId;
    if (!listener) return
  }

  // events can be an array of events or a string or undefined
  events = Array.isArray(events) ? events : (events || '').split(delimiter);

  events.forEach(function (event) {
    var ev = event && event.split('.')[0];
    var ns = event && event.split('.')[1];
    var namespace, l;

    if (listener) {
      // remove listener reference
      if (bag[ev] && bag[ev][ns || '*']) {
        // removeListener
        n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);

        delete bag[ev][ns || '*'][listener];
      }
    } else if (ev && ns) {
      // remove all listeners for a namespaced event
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ ev, ns ].join('.'), l);
        }

        delete bag[ev][ns];
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [ event, ns ].join('.'));
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ ev, namespace ].join('.'));
        }

        delete bag[ev];
      }
    } else {
      // remove all listeners on a given node
      for (event in bag) {
        off(n, event);
      }

      clearEvents(instance);
    }
  });
}

function dispatch (node, event, data) {
  var n = getEventTarget(node);

  // Dispatch event
  if (event instanceof globals.window.Event) {
    n.dispatchEvent(event);
  } else {
    event = new globals.window.CustomEvent(event, { detail: data, cancelable: true });
    n.dispatchEvent(event);
  }
  return event
}

function sixDigitHex (hex) {
  return hex.length === 4
    ? [ '#',
      hex.substring(1, 2), hex.substring(1, 2),
      hex.substring(2, 3), hex.substring(2, 3),
      hex.substring(3, 4), hex.substring(3, 4)
    ].join('')
    : hex
}

function componentHex (component) {
  const integer = Math.round(component);
  const bounded = Math.max(0, Math.min(255, integer));
  const hex = bounded.toString(16);
  return hex.length === 1 ? '0' + hex : hex
}

function is (object, space) {
  for (let i = space.length; i--;) {
    if (object[space[i]] == null) {
      return false
    }
  }
  return true
}

function getParameters (a, b) {
  const params = is(a, 'rgb') ? { _a: a.r, _b: a.g, _c: a.b, space: 'rgb' }
    : is(a, 'xyz') ? { _a: a.x, _b: a.y, _c: a.z, _d: 0, space: 'xyz' }
    : is(a, 'hsl') ? { _a: a.h, _b: a.s, _c: a.l, _d: 0, space: 'hsl' }
    : is(a, 'lab') ? { _a: a.l, _b: a.a, _c: a.b, _d: 0, space: 'lab' }
    : is(a, 'lch') ? { _a: a.l, _b: a.c, _c: a.h, _d: 0, space: 'lch' }
    : is(a, 'cmyk') ? { _a: a.c, _b: a.m, _c: a.y, _d: a.k, space: 'cmyk' }
    : { _a: 0, _b: 0, _c: 0, space: 'rgb' };

  params.space = b || params.space;
  return params
}

function cieSpace (space) {
  if (space === 'lab' || space === 'xyz' || space === 'lch') {
    return true
  } else {
    return false
  }
}

function hueToRgb (p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

class Color {
  constructor (...inputs) {
    this.init(...inputs);
  }

  init (a = 0, b = 0, c = 0, d = 0, space = 'rgb') {
    // This catches the case when a falsy value is passed like ''
    a = !a ? 0 : a;

    // Reset all values in case the init function is rerun with new color space
    if (this.space) {
      for (const component in this.space) {
        delete this[this.space[component]];
      }
    }

    if (typeof a === 'number') {
      // Allow for the case that we don't need d...
      space = typeof d === 'string' ? d : space;
      d = typeof d === 'string' ? 0 : d;

      // Assign the values straight to the color
      Object.assign(this, { _a: a, _b: b, _c: c, _d: d, space });
    // If the user gave us an array, make the color from it
    } else if (a instanceof Array) {
      this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
      Object.assign(this, { _a: a[0], _b: a[1], _c: a[2], _d: a[3] || 0 });
    } else if (a instanceof Object) {
      // Set the object up and assign its values directly
      const values = getParameters(a, b);
      Object.assign(this, values);
    } else if (typeof a === 'string') {
      if (isRgb.test(a)) {
        const noWhitespace = a.replace(whitespace, '');
        const [ _a, _b, _c ] = rgb.exec(noWhitespace)
          .slice(1, 4).map(v => parseInt(v));
        Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' });
      } else if (isHex.test(a)) {
        const hexParse = v => parseInt(v, 16);
        const [ , _a, _b, _c ] = hex.exec(sixDigitHex(a)).map(hexParse);
        Object.assign(this, { _a, _b, _c, _d: 0, space: 'rgb' });
      } else throw Error('Unsupported string format, can\'t construct Color')
    }

    // Now add the components as a convenience
    const { _a, _b, _c, _d } = this;
    const components = this.space === 'rgb' ? { r: _a, g: _b, b: _c }
      : this.space === 'xyz' ? { x: _a, y: _b, z: _c }
      : this.space === 'hsl' ? { h: _a, s: _b, l: _c }
      : this.space === 'lab' ? { l: _a, a: _b, b: _c }
      : this.space === 'lch' ? { l: _a, c: _b, h: _c }
      : this.space === 'cmyk' ? { c: _a, m: _b, y: _c, k: _d }
      : {};
    Object.assign(this, components);
  }

  /*
  Conversion Methods
  */

  rgb () {
    if (this.space === 'rgb') {
      return this
    } else if (cieSpace(this.space)) {
      // Convert to the xyz color space
      let { x, y, z } = this;
      if (this.space === 'lab' || this.space === 'lch') {
        // Get the values in the lab space
        let { l, a, b } = this;
        if (this.space === 'lch') {
          const { c, h } = this;
          const dToR = Math.PI / 180;
          a = c * Math.cos(dToR * h);
          b = c * Math.sin(dToR * h);
        }

        // Undo the nonlinear function
        const yL = (l + 16) / 116;
        const xL = a / 500 + yL;
        const zL = yL - b / 200;

        // Get the xyz values
        const ct = 16 / 116;
        const mx = 0.008856;
        const nm = 7.787;
        x = 0.95047 * ((xL ** 3 > mx) ? xL ** 3 : (xL - ct) / nm);
        y = 1.00000 * ((yL ** 3 > mx) ? yL ** 3 : (yL - ct) / nm);
        z = 1.08883 * ((zL ** 3 > mx) ? zL ** 3 : (zL - ct) / nm);
      }

      // Convert xyz to unbounded rgb values
      const rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
      const gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
      const bU = x * 0.0557 + y * -0.2040 + z * 1.0570;

      // Convert the values to true rgb values
      const pow = Math.pow;
      const bd = 0.0031308;
      const r = (rU > bd) ? (1.055 * pow(rU, 1 / 2.4) - 0.055) : 12.92 * rU;
      const g = (gU > bd) ? (1.055 * pow(gU, 1 / 2.4) - 0.055) : 12.92 * gU;
      const b = (bU > bd) ? (1.055 * pow(bU, 1 / 2.4) - 0.055) : 12.92 * bU;

      // Make and return the color
      const color = new Color(255 * r, 255 * g, 255 * b);
      return color
    } else if (this.space === 'hsl') {
      // https://bgrins.github.io/TinyColor/docs/tinycolor.html
      // Get the current hsl values
      let { h, s, l } = this;
      h /= 360;
      s /= 100;
      l /= 100;

      // If we are grey, then just make the color directly
      if (s === 0) {
        l *= 255;
        const color = new Color(l, l, l);
        return color
      }

      // TODO I have no idea what this does :D If you figure it out, tell me!
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      // Get the rgb values
      const r = 255 * hueToRgb(p, q, h + 1 / 3);
      const g = 255 * hueToRgb(p, q, h);
      const b = 255 * hueToRgb(p, q, h - 1 / 3);

      // Make a new color
      const color = new Color(r, g, b);
      return color
    } else if (this.space === 'cmyk') {
      // https://gist.github.com/felipesabino/5066336
      // Get the normalised cmyk values
      const { c, m, y, k } = this;

      // Get the rgb values
      const r = 255 * (1 - Math.min(1, c * (1 - k) + k));
      const g = 255 * (1 - Math.min(1, m * (1 - k) + k));
      const b = 255 * (1 - Math.min(1, y * (1 - k) + k));

      // Form the color and return it
      const color = new Color(r, g, b);
      return color
    } else {
      return this
    }
  }

  lab () {
    // Get the xyz color
    const { x, y, z } = this.xyz();

    // Get the lab components
    const l = (116 * y) - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    // Construct and return a new color
    const color = new Color(l, a, b, 'lab');
    return color
  }

  xyz () {

    // Normalise the red, green and blue values
    const { _a: r255, _b: g255, _c: b255 } = this.rgb();
    const [ r, g, b ] = [ r255, g255, b255 ].map(v => v / 255);

    // Convert to the lab rgb space
    const rL = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    const gL = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    const bL = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    // Convert to the xyz color space without bounding the values
    const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
    const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000;
    const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883;

    // Get the proper xyz values by applying the bounding
    const x = (xU > 0.008856) ? Math.pow(xU, 1 / 3) : (7.787 * xU) + 16 / 116;
    const y = (yU > 0.008856) ? Math.pow(yU, 1 / 3) : (7.787 * yU) + 16 / 116;
    const z = (zU > 0.008856) ? Math.pow(zU, 1 / 3) : (7.787 * zU) + 16 / 116;

    // Make and return the color
    const color = new Color(x, y, z, 'xyz');
    return color
  }

  lch () {

    // Get the lab color directly
    const { l, a, b } = this.lab();

    // Get the chromaticity and the hue using polar coordinates
    const c = Math.sqrt(a ** 2 + b ** 2);
    let h = 180 * Math.atan2(b, a) / Math.PI;
    if (h < 0) {
      h *= -1;
      h = 360 - h;
    }

    // Make a new color and return it
    const color = new Color(l, c, h, 'lch');
    return color
  }

  hsl () {

    // Get the rgb values
    const { _a, _b, _c } = this.rgb();
    const [ r, g, b ] = [ _a, _b, _c ].map(v => v / 255);

    // Find the maximum and minimum values to get the lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    // If the r, g, v values are identical then we are grey
    const isGrey = max === min;

    // Calculate the hue and saturation
    const delta = max - min;
    const s = isGrey ? 0
      : l > 0.5 ? delta / (2 - max - min)
      : delta / (max + min);
    const h = isGrey ? 0
      : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6
      : max === g ? ((b - r) / delta + 2) / 6
      : max === b ? ((r - g) / delta + 4) / 6
      : 0;

    // Construct and return the new color
    const color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
    return color
  }

  cmyk () {

    // Get the rgb values for the current color
    const { _a, _b, _c } = this.rgb();
    const [ r, g, b ] = [ _a, _b, _c ].map(v => v / 255);

    // Get the cmyk values in an unbounded format
    const k = Math.min(1 - r, 1 - g, 1 - b);

    if (k === 1) {
      // Catch the black case
      return new Color(0, 0, 0, 1, 'cmyk')
    }

    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    // Construct the new color
    const color = new Color(c, m, y, k, 'cmyk');
    return color
  }

  /*
  Input and Output methods
  */

  _clamped () {
    const { _a, _b, _c } = this.rgb();
    const { max, min, round } = Math;
    const format = v => max(0, min(round(v), 255));
    return [ _a, _b, _c ].map(format)
  }

  toHex () {
    const [ r, g, b ] = this._clamped().map(componentHex);
    return `#${r}${g}${b}`
  }

  toString () {
    return this.toHex()
  }

  toRgb () {
    const [ rV, gV, bV ] = this._clamped();
    const string = `rgb(${rV},${gV},${bV})`;
    return string
  }

  toArray () {
    const { _a, _b, _c, _d, space } = this;
    return [ _a, _b, _c, _d, space ]
  }

  /*
  Generating random colors
  */

  static random (mode = 'vibrant', t, u) {

    // Get the math modules
    const { random, round, sin, PI: pi } = Math;

    // Run the correct generator
    if (mode === 'vibrant') {

      const l = (81 - 57) * random() + 57;
      const c = (83 - 45) * random() + 45;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color

    } else if (mode === 'sine') {

      t = t == null ? random() : t;
      const r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
      const g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
      const b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);
      const color = new Color(r, g, b);
      return color

    } else if (mode === 'pastel') {

      const l = (94 - 86) * random() + 86;
      const c = (26 - 9) * random() + 9;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color

    } else if (mode === 'dark') {

      const l = 10 + 10 * random();
      const c = (125 - 75) * random() + 86;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color

    } else if (mode === 'rgb') {

      const r = 255 * random();
      const g = 255 * random();
      const b = 255 * random();
      const color = new Color(r, g, b);
      return color

    } else if (mode === 'lab') {

      const l = 100 * random();
      const a = 256 * random() - 128;
      const b = 256 * random() - 128;
      const color = new Color(l, a, b, 'lab');
      return color

    } else if (mode === 'grey') {

      const grey = 255 * random();
      const color = new Color(grey, grey, grey);
      return color

    }
  }

  /*
  Constructing colors
  */

  // Test if given value is a color string
  static test (color) {
    return (typeof color === 'string')
      && (isHex.test(color) || isRgb.test(color))
  }

  // Test if given value is an rgb object
  static isRgb (color) {
    return color && typeof color.r === 'number'
      && typeof color.g === 'number'
      && typeof color.b === 'number'
  }

  // Test if given value is a color
  static isColor (color) {
    return color && (
      color instanceof Color
      || this.isRgb(color)
      || this.test(color)
    )
  }
}

class Point {
  // Initialize
  constructor (...args) {
    this.init(...args);
  }

  init (x, y) {
    const base = { x: 0, y: 0 };

    // ensure source as object
    const source = Array.isArray(x) ? { x: x[0], y: x[1] }
      : typeof x === 'object' ? { x: x.x, y: x.y }
      : { x: x, y: y };

    // merge source
    this.x = source.x == null ? base.x : source.x;
    this.y = source.y == null ? base.y : source.y;

    return this
  }

  // Clone point
  clone () {
    return new Point(this)
  }

  transform (m) {
    return this.clone().transformO(m)
  }

  // Transform point with matrix
  transformO (m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }

    const { x, y } = this;

    // Perform the matrix multiplication
    this.x = m.a * x + m.c * y + m.e;
    this.y = m.b * x + m.d * y + m.f;

    return this
  }

  toArray () {
    return [ this.x, this.y ]
  }
}

function point (x, y) {
  return new Point(x, y).transform(this.screenCTM().inverse())
}

function closeEnough (a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6)
}

class Matrix {
  constructor (...args) {
    this.init(...args);
  }

  // Initialize
  init (source) {
    var base = Matrix.fromArray([ 1, 0, 0, 1, 0, 0 ]);

    // ensure source as object
    source = source instanceof Element ? source.matrixify()
      : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat))
      : Array.isArray(source) ? Matrix.fromArray(source)
      : (typeof source === 'object' && Matrix.isMatrixLike(source)) ? source
      : (typeof source === 'object') ? new Matrix().transform(source)
      : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments))
      : base;

    // Merge the source matrix with the base matrix
    this.a = source.a != null ? source.a : base.a;
    this.b = source.b != null ? source.b : base.b;
    this.c = source.c != null ? source.c : base.c;
    this.d = source.d != null ? source.d : base.d;
    this.e = source.e != null ? source.e : base.e;
    this.f = source.f != null ? source.f : base.f;

    return this
  }

  // Clones this matrix
  clone () {
    return new Matrix(this)
  }

  // Transform a matrix into another matrix by manipulating the space
  transform (o) {
    // Check if o is a matrix and then left multiply it directly
    if (Matrix.isMatrixLike(o)) {
      var matrix = new Matrix(o);
      return matrix.multiplyO(this)
    }

    // Get the proposed transformations and the current transformations
    var t = Matrix.formatTransforms(o);
    var current = this;
    const { x: ox, y: oy } = new Point(t.ox, t.oy).transform(current);

    // Construct the resulting matrix
    var transformer = new Matrix()
      .translateO(t.rx, t.ry)
      .lmultiplyO(current)
      .translateO(-ox, -oy)
      .scaleO(t.scaleX, t.scaleY)
      .skewO(t.skewX, t.skewY)
      .shearO(t.shear)
      .rotateO(t.theta)
      .translateO(ox, oy);

    // If we want the origin at a particular place, we force it there
    if (isFinite(t.px) || isFinite(t.py)) {
      const origin = new Point(ox, oy).transform(transformer);
      // TODO: Replace t.px with isFinite(t.px)
      const dx = t.px ? t.px - origin.x : 0;
      const dy = t.py ? t.py - origin.y : 0;
      transformer.translateO(dx, dy);
    }

    // Translate now after positioning
    transformer.translateO(t.tx, t.ty);
    return transformer
  }

  // Applies a matrix defined by its affine parameters
  compose (o) {
    if (o.origin) {
      o.originX = o.origin[0];
      o.originY = o.origin[1];
    }
    // Get the parameters
    var ox = o.originX || 0;
    var oy = o.originY || 0;
    var sx = o.scaleX || 1;
    var sy = o.scaleY || 1;
    var lam = o.shear || 0;
    var theta = o.rotate || 0;
    var tx = o.translateX || 0;
    var ty = o.translateY || 0;

    // Apply the standard matrix
    var result = new Matrix()
      .translateO(-ox, -oy)
      .scaleO(sx, sy)
      .shearO(lam)
      .rotateO(theta)
      .translateO(tx, ty)
      .lmultiplyO(this)
      .translateO(ox, oy);
    return result
  }

  // Decomposes this matrix into its affine parameters
  decompose (cx = 0, cy = 0) {
    // Get the parameters from the matrix
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;
    var e = this.e;
    var f = this.f;

    // Figure out if the winding direction is clockwise or counterclockwise
    var determinant = a * d - b * c;
    var ccw = determinant > 0 ? 1 : -1;

    // Since we only shear in x, we can use the x basis to get the x scale
    // and the rotation of the resulting matrix
    var sx = ccw * Math.sqrt(a * a + b * b);
    var thetaRad = Math.atan2(ccw * b, ccw * a);
    var theta = 180 / Math.PI * thetaRad;
    var ct = Math.cos(thetaRad);
    var st = Math.sin(thetaRad);

    // We can then solve the y basis vector simultaneously to get the other
    // two affine parameters directly from these parameters
    var lam = (a * c + b * d) / determinant;
    var sy = ((c * sx) / (lam * a - b)) || ((d * sx) / (lam * b + a));

    // Use the translations
    const tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
    const ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy);

    // Construct the decomposition and return it
    return {
      // Return the affine parameters
      scaleX: sx,
      scaleY: sy,
      shear: lam,
      rotate: theta,
      translateX: tx,
      translateY: ty,
      originX: cx,
      originY: cy,

      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    }
  }

  // Left multiplies by the given matrix
  multiply (matrix) {
    return this.clone().multiplyO(matrix)
  }

  multiplyO (matrix) {
    // Get the matrices
    var l = this;
    var r = matrix instanceof Matrix
      ? matrix
      : new Matrix(matrix);

    return Matrix.matrixMultiply(l, r, this)
  }

  lmultiply (matrix) {
    return this.clone().lmultiplyO(matrix)
  }

  lmultiplyO (matrix) {
    var r = this;
    var l = matrix instanceof Matrix
      ? matrix
      : new Matrix(matrix);

    return Matrix.matrixMultiply(l, r, this)
  }

  // Inverses matrix
  inverseO () {
    // Get the current parameters out of the matrix
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var d = this.d;
    var e = this.e;
    var f = this.f;

    // Invert the 2x2 matrix in the top left
    var det = a * d - b * c;
    if (!det) throw new Error('Cannot invert ' + this)

    // Calculate the top 2x2 matrix
    var na = d / det;
    var nb = -b / det;
    var nc = -c / det;
    var nd = a / det;

    // Apply the inverted matrix to the top right
    var ne = -(na * e + nc * f);
    var nf = -(nb * e + nd * f);

    // Construct the inverted matrix
    this.a = na;
    this.b = nb;
    this.c = nc;
    this.d = nd;
    this.e = ne;
    this.f = nf;

    return this
  }

  inverse () {
    return this.clone().inverseO()
  }

  // Translate matrix
  translate (x, y) {
    return this.clone().translateO(x, y)
  }

  translateO (x, y) {
    this.e += x || 0;
    this.f += y || 0;
    return this
  }

  // Scale matrix
  scale (x, y, cx, cy) {
    return this.clone().scaleO(...arguments)
  }

  scaleO (x, y = x, cx = 0, cy = 0) {
    // Support uniform scaling
    if (arguments.length === 3) {
      cy = cx;
      cx = y;
      y = x;
    }

    const { a, b, c, d, e, f } = this;

    this.a = a * x;
    this.b = b * y;
    this.c = c * x;
    this.d = d * y;
    this.e = e * x - cx * x + cx;
    this.f = f * y - cy * y + cy;

    return this
  }

  // Rotate matrix
  rotate (r, cx, cy) {
    return this.clone().rotateO(r, cx, cy)
  }

  rotateO (r, cx = 0, cy = 0) {
    // Convert degrees to radians
    r = radians(r);

    const cos = Math.cos(r);
    const sin = Math.sin(r);

    const { a, b, c, d, e, f } = this;

    this.a = a * cos - b * sin;
    this.b = b * cos + a * sin;
    this.c = c * cos - d * sin;
    this.d = d * cos + c * sin;
    this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
    this.f = f * cos + e * sin - cx * sin - cy * cos + cy;

    return this
  }

  // Flip matrix on x or y, at a given offset
  flip (axis, around) {
    return this.clone().flipO(axis, around)
  }

  flipO (axis, around) {
    return axis === 'x' ? this.scaleO(-1, 1, around, 0)
      : axis === 'y' ? this.scaleO(1, -1, 0, around)
      : this.scaleO(-1, -1, axis, around || axis) // Define an x, y flip point
  }

  // Shear matrix
  shear (a, cx, cy) {
    return this.clone().shearO(a, cx, cy)
  }

  shearO (lx, cx = 0, cy = 0) {
    const { a, b, c, d, e, f } = this;

    this.a = a + b * lx;
    this.c = c + d * lx;
    this.e = e + f * lx - cy * lx;

    return this
  }

  // Skew Matrix
  skew (x, y, cx, cy) {
    return this.clone().skewO(...arguments)
  }

  skewO (x, y = x, cx = 0, cy = 0) {
    // support uniformal skew
    if (arguments.length === 3) {
      cy = cx;
      cx = y;
      y = x;
    }

    // Convert degrees to radians
    x = radians(x);
    y = radians(y);

    const lx = Math.tan(x);
    const ly = Math.tan(y);

    const { a, b, c, d, e, f } = this;

    this.a = a + b * lx;
    this.b = b + a * ly;
    this.c = c + d * lx;
    this.d = d + c * ly;
    this.e = e + f * lx - cy * lx;
    this.f = f + e * ly - cx * ly;

    return this
  }

  // SkewX
  skewX (x, cx, cy) {
    return this.skew(x, 0, cx, cy)
  }

  skewXO (x, cx, cy) {
    return this.skewO(x, 0, cx, cy)
  }

  // SkewY
  skewY (y, cx, cy) {
    return this.skew(0, y, cx, cy)
  }

  skewYO (y, cx, cy) {
    return this.skewO(0, y, cx, cy)
  }

  // Transform around a center point
  aroundO (cx, cy, matrix) {
    var dx = cx || 0;
    var dy = cy || 0;
    return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy)
  }

  around (cx, cy, matrix) {
    return this.clone().aroundO(cx, cy, matrix)
  }

  // Check if two matrices are equal
  equals (other) {
    var comp = new Matrix(other);
    return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b)
      && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d)
      && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f)
  }

  // Convert matrix to string
  toString () {
    return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')'
  }

  toArray () {
    return [ this.a, this.b, this.c, this.d, this.e, this.f ]
  }

  valueOf () {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    }
  }

  static fromArray (a) {
    return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
  }

  static isMatrixLike (o) {
    return (
      o.a != null
      || o.b != null
      || o.c != null
      || o.d != null
      || o.e != null
      || o.f != null
    )
  }

  static formatTransforms (o) {
    // Get all of the parameters required to form the matrix
    var flipBoth = o.flip === 'both' || o.flip === true;
    var flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
    var flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
    var skewX = o.skew && o.skew.length ? o.skew[0]
      : isFinite(o.skew) ? o.skew
      : isFinite(o.skewX) ? o.skewX
      : 0;
    var skewY = o.skew && o.skew.length ? o.skew[1]
      : isFinite(o.skew) ? o.skew
      : isFinite(o.skewY) ? o.skewY
      : 0;
    var scaleX = o.scale && o.scale.length ? o.scale[0] * flipX
      : isFinite(o.scale) ? o.scale * flipX
      : isFinite(o.scaleX) ? o.scaleX * flipX
      : flipX;
    var scaleY = o.scale && o.scale.length ? o.scale[1] * flipY
      : isFinite(o.scale) ? o.scale * flipY
      : isFinite(o.scaleY) ? o.scaleY * flipY
      : flipY;
    var shear = o.shear || 0;
    var theta = o.rotate || o.theta || 0;
    var origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
    var ox = origin.x;
    var oy = origin.y;
    var position = new Point(o.position || o.px || o.positionX, o.py || o.positionY);
    var px = position.x;
    var py = position.y;
    var translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
    var tx = translate.x;
    var ty = translate.y;
    var relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
    var rx = relative.x;
    var ry = relative.y;

    // Populate all of the values
    return {
      scaleX, scaleY, skewX, skewY, shear, theta, rx, ry, tx, ty, ox, oy, px, py
    }
  }

  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply (l, r, o) {
    // Work out the product directly
    var a = l.a * r.a + l.c * r.b;
    var b = l.b * r.a + l.d * r.b;
    var c = l.a * r.c + l.c * r.d;
    var d = l.b * r.c + l.d * r.d;
    var e = l.e + l.a * r.e + l.c * r.f;
    var f = l.f + l.b * r.e + l.d * r.f;

    // make sure to use local variables because l/r and o could be the same
    o.a = a;
    o.b = b;
    o.c = c;
    o.d = d;
    o.e = e;
    o.f = f;

    return o
  }
}

function ctm () {
  return new Matrix(this.node.getCTM())
}

function screenCTM () {
  /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
     This is needed because FF does not return the transformation matrix
     for the inner coordinate system when getScreenCTM() is called on nested svgs.
     However all other Browsers do that */
  if (typeof this.isRoot === 'function' && !this.isRoot()) {
    var rect = this.rect(1, 1);
    var m = rect.node.getScreenCTM();
    rect.remove();
    return new Matrix(m)
  }
  return new Matrix(this.node.getScreenCTM())
}

register(Matrix, 'Matrix');

function parser () {
  // Reuse cached element if possible
  if (!parser.nodes) {
    const svg = makeInstance().size(2, 0);
    svg.node.style.cssText = [
      'opacity: 0',
      'position: absolute',
      'left: -100%',
      'top: -100%',
      'overflow: hidden'
    ].join(';');

    svg.attr('focusable', 'false');
    svg.attr('aria-hidden', 'true');

    const path = svg.path().node;

    parser.nodes = { svg, path };
  }

  if (!parser.nodes.svg.node.parentNode) {
    const b = globals.document.body || globals.document.documentElement;
    parser.nodes.svg.addTo(b);
  }

  return parser.nodes
}

function isNulledBox (box) {
  return !box.width && !box.height && !box.x && !box.y
}

function domContains (node) {
  return node === globals.document
    || (globals.document.documentElement.contains || function (node) {
      // This is IE - it does not support contains() for top-level SVGs
      while (node.parentNode) {
        node = node.parentNode;
      }
      return node === globals.document
    }).call(globals.document.documentElement, node)
}

class Box {
  constructor (...args) {
    this.init(...args);
  }

  init (source) {
    var base = [ 0, 0, 0, 0 ];
    source = typeof source === 'string' ? source.split(delimiter).map(parseFloat)
      : Array.isArray(source) ? source
      : typeof source === 'object' ? [ source.left != null ? source.left
      : source.x, source.top != null ? source.top : source.y, source.width, source.height ]
      : arguments.length === 4 ? [].slice.call(arguments)
      : base;

    this.x = source[0] || 0;
    this.y = source[1] || 0;
    this.width = this.w = source[2] || 0;
    this.height = this.h = source[3] || 0;

    // Add more bounding box properties
    this.x2 = this.x + this.w;
    this.y2 = this.y + this.h;
    this.cx = this.x + this.w / 2;
    this.cy = this.y + this.h / 2;

    return this
  }

  // Merge rect box with another, return a new instance
  merge (box) {
    const x = Math.min(this.x, box.x);
    const y = Math.min(this.y, box.y);
    const width = Math.max(this.x + this.width, box.x + box.width) - x;
    const height = Math.max(this.y + this.height, box.y + box.height) - y;

    return new Box(x, y, width, height)
  }

  transform (m) {
    if (!(m instanceof Matrix)) {
      m = new Matrix(m);
    }

    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;

    const pts = [
      new Point(this.x, this.y),
      new Point(this.x2, this.y),
      new Point(this.x, this.y2),
      new Point(this.x2, this.y2)
    ];

    pts.forEach(function (p) {
      p = p.transform(m);
      xMin = Math.min(xMin, p.x);
      xMax = Math.max(xMax, p.x);
      yMin = Math.min(yMin, p.y);
      yMax = Math.max(yMax, p.y);
    });

    return new Box(
      xMin, yMin,
      xMax - xMin,
      yMax - yMin
    )
  }

  addOffset () {
    // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
    this.x += globals.window.pageXOffset;
    this.y += globals.window.pageYOffset;
    return this
  }

  toString () {
    return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
  }

  toArray () {
    return [ this.x, this.y, this.width, this.height ]
  }

  isNulled () {
    return isNulledBox(this)
  }
}

function getBox (cb, retry) {
  let box;

  try {
    box = cb(this.node);

    if (isNulledBox(box) && !domContains(this.node)) {
      throw new Error('Element not in the dom')
    }
  } catch (e) {
    box = retry(this);
  }

  return box
}

function bbox () {
  return new Box(getBox.call(this, (node) => node.getBBox(), (el) => {
    try {
      const clone = el.clone().addTo(parser().svg).show();
      const box = clone.node.getBBox();
      clone.remove();
      return box
    } catch (e) {
      throw new Error('Getting bbox of element "' + el.node.nodeName + '" is not possible. ' + e.toString())
    }
  }))
}

function rbox (el) {
  const box = new Box(getBox.call(this, (node) => node.getBoundingClientRect(), (el) => {
    throw new Error('Getting rbox of element "' + el.node.nodeName + '" is not possible')
  }));
  if (el) return box.transform(el.screenCTM().inverse())
  return box.addOffset()
}

registerMethods({
  viewbox: {
    viewbox (x, y, width, height) {
      // act as getter
      if (x == null) return new Box(this.attr('viewBox'))

      // act as setter
      return this.attr('viewBox', new Box(x, y, width, height))
    },

    zoom (level, point) {
      let width = this.node.clientWidth;
      let height = this.node.clientHeight;
      const v = this.viewbox();

      // Firefox does not support clientHeight and returns 0
      // https://bugzilla.mozilla.org/show_bug.cgi?id=874811
      if (!width && !height) {
        var style = window.getComputedStyle(this.node);
        width = parseFloat(style.getPropertyValue('width'));
        height = parseFloat(style.getPropertyValue('height'));
      }

      const zoomX = width / v.width;
      const zoomY = height / v.height;
      const zoom = Math.min(zoomX, zoomY);

      if (level == null) {
        return zoom
      }

      let zoomAmount = zoom / level;
      if (zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE;

      point = point || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);

      const box = new Box(v).transform(
        new Matrix({ scale: zoomAmount, origin: point })
      );

      return this.viewbox(box)
    }
  }
});

register(Box, 'Box');

/* eslint no-new-func: "off" */
const subClassArray = (function () {
  try {
    // try es6 subclassing
    return Function('name', 'baseClass', '_constructor', [
      'baseClass = baseClass || Array',
      'return {',
      '  [name]: class extends baseClass {',
      '    constructor (...args) {',
      '      super(...args)',
      '      _constructor && _constructor.apply(this, args)',
      '    }',
      '  }',
      '}[name]'
    ].join('\n'))
  } catch (e) {
    // Use es5 approach
    return (name, baseClass = Array, _constructor) => {
      const Arr = function () {
        baseClass.apply(this, arguments);
        _constructor && _constructor.apply(this, arguments);
      };

      Arr.prototype = Object.create(baseClass.prototype);
      Arr.prototype.constructor = Arr;

      Arr.prototype.map = function (fn) {
        const arr = new Arr();
        arr.push.apply(arr, Array.prototype.map.call(this, fn));
        return arr
      };

      return Arr
    }
  }
})();

const List = subClassArray('List', Array, function (arr = []) {
  // This catches the case, that native map tries to create an array with new Array(1)
  if (typeof arr === 'number') return this
  this.length = 0;
  this.push(...arr);
});

extend(List, {
  each (fnOrMethodName, ...args) {
    if (typeof fnOrMethodName === 'function') {
      return this.map((el) => {
        return fnOrMethodName.call(el, el)
      })
    } else {
      return this.map(el => {
        return el[fnOrMethodName](...args)
      })
    }
  },

  toArray () {
    return Array.prototype.concat.apply([], this)
  }
});

const reserved = [ 'toArray', 'constructor', 'each' ];

List.extend = function (methods) {
  methods = methods.reduce((obj, name) => {
    // Don't overwrite own methods
    if (reserved.includes(name)) return obj

    // Don't add private methods
    if (name[0] === '_') return obj

    // Relay every call to each()
    obj[name] = function (...attrs) {
      return this.each(name, ...attrs)
    };
    return obj
  }, {});

  extend(List, methods);
};

function baseFind (query, parent) {
  return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
    return adopt(node)
  }))
}

// Scoped find method
function find (query) {
  return baseFind(query, this.node)
}

function findOne (query) {
  return adopt(this.node.querySelector(query))
}

class EventTarget extends Base {
  constructor ({ events = {} } = {}) {
    super();
    this.events = events;
  }

  addEventListener () {}

  dispatch (event, data) {
    return dispatch(this, event, data)
  }

  dispatchEvent (event) {
    const bag = this.getEventHolder().events;
    if (!bag) return true

    const events = bag[event.type];

    for (const i in events) {
      for (const j in events[i]) {
        events[i][j](event);
      }
    }

    return !event.defaultPrevented
  }

  // Fire given event
  fire (event, data) {
    this.dispatch(event, data);
    return this
  }

  getEventHolder () {
    return this
  }

  getEventTarget () {
    return this
  }

  // Unbind event from listener
  off (event, listener) {
    off(this, event, listener);
    return this
  }

  // Bind given event to listener
  on (event, listener, binding, options) {
    on(this, event, listener, binding, options);
    return this
  }

  removeEventListener () {}
}

register(EventTarget, 'EventTarget');

function noop () {}

// Default animation values
const timeline = {
  duration: 400,
  ease: '>',
  delay: 0
};

// Default attribute values
const attrs = {

  // fill and stroke
  'fill-opacity': 1,
  'stroke-opacity': 1,
  'stroke-width': 0,
  'stroke-linejoin': 'miter',
  'stroke-linecap': 'butt',
  fill: '#000000',
  stroke: '#000000',
  opacity: 1,

  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,

  // size
  width: 0,
  height: 0,

  // radius
  r: 0,
  rx: 0,
  ry: 0,

  // gradient
  offset: 0,
  'stop-opacity': 1,
  'stop-color': '#000000',

  // text
  'text-anchor': 'start'
};

const SVGArray = subClassArray('SVGArray', Array, function (arr) {
  this.init(arr);
});

extend(SVGArray, {
  init (arr) {
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this
    this.length = 0;
    this.push(...this.parse(arr));
    return this
  },

  toArray () {
    return Array.prototype.concat.apply([], this)
  },

  toString () {
    return this.join(' ')
  },

  // Flattens the array if needed
  valueOf () {
    const ret = [];
    ret.push(...this);
    return ret
  },

  // Parse whitespace separated string
  parse (array = []) {
    // If already is an array, no need to parse it
    if (array instanceof Array) return array

    return array.trim().split(delimiter).map(parseFloat)
  },

  clone () {
    return new this.constructor(this)
  },

  toSet () {
    return new Set(this)
  }
});

// Module for unit convertions
class SVGNumber {
  // Initialize
  constructor (...args) {
    this.init(...args);
  }

  init (value, unit) {
    unit = Array.isArray(value) ? value[1] : unit;
    value = Array.isArray(value) ? value[0] : value;

    // initialize defaults
    this.value = 0;
    this.unit = unit || '';

    // parse value
    if (typeof value === 'number') {
      // ensure a valid numeric value
      this.value = isNaN(value) ? 0 : !isFinite(value) ? (value < 0 ? -3.4e+38 : +3.4e+38) : value;
    } else if (typeof value === 'string') {
      unit = value.match(numberAndUnit);

      if (unit) {
        // make value numeric
        this.value = parseFloat(unit[1]);

        // normalize
        if (unit[5] === '%') {
          this.value /= 100;
        } else if (unit[5] === 's') {
          this.value *= 1000;
        }

        // store unit
        this.unit = unit[5];
      }
    } else {
      if (value instanceof SVGNumber) {
        this.value = value.valueOf();
        this.unit = value.unit;
      }
    }

    return this
  }

  toString () {
    return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6
      : this.unit === 's' ? this.value / 1e3
      : this.value
    ) + this.unit
  }

  toJSON () {
    return this.toString()
  }

  toArray () {
    return [ this.value, this.unit ]
  }

  valueOf () {
    return this.value
  }

  // Add number
  plus (number) {
    number = new SVGNumber(number);
    return new SVGNumber(this + number, this.unit || number.unit)
  }

  // Subtract number
  minus (number) {
    number = new SVGNumber(number);
    return new SVGNumber(this - number, this.unit || number.unit)
  }

  // Multiply number
  times (number) {
    number = new SVGNumber(number);
    return new SVGNumber(this * number, this.unit || number.unit)
  }

  // Divide number
  divide (number) {
    number = new SVGNumber(number);
    return new SVGNumber(this / number, this.unit || number.unit)
  }

  convert (unit) {
    return new SVGNumber(this.value, unit)
  }
}

const hooks = [];
function registerAttrHook (fn) {
  hooks.push(fn);
}

// Set svg element attribute
function attr (attr, val, ns) {
  // act as full getter
  if (attr == null) {
    // get an object of attributes
    attr = {};
    val = this.node.attributes;

    for (const node of val) {
      attr[node.nodeName] = isNumber.test(node.nodeValue)
        ? parseFloat(node.nodeValue)
        : node.nodeValue;
    }

    return attr
  } else if (attr instanceof Array) {
    // loop through array and get all values
    return attr.reduce((last, curr) => {
      last[curr] = this.attr(curr);
      return last
    }, {})
  } else if (typeof attr === 'object' && attr.constructor === Object) {
    // apply every attribute individually if an object is passed
    for (val in attr) this.attr(val, attr[val]);
  } else if (val === null) {
    // remove value
    this.node.removeAttribute(attr);
  } else if (val == null) {
    // act as a getter if the first and only argument is not an object
    val = this.node.getAttribute(attr);
    return val == null ? attrs[attr]
      : isNumber.test(val) ? parseFloat(val)
      : val
  } else {
    // Loop through hooks and execute them to convert value
    val = hooks.reduce((_val, hook) => {
      return hook(attr, _val, this)
    }, val);

    // ensure correct numeric values (also accepts NaN and Infinity)
    if (typeof val === 'number') {
      val = new SVGNumber(val);
    } else if (Color.isColor(val)) {
      // ensure full hex color
      val = new Color(val);
    } else if (val.constructor === Array) {
      // Check for plain arrays and parse array values
      val = new SVGArray(val);
    }

    // if the passed attribute is leading...
    if (attr === 'leading') {
      // ... call the leading method instead
      if (this.leading) {
        this.leading(val);
      }
    } else {
      // set given attribute on node
      typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString())
        : this.node.setAttribute(attr, val.toString());
    }

    // rebuild if required
    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
      this.rebuild();
    }
  }

  return this
}

class Dom extends EventTarget {
  constructor (node, attrs) {
    super(node);
    this.node = node;
    this.type = node.nodeName;

    if (attrs && node !== attrs) {
      this.attr(attrs);
    }
  }

  // Add given element at a position
  add (element, i) {
    element = makeInstance(element);

    if (i == null) {
      this.node.appendChild(element.node);
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i]);
    }

    return this
  }

  // Add element to given container and return self
  addTo (parent) {
    return makeInstance(parent).put(this)
  }

  // Returns all child elements
  children () {
    return new List(map(this.node.children, function (node) {
      return adopt(node)
    }))
  }

  // Remove all elements in this container
  clear () {
    // remove children
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }

    return this
  }

  // Clone element
  clone () {
    // write dom data to the dom so the clone can pickup the data
    this.writeDataToDom();

    // clone element and assign new id
    return assignNewId(this.node.cloneNode(true))
  }

  // Iterates over all children and invokes a given block
  each (block, deep) {
    var children = this.children();
    var i, il;

    for (i = 0, il = children.length; i < il; i++) {
      block.apply(children[i], [ i, children ]);

      if (deep) {
        children[i].each(block, deep);
      }
    }

    return this
  }

  element (nodeName) {
    return this.put(new Dom(create(nodeName)))
  }

  // Get first child
  first () {
    return adopt(this.node.firstChild)
  }

  // Get a element at the given index
  get (i) {
    return adopt(this.node.childNodes[i])
  }

  getEventHolder () {
    return this.node
  }

  getEventTarget () {
    return this.node
  }

  // Checks if the given element is a child
  has (element) {
    return this.index(element) >= 0
  }

  // Get / set id
  id (id) {
    // generate new id if no id set
    if (typeof id === 'undefined' && !this.node.id) {
      this.node.id = eid(this.type);
    }

    // dont't set directly width this.node.id to make `null` work correctly
    return this.attr('id', id)
  }

  // Gets index of given element
  index (element) {
    return [].slice.call(this.node.childNodes).indexOf(element.node)
  }

  // Get the last child
  last () {
    return adopt(this.node.lastChild)
  }

  // matches the element vs a css selector
  matches (selector) {
    const el = this.node;
    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector)
  }

  // Returns the parent element instance
  parent (type) {
    var parent = this;

    // check for parent
    if (!parent.node.parentNode) return null

    // get parent element
    parent = adopt(parent.node.parentNode);

    if (!type) return parent

    // loop trough ancestors if type is given
    while (parent) {
      if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent
      if (!parent.node.parentNode || parent.node.parentNode.nodeName === '#document' || parent.node.parentNode.nodeName === '#document-fragment') return null // #759, #720
      parent = adopt(parent.node.parentNode);
    }
  }

  // Basically does the same as `add()` but returns the added element instead
  put (element, i) {
    this.add(element, i);
    return element
  }

  // Add element to given container and return container
  putIn (parent) {
    return makeInstance(parent).add(this)
  }

  // Remove element
  remove () {
    if (this.parent()) {
      this.parent().removeElement(this);
    }

    return this
  }

  // Remove a given child
  removeElement (element) {
    this.node.removeChild(element.node);

    return this
  }

  // Replace this with element
  replace (element) {
    element = makeInstance(element);
    this.node.parentNode.replaceChild(element.node, this.node);
    return element
  }

  round (precision = 2, map) {
    const factor = 10 ** precision;
    const attrs = this.attr();

    // If we have no map, build one from attrs
    if (!map) {
      map = Object.keys(attrs);
    }

    // Holds rounded attributes
    const newAttrs = {};
    map.forEach((key) => {
      newAttrs[key] = Math.round(attrs[key] * factor) / factor;
    });

    this.attr(newAttrs);
    return this
  }

  // Return id on string conversion
  toString () {
    return this.id()
  }

  // Import raw svg
  svg (svgOrFn, outerHTML) {
    var well, len, fragment;

    if (svgOrFn === false) {
      outerHTML = false;
      svgOrFn = null;
    }

    // act as getter if no svg string is given
    if (svgOrFn == null || typeof svgOrFn === 'function') {
      // The default for exports is, that the outerNode is included
      outerHTML = outerHTML == null ? true : outerHTML;

      // write svgjs data to the dom
      this.writeDataToDom();
      let current = this;

      // An export modifier was passed
      if (svgOrFn != null) {
        current = adopt(current.node.cloneNode(true));

        // If the user wants outerHTML we need to process this node, too
        if (outerHTML) {
          const result = svgOrFn(current);
          current = result || current;

          // The user does not want this node? Well, then he gets nothing
          if (result === false) return ''
        }

        // Deep loop through all children and apply modifier
        current.each(function () {
          const result = svgOrFn(this);
          const _this = result || this;

          // If modifier returns false, discard node
          if (result === false) {
            this.remove();

            // If modifier returns new node, use it
          } else if (result && this !== _this) {
            this.replace(_this);
          }
        }, true);
      }

      // Return outer or inner content
      return outerHTML
        ? current.node.outerHTML
        : current.node.innerHTML
    }

    // Act as setter if we got a string

    // The default for import is, that the current node is not replaced
    outerHTML = outerHTML == null ? false : outerHTML;

    // Create temporary holder
    well = globals.document.createElementNS(ns, 'svg');
    fragment = globals.document.createDocumentFragment();

    // Dump raw svg
    well.innerHTML = svgOrFn;

    // Transplant nodes into the fragment
    for (len = well.children.length; len--;) {
      fragment.appendChild(well.firstElementChild);
    }

    const parent = this.parent();

    // Add the whole fragment at once
    return outerHTML
      ? this.replace(fragment) && parent
      : this.add(fragment)
  }

  words (text) {
    // This is faster than removing all children and adding a new one
    this.node.textContent = text;
    return this
  }

  // write svgjs data to the dom
  writeDataToDom () {
    // dump variables recursively
    this.each(function () {
      this.writeDataToDom();
    });

    return this
  }
}

extend(Dom, { attr, find, findOne });
register(Dom, 'Dom');

class Element extends Dom {
  constructor (node, attrs) {
    super(node, attrs);

    // initialize data object
    this.dom = {};

    // create circular reference
    this.node.instance = this;

    if (node.hasAttribute('svgjs:data')) {
      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
      this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});
    }
  }

  // Move element by its center
  center (x, y) {
    return this.cx(x).cy(y)
  }

  // Move by center over x-axis
  cx (x) {
    return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2)
  }

  // Move by center over y-axis
  cy (y) {
    return y == null
      ? this.y() + this.height() / 2
      : this.y(y - this.height() / 2)
  }

  // Get defs
  defs () {
    return this.root().defs()
  }

  // Relative move over x and y axes
  dmove (x, y) {
    return this.dx(x).dy(y)
  }

  // Relative move over x axis
  dx (x = 0) {
    return this.x(new SVGNumber(x).plus(this.x()))
  }

  // Relative move over y axis
  dy (y = 0) {
    return this.y(new SVGNumber(y).plus(this.y()))
  }

  // Get parent document
  root () {
    const p = this.parent(getClass(root));
    return p && p.root()
  }

  getEventHolder () {
    return this
  }

  // Set height of element
  height (height) {
    return this.attr('height', height)
  }

  // Checks whether the given point inside the bounding box of the element
  inside (x, y) {
    const box = this.bbox();

    return x > box.x
      && y > box.y
      && x < box.x + box.width
      && y < box.y + box.height
  }

  // Move element to given x and y values
  move (x, y) {
    return this.x(x).y(y)
  }

  // return array of all ancestors of given type up to the root svg
  parents (until = globals.document) {
    until = makeInstance(until);
    const parents = new List();
    let parent = this;

    while (
      (parent = parent.parent())
      && parent.node !== until.node
      && parent.node !== globals.document
    ) {
      parents.push(parent);
    }

    return parents
  }

  // Get referenced element form attribute value
  reference (attr) {
    attr = this.attr(attr);
    if (!attr) return null

    const m = attr.match(reference);
    return m ? makeInstance(m[1]) : null
  }

  // set given data to the elements data property
  setData (o) {
    this.dom = o;
    return this
  }

  // Set element size to given width and height
  size (width, height) {
    const p = proportionalSize(this, width, height);

    return this
      .width(new SVGNumber(p.width))
      .height(new SVGNumber(p.height))
  }

  // Set width of element
  width (width) {
    return this.attr('width', width)
  }

  // write svgjs data to the dom
  writeDataToDom () {
    // remove previously set data
    this.node.removeAttribute('svgjs:data');

    if (Object.keys(this.dom).length) {
      this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)); // see #428
    }

    return super.writeDataToDom()
  }

  // Move over x-axis
  x (x) {
    return this.attr('x', x)
  }

  // Move over y-axis
  y (y) {
    return this.attr('y', y)
  }
}

extend(Element, {
  bbox, rbox, point, ctm, screenCTM
});

register(Element, 'Element');

// Define list of available attributes for stroke and fill
var sugar = {
  stroke: [ 'color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset' ],
  fill: [ 'color', 'opacity', 'rule' ],
  prefix: function (t, a) {
    return a === 'color' ? t : t + '-' + a
  }
}

// Add sugar for fill and stroke
;[ 'fill', 'stroke' ].forEach(function (m) {
  var extension = {};
  var i;

  extension[m] = function (o) {
    if (typeof o === 'undefined') {
      return this.attr(m)
    }
    if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || (o instanceof Element)) {
      this.attr(m, o);
    } else {
      // set all attributes from sugar.fill and sugar.stroke list
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }
      }
    }

    return this
  };

  registerMethods([ 'Element', 'Runner' ], extension);
});

registerMethods([ 'Element', 'Runner' ], {
  // Let the user set the matrix directly
  matrix: function (mat, b, c, d, e, f) {
    // Act as a getter
    if (mat == null) {
      return new Matrix(this)
    }

    // Act as a setter, the user can pass a matrix or a set of numbers
    return this.attr('transform', new Matrix(mat, b, c, d, e, f))
  },

  // Map rotation to transform
  rotate: function (angle, cx, cy) {
    return this.transform({ rotate: angle, ox: cx, oy: cy }, true)
  },

  // Map skew to transform
  skew: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3
      ? this.transform({ skew: x, ox: y, oy: cx }, true)
      : this.transform({ skew: [ x, y ], ox: cx, oy: cy }, true)
  },

  shear: function (lam, cx, cy) {
    return this.transform({ shear: lam, ox: cx, oy: cy }, true)
  },

  // Map scale to transform
  scale: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3
      ? this.transform({ scale: x, ox: y, oy: cx }, true)
      : this.transform({ scale: [ x, y ], ox: cx, oy: cy }, true)
  },

  // Map translate to transform
  translate: function (x, y) {
    return this.transform({ translate: [ x, y ] }, true)
  },

  // Map relative translations to transform
  relative: function (x, y) {
    return this.transform({ relative: [ x, y ] }, true)
  },

  // Map flip to transform
  flip: function (direction, around) {
    var directionString = typeof direction === 'string' ? direction
      : isFinite(direction) ? 'both'
      : 'both';
    var origin = (direction === 'both' && isFinite(around)) ? [ around, around ]
      : (direction === 'x') ? [ around, 0 ]
      : (direction === 'y') ? [ 0, around ]
      : isFinite(direction) ? [ direction, direction ]
      : [ 0, 0 ];
    return this.transform({ flip: directionString, origin: origin }, true)
  },

  // Opacity
  opacity: function (value) {
    return this.attr('opacity', value)
  }
});

registerMethods('radius', {
  // Add x and y radius
  radius: function (x, y) {
    var type = (this._element || this).type;
    return type === 'radialGradient' || type === 'radialGradient'
      ? this.attr('r', new SVGNumber(x))
      : this.rx(x).ry(y == null ? x : y)
  }
});

registerMethods('Path', {
  // Get path length
  length: function () {
    return this.node.getTotalLength()
  },
  // Get point at length
  pointAt: function (length) {
    return new Point(this.node.getPointAtLength(length))
  }
});

registerMethods([ 'Element', 'Runner' ], {
  // Set font
  font: function (a, v) {
    if (typeof a === 'object') {
      for (v in a) this.font(v, a[v]);
      return this
    }

    return a === 'leading'
      ? this.leading(v)
      : a === 'anchor'
        ? this.attr('text-anchor', v)
        : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style'
          ? this.attr('font-' + a, v)
          : this.attr(a, v)
  }
});

registerMethods('Text', {
  ax (x) {
    return this.attr('x', x)
  },
  ay (y) {
    return this.attr('y', y)
  },
  amove (x, y) {
    return this.ax(x).ay(y)
  }
});

// Add events to elements
const methods = [ 'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'touchstart',
  'touchmove',
  'touchleave',
  'touchend',
  'touchcancel' ].reduce(function (last, event) {
  // add event to Element
  const fn = function (f) {
    if (f === null) {
      off(this, event);
    } else {
      on(this, event, f);
    }
    return this
  };

  last[event] = fn;
  return last
}, {});

registerMethods('Element', methods);

// Reset all transformations
function untransform () {
  return this.attr('transform', null)
}

// merge the whole transformation chain into one matrix and returns it
function matrixify () {
  var matrix = (this.attr('transform') || '')
    // split transformations
    .split(transforms).slice(0, -1).map(function (str) {
      // generate key => value pairs
      var kv = str.trim().split('(');
      return [ kv[0],
        kv[1].split(delimiter)
          .map(function (str) {
            return parseFloat(str)
          })
      ]
    })
    .reverse()
    // merge every transformation into one matrix
    .reduce(function (matrix, transform) {
      if (transform[0] === 'matrix') {
        return matrix.lmultiply(Matrix.fromArray(transform[1]))
      }
      return matrix[transform[0]].apply(matrix, transform[1])
    }, new Matrix());

  return matrix
}

// add an element to another parent without changing the visual representation on the screen
function toParent (parent) {
  if (this === parent) return this
  var ctm = this.screenCTM();
  var pCtm = parent.screenCTM().inverse();

  this.addTo(parent).untransform().transform(pCtm.multiply(ctm));

  return this
}

// same as above with parent equals root-svg
function toRoot () {
  return this.toParent(this.root())
}

// Add transformations
function transform (o, relative) {
  // Act as a getter if no object was passed
  if (o == null || typeof o === 'string') {
    var decomposed = new Matrix(this).decompose();
    return o == null ? decomposed : decomposed[o]
  }

  if (!Matrix.isMatrixLike(o)) {
    // Set the origin according to the defined transform
    o = { ...o, origin: getOrigin(o, this) };
  }

  // The user can pass a boolean, an Element or an Matrix or nothing
  var cleanRelative = relative === true ? this : (relative || false);
  var result = new Matrix(cleanRelative).transform(o);
  return this.attr('transform', result)
}

registerMethods('Element', {
  untransform, matrixify, toParent, toRoot, transform
});

// Radius x value
function rx (rx) {
  return this.attr('rx', rx)
}

// Radius y value
function ry (ry) {
  return this.attr('ry', ry)
}

// Move over x-axis
function x$1 (x) {
  return x == null
    ? this.cx() - this.rx()
    : this.cx(x + this.rx())
}

// Move over y-axis
function y$1 (y) {
  return y == null
    ? this.cy() - this.ry()
    : this.cy(y + this.ry())
}

// Move by center over x-axis
function cx (x) {
  return x == null
    ? this.attr('cx')
    : this.attr('cx', x)
}

// Move by center over y-axis
function cy (y) {
  return y == null
    ? this.attr('cy')
    : this.attr('cy', y)
}

// Set width of element
function width$1 (width) {
  return width == null
    ? this.rx() * 2
    : this.rx(new SVGNumber(width).divide(2))
}

// Set height of element
function height$1 (height) {
  return height == null
    ? this.ry() * 2
    : this.ry(new SVGNumber(height).divide(2))
}

var circled = /*#__PURE__*/Object.freeze({
    __proto__: null,
    rx: rx,
    ry: ry,
    x: x$1,
    y: y$1,
    cx: cx,
    cy: cy,
    width: width$1,
    height: height$1
});

class Shape$1 extends Element {}

register(Shape$1, 'Shape');

class Circle extends Shape$1 {
  constructor (node) {
    super(nodeOrNew('circle', node), node);
  }

  radius (r) {
    return this.attr('r', r)
  }

  // Radius x value
  rx (rx) {
    return this.attr('r', rx)
  }

  // Alias radius x value
  ry (ry) {
    return this.rx(ry)
  }

  size (size) {
    return this.radius(new SVGNumber(size).divide(2))
  }
}

extend(Circle, { x: x$1, y: y$1, cx, cy, width: width$1, height: height$1 });

registerMethods({
  Container: {
    // Create circle element
    circle: wrapWithAttrCheck(function (size) {
      return this.put(new Circle())
        .size(size)
        .move(0, 0)
    })
  }
});

register(Circle, 'Circle');

class Container extends Element {
  flatten (parent) {
    this.each(function () {
      if (this instanceof Container) return this.flatten(parent).ungroup(parent)
      return this.toParent(parent)
    });

    // we need this so that the root does not get removed
    this.node.firstElementChild || this.remove();

    return this
  }

  ungroup (parent) {
    parent = parent || this.parent();

    this.each(function () {
      return this.toParent(parent)
    });

    this.remove();

    return this
  }
}

register(Container, 'Container');

class Defs extends Container {
  constructor (node) {
    super(nodeOrNew('defs', node), node);
  }

  flatten () {
    return this
  }

  ungroup () {
    return this
  }
}

register(Defs, 'Defs');

class Ellipse extends Shape$1 {
  constructor (node) {
    super(nodeOrNew('ellipse', node), node);
  }

  size (width, height) {
    var p = proportionalSize(this, width, height);

    return this
      .rx(new SVGNumber(p.width).divide(2))
      .ry(new SVGNumber(p.height).divide(2))
  }
}

extend(Ellipse, circled);

registerMethods('Container', {
  // Create an ellipse
  ellipse: wrapWithAttrCheck(function (width = 0, height = width) {
    return this.put(new Ellipse()).size(width, height).move(0, 0)
  })
});

register(Ellipse, 'Ellipse');

class Stop extends Element {
  constructor (node) {
    super(nodeOrNew('stop', node), node);
  }

  // add color stops
  update (o) {
    if (typeof o === 'number' || o instanceof SVGNumber) {
      o = {
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      };
    }

    // set attributes
    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));

    return this
  }
}

register(Stop, 'Stop');

function from (x, y) {
  return (this._element || this).type === 'radialGradient'
    ? this.attr({ fx: new SVGNumber(x), fy: new SVGNumber(y) })
    : this.attr({ x1: new SVGNumber(x), y1: new SVGNumber(y) })
}

function to (x, y) {
  return (this._element || this).type === 'radialGradient'
    ? this.attr({ cx: new SVGNumber(x), cy: new SVGNumber(y) })
    : this.attr({ x2: new SVGNumber(x), y2: new SVGNumber(y) })
}

var gradiented = /*#__PURE__*/Object.freeze({
    __proto__: null,
    from: from,
    to: to
});

class Gradient extends Container {
  constructor (type, attrs) {
    super(
      nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type),
      attrs
    );
  }

  // Add a color stop
  stop (offset, color, opacity) {
    return this.put(new Stop()).update(offset, color, opacity)
  }

  // Update gradient
  update (block) {
    // remove all stops
    this.clear();

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this);
    }

    return this
  }

  // Return the fill id
  url () {
    return 'url(#' + this.id() + ')'
  }

  // Alias string convertion to fill
  toString () {
    return this.url()
  }

  // custom attr to handle transform
  attr (a, b, c) {
    if (a === 'transform') a = 'gradientTransform';
    return super.attr(a, b, c)
  }

  targets () {
    return baseFind('svg [fill*="' + this.id() + '"]')
  }

  bbox () {
    return new Box()
  }
}

extend(Gradient, gradiented);

registerMethods({
  Container: {
    // Create gradient element in defs
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.defs().gradient(type, block)
    })
  },
  // define gradient
  Defs: {
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.put(new Gradient(type)).update(block)
    })
  }
});

register(Gradient, 'Gradient');

class Pattern extends Container {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('pattern', node), node);
  }

  // Return the fill id
  url () {
    return 'url(#' + this.id() + ')'
  }

  // Update pattern by rebuilding
  update (block) {
    // remove content
    this.clear();

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this);
    }

    return this
  }

  // Alias string convertion to fill
  toString () {
    return this.url()
  }

  // custom attr to handle transform
  attr (a, b, c) {
    if (a === 'transform') a = 'patternTransform';
    return super.attr(a, b, c)
  }

  targets () {
    return baseFind('svg [fill*="' + this.id() + '"]')
  }

  bbox () {
    return new Box()
  }
}

registerMethods({
  Container: {
    // Create pattern element in defs
    pattern (...args) {
      return this.defs().pattern(...args)
    }
  },
  Defs: {
    pattern: wrapWithAttrCheck(function (width, height, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      })
    })
  }
});

register(Pattern, 'Pattern');

class Image extends Shape$1 {
  constructor (node) {
    super(nodeOrNew('image', node), node);
  }

  // (re)load image
  load (url, callback) {
    if (!url) return this

    var img = new globals.window.Image();

    on(img, 'load', function (e) {
      var p = this.parent(Pattern);

      // ensure image size
      if (this.width() === 0 && this.height() === 0) {
        this.size(img.width, img.height);
      }

      if (p instanceof Pattern) {
        // ensure pattern size if not set
        if (p.width() === 0 && p.height() === 0) {
          p.size(this.width(), this.height());
        }
      }

      if (typeof callback === 'function') {
        callback.call(this, e);
      }
    }, this);

    on(img, 'load error', function () {
      // dont forget to unbind memory leaking events
      off(img);
    });

    return this.attr('href', (img.src = url), xlink)
  }
}

registerAttrHook(function (attr, val, _this) {
  // convert image fill and stroke to patterns
  if (attr === 'fill' || attr === 'stroke') {
    if (isImage.test(val)) {
      val = _this.root().defs().image(val);
    }
  }

  if (val instanceof Image) {
    val = _this.root().defs().pattern(0, 0, (pattern) => {
      pattern.add(val);
    });
  }

  return val
});

registerMethods({
  Container: {
    // create image element, load image and set its size
    image: wrapWithAttrCheck(function (source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback)
    })
  }
});

register(Image, 'Image');

const PointArray = subClassArray('PointArray', SVGArray);

extend(PointArray, {
  // Convert array to string
  toString () {
    // convert to a poly point string
    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push(this[i].join(','));
    }

    return array.join(' ')
  },

  // Convert array to line object
  toLine () {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    }
  },

  // Get morphed array at given position
  at (pos) {
    // make sure a destination is defined
    if (!this.destination) return this

    // generate morphed point string
    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push([
        this[i][0] + (this.destination[i][0] - this[i][0]) * pos,
        this[i][1] + (this.destination[i][1] - this[i][1]) * pos
      ]);
    }

    return new PointArray(array)
  },

  // Parse point string and flat array
  parse (array = [ [ 0, 0 ] ]) {
    var points = [];

    // if it is an array
    if (array instanceof Array) {
      // and it is not flat, there is no need to parse it
      if (array[0] instanceof Array) {
        return array
      }
    } else { // Else, it is considered as a string
      // parse points
      array = array.trim().split(delimiter).map(parseFloat);
    }

    // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.
    if (array.length % 2 !== 0) array.pop();

    // wrap points in two-tuples
    for (var i = 0, len = array.length; i < len; i = i + 2) {
      points.push([ array[i], array[i + 1] ]);
    }

    return points
  },

  // transform points with matrix (similar to Point.transform)
  transform (m) {
    const points = [];

    for (let i = 0; i < this.length; i++) {
      const point = this[i];
      // Perform the matrix multiplication
      points.push([
        m.a * point[0] + m.c * point[1] + m.e,
        m.b * point[0] + m.d * point[1] + m.f
      ]);
    }

    // Return the required point
    return new PointArray(points)
  },

  // Move point string
  move (x, y) {
    var box = this.bbox();

    // get relative offset
    x -= box.x;
    y -= box.y;

    // move every point
    if (!isNaN(x) && !isNaN(y)) {
      for (var i = this.length - 1; i >= 0; i--) {
        this[i] = [ this[i][0] + x, this[i][1] + y ];
      }
    }

    return this
  },

  // Resize poly string
  size (width, height) {
    var i;
    var box = this.bbox();

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      if (box.width) this[i][0] = ((this[i][0] - box.x) * width) / box.width + box.x;
      if (box.height) this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y;
    }

    return this
  },

  // Get bounding box of points
  bbox () {
    var maxX = -Infinity;
    var maxY = -Infinity;
    var minX = Infinity;
    var minY = Infinity;
    this.forEach(function (el) {
      maxX = Math.max(el[0], maxX);
      maxY = Math.max(el[1], maxY);
      minX = Math.min(el[0], minX);
      minY = Math.min(el[1], minY);
    });
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }
});

const MorphArray = PointArray;

// Move by left top corner over x-axis
function x (x) {
  return x == null ? this.bbox().x : this.move(x, this.bbox().y)
}

// Move by left top corner over y-axis
function y (y) {
  return y == null ? this.bbox().y : this.move(this.bbox().x, y)
}

// Set width of element
function width (width) {
  const b = this.bbox();
  return width == null ? b.width : this.size(width, b.height)
}

// Set height of element
function height (height) {
  const b = this.bbox();
  return height == null ? b.height : this.size(b.width, height)
}

var pointed = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MorphArray: MorphArray,
    x: x,
    y: y,
    width: width,
    height: height
});

class Line extends Shape$1 {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('line', node), node);
  }

  // Get array
  array () {
    return new PointArray([
      [ this.attr('x1'), this.attr('y1') ],
      [ this.attr('x2'), this.attr('y2') ]
    ])
  }

  // Overwrite native plot() method
  plot (x1, y1, x2, y2) {
    if (x1 == null) {
      return this.array()
    } else if (typeof y1 !== 'undefined') {
      x1 = { x1: x1, y1: y1, x2: x2, y2: y2 };
    } else {
      x1 = new PointArray(x1).toLine();
    }

    return this.attr(x1)
  }

  // Move by left top corner
  move (x, y) {
    return this.attr(this.array().move(x, y).toLine())
  }

  // Set element size to given width and height
  size (width, height) {
    var p = proportionalSize(this, width, height);
    return this.attr(this.array().size(p.width, p.height).toLine())
  }
}

extend(Line, pointed);

registerMethods({
  Container: {
    // Create a line element
    line: wrapWithAttrCheck(function (...args) {
      // make sure plot is called as a setter
      // x1 is not necessarily a number, it can also be an array, a string and a PointArray
      return Line.prototype.plot.apply(
        this.put(new Line())
        , args[0] != null ? args : [ 0, 0, 0, 0 ]
      )
    })
  }
});

register(Line, 'Line');

class Marker extends Container {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('marker', node), node);
  }

  // Set width of element
  width (width) {
    return this.attr('markerWidth', width)
  }

  // Set height of element
  height (height) {
    return this.attr('markerHeight', height)
  }

  // Set marker refX and refY
  ref (x, y) {
    return this.attr('refX', x).attr('refY', y)
  }

  // Update marker
  update (block) {
    // remove all content
    this.clear();

    // invoke passed block
    if (typeof block === 'function') {
      block.call(this, this);
    }

    return this
  }

  // Return the fill id
  toString () {
    return 'url(#' + this.id() + ')'
  }
}

registerMethods({
  Container: {
    marker (...args) {
      // Create marker element in defs
      return this.defs().marker(...args)
    }
  },
  Defs: {
    // Create marker
    marker: wrapWithAttrCheck(function (width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new Marker())
        .size(width, height)
        .ref(width / 2, height / 2)
        .viewbox(0, 0, width, height)
        .attr('orient', 'auto')
        .update(block)
    })
  },
  marker: {
    // Create and attach markers
    marker (marker, width, height, block) {
      var attr = [ 'marker' ];

      // Build attribute name
      if (marker !== 'all') attr.push(marker);
      attr = attr.join('-');

      // Set marker attribute
      marker = arguments[1] instanceof Marker
        ? arguments[1]
        : this.defs().marker(width, height, block);

      return this.attr(attr, marker)
    }
  }
});

register(Marker, 'Marker');

/***
Base Class
==========
The base stepper class that will be
***/

function makeSetterGetter (k, f) {
  return function (v) {
    if (v == null) return this[v]
    this[k] = v;
    if (f) f.call(this);
    return this
  }
}

const easing = {
  '-': function (pos) {
    return pos
  },
  '<>': function (pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5
  },
  '>': function (pos) {
    return Math.sin(pos * Math.PI / 2)
  },
  '<': function (pos) {
    return -Math.cos(pos * Math.PI / 2) + 1
  },
  bezier: function (x1, y1, x2, y2) {
    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
    return function (t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t
        } else if (x2 > 0) {
          return y2 / x2 * t
        } else {
          return 0
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2)
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1)
        } else {
          return 1
        }
      } else {
        return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y2 + t ** 3
      }
    }
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function (steps, stepPosition = 'end') {
    // deal with "jump-" prefix
    stepPosition = stepPosition.split('-').reverse()[0];

    let jumps = steps;
    if (stepPosition === 'none') {
      --jumps;
    } else if (stepPosition === 'both') {
      ++jumps;
    }

    // The beforeFlag is essentially useless
    return (t, beforeFlag = false) => {
      // Step is called currentStep in referenced url
      let step = Math.floor(t * steps);
      const jumping = (t * step) % 1 === 0;

      if (stepPosition === 'start' || stepPosition === 'both') {
        ++step;
      }

      if (beforeFlag && jumping) {
        --step;
      }

      if (t >= 0 && step < 0) {
        step = 0;
      }

      if (t <= 1 && step > jumps) {
        step = jumps;
      }

      return step / jumps
    }
  }
};

class Stepper {
  done () {
    return false
  }
}

/***
Easing Functions
================
***/

class Ease extends Stepper {
  constructor (fn) {
    super();
    this.ease = easing[fn || timeline.ease] || fn;
  }

  step (from, to, pos) {
    if (typeof from !== 'number') {
      return pos < 1 ? from : to
    }
    return from + (to - from) * this.ease(pos)
  }
}

/***
Controller Types
================
***/

class Controller extends Stepper {
  constructor (fn) {
    super();
    this.stepper = fn;
  }

  step (current, target, dt, c) {
    return this.stepper(current, target, dt, c)
  }

  done (c) {
    return c.done
  }
}

function recalculate () {
  // Apply the default parameters
  var duration = (this._duration || 500) / 1000;
  var overshoot = this._overshoot || 0;

  // Calculate the PID natural response
  var eps = 1e-10;
  var pi = Math.PI;
  var os = Math.log(overshoot / 100 + eps);
  var zeta = -os / Math.sqrt(pi * pi + os * os);
  var wn = 3.9 / (zeta * duration);

  // Calculate the Spring values
  this.d = 2 * zeta * wn;
  this.k = wn * wn;
}

class Spring extends Controller {
  constructor (duration, overshoot) {
    super();
    this.duration(duration || 500)
      .overshoot(overshoot || 0);
  }

  step (current, target, dt, c) {
    if (typeof current === 'string') return current
    c.done = dt === Infinity;
    if (dt === Infinity) return target
    if (dt === 0) return current

    if (dt > 100) dt = 16;

    dt /= 1000;

    // Get the previous velocity
    var velocity = c.velocity || 0;

    // Apply the control to get the new position and store it
    var acceleration = -this.d * velocity - this.k * (current - target);
    var newPosition = current
      + velocity * dt
      + acceleration * dt * dt / 2;

    // Store the velocity
    c.velocity = velocity + acceleration * dt;

    // Figure out if we have converged, and if so, pass the value
    c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
    return c.done ? target : newPosition
  }
}

extend(Spring, {
  duration: makeSetterGetter('_duration', recalculate),
  overshoot: makeSetterGetter('_overshoot', recalculate)
});

class PID extends Controller {
  constructor (p, i, d, windup) {
    super();

    p = p == null ? 0.1 : p;
    i = i == null ? 0.01 : i;
    d = d == null ? 0 : d;
    windup = windup == null ? 1000 : windup;
    this.p(p).i(i).d(d).windup(windup);
  }

  step (current, target, dt, c) {
    if (typeof current === 'string') return current
    c.done = dt === Infinity;

    if (dt === Infinity) return target
    if (dt === 0) return current

    var p = target - current;
    var i = (c.integral || 0) + p * dt;
    var d = (p - (c.error || 0)) / dt;
    var windup = this.windup;

    // antiwindup
    if (windup !== false) {
      i = Math.max(-windup, Math.min(i, windup));
    }

    c.error = p;
    c.integral = i;

    c.done = Math.abs(p) < 0.001;

    return c.done ? target : current + (this.P * p + this.I * i + this.D * d)
  }
}

extend(PID, {
  windup: makeSetterGetter('windup'),
  p: makeSetterGetter('P'),
  i: makeSetterGetter('I'),
  d: makeSetterGetter('D')
});

const PathArray = subClassArray('PathArray', SVGArray);

function pathRegReplace (a, b, c, d) {
  return c + d.replace(dots, ' .')
}

function arrayToString (a) {
  for (var i = 0, il = a.length, s = ''; i < il; i++) {
    s += a[i][0];

    if (a[i][1] != null) {
      s += a[i][1];

      if (a[i][2] != null) {
        s += ' ';
        s += a[i][2];

        if (a[i][3] != null) {
          s += ' ';
          s += a[i][3];
          s += ' ';
          s += a[i][4];

          if (a[i][5] != null) {
            s += ' ';
            s += a[i][5];
            s += ' ';
            s += a[i][6];

            if (a[i][7] != null) {
              s += ' ';
              s += a[i][7];
            }
          }
        }
      }
    }
  }

  return s + ' '
}

const pathHandlers = {
  M: function (c, p, p0) {
    p.x = p0.x = c[0];
    p.y = p0.y = c[1];

    return [ 'M', p.x, p.y ]
  },
  L: function (c, p) {
    p.x = c[0];
    p.y = c[1];
    return [ 'L', c[0], c[1] ]
  },
  H: function (c, p) {
    p.x = c[0];
    return [ 'H', c[0] ]
  },
  V: function (c, p) {
    p.y = c[0];
    return [ 'V', c[0] ]
  },
  C: function (c, p) {
    p.x = c[4];
    p.y = c[5];
    return [ 'C', c[0], c[1], c[2], c[3], c[4], c[5] ]
  },
  S: function (c, p) {
    p.x = c[2];
    p.y = c[3];
    return [ 'S', c[0], c[1], c[2], c[3] ]
  },
  Q: function (c, p) {
    p.x = c[2];
    p.y = c[3];
    return [ 'Q', c[0], c[1], c[2], c[3] ]
  },
  T: function (c, p) {
    p.x = c[0];
    p.y = c[1];
    return [ 'T', c[0], c[1] ]
  },
  Z: function (c, p, p0) {
    p.x = p0.x;
    p.y = p0.y;
    return [ 'Z' ]
  },
  A: function (c, p) {
    p.x = c[5];
    p.y = c[6];
    return [ 'A', c[0], c[1], c[2], c[3], c[4], c[5], c[6] ]
  }
};

const mlhvqtcsaz = 'mlhvqtcsaz'.split('');

for (var i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = (function (i) {
    return function (c, p, p0) {
      if (i === 'H') c[0] = c[0] + p.x;
      else if (i === 'V') c[0] = c[0] + p.y;
      else if (i === 'A') {
        c[5] = c[5] + p.x;
        c[6] = c[6] + p.y;
      } else {
        for (var j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x);
        }
      }

      return pathHandlers[i](c, p, p0)
    }
  })(mlhvqtcsaz[i].toUpperCase());
}

extend(PathArray, {
  // Convert array to string
  toString () {
    return arrayToString(this)
  },

  // Move path string
  move (x, y) {
    // get bounding box of current situation
    var box = this.bbox();

    // get relative offset
    x -= box.x;
    y -= box.y;

    if (!isNaN(x) && !isNaN(y)) {
      // move every point
      for (var l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0];

        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] += x;
          this[i][2] += y;
        } else if (l === 'H') {
          this[i][1] += x;
        } else if (l === 'V') {
          this[i][1] += y;
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] += x;
          this[i][2] += y;
          this[i][3] += x;
          this[i][4] += y;

          if (l === 'C') {
            this[i][5] += x;
            this[i][6] += y;
          }
        } else if (l === 'A') {
          this[i][6] += x;
          this[i][7] += y;
        }
      }
    }

    return this
  },

  // Resize path string
  size (width, height) {
    // get bounding box of current situation
    var box = this.bbox();
    var i, l;

    // If the box width or height is 0 then we ignore
    // transformations on the respective axis
    box.width = box.width === 0 ? 1 : box.width;
    box.height = box.height === 0 ? 1 : box.height;

    // recalculate position of all points according to new size
    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0];

      if (l === 'M' || l === 'L' || l === 'T') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x;
        this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y;
      } else if (l === 'H') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x;
      } else if (l === 'V') {
        this[i][1] = ((this[i][1] - box.y) * height) / box.height + box.y;
      } else if (l === 'C' || l === 'S' || l === 'Q') {
        this[i][1] = ((this[i][1] - box.x) * width) / box.width + box.x;
        this[i][2] = ((this[i][2] - box.y) * height) / box.height + box.y;
        this[i][3] = ((this[i][3] - box.x) * width) / box.width + box.x;
        this[i][4] = ((this[i][4] - box.y) * height) / box.height + box.y;

        if (l === 'C') {
          this[i][5] = ((this[i][5] - box.x) * width) / box.width + box.x;
          this[i][6] = ((this[i][6] - box.y) * height) / box.height + box.y;
        }
      } else if (l === 'A') {
        // resize radii
        this[i][1] = (this[i][1] * width) / box.width;
        this[i][2] = (this[i][2] * height) / box.height;

        // move position values
        this[i][6] = ((this[i][6] - box.x) * width) / box.width + box.x;
        this[i][7] = ((this[i][7] - box.y) * height) / box.height + box.y;
      }
    }

    return this
  },

  // Test if the passed path array use the same path data commands as this path array
  equalCommands (pathArray) {
    var i, il, equalCommands;

    pathArray = new PathArray(pathArray);

    equalCommands = this.length === pathArray.length;
    for (i = 0, il = this.length; equalCommands && i < il; i++) {
      equalCommands = this[i][0] === pathArray[i][0];
    }

    return equalCommands
  },

  // Make path array morphable
  morph (pathArray) {
    pathArray = new PathArray(pathArray);

    if (this.equalCommands(pathArray)) {
      this.destination = pathArray;
    } else {
      this.destination = null;
    }

    return this
  },

  // Get morphed path array at given position
  at (pos) {
    // make sure a destination is defined
    if (!this.destination) return this

    var sourceArray = this;
    var destinationArray = this.destination.value;
    var array = [];
    var pathArray = new PathArray();
    var i, il, j, jl;

    // Animate has specified in the SVG spec
    // See: https://www.w3.org/TR/SVG11/paths.html#PathElement
    for (i = 0, il = sourceArray.length; i < il; i++) {
      array[i] = [ sourceArray[i][0] ];
      for (j = 1, jl = sourceArray[i].length; j < jl; j++) {
        array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos;
      }
      // For the two flags of the elliptical arc command, the SVG spec say:
      // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
      // Elliptical arc command as an array followed by corresponding indexes:
      // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
      //   0    1   2        3                 4             5      6  7
      if (array[i][0] === 'A') {
        array[i][4] = +(array[i][4] !== 0);
        array[i][5] = +(array[i][5] !== 0);
      }
    }

    // Directly modify the value of a path array, this is done this way for performance
    pathArray.value = array;
    return pathArray
  },

  // Absolutize and parse path to array
  parse (array = [ [ 'M', 0, 0 ] ]) {
    // if it's already a patharray, no need to parse it
    if (array instanceof PathArray) return array

    // prepare for parsing
    var s;
    var paramCnt = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

    if (typeof array === 'string') {
      array = array
        .replace(numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
        .replace(pathLetters, ' $& ') // put some room between letters and numbers
        .replace(hyphen, '$1 -') // add space before hyphen
        .trim() // trim
        .split(delimiter); // split into array
    } else {
      array = array.reduce(function (prev, curr) {
        return [].concat.call(prev, curr)
      }, []);
    }

    // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]
    var result = [];
    var p = new Point();
    var p0 = new Point();
    var index = 0;
    var len = array.length;

    do {
      // Test if we have a path letter
      if (isPathLetter.test(array[index])) {
        s = array[index];
        ++index;
        // If last letter was a move command and we got no new, it defaults to [L]ine
      } else if (s === 'M') {
        s = 'L';
      } else if (s === 'm') {
        s = 'l';
      }

      result.push(pathHandlers[s].call(null,
        array.slice(index, (index = index + paramCnt[s.toUpperCase()])).map(parseFloat),
        p, p0
      )
      );
    } while (len > index)

    return result
  },

  // Get bounding box of path
  bbox () {
    parser().path.setAttribute('d', this.toString());
    return parser.nodes.path.getBBox()
  }
});

class Morphable {
  constructor (stepper) {
    this._stepper = stepper || new Ease('-');

    this._from = null;
    this._to = null;
    this._type = null;
    this._context = null;
    this._morphObj = null;
  }

  from (val) {
    if (val == null) {
      return this._from
    }

    this._from = this._set(val);
    return this
  }

  to (val) {
    if (val == null) {
      return this._to
    }

    this._to = this._set(val);
    return this
  }

  type (type) {
    // getter
    if (type == null) {
      return this._type
    }

    // setter
    this._type = type;
    return this
  }

  _set (value) {
    if (!this._type) {
      var type = typeof value;

      if (type === 'number') {
        this.type(SVGNumber);
      } else if (type === 'string') {
        if (Color.isColor(value)) {
          this.type(Color);
        } else if (delimiter.test(value)) {
          this.type(pathLetters.test(value)
            ? PathArray
            : SVGArray
          );
        } else if (numberAndUnit.test(value)) {
          this.type(SVGNumber);
        } else {
          this.type(NonMorphable);
        }
      } else if (morphableTypes.indexOf(value.constructor) > -1) {
        this.type(value.constructor);
      } else if (Array.isArray(value)) {
        this.type(SVGArray);
      } else if (type === 'object') {
        this.type(ObjectBag);
      } else {
        this.type(NonMorphable);
      }
    }

    var result = (new this._type(value));
    if (this._type === Color) {
      result = this._to ? result[this._to[4]]()
        : this._from ? result[this._from[4]]()
        : result;
    }
    result = result.toArray();

    this._morphObj = this._morphObj || new this._type();
    this._context = this._context
      || Array.apply(null, Array(result.length))
        .map(Object)
        .map(function (o) {
          o.done = true;
          return o
        });
    return result
  }

  stepper (stepper) {
    if (stepper == null) return this._stepper
    this._stepper = stepper;
    return this
  }

  done () {
    var complete = this._context
      .map(this._stepper.done)
      .reduce(function (last, curr) {
        return last && curr
      }, true);
    return complete
  }

  at (pos) {
    var _this = this;

    return this._morphObj.fromArray(
      this._from.map(function (i, index) {
        return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context)
      })
    )
  }
}

class NonMorphable {
  constructor (...args) {
    this.init(...args);
  }

  init (val) {
    val = Array.isArray(val) ? val[0] : val;
    this.value = val;
    return this
  }

  valueOf () {
    return this.value
  }

  toArray () {
    return [ this.value ]
  }
}

class TransformBag {
  constructor (...args) {
    this.init(...args);
  }

  init (obj) {
    if (Array.isArray(obj)) {
      obj = {
        scaleX: obj[0],
        scaleY: obj[1],
        shear: obj[2],
        rotate: obj[3],
        translateX: obj[4],
        translateY: obj[5],
        originX: obj[6],
        originY: obj[7]
      };
    }

    Object.assign(this, TransformBag.defaults, obj);
    return this
  }

  toArray () {
    var v = this;

    return [
      v.scaleX,
      v.scaleY,
      v.shear,
      v.rotate,
      v.translateX,
      v.translateY,
      v.originX,
      v.originY
    ]
  }
}

TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};

class ObjectBag {
  constructor (...args) {
    this.init(...args);
  }

  init (objOrArr) {
    this.values = [];

    if (Array.isArray(objOrArr)) {
      this.values = objOrArr;
      return
    }

    objOrArr = objOrArr || {};
    var entries = [];

    for (const i in objOrArr) {
      entries.push([ i, objOrArr[i] ]);
    }

    entries.sort((a, b) => {
      return a[0] - b[0]
    });

    this.values = entries.reduce((last, curr) => last.concat(curr), []);
    return this
  }

  valueOf () {
    var obj = {};
    var arr = this.values;

    for (var i = 0, len = arr.length; i < len; i += 2) {
      obj[arr[i]] = arr[i + 1];
    }

    return obj
  }

  toArray () {
    return this.values
  }
}

const morphableTypes = [
  NonMorphable,
  TransformBag,
  ObjectBag
];

function registerMorphableType (type = []) {
  morphableTypes.push(...[].concat(type));
}

function makeMorphable () {
  extend(morphableTypes, {
    to (val) {
      return new Morphable()
        .type(this.constructor)
        .from(this.valueOf())
        .to(val)
    },
    fromArray (arr) {
      this.init(arr);
      return this
    }
  });
}

class Path extends Shape$1 {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('path', node), node);
  }

  // Get array
  array () {
    return this._array || (this._array = new PathArray(this.attr('d')))
  }

  // Plot new path
  plot (d) {
    return (d == null) ? this.array()
      : this.clear().attr('d', typeof d === 'string' ? d : (this._array = new PathArray(d)))
  }

  // Clear array cache
  clear () {
    delete this._array;
    return this
  }

  // Move by left top corner
  move (x, y) {
    return this.attr('d', this.array().move(x, y))
  }

  // Move by left top corner over x-axis
  x (x) {
    return x == null ? this.bbox().x : this.move(x, this.bbox().y)
  }

  // Move by left top corner over y-axis
  y (y) {
    return y == null ? this.bbox().y : this.move(this.bbox().x, y)
  }

  // Set element size to given width and height
  size (width, height) {
    var p = proportionalSize(this, width, height);
    return this.attr('d', this.array().size(p.width, p.height))
  }

  // Set width of element
  width (width) {
    return width == null ? this.bbox().width : this.size(width, this.bbox().height)
  }

  // Set height of element
  height (height) {
    return height == null ? this.bbox().height : this.size(this.bbox().width, height)
  }

  targets () {
    return baseFind('svg textpath [href*="' + this.id() + '"]')
  }
}

// Define morphable array
Path.prototype.MorphArray = PathArray;

// Add parent method
registerMethods({
  Container: {
    // Create a wrapped path element
    path: wrapWithAttrCheck(function (d) {
      // make sure plot is called as a setter
      return this.put(new Path()).plot(d || new PathArray())
    })
  }
});

register(Path, 'Path');

// Get array
function array () {
  return this._array || (this._array = new PointArray(this.attr('points')))
}

// Plot new path
function plot (p) {
  return (p == null) ? this.array()
    : this.clear().attr('points', typeof p === 'string' ? p
    : (this._array = new PointArray(p)))
}

// Clear array cache
function clear () {
  delete this._array;
  return this
}

// Move by left top corner
function move (x, y) {
  return this.attr('points', this.array().move(x, y))
}

// Set element size to given width and height
function size (width, height) {
  const p = proportionalSize(this, width, height);
  return this.attr('points', this.array().size(p.width, p.height))
}

var poly = /*#__PURE__*/Object.freeze({
    __proto__: null,
    array: array,
    plot: plot,
    clear: clear,
    move: move,
    size: size
});

class Polygon extends Shape$1 {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('polygon', node), node);
  }
}

registerMethods({
  Container: {
    // Create a wrapped polygon element
    polygon: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polygon()).plot(p || new PointArray())
    })
  }
});

extend(Polygon, pointed);
extend(Polygon, poly);
register(Polygon, 'Polygon');

class Polyline extends Shape$1 {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('polyline', node), node);
  }
}

registerMethods({
  Container: {
    // Create a wrapped polygon element
    polyline: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polyline()).plot(p || new PointArray())
    })
  }
});

extend(Polyline, pointed);
extend(Polyline, poly);
register(Polyline, 'Polyline');

class Rect extends Shape$1 {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('rect', node), node);
  }
}

extend(Rect, { rx, ry });

registerMethods({
  Container: {
    // Create a rect element
    rect: wrapWithAttrCheck(function (width, height) {
      return this.put(new Rect()).size(width, height)
    })
  }
});

register(Rect, 'Rect');

class Queue {
  constructor () {
    this._first = null;
    this._last = null;
  }

  push (value) {
    // An item stores an id and the provided value
    var item = value.next ? value : { value: value, next: null, prev: null };

    // Deal with the queue being empty or populated
    if (this._last) {
      item.prev = this._last;
      this._last.next = item;
      this._last = item;
    } else {
      this._last = item;
      this._first = item;
    }

    // Return the current item
    return item
  }

  shift () {
    // Check if we have a value
    var remove = this._first;
    if (!remove) return null

    // If we do, remove it and relink things
    this._first = remove.next;
    if (this._first) this._first.prev = null;
    this._last = this._first ? this._last : null;
    return remove.value
  }

  // Shows us the first item in the list
  first () {
    return this._first && this._first.value
  }

  // Shows us the last item in the list
  last () {
    return this._last && this._last.value
  }

  // Removes the item that was returned from the push
  remove (item) {
    // Relink the previous item
    if (item.prev) item.prev.next = item.next;
    if (item.next) item.next.prev = item.prev;
    if (item === this._last) this._last = item.prev;
    if (item === this._first) this._first = item.next;

    // Invalidate item
    item.prev = null;
    item.next = null;
  }
}

const Animator = {
  nextDraw: null,
  frames: new Queue(),
  timeouts: new Queue(),
  immediates: new Queue(),
  timer: () => globals.window.performance || globals.window.Date,
  transforms: [],

  frame (fn) {
    // Store the node
    var node = Animator.frames.push({ run: fn });

    // Request an animation frame if we don't have one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    // Return the node so we can remove it easily
    return node
  },

  timeout (fn, delay) {
    delay = delay || 0;

    // Work out when the event should fire
    var time = Animator.timer().now() + delay;

    // Add the timeout to the end of the queue
    var node = Animator.timeouts.push({ run: fn, time: time });

    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node
  },

  immediate (fn) {
    // Add the immediate fn to the end of the queue
    var node = Animator.immediates.push(fn);
    // Request another animation frame if we need one
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node
  },

  cancelFrame (node) {
    node != null && Animator.frames.remove(node);
  },

  clearTimeout (node) {
    node != null && Animator.timeouts.remove(node);
  },

  cancelImmediate (node) {
    node != null && Animator.immediates.remove(node);
  },

  _draw (now) {
    // Run all the timeouts we can run, if they are not ready yet, add them
    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
    var nextTimeout = null;
    var lastTimeout = Animator.timeouts.last();
    while ((nextTimeout = Animator.timeouts.shift())) {
      // Run the timeout if its time, or push it to the end
      if (now >= nextTimeout.time) {
        nextTimeout.run();
      } else {
        Animator.timeouts.push(nextTimeout);
      }

      // If we hit the last item, we should stop shifting out more items
      if (nextTimeout === lastTimeout) break
    }

    // Run all of the animation frames
    var nextFrame = null;
    var lastFrame = Animator.frames.last();
    while ((nextFrame !== lastFrame) && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now);
    }

    var nextImmediate = null;
    while ((nextImmediate = Animator.immediates.shift())) {
      nextImmediate();
    }

    // If we have remaining timeouts or frames, draw until we don't anymore
    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first()
      ? globals.window.requestAnimationFrame(Animator._draw)
      : null;
  }
};

var makeSchedule = function (runnerInfo) {
  var start = runnerInfo.start;
  var duration = runnerInfo.runner.duration();
  var end = start + duration;
  return { start: start, duration: duration, end: end, runner: runnerInfo.runner }
};

const defaultSource = function () {
  const w = globals.window;
  return (w.performance || w.Date).now()
};

class Timeline extends EventTarget {
  // Construct a new timeline on the given element
  constructor (timeSource = defaultSource) {
    super();

    this._timeSource = timeSource;

    // Store the timing variables
    this._startTime = 0;
    this._speed = 1.0;

    // Determines how long a runner is hold in memory. Can be a dt or true/false
    this._persist = 0;

    // Keep track of the running animations and their starting parameters
    this._nextFrame = null;
    this._paused = true;
    this._runners = [];
    this._runnerIds = [];
    this._lastRunnerId = -1;
    this._time = 0;
    this._lastSourceTime = 0;
    this._lastStepTime = 0;

    // Make sure that step is always called in class context
    this._step = this._stepFn.bind(this, false);
    this._stepImmediate = this._stepFn.bind(this, true);
  }

  // schedules a runner on the timeline
  schedule (runner, delay, when) {
    if (runner == null) {
      return this._runners.map(makeSchedule)
    }

    // The start time for the next animation can either be given explicitly,
    // derived from the current timeline time or it can be relative to the
    // last start time to chain animations direclty

    var absoluteStartTime = 0;
    var endTime = this.getEndTime();
    delay = delay || 0;

    // Work out when to start the animation
    if (when == null || when === 'last' || when === 'after') {
      // Take the last time and increment
      absoluteStartTime = endTime;
    } else if (when === 'absolute' || when === 'start') {
      absoluteStartTime = delay;
      delay = 0;
    } else if (when === 'now') {
      absoluteStartTime = this._time;
    } else if (when === 'relative') {
      const runnerInfo = this._runners[runner.id];
      if (runnerInfo) {
        absoluteStartTime = runnerInfo.start + delay;
        delay = 0;
      }
    } else {
      throw new Error('Invalid value for the "when" parameter')
    }

    // Manage runner
    runner.unschedule();
    runner.timeline(this);

    const persist = runner.persist();
    const runnerInfo = {
      persist: persist === null ? this._persist : persist,
      start: absoluteStartTime + delay,
      runner
    };

    this._lastRunnerId = runner.id;

    this._runners.push(runnerInfo);
    this._runners.sort((a, b) => a.start - b.start);
    this._runnerIds = this._runners.map(info => info.runner.id);

    this.updateTime()._continue();
    return this
  }

  // Remove the runner from this timeline
  unschedule (runner) {
    var index = this._runnerIds.indexOf(runner.id);
    if (index < 0) return this

    this._runners.splice(index, 1);
    this._runnerIds.splice(index, 1);

    runner.timeline(null);
    return this
  }

  // Calculates the end of the timeline
  getEndTime () {
    var lastRunnerInfo = this._runners[this._runnerIds.indexOf(this._lastRunnerId)];
    var lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
    var lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : 0;
    return lastStartTime + lastDuration
  }

  getEndTimeOfTimeline () {
    let lastEndTime = 0;
    for (var i = 0; i < this._runners.length; i++) {
      const runnerInfo = this._runners[i];
      var duration = runnerInfo ? runnerInfo.runner.duration() : 0;
      var startTime = runnerInfo ? runnerInfo.start : 0;
      const endTime = startTime + duration;
      if (endTime > lastEndTime) {
        lastEndTime = endTime;
      }
    }
    return lastEndTime
  }

  // Makes sure, that after pausing the time doesn't jump
  updateTime () {
    if (!this.active()) {
      this._lastSourceTime = this._timeSource();
    }
    return this
  }

  play () {
    // Now make sure we are not paused and continue the animation
    this._paused = false;
    return this.updateTime()._continue()
  }

  pause () {
    this._paused = true;
    return this._continue()
  }

  stop () {
    // Go to start and pause
    this.time(0);
    return this.pause()
  }

  finish () {
    // Go to end and pause
    this.time(this.getEndTimeOfTimeline() + 1);
    return this.pause()
  }

  speed (speed) {
    if (speed == null) return this._speed
    this._speed = speed;
    return this
  }

  reverse (yes) {
    var currentSpeed = this.speed();
    if (yes == null) return this.speed(-currentSpeed)

    var positive = Math.abs(currentSpeed);
    return this.speed(yes ? positive : -positive)
  }

  seek (dt) {
    return this.time(this._time + dt)
  }

  time (time) {
    if (time == null) return this._time
    this._time = time;
    return this._continue(true)
  }

  persist (dtOrForever) {
    if (dtOrForever == null) return this._persist
    this._persist = dtOrForever;
    return this
  }

  source (fn) {
    if (fn == null) return this._timeSource
    this._timeSource = fn;
    return this
  }

  _stepFn (immediateStep = false) {
    // Get the time delta from the last time and update the time
    var time = this._timeSource();
    var dtSource = time - this._lastSourceTime;

    if (immediateStep) dtSource = 0;

    var dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
    this._lastSourceTime = time;

    // Only update the time if we use the timeSource.
    // Otherwise use the current time
    if (!immediateStep) {
      // Update the time
      this._time += dtTime;
      this._time = this._time < 0 ? 0 : this._time;
    }
    this._lastStepTime = this._time;
    this.fire('time', this._time);

    // This is for the case that the timeline was seeked so that the time
    // is now before the startTime of the runner. Thats why we need to set
    // the runner to position 0

    // FIXME:
    // However, reseting in insertion order leads to bugs. Considering the case,
    // where 2 runners change the same attriute but in different times,
    // reseting both of them will lead to the case where the later defined
    // runner always wins the reset even if the other runner started earlier
    // and therefore should win the attribute battle
    // this can be solved by reseting them backwards
    for (var k = this._runners.length; k--;) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[k];
      const runner = runnerInfo.runner;

      // Make sure that we give the actual difference
      // between runner start time and now
      const dtToStart = this._time - runnerInfo.start;

      // Dont run runner if not started yet
      // and try to reset it
      if (dtToStart <= 0) {
        runner.reset();
      }
    }

    // Run all of the runners directly
    var runnersLeft = false;
    for (var i = 0, len = this._runners.length; i < len; i++) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[i];
      const runner = runnerInfo.runner;
      let dt = dtTime;

      // Make sure that we give the actual difference
      // between runner start time and now
      const dtToStart = this._time - runnerInfo.start;

      // Dont run runner if not started yet
      if (dtToStart <= 0) {
        runnersLeft = true;
        continue
      } else if (dtToStart < dt) {
        // Adjust dt to make sure that animation is on point
        dt = dtToStart;
      }

      if (!runner.active()) continue

      // If this runner is still going, signal that we need another animation
      // frame, otherwise, remove the completed runner
      var finished = runner.step(dt).done;
      if (!finished) {
        runnersLeft = true;
        // continue
      } else if (runnerInfo.persist !== true) {
        // runner is finished. And runner might get removed
        var endTime = runner.duration() - runner.time() + this._time;

        if (endTime + runnerInfo.persist < this._time) {
          // Delete runner and correct index
          runner.unschedule();
          --i;
          --len;
        }
      }
    }

    // Basically: we continue when there are runners right from us in time
    // when -->, and when runners are left from us when <--
    if ((runnersLeft && !(this._speed < 0 && this._time === 0)) || (this._runnerIds.length && this._speed < 0 && this._time > 0)) {
      this._continue();
    } else {
      this.pause();
      this.fire('finished');
    }

    return this
  }

  // Checks if we are running and continues the animation
  _continue (immediateStep = false) {
    Animator.cancelFrame(this._nextFrame);
    this._nextFrame = null;

    if (immediateStep) return this._stepImmediate()
    if (this._paused) return this

    this._nextFrame = Animator.frame(this._step);
    return this
  }

  active () {
    return !!this._nextFrame
  }
}

registerMethods({
  Element: {
    timeline: function (timeline) {
      if (timeline == null) {
        this._timeline = (this._timeline || new Timeline());
        return this._timeline
      } else {
        this._timeline = timeline;
        return this
      }
    }
  }
});

class Runner extends EventTarget {
  constructor (options) {
    super();

    // Store a unique id on the runner, so that we can identify it later
    this.id = Runner.id++;

    // Ensure a default value
    options = options == null
      ? timeline.duration
      : options;

    // Ensure that we get a controller
    options = typeof options === 'function'
      ? new Controller(options)
      : options;

    // Declare all of the variables
    this._element = null;
    this._timeline = null;
    this.done = false;
    this._queue = [];

    // Work out the stepper and the duration
    this._duration = typeof options === 'number' && options;
    this._isDeclarative = options instanceof Controller;
    this._stepper = this._isDeclarative ? options : new Ease();

    // We copy the current values from the timeline because they can change
    this._history = {};

    // Store the state of the runner
    this.enabled = true;
    this._time = 0;
    this._lastTime = 0;

    // At creation, the runner is in reseted state
    this._reseted = true;

    // Save transforms applied to this runner
    this.transforms = new Matrix();
    this.transformId = 1;

    // Looping variables
    this._haveReversed = false;
    this._reverse = false;
    this._loopsDone = 0;
    this._swing = false;
    this._wait = 0;
    this._times = 1;

    this._frameId = null;

    // Stores how long a runner is stored after beeing done
    this._persist = this._isDeclarative ? true : null;
  }

  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */

  element (element) {
    if (element == null) return this._element
    this._element = element;
    element._prepareRunner();
    return this
  }

  timeline (timeline) {
    // check explicitly for undefined so we can set the timeline to null
    if (typeof timeline === 'undefined') return this._timeline
    this._timeline = timeline;
    return this
  }

  animate (duration, delay, when) {
    var o = Runner.sanitise(duration, delay, when);
    var runner = new Runner(o.duration);
    if (this._timeline) runner.timeline(this._timeline);
    if (this._element) runner.element(this._element);
    return runner.loop(o).schedule(o.delay, o.when)
  }

  schedule (timeline, delay, when) {
    // The user doesn't need to pass a timeline if we already have one
    if (!(timeline instanceof Timeline)) {
      when = delay;
      delay = timeline;
      timeline = this.timeline();
    }

    // If there is no timeline, yell at the user...
    if (!timeline) {
      throw Error('Runner cannot be scheduled without timeline')
    }

    // Schedule the runner on the timeline provided
    timeline.schedule(this, delay, when);
    return this
  }

  unschedule () {
    var timeline = this.timeline();
    timeline && timeline.unschedule(this);
    return this
  }

  loop (times, swing, wait) {
    // Deal with the user passing in an object
    if (typeof times === 'object') {
      swing = times.swing;
      wait = times.wait;
      times = times.times;
    }

    // Sanitise the values and store them
    this._times = times || Infinity;
    this._swing = swing || false;
    this._wait = wait || 0;

    // Allow true to be passed
    if (this._times === true) { this._times = Infinity; }

    return this
  }

  delay (delay) {
    return this.animate(0, delay)
  }

  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */

  queue (initFn, runFn, retargetFn, isTransform) {
    this._queue.push({
      initialiser: initFn || noop,
      runner: runFn || noop,
      retarget: retargetFn,
      isTransform: isTransform,
      initialised: false,
      finished: false
    });
    var timeline = this.timeline();
    timeline && this.timeline()._continue();
    return this
  }

  during (fn) {
    return this.queue(null, fn)
  }

  after (fn) {
    return this.on('finished', fn)
  }

  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */

  time (time) {
    if (time == null) {
      return this._time
    }
    const dt = time - this._time;
    this.step(dt);
    return this
  }

  duration () {
    return this._times * (this._wait + this._duration) - this._wait
  }

  loops (p) {
    var loopDuration = this._duration + this._wait;
    if (p == null) {
      var loopsDone = Math.floor(this._time / loopDuration);
      var relativeTime = (this._time - loopsDone * loopDuration);
      var position = relativeTime / this._duration;
      return Math.min(loopsDone + position, this._times)
    }
    var whole = Math.floor(p);
    var partial = p % 1;
    var time = loopDuration * whole + this._duration * partial;
    return this.time(time)
  }

  persist (dtOrForever) {
    if (dtOrForever == null) return this._persist
    this._persist = dtOrForever;
    return this
  }

  position (p) {
    // Get all of the variables we need
    var x = this._time;
    var d = this._duration;
    var w = this._wait;
    var t = this._times;
    var s = this._swing;
    var r = this._reverse;
    var position;

    if (p == null) {
      /*
      This function converts a time to a position in the range [0, 1]
      The full explanation can be found in this desmos demonstration
        https://www.desmos.com/calculator/u4fbavgche
      The logic is slightly simplified here because we can use booleans
      */

      // Figure out the value without thinking about the start or end time
      const f = function (x) {
        var swinging = s * Math.floor(x % (2 * (w + d)) / (w + d));
        var backwards = (swinging && !r) || (!swinging && r);
        var uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards;
        var clipped = Math.max(Math.min(uncliped, 1), 0);
        return clipped
      };

      // Figure out the value by incorporating the start time
      var endTime = t * (w + d) - w;
      position = x <= 0 ? Math.round(f(1e-5))
        : x < endTime ? f(x)
        : Math.round(f(endTime - 1e-5));
      return position
    }

    // Work out the loops done and add the position to the loops done
    var loopsDone = Math.floor(this.loops());
    var swingForward = s && (loopsDone % 2 === 0);
    var forwards = (swingForward && !r) || (r && swingForward);
    position = loopsDone + (forwards ? p : 1 - p);
    return this.loops(position)
  }

  progress (p) {
    if (p == null) {
      return Math.min(1, this._time / this.duration())
    }
    return this.time(p * this.duration())
  }

  step (dt) {
    // If we are inactive, this stepper just gets skipped
    if (!this.enabled) return this

    // Update the time and get the new position
    dt = dt == null ? 16 : dt;
    this._time += dt;
    var position = this.position();

    // Figure out if we need to run the stepper in this frame
    var running = this._lastPosition !== position && this._time >= 0;
    this._lastPosition = position;

    // Figure out if we just started
    var duration = this.duration();
    var justStarted = this._lastTime <= 0 && this._time > 0;
    var justFinished = this._lastTime < duration && this._time >= duration;

    this._lastTime = this._time;
    if (justStarted) {
      this.fire('start', this);
    }

    // Work out if the runner is finished set the done flag here so animations
    // know, that they are running in the last step (this is good for
    // transformations which can be merged)
    var declarative = this._isDeclarative;
    this.done = !declarative && !justFinished && this._time >= duration;

    // Runner is running. So its not in reseted state anymore
    this._reseted = false;

    // Call initialise and the run function
    if (running || declarative) {
      this._initialise(running);

      // clear the transforms on this runner so they dont get added again and again
      this.transforms = new Matrix();
      var converged = this._run(declarative ? dt : position);

      this.fire('step', this);
    }
    // correct the done flag here
    // declaritive animations itself know when they converged
    this.done = this.done || (converged && declarative);
    if (justFinished) {
      this.fire('finished', this);
    }
    return this
  }

  reset () {
    if (this._reseted) return this
    this.time(0);
    this._reseted = true;
    return this
  }

  finish () {
    return this.step(Infinity)
  }

  reverse (reverse) {
    this._reverse = reverse == null ? !this._reverse : reverse;
    return this
  }

  ease (fn) {
    this._stepper = new Ease(fn);
    return this
  }

  active (enabled) {
    if (enabled == null) return this.enabled
    this.enabled = enabled;
    return this
  }

  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */

  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher (method, morpher) {
    this._history[method] = {
      morpher: morpher,
      caller: this._queue[this._queue.length - 1]
    };

    // We have to resume the timeline in case a controller
    // is already done without beeing ever run
    // This can happen when e.g. this is done:
    //    anim = el.animate(new SVG.Spring)
    // and later
    //    anim.move(...)
    if (this._isDeclarative) {
      var timeline = this.timeline();
      timeline && timeline.play();
    }
  }

  // Try to set the target for a morpher if the morpher exists, otherwise
  // do nothing and return false
  _tryRetarget (method, target, extra) {
    if (this._history[method]) {
      // if the last method wasnt even initialised, throw it away
      if (!this._history[method].caller.initialised) {
        const index = this._queue.indexOf(this._history[method].caller);
        this._queue.splice(index, 1);
        return false
      }

      // for the case of transformations, we use the special retarget function
      // which has access to the outer scope
      if (this._history[method].caller.retarget) {
        this._history[method].caller.retarget(target, extra);
        // for everything else a simple morpher change is sufficient
      } else {
        this._history[method].morpher.to(target);
      }

      this._history[method].caller.finished = false;
      var timeline = this.timeline();
      timeline && timeline.play();
      return true
    }
    return false
  }

  // Run each initialise function in the runner if required
  _initialise (running) {
    // If we aren't running, we shouldn't initialise when not declarative
    if (!running && !this._isDeclarative) return

    // Loop through all of the initialisers
    for (var i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current initialiser
      var current = this._queue[i];

      // Determine whether we need to initialise
      var needsIt = this._isDeclarative || (!current.initialised && running);
      running = !current.finished;

      // Call the initialiser if we need to
      if (needsIt && running) {
        current.initialiser.call(this);
        current.initialised = true;
      }
    }
  }

  // Run each run function for the position or dt given
  _run (positionOrDt) {
    // Run all of the _queue directly
    var allfinished = true;
    for (var i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current function to run
      var current = this._queue[i];

      // Run the function if its not finished, we keep track of the finished
      // flag for the sake of declarative _queue
      var converged = current.runner.call(this, positionOrDt);
      current.finished = current.finished || (converged === true);
      allfinished = allfinished && current.finished;
    }

    // We report when all of the constructors are finished
    return allfinished
  }

  addTransform (transform, index) {
    this.transforms.lmultiplyO(transform);
    return this
  }

  clearTransform () {
    this.transforms = new Matrix();
    return this
  }

  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue () {
    if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
      this._queue = this._queue.filter((item) => {
        return !item.isTransform
      });
    }
  }

  static sanitise (duration, delay, when) {
    // Initialise the default parameters
    var times = 1;
    var swing = false;
    var wait = 0;
    duration = duration || timeline.duration;
    delay = delay || timeline.delay;
    when = when || 'last';

    // If we have an object, unpack the values
    if (typeof duration === 'object' && !(duration instanceof Stepper)) {
      delay = duration.delay || delay;
      when = duration.when || when;
      swing = duration.swing || swing;
      times = duration.times || times;
      wait = duration.wait || wait;
      duration = duration.duration || timeline.duration;
    }

    return {
      duration: duration,
      delay: delay,
      swing: swing,
      times: times,
      wait: wait,
      when: when
    }
  }
}

Runner.id = 0;

class FakeRunner {
  constructor (transforms = new Matrix(), id = -1, done = true) {
    this.transforms = transforms;
    this.id = id;
    this.done = done;
  }

  clearTransformsFromQueue () { }
}

extend([ Runner, FakeRunner ], {
  mergeWith (runner) {
    return new FakeRunner(
      runner.transforms.lmultiply(this.transforms),
      runner.id
    )
  }
});

// FakeRunner.emptyRunner = new FakeRunner()

const lmultiply = (last, curr) => last.lmultiplyO(curr);
const getRunnerTransform = (runner) => runner.transforms;

function mergeTransforms () {
  // Find the matrix to apply to the element and apply it
  const runners = this._transformationRunners.runners;
  const netTransform = runners
    .map(getRunnerTransform)
    .reduce(lmultiply, new Matrix());

  this.transform(netTransform);

  this._transformationRunners.merge();

  if (this._transformationRunners.length() === 1) {
    this._frameId = null;
  }
}

class RunnerArray {
  constructor () {
    this.runners = [];
    this.ids = [];
  }

  add (runner) {
    if (this.runners.includes(runner)) return
    const id = runner.id + 1;

    this.runners.push(runner);
    this.ids.push(id);

    return this
  }

  getByID (id) {
    return this.runners[this.ids.indexOf(id + 1)]
  }

  remove (id) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1);
    this.runners.splice(index, 1);
    return this
  }

  merge () {
    let lastRunner = null;
    this.runners.forEach((runner, i) => {

      const condition = lastRunner
        && runner.done && lastRunner.done
        // don't merge runner when persisted on timeline
        && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id))
        && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));

      if (condition) {
        // the +1 happens in the function
        this.remove(runner.id);
        this.edit(lastRunner.id, runner.mergeWith(lastRunner));
      }

      lastRunner = runner;
    });

    return this
  }

  edit (id, newRunner) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1, id + 1);
    this.runners.splice(index, 1, newRunner);
    return this
  }

  length () {
    return this.ids.length
  }

  clearBefore (id) {
    const deleteCnt = this.ids.indexOf(id + 1) || 1;
    this.ids.splice(0, deleteCnt, 0);
    this.runners.splice(0, deleteCnt, new FakeRunner())
      .forEach((r) => r.clearTransformsFromQueue());
    return this
  }
}

registerMethods({
  Element: {
    animate (duration, delay, when) {
      var o = Runner.sanitise(duration, delay, when);
      var timeline = this.timeline();
      return new Runner(o.duration)
        .loop(o)
        .element(this)
        .timeline(timeline.play())
        .schedule(o.delay, o.when)
    },

    delay (by, when) {
      return this.animate(0, by, when)
    },

    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwfrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore (currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id);
    },

    _currentTransform (current) {
      return this._transformationRunners.runners
        // we need the equal sign here to make sure, that also transformations
        // on the same runner which execute before the current transformation are
        // taken into account
        .filter((runner) => runner.id <= current.id)
        .map(getRunnerTransform)
        .reduce(lmultiply, new Matrix())
    },

    _addRunner (runner) {
      this._transformationRunners.add(runner);

      // Make sure that the runner merge is executed at the very end of
      // all Animator functions. Thats why we use immediate here to execute
      // the merge right after all frames are run
      Animator.cancelImmediate(this._frameId);
      this._frameId = Animator.immediate(mergeTransforms.bind(this));
    },

    _prepareRunner () {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray()
          .add(new FakeRunner(new Matrix(this)));
      }
    }
  }
});

extend(Runner, {
  attr (a, v) {
    return this.styleAttr('attr', a, v)
  },

  // Add animatable styles
  css (s, v) {
    return this.styleAttr('css', s, v)
  },

  styleAttr (type, name, val) {
    // apply attributes individually
    if (typeof name === 'object') {
      for (var key in name) {
        this.styleAttr(type, key, name[key]);
      }
      return this
    }

    var morpher = new Morphable(this._stepper).to(val);

    this.queue(function () {
      morpher = morpher.from(this.element()[type](name));
    }, function (pos) {
      this.element()[type](name, morpher.at(pos));
      return morpher.done()
    });

    return this
  },

  zoom (level, point) {
    if (this._tryRetarget('zoom', to, point)) return this

    var morpher = new Morphable(this._stepper).to(new SVGNumber(level));

    this.queue(function () {
      morpher = morpher.from(this.element().zoom());
    }, function (pos) {
      this.element().zoom(morpher.at(pos), point);
      return morpher.done()
    }, function (newLevel, newPoint) {
      point = newPoint;
      morpher.to(newLevel);
    });

    this._rememberMorpher('zoom', morpher);
    return this
  },

  /**
   ** absolute transformations
   **/

  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)

  transform (transforms, relative, affine) {
    // If we have a declarative function, we should retarget it if possible
    relative = transforms.relative || relative;
    if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
      return this
    }

    // Parse the parameters
    var isMatrix = Matrix.isMatrixLike(transforms);
    affine = transforms.affine != null
      ? transforms.affine
      : (affine != null ? affine : !isMatrix);

    // Create a morepher and set its type
    const morpher = new Morphable(this._stepper)
      .type(affine ? TransformBag : Matrix);

    let origin;
    let element;
    let current;
    let currentAngle;
    let startTransform;

    function setup () {
      // make sure element and origin is defined
      element = element || this.element();
      origin = origin || getOrigin(transforms, element);

      startTransform = new Matrix(relative ? undefined : element);

      // add the runner to the element so it can merge transformations
      element._addRunner(this);

      // Deactivate all transforms that have run so far if we are absolute
      if (!relative) {
        element._clearTransformRunnersBefore(this);
      }
    }

    function run (pos) {
      // clear all other transforms before this in case something is saved
      // on this runner. We are absolute. We dont need these!
      if (!relative) this.clearTransform();

      const { x, y } = new Point(origin).transform(element._currentTransform(this));

      let target = new Matrix({ ...transforms, origin: [ x, y ] });
      let start = this._isDeclarative && current
        ? current
        : startTransform;

      if (affine) {
        target = target.decompose(x, y);
        start = start.decompose(x, y);

        // Get the current and target angle as it was set
        const rTarget = target.rotate;
        const rCurrent = start.rotate;

        // Figure out the shortest path to rotate directly
        const possibilities = [ rTarget - 360, rTarget, rTarget + 360 ];
        const distances = possibilities.map(a => Math.abs(a - rCurrent));
        const shortest = Math.min(...distances);
        const index = distances.indexOf(shortest);
        target.rotate = possibilities[index];
      }

      if (relative) {
        // we have to be careful here not to overwrite the rotation
        // with the rotate method of Matrix
        if (!isMatrix) {
          target.rotate = transforms.rotate || 0;
        }
        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle;
        }
      }

      morpher.from(start);
      morpher.to(target);

      const affineParameters = morpher.at(pos);
      currentAngle = affineParameters.rotate;
      current = new Matrix(affineParameters);

      this.addTransform(current);
      element._addRunner(this);
      return morpher.done()
    }

    function retarget (newTransforms) {
      // only get a new origin if it changed since the last call
      if (
        (newTransforms.origin || 'center').toString()
        !== (transforms.origin || 'center').toString()
      ) {
        origin = getOrigin(transforms, element);
      }

      // overwrite the old transformations with the new ones
      transforms = { ...newTransforms, origin };
    }

    this.queue(setup, run, retarget, true);
    this._isDeclarative && this._rememberMorpher('transform', morpher);
    return this
  },

  // Animatable x-axis
  x (x, relative) {
    return this._queueNumber('x', x)
  },

  // Animatable y-axis
  y (y) {
    return this._queueNumber('y', y)
  },

  dx (x = 0) {
    return this._queueNumberDelta('x', x)
  },

  dy (y = 0) {
    return this._queueNumberDelta('y', y)
  },

  dmove (x, y) {
    return this.dx(x).dy(y)
  },

  _queueNumberDelta (method, to) {
    to = new SVGNumber(to);

    // Try to change the target if we have this method already registerd
    if (this._tryRetarget(method, to)) return this

    // Make a morpher and queue the animation
    var morpher = new Morphable(this._stepper).to(to);
    var from = null;
    this.queue(function () {
      from = this.element()[method]();
      morpher.from(from);
      morpher.to(from + to);
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done()
    }, function (newTo) {
      morpher.to(from + new SVGNumber(newTo));
    });

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher);
    return this
  },

  _queueObject (method, to) {
    // Try to change the target if we have this method already registerd
    if (this._tryRetarget(method, to)) return this

    // Make a morpher and queue the animation
    var morpher = new Morphable(this._stepper).to(to);
    this.queue(function () {
      morpher.from(this.element()[method]());
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done()
    });

    // Register the morpher so that if it is changed again, we can retarget it
    this._rememberMorpher(method, morpher);
    return this
  },

  _queueNumber (method, value) {
    return this._queueObject(method, new SVGNumber(value))
  },

  // Animatable center x-axis
  cx (x) {
    return this._queueNumber('cx', x)
  },

  // Animatable center y-axis
  cy (y) {
    return this._queueNumber('cy', y)
  },

  // Add animatable move
  move (x, y) {
    return this.x(x).y(y)
  },

  // Add animatable center
  center (x, y) {
    return this.cx(x).cy(y)
  },

  // Add animatable size
  size (width, height) {
    // animate bbox based size for all other elements
    var box;

    if (!width || !height) {
      box = this._element.bbox();
    }

    if (!width) {
      width = box.width / box.height * height;
    }

    if (!height) {
      height = box.height / box.width * width;
    }

    return this
      .width(width)
      .height(height)
  },

  // Add animatable width
  width (width) {
    return this._queueNumber('width', width)
  },

  // Add animatable height
  height (height) {
    return this._queueNumber('height', height)
  },

  // Add animatable plot
  plot (a, b, c, d) {
    // Lines can be plotted with 4 arguments
    if (arguments.length === 4) {
      return this.plot([ a, b, c, d ])
    }

    if (this._tryRetarget('plot', a)) return this

    var morpher = new Morphable(this._stepper)
      .type(this._element.MorphArray).to(a);

    this.queue(function () {
      morpher.from(this._element.array());
    }, function (pos) {
      this._element.plot(morpher.at(pos));
      return morpher.done()
    });

    this._rememberMorpher('plot', morpher);
    return this
  },

  // Add leading method
  leading (value) {
    return this._queueNumber('leading', value)
  },

  // Add animatable viewbox
  viewbox (x, y, width, height) {
    return this._queueObject('viewbox', new Box(x, y, width, height))
  },

  update (o) {
    if (typeof o !== 'object') {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      })
    }

    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', o.offset);

    return this
  }
});

extend(Runner, { rx, ry, from, to });
register(Runner, 'Runner');

class Svg extends Container {
  constructor (node) {
    super(nodeOrNew('svg', node), node);
    this.namespace();
  }

  isRoot () {
    return !this.node.parentNode
      || !(this.node.parentNode instanceof globals.window.SVGElement)
      || this.node.parentNode.nodeName === '#document'
  }

  // Check if this is a root svg
  // If not, call docs from this element
  root () {
    if (this.isRoot()) return this
    return super.root()
  }

  // Add namespaces
  namespace () {
    if (!this.isRoot()) return this.root().namespace()
    return this
      .attr({ xmlns: ns, version: '1.1' })
      .attr('xmlns:xlink', xlink, xmlns)
      .attr('xmlns:svgjs', svgjs, xmlns)
  }

  // Creates and returns defs element
  defs () {
    if (!this.isRoot()) return this.root().defs()

    return adopt(this.node.querySelector('defs'))
      || this.put(new Defs())
  }

  // custom parent method
  parent (type) {
    if (this.isRoot()) {
      return this.node.parentNode.nodeName === '#document'
        ? null
        : adopt(this.node.parentNode)
    }

    return super.parent(type)
  }

  clear () {
    // remove children
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }

    // remove defs reference
    delete this._defs;

    return this
  }
}

registerMethods({
  Container: {
    // Create nested svg document
    nested: wrapWithAttrCheck(function () {
      return this.put(new Svg())
    })
  }
});

register(Svg, 'Svg', true);

class Symbol$1 extends Container {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('symbol', node), node);
  }
}

registerMethods({
  Container: {
    symbol: wrapWithAttrCheck(function () {
      return this.put(new Symbol$1())
    })
  }
});

register(Symbol$1, 'Symbol');

// Create plain text node
function plain (text) {
  // clear if build mode is disabled
  if (this._build === false) {
    this.clear();
  }

  // create text node
  this.node.appendChild(globals.document.createTextNode(text));

  return this
}

// Get length of text element
function length () {
  return this.node.getComputedTextLength()
}

var textable = /*#__PURE__*/Object.freeze({
    __proto__: null,
    plain: plain,
    length: length
});

class Text extends Shape$1 {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('text', node), node);

    this.dom.leading = new SVGNumber(1.3); // store leading value for rebuilding
    this._rebuild = true; // enable automatic updating of dy values
    this._build = false; // disable build mode for adding multiple lines
  }

  // Move over x-axis
  // Text is moved its bounding box
  // text-anchor does NOT matter
  x (x, box = this.bbox()) {
    if (x == null) {
      return box.x
    }

    return this.attr('x', this.attr('x') + x - box.x)
  }

  // Move over y-axis
  y (y, box = this.bbox()) {
    if (y == null) {
      return box.y
    }

    return this.attr('y', this.attr('y') + y - box.y)
  }

  move (x, y, box = this.bbox()) {
    return this.x(x, box).y(y, box)
  }

  // Move center over x-axis
  cx (x, box = this.bbox()) {
    if (x == null) {
      return box.cx
    }

    return this.attr('x', this.attr('x') + x - box.cx)
  }

  // Move center over y-axis
  cy (y, box = this.bbox()) {
    if (y == null) {
      return box.cy
    }

    return this.attr('y', this.attr('y') + y - box.cy)
  }

  center (x, y, box = this.bbox()) {
    return this.cx(x, box).cy(y, box)
  }

  // Set the text content
  text (text) {
    // act as getter
    if (text === undefined) {
      var children = this.node.childNodes;
      var firstLine = 0;
      text = '';

      for (var i = 0, len = children.length; i < len; ++i) {
        // skip textPaths - they are no lines
        if (children[i].nodeName === 'textPath') {
          if (i === 0) firstLine = 1;
          continue
        }

        // add newline if its not the first child and newLined is set to true
        if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
          text += '\n';
        }

        // add content of this node
        text += children[i].textContent;
      }

      return text
    }

    // remove existing content
    this.clear().build(true);

    if (typeof text === 'function') {
      // call block
      text.call(this, this);
    } else {
      // store text and make sure text is not blank
      text = text.split('\n');

      // build new lines
      for (var j = 0, jl = text.length; j < jl; j++) {
        this.tspan(text[j]).newLine();
      }
    }

    // disable build mode and rebuild lines
    return this.build(false).rebuild()
  }

  // Set / get leading
  leading (value) {
    // act as getter
    if (value == null) {
      return this.dom.leading
    }

    // act as setter
    this.dom.leading = new SVGNumber(value);

    return this.rebuild()
  }

  // Rebuild appearance type
  rebuild (rebuild) {
    // store new rebuild flag if given
    if (typeof rebuild === 'boolean') {
      this._rebuild = rebuild;
    }

    // define position of all lines
    if (this._rebuild) {
      var self = this;
      var blankLineOffset = 0;
      var leading = this.dom.leading;

      this.each(function () {
        var fontSize = globals.window.getComputedStyle(this.node)
          .getPropertyValue('font-size');
        var dy = leading * new SVGNumber(fontSize);

        if (this.dom.newLined) {
          this.attr('x', self.attr('x'));

          if (this.text() === '\n') {
            blankLineOffset += dy;
          } else {
            this.attr('dy', dy + blankLineOffset);
            blankLineOffset = 0;
          }
        }
      });

      this.fire('rebuild');
    }

    return this
  }

  // Enable / disable build mode
  build (build) {
    this._build = !!build;
    return this
  }

  // overwrite method from parent to set data properly
  setData (o) {
    this.dom = o;
    this.dom.leading = new SVGNumber(o.leading || 1.3);
    return this
  }
}

extend(Text, textable);

registerMethods({
  Container: {
    // Create text element
    text: wrapWithAttrCheck(function (text) {
      return this.put(new Text()).text(text)
    }),

    // Create plain text element
    plain: wrapWithAttrCheck(function (text) {
      return this.put(new Text()).plain(text)
    })
  }
});

register(Text, 'Text');

class Tspan extends Text {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('tspan', node), node);
  }

  // Set text content
  text (text) {
    if (text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '')

    typeof text === 'function' ? text.call(this, this) : this.plain(text);

    return this
  }

  // Shortcut dx
  dx (dx) {
    return this.attr('dx', dx)
  }

  // Shortcut dy
  dy (dy) {
    return this.attr('dy', dy)
  }

  x (x) {
    return this.attr('x', x)
  }

  y (y) {
    return this.attr('x', y)
  }

  move (x, y) {
    return this.x(x).y(y)
  }

  // Create new line
  newLine () {
    // fetch text parent
    var t = this.parent(Text);

    // mark new line
    this.dom.newLined = true;

    var fontSize = globals.window.getComputedStyle(this.node)
      .getPropertyValue('font-size');
    var dy = t.dom.leading * new SVGNumber(fontSize);

    // apply new position
    return this.dy(dy).attr('x', t.x())
  }
}

extend(Tspan, textable);

registerMethods({
  Tspan: {
    tspan: wrapWithAttrCheck(function (text) {
      var tspan = new Tspan();

      // clear if build mode is disabled
      if (!this._build) {
        this.clear();
      }

      // add new tspan
      this.node.appendChild(tspan.node);

      return tspan.text(text)
    })
  }
});

register(Tspan, 'Tspan');

class ClipPath extends Container {
  constructor (node) {
    super(nodeOrNew('clipPath', node), node);
  }

  // Unclip all clipped elements and remove itself
  remove () {
    // unclip all targets
    this.targets().forEach(function (el) {
      el.unclip();
    });

    // remove clipPath from parent
    return super.remove()
  }

  targets () {
    return baseFind('svg [clip-path*="' + this.id() + '"]')
  }
}

registerMethods({
  Container: {
    // Create clipping element
    clip: wrapWithAttrCheck(function () {
      return this.defs().put(new ClipPath())
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipWith (element) {
      // use given clip or create a new one
      const clipper = element instanceof ClipPath
        ? element
        : this.parent().clip().add(element);

      // apply mask
      return this.attr('clip-path', 'url("#' + clipper.id() + '")')
    },

    // Unclip element
    unclip () {
      return this.attr('clip-path', null)
    },

    clipper () {
      return this.reference('clip-path')
    }
  }
});

register(ClipPath, 'ClipPath');

class ForeignObject extends Element {
  constructor (node) {
    super(nodeOrNew('foreignObject', node), node);
  }
}

registerMethods({
  Container: {
    foreignObject: wrapWithAttrCheck(function (width, height) {
      return this.put(new ForeignObject()).size(width, height)
    })
  }
});

register(ForeignObject, 'ForeignObject');

class G extends Container {
  constructor (node) {
    super(nodeOrNew('g', node), node);
  }

  x (x, box = this.bbox()) {
    if (x == null) return box.x
    return this.move(x, box.y, box)
  }

  y (y, box = this.bbox()) {
    if (y == null) return box.y
    return this.move(box.x, y, box)
  }

  move (x = 0, y = 0, box = this.bbox()) {
    const dx = x - box.x;
    const dy = y - box.y;

    return this.dmove(dx, dy)
  }

  dx (dx) {
    return this.dmove(dx, 0)
  }

  dy (dy) {
    return this.dmove(0, dy)
  }

  dmove (dx, dy) {
    this.children().forEach((child, i) => {
      // Get the childs bbox
      const bbox = child.bbox();
      // Get childs matrix
      const m = new Matrix(child);
      // Translate childs matrix by amount and
      // transform it back into parents space
      const matrix = m.translate(dx, dy).transform(m.inverse());
      // Calculate new x and y from old box
      const p = new Point(bbox.x, bbox.y).transform(matrix);
      // Move element
      child.move(p.x, p.y);
    });

    return this
  }

  width (width, box = this.bbox()) {
    if (width == null) return box.width
    return this.size(width, box.height, box)
  }

  height (height, box = this.bbox()) {
    if (height == null) return box.height
    return this.size(box.width, height, box)
  }

  size (width, height, box = this.bbox()) {
    const p = proportionalSize(this, width, height, box);
    const scaleX = p.width / box.width;
    const scaleY = p.height / box.height;

    this.children().forEach((child, i) => {
      const o = new Point(box).transform(new Matrix(child).inverse());
      child.scale(scaleX, scaleY, o.x, o.y);
    });

    return this
  }
}

registerMethods({
  Container: {
    // Create a group element
    group: wrapWithAttrCheck(function () {
      return this.put(new G())
    })
  }
});

register(G, 'G');

class A extends Container {
  constructor (node) {
    super(nodeOrNew('a', node), node);
  }

  // Link url
  to (url) {
    return this.attr('href', url, xlink)
  }

  // Link target attribute
  target (target) {
    return this.attr('target', target)
  }
}

registerMethods({
  Container: {
    // Create a hyperlink element
    link: wrapWithAttrCheck(function (url) {
      return this.put(new A()).to(url)
    })
  },
  Element: {
    // Create a hyperlink element
    linkTo: function (url) {
      var link = new A();

      if (typeof url === 'function') {
        url.call(link, link);
      } else {
        link.to(url);
      }

      return this.parent().put(link).put(this)
    }
  }
});

register(A, 'A');

class Mask extends Container {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('mask', node), node);
  }

  // Unmask all masked elements and remove itself
  remove () {
    // unmask all targets
    this.targets().forEach(function (el) {
      el.unmask();
    });

    // remove mask from parent
    return super.remove()
  }

  targets () {
    return baseFind('svg [mask*="' + this.id() + '"]')
  }
}

registerMethods({
  Container: {
    mask: wrapWithAttrCheck(function () {
      return this.defs().put(new Mask())
    })
  },
  Element: {
    // Distribute mask to svg element
    maskWith (element) {
      // use given mask or create a new one
      var masker = element instanceof Mask
        ? element
        : this.parent().mask().add(element);

      // apply mask
      return this.attr('mask', 'url("#' + masker.id() + '")')
    },

    // Unmask element
    unmask () {
      return this.attr('mask', null)
    },

    masker () {
      return this.reference('mask')
    }
  }
});

register(Mask, 'Mask');

function cssRule (selector, rule) {
  if (!selector) return ''
  if (!rule) return selector

  var ret = selector + '{';

  for (var i in rule) {
    ret += unCamelCase(i) + ':' + rule[i] + ';';
  }

  ret += '}';

  return ret
}

class Style extends Element {
  constructor (node) {
    super(nodeOrNew('style', node), node);
  }

  addText (w = '') {
    this.node.textContent += w;
    return this
  }

  font (name, src, params = {}) {
    return this.rule('@font-face', {
      fontFamily: name,
      src: src,
      ...params
    })
  }

  rule (selector, obj) {
    return this.addText(cssRule(selector, obj))
  }
}

registerMethods('Dom', {
  style: wrapWithAttrCheck(function (selector, obj) {
    return this.put(new Style()).rule(selector, obj)
  }),
  fontface: wrapWithAttrCheck(function (name, src, params) {
    return this.put(new Style()).font(name, src, params)
  })
});

register(Style, 'Style');

class TextPath extends Text {
  // Initialize node
  constructor (node) {
    super(nodeOrNew('textPath', node), node);
  }

  // return the array of the path track element
  array () {
    var track = this.track();

    return track ? track.array() : null
  }

  // Plot path if any
  plot (d) {
    var track = this.track();
    var pathArray = null;

    if (track) {
      pathArray = track.plot(d);
    }

    return (d == null) ? pathArray : this
  }

  // Get the path element
  track () {
    return this.reference('href')
  }
}

registerMethods({
  Container: {
    textPath: wrapWithAttrCheck(function (text, path) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = this.text(text);
      }

      return text.path(path)
    })
  },
  Text: {
    // Create path for text to run on
    path: wrapWithAttrCheck(function (track, importNodes = true) {
      var textPath = new TextPath();

      // if track is a path, reuse it
      if (!(track instanceof Path)) {
        // create path element
        track = this.defs().path(track);
      }

      // link textPath to path and add content
      textPath.attr('href', '#' + track, xlink);

      // Transplant all nodes from text to textPath
      let node;
      if (importNodes) {
        while ((node = this.node.firstChild)) {
          textPath.node.appendChild(node);
        }
      }

      // add textPath element as child node and return textPath
      return this.put(textPath)
    }),

    // Get the textPath children
    textPath () {
      return this.findOne('textPath')
    }
  },
  Path: {
    // creates a textPath from this path
    text: wrapWithAttrCheck(function (text) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = new Text().addTo(this.parent()).text(text);
      }

      // Create textPath from text and path and return
      return text.path(this)
    }),

    targets () {
      return baseFind('svg [href*="' + this.id() + '"]')
    }
  }
});

TextPath.prototype.MorphArray = PathArray;
register(TextPath, 'TextPath');

class Use extends Shape$1 {
  constructor (node) {
    super(nodeOrNew('use', node), node);
  }

  // Use element as a reference
  element (element, file) {
    // Set lined element
    return this.attr('href', (file || '') + '#' + element, xlink)
  }
}

registerMethods({
  Container: {
    // Create a use element
    use: wrapWithAttrCheck(function (element, file) {
      return this.put(new Use()).element(element, file)
    })
  }
});

register(Use, 'Use');

/* Optional Modules */
const SVG = makeInstance;

extend([
  Svg,
  Symbol$1,
  Image,
  Pattern,
  Marker
], getMethodsFor('viewbox'));

extend([
  Line,
  Polyline,
  Polygon,
  Path
], getMethodsFor('marker'));

extend(Text, getMethodsFor('Text'));
extend(Path, getMethodsFor('Path'));

extend(Defs, getMethodsFor('Defs'));

extend([
  Text,
  Tspan
], getMethodsFor('Tspan'));

extend([
  Rect,
  Ellipse,
  Circle,
  Gradient
], getMethodsFor('radius'));

extend(EventTarget, getMethodsFor('EventTarget'));
extend(Dom, getMethodsFor('Dom'));
extend(Element, getMethodsFor('Element'));
extend(Shape$1, getMethodsFor('Shape'));
// extend(Element, getConstructor('Memory'))
extend(Container, getMethodsFor('Container'));

extend(Runner, getMethodsFor('Runner'));

List.extend(getMethodNames());

registerMorphableType([
  SVGNumber,
  Color,
  Box,
  Matrix,
  SVGArray,
  PointArray,
  PathArray
]);

makeMorphable();

function isNode() {
    // tslint:disable-next-line:strict-type-predicates
    return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
}

var SvgJsRenderer = /** @class */ (function (_super) {
    __extends(SvgJsRenderer, _super);
    function SvgJsRenderer(container) {
        var _this = _super.call(this, container) || this;
        // initialize the SVG
        var width = constants.width;
        var height = 0;
        /*
        For some reason the container needs to be initiated differently with svgdom (node) and
        and in the browser. Might be a bug in either svg.js or svgdom. But this workaround works fine
        so I'm not going to care for now.
         */
        /* istanbul ignore else */
        if (isNode()) {
            // node (jest)
            _this.svg = SVG(container);
        }
        else {
            // browser
            _this.svg = SVG().addTo(container);
        }
        _this.svg.attr('preserveAspectRatio', 'xMidYMid meet').viewbox(0, 0, width, height);
        return _this;
    }
    SvgJsRenderer.prototype.title = function (title) {
        this.svg.add(this.svg.element('title').words(title));
    };
    SvgJsRenderer.prototype.line = function (fromX, fromY, toX, toY, strokeWidth, color) {
        this.svg.line(fromX, fromY, toX, toY).stroke({ color: color, width: strokeWidth });
    };
    SvgJsRenderer.prototype.size = function (width, height) {
        this.svg.viewbox(0, 0, width, height);
    };
    SvgJsRenderer.prototype.clear = function () {
        this.svg.children().forEach(function (child) { return child.remove(); });
    };
    SvgJsRenderer.prototype.remove = function () {
        this.svg.remove();
    };
    SvgJsRenderer.prototype.background = function (color) {
        this.svg.rect().size('100%', '100%').fill(color);
    };
    SvgJsRenderer.prototype.text = function (text, x, y, fontSize, color, fontFamily, alignment, classes, plain) {
        var element;
        if (plain) {
            // create a text element centered at x,y. No SVG.js magic.
            element = this.svg
                .plain(text)
                .attr({
                x: x,
                y: y,
            })
                .font({
                family: fontFamily,
                size: fontSize,
                anchor: alignment,
                'dominant-baseline': 'central',
            })
                .fill(color)
                .addClass(Renderer.toClassName(classes));
        }
        else {
            element = this.svg
                .text(text)
                .move(x, y)
                .font({
                family: fontFamily,
                size: fontSize,
                anchor: alignment,
            })
                .fill(color)
                .addClass(Renderer.toClassName(classes));
        }
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.circle = function (x, y, diameter, strokeWidth, strokeColor, fill, classes) {
        var element = this.svg
            .circle(diameter)
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            color: strokeColor,
            width: strokeWidth,
        })
            .addClass(Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.rect = function (x, y, width, height, strokeWidth, strokeColor, classes, fill, radius) {
        var element = this.svg
            .rect(width, height)
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            width: strokeWidth,
            color: strokeColor,
        })
            .radius(radius || 0)
            .addClass(Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.triangle = function (x, y, size, strokeWidth, strokeColor, classes, fill) {
        var element = this.svg
            .path(Renderer.trianglePath(x, y, size))
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            width: strokeWidth,
            color: strokeColor,
        })
            .addClass(Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.prototype.pentagon = function (x, y, size, strokeWidth, strokeColor, fill, classes) {
        return this.ngon(x, y, size, strokeWidth, strokeColor, fill, 5, classes);
    };
    SvgJsRenderer.prototype.ngon = function (x, y, size, strokeWidth, strokeColor, fill, edges, classes) {
        var element = this.svg
            .path(Renderer.ngonPath(x, y, size, edges))
            .move(x, y)
            .fill(fill || 'none')
            .stroke({
            width: strokeWidth,
            color: strokeColor,
        })
            .addClass(Renderer.toClassName(classes));
        return SvgJsRenderer.boxToElement(element.bbox(), element.remove.bind(element));
    };
    SvgJsRenderer.boxToElement = function (box, remove) {
        return {
            width: box.width,
            height: box.height,
            x: box.x,
            y: box.y,
            remove: remove,
        };
    };
    return SvgJsRenderer;
}(Renderer));

function range(length, from) {
    if (from === void 0) { from = 0; }
    return Array.from({ length: length }, function (_, i) { return i + from; });
}

/**
 * Value for an open string (O)
 */
var OPEN = 0;
/**
 * Value for a silent string (X)
 */
var SILENT = 'x';
/**
 * Possible positions of the fret label (eg. "3fr").
 */
var FretLabelPosition;
(function (FretLabelPosition) {
    FretLabelPosition["LEFT"] = "left";
    FretLabelPosition["RIGHT"] = "right";
})(FretLabelPosition || (FretLabelPosition = {}));
var Shape;
(function (Shape) {
    Shape["CIRCLE"] = "circle";
    Shape["SQUARE"] = "square";
    Shape["TRIANGLE"] = "triangle";
    Shape["PENTAGON"] = "pentagon";
})(Shape || (Shape = {}));
var ChordStyle;
(function (ChordStyle) {
    ChordStyle["normal"] = "normal";
    ChordStyle["handdrawn"] = "handdrawn";
})(ChordStyle || (ChordStyle = {}));
var Orientation;
(function (Orientation) {
    Orientation["vertical"] = "vertical";
    Orientation["horizontal"] = "horizontal";
})(Orientation || (Orientation = {}));
var ElementType;
(function (ElementType) {
    ElementType["FRET"] = "fret";
    ElementType["STRING"] = "string";
    ElementType["BARRE"] = "barre";
    ElementType["BARRE_TEXT"] = "barre-text";
    ElementType["FINGER"] = "finger";
    ElementType["TITLE"] = "title";
    ElementType["TUNING"] = "tuning";
    ElementType["FRET_POSITION"] = "fret-position";
    ElementType["STRING_TEXT"] = "string-text";
    ElementType["SILENT_STRING"] = "silent-string";
    ElementType["OPEN_STRING"] = "open-string";
    ElementType["WATERMARK"] = "watermark";
})(ElementType || (ElementType = {}));
var defaultSettings = {
    style: ChordStyle.normal,
    strings: 6,
    frets: 5,
    position: 1,
    tuning: [],
    tuningsFontSize: 28,
    fretLabelFontSize: 38,
    fretLabelPosition: FretLabelPosition.RIGHT,
    fingerSize: 0.65,
    fingerTextColor: '#FFF',
    fingerTextSize: 24,
    fingerStrokeWidth: 0,
    barreChordStrokeWidth: 0,
    sidePadding: 0.2,
    titleFontSize: 48,
    titleBottomMargin: 0,
    color: '#000',
    emptyStringIndicatorSize: 0.6,
    strokeWidth: 2,
    nutWidth: 10,
    fretSize: 1.5,
    barreChordRadius: 0.25,
    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    shape: Shape.CIRCLE,
    orientation: Orientation.vertical,
    watermarkFontSize: 12,
    noPosition: false,
};
var SVGuitarChord = /** @class */ (function () {
    function SVGuitarChord(container) {
        var _this = this;
        this.container = container;
        this.settings = {};
        this.chordInternal = { fingers: [], barres: [] };
        // apply plugins
        // https://stackoverflow.com/a/16345172
        var classConstructor = this.constructor;
        classConstructor.plugins.forEach(function (plugin) {
            Object.assign(_this, plugin(_this));
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    SVGuitarChord.plugin = function (plugin) {
        var _a;
        var currentPlugins = this.plugins;
        var BaseWithPlugins = (_a = /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return class_1;
            }(this)),
            _a.plugins = currentPlugins.concat(plugin),
            _a);
        return BaseWithPlugins;
    };
    Object.defineProperty(SVGuitarChord.prototype, "renderer", {
        get: function () {
            var _a;
            if (!this.rendererInternal) {
                var style = (_a = this.settings.style) !== null && _a !== void 0 ? _a : defaultSettings.style;
                switch (style) {
                    case ChordStyle.normal:
                        this.rendererInternal = new SvgJsRenderer(this.container);
                        break;
                    case ChordStyle.handdrawn:
                        this.rendererInternal = new RoughJsRenderer(this.container);
                        break;
                    default:
                        throw new Error("".concat(style, " is not a valid chord diagram style."));
                }
            }
            return this.rendererInternal;
        },
        enumerable: false,
        configurable: true
    });
    SVGuitarChord.prototype.configure = function (settings) {
        SVGuitarChord.sanityCheckSettings(settings);
        // special case for style: remove current renderer instance if style changed. The new renderer
        // instance will be created lazily.
        if (settings.style !== this.settings.style) {
            this.renderer.remove();
            delete this.rendererInternal;
        }
        this.settings = __assign(__assign({}, this.settings), settings);
        return this;
    };
    SVGuitarChord.prototype.chord = function (chord) {
        this.chordInternal = chord;
        return this;
    };
    SVGuitarChord.prototype.draw = function () {
        var _a;
        this.clear();
        this.drawBackground();
        if (this.settings.svgTitle) {
            this.renderer.title(this.settings.svgTitle);
        }
        var y;
        y = this.drawTitle((_a = this.settings.titleFontSize) !== null && _a !== void 0 ? _a : defaultSettings.titleFontSize);
        y = this.drawEmptyStringIndicators(y);
        y = this.drawTopFret(y);
        this.drawPosition(y);
        y = this.drawGrid(y);
        y = this.drawTunings(y);
        y = this.drawWatermark(y);
        // now set the final height of the svg (and add some padding relative to the fret spacing)
        y += this.fretSpacing() / 10;
        var width = this.width(constants.width, y);
        var height = this.height(y, constants.width);
        this.renderer.size(width, height);
        this.drawTopEdges(y);
        return {
            width: constants.width,
            height: y,
        };
    };
    SVGuitarChord.sanityCheckSettings = function (settings) {
        if (typeof settings.strings !== 'undefined' && settings.strings <= 1) {
            throw new Error('Must have at least 2 strings');
        }
        if (typeof settings.frets !== 'undefined' && settings.frets < 0) {
            throw new Error('Cannot have less than 0 frets');
        }
        if (typeof settings.position !== 'undefined' && settings.position < 1) {
            throw new Error('Position cannot be less than 1');
        }
        if (typeof settings.fretSize !== 'undefined' && settings.fretSize < 0) {
            throw new Error('Fret size cannot be smaller than 0');
        }
        if (typeof settings.fingerSize !== 'undefined' && settings.fingerSize < 0) {
            throw new Error('Finger size cannot be smaller than 0');
        }
        if (typeof settings.strokeWidth !== 'undefined' && settings.strokeWidth < 0) {
            throw new Error('Stroke width cannot be smaller than 0');
        }
    };
    SVGuitarChord.prototype.drawTunings = function (y) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        // add some padding relative to the fret spacing
        var padding = this.fretSpacing() / 5;
        var stringXPositions = this.stringXPos();
        var strings = (_a = this.settings.strings) !== null && _a !== void 0 ? _a : defaultSettings.strings;
        var color = (_c = (_b = this.settings.tuningsColor) !== null && _b !== void 0 ? _b : this.settings.color) !== null && _c !== void 0 ? _c : defaultSettings.color;
        var tuning = (_d = this.settings.tuning) !== null && _d !== void 0 ? _d : defaultSettings.tuning;
        var fontFamily = (_e = this.settings.fontFamily) !== null && _e !== void 0 ? _e : defaultSettings.fontFamily;
        var tuningsFontSize = (_f = this.settings.tuningsFontSize) !== null && _f !== void 0 ? _f : defaultSettings.tuningsFontSize;
        var text;
        tuning.forEach(function (tuning_, i) {
            if (i < strings) {
                var classNames = [ElementType.TUNING, "".concat(ElementType.TUNING, "-").concat(i)];
                var _a = _this.coordinates(stringXPositions[i], y + padding), textX = _a.x, textY = _a.y;
                var tuningText = _this.renderer.text(tuning_, textX, textY, tuningsFontSize, color, fontFamily, Alignment.MIDDLE, classNames, true);
                if (tuning_) {
                    text = tuningText;
                }
            }
        });
        if (text) {
            return y + this.height(text.height, text.width);
        }
        return y;
    };
    SVGuitarChord.prototype.drawWatermark = function (y) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!this.settings.watermark) {
            return y;
        }
        var padding = this.fretSpacing() / 5;
        var orientation = (_a = this.settings.orientation) !== null && _a !== void 0 ? _a : defaultSettings.orientation;
        var stringXPositions = this.stringXPos();
        var endX = stringXPositions[stringXPositions.length - 1];
        var startX = stringXPositions[0];
        var color = (_c = (_b = this.settings.watermarkColor) !== null && _b !== void 0 ? _b : this.settings.color) !== null && _c !== void 0 ? _c : defaultSettings.color;
        var fontSize = (_d = this.settings.watermarkFontSize) !== null && _d !== void 0 ? _d : defaultSettings.watermarkFontSize;
        var fontFamily = (_f = (_e = this.settings.watermarkFontFamily) !== null && _e !== void 0 ? _e : this.settings.fontFamily) !== null && _f !== void 0 ? _f : defaultSettings.fontFamily;
        var textX;
        var textY;
        if (orientation === Orientation.vertical) {
            textX = startX + (endX - startX) / 2;
            textY = y + padding;
        }
        else {
            var lastFret = y;
            var firstFret = y - ((_g = this.settings.frets) !== null && _g !== void 0 ? _g : defaultSettings.frets) * this.fretSpacing();
            textX = firstFret + (lastFret - firstFret) / 2;
            textY = this.y(startX, 0) + padding;
        }
        var height = this.renderer.text(this.settings.watermark, textX, textY, fontSize, color, fontFamily, Alignment.MIDDLE, ElementType.WATERMARK).height;
        return y + height * 2;
    };
    SVGuitarChord.prototype.drawPosition = function (y) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var position = (_b = (_a = this.chordInternal.position) !== null && _a !== void 0 ? _a : this.settings.position) !== null && _b !== void 0 ? _b : defaultSettings.position;
        var noPosition = (_c = this.settings.noPosition) !== null && _c !== void 0 ? _c : defaultSettings.noPosition;
        if (position <= 1 || noPosition) {
            return;
        }
        var stringXPositions = this.stringXPos();
        var endX = stringXPositions[stringXPositions.length - 1];
        var startX = stringXPositions[0];
        var text = "".concat(position, "fr");
        var size = (_d = this.settings.fretLabelFontSize) !== null && _d !== void 0 ? _d : defaultSettings.fretLabelFontSize;
        var color = (_f = (_e = this.settings.fretLabelColor) !== null && _e !== void 0 ? _e : this.settings.color) !== null && _f !== void 0 ? _f : defaultSettings.color;
        var fingerSize = this.stringSpacing() * ((_g = this.settings.fingerSize) !== null && _g !== void 0 ? _g : defaultSettings.fingerSize);
        var fontFamily = (_h = this.settings.fontFamily) !== null && _h !== void 0 ? _h : defaultSettings.fontFamily;
        var fretLabelPosition = (_j = this.settings.fretLabelPosition) !== null && _j !== void 0 ? _j : defaultSettings.fretLabelPosition;
        // add some padding relative to the string spacing. Also make sure the padding is at least
        // 1/2 fingerSize plus some padding to prevent the finger overlapping the position label.
        var padding = Math.max(this.stringSpacing() / 5, fingerSize / 2 + 5);
        var className = ElementType.FRET_POSITION;
        if (this.orientation === Orientation.vertical) {
            var drawText_1 = function (sizeMultiplier) {
                if (sizeMultiplier === void 0) { sizeMultiplier = 1; }
                if (sizeMultiplier < 0.01) {
                    // text does not fit: don't render it at all.
                    // eslint-disable-next-line no-console
                    console.warn('Not enough space to draw the starting fret');
                    return;
                }
                if (fretLabelPosition === FretLabelPosition.RIGHT) {
                    var svgText = _this.renderer.text(text, endX + padding, y, size * sizeMultiplier, color, fontFamily, Alignment.LEFT, className);
                    var width = svgText.width, x = svgText.x;
                    if (x + width > constants.width) {
                        svgText.remove();
                        drawText_1(sizeMultiplier * 0.9);
                    }
                }
                else {
                    var svgText = _this.renderer.text(text, 1 / sizeMultiplier + startX - padding, y, size * sizeMultiplier, color, fontFamily, Alignment.RIGHT, className);
                    var x = svgText.x;
                    if (x < 0) {
                        svgText.remove();
                        drawText_1(sizeMultiplier * 0.8);
                    }
                }
            };
            drawText_1();
            return;
        }
        // Horizontal orientation
        var _k = fretLabelPosition === FretLabelPosition.RIGHT
            ? this.coordinates(endX + padding, y)
            : this.coordinates(startX - padding, y), textX = _k.x, textY = _k.y;
        this.renderer.text(text, textX, textY, size, color, fontFamily, Alignment.MIDDLE, className, true);
    };
    /**
     * Hack to prevent the empty space of the svg from being cut off without having to define a
     * fixed width
     */
    SVGuitarChord.prototype.drawTopEdges = function (y) {
        var _a;
        var orientation = (_a = this.settings.orientation) !== null && _a !== void 0 ? _a : defaultSettings.orientation;
        var xTopRight = orientation === Orientation.vertical ? constants.width : y;
        this.renderer.circle(0, 0, 0, 0, 'transparent', 'none', 'top-left');
        this.renderer.circle(xTopRight, 0, 0, 0, 'transparent', 'none', 'top-right');
    };
    SVGuitarChord.prototype.drawBackground = function () {
        if (this.settings.backgroundColor) {
            this.renderer.background(this.settings.backgroundColor);
        }
    };
    SVGuitarChord.prototype.drawTopFret = function (y) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var stringXpositions = this.stringXPos();
        var strokeWidth = (_a = this.settings.strokeWidth) !== null && _a !== void 0 ? _a : defaultSettings.strokeWidth;
        var nutWidth = (_c = (_b = this.settings.topFretWidth) !== null && _b !== void 0 ? _b : this.settings.nutWidth) !== null && _c !== void 0 ? _c : defaultSettings.nutWidth;
        var startX = stringXpositions[0] - strokeWidth / 2;
        var endX = stringXpositions[stringXpositions.length - 1] + strokeWidth / 2;
        var position = (_e = (_d = this.chordInternal.position) !== null && _d !== void 0 ? _d : this.settings.position) !== null && _e !== void 0 ? _e : defaultSettings.position;
        var color = (_g = (_f = this.settings.fretColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var noPositon = (_h = this.settings.noPosition) !== null && _h !== void 0 ? _h : defaultSettings.noPosition;
        var fretSize;
        if (position > 1 || noPositon) {
            fretSize = strokeWidth;
        }
        else {
            fretSize = nutWidth;
        }
        var _j = this.coordinates(startX, y + fretSize / 2), lineX1 = _j.x, lineY1 = _j.y;
        var _k = this.coordinates(endX, y + fretSize / 2), lineX2 = _k.x, lineY2 = _k.y;
        this.renderer.line(lineX1, lineY1, lineX2, lineY2, fretSize, color, ['top-fret', 'fret-0']);
        return y + fretSize;
    };
    SVGuitarChord.prototype.stringXPos = function () {
        var _a, _b;
        var strings = (_a = this.settings.strings) !== null && _a !== void 0 ? _a : defaultSettings.strings;
        var sidePadding = (_b = this.settings.sidePadding) !== null && _b !== void 0 ? _b : defaultSettings.sidePadding;
        var startX = constants.width * sidePadding;
        var stringsSpacing = this.stringSpacing();
        return range(strings).map(function (i) { return startX + stringsSpacing * i; });
    };
    SVGuitarChord.prototype.stringSpacing = function () {
        var _a, _b;
        var sidePadding = (_a = this.settings.sidePadding) !== null && _a !== void 0 ? _a : defaultSettings.sidePadding;
        var strings = (_b = this.settings.strings) !== null && _b !== void 0 ? _b : defaultSettings.strings;
        var startX = constants.width * sidePadding;
        var endX = constants.width - startX;
        var width = endX - startX;
        return width / (strings - 1);
    };
    SVGuitarChord.prototype.fretSpacing = function () {
        var _a;
        var stringSpacing = this.stringSpacing();
        var fretSize = (_a = this.settings.fretSize) !== null && _a !== void 0 ? _a : defaultSettings.fretSize;
        return stringSpacing * fretSize;
    };
    SVGuitarChord.prototype.fretLinesYPos = function (startY) {
        var _a;
        var frets = (_a = this.settings.frets) !== null && _a !== void 0 ? _a : defaultSettings.frets;
        var fretSpacing = this.fretSpacing();
        return range(frets, 1).map(function (i) { return startY + fretSpacing * i; });
    };
    SVGuitarChord.prototype.toArrayIndex = function (stringIndex) {
        var _a;
        var strings = (_a = this.settings.strings) !== null && _a !== void 0 ? _a : defaultSettings.strings;
        return Math.abs(stringIndex - strings);
    };
    SVGuitarChord.prototype.drawEmptyStringIndicators = function (y) {
        var _this = this;
        var _a, _b, _c;
        var stringXPositions = this.stringXPos();
        var stringSpacing = this.stringSpacing();
        var emptyStringIndicatorSize = (_a = this.settings.emptyStringIndicatorSize) !== null && _a !== void 0 ? _a : defaultSettings.emptyStringIndicatorSize;
        var size = emptyStringIndicatorSize * stringSpacing;
        // add some space above and below the indicator, relative to the indicator size
        var padding = size / 3;
        var color = (_b = this.settings.color) !== null && _b !== void 0 ? _b : defaultSettings.color;
        var strokeWidth = (_c = this.settings.strokeWidth) !== null && _c !== void 0 ? _c : defaultSettings.strokeWidth;
        var hasEmpty = false;
        this.chordInternal.fingers
            .filter(function (_a) {
            var _b = __read(_a, 2), value = _b[1];
            return value === SILENT || value === OPEN;
        })
            .map(function (_a) {
            var _b = __read(_a, 3), index = _b[0], value = _b[1], textOrOptions = _b[2];
            return [
                _this.toArrayIndex(index),
                value,
                textOrOptions,
            ];
        })
            .forEach(function (_a) {
            var _b, _c, _d, _e, _f, _g;
            var _h = __read(_a, 3), stringIndex = _h[0], value = _h[1], textOrOptions = _h[2];
            hasEmpty = true;
            var fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions);
            var effectiveStrokeWidth = (_b = fingerOptions.strokeWidth) !== null && _b !== void 0 ? _b : strokeWidth;
            var effectiveStrokeColor = (_c = fingerOptions.strokeColor) !== null && _c !== void 0 ? _c : color;
            if (fingerOptions.text) {
                var textColor = (_e = (_d = fingerOptions.textColor) !== null && _d !== void 0 ? _d : _this.settings.color) !== null && _e !== void 0 ? _e : defaultSettings.color;
                var textSize = (_f = _this.settings.fingerTextSize) !== null && _f !== void 0 ? _f : defaultSettings.fingerTextSize;
                var fontFamily = (_g = _this.settings.fontFamily) !== null && _g !== void 0 ? _g : defaultSettings.fontFamily;
                var classNames = [ElementType.STRING_TEXT, "".concat(ElementType.STRING_TEXT, "-").concat(stringIndex)];
                var _j = _this.coordinates(stringXPositions[stringIndex], y + padding + size / 2), textX = _j.x, textY = _j.y;
                _this.renderer.text(fingerOptions.text, textX, textY, textSize, textColor, fontFamily, Alignment.MIDDLE, classNames, true);
            }
            if (value === OPEN) {
                // draw an O
                var classNames = [ElementType.OPEN_STRING, "".concat(ElementType.OPEN_STRING, "-").concat(stringIndex)];
                var _k = _this.rectCoordinates(stringXPositions[stringIndex] - size / 2, y + padding, size, size), lineX1 = _k.x, lineY1 = _k.y;
                _this.renderer.circle(lineX1, lineY1, size, effectiveStrokeWidth, effectiveStrokeColor, undefined, classNames);
            }
            else {
                // draw an X
                var classNames = [
                    ElementType.SILENT_STRING,
                    "".concat(ElementType.SILENT_STRING, "-").concat(stringIndex),
                ];
                var startX = stringXPositions[stringIndex] - size / 2;
                var endX = startX + size;
                var startY = y + padding;
                var endY = startY + size;
                var _l = _this.coordinates(startX, startY), line1X1 = _l.x, line1Y1 = _l.y;
                var _m = _this.coordinates(endX, endY), line1X2 = _m.x, line1Y2 = _m.y;
                _this.renderer.line(line1X1, line1Y1, line1X2, line1Y2, effectiveStrokeWidth, effectiveStrokeColor, classNames);
                var _o = _this.coordinates(startX, endY), line2X1 = _o.x, line2Y1 = _o.y;
                var _p = _this.coordinates(endX, startY), line2X2 = _p.x, line2Y2 = _p.y;
                _this.renderer.line(line2X1, line2Y1, line2X2, line2Y2, effectiveStrokeWidth, effectiveStrokeColor, classNames);
            }
        });
        return hasEmpty || this.settings.fixedDiagramPosition ? y + size + 2 * padding : y + padding;
    };
    SVGuitarChord.prototype.drawGrid = function (y) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var frets = (_a = this.settings.frets) !== null && _a !== void 0 ? _a : defaultSettings.frets;
        var fretSize = (_b = this.settings.fretSize) !== null && _b !== void 0 ? _b : defaultSettings.fretSize;
        var relativefingerSize = (_c = this.settings.fingerSize) !== null && _c !== void 0 ? _c : defaultSettings.fingerSize;
        var stringXPositions = this.stringXPos();
        var fretYPositions = this.fretLinesYPos(y);
        var stringSpacing = this.stringSpacing();
        var fretSpacing = stringSpacing * fretSize;
        var height = fretSpacing * frets;
        var startX = stringXPositions[0];
        var endX = stringXPositions[stringXPositions.length - 1];
        var fingerSize = relativefingerSize * stringSpacing;
        var fingerColor = (_e = (_d = this.settings.fingerColor) !== null && _d !== void 0 ? _d : this.settings.color) !== null && _e !== void 0 ? _e : defaultSettings.color;
        var fretColor = (_g = (_f = this.settings.fretColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var barreChordRadius = (_h = this.settings.barreChordRadius) !== null && _h !== void 0 ? _h : defaultSettings.barreChordRadius;
        var strokeWidth = (_j = this.settings.strokeWidth) !== null && _j !== void 0 ? _j : defaultSettings.strokeWidth;
        var fontFamily = (_k = this.settings.fontFamily) !== null && _k !== void 0 ? _k : defaultSettings.fontFamily;
        var fingerTextColor = (_l = this.settings.fingerTextColor) !== null && _l !== void 0 ? _l : defaultSettings.fingerTextColor;
        var fingerTextSize = (_m = this.settings.fingerTextSize) !== null && _m !== void 0 ? _m : defaultSettings.fingerTextSize;
        // draw frets
        fretYPositions.forEach(function (fretY, i) {
            var classNames = [ElementType.FRET, "".concat(ElementType.FRET, "-").concat(i)];
            var _a = _this.coordinates(startX, fretY), lineX1 = _a.x, lineY1 = _a.y;
            var _b = _this.coordinates(endX, fretY), lineX2 = _b.x, lineY2 = _b.y;
            _this.renderer.line(lineX1, lineY1, lineX2, lineY2, strokeWidth, fretColor, classNames);
        });
        // draw strings
        stringXPositions.forEach(function (stringX, i) {
            var classNames = [ElementType.STRING, "".concat(ElementType.STRING, "-").concat(i)];
            var _a = _this.coordinates(stringX, y), lineX1 = _a.x, lineY1 = _a.y;
            var _b = _this.coordinates(stringX, y + height + strokeWidth / 2), lineX2 = _b.x, lineY2 = _b.y;
            _this.renderer.line(lineX1, lineY1, lineX2, lineY2, strokeWidth, fretColor, classNames);
        });
        // draw barre chords
        this.chordInternal.barres.forEach(function (_a) {
            var _b, _c, _d, _e;
            var fret = _a.fret, fromString = _a.fromString, toString = _a.toString, text = _a.text, color = _a.color, textColor = _a.textColor, strokeColor = _a.strokeColor, className = _a.className, individualBarreChordStrokeWidth = _a.strokeWidth;
            var barreCenterY = fretYPositions[fret - 1] - strokeWidth / 4 - fretSpacing / 2;
            var fromStringX = stringXPositions[_this.toArrayIndex(fromString)];
            var distance = Math.abs(toString - fromString) * stringSpacing;
            var barreChordStrokeColor = (_d = (_c = (_b = strokeColor !== null && strokeColor !== void 0 ? strokeColor : _this.settings.barreChordStrokeColor) !== null && _b !== void 0 ? _b : _this.settings.fingerColor) !== null && _c !== void 0 ? _c : _this.settings.color) !== null && _d !== void 0 ? _d : defaultSettings.color;
            var barreChordStrokeWidth = (_e = individualBarreChordStrokeWidth !== null && individualBarreChordStrokeWidth !== void 0 ? individualBarreChordStrokeWidth : _this.settings.barreChordStrokeWidth) !== null && _e !== void 0 ? _e : defaultSettings.barreChordStrokeWidth;
            var classNames = __spreadArray([
                ElementType.BARRE,
                "".concat(ElementType.BARRE, "-fret-").concat(fret - 1)
            ], __read((className ? [className] : [])), false);
            var barreWidth = distance + stringSpacing / 2;
            var barreHeight = fingerSize;
            var _f = _this.rectCoordinates(fromStringX - stringSpacing / 4, barreCenterY - fingerSize / 2, barreWidth, barreHeight), rectX = _f.x, rectY = _f.y, rectHeight = _f.height, rectWidth = _f.width;
            _this.renderer.rect(rectX, rectY, rectWidth, rectHeight, barreChordStrokeWidth, barreChordStrokeColor, classNames, color !== null && color !== void 0 ? color : fingerColor, fingerSize * barreChordRadius);
            // draw text on the barre chord
            if (text) {
                var textClassNames = [ElementType.BARRE_TEXT, "".concat(ElementType.BARRE_TEXT, "-").concat(fret)];
                var _g = _this.coordinates(fromStringX + distance / 2, barreCenterY), textX = _g.x, textY = _g.y;
                _this.renderer.text(text, textX, textY, fingerTextSize, textColor !== null && textColor !== void 0 ? textColor : fingerTextColor, fontFamily, Alignment.MIDDLE, textClassNames, true);
            }
        });
        // draw fingers
        this.chordInternal.fingers
            .filter(function (_a) {
            var _b = __read(_a, 2), value = _b[1];
            return value !== SILENT && value !== OPEN;
        })
            .map(function (_a) {
            var _b = __read(_a, 3), stringIndex = _b[0], fretIndex = _b[1], text = _b[2];
            return [
                _this.toArrayIndex(stringIndex),
                fretIndex,
                text,
            ];
        })
            .forEach(function (_a) {
            var _b = __read(_a, 3), stringIndex = _b[0], fretIndex = _b[1], textOrOptions = _b[2];
            var fingerCenterX = startX + stringIndex * stringSpacing;
            var fingerCenterY = y + fretIndex * fretSpacing - fretSpacing / 2;
            var fingerOptions = SVGuitarChord.getFingerOptions(textOrOptions);
            var classNames = __spreadArray([
                ElementType.FINGER,
                "".concat(ElementType.FINGER, "-string-").concat(stringIndex),
                "".concat(ElementType.FINGER, "-fret-").concat(fretIndex - 1),
                "".concat(ElementType.FINGER, "-string-").concat(stringIndex, "-fret-").concat(fretIndex - 1)
            ], __read((fingerOptions.className ? [fingerOptions.className] : [])), false);
            // const { x: x0, y: y0 } = this.coordinates(fingerCenterX, fingerCenterY)
            _this.drawFinger(fingerCenterX, fingerCenterY, fingerSize, fingerColor, fingerTextSize, fontFamily, fingerOptions, classNames);
        });
        return y + height;
    };
    SVGuitarChord.prototype.drawFinger = function (x, y, size, color, textSize, fontFamily, fingerOptions, classNames) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        var shape = (_a = fingerOptions.shape) !== null && _a !== void 0 ? _a : defaultSettings.shape;
        var fingerTextColor = (_c = (_b = fingerOptions.textColor) !== null && _b !== void 0 ? _b : this.settings.fingerTextColor) !== null && _c !== void 0 ? _c : defaultSettings.fingerTextColor;
        var fingerStrokeColor = (_g = (_f = (_e = (_d = fingerOptions.strokeColor) !== null && _d !== void 0 ? _d : this.settings.fingerStrokeColor) !== null && _e !== void 0 ? _e : this.settings.fingerColor) !== null && _f !== void 0 ? _f : this.settings.color) !== null && _g !== void 0 ? _g : defaultSettings.color;
        var fingerStrokeWidth = (_j = (_h = fingerOptions.strokeWidth) !== null && _h !== void 0 ? _h : this.settings.fingerStrokeWidth) !== null && _j !== void 0 ? _j : defaultSettings.fingerStrokeWidth;
        var startX = x - size / 2;
        var startY = y - size / 2;
        var classNamesWithShape = __spreadArray(__spreadArray([], __read(classNames), false), ["".concat(ElementType.FINGER, "-").concat(shape)], false);
        var _q = this.rectCoordinates(startX, startY, size, size), x0 = _q.x, y0 = _q.y;
        switch (shape) {
            case Shape.CIRCLE:
                this.renderer.circle(x0, y0, size, fingerStrokeWidth, fingerStrokeColor, (_k = fingerOptions.color) !== null && _k !== void 0 ? _k : color, classNamesWithShape);
                break;
            case Shape.SQUARE:
                this.renderer.rect(x0, y0, size, size, fingerStrokeWidth, fingerStrokeColor, classNamesWithShape, (_l = fingerOptions.color) !== null && _l !== void 0 ? _l : color);
                break;
            case Shape.TRIANGLE:
                this.renderer.triangle(x0, y0, size, fingerStrokeWidth, fingerStrokeColor, classNamesWithShape, (_m = fingerOptions.color) !== null && _m !== void 0 ? _m : color);
                break;
            case Shape.PENTAGON:
                this.renderer.pentagon(x0, y0, size, fingerStrokeWidth, fingerStrokeColor, (_o = fingerOptions.color) !== null && _o !== void 0 ? _o : color, classNamesWithShape);
                break;
            default:
                throw new Error("Invalid shape \"".concat(fingerOptions.shape, "\". Valid shapes are: ").concat(Object.values(Shape)
                    .map(function (val) { return "\"".concat(val, "\""); })
                    .join(', '), "."));
        }
        // draw text on the finger
        var textClassNames = __spreadArray(__spreadArray([], __read(classNames), false), ["".concat(ElementType.FINGER, "-text")], false);
        if (fingerOptions.text) {
            var _r = this.coordinates(x, y), textX = _r.x, textY = _r.y;
            this.renderer.text(fingerOptions.text, textX, textY, textSize, (_p = fingerOptions.textColor) !== null && _p !== void 0 ? _p : fingerTextColor, fontFamily, Alignment.MIDDLE, textClassNames, true);
        }
    };
    SVGuitarChord.prototype.drawTitle = function (size) {
        var _a, _b, _c, _d, _e;
        var color = (_a = this.settings.color) !== null && _a !== void 0 ? _a : defaultSettings.color;
        var titleBottomMargin = (_b = this.settings.titleBottomMargin) !== null && _b !== void 0 ? _b : defaultSettings.titleBottomMargin;
        var fontFamily = (_c = this.settings.fontFamily) !== null && _c !== void 0 ? _c : defaultSettings.fontFamily;
        // This is somewhat of a hack to get a steady diagram position: If no title is defined we initially
        // render an 'X' and later remove it again. That way we get the same y as if there was a title. I tried
        // just rendering a space but that doesn't work.
        var title = (_e = (_d = this.chordInternal.title) !== null && _d !== void 0 ? _d : this.settings.title) !== null && _e !== void 0 ? _e : (this.settings.fixedDiagramPosition ? 'X' : '');
        // draw the title
        if (this.orientation === Orientation.vertical) {
            var _f = this.renderer.text(title, constants.width / 2, 5, size, color, fontFamily, Alignment.MIDDLE, ElementType.TITLE), x = _f.x, y = _f.y, width_1 = _f.width, height = _f.height, remove_1 = _f.remove;
            // check if the title fits. If not, try with a smaller size
            if (x < -0.0001) {
                remove_1();
                // try again with smaller font
                return this.drawTitle(size * (constants.width / width_1) * 0.97);
            }
            if (!this.settings.title && this.settings.fixedDiagramPosition) {
                remove_1();
            }
            return y + height + titleBottomMargin;
        }
        // render temporary text to get the height of the title
        var _g = this.renderer.text(title, 0, 0, size, color, fontFamily, Alignment.LEFT, ElementType.TITLE), removeTempText = _g.remove, width = _g.width;
        removeTempText();
        var _h = this.rectCoordinates(constants.width / 2, 5, 0, 0), textX = _h.x, textY = _h.y;
        var remove = this.renderer.text(title, textX, textY, size, color, fontFamily, Alignment.LEFT, ElementType.TITLE, true).remove;
        if (!this.settings.title && this.settings.fixedDiagramPosition) {
            remove();
        }
        return width + titleBottomMargin;
    };
    SVGuitarChord.prototype.clear = function () {
        this.renderer.clear();
    };
    /**
     * Completely remove the diagram from the DOM
     */
    SVGuitarChord.prototype.remove = function () {
        this.renderer.remove();
    };
    /**
     * Helper method to get an options object from the 3rd array value for a finger, that can either
     * be undefined, a string or and options object. This method will return an options object in
     * any case, so it's easier to work with this third value.
     *
     * @param textOrOptions
     */
    SVGuitarChord.getFingerOptions = function (textOrOptions) {
        if (!textOrOptions) {
            return {};
        }
        if (typeof textOrOptions === 'string') {
            return {
                text: textOrOptions,
            };
        }
        return textOrOptions;
    };
    /**
     * rotates x value if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.x = function (x, y) {
        return this.orientation === Orientation.vertical ? x : y;
    };
    /**
     * rotates y value if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.y = function (x, y) {
        return this.orientation === Orientation.vertical ? y : Math.abs(x - constants.width);
    };
    /**
     * rotates coordinates if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.coordinates = function (x, y) {
        return {
            x: this.x(x, y),
            y: this.y(x, y),
        };
    };
    /**
     * rotates coordinates of a rectangle if orientation is horizontal
     *
     * @param x x in vertical orientation
     * @param y y in vertical orientation
     * @param width width in vertical orientation
     * @param height height in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.rectCoordinates = function (x, y, width, height) {
        if (this.orientation === Orientation.vertical) {
            return {
                x: x,
                y: y,
                width: width,
                height: height,
            };
        }
        return {
            x: this.x(x, y),
            y: this.y(x, y) - width,
            width: this.width(width, height),
            height: this.height(height, width),
        };
    };
    /**
     * rotates height if orientation is horizontal
     *
     * @param height_ height in vertical orientation
     * @param width width in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.height = function (height_, width) {
        return this.orientation === Orientation.vertical ? height_ : width;
    };
    /**
     * rotates width if orientation is horizontal
     *
     * @param width_ width in vertical orientation
     * @param height height in vertical orientation
     * @returns
     */
    SVGuitarChord.prototype.width = function (width_, height) {
        return this.orientation === Orientation.horizontal ? height : width_;
    };
    Object.defineProperty(SVGuitarChord.prototype, "orientation", {
        get: function () {
            var _a;
            return (_a = this.settings.orientation) !== null && _a !== void 0 ? _a : defaultSettings.orientation;
        },
        enumerable: false,
        configurable: true
    });
    SVGuitarChord.plugins = [];
    return SVGuitarChord;
}());

export { ChordStyle, ElementType, FretLabelPosition, OPEN, Orientation, SILENT, SVGuitarChord, Shape };
//# sourceMappingURL=svguitar.es5.js.map
