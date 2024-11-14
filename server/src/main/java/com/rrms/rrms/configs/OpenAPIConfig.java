package com.rrms.rrms.configs;

import java.util.List;

import io.swagger.v3.oas.models.parameters.Parameter;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfig implements WebMvcConfigurer {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("rrms")
                .packagesToScan("com.rrms.rrms")
                .build();
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .servers(List.of(new Server().url("https://decent-highly-bass.ngrok-free.app")))
                .info(new Info()
                        .title("RRMS API")
                        .description("API documents")
                        .version("1.3")
                        .license(new License()
                                .name("Room Rental Management System - RRMS")
                                .url("https://github.com/chauminhtrung/RRMS")))
                .components(new Components()
                        .addSecuritySchemes(
                                "bearerAuth",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .security(List.of(new SecurityRequirement().addList("bearerAuth")));
    }

    @Bean
    public OperationCustomizer customGlobalHeaders() {
        return (operation, handlerMethod) -> {
            operation.addParametersItem(new Parameter()
                    .in("header")
                    .name("Cache-Control")
                    .description("Control cache behavior")
                    .required(false)
                    .example("no-cache, no-store, max-age=0, must-revalidate"));

            operation.addParametersItem(new Parameter()
                    .in("header")
                    .name("Pragma")
                    .description("Cache control")
                    .required(false)
                    .example("no-cache"));

            operation.addParametersItem(new Parameter()
                    .in("header")
                    .name("Expires")
                    .description("Cache expiry")
                    .required(false)
                    .example("0"));

            return operation;
        };
    }
}
