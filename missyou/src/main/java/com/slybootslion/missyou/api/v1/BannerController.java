package com.slybootslion.missyou.api.v1;

import com.slybootslion.missyou.exception.http.ForbiddenException;
import com.slybootslion.missyou.service.BannerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/banner")
public class BannerController {

    @Autowired
    private BannerServiceImpl bannerService;

    @GetMapping("/name/{name}")
    public void getByName(@PathVariable @NotBlank String name) {

    }

    @GetMapping("/test")
    public String test() throws Exception {
        throw new ForbiddenException(10001);
//        throw new RuntimeException("error msg");
//        return "Hello, spring boot";
    }
}
