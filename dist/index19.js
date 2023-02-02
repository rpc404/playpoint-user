import{u as T,a as s,j as i,F as f}from"./js/index.js";import{a as d}from"./CountryFlags.js";import u from"./moment.js";import{G as r}from"./GetFlags.js";import{u as g}from"./UseWindowDimension.js";import{T as w}from"./Typography.js";import{B as l}from"./Button.js";import"./styled.js";import"./extendSxProp.js";import"./ButtonBase.js";import"./useForkRef.js";function j({data:o,handleModalOpen:h,group:N,fixtures:p,marketplaceSlug:a}){const t=T(),v=e=>{var c=[];return p.forEach(m=>{u(m?.DateUtc).format("LL")===e&&c.push(m)}),c},n=e=>i("div",{className:"gameTime",children:e.status[0]?.status==="closed"?s(f,{children:[e.HomeTeamScore," : ",e.AwayTeamScore]}):u(e?.DateUtc).format("LT")}),{width:_}=g();return s("div",{className:"fixtureCard__container",children:[s(w,{component:"span",variant:"h3",children:["🗓️ ",o]}),v(o).reverse().map((e,c)=>{if(N==="all")return s("div",{className:"gameDetails__item",children:[s("div",{className:`status ${e.status[0].status}`,children:[i("p",{children:e.status[0].status}),e.status[0].status==="open"&&i("p",{className:"dot"})]}),s("div",{className:"gameDetails",children:[s("div",{className:"gameDetails__teamDetails",style:{cursor:"pointer"},onClick:()=>t(`/predict/${e?._id}`,{state:{marketplaceSlug:a}}),children:[i("div",{className:"teamName",children:e?.HomeTeam}),r(a,e?.HomeTeam),n(e),r(a,e.AwayTeam),i("div",{className:"teamName",children:e?.AwayTeam})]}),s("div",{className:"gameDetails__location",children:[i("i",{className:"ri-map-pin-2-line"})," ",e?.Location]}),s("div",{className:"gameDetails__action",children:[i(l,{className:"quickView",onClick:()=>h(e),children:"Quick View"}),i(l,{children:i("i",{className:"ri-arrow-right-line"})})]})]})]},c);if(e?.Group===N)return s("div",{className:"gameDetails__item",children:[_>576?s("div",{className:"gameDetails__teamDetails",onClick:()=>t(`/predict/${e?._id}`),children:[i("div",{className:"teamName",children:e?.HomeTeam}),r(a,e.HomeTeam),n(e),r(a,e.AwayTeam),i("div",{className:"teamName",children:e?.AwayTeam})]}):s(l,{className:"gameDetails__teamDetails",onClick:()=>t(`/predict/${e._id}`),children:[i("div",{className:"teamName",children:e?.HomeTeam}),d.map((m,D)=>r(a,m)),n(e),d.map((m,D)=>r(a,m)),i("div",{className:"teamName",children:e?.AwayTeam})]}),s("div",{className:"gameDetails__location",children:[i("i",{className:"ri-map-pin-2-line"})," ",e?.Location]}),s("div",{className:"gameDetails__action",children:[i(l,{className:"quickView",onClick:()=>h(e),children:"Quick View"}),i(l,{children:i("i",{className:"ri-arrow-right-line"})})]})]},c)})]})}export{j as default};
//# sourceMappingURL=index19.js.map
