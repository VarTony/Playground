import express from 'express';
import { 
  saveClient,
  getClientByPhone,
  getClientById,
  getCardByUserUid
} from './service/request_handlers.mjs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
let busyLevel = 0;
const writableMethods = ['POST', 'PATCH', 'PUT'];


const clearBusyLvl = () => setInterval(() => { busyLevel = 0 }, 1000);
clearBusyLvl();

const createRouteHandler = async (
    req,
    res,
    cb = undefined
    ) => {
    console.log(`busyLevel: ${ busyLevel }`);
    const data = writableMethods.includes(req.method.toUpperCase()) 
      ? req.body
      : req.query

      console.log('DATA', data);

    if (busyLevel >= 100) {
      console.log('status: ', 429);
      res.status(429).send('Too Many Requests');
    } else {
      busyLevel++;
      try {
        let result;
        if(cb) result = await cb(data);
        res.status(200).send(result ?? 'Success');
      } catch(err) {
        console.error('=ERR=', err.message);
        res.status(400).send({ code: err.code, message: err.message });
      }
    }
};

app.get('/user-registration-allowed', (req, res) => {
  console.log('/user-registration-allowed');
  res.status(200).send('Success');
});


app.post('/user', async (req, res) => {
  console.log('POST: /user');
  try {
    await createRouteHandler(req, res, saveClient);
  } catch(err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.patch('/user', async (req, res) => {
  console.log('PATCH: /user');
  await createRouteHandler(req, res);
});

app.post('/subscribe/user', async (req, res) => {
  console.log('POST: subscribe/user');
  await createRouteHandler(req, res);
});

app.delete('/subscribe/user', async (req, res) => {
  console.log('DELETE: subscribe/user');
  await createRouteHandler(req, res);
});


app.post('/sms', async (req, res) => {
  console.log('POST: /sms', { sms: req.body });
  await createRouteHandler(req, res);
});

app.post('/email', async (req, res) => {
  console.log('POST: /email', { email: req.body });
  await createRouteHandler(req, res);
});


app.get('/user', async (req, res) => {
  console.log('GET: /user');
  await createRouteHandler(req, res, getClientById);
});


app.get('/card', async (req, res) => {
  console.log('GET: /card');
  await createRouteHandler(req, res, getCardByUserUid);
});

app.get('/*', (req, res) => {
  console.log('GET', '/*');
  return createRouteHandler(req, res);
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
