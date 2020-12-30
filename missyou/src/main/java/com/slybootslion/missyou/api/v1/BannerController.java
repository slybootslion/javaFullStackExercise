package com.slybootslion.missyou.api.v1;

import com.slybootslion.missyou.exception.http.ForbiddenException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/banner")
public class BannerController {

    @GetMapping("/test")
    public String test() throws Exception {
        throw new ForbiddenException(10001);
//        throw new RuntimeException("error msg");
//        return "Hello, spring boot";
    }
}
