import 'babel-polyfill';
import app from 'serenity-node';
import routes from './routes';
import services from './services';

const engine = app({
  routes,
  services
});

engine.listen(5000);
