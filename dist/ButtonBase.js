import{_ as X,c as re,a as ye,l as oe,s as ie,u as Te,g as je,d as ze}from"./styled.js";import{r as a,n as Ae,R as A,o as Xe,c as C,j as U,a as Ye}from"./js/index.js";import{u as We,a as fe}from"./useForkRef.js";function H(e){const t=a.useRef(e);return We(()=>{t.current=e}),a.useCallback((...o)=>(0,t.current)(...o),[])}let G=!0,te=!1,de;const He={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ge(e){const{type:t,tagName:o}=e;return!!(o==="INPUT"&&He[t]&&!e.readOnly||o==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function qe(e){e.metaKey||e.altKey||e.ctrlKey||(G=!0)}function ee(){G=!1}function Je(){this.visibilityState==="hidden"&&te&&(G=!0)}function Qe(e){e.addEventListener("keydown",qe,!0),e.addEventListener("mousedown",ee,!0),e.addEventListener("pointerdown",ee,!0),e.addEventListener("touchstart",ee,!0),e.addEventListener("visibilitychange",Je,!0)}function Ze(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return G||Ge(t)}function et(){const e=a.useCallback(n=>{n!=null&&Qe(n.ownerDocument)},[]),t=a.useRef(!1);function o(){return t.current?(te=!0,window.clearTimeout(de),de=window.setTimeout(()=>{te=!1},100),t.current=!1,!0):!1}function l(n){return Ze(n)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:l,onBlur:o,ref:e}}function tt(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Ae(e,t)}const he=A.createContext(null);function se(e,t){var o=function(r){return t&&a.isValidElement(r)?t(r):r},l=Object.create(null);return e&&a.Children.map(e,function(n){return n}).forEach(function(n){l[n.key]=o(n)}),l}function nt(e,t){e=e||{},t=t||{};function o(d){return d in t?t[d]:e[d]}var l=Object.create(null),n=[];for(var r in e)r in t?n.length&&(l[r]=n,n=[]):n.push(r);var i,c={};for(var u in t){if(l[u])for(i=0;i<l[u].length;i++){var p=l[u][i];c[l[u][i]]=o(p)}c[u]=o(u)}for(i=0;i<n.length;i++)c[n[i]]=o(n[i]);return c}function S(e,t,o){return o[t]!=null?o[t]:e.props[t]}function rt(e,t){return se(e.children,function(o){return a.cloneElement(o,{onExited:t.bind(null,o),in:!0,appear:S(o,"appear",e),enter:S(o,"enter",e),exit:S(o,"exit",e)})})}function ot(e,t,o){var l=se(e.children),n=nt(t,l);return Object.keys(n).forEach(function(r){var i=n[r];if(a.isValidElement(i)){var c=r in t,u=r in l,p=t[r],d=a.isValidElement(p)&&!p.props.in;u&&(!c||d)?n[r]=a.cloneElement(i,{onExited:o.bind(null,i),in:!0,exit:S(i,"exit",e),enter:S(i,"enter",e)}):!u&&c&&!d?n[r]=a.cloneElement(i,{in:!1}):u&&c&&a.isValidElement(p)&&(n[r]=a.cloneElement(i,{onExited:o.bind(null,i),in:p.props.in,exit:S(i,"exit",e),enter:S(i,"enter",e)}))}}),n}var it=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},st={component:"div",childFactory:function(t){return t}},ae=function(e){tt(t,e);function t(l,n){var r;r=e.call(this,l,n)||this;var i=r.handleExited.bind(Xe(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}var o=t.prototype;return o.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},o.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(n,r){var i=r.children,c=r.handleExited,u=r.firstRender;return{children:u?rt(n,c):ot(n,i,c),firstRender:!1}},o.handleExited=function(n,r){var i=se(this.props.children);n.key in i||(n.props.onExited&&n.props.onExited(r),this.mounted&&this.setState(function(c){var u=X({},c.children);return delete u[n.key],{children:u}}))},o.render=function(){var n=this.props,r=n.component,i=n.childFactory,c=re(n,["component","childFactory"]),u=this.state.contextValue,p=it(this.state.children).map(i);return delete c.appear,delete c.enter,delete c.exit,r===null?A.createElement(he.Provider,{value:u},p):A.createElement(he.Provider,{value:u},A.createElement(r,c,p))},t}(A.Component);ae.propTypes={};ae.defaultProps=st;const at=ae;function lt(e){const{className:t,classes:o,pulsate:l=!1,rippleX:n,rippleY:r,rippleSize:i,in:c,onExited:u,timeout:p}=e,[d,g]=a.useState(!1),b=C(t,o.ripple,o.rippleVisible,l&&o.ripplePulsate),w={width:i,height:i,top:-(i/2)+r,left:-(i/2)+n},h=C(o.child,d&&o.childLeaving,l&&o.childPulsate);return!c&&!d&&g(!0),a.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,p);return()=>{clearTimeout(R)}}},[u,c,p]),U("span",{className:b,style:w,children:U("span",{className:h})})}const ut=ye("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),m=ut,ct=["center","classes","className"];let q=e=>e,me,be,ge,Re;const ne=550,pt=80,ft=oe(me||(me=q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),dt=oe(be||(be=q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),ht=oe(ge||(ge=q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),mt=ie("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),bt=ie(lt,{name:"MuiTouchRipple",slot:"Ripple"})(Re||(Re=q`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),m.rippleVisible,ft,ne,({theme:e})=>e.transitions.easing.easeInOut,m.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,m.child,m.childLeaving,dt,ne,({theme:e})=>e.transitions.easing.easeInOut,m.childPulsate,ht,({theme:e})=>e.transitions.easing.easeInOut),gt=a.forwardRef(function(t,o){const l=Te({props:t,name:"MuiTouchRipple"}),{center:n=!1,classes:r={},className:i}=l,c=re(l,ct),[u,p]=a.useState([]),d=a.useRef(0),g=a.useRef(null);a.useEffect(()=>{g.current&&(g.current(),g.current=null)},[u]);const b=a.useRef(!1),w=a.useRef(null),h=a.useRef(null),R=a.useRef(null);a.useEffect(()=>()=>{clearTimeout(w.current)},[]);const _=a.useCallback(f=>{const{pulsate:y,rippleX:T,rippleY:D,rippleSize:I,cb:O}=f;p(E=>[...E,U(bt,{classes:{ripple:C(r.ripple,m.ripple),rippleVisible:C(r.rippleVisible,m.rippleVisible),ripplePulsate:C(r.ripplePulsate,m.ripplePulsate),child:C(r.child,m.child),childLeaving:C(r.childLeaving,m.childLeaving),childPulsate:C(r.childPulsate,m.childPulsate)},timeout:ne,pulsate:y,rippleX:T,rippleY:D,rippleSize:I},d.current)]),d.current+=1,g.current=O},[r]),$=a.useCallback((f={},y={},T=()=>{})=>{const{pulsate:D=!1,center:I=n||y.pulsate,fakeElement:O=!1}=y;if(f?.type==="mousedown"&&b.current){b.current=!1;return}f?.type==="touchstart"&&(b.current=!0);const E=O?null:R.current,B=E?E.getBoundingClientRect():{width:0,height:0,left:0,top:0};let x,P,L;if(I||f===void 0||f.clientX===0&&f.clientY===0||!f.clientX&&!f.touches)x=Math.round(B.width/2),P=Math.round(B.height/2);else{const{clientX:k,clientY:V}=f.touches&&f.touches.length>0?f.touches[0]:f;x=Math.round(k-B.left),P=Math.round(V-B.top)}if(I)L=Math.sqrt((2*B.width**2+B.height**2)/3),L%2===0&&(L+=1);else{const k=Math.max(Math.abs((E?E.clientWidth:0)-x),x)*2+2,V=Math.max(Math.abs((E?E.clientHeight:0)-P),P)*2+2;L=Math.sqrt(k**2+V**2)}f!=null&&f.touches?h.current===null&&(h.current=()=>{_({pulsate:D,rippleX:x,rippleY:P,rippleSize:L,cb:T})},w.current=setTimeout(()=>{h.current&&(h.current(),h.current=null)},pt)):_({pulsate:D,rippleX:x,rippleY:P,rippleSize:L,cb:T})},[n,_]),K=a.useCallback(()=>{$({},{pulsate:!0})},[$]),N=a.useCallback((f,y)=>{if(clearTimeout(w.current),f?.type==="touchend"&&h.current){h.current(),h.current=null,w.current=setTimeout(()=>{N(f,y)});return}h.current=null,p(T=>T.length>0?T.slice(1):T),g.current=y},[]);return a.useImperativeHandle(o,()=>({pulsate:K,start:$,stop:N}),[K,$,N]),U(mt,X({className:C(m.root,r.root,i),ref:R},c,{children:U(at,{component:null,exit:!0,children:u})}))}),Rt=gt;function yt(e){return je("MuiButtonBase",e)}const Tt=ye("MuiButtonBase",["root","disabled","focusVisible"]),Et=Tt,Mt=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],Ct=e=>{const{disabled:t,focusVisible:o,focusVisibleClassName:l,classes:n}=e,i=ze({root:["root",t&&"disabled",o&&"focusVisible"]},yt,n);return o&&l&&(i.root+=` ${l}`),i},xt=ie("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Et.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Vt=a.forwardRef(function(t,o){const l=Te({props:t,name:"MuiButtonBase"}),{action:n,centerRipple:r=!1,children:i,className:c,component:u="button",disabled:p=!1,disableRipple:d=!1,disableTouchRipple:g=!1,focusRipple:b=!1,LinkComponent:w="a",onBlur:h,onClick:R,onContextMenu:_,onDragLeave:$,onFocus:K,onFocusVisible:N,onKeyDown:f,onKeyUp:y,onMouseDown:T,onMouseLeave:D,onMouseUp:I,onTouchEnd:O,onTouchMove:E,onTouchStart:B,tabIndex:x=0,TouchRippleProps:P,touchRippleRef:L,type:k}=l,V=re(l,Mt),j=a.useRef(null),M=a.useRef(null),Ee=fe(M,L),{isFocusVisibleRef:le,onFocus:Me,onBlur:Ce,ref:xe}=et(),[F,Y]=a.useState(!1);p&&F&&Y(!1),a.useImperativeHandle(n,()=>({focusVisible:()=>{Y(!0),j.current.focus()}}),[]);const[J,Ve]=a.useState(!1);a.useEffect(()=>{Ve(!0)},[]);const ve=J&&!d&&!p;a.useEffect(()=>{F&&b&&!d&&J&&M.current.pulsate()},[d,b,F,J]);function v(s,ce,Oe=g){return H(pe=>(ce&&ce(pe),!Oe&&M.current&&M.current[s](pe),!0))}const we=v("start",T),Be=v("stop",_),Pe=v("stop",$),Le=v("stop",I),De=v("stop",s=>{F&&s.preventDefault(),D&&D(s)}),ke=v("start",B),Fe=v("stop",O),Se=v("stop",E),$e=v("stop",s=>{Ce(s),le.current===!1&&Y(!1),h&&h(s)},!1),Ne=H(s=>{j.current||(j.current=s.currentTarget),Me(s),le.current===!0&&(Y(!0),N&&N(s)),K&&K(s)}),Q=()=>{const s=j.current;return u&&u!=="button"&&!(s.tagName==="A"&&s.href)},Z=a.useRef(!1),Ie=H(s=>{b&&!Z.current&&F&&M.current&&s.key===" "&&(Z.current=!0,M.current.stop(s,()=>{M.current.start(s)})),s.target===s.currentTarget&&Q()&&s.key===" "&&s.preventDefault(),f&&f(s),s.target===s.currentTarget&&Q()&&s.key==="Enter"&&!p&&(s.preventDefault(),R&&R(s))}),Ue=H(s=>{b&&s.key===" "&&M.current&&F&&!s.defaultPrevented&&(Z.current=!1,M.current.stop(s,()=>{M.current.pulsate(s)})),y&&y(s),R&&s.target===s.currentTarget&&Q()&&s.key===" "&&!s.defaultPrevented&&R(s)});let W=u;W==="button"&&(V.href||V.to)&&(W=w);const z={};W==="button"?(z.type=k===void 0?"button":k,z.disabled=p):(!V.href&&!V.to&&(z.role="button"),p&&(z["aria-disabled"]=p));const _e=fe(o,xe,j),ue=X({},l,{centerRipple:r,component:u,disabled:p,disableRipple:d,disableTouchRipple:g,focusRipple:b,tabIndex:x,focusVisible:F}),Ke=Ct(ue);return Ye(xt,X({as:W,className:C(Ke.root,c),ownerState:ue,onBlur:$e,onClick:R,onContextMenu:Be,onFocus:Ne,onKeyDown:Ie,onKeyUp:Ue,onMouseDown:we,onMouseLeave:De,onMouseUp:Le,onDragLeave:Pe,onTouchEnd:Fe,onTouchMove:Se,onTouchStart:ke,ref:_e,tabIndex:p?-1:x,type:k},z,V,{children:[i,ve?U(Rt,X({ref:Ee,center:r},P)):null]}))}),Lt=Vt;export{Lt as B,he as T,tt as _,et as a,H as u};
//# sourceMappingURL=ButtonBase.js.map
