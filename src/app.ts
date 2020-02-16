import Express from 'express';
import bodyParser from 'body-parser';

// app routes
import AppRouter from './AppRouter';

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log(`App running on http://localhost:${3000}`);
});
