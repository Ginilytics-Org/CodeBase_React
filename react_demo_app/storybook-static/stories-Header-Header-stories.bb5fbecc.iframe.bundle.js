"use strict";(self.webpackChunkreact_demo_app=self.webpackChunkreact_demo_app||[]).push([[386],{"./src/stories/Header/Header.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Header_stories});__webpack_require__("./node_modules/react/index.js");var layout=__webpack_require__("./node_modules/antd/es/layout/index.js"),es_menu=__webpack_require__("./node_modules/antd/es/menu/index.js"),dropdown=__webpack_require__("./node_modules/antd/es/dropdown/index.js"),avatar=__webpack_require__("./node_modules/antd/es/avatar/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),react_router_dom_dist=__webpack_require__("./node_modules/react-router-dom/dist/index.js"),UserOutlined=__webpack_require__("./node_modules/@ant-design/icons/es/icons/UserOutlined.js");const TodoLogo_namespaceObject=__webpack_require__.p+"b265047857856724be20.png";var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const{Header:AntHeader}=layout.A,Header_Header=()=>{const navigate=(0,dist.Zp)(),menu=(0,jsx_runtime.jsxs)(es_menu.A,{children:[(0,jsx_runtime.jsx)(es_menu.A.Item,{children:(0,jsx_runtime.jsx)(react_router_dom_dist.N_,{to:"/profile",children:"Profile"})},"profile"),(0,jsx_runtime.jsx)(es_menu.A.Item,{children:(0,jsx_runtime.jsx)(react_router_dom_dist.N_,{to:"/settings",children:"Settings"})},"settings"),(0,jsx_runtime.jsx)(es_menu.A.Item,{onClick:()=>{localStorage.removeItem("loggedInUser"),navigate("/")},children:"Logout"},"logout")]});return(0,jsx_runtime.jsxs)(AntHeader,{className:"header",children:[(0,jsx_runtime.jsx)("div",{className:"logo",children:(0,jsx_runtime.jsx)(react_router_dom_dist.N_,{to:"/todo",children:(0,jsx_runtime.jsx)("img",{src:TodoLogo_namespaceObject,alt:"Logo",className:"logo-image"})})}),(0,jsx_runtime.jsxs)(es_menu.A,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["1"],children:[(0,jsx_runtime.jsx)(es_menu.A.Item,{children:(0,jsx_runtime.jsx)(react_router_dom_dist.N_,{to:"/todo",children:"Home"})},"home"),(0,jsx_runtime.jsx)(es_menu.A.Item,{children:(0,jsx_runtime.jsx)(react_router_dom_dist.N_,{to:"/about",children:"About"})},"about"),(0,jsx_runtime.jsx)(es_menu.A.Item,{children:(0,jsx_runtime.jsx)(react_router_dom_dist.N_,{to:"/contact",children:"Contact"})},"contact")]}),(0,jsx_runtime.jsx)("div",{className:"user-dropdown",children:(0,jsx_runtime.jsx)(dropdown.A,{overlay:menu,trigger:["click"],children:(0,jsx_runtime.jsxs)("div",{style:{cursor:"pointer",display:"flex",alignItems:"center"},children:[(0,jsx_runtime.jsx)(avatar.A,{icon:(0,jsx_runtime.jsx)(UserOutlined.A,{})}),(0,jsx_runtime.jsx)("span",{className:"username",style:{marginLeft:"8px"},children:"User"})]})})})]})},components_Header_Header=Header_Header;Header_Header.__docgenInfo={description:"",methods:[],displayName:"Header"};const Header_stories={title:"Components/Header",component:components_Header_Header},Default=()=>(0,jsx_runtime.jsx)(components_Header_Header,{}),__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => <AppHeader />",...Default.parameters?.docs?.source}}}}}]);