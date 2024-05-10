import{d as dedent}from"./dedent-CSHlQ-s0.js";import{c as codeEditor}from"./codeEditor--utVu26k.js";import{p as prettier,c as babel}from"./vcc-bhfZiTwX.js";import{_ as _export_sfc,r as resolveComponent,o as openBlock,f as createBlock,w as withCtx,b as createVNode,a as createBaseVNode,e as createTextVNode,c as createElementBlock,u as toDisplayString,h as createCommentVNode}from"./index-DdYoSHfV.js";import"./fetch-ReC3Xk0E.js";const example=dedent`
    /**
     *  以下代码中的方法会被注入到最终的代码中，如果命名与源代码有相同的，则会替换源代码
     *  内部集成了axios，开发者可以直接通过axios发起网络请求，不过接口需要允许跨域。
     *  可以通过https://apis.sahadev.tech/exchange?url=的方式访问实际地址可以解决跨域问题。
     *  axios官方文档：https://www.npmjs.com/package/axios
     */
    {
        data() {
          return {
  
          };
        },
        watch: {
  
        },
  
        computed: {
  
        },
  
        methods: {
          request(){
          }
        },
    };
        `,_sfc_main={props:["codeDialogVisible"],emits:["saveJSCode","update:codeDialogVisible"],components:{codeEditor:codeEditor},data:()=>({error:"",code:example,example:`${example}`}),beforeCreate(){},created(){},beforeMount(){},mounted(){},beforeUpdate(){},updated(){},destroyed(){},methods:{updateLogicCode(e){if(e){const o="const a = ";this.code=prettier.format(o+e,{plugins:[babel]}).replace(o,"")}},handleClose(){this.$emit("update:codeDialogVisible",!1)},onSave(){const code=this.$refs.codeEditor.getEditorCode(),temp=code.replace(new RegExp(".+\\*\\/\\s*","gs"),"").replace(/\s+/g,"");try{const JSCodeInfo=eval(`(function(){return ${temp}})()`);this.$emit("saveJSCode",{JSCodeInfo:JSCodeInfo,JSCode:temp}),this.handleClose(),this.error=""}catch(error){this.error=error}}},watch:{},computed:{dialogVisible:{get(){return this.codeDialogVisible},set(){this.$emit("update:codeDialogVisible",!1)}}},fillter:{}},_hoisted_1={style:{padding:"10px",display:"flex","justify-content":"flex-end","align-items":"center"}},_hoisted_2={key:0,style:{color:"red","font-size":"12px","margin-top":"5px"}};function _sfc_render(e,o,t,a,r,d){const i=resolveComponent("codeEditor"),s=resolveComponent("el-button"),c=resolveComponent("el-dialog");return openBlock(),createBlock(c,{title:"JS逻辑编辑",modelValue:d.dialogVisible,"onUpdate:modelValue":o[0]||(o[0]=e=>d.dialogVisible=e),width:"70%",top:"10vh","before-close":d.handleClose,center:!0},{default:withCtx((()=>[createVNode(i,{style:{"max-height":"65vh"},ref:"codeEditor",initCode:r.code,mode:"text/javascript"},null,8,["initCode"]),createBaseVNode("div",_hoisted_1,[createBaseVNode("div",null,[createVNode(s,{type:"primary",onClick:d.onSave},{default:withCtx((()=>[createTextVNode("确认修改")])),_:1},8,["onClick"]),r.error?(openBlock(),createElementBlock("div",_hoisted_2," 请检查语法错误："+toDisplayString(r.error),1)):createCommentVNode("",!0)])])])),_:1},8,["modelValue","before-close"])}const jSCodeEditorDialog=_export_sfc(_sfc_main,[["render",_sfc_render],["__scopeId","data-v-75125216"]]);export{jSCodeEditorDialog as default};
