package com.rrms.rrms.configs;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RedisRateLimiter {
    @Autowired
    private StringRedisTemplate redisTemplate;
    //  ten request only one second
    private static final int LIMIT = 10;
    private static final int TIME_WINDOW = 1;

    public boolean isAllowed(String username) {
        String key = "rate:limit:" + username;
        Long currentCount = redisTemplate.opsForValue().increment(key);
        log.info("current count: {}", currentCount);
        if (currentCount == 1) {
            // set timeout one second
            redisTemplate.expire(key, Duration.ofSeconds(TIME_WINDOW));
        }
        return currentCount <= LIMIT;
    }
}
