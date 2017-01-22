export default function(di) {

  di.register(
    'handler.root',
    [],
    () => (req, res) => {
      console.log('hello, world');

      res.json({
        success: true
      });
    } 
  );

  di.register(
    'handler.test',
    [],
    () => (req, res) => {

      res.json({
        success: 'test'
      });
    } 
  );

};
