import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
    },
  },
  driver: 'redis',
} as ICacheConfig;
