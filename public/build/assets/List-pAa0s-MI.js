import{s as x,f as v,u as b,o as n,B as E,b as w,d as C,C as z,D as B,z as R}from"./app-GN6kLJRO.js";const[W,_]=x("List component was not found in tree");var u={root:"m-abbac491",item:"m-abb6bec2",itemWrapper:"m-75cd9f71",itemIcon:"m-60f83e5b"};const A={},L=v((a,t)=>{const s=b("ListItem",A,a),{classNames:r,className:i,style:l,styles:m,vars:S,icon:p,children:d,mod:y,...g}=s,e=_(),c=p||e.icon,o={classNames:r,styles:m};return n.createElement(E,{...e.getStyles("item",{...o,className:i,style:l}),component:"li",mod:[{"with-icon":!!c,centered:e.center},y],ref:t,...g},n.createElement("div",{...e.getStyles("itemWrapper",o)},c&&n.createElement("span",{...e.getStyles("itemIcon",o)},c),n.createElement("span",{...e.getStyles("itemLabel",o)},d)))});L.classes=u;L.displayName="@mantine/core/ListItem";const D={type:"unordered"},F=C((a,{size:t,spacing:s})=>({root:{"--list-fz":z(t),"--list-lh":B(t),"--list-spacing":R(s)}})),f=v((a,t)=>{const s=b("List",D,a),{classNames:r,className:i,style:l,styles:m,unstyled:S,vars:p,children:d,type:y,withPadding:g,icon:e,spacing:c,center:o,listStyleType:I,mod:N,...P}=s,h=w({name:"List",classes:u,props:s,className:i,style:l,classNames:r,styles:m,unstyled:S,vars:p,varsResolver:F});return n.createElement(W,{value:{center:o,icon:e,getStyles:h}},n.createElement(E,{...h("root",{style:{listStyleType:I}}),component:y==="unordered"?"ul":"ol",mod:[{"with-padding":g},N],ref:t,...P},d))});f.classes=u;f.displayName="@mantine/core/List";f.Item=L;export{f as L};
