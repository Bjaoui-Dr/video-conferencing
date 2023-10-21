package com.security.spring;

import com.security.spring.entities.Role;
import com.security.spring.entities.User;
import com.security.spring.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User admin = userRepository.findByRole(Role.ADMIN);

		if (admin == null) {
			User user = new User();
			user.setEmail("admin@gmail.com");
			user.setPassword(new BCryptPasswordEncoder().encode("qwerty123"));
			user.setRole(Role.ADMIN);
			user.setLastName("admin");
			user.setFirstName("admin");
			userRepository.save(user);
		}
	}
}
