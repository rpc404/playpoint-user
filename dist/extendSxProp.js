import{c as u,_ as i,n as a,o as f}from"./styled.js";const x=["sx"],P=t=>{var s,n;const o={systemProps:{},otherProps:{}},r=(s=t==null||(n=t.theme)==null?void 0:n.unstable_sxConfig)!=null?s:a;return Object.keys(t).forEach(e=>{r[e]?o.systemProps[e]=t[e]:o.otherProps[e]=t[e]}),o};function m(t){const{sx:s}=t,n=u(t,x),{systemProps:o,otherProps:r}=P(n);let e;return Array.isArray(s)?e=[o,...s]:typeof s=="function"?e=(...c)=>{const l=s(...c);return f(l)?i({},o,l):o}:e=i({},o,s),i({},r,{sx:e})}export{m as e};
//# sourceMappingURL=extendSxProp.js.map
