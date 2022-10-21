import Redis from 'ioredis';
import { promisify } from 'util';
import cacheConfig from '../cache/RedisCache';

export const userCacheKey = 'userCache';
export const subscriptionsCacheKey = 'subscriptionsKey';
export const ridesChacheKey = 'ridesCacheKey';

const redisClient = new Redis(cacheConfig.config.redis);

const getRedis = (value: string): Promise<string | undefined | null | []> => {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
};

const setRedis = (key: string, value: string) => {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
};

const clearCache = async () => {
  await redisClient.del('rides');
  return;
};
export { redisClient, getRedis, setRedis, clearCache };
