import{r as t}from"./js/index.js";function f(e,n){typeof e=="function"?e(n):e&&(e.current=n)}const o=typeof window<"u"?t.useLayoutEffect:t.useEffect,s=o;function r(...e){return t.useMemo(()=>e.every(n=>n==null)?null:n=>{e.forEach(u=>{f(u,n)})},e)}export{r as a,f as s,s as u};
//# sourceMappingURL=useForkRef.js.map
