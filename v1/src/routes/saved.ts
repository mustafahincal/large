import express from 'express';
const router = express.Router();
import savedController from '../controllers/Saved';
import { errorCatcher } from '../utils/errorCatcher';

router.route('/').get(errorCatcher(savedController.index));
router
  .route('/save')
  .post(errorCatcher(savedController.save))
  .delete(errorCatcher(savedController.unsave));

router.route('/:userId').get(errorCatcher(savedController.getByUser));

export default router;
