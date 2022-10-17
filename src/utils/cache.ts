import IORedis from "ioredis";
import "dotenv/config";

const redis = new IORedis({
  host: process.env.REDIS_HOST,
  port: 6379,
});

export default redis;
