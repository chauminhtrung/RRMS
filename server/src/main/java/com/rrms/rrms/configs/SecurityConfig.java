package com.rrms.rrms.configs;

import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
// @EnableWebSecurity
public class SecurityConfig {


    //  @Bean
    //  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //    http
    //        .authorizeHttpRequests(authz -> authz
    //            .requestMatchers("/api/accounts/login").permitAll()
    //            .anyRequest().authenticated()
    //        )
    //        .csrf(csrf -> csrf.disable())
    //        .exceptionHandling(ex -> ex
    //            .authenticationEntryPoint((request, response, authException) -> {
    //              System.out.println("Access denied: " + authException.getMessage()); // Log thông báo lỗi
    //              response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
    //            })
    //        );
    //
    //    return http.build();
    //  }
    //
    //  @Bean(name = "securityPasswordEncoder")
    //  public PasswordEncoder passwordEncoder() {
    //    return new BCryptPasswordEncoder();
    //  }
    //
    //  @Bean
    //  public AuthenticationManager authManager(HttpSecurity http) throws Exception {
    //    AuthenticationManagerBuilder authenticationManagerBuilder =
    //        http.getSharedObject(AuthenticationManagerBuilder.class);
    //    authenticationManagerBuilder.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
    //    return authenticationManagerBuilder.build();
    //  }
    //
    //  @Bean
    //  public UserDetailsService userDetailsService() {
    //    return new InMemoryUserDetailsManager(); // Hoặc user details service của bạn
    //  }
}
