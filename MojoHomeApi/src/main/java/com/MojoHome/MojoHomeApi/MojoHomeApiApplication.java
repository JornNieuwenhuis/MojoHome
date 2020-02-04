package com.MojoHome.MojoHomeApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages= {"com.MojoHome.MojoHomeApi"})
public class MojoHomeApiApplication {

	public static void main(final String[] args) {
		SpringApplication.run(MojoHomeApiApplication.class, args);
	}
}
