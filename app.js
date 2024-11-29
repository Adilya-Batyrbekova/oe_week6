export default (express, bodyParser, createReadStream, crypto, http) => {
  const app = express();
  app.use(bodyParser.json());

  // Настройка заголовков
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
      next();
  });

  // /login/
  app.get('/login/', (req, res) => {
      res.send('adilja2001batyrbekova'); // Замени на свой логин
  });

  // /code/
  app.get('/code/', (req, res) => {
      const filePath = import.meta.url.substring(7);
      res.setHeader('Content-Type', 'text/plain');
      createReadStream(filePath).pipe(res);
  });

  // /sha1/:input/
  app.get('/sha1/:input/', (req, res) => {
      const hash = crypto.createHash('sha1').update(req.params.input).digest('hex');
      res.send(hash);
  });

  // /req/
  app.all('/req/', async (req, res) => {
      const addr = req.query.addr || req.body.addr;
      if (!addr) {
          res.status(400).send('Bad Request');
          return;
      }
      http.get(addr, (response) => {
          let data = '';
          response.on('data', (chunk) => (data += chunk));
          response.on('end', () => res.send(data));
      }).on('error', (err) => res.status(500).send(err.message));
  });

  // Отлов остальных маршрутов
  app.all('*', (req, res) => {
      res.send('adilja2001batyrbekova'); // Замени на свой логин
  });

  return app;
};
