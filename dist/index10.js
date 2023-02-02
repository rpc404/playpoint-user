import{B as ft,R as K,x as dt,C as gt,a as X,j as v}from"./js/index.js";import{getMarketplaces as pt}from"./Marketplace.js";import mt from"./index26.js";import"./axios.js";import"./style2.js";import"./Stack.js";import"./styled.js";import"./extendSxProp.js";import"./Skeleton.js";function I(e){return Array.isArray?Array.isArray(e):nt(e)==="[object Array]"}const Mt=1/0;function xt(e){if(typeof e=="string")return e;let t=e+"";return t=="0"&&1/e==-Mt?"-0":t}function Et(e){return e==null?"":xt(e)}function _(e){return typeof e=="string"}function st(e){return typeof e=="number"}function _t(e){return e===!0||e===!1||yt(e)&&nt(e)=="[object Boolean]"}function rt(e){return typeof e=="object"}function yt(e){return rt(e)&&e!==null}function m(e){return e!=null}function D(e){return!e.trim().length}function nt(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const It="Incorrect 'index' type",St=e=>`Invalid value for key ${e}`,At=e=>`Pattern length exceeds max of ${e}.`,Lt=e=>`Missing ${e} property in key`,wt=e=>`Property 'weight' in key '${e}' must be a positive integer`,J=Object.prototype.hasOwnProperty;class kt{constructor(t){this._keys=[],this._keyMap={};let s=0;t.forEach(r=>{let n=it(r);s+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,s+=n.weight}),this._keys.forEach(r=>{r.weight/=s})}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function it(e){let t=null,s=null,r=null,n=1,i=null;if(_(e)||I(e))r=e,t=Z(e),s=W(e);else{if(!J.call(e,"name"))throw new Error(Lt("name"));const c=e.name;if(r=c,J.call(e,"weight")&&(n=e.weight,n<=0))throw new Error(wt(c));t=Z(c),s=W(c),i=e.getFn}return{path:t,id:s,weight:n,src:r,getFn:i}}function Z(e){return I(e)?e:e.split(".")}function W(e){return I(e)?e.join("."):e}function Rt(e,t){let s=[],r=!1;const n=(i,c,a)=>{if(m(i))if(!c[a])s.push(i);else{let o=c[a];const h=i[o];if(!m(h))return;if(a===c.length-1&&(_(h)||st(h)||_t(h)))s.push(Et(h));else if(I(h)){r=!0;for(let l=0,f=h.length;l<f;l+=1)n(h[l],c,a+1)}else c.length&&n(h,c,a+1)}};return n(e,_(t)?t.split("."):t,0),r?s:s[0]}const Nt={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},bt={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1},Ot={location:0,threshold:.6,distance:100},$t={useExtendedSearch:!1,getFn:Rt,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var u={...bt,...Nt,...Ot,...$t};const Ct=/[^ ]+/g;function vt(e=1,t=3){const s=new Map,r=Math.pow(10,t);return{get(n){const i=n.match(Ct).length;if(s.has(i))return s.get(i);const c=1/Math.pow(i,.5*e),a=parseFloat(Math.round(c*r)/r);return s.set(i,a),a},clear(){s.clear()}}}class G{constructor({getFn:t=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){this.norm=vt(s,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((s,r)=>{this._keysMap[s.id]=r})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,_(this.docs[0])?this.docs.forEach((t,s)=>{this._addString(t,s)}):this.docs.forEach((t,s)=>{this._addObject(t,s)}),this.norm.clear())}add(t){const s=this.size();_(t)?this._addString(t,s):this._addObject(t,s)}removeAt(t){this.records.splice(t,1);for(let s=t,r=this.size();s<r;s+=1)this.records[s].i-=1}getValueForItemAtKeyId(t,s){return t[this._keysMap[s]]}size(){return this.records.length}_addString(t,s){if(!m(t)||D(t))return;let r={v:t,i:s,n:this.norm.get(t)};this.records.push(r)}_addObject(t,s){let r={i:s,$:{}};this.keys.forEach((n,i)=>{let c=n.getFn?n.getFn(t):this.getFn(t,n.path);if(m(c)){if(I(c)){let a=[];const o=[{nestedArrIndex:-1,value:c}];for(;o.length;){const{nestedArrIndex:h,value:l}=o.pop();if(m(l))if(_(l)&&!D(l)){let f={v:l,i:h,n:this.norm.get(l)};a.push(f)}else I(l)&&l.forEach((f,d)=>{o.push({nestedArrIndex:d,value:f})})}r.$[i]=a}else if(_(c)&&!D(c)){let a={v:c,n:this.norm.get(c)};r.$[i]=a}}}),this.records.push(r)}toJSON(){return{keys:this.keys,records:this.records}}}function ct(e,t,{getFn:s=u.getFn,fieldNormWeight:r=u.fieldNormWeight}={}){const n=new G({getFn:s,fieldNormWeight:r});return n.setKeys(e.map(it)),n.setSources(t),n.create(),n}function Tt(e,{getFn:t=u.getFn,fieldNormWeight:s=u.fieldNormWeight}={}){const{keys:r,records:n}=e,i=new G({getFn:t,fieldNormWeight:s});return i.setKeys(r),i.setIndexRecords(n),i}function T(e,{errors:t=0,currentLocation:s=0,expectedLocation:r=0,distance:n=u.distance,ignoreLocation:i=u.ignoreLocation}={}){const c=t/e.length;if(i)return c;const a=Math.abs(r-s);return n?c+a/n:a?1:c}function Ft(e=[],t=u.minMatchCharLength){let s=[],r=-1,n=-1,i=0;for(let c=e.length;i<c;i+=1){let a=e[i];a&&r===-1?r=i:!a&&r!==-1&&(n=i-1,n-r+1>=t&&s.push([r,n]),r=-1)}return e[i-1]&&i-r>=t&&s.push([r,i-1]),s}const R=32;function jt(e,t,s,{location:r=u.location,distance:n=u.distance,threshold:i=u.threshold,findAllMatches:c=u.findAllMatches,minMatchCharLength:a=u.minMatchCharLength,includeMatches:o=u.includeMatches,ignoreLocation:h=u.ignoreLocation}={}){if(t.length>R)throw new Error(At(R));const l=t.length,f=e.length,d=Math.max(0,Math.min(r,f));let g=i,p=d;const M=a>1||o,w=M?Array(f):[];let y;for(;(y=e.indexOf(t,p))>-1;){let x=T(t,{currentLocation:y,expectedLocation:d,distance:n,ignoreLocation:h});if(g=Math.min(x,g),p=y+l,M){let S=0;for(;S<l;)w[y+S]=1,S+=1}}p=-1;let N=[],k=1,$=l+f;const ut=1<<l-1;for(let x=0;x<l;x+=1){let S=0,A=$;for(;S<A;)T(t,{errors:x,currentLocation:d+A,expectedLocation:d,distance:n,ignoreLocation:h})<=g?S=A:$=A,A=Math.floor(($-S)/2+S);$=A;let U=Math.max(1,d-A+1),P=c?f:Math.min(d+A,f)+l,b=Array(P+2);b[P+1]=(1<<x)-1;for(let E=P;E>=U;E-=1){let C=E-1,Q=s[e.charAt(C)];if(M&&(w[C]=+!!Q),b[E]=(b[E+1]<<1|1)&Q,x&&(b[E]|=(N[E+1]|N[E])<<1|1|N[E+1]),b[E]&ut&&(k=T(t,{errors:x,currentLocation:C,expectedLocation:d,distance:n,ignoreLocation:h}),k<=g)){if(g=k,p=C,p<=d)break;U=Math.max(1,2*d-p)}}if(T(t,{errors:x+1,currentLocation:d,expectedLocation:d,distance:n,ignoreLocation:h})>g)break;N=b}const j={isMatch:p>=0,score:Math.max(.001,k)};if(M){const x=Ft(w,a);x.length?o&&(j.indices=x):j.isMatch=!1}return j}function Pt(e){let t={};for(let s=0,r=e.length;s<r;s+=1){const n=e.charAt(s);t[n]=(t[n]||0)|1<<r-s-1}return t}class ot{constructor(t,{location:s=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:a=u.minMatchCharLength,isCaseSensitive:o=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){if(this.options={location:s,threshold:r,distance:n,includeMatches:i,findAllMatches:c,minMatchCharLength:a,isCaseSensitive:o,ignoreLocation:h},this.pattern=o?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(d,g)=>{this.chunks.push({pattern:d,alphabet:Pt(d),startIndex:g})},f=this.pattern.length;if(f>R){let d=0;const g=f%R,p=f-g;for(;d<p;)l(this.pattern.substr(d,R),d),d+=R;if(g){const M=f-R;l(this.pattern.substr(M),M)}}else l(this.pattern,0)}searchIn(t){const{isCaseSensitive:s,includeMatches:r}=this.options;if(s||(t=t.toLowerCase()),this.pattern===t){let p={isMatch:!0,score:0};return r&&(p.indices=[[0,t.length-1]]),p}const{location:n,distance:i,threshold:c,findAllMatches:a,minMatchCharLength:o,ignoreLocation:h}=this.options;let l=[],f=0,d=!1;this.chunks.forEach(({pattern:p,alphabet:M,startIndex:w})=>{const{isMatch:y,score:N,indices:k}=jt(t,p,M,{location:n+w,distance:i,threshold:c,findAllMatches:a,minMatchCharLength:o,includeMatches:r,ignoreLocation:h});y&&(d=!0),f+=N,y&&k&&(l=[...l,...k])});let g={isMatch:d,score:d?f/this.chunks.length:1};return d&&r&&(g.indices=l),g}}class L{constructor(t){this.pattern=t}static isMultiMatch(t){return q(t,this.multiRegex)}static isSingleMatch(t){return q(t,this.singleRegex)}search(){}}function q(e,t){const s=e.match(t);return s?s[1]:null}class Kt extends L{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const s=t===this.pattern;return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class Dt extends L{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const r=t.indexOf(this.pattern)===-1;return{isMatch:r,score:r?0:1,indices:[0,t.length-1]}}}class Wt extends L{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const s=t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class Bt extends L{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const s=!t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class zt extends L{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const s=t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[t.length-this.pattern.length,t.length-1]}}}class Ht extends L{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const s=!t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class at extends L{constructor(t,{location:s=u.location,threshold:r=u.threshold,distance:n=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:a=u.minMatchCharLength,isCaseSensitive:o=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){super(t),this._bitapSearch=new ot(t,{location:s,threshold:r,distance:n,includeMatches:i,findAllMatches:c,minMatchCharLength:a,isCaseSensitive:o,ignoreLocation:h})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class ht extends L{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let s=0,r;const n=[],i=this.pattern.length;for(;(r=t.indexOf(this.pattern,s))>-1;)s=r+i,n.push([r,s-1]);const c=!!n.length;return{isMatch:c,score:c?0:1,indices:n}}}const B=[Kt,ht,Wt,Bt,Ht,zt,Dt,at],tt=B.length,Vt=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,Yt="|";function Gt(e,t={}){return e.split(Yt).map(s=>{let r=s.trim().split(Vt).filter(i=>i&&!!i.trim()),n=[];for(let i=0,c=r.length;i<c;i+=1){const a=r[i];let o=!1,h=-1;for(;!o&&++h<tt;){const l=B[h];let f=l.isMultiMatch(a);f&&(n.push(new l(f,t)),o=!0)}if(!o)for(h=-1;++h<tt;){const l=B[h];let f=l.isSingleMatch(a);if(f){n.push(new l(f,t));break}}}return n})}const Ut=new Set([at.type,ht.type]);class Qt{constructor(t,{isCaseSensitive:s=u.isCaseSensitive,includeMatches:r=u.includeMatches,minMatchCharLength:n=u.minMatchCharLength,ignoreLocation:i=u.ignoreLocation,findAllMatches:c=u.findAllMatches,location:a=u.location,threshold:o=u.threshold,distance:h=u.distance}={}){this.query=null,this.options={isCaseSensitive:s,includeMatches:r,minMatchCharLength:n,findAllMatches:c,ignoreLocation:i,location:a,threshold:o,distance:h},this.pattern=s?t:t.toLowerCase(),this.query=Gt(this.pattern,this.options)}static condition(t,s){return s.useExtendedSearch}searchIn(t){const s=this.query;if(!s)return{isMatch:!1,score:1};const{includeMatches:r,isCaseSensitive:n}=this.options;t=n?t:t.toLowerCase();let i=0,c=[],a=0;for(let o=0,h=s.length;o<h;o+=1){const l=s[o];c.length=0,i=0;for(let f=0,d=l.length;f<d;f+=1){const g=l[f],{isMatch:p,indices:M,score:w}=g.search(t);if(p){if(i+=1,a+=w,r){const y=g.constructor.type;Ut.has(y)?c=[...c,...M]:c.push(M)}}else{a=0,i=0,c.length=0;break}}if(i){let f={isMatch:!0,score:a/i};return r&&(f.indices=c),f}}return{isMatch:!1,score:1}}}const z=[];function Xt(...e){z.push(...e)}function H(e,t){for(let s=0,r=z.length;s<r;s+=1){let n=z[s];if(n.condition(e,t))return new n(e,t)}return new ot(e,t)}const F={AND:"$and",OR:"$or"},V={PATH:"$path",PATTERN:"$val"},Y=e=>!!(e[F.AND]||e[F.OR]),Jt=e=>!!e[V.PATH],Zt=e=>!I(e)&&rt(e)&&!Y(e),et=e=>({[F.AND]:Object.keys(e).map(t=>({[t]:e[t]}))});function lt(e,t,{auto:s=!0}={}){const r=n=>{let i=Object.keys(n);const c=Jt(n);if(!c&&i.length>1&&!Y(n))return r(et(n));if(Zt(n)){const o=c?n[V.PATH]:i[0],h=c?n[V.PATTERN]:n[o];if(!_(h))throw new Error(St(o));const l={keyId:W(o),pattern:h};return s&&(l.searcher=H(h,t)),l}let a={children:[],operator:i[0]};return i.forEach(o=>{const h=n[o];I(h)&&h.forEach(l=>{a.children.push(r(l))})}),a};return Y(e)||(e=et(e)),r(e)}function qt(e,{ignoreFieldNorm:t=u.ignoreFieldNorm}){e.forEach(s=>{let r=1;s.matches.forEach(({key:n,norm:i,score:c})=>{const a=n?n.weight:null;r*=Math.pow(c===0&&a?Number.EPSILON:c,(a||1)*(t?1:i))}),s.score=r})}function te(e,t){const s=e.matches;t.matches=[],m(s)&&s.forEach(r=>{if(!m(r.indices)||!r.indices.length)return;const{indices:n,value:i}=r;let c={indices:n,value:i};r.key&&(c.key=r.key.src),r.idx>-1&&(c.refIndex=r.idx),t.matches.push(c)})}function ee(e,t){t.score=e.score}function se(e,t,{includeMatches:s=u.includeMatches,includeScore:r=u.includeScore}={}){const n=[];return s&&n.push(te),r&&n.push(ee),e.map(i=>{const{idx:c}=i,a={item:t[c],refIndex:c};return n.length&&n.forEach(o=>{o(i,a)}),a})}class O{constructor(t,s={},r){this.options={...u,...s},this.options.useExtendedSearch,this._keyStore=new kt(this.options.keys),this.setCollection(t,r)}setCollection(t,s){if(this._docs=t,s&&!(s instanceof G))throw new Error(It);this._myIndex=s||ct(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){m(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=()=>!1){const s=[];for(let r=0,n=this._docs.length;r<n;r+=1){const i=this._docs[r];t(i,r)&&(this.removeAt(r),r-=1,n-=1,s.push(i))}return s}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:s=-1}={}){const{includeMatches:r,includeScore:n,shouldSort:i,sortFn:c,ignoreFieldNorm:a}=this.options;let o=_(t)?_(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return qt(o,{ignoreFieldNorm:a}),i&&o.sort(c),st(s)&&s>-1&&(o=o.slice(0,s)),se(o,this._docs,{includeMatches:r,includeScore:n})}_searchStringList(t){const s=H(t,this.options),{records:r}=this._myIndex,n=[];return r.forEach(({v:i,i:c,n:a})=>{if(!m(i))return;const{isMatch:o,score:h,indices:l}=s.searchIn(i);o&&n.push({item:i,idx:c,matches:[{score:h,value:i,norm:a,indices:l}]})}),n}_searchLogical(t){const s=lt(t,this.options),r=(a,o,h)=>{if(!a.children){const{keyId:f,searcher:d}=a,g=this._findMatches({key:this._keyStore.get(f),value:this._myIndex.getValueForItemAtKeyId(o,f),searcher:d});return g&&g.length?[{idx:h,item:o,matches:g}]:[]}const l=[];for(let f=0,d=a.children.length;f<d;f+=1){const g=a.children[f],p=r(g,o,h);if(p.length)l.push(...p);else if(a.operator===F.AND)return[]}return l},n=this._myIndex.records,i={},c=[];return n.forEach(({$:a,i:o})=>{if(m(a)){let h=r(s,a,o);h.length&&(i[o]||(i[o]={idx:o,item:a,matches:[]},c.push(i[o])),h.forEach(({matches:l})=>{i[o].matches.push(...l)}))}}),c}_searchObjectList(t){const s=H(t,this.options),{keys:r,records:n}=this._myIndex,i=[];return n.forEach(({$:c,i:a})=>{if(!m(c))return;let o=[];r.forEach((h,l)=>{o.push(...this._findMatches({key:h,value:c[l],searcher:s}))}),o.length&&i.push({idx:a,item:c,matches:o})}),i}_findMatches({key:t,value:s,searcher:r}){if(!m(s))return[];let n=[];if(I(s))s.forEach(({v:i,i:c,n:a})=>{if(!m(i))return;const{isMatch:o,score:h,indices:l}=r.searchIn(i);o&&n.push({score:h,key:t,value:i,idx:c,norm:a,indices:l})});else{const{v:i,n:c}=s,{isMatch:a,score:o,indices:h}=r.searchIn(i);a&&n.push({score:o,key:t,value:i,norm:c,indices:h})}return n}}O.version="6.6.2";O.createIndex=ct;O.parseIndex=Tt;O.config=u;O.parseQuery=lt;Xt(Qt);const de=()=>{const[{marketplaces:e},t]=ft(),[s,r]=K.useState(!0),[n,i]=K.useState(e),c=dt(),a=o=>{if(o){const l=new O(e,{keys:["marketplaceName","marketplaceSlug"],includeScore:!0}).search(o),f=[];l.length?(l.forEach(d=>{f.push(d.item)}),i(f)):i([])}else{i(e);return}};return K.useEffect(()=>{(async()=>{if(e.length===0){let o=await pt();o=o.data.marketplaces,i(o),t({type:gt.SET_ALL_MARKETPLACE,payload:o})}r(!1)})()},[]),X("div",{className:"marketplace__container",children:[v("div",{className:"searchfield",children:X("div",{className:"search__container",children:[v("i",{className:"ri-search-line icon"}),v("input",{type:"input",onChange:o=>a(o.target.value),placeholder:"Search Marketplaces..."})]})}),v(mt,{marketplaces:e,loading:s,...c.pathname==="/marketplace"&&{searchFixture:n}})]})};export{de as default};
//# sourceMappingURL=index10.js.map
