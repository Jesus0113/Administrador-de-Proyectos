import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/Project.controller";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controllers/Task.controller";
import { projectExists } from "../middlewares/project";
import { taskBelongsToProject, taskExists } from "../middlewares/task";
import { authenticate } from "../middlewares/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();
router.use(authenticate)

router.post('/', 
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion del proyecto es obligatorio'),
    handleInputErrors,
    ProjectController.createProject);

router.get('/', ProjectController.getAllProjects);

router.get('/:id',
param('id').isMongoId().withMessage('ID no valido') ,
handleInputErrors,
ProjectController.getProjectById);

router.put('/:id',
param('id').isMongoId().withMessage('ID no valido') ,
body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
body('description').notEmpty().withMessage('La descripcion del proyecto es obligatorio'),
handleInputErrors,
ProjectController.updateProject);

router.delete('/:id',
param('id').isMongoId().withMessage('ID no valido') ,
handleInputErrors,
ProjectController.deleteProject);


/** Routes for Tasks **/


/*en la url que tenga projectId se va a ejecutar validateProjectExists*/
router.param('projectId', projectExists)
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)


/*/api/projects/id/tasks */
router.post('/:projectId/tasks', 
// validateProjectExists,
body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
    handleInputErrors,
 TaskController.createTask );


 router.get('/:projectId/tasks',
//  validateProjectExists,
 TaskController.getProjectTask
 )

 router.get('/:projectId/tasks/:taskId',
//  validateProjectExists,
param('taskId').isMongoId().withMessage('ID no valido') ,
handleInputErrors,
 TaskController.getTaskById
 )


 router.put('/:projectId/tasks/:taskId',
 //  validateProjectExists,
 param('taskId').isMongoId().withMessage('ID no valido') ,
 body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
 body('description').notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
 handleInputErrors,
 TaskController.updateTask
  )


  router.delete('/:projectId/tasks/:taskId',
  param('taskId').isMongoId().withMessage('ID no valido') ,
  handleInputErrors,
   TaskController.deleteTask
   )

   router.post('/:projectId/tasks/:taskId/status',
   param('taskId').isMongoId().withMessage('ID no valido') ,
   body('status').notEmpty().withMessage(''),
   handleInputErrors,
   TaskController.updateStatus

   )

/*Routes for teams */
   router.post('/:projectId/team/find',
   body('email').isEmail().toLowerCase().withMessage('E-mail no valido'),
   handleInputErrors,
   TeamMemberController.findMemberByEmail
   )

   router.get('/:projectId/team', TeamMemberController.getProjectTeam)

   router.post('/:projectId/team',
   body('id').isMongoId().withMessage('Id No valido'),
   handleInputErrors,
   TeamMemberController.addMemberById
   )

   router.delete('/:projectId/team',
   body('id').isMongoId().withMessage('Id No valido'),
   handleInputErrors,
   TeamMemberController.removeMemberById
   )

export default router;