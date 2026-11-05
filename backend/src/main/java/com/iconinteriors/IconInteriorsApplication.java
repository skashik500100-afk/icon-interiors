package com.iconinteriors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IconInteriorsApplication {

    public static void main(String[] args) {
        SpringApplication.run(IconInteriorsApplication.class, args);
        System.out.println("==================================================");
        System.out.println("  ✦ ICON INTERIORS BACKEND & DATABASE RUNNING ✦   ");
        System.out.println("  Port: 8080 | Context Path: /                    ");
        System.out.println("  Flagship Studio: Syamala Nagar, Guntur, AP      ");
        System.out.println("==================================================");
    }
}

