import{r as v,a as b,j as r,c as Z,m as mo,R as $,b as fo,y as bo,x as vo,L as I,Q as xo,v as F}from"./js/index.js";import{H as yo}from"./Helmet.js";import{a as $o}from"./axios.js";import wo from"./ERC20BasicABI.js";import{m as Co}from"./moment2.js";import{T as Po,a as A,b as W,c as Q}from"./index21.js";import{g as H,a as X,c as Y,_ as g,d as J,s as B,e as u,u as lo,y as Oo,z as ko,b as ao,w as Bo,x as Ro}from"./styled.js";import{u as So}from"./useForkRef.js";import{s as ro,S as _o}from"./SwitchBase.js";import{u as eo}from"./useSlotProps.js";import{W as Mo,C as zo}from"./web3-provider.js";import{f as io}from"./index5.js";import"./index22.js";import"./ButtonBase.js";import"./useTheme.js";import"./Typography.js";import"./extendSxProp.js";import"./createSvgIcon.js";import"./Box.js";import"./isHostComponent.js";import"./useFormControl.js";import"./useControlled.js";const To=async o=>await $o.get(`https://api.playpoint.ai/api/v1/results/${o}`),No=o=>{const t=v.useRef({});return v.useEffect(()=>{t.current=o}),t.current},co=No;function Lo(o){const{badgeContent:t,invisible:a=!1,max:i=99,showZero:s=!1}=o,d=co({badgeContent:t,max:i});let l=a;a===!1&&t===0&&!s&&(l=!0);const{badgeContent:n,max:p=i}=l?d:o,c=n&&Number(n)>p?`${p}+`:n;return{badgeContent:n,invisible:l,max:p,displayValue:c}}function Eo(o){return H("MuiBadge",o)}X("MuiBadge",["root","badge","invisible"]);const Uo=["badgeContent","component","children","invisible","max","slotProps","slots","showZero"],Do=o=>{const{invisible:t}=o;return J({root:["root"],badge:["badge",t&&"invisible"]},Eo,void 0)},Io=v.forwardRef(function(t,a){const{component:i,children:s,max:d=99,slotProps:l={},slots:n={},showZero:p=!1}=t,c=Y(t,Uo),{badgeContent:e,max:f,displayValue:w,invisible:R}=Lo(g({},t,{max:d})),C=g({},t,{badgeContent:e,invisible:R,max:f,showZero:p}),k=Do(C),h=i||n.root||"span",x=eo({elementType:h,externalSlotProps:l.root,externalForwardedProps:c,additionalProps:{ref:a},ownerState:C,className:k.root}),P=n.badge||"span",y=eo({elementType:P,externalSlotProps:l.badge,ownerState:C,className:k.badge});return b(h,g({},x,{children:[s,r(P,g({},y,{children:w}))]}))}),Ao=Io;function Wo(o){return H("MuiBadge",o)}const Qo=X("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]),O=Qo,Vo=["anchorOrigin","className","component","components","componentsProps","overlap","color","invisible","max","badgeContent","slots","slotProps","showZero","variant"],V=10,j=4,jo=o=>{const{color:t,anchorOrigin:a,invisible:i,overlap:s,variant:d,classes:l={}}=o,n={root:["root"],badge:["badge",d,i&&"invisible",`anchorOrigin${u(a.vertical)}${u(a.horizontal)}`,`anchorOrigin${u(a.vertical)}${u(a.horizontal)}${u(s)}`,`overlap${u(s)}`,t!=="default"&&`color${u(t)}`]};return J(n,Wo,l)},Zo=B("span",{name:"MuiBadge",slot:"Root",overridesResolver:(o,t)=>t.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),Fo=B("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(o,t)=>{const{ownerState:a}=o;return[t.badge,t[a.variant],t[`anchorOrigin${u(a.anchorOrigin.vertical)}${u(a.anchorOrigin.horizontal)}${u(a.overlap)}`],a.color!=="default"&&t[`color${u(a.color)}`],a.invisible&&t.invisible]}})(({theme:o,ownerState:t})=>g({display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:o.typography.fontFamily,fontWeight:o.typography.fontWeightMedium,fontSize:o.typography.pxToRem(12),minWidth:V*2,lineHeight:1,padding:"0 6px",height:V*2,borderRadius:V,zIndex:1,transition:o.transitions.create("transform",{easing:o.transitions.easing.easeInOut,duration:o.transitions.duration.enteringScreen})},t.color!=="default"&&{backgroundColor:(o.vars||o).palette[t.color].main,color:(o.vars||o).palette[t.color].contrastText},t.variant==="dot"&&{borderRadius:j,height:j*2,minWidth:j*2,padding:0},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular"&&{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${O.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular"&&{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${O.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular"&&{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${O.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular"&&{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${O.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular"&&{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${O.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular"&&{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${O.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular"&&{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${O.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular"&&{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${O.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},t.invisible&&{transition:o.transitions.create("transform",{easing:o.transitions.easing.easeInOut,duration:o.transitions.duration.leavingScreen})})),Ho=v.forwardRef(function(t,a){var i,s,d,l,n,p;const c=lo({props:t,name:"MuiBadge"}),{anchorOrigin:e={vertical:"top",horizontal:"right"},className:f,component:w="span",components:R={},componentsProps:C={},overlap:k="rectangular",color:h="default",invisible:x=!1,max:P,badgeContent:y,slots:M,slotProps:z,showZero:G=!1,variant:N="standard"}=c,uo=Y(c,Vo),go=co({anchorOrigin:e,color:h,overlap:k,variant:N});let L=x;x===!1&&(y===0&&!G||y==null&&N!=="dot")&&(L=!0);const{color:E=h,overlap:U=k,anchorOrigin:D=e,variant:T=N}=L?go:c,ho=g({},c,{anchorOrigin:D,invisible:L,color:E,overlap:U,variant:T}),K=jo(ho);let q;T!=="dot"&&(q=y&&Number(y)>P?`${P}+`:y);const oo=(i=(s=M?.root)!=null?s:R.Root)!=null?i:Zo,to=(d=(l=M?.badge)!=null?l:R.Badge)!=null?d:Fo,S=(n=z?.root)!=null?n:C.root,_=(p=z?.badge)!=null?p:C.badge;return r(Ao,g({invisible:x,badgeContent:q,showZero:G,max:P},uo,{slots:{root:oo,badge:to},className:Z(S?.className,K.root,f),slotProps:{root:g({},S,ro(oo)&&{as:w,ownerState:g({},S?.ownerState,{anchorOrigin:D,color:E,overlap:U,variant:T})}),badge:g({},_,{className:Z(K.badge,_?.className)},ro(to)&&{ownerState:g({},_?.ownerState,{anchorOrigin:D,color:E,overlap:U,variant:T})})},ref:a}))}),no=Ho;function Xo(o,t,a,i,s){const d=typeof window<"u"&&typeof window.matchMedia<"u",[l,n]=v.useState(()=>s&&d?a(o).matches:i?i(o).matches:t);return So(()=>{let p=!0;if(!d)return;const c=a(o),e=()=>{p&&n(c.matches)};return e(),c.addListener(e),()=>{p=!1,c.removeListener(e)}},[o,a,d]),l}const po=mo["useSyncExternalStore"];function Yo(o,t,a,i){const s=v.useCallback(()=>t,[t]),d=v.useMemo(()=>{if(i!==null){const{matches:c}=i(o);return()=>c}return s},[s,o,i]),[l,n]=v.useMemo(()=>{if(a===null)return[s,()=>()=>{}];const c=a(o);return[()=>c.matches,e=>(c.addListener(e),()=>{c.removeListener(e)})]},[s,a,o]);return po(n,l,d)}function so(o,t={}){const a=Oo(),i=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:s=!1,matchMedia:d=i?window.matchMedia:null,ssrMatchMedia:l=null,noSsr:n}=ko({name:"MuiUseMediaQuery",props:t,theme:a});let p=typeof o=="function"?o(a):o;return p=p.replace(/^@media( ?)/m,""),(po!==void 0?Yo:Xo)(p,s,d,l,n)}function Jo(o){return H("MuiSwitch",o)}const Go=X("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),m=Go,Ko=["className","color","edge","size","sx"],qo=o=>{const{classes:t,edge:a,size:i,color:s,checked:d,disabled:l}=o,n={root:["root",a&&`edge${u(a)}`,`size${u(i)}`],switchBase:["switchBase",`color${u(s)}`,d&&"checked",l&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},p=J(n,Jo,t);return g({},t,p)},ot=B("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:a}=o;return[t.root,a.edge&&t[`edge${u(a.edge)}`],t[`size${u(a.size)}`]]}})(({ownerState:o})=>g({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},o.edge==="start"&&{marginLeft:-8},o.edge==="end"&&{marginRight:-8},o.size==="small"&&{width:40,height:24,padding:7,[`& .${m.thumb}`]:{width:16,height:16},[`& .${m.switchBase}`]:{padding:4,[`&.${m.checked}`]:{transform:"translateX(16px)"}}})),tt=B(_o,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(o,t)=>{const{ownerState:a}=o;return[t.switchBase,{[`& .${m.input}`]:t.input},a.color!=="default"&&t[`color${u(a.color)}`]]}})(({theme:o})=>({position:"absolute",top:0,left:0,zIndex:1,color:o.vars?o.vars.palette.Switch.defaultColor:`${o.palette.mode==="light"?o.palette.common.white:o.palette.grey[300]}`,transition:o.transitions.create(["left","transform"],{duration:o.transitions.duration.shortest}),[`&.${m.checked}`]:{transform:"translateX(20px)"},[`&.${m.disabled}`]:{color:o.vars?o.vars.palette.Switch.defaultDisabledColor:`${o.palette.mode==="light"?o.palette.grey[100]:o.palette.grey[600]}`},[`&.${m.checked} + .${m.track}`]:{opacity:.5},[`&.${m.disabled} + .${m.track}`]:{opacity:o.vars?o.vars.opacity.switchTrackDisabled:`${o.palette.mode==="light"?.12:.2}`},[`& .${m.input}`]:{left:"-100%",width:"300%"}}),({theme:o,ownerState:t})=>g({"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette.action.activeChannel} / ${o.vars.palette.action.hoverOpacity})`:ao(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${m.checked}`]:{color:(o.vars||o).palette[t.color].main,"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette[t.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:ao(o.palette[t.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${m.disabled}`]:{color:o.vars?o.vars.palette.Switch[`${t.color}DisabledColor`]:`${o.palette.mode==="light"?Bo(o.palette[t.color].main,.62):Ro(o.palette[t.color].main,.55)}`}},[`&.${m.checked} + .${m.track}`]:{backgroundColor:(o.vars||o).palette[t.color].main}})),at=B("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(o,t)=>t.track})(({theme:o})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:o.transitions.create(["opacity","background-color"],{duration:o.transitions.duration.shortest}),backgroundColor:o.vars?o.vars.palette.common.onBackground:`${o.palette.mode==="light"?o.palette.common.black:o.palette.common.white}`,opacity:o.vars?o.vars.opacity.switchTrack:`${o.palette.mode==="light"?.38:.3}`})),rt=B("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(o,t)=>t.thumb})(({theme:o})=>({boxShadow:(o.vars||o).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"})),et=v.forwardRef(function(t,a){const i=lo({props:t,name:"MuiSwitch"}),{className:s,color:d="primary",edge:l=!1,size:n="medium",sx:p}=i,c=Y(i,Ko),e=g({},i,{color:d,edge:l,size:n}),f=qo(e),w=r(rt,{className:f.thumb,ownerState:e});return b(ot,{className:Z(f.root,s),sx:p,ownerState:e,children:[r(tt,g({type:"checkbox",icon:w,checkedIcon:w,ref:a,ownerState:e},c,{classes:g({},f,{root:f.switchBase})})),r(at,{className:f.track,ownerState:e})]})}),it=et;const nt=$.lazy(()=>F(()=>import("./index27.js"),["index27.js","js/index.js","Leaderboards2.js","Leaderboards.js","axios.js","CountryFlags.js","NumberFomatter.js","GetFlags.js","Skeleton.js","styled.js","moment2.js","index29.js","Pagination.js","useControlled.js","useTheme.js","createSvgIcon.js","ButtonBase.js","useForkRef.js"])),st=$.lazy(()=>F(()=>import("./index18.js"),["index18.js","js/index.js","index21.js","styled.js","ButtonBase.js","useForkRef.js","useTheme.js","Typography.js","extendSxProp.js","createSvgIcon.js","index22.js","Box.js","index29.js"])),lt=$.lazy(()=>F(()=>import("./EditProfile.js"),["EditProfile.js","js/index.js","Profile.js","axios.js"]));B(it)(({theme:o})=>({width:28,height:16,padding:0,display:"flex","&:active":{"& .MuiSwitch-thumb":{width:15},"& .MuiSwitch-switchBase.Mui-checked":{transform:"translateX(9px)"}},"& .MuiSwitch-switchBase":{padding:2,"&.Mui-checked":{transform:"translateX(12px)",color:"#fff","& + .MuiSwitch-track":{opacity:1,backgroundColor:o.palette.mode==="dark"?"#177ddc":"#1890ff"}}},"& .MuiSwitch-thumb":{boxShadow:"0 2px 4px 0 rgb(0 35 11 / 20%)",width:12,height:12,borderRadius:6,transition:o.transitions.create(["width"],{duration:200})},"& .MuiSwitch-track":{borderRadius:16/2,opacity:1,backgroundColor:o.palette.mode==="dark"?"rgba(255,255,255,.35)":"rgba(0,0,0,.25)",boxSizing:"border-box"}}));function Mt(){$.useState([]),v.useState(!1);const[{userPublicAddress:o,username:t,isWalletConnected:a,isNonWalletUser:i},s]=fo(),[{results:d,woat:l},n]=bo(),[p,c]=v.useState(t),[e,f]=$.useState(0),[w,R]=$.useState({ethBalance:0,ppttBalance:0}),C=(h,x)=>{f(x)},k=vo();return $.useEffect(()=>{o&&(async()=>{const h=await To(o);n({type:"get-results",payload:h.data.reverse()})})(),t&&c(t)},[o]),JSON.parse(localStorage.getItem("rpcUserData")),$.useEffect(()=>{if(a){const h=new Mo(ethereum),x=new zo("0x53d168578974822bCAa95106C7d5a906BF100948",wo,h);(async()=>{const P=await h.getBalance(o),y=await x.balanceOf(o);R({ethBalance:io(P),ppttBalance:io(y)})})()}},[a]),$.useEffect(()=>{let h=k.pathname;h==="/profile"&&e!==0?f(0):h==="/profile/transaction"&&e!==1?f(1):h==="/profile/edit"&&e!==2&&f(2)},[e]),b("div",{className:"profile__container",children:[r(yo,{children:r("title",{children:"Profile | Playpoint"})}),r("div",{className:"tabs",children:b(Po,{orientation:so("(min-width:769px)")?"vertical":"horizontal",onChange:C,value:e,"aria-label":"Vertical tabs example",variant:so("(max-width:768px)")?"scrollable":"fullWidth",sx:{backgroundColor:"#0D1016"},children:[r(A,{label:"Profile",icon:r("i",{className:"ri-user-line"}),...W(0),LinkComponent:I,to:"/profile"}),r(A,{label:"Transaction",icon:r("i",{className:"ri-exchange-funds-line"}),...W(1),LinkComponent:I,to:"/profile/transaction"}),r(A,{label:"Edit",icon:r("i",{className:"ri-edit-box-line"}),...W(2),LinkComponent:I,to:"/profile/edit"})]})}),b("div",{className:"profile__header",children:[b("div",{className:"profile__box",children:[b("div",{className:"username",children:[b("h3",{children:["Hello,",r("span",{children:t})]}),b("p",{children:["Today is ",Co().format("MMMM Do YYYY")," "]}),r("div",{style:{display:"flex",justifyContent:"space-between"},children:b("p",{className:"address",children:[String(o).substring(0,5)+"..."+String(o).substring(o.length-5),r("i",{className:"ri-file-copy-line",onClick:()=>navigator.clipboard.writeText(o).then(()=>{xo("Account address copied")})})]})})]}),b("div",{className:"profleImage_box",children:[r("p",{children:r(no,{color:"success",variant:"dot",children:r("i",{className:"ri-chat-3-line"})})}),r("p",{children:r(no,{color:"success",variant:"dot",children:r("i",{className:"ri-notification-line"})})}),r("img",{src:`https://robohash.org/${t}`,alt:"robohash_image",loading:"lazy"})]})]}),r(Q,{value:e,index:0,children:r("div",{className:"userProfile",children:r(nt,{username:t,balance:w,results:d,woat:l})})}),r(Q,{value:e,index:1,children:r(st,{})}),r(Q,{value:e,index:2,children:r(lt,{})})]})]})}export{Mt as default};
//# sourceMappingURL=index9.js.map
