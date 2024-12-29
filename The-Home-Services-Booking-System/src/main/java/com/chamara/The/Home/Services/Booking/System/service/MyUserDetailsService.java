package com.chamara.The.Home.Services.Booking.System.service;

import com.chamara.The.Home.Services.Booking.System.model.User;
import com.chamara.The.Home.Services.Booking.System.model.UserPrincipal;
import com.chamara.The.Home.Services.Booking.System.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

   @Autowired
   private UserRepository repo;

    @Override
    public  UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        User user = repo.findByUsername(username);

        if(user == null){

            System.out.println("User Not Found");
            throw new UsernameNotFoundException("user not found");
        }
        return new UserPrincipal(user);
    }

}
