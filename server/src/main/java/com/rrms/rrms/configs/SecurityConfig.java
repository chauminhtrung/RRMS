package com.rrms.rrms.configs;

import com.rrms.rrms.services.servicesImp.JwtAuthen;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(
            auth -> auth.requestMatchers("/order/**")
                .authenticated() // Protect /order/** endpoints
                .requestMatchers("/manager/**")
                .hasAnyRole("STAF", "DIRE") // Only allow STAFF or DIRECTOR roles
                .requestMatchers("/rest/authorities")
                .hasRole("DIRE") // Only allow DIRECTOR role
                .requestMatchers("/api-accounts/register") // Permit register endpoint
                .permitAll() // Allow access to public registration
                .anyRequest()
                .permitAll() // Allow all other requests
        )
        .formLogin(form -> form.loginPage("/login")
            .loginProcessingUrl("/form/login")
            .defaultSuccessUrl("/home", true)
            .failureUrl("/security/login/error")
            .usernameParameter("username")
            .passwordParameter("password"))
        .logout(logout -> logout.logoutSuccessUrl("/home").logoutUrl("/security/logoff"))
        .exceptionHandling(
            exception -> exception
                .authenticationEntryPoint(new JwtAuthen()) // Custom authentication entry point
                .accessDeniedPage("/error/access-denied") // Access denied page
        )
        .csrf(csrf -> csrf.disable()); // Disable CSRF for API endpoints

    return http.build();
  }
}