import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/Project.controller";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controllers/Task.controller";
import { validateProjectExists } from "../middlewares/project";

const router = Router();

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


/*/api/projects/id/tasks */
router.post('/:projectId/tasks', validateProjectExists, TaskController.createTask )

export default router;