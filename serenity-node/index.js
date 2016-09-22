export default function(config) {
  if (!config.routes) {
    throw new Error('Serenity config had no property "routes". The routes should be a key value object of route:serenityDependencyFunc');
  }

  if (!config.services) {
    throw new Error('Serenity config had no property "services". Your root services file should be a function which registers dependencies with serenity');
  }

  console.log(config);

}
