package com.chamara.The.Home.Services.Booking.System;

import com.chamara.The.Home.Services.Booking.System.controller.UserController;
import com.chamara.The.Home.Services.Booking.System.model.LoginResponse;
import com.chamara.The.Home.Services.Booking.System.model.User;
import com.chamara.The.Home.Services.Booking.System.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class UserControllerTests {

    private final UserService service = Mockito.mock(UserService.class);
    private final UserController controller = new UserController(service);

    @Test
    void testRegister() {
        User user = new User();
        when(service.userExists(anyString())).thenReturn(false);
        when(service.register(any(User.class))).thenReturn(user);

        ResponseEntity<String> response = controller.register(user);
        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    void testUpdateUser() {
        User user = new User();
        when(service.userExists(anyString())).thenReturn(true);
        when(service.updateUser(any(User.class))).thenReturn(user);

        ResponseEntity<String> response = controller.updateUser(user);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testLogin() {
        User user = new User();
        when(service.verify(any(User.class))).thenReturn("token");

        ResponseEntity<LoginResponse> response = controller.login(user);
        assertEquals(200, response.getStatusCodeValue());
    }
}