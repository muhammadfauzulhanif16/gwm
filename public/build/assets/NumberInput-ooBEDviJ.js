import{f as U,u as Z,b as de,o as h,B as ze,d as ce,i as Ee,r as c,_ as Ce,k as Le,l as Te,U as re,c as He,m as _e,g as Fe}from"./app-GN6kLJRO.js";import{b as A,a as Ie,u as Pe}from"./AppLayout-Gf3vqqpC.js";import{N as Ve}from"./react-number-format.es-vD2MZIg7.js";import{c as D}from"./MultiSelect-GIHIZ9yY.js";var De={};function Ae(){return typeof process<"u"&&De?"production":"development"}var fe={root:"m-e9408a47","root--default":"m-84c9523a","root--filled":"m-ef274e49","root--unstyled":"m-eda993d3",legend:"m-90794832","legend--unstyled":"m-74ca27fe"};const We={variant:"default"},Be=ce((r,{radius:e})=>({root:{"--fieldset-radius":e===void 0?void 0:Ee(e)}})),me=U((r,e)=>{const t=Z("Fieldset",We,r),{classNames:n,className:i,style:m,styles:s,unstyled:g,vars:d,legend:v,variant:p,children:S,...a}=t,u=de({name:"Fieldset",classes:fe,props:t,className:i,style:m,classNames:n,styles:s,unstyled:g,vars:d,varsResolver:Be});return h.createElement(ze,{component:"fieldset",ref:e,variant:p,...u("root",{variant:p}),...a},v&&h.createElement("legend",{...u("legend",{variant:p})},v),S)});me.classes=fe;me.displayName="@mantine/core/Fieldset";var $e=c.useLayoutEffect,Me=function(e){var t=c.useRef(e);return $e(function(){t.current=e}),t},ne=function(e,t){if(typeof e=="function"){e(t);return}e.current=t},ke=function(e,t){var n=c.useRef();return c.useCallback(function(i){e.current=i,n.current&&ne(n.current,null),n.current=t,t&&ne(t,i)},[t])},oe={"min-height":"0","max-height":"none",height:"0",visibility:"hidden",overflow:"hidden",position:"absolute","z-index":"-1000",top:"0",right:"0"},Ue=function(e){Object.keys(oe).forEach(function(t){e.style.setProperty(t,oe[t],"important")})},ie=Ue,f=null,ae=function(e,t){var n=e.scrollHeight;return t.sizingStyle.boxSizing==="border-box"?n+t.borderSize:n-t.paddingSize};function Ze(r,e,t,n){t===void 0&&(t=1),n===void 0&&(n=1/0),f||(f=document.createElement("textarea"),f.setAttribute("tabindex","-1"),f.setAttribute("aria-hidden","true"),ie(f)),f.parentNode===null&&document.body.appendChild(f);var i=r.paddingSize,m=r.borderSize,s=r.sizingStyle,g=s.boxSizing;Object.keys(s).forEach(function(a){var u=a;f.style[u]=s[u]}),ie(f),f.value=e;var d=ae(f,r);f.value=e,d=ae(f,r),f.value="x";var v=f.scrollHeight-i,p=v*t;g==="border-box"&&(p=p+i+m),d=Math.max(p,d);var S=v*n;return g==="border-box"&&(S=S+i+m),d=Math.min(S,d),[d,v]}var se=function(){},je=function(e,t){return e.reduce(function(n,i){return n[i]=t[i],n},{})},Oe=["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth","boxSizing","fontFamily","fontSize","fontStyle","fontWeight","letterSpacing","lineHeight","paddingBottom","paddingLeft","paddingRight","paddingTop","tabSize","textIndent","textRendering","textTransform","width","wordBreak"],Ge=!!document.documentElement.currentStyle,Xe=function(e){var t=window.getComputedStyle(e);if(t===null)return null;var n=je(Oe,t),i=n.boxSizing;if(i==="")return null;Ge&&i==="border-box"&&(n.width=parseFloat(n.width)+parseFloat(n.borderRightWidth)+parseFloat(n.borderLeftWidth)+parseFloat(n.paddingRight)+parseFloat(n.paddingLeft)+"px");var m=parseFloat(n.paddingBottom)+parseFloat(n.paddingTop),s=parseFloat(n.borderBottomWidth)+parseFloat(n.borderTopWidth);return{sizingStyle:n,paddingSize:m,borderSize:s}},Ye=Xe;function ve(r,e,t){var n=Me(t);c.useLayoutEffect(function(){var i=function(s){return n.current(s)};if(r)return r.addEventListener(e,i),function(){return r.removeEventListener(e,i)}},[])}var Ke=function(e){ve(window,"resize",e)},qe=function(e){ve(document.fonts,"loadingdone",e)},Je=["cacheMeasurements","maxRows","minRows","onChange","onHeightChange"],Qe=function(e,t){var n=e.cacheMeasurements,i=e.maxRows,m=e.minRows,s=e.onChange,g=s===void 0?se:s,d=e.onHeightChange,v=d===void 0?se:d,p=Ce(e,Je),S=p.value!==void 0,a=c.useRef(null),u=ke(a,t),x=c.useRef(0),E=c.useRef(),R=function(){var b=a.current,C=n&&E.current?E.current:Ye(b);if(C){E.current=C;var H=Ze(C,b.value||b.placeholder||"x",m,i),y=H[0],W=H[1];x.current!==y&&(x.current=y,b.style.setProperty("height",y+"px","important"),v(y,{rowHeight:W}))}},z=function(b){S||R(),g(b)};return c.useLayoutEffect(R),Ke(R),qe(R),c.createElement("textarea",Le({},p,{onChange:z,ref:u}))},et=c.forwardRef(Qe);const tt={},pe=U((r,e)=>{const{autosize:t,maxRows:n,minRows:i,__staticSelector:m,resize:s,...g}=Z("Textarea",tt,r),d=t&&Ae()!=="test",v=d?{maxRows:n,minRows:i}:{};return h.createElement(A,{component:d?et:"textarea",ref:e,...g,__staticSelector:m||"Textarea",multiline:!0,"data-no-overflow":t&&n===void 0||void 0,__vars:{"--input-resize":s},...v})});pe.classes=A.classes;pe.displayName="@mantine/core/Textarea";function ue({direction:r,style:e,...t}){return h.createElement("svg",{style:{width:"var(--ni-chevron-size)",height:"var(--ni-chevron-size)",transform:r==="up"?"rotate(180deg)":void 0,...e},viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},h.createElement("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}var k={root:"m-e2f5cd4e",controls:"m-95e17d22",control:"m-80b4b171"};const rt=/^-0(\.0*)?$/,nt=/^-?0\d+$/;function ot(r){return(typeof r=="number"?r<Number.MAX_SAFE_INTEGER:!Number.isNaN(Number(r)))&&!Number.isNaN(r)}function it({value:r,min:e,step:t=1,allowNegative:n}){const i=r-t;return e!==void 0&&i<e?e:!n&&i<0&&e===void 0?r:(e!==void 0&&e>=0&&i<=e,i)}function le(r,e,t){if(r===void 0)return!0;const n=e===void 0||r>=e,i=t===void 0||r<=t;return n&&i}const at={step:1,clampBehavior:"blur",allowDecimal:!0,allowNegative:!0,startValue:0},st=ce((r,{size:e})=>({controls:{"--ni-chevron-size":Fe(e,"ni-chevron-size")}})),he=U((r,e)=>{const t=Z("NumberInput",at,r),{className:n,classNames:i,styles:m,unstyled:s,vars:g,onChange:d,onValueChange:v,value:p,defaultValue:S,max:a,min:u,step:x,hideControls:E,rightSection:R,isAllowed:z,clampBehavior:T,onBlur:b,allowDecimal:C,decimalScale:H,onKeyDown:y,handlersRef:W,startValue:j,disabled:_,rightSectionPointerEvents:ge,allowNegative:O,readOnly:B,size:G,rightSectionWidth:be,stepHoldInterval:F,stepHoldDelay:X,allowLeadingZeros:Y,...Se}=t,$=de({name:"NumberInput",classes:k,props:t,classNames:i,styles:m,unstyled:s,vars:g,varsResolver:st}),{resolvedClassNames:ye,resolvedStyles:we}=Ie({classNames:i,styles:m,props:t}),[l,N]=Pe({value:p,defaultValue:S,onChange:d}),K=X!==void 0&&F!==void 0,q=c.useRef(null),L=c.useRef(null),M=c.useRef(0),xe=(o,w)=>{w.source==="event"&&N(ot(o.floatValue)&&!rt.test(o.value)&&!(Y&&nt.test(o.value))?o.floatValue:o.value),v==null||v(o,w)},I=c.useRef();I.current=()=>{typeof l!="number"||Number.isNaN(l)?N(D(j,u,a)):N(a!==void 0?l+x<=a?l+x:a:l+x)};const P=c.useRef();P.current=()=>{typeof l!="number"||Number.isNaN(l)?N(D(j,u,a)):N(it({value:l,min:u,step:x,allowNegative:O}))};const Re=o=>{y==null||y(o),!B&&(o.key==="ArrowUp"&&(o.preventDefault(),I.current()),o.key==="ArrowDown"&&(o.preventDefault(),P.current()))};Te(W,{increment:I.current,decrement:P.current});const J=o=>{o?I.current():P.current(),M.current+=1},Q=o=>{if(J(o),K){const w=typeof F=="number"?F:F(M.current);L.current=window.setTimeout(()=>Q(o),w)}},ee=(o,w)=>{var te;o.preventDefault(),(te=q.current)==null||te.focus(),J(w),K&&(L.current=window.setTimeout(()=>Q(w),X))},V=()=>{L.current&&window.clearTimeout(L.current),L.current=null,M.current=0},Ne=h.createElement("div",{...$("controls")},h.createElement(re,{...$("control"),tabIndex:-1,"aria-hidden":!0,disabled:_||typeof l=="number"&&a!==void 0&&l>=a,mod:{direction:"up"},onMouseDown:o=>o.preventDefault(),onPointerDown:o=>{ee(o,!0)},onPointerUp:V,onPointerLeave:V},h.createElement(ue,{direction:"up"})),h.createElement(re,{...$("control"),tabIndex:-1,"aria-hidden":!0,disabled:_||typeof l=="number"&&u!==void 0&&l<=u,mod:{direction:"down"},onMouseDown:o=>o.preventDefault(),onPointerDown:o=>{ee(o,!1)},onPointerUp:V,onPointerLeave:V},h.createElement(ue,{direction:"down"})));return h.createElement(A,{component:Ve,allowNegative:O,className:He(k.root,n),size:G,...Se,readOnly:B,disabled:_,value:l,getInputRef:_e(e,q),onValueChange:xe,rightSection:E||B?R:R||Ne,classNames:ye,styles:we,unstyled:s,__staticSelector:"NumberInput",decimalScale:C?H:0,onKeyDown:Re,rightSectionPointerEvents:ge??(_?"none":void 0),rightSectionWidth:be??`var(--ni-right-section-width-${G||"sm"})`,allowLeadingZeros:Y,onBlur:o=>{b==null||b(o),T==="blur"&&typeof l=="number"&&D(l,u,a)!==l&&N(D(l,u,a))},isAllowed:o=>T==="strict"?z?z(o)&&le(o.floatValue,u,a):le(o.floatValue,u,a):z?z(o):!0})});he.classes={...A.classes,...k};he.displayName="@mantine/core/NumberInput";export{me as F,he as N,pe as T};