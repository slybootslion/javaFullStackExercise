package com.lin.missyou.api.v1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/banner")
public class BannerController {

    @GetMapping("/test")
    public String test() {
        return "hello, Spring Boot! this is a test api!";
    }

    @PostMapping("/test")
    public String testpost() {
        return "this is a post response rest api";
    }
}
