import { Router } from 'express';

export default class AppRouter {
  /**
   * Router instance
   */
  private static instance: Router;

  /**
   * Returns the current AppRouter instance
   */
  public static getInstance = (): Router => {
    if (!AppRouter.instance) {
      AppRouter.instance = Router();
    }

    return AppRouter.instance;
  };
}
