// IS USER IN PROJECT
const user = UserProject.findOneUserOfProject(userId);
if (user.length == 0) {
   return errorHandler({err: 'Not authorized', req, res, status: 401});
}

// IS USER MANAGER OF PROJECT
const project = await Project.findById(projectId);
if (project[0].manager_id != req.user.id) {
   return errorHandler({err: 'Not authorized', req, res, status: 401});
}