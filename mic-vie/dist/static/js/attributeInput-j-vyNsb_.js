import{k as e,g as t,a as l}from"./vcc-B01xe5pI.js";import{s as a}from"./store-DVBowfCC.js";import{_ as s,r as o,o as i,f as n,w as c,a as r,b as u,s as d,c as m,F as h,d as p,e as f,T as _,h as y,v as k,p as b,i as v}from"./index-B-WSa6Ub.js";const x={props:["__rawVueInfo__","enableRemoveButton","shortcutInitMode"],data:function(){return{input:"",localAttributes:[],enable:!0,autoplay:!1,editMode:!1,textAttributes:""}},mounted(){document.querySelector(".attribute-container").addEventListener("click",(e=>{e.stopPropagation()})),"auto"===this.shortcutInitMode&&this.initShortcut()},beforeDestroy(){"auto"===this.shortcutInitMode&&this.destroyShortcut()},methods:{destroyShortcut(){e.unbind("⌘+a, ctrl+a"),e.unbind("⌘+s, ctrl+s"),e.unbind("⌘+d, ctrl+d"),e.unbind("⌘+c, ctrl+c")},initShortcut(){e("⌘+a, ctrl+a",(()=>{if(this.enable)return this.createNew(),!1})),e("⌘+s, ctrl+s",(()=>{if(this.enable)return this.save(),!1})),e("⌘+d, ctrl+d",(()=>{if(this.enable)return this.remove(),!1})),e("⌘+c, ctrl+c",(()=>{if(this.enable&&this.enableBroButton)return this.copyBro(),!1}))},onClassClick(){this.localAttributes.push({key:"class",value:"class-name"})},onEventClick(){this.localAttributes.push({key:"@click",value:"onEventClick"})},onTextClick(){this.localAttributes.push({key:"__text__",value:"content"})},createNew(){this.localAttributes.push({key:"",value:""})},save(){try{let e=[];if(this.editMode){e=this.textAttributes.split("\n").map((e=>{const[t,l]=e.split(": ");return{key:t,value:l}})),this.localAttributes=e}else e=this.localAttributes.filter((e=>!!e.key));this.$emit("save",{resultList:e,lc_id:this.rawInfoID}),this.$notify({title:"提示",message:"代码已更新",position:"bottom-right",type:"success"})}catch(e){this.$message.error(e)}},remove(){this.$emit("remove",{lc_id:this.rawInfoID})},deleteItem(e){this.localAttributes.splice(e,1)},copyBro(){!function(e){let t=Object.create(e.__proto__);Object.assign(t,JSON.parse(JSON.stringify(e))),t.__proto__.parentCodeNode.__children.push(t)}(this.__rawVueInfo__),a.commit("onDragEnd")},onShow(){this.initShortcut()},onHide(){this.destroyShortcut()}},computed:{componentName(){return this.__rawVueInfo__?t(this.__rawVueInfo__):""},rawInfoID(){return this.__rawVueInfo__?l(this.__rawVueInfo__).lc_id:""},enableBroButton(){return[{name:"el-option",ifInDoc:!1},{name:"el-table-column",ifInDoc:!1},{name:"el-checkbox",ifInDoc:!0},{name:"el-radio",ifInDoc:!0}].find((e=>e.name==this.componentName))&&!1},attributeList(){const e=[],l=this.__rawVueInfo__;if(l){const a=l[t(l)];for(const t in a)if(a.hasOwnProperty(t)){const l=a[t];"object"!=typeof l&&"lc-mark"!=t&&"lc_id"!=t&&e.push({key:t,value:l})}}return e},attributeKeys(){return this.localAttributes.map((e=>e.key))}},watch:{attributeList:{handler:function(){this.localAttributes=this.attributeList},immediate:!0},localAttributes(e){0===e.length&&e.push({key:"",value:""}),this.textAttributes=e.map((e=>`${e.key}: ${e.value}`)).join("\n")}}},C=e=>(b("data-v-954969e7"),e=e(),v(),e),w={style:{"text-align":"center"}},g={style:{"margin-top":"20px"}},I={name:"1"},V=C((()=>r("div",{class:"split"},":",-1))),A={class:"quick-add-root"},B={style:{"margin-top":"5px"}},D={name:"2"},S={style:{"margin-top":"10px","text-align":"center"}},z=C((()=>r("div",{style:{"text-algin":"center"}},[r("span",{class:"shortcut-tip"},"支持快捷键操作")],-1)));const M=s(x,[["render",function(e,t,l,a,s,b){const v=o("el-switch"),x=o("el-input"),C=o("Remove"),M=o("el-icon"),R=o("el-tag"),N=o("Plus"),j=o("el-button"),O=o("el-tooltip"),U=o("Refresh"),$=o("Delete"),E=o("document-copy"),L=o("el-card");return i(),n(L,{class:"attribute-container"},{default:c((()=>[r("div",w,[u(v,{modelValue:e.editMode,"onUpdate:modelValue":t[0]||(t[0]=t=>e.editMode=t),"active-text":"自由编辑","inactive-text":"约束编辑","active-color":"#13ce66","inactive-color":"#13ce66"},null,8,["modelValue"])]),r("div",g,[d(r("div",I,[r("div",null,[(i(!0),m(h,null,p(e.localAttributes,((e,t)=>(i(),m("div",{class:"item",key:t},[u(x,{modelValue:e.key,"onUpdate:modelValue":t=>e.key=t,placeholder:"key"+t,class:"half-width",type:"textarea",autosize:{minRows:2,maxRows:4}},null,8,["modelValue","onUpdate:modelValue","placeholder"]),V,u(x,{modelValue:e.value,"onUpdate:modelValue":t=>e.value=t,type:"textarea",placeholder:"value"+t,class:"half-width",style:{"flex-grow":"4"},autosize:{minRows:2,maxRows:4}},null,8,["modelValue","onUpdate:modelValue","placeholder"]),u(M,{style:{"margin-left":"5px"},onClick:e=>b.deleteItem(t)},{default:c((()=>[u(C)])),_:2},1032,["onClick"])])))),128)),r("div",A,[f(" 快速增加一些属性: "),r("div",B,[u(_,{name:"el-zoom-in-center"},{default:c((()=>[-1==b.attributeKeys.indexOf("class")?(i(),n(R,{key:0,size:"small",type:"success",onClick:b.onClassClick,effect:"dark",class:"tag"},{default:c((()=>[f("Class ")])),_:1},8,["onClick"])):y("",!0)])),_:1}),u(_,{name:"el-zoom-in-center"},{default:c((()=>[-1==b.attributeKeys.indexOf("@click")?(i(),n(R,{key:0,size:"small",type:"success",onClick:b.onEventClick,effect:"dark",class:"tag"},{default:c((()=>[f("点击事件")])),_:1},8,["onClick"])):y("",!0)])),_:1}),u(_,{name:"el-zoom-in-center"},{default:c((()=>[b.attributeKeys.includes("__text__")?y("",!0):(i(),n(R,{key:0,size:"small",type:"success",onClick:b.onTextClick,effect:"dark",class:"tag"},{default:c((()=>[f("文本内容")])),_:1},8,["onClick"]))])),_:1})])])])],512),[[k,!e.editMode]]),d(r("div",D,[u(x,{type:"textarea",autosize:{minRows:4},placeholder:"请输入属性, 以key: value的形式(冒号后要有空格)",modelValue:e.textAttributes,"onUpdate:modelValue":t[1]||(t[1]=t=>e.textAttributes=t)},null,8,["modelValue"])],512),[[k,e.editMode]])]),r("div",S,[u(O,{class:"item",effect:"dark",content:"新增属性 ctrl+a",placement:"bottom"},{default:c((()=>[u(j,{type:"primary",class:"center",onClick:b.createNew,circle:""},{default:c((()=>[u(M,null,{default:c((()=>[u(N)])),_:1})])),_:1},8,["onClick"])])),_:1}),u(O,{class:"item",effect:"dark",content:"保存属性 ctrl+s",placement:"bottom"},{default:c((()=>[u(j,{type:"success",class:"center",onClick:b.save,circle:""},{default:c((()=>[u(M,null,{default:c((()=>[u(U)])),_:1})])),_:1},8,["onClick"])])),_:1}),l.enableRemoveButton?(i(),n(O,{key:0,class:"item",effect:"dark",content:"移除该组件 ctrl+d",placement:"bottom"},{default:c((()=>[u(j,{type:"danger",class:"center",onClick:b.remove,circle:""},{default:c((()=>[u(M,null,{default:c((()=>[u($)])),_:1})])),_:1},8,["onClick"])])),_:1})):y("",!0),b.enableBroButton?(i(),n(O,{key:1,class:"item",effect:"dark",content:"复制一个兄弟组件 ctrl+c",placement:"bottom"},{default:c((()=>[u(j,{type:"primary",class:"center",onClick:b.copyBro,circle:""},{default:c((()=>[u(M,null,{default:c((()=>[u(E)])),_:1})])),_:1},8,["onClick"])])),_:1})):y("",!0),z])])),_:1})}],["__scopeId","data-v-954969e7"]]);export{M as default};