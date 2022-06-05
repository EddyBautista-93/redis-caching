const express = require('express');
const redis = require('redis');
const util = require('util');

const redisConnectionUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisConnectionUrl);

client.set = util.promisify(client.set);
client.get = util.promisify(client.get);

const app = express();

const port = process.env.PORT || 6767;
const host = process.env.PORT || '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting data to redis
app.post('/set', async (req, res) => {
  const { redis_key, redis_value } = req.body;
  const response = await client.set(redis_key, redis_value);
  return res.status(200).json(response);
});

app.listen(port, host, () => {
  console.log(`Server is running on port ${host}:${port}`);
});