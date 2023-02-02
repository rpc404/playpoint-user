import{r as ee,B as te,R as u,C as ne,a as X,j as i,v as E}from"./js/index.js";import"./style2.js";import{H as ae}from"./Helmet.js";import{u as re}from"./UseWindowDimension.js";import{getMarketplaces as ie}from"./Marketplace.js";import{u as oe}from"./useTranslation.js";import"./index22.js";import"./axios.js";var $={};function le(e){if(!e||typeof window>"u")return;const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}Object.defineProperty($,"__esModule",{value:!0});var o=ee;function de(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var s=de(o);/*! *****************************************************************************
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
***************************************************************************** */var f=function(){return f=Object.assign||function(t){for(var r,n=1,a=arguments.length;n<a;n++){r=arguments[n];for(var l in r)Object.prototype.hasOwnProperty.call(r,l)&&(t[l]=r[l])}return t},f.apply(this,arguments)};le(`.marquee-container {
  overflow-x: hidden !important;
  display: flex !important;
  flex-direction: row !important;
  position: relative;
  width: 100%;
}
.marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.overlay::before, .overlay::after {
  background: linear-gradient(to right, var(--gradient-color));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
}
.overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.overlay::before {
  left: 0;
  top: 0;
}

.marquee {
  flex: 0 0 auto;
  min-width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}`);var se=function(e){var t,r,n,a,l=e.style,d=l===void 0?{}:l,w=e.className,G=w===void 0?"":w,C=e.play,c=C===void 0?!0:C,x=e.pauseOnHover,b=x===void 0?!1:x,k=e.pauseOnClick,R=k===void 0?!1:k,q=e.direction,M=q===void 0?"left":q,L=e.speed,O=L===void 0?20:L,A=e.delay,T=A===void 0?0:A,N=e.loop,m=N===void 0?0:N,j=e.gradient,K=j===void 0?!0:j,H=e.gradientColor,v=H===void 0?[255,255,255]:H,P=e.gradientWidth,p=P===void 0?200:P,Z=e.onFinish,J=e.onCycleComplete,W=e.children,z=o.useState(0),I=z[0],Q=z[1],S=o.useState(0),D=S[0],U=S[1],B=o.useState(!1),h=B[0],Y=B[1],y=o.useRef(null),g=o.useRef(null);o.useEffect(function(){if(h){var _=function(){g.current&&y.current&&(Q(y.current.getBoundingClientRect().width),U(g.current.getBoundingClientRect().width))};return _(),window.addEventListener("resize",_),function(){window.removeEventListener("resize",_)}}},[h]),o.useEffect(function(){Y(!0)},[]);var F="rgba("+v[0]+", "+v[1]+", "+v[2],V=D<I?I/O:D/O;return s.default.createElement(o.Fragment,null,h?s.default.createElement("div",{ref:y,style:f(f({},d),(t={},t["--pause-on-hover"]=!c||b?"paused":"running",t["--pause-on-click"]=!c||b&&!R||R?"paused":"running",t)),className:G+" marquee-container"},K&&s.default.createElement("div",{style:(r={},r["--gradient-color"]=F+", 1), "+F+", 0)",r["--gradient-width"]=typeof p=="number"?p+"px":p,r),className:"overlay"}),s.default.createElement("div",{ref:g,style:(n={},n["--play"]=c?"running":"paused",n["--direction"]=M==="left"?"normal":"reverse",n["--duration"]=V+"s",n["--delay"]=T+"s",n["--iteration-count"]=m?""+m:"infinite",n),className:"marquee",onAnimationIteration:J,onAnimationEnd:Z},W),s.default.createElement("div",{style:(a={},a["--play"]=c?"running":"paused",a["--direction"]=M==="left"?"normal":"reverse",a["--duration"]=V+"s",a["--delay"]=T+"s",a["--iteration-count"]=m?""+m:"infinite",a),className:"marquee","aria-hidden":"true"},W)):null)},ue=$.default=se;const ce=u.lazy(()=>E(()=>import("./index24.js"),["index24.js","js/index.js","Leaderboards.js","axios.js","NumberFomatter.js","Pagination.js","styled.js","useControlled.js","useTheme.js","createSvgIcon.js","ButtonBase.js","useForkRef.js"])),me=u.lazy(()=>E(()=>import("./index25.js"),["index25.js","js/index.js","useTranslation.js"])),fe=u.lazy(()=>E(()=>import("./index26.js"),["index26.js","js/index.js","style2.js","Stack.js","styled.js","extendSxProp.js","Skeleton.js"]));function Ce(){const[{marketplaces:e},t]=te(),[r,n]=u.useState(!0),{t:a}=oe();u.useEffect(()=>{(async()=>{if(e.length===0){let d=await ie();d=d.data.marketplaces,t({type:ne.SET_ALL_MARKETPLACE,payload:d})}n(!1)})(),window.scrollTo(0,0)},[]);const{width:l}=re();return X("div",{className:"home__container",children:[i(ae,{children:i("title",{children:a("HemletTitle")})}),l>992&&i("div",{children:i(me,{})}),i("h1",{className:"home__mainTitle",children:a("ActiveMarketplaces")}),i(fe,{marketplaces:e,loading:r}),i(ue,{speed:70,children:[0,1,2,3,4,5,6,7,8].map(d=>X("div",{className:"marquee-item",children:[i("h1",{children:a("PredicttoEarn")}),i("h1",{children:" ❄️ "})]},d))}),i(ce,{})]})}export{Ce as default};
//# sourceMappingURL=index8.js.map
