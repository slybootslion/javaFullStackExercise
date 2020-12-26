package com.slybootslion.missyou.api.v1;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BannerController {

    @GetMapping("/test")
    @ResponseBody
    public String test() {
        return "hello java";
    }
}
