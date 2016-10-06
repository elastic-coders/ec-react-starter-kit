export default data => `<!doctype html>
<html>
  <head>
    <title>Sample App</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
  </head>
  <body>
    <div id='root'>
    </div>
    <script>
    var SERVER_CONFIG = ${JSON.stringify(data.configuration)};
    </script>
    <script src="/${data.version}/vendors.js"></script>
    <script src="/${data.version}/client.js"></script>
  </body>
</html>
`;
