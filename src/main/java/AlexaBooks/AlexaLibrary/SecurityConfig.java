
package AlexaBooks.AlexaLibrary;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
                .cors(Customizer.withDefaults()) // Enable CORS with your WebConfig settings
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow OPTIONS requests without auth
                        .requestMatchers(HttpMethod.GET, "/api/clients/**").authenticated()
                        .requestMatchers("/api/**").authenticated() // Require auth for all other API requests
                        .anyRequest().permitAll() // Allow public access to non-API endpoints
                )
                .httpBasic(Customizer.withDefaults()) // Enable HTTP Basic Auth
                .build();
    }
}

