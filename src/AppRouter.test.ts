import { Router } from 'express';

import AppRouter from './AppRouter';

test('The getInstance method always returns the current instance of the ', () => {
  const myInstance: Router = AppRouter.getInstance();

  expect(myInstance).not.toBeNull();
  expect(typeof myInstance === 'function').toBeTruthy();
});
