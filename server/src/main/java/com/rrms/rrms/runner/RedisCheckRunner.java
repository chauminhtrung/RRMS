package com.rrms.rrms.runner;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisCheckRunner implements CommandLineRunner {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @PostConstruct
    public void flushRedisData() {
        // Xóa tất cả dữ liệu trong Redis
        redisTemplate.getConnectionFactory().getConnection().flushAll();
    }

    @Override
    public void run(String... args) throws Exception {
        // Kiểm tra kết nối Redis
        String ping = redisTemplate.getConnectionFactory().getConnection().ping();
        System.out.println("Redis ping response: " + ping);
    }
}
