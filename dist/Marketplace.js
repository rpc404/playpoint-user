import{a as t}from"./axios.js";const r=async()=>{var a=await t.get("https://api.playpoint.ai/api/v1/marketplace");return a},s=async a=>{var e=await t.get(`https://api.playpoint.ai/api/v1/marketplace-stats/${a}`);return e};export{s as getMarketplaceStat,r as getMarketplaces};
//# sourceMappingURL=Marketplace.js.map
