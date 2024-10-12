package com.rrms.rrms.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Service
public class CacheChecked {

    @Autowired
    private CacheManager cacheManager;

    public boolean cacheHit(String key, String value) {
        Cache cache = cacheManager.getCache(value);
        if (cache != null) {
            Cache.ValueWrapper valueWrapper = cache.get(key);
            return valueWrapper != null;
        }
        return false;
    }
}
