import{f as v,u as p,b as y,o as g,B as b,d as f,g as T,i as I}from"./app-GN6kLJRO.js";var l={root:"m-7341320d"};const R={},h=f((e,{size:a,radius:t,variant:s,gradient:c,color:o,autoContrast:i})=>{const r=e.variantColorResolver({color:o||e.primaryColor,theme:e,gradient:c,variant:s||"filled",autoContrast:i});return{root:{"--ti-size":T(a,"ti-size"),"--ti-radius":t===void 0?void 0:I(t),"--ti-bg":o||s?r.background:void 0,"--ti-color":o||s?r.color:void 0,"--ti-bd":o||s?r.border:void 0}}}),n=v((e,a)=>{const t=p("ThemeIcon",R,e),{classNames:s,className:c,style:o,styles:i,unstyled:r,vars:d,autoContrast:z,...m}=t,u=y({name:"ThemeIcon",classes:l,props:t,className:c,style:o,classNames:s,styles:i,unstyled:r,vars:d,varsResolver:h});return g.createElement(b,{ref:a,...u("root"),...m})});n.classes=l;n.displayName="@mantine/core/ThemeIcon";export{n as T};
