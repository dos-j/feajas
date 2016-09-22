import 'babel-polyfill';
import app from '../serenity-node/index';
import routes from './routes';
import services from './services';

app({
  routes,
  services
});
