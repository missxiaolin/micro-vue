var e=(e,t,l)=>new Promise(((a,o)=>{var s=e=>{try{r(l.next(e))}catch(t){o(t)}},i=e=>{try{r(l.throw(e))}catch(t){o(t)}},r=e=>e.done?a(e.value):Promise.resolve(e.value).then(s,i);r((l=l.apply(e,t)).next())}));import{r as t}from"./fetch-CxZ7T0Ig.js";import{_ as l,E as a,c as o,a as s,b as i,w as r,r as p,o as u,F as n,d,e as c,f as m}from"./index-alzQSFE_.js";const h={class:"vue-home-main"},b={class:"mu-search-container pall10"},v={class:"mu-search-form-button"},g={class:"mu-handle-content"};const f=l({data:()=>({dialogVisible:!1,popTitle:"创建项目",formSaveBtn:"保存",formDisbled:!1,popShowBottomBtn:!0,searchForm:{name:"",type:"",status:"",pageSize:10,page:1},statusOptions:[{value:"1",label:"禁用"},{value:"2",label:"启用"}],typeOptions:[{value:"1",label:"电脑端"},{value:"2",label:"移动端"}],columns:[{label:"项目名称",prop:"name"},{label:"三字码",prop:"code"},{label:"项目描述",prop:"desc"},{label:"项目类型",prop:"type_desc"},{label:"项目状态",prop:"status_desc"},{label:"创建时间",prop:"create_time"},{label:"修改时间",prop:"update_time"},{width:"180px",label:"操作",prop:"options",noEmptyValue:!0}],tableData:[],total:0,btnPopForm:[{key:"type",default:1,type:"radio",label:"项目类型",dataOptions:[{label:"pc",value:1},{label:"mobile",value:2}],placeholder:"请选择项目类型",value:"",rules:[{required:!0,message:"请选择项目类型"}]},{key:"code",default:"",type:"input",label:"三字码",data:"",placeholder:"请输入项目三字码",value:"",rules:[{required:!0,message:"请输入项目三字码",trigger:"blur"},{max:3,message:"请输入英文3个字符串",trigger:"blur"}]},{key:"name",default:"",type:"input",label:"项目名称",data:"",placeholder:"请输入项目名称",value:"",rules:[{required:!0,message:"请输入项目名称",trigger:"blur"}]},{key:"desc",default:"",type:"input",label:"项目描述",data:"",placeholder:"请输入项目描述",value:"",rules:[{required:!0,message:"请输入项目描述",trigger:"blur"}]},{key:"status",default:2,type:"radio",label:"是否禁用",dataOptions:[{label:"禁用",value:1},{label:"开启",value:2}],value:"",rules:[{required:!0,message:"请选择是否禁用"}]}],projectDetail:{}}),mounted(){this.getProjectList()},methods:{handleCurrentChange(e){this.searchForm.page=e,this.getProjectList()},resetForm(){this.searchForm={name:"",type:"",status:"",pageSize:10,page:1},this.getProjectList()},getProjectList(){return e(this,null,(function*(){let e=yield(l=this.searchForm,t({url:"/adm/project/list",method:"post",data:l}));var l;e.success&&(this.tableData=e.model.list,this.total=e.model.count)}))},popClick(e){this.dialogVisible=e,this.projectDetail={},this.popTitle="创建项目",this.formSaveBtn="保存",this.formDisbled=!1},edit(e){this.projectDetail=e,this.dialogVisible=!0,this.popTitle="修改项目",this.formSaveBtn="修改",this.popShowBottomBtn=!0},detail(e){this.projectDetail=e,this.dialogVisible=!0,this.popTitle="项目详情",this.formDisbled=!0,this.formSaveBtn="修改",this.popShowBottomBtn=!1},popSuccess(l){return e(this,null,(function*(){var e;this.projectDetail&&(l.id=this.projectDetail&&this.projectDetail.id?this.projectDetail.id:""),(yield(e=l,t({url:"/adm/project/save",method:"post",data:e}))).success&&(a({message:l.id?"修改成功":"添加成功",type:"success"}),this.projectDetail={},this.popTitle="创建项目",this.formSaveBtn="保存",this.dialogVisible=!1,this.getProjectList())}))},goRoutePage(e){this.$router.push({path:"/vcc/index",query:{projectId:e.id}})}}},[["render",function(e,t,l,a,f,y){const k=p("el-input"),C=p("search-label"),_=p("el-col"),j=p("el-option"),D=p("el-select"),S=p("el-row"),F=p("el-button"),V=p("l-pop"),w=p("l-table");return u(),o("div",h,[s("div",b,[i(S,null,{default:r((()=>[i(_,{span:8},{default:r((()=>[i(C,{labelName:"项目名称"},{default:r((()=>[i(k,{modelValue:f.searchForm.name,"onUpdate:modelValue":t[0]||(t[0]=e=>f.searchForm.name=e),placeholder:"请输入项目名称"},null,8,["modelValue"])])),_:1})])),_:1}),i(_,{span:8},{default:r((()=>[i(C,{labelName:"分类"},{default:r((()=>[i(D,{modelValue:f.searchForm.type,"onUpdate:modelValue":t[1]||(t[1]=e=>f.searchForm.type=e),placeholder:"请选择分类"},{default:r((()=>[(u(!0),o(n,null,d(f.typeOptions,(e=>(u(),m(j,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),i(_,{span:8},{default:r((()=>[i(C,{labelName:"状态"},{default:r((()=>[i(D,{modelValue:f.searchForm.status,"onUpdate:modelValue":t[2]||(t[2]=e=>f.searchForm.status=e),placeholder:"请选择分类"},{default:r((()=>[(u(!0),o(n,null,d(f.statusOptions,(e=>(u(),m(j,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1}),s("div",v,[i(F,{onClick:y.resetForm},{default:r((()=>[c("重置")])),_:1},8,["onClick"]),i(F,{type:"primary",onClick:y.getProjectList},{default:r((()=>[c("查询")])),_:1},8,["onClick"])])]),s("div",g,[i(V,{"btn-text":"创建项目",detail:f.projectDetail,title:f.popTitle,disabled:f.formDisbled,"form-save-btn":f.formSaveBtn,"dialog-visible":f.dialogVisible,"btn-pop-form":f.btnPopForm,"is-show-bottom-btn":f.popShowBottomBtn,onPopClick:y.popClick,onSuccess:y.popSuccess},null,8,["detail","title","disabled","form-save-btn","dialog-visible","btn-pop-form","is-show-bottom-btn","onPopClick","onSuccess"])]),i(w,{data:f.tableData,columns:f.columns,"page-size":f.searchForm.pageSize,total:f.total,onHandleCurrentChange:y.handleCurrentChange},{options:r((e=>[i(F,{link:"",type:"primary",size:"small",onClick:t=>y.edit(e.row)},{default:r((()=>[c("修改")])),_:2},1032,["onClick"]),i(F,{link:"",type:"primary",size:"small",onClick:t=>y.detail(e.row)},{default:r((()=>[c("详情")])),_:2},1032,["onClick"]),i(F,{link:"",type:"primary",size:"small",onClick:t=>y.goRoutePage(e.row)},{default:r((()=>[c("路由列表")])),_:2},1032,["onClick"])])),_:1},8,["data","columns","page-size","total","onHandleCurrentChange"])])}],["__scopeId","data-v-2b9173ab"]]);export{f as default};