package com.chamara.The.Home.Services.Booking.System;

import com.chamara.The.Home.Services.Booking.System.model.User;
import com.chamara.The.Home.Services.Booking.System.repo.UserRepository;
import com.chamara.The.Home.Services.Booking.System.service.JWTService;
import com.chamara.The.Home.Services.Booking.System.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class UserServiceTests {

    private final UserRepository repo = Mockito.mock(UserRepository.class);
    private final JWTService jwtService = Mockito.mock(JWTService.class);
    private final AuthenticationManager authManager = Mockito.mock(AuthenticationManager.class);
    private final UserService service = new UserService(repo, jwtService, authManager);

    @Test
    void testRegister() {
        User user = new User();
        when(repo.save(any(User.class))).thenReturn(user);

        User result = service.register(user);
        assertEquals(user, result);
    }

    @Test
    void testUserExists() {
        when(repo.findByUsername(anyString())).thenReturn(new User());

        boolean exists = service.userExists("username");
        assertEquals(true, exists);
    }

    @Test
    void testVerify() {
        User user = new User();
        Authentication authentication = Mockito.mock(Authentication.class);
        when(authManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(jwtService.generateToken(anyString())).thenReturn("token");

        String token = service.verify(user);
        assertEquals("token", token);
    }
}