import{i as $}from"./isHostComponent.js";import{g as A,a as H,s as x,_ as i,c as W,e as D,d as G}from"./styled.js";import{r as J,a as K,j as M,c as Q}from"./js/index.js";import{u as T}from"./useFormControl.js";import{B as V}from"./ButtonBase.js";import{u as X}from"./useControlled.js";const Y=e=>!e||!$(e),ue=Y;function Z(e){return A("PrivateSwitchBase",e)}H("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const ee=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],se=e=>{const{classes:o,checked:c,disabled:r,edge:a}=e,l={root:["root",c&&"checked",r&&"disabled",a&&`edge${D(a)}`],input:["input"]};return G(l,Z,o)},te=x(V)(({ownerState:e})=>i({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),oe=x("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),ae=J.forwardRef(function(o,c){const{autoFocus:r,checked:a,checkedIcon:l,className:F,defaultChecked:h,disabled:y,disableFocusRipple:p=!1,edge:S=!1,icon:w,id:P,inputProps:R,inputRef:I,name:j,onBlur:f,onChange:m,onFocus:g,readOnly:z,required:N=!1,tabIndex:U,type:d,value:b}=o,_=W(o,ee),[k,q]=X({controlled:a,default:Boolean(h),name:"SwitchBase",state:"checked"}),t=T(),v=s=>{g&&g(s),t&&t.onFocus&&t.onFocus(s)},E=s=>{f&&f(s),t&&t.onBlur&&t.onBlur(s)},L=s=>{if(s.nativeEvent.defaultPrevented)return;const C=s.target.checked;q(C),m&&m(s,C)};let n=y;t&&typeof n>"u"&&(n=t.disabled);const O=d==="checkbox"||d==="radio",u=i({},o,{checked:k,disabled:n,disableFocusRipple:p,edge:S}),B=se(u);return K(te,i({component:"span",className:Q(B.root,F),centerRipple:!0,focusRipple:!p,disabled:n,tabIndex:null,role:void 0,onFocus:v,onBlur:E,ownerState:u,ref:c},_,{children:[M(oe,i({autoFocus:r,checked:a,defaultChecked:h,className:B.input,disabled:n,id:O&&P,name:j,onChange:L,readOnly:z,ref:I,required:N,ownerState:u,tabIndex:U,type:d},d==="checkbox"&&b===void 0?{}:{value:b},R)),k?l:w]}))}),he=ae;export{he as S,ue as s};
//# sourceMappingURL=SwitchBase.js.map
