package com.openclassrooms.mddapi.share.security.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.UUID;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {


    @Value("${rsa.app.private.key}")
    String privateKeyPath;

    @Value("${rsa.app.public.key}")
    String publicKeyPath;

    private static final String PRIVATE_KEY = "PRIVATE";
    private static final String PUBLIC_KEY = "PUBLIC";

    private final static String[] publicEndPoints = {
            "/auth/login",
            "/auth/register"
    };

    /**
     * Configures the security filter chain with stateless sessions, public
     * endpoints, and JWT authentication.
     *
     * @param http HttpSecurity
     * @return HttpSecurity
     */
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(publicEndPoints).permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
                .build();
    }

    private String readRsaKeyFromPath(String filename) throws IOException {
        return Files.readString(Paths.get(filename));
    }

    /**
     * Bean that loads and returns an RSA public key from a specified file.
     * This method reads a file containing a public key in PEM format,
     * Then decodes the key from its Base64 format.
     * It then creates an instance of RSAPublicKey using the decoded data and key
     * specification.
     *
     * @return RSAPublicKey
     * @throws Exception
     */
    @Bean
    RSAPublicKey publicKey() throws Exception {

        String publicKeyContent = readRsaKeyFromPath(publicKeyPath);
        String publicKey = this.getSanitizeRsaKey(publicKeyContent, PUBLIC_KEY);

        byte[] encoded = Base64.getDecoder().decode(publicKey);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(encoded);

        return (RSAPublicKey) keyFactory.generatePublic(keySpec);
    }

    /**
     * Bean that loads and returns an RSA private key from a specified file.
     * This method reads a file containing a private key in PEM format
     * Then decodes the key from its Base64 format.
     * It then creates an instance of RSAPrivateKey using the decoded data and key
     * specification.
     *
     * @return RSAPrivateKey
     * @throws Exception
     */
    @Bean
    RSAPrivateKey privateKey() throws Exception {

        String privateKeyContent = readRsaKeyFromPath(privateKeyPath);
        String privateKey = this.getSanitizeRsaKey(privateKeyContent, PRIVATE_KEY);

        byte[] encoded = Base64.getDecoder().decode(privateKey);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);

        return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
    }

    /**
     * Sanitize the RSA key from header and footer
     *
     * @param key     String
     * @param typeKey String must be PRIVATE or PUBLIC, you must respect the upper
     *                case format
     * @return String
     */
    private String getSanitizeRsaKey(String key, String typeKey) {
        return key.replace(String.format("-----BEGIN %s KEY-----", typeKey), "")
                .replace(String.format("-----END %s KEY-----", typeKey), "")
                .replaceAll("\\s+", "");
    }

    @Bean
    JwtEncoder jwtEncoder(RSAPublicKey publicKey, RSAPrivateKey privateKey) {
        RSAKey rsaKey = new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID(UUID.randomUUID().toString())
                .build();

        JWKSet jwkSet = new JWKSet(rsaKey);
        return new NimbusJwtEncoder(new ImmutableJWKSet<>(jwkSet));
    }

    @Bean
    JwtDecoder jwtDecoder(RSAPublicKey publicKey) {
        return NimbusJwtDecoder.withPublicKey(publicKey)
                .signatureAlgorithm(SignatureAlgorithm.RS512).build();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}
