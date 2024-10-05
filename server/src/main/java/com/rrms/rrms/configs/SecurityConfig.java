// package com.rrms.rrms.configs;
//
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
//
// import com.rrms.rrms.servicesImp.JwtAuthenticationEntryPoint;
//
// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean(name = "securityFilterChain1")
//    public SecurityFilterChain securityFilterChain1(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests(
//                        auth -> auth.requestMatchers("/order/**")
//                                .authenticated() // Bảo vệ đường dẫn /order/**
//                                .requestMatchers("/manager/**")
//                                .hasAnyRole(
//                                        "STAF",
//                                        "DIRE") // Chỉ cho phép người dùng có vai trò STAFF hoặc DIRECTOR truy cập
//                                .requestMatchers("/rest/authorities")
//                                .hasRole("DIRE") // Chỉ cho phép người dùng có vai trò DIRECTOR truy cập
//                                .anyRequest()
//                                .permitAll() // Mọi yêu cầu khác đều được phép
//                        )
//                .oauth2Login(
//                        oauth2 -> oauth2.loginPage("/login") // Đặt trang đăng nhập
//                                .defaultSuccessUrl(
//                                        "/oauth2/login/success",
//                                        true) // Đặt URL chuyển hướng sau khi đăng nhập thành công
//                                .failureUrl("/security/login/error") // Đặt URL chuyển hướng sau khi thất bại
//                        )
//                .formLogin(form -> form.loginPage("/login")
//                        .loginProcessingUrl("/form/login")
//                        .defaultSuccessUrl("/home", true)
//                        .failureUrl("/security/login/error")
//                        .usernameParameter("username")
//                        .passwordParameter("password"))
//                .logout(logout -> logout.logoutSuccessUrl("/home").logoutUrl("/security/logoff"))
//                .exceptionHandling(
//                        exception -> exception
//                                .authenticationEntryPoint(
//                                        new JwtAuthenticationEntryPoint()) // Định nghĩa điểm vào xác thực
//                                .accessDeniedPage("/error/access-denied") // Đường dẫn cho trang truy cập bị từ chối
//                        )
//                .csrf(csrf -> csrf.disable()); // Vô hiệu hóa CSRF cho các yêu cầu API (nếu cần thiết)
//
//        return http.build();
//    }
// }
