import 'reflect-metadata';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import AppRouter from '../../../AppRouter';
import { MetadataKeys } from '../MetadataKeys';
import { Methods } from '../Methods';

/**
 * Decorator function that attaches
 * @param baseRoute The base route for each controller function
 */
export function controller(baseRoute: string) {
  return function(target: Function): void {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path: string = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = validateRequestBody(requiredBodyProps);

      if (path) {
        router[method](
          `${baseRoute}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}

/**
 * Validates that a given group of keys are included on the body request object
 *
 * @param keys The keys to validate that are received in the body
 */
function validateRequestBody(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request: Got 0 arguments');
      return;
    }

    console.log('body: ', req.body);
    console.log('validate: ', keys);
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Invalid request: Missing argument ${key}`);
        return;
      }
    }

    next();
  };
}
