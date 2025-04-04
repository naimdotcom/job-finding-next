// utils/cache.ts
import NodeCache from "node-cache";

// Create a cache instance with a default TTL of 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

export default cache;
