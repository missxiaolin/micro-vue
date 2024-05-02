import _ from 'lodash'
import Project from '../../../controller/project'
import RouterConfigBuilder from '../../../library/utils/router_config_builder'

const projectController = new Project()

// 项目保存/修改
const projectSave = RouterConfigBuilder.routerConfigBuilder('/adm/project/save', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return projectController.save(req, res)
}, false)

// 项目列表
const projectList = RouterConfigBuilder.routerConfigBuilder('/adm/project/list', RouterConfigBuilder.METHOD_TYPE_POST, (req, res) => {
    return projectController.projectList(req, res)
}, false)


export default {
    ...projectSave,
    ...projectList
}