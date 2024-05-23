function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["static/js/vcc-BO4Wzkve.js","static/js/index-DZ9k51ZZ.js","static/css/index-C13myhDW.css","static/js/postcss-Cz0Oouzh.js","static/css/vcc-BiXzbqSa.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
var e=(e,t,o)=>new Promise(((s,r)=>{var i=e=>{try{n(o.next(e))}catch(t){r(t)}},a=e=>{try{n(o.throw(e))}catch(t){r(t)}},n=e=>e.done?s(e.value):Promise.resolve(e.value).then(i,a);n((o=o.apply(e,t)).next())}));import{_ as t,g as o,r as s,o as r,c as i,a,b as n,w as d,h as c,f as u,e as l,i as m,p as h,j as p}from"./index-DZ9k51ZZ.js";import{b as f,c as y}from"./page-CmzoqUwG.js";import{b as _}from"./project-DwIe-mVF.js";import"./fetch-DczUQKTY.js";const v='{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%;","lc_id":"container","__children":[]}}]}}',j="\n{\n  data() {\n    return {\n    };\n  },\n  methods: {\n  },\n}\n";function b(e,t,o){""===t?o(new Error("请输入路由路径")):/^\//.test(t)?o():o(new Error("路由路径必须/开头"))}const I={components:{vcc:o((()=>m((()=>import("./vcc-BO4Wzkve.js").then((e=>e.v))),__vite__mapDeps([0,1,2,3,4]))))},data:()=>({isShowBaseForm:!1,rules:{route_name:[{required:!0,message:"请输入路由名称",trigger:"blur"}],path:[{required:!0,message:"请输入路由路径",trigger:"blur"},{validator:b,trigger:"blur"}]},codeInfoEntity:{codeStructure:"",JSCode:"",mode:1,css:""},isShowVcc:!1,formData:{id:0,project_id:0,route_name:"",path:"",tem_json:"",css:"",script_json:""}}),mounted(){this.formData.project_id=this.$route.query.projectId||"",this.init()},methods:{init(){return e(this,null,(function*(){if(!this.formData.project_id)return void this.$message.error({message:"项目id不能为空",duration:2e3,onClose:()=>{this.$router.push({path:"/bba/list"})}});let e=yield _({id:this.formData.project_id});if(!e.success||0==e.model.length)return setTimeout((()=>{this.$router.push({path:"/vcc/index",query:{projectId:this.$route.query.projectId}})}),2e3),!1;if(this.codeInfoEntity.mode=e.model.type,this.$route.query.id&&0!=this.$route.query.id){let e=yield f({id:this.$route.query.id,projectId:this.$route.query.projectId});if(!e.success||0==e.model.length)return setTimeout((()=>{this.$router.push({path:"/vcc/index",query:{projectId:this.$route.query.projectId}})}),2e3),!1;this.formData=e.model,this.codeInfoEntity.codeStructure=JSON.parse(e.model.tem_json),this.codeInfoEntity.JSCode=e.model.script_json,this.codeInfoEntity.css=e.model.css}else this.codeInfoEntity.codeStructure=JSON.parse(v),this.codeInfoEntity.JSCode=j,his.codeInfoEntity.css="",this.formData.tem_json=v,this.formData.script_json=j;this.isShowBaseForm=!0}))},onCodeUpdate({codeRawVueInfo:e,JSCode:t,css:o}){this.formData.tem_json=JSON.stringify(e),this.formData.script_json=t,this.formData.css=o},onLoadFinish(){},submitForm(t){return e(this,null,(function*(){const e=this.$refs[t];e&&(yield e.validate(((e,t)=>{e&&(this.isShowVcc=!0,this.isShowBaseForm=!1)})))}))},goVccIndex(){this.$router.push({path:"/vcc/index",query:{projectId:this.formData.project_id}},1e3)},save(t){return e(this,null,(function*(){let e=this.formData;e.page_html=t,(yield y(e)).success&&(this.$message({message:"保存成功",type:"success"}),setTimeout((()=>{this.$router.push({path:"/vcc/index",query:{projectId:this.formData.project_id}},1e3)}),2e3))}))}}},g={class:"vcc-detaiil-box"},D={key:0,class:"vcc-base-box"},S=(e=>(h("data-v-04c77c17"),e=e(),p(),e))((()=>a("div",{class:"vcc-body-header"},"基础信息",-1))),E={class:"vcc-body-content"},$={class:"form-bottom-box"};const w=t(I,[["render",function(e,t,o,m,h,p){const f=s("el-input"),y=s("el-form-item"),_=s("el-button"),v=s("el-form"),j=s("vcc");return r(),i("div",g,[h.isShowBaseForm?(r(),i("div",D,[S,a("div",E,[n(v,{ref:"ruleFormRef",model:h.formData,rules:h.rules,"label-width":"auto"},{default:d((()=>[n(y,{label:"路由名称",prop:"route_name"},{default:d((()=>[n(f,{modelValue:h.formData.route_name,"onUpdate:modelValue":t[0]||(t[0]=e=>h.formData.route_name=e)},null,8,["modelValue"])])),_:1}),n(y,{label:"路由路径",prop:"path"},{default:d((()=>[n(f,{disabled:!!h.formData.id,modelValue:h.formData.path,"onUpdate:modelValue":t[1]||(t[1]=e=>h.formData.path=e)},null,8,["disabled","modelValue"])])),_:1}),n(y,null,{default:d((()=>[a("div",$,[n(_,{onClick:p.goVccIndex},{default:d((()=>[l("取消")])),_:1},8,["onClick"]),n(_,{type:"primary",onClick:t[2]||(t[2]=e=>p.submitForm("ruleFormRef"))},{default:d((()=>[l(" 保存 ")])),_:1})])])),_:1})])),_:1},8,["model","rules"])])])):c("",!0),h.isShowVcc?(r(),u(j,{key:1,initCodeEntity:h.codeInfoEntity,onUpdateCodeEntity:p.onCodeUpdate,onOnLoadFinish:p.onLoadFinish,onSave:p.save},null,8,["initCodeEntity","onUpdateCodeEntity","onOnLoadFinish","onSave"])):c("",!0)])}],["__scopeId","data-v-04c77c17"]]);export{w as default};
