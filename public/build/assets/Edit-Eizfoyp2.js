import{W as p,j as a,B as u,h as x}from"./app-GN6kLJRO.js";import{c,F as f}from"./AppLayout-Gf3vqqpC.js";import{P as g}from"./PageHeader-OuuI5Bp2.js";import{T as h}from"./TextInput-v4RmyZAk.js";import{I as j}from"./IconCornerDownLeft-2Qks2vrS.js";import{K as b}from"./Kbd-Cj2wMUF5.js";const D=({title:o,description:i,jobs:l,job:n,auth:m})=>{const e=p({name:n.name||""});return a.jsx(c,{title:o,auth:m,children:a.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:40},onSubmit:t=>{t.preventDefault(),e.put(route("jobs.update",n.id))},children:[a.jsx(g,{title:o,description:i}),a.jsx(u,{bg:"gray.0",p:20,style:{borderRadius:8},children:a.jsx(h,{label:"Nama",autoFocus:!0,radius:8,variant:"filled",placeholder:"Masukkan nama pekerjaan",styles:{label:{marginBottom:8},input:{padding:20,height:40}},style:{flexGrow:1},value:e.data.name,onChange:t=>{const s=t.target.value;let r="";s?l.some(d=>new RegExp(`^${s}$`,"i").test(d.name))&&(r="Nama pekerjaan sudah ada"):r="Nama pekerjaan tidak boleh kosong",e.data.name=s,e.setData("name",e.data.name),r?e.setError("name",r):e.clearErrors("name")},error:e.errors.name})}),a.jsx(f,{justify:"flex-end",direction:{base:"column",xs:"row"},gap:20,children:a.jsx(x,{disabled:e.hasErrors||!e.data.name,loading:e.processing,loaderProps:{type:"dots"},type:"submit",h:40,px:20,radius:8,leftSection:a.jsx(j,{}),rightSection:a.jsx(b,{children:"Enter"}),children:"Simpan"})})]})})};export{D as default};
