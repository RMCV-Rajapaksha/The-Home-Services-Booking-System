package com.chamara.The.Home.Services.Booking.System.controller;


import com.chamara.The.Home.Services.Booking.System.model.Post;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

@RestController
public class PostController {

    @ApiIgnore
@RequestMapping("/post")
public void redirec(HttpServletResponse response) throws IOException {

    response.sendRedirect("/swagger-ui.html");

}

public List<Post>



}
