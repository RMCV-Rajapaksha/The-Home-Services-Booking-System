package com.chamara.The.Home.Services.Booking.System;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TheHomeServicesBookingSystemApplication {

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info().title("The Home Services Booking System API")
						.version("1.0")
						.description("API documentation for The Home Services Booking System"));
	}

	public static void main(String[] args) {
		SpringApplication.run(TheHomeServicesBookingSystemApplication.class, args);
	}
}