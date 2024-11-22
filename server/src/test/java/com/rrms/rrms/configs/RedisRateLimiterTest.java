package com.rrms.rrms.configs;

import static org.hibernate.validator.internal.util.Contracts.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.time.Duration;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@ExtendWith(MockitoExtension.class)
public class RedisRateLimiterTest {

    @InjectMocks
    private RedisRateLimiter redisRateLimiter;

    @Mock
    private StringRedisTemplate redisTemplate;

    @Mock
    private ValueOperations<String, String> valueOperations;

    private static final String USERNAME = "testUser";

    @BeforeEach
    public void setup() {
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    }

    @Test
    public void testIsAllowed_FirstRequest() {
        // Mock Redis increment trả về 1 cho lần request đầu tiên
        when(valueOperations.increment("rate:limit:" + USERNAME)).thenReturn(1L);

        // Gọi phương thức
        boolean isAllowed = redisRateLimiter.isAllowed(USERNAME);

        // Kiểm tra expire được set đúng
        verify(redisTemplate).expire(eq("rate:limit:" + USERNAME), eq(Duration.ofSeconds(10)));

        // Kiểm tra kết quả
        assertTrue(isAllowed, "First request should be allowed");
    }

    @Test
    public void testIsAllowed_RequestUnderLimit() {
        // Mock Redis increment trả về giá trị dưới LIMIT
        when(valueOperations.increment("rate:limit:" + USERNAME)).thenReturn(5L);

        // Gọi phương thức
        boolean isAllowed = redisRateLimiter.isAllowed(USERNAME);

        // Kiểm tra kết quả
        assertTrue(isAllowed, "Request under limit should be allowed");
    }

    @Test
    public void testIsAllowed_RequestOverLimit() {
        // Mock Redis increment trả về giá trị vượt LIMIT
        when(valueOperations.increment("rate:limit:" + USERNAME)).thenReturn(15L);

        // Gọi phương thức
        boolean isAllowed = redisRateLimiter.isAllowed(USERNAME);

        // Kiểm tra kết quả
        assertFalse(isAllowed, "Request over limit should not be allowed");
    }

    @Test
    public void testIsAllowed_ExpireNotSetForSubsequentRequests() {
        // Mock Redis increment trả về giá trị lớn hơn 1
        when(valueOperations.increment("rate:limit:" + USERNAME)).thenReturn(5L);

        // Gọi phương thức
        redisRateLimiter.isAllowed(USERNAME);

        // Kiểm tra rằng expire không được gọi (chỉ set ở lần đầu tiên)
        verify(redisTemplate, never()).expire(eq("rate:limit:" + USERNAME), any());
    }
}
