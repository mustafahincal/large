import express from 'express';
const router = express.Router();
import commentsController from '../controllers/Comments';
import { errorCatcher } from '../utils/errorCatcher';

router
  .route('/')
  .get(errorCatcher(commentsController.index))
  .post(errorCatcher(commentsController.add));
router
  .route('/:id')
  .get(errorCatcher(commentsController.getById))
  .delete(errorCatcher(commentsController.remove))
  .patch(errorCatcher(commentsController.patch));
router.route('/blog/:blogId').get(errorCatcher(commentsController.getByBlog));

export default router;
