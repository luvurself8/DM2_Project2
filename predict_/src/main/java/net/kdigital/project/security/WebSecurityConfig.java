package net.kdigital.project.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration   //설정 정보 class임을 알려주는 어노테이션 
public class WebSecurityConfig {

		@Autowired
		private DataSource dataSource; 
	
		@Bean
		public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {  
		
			
			http.csrf().disable()
			.authorizeRequests()
			.antMatchers("/", 
					"/member/signup",
					"/member/idCheck",
					"/images/**", 
					"/css/**",
					"/script/**",
					"/fonts/**").permitAll()  
			.anyRequest().authenticated()  
			.and()
			.formLogin()  
			.loginPage("/member/signin").permitAll()  
			.usernameParameter("memberid") 
			.passwordParameter("memberpwd")
			.and() 
			.logout()
			.logoutUrl("/member/signout")
			.logoutSuccessUrl("/").permitAll()
			.and()
			.cors()
			.and()
			.httpBasic(); 
			
			return http.build();
		}
		
	
		@Autowired
		public void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.jdbcAuthentication()
			.dataSource(dataSource)
			//인증(로그인)_enabled
			.usersByUsernameQuery(
					"SELECT memberid as username, memberpwd as password, enabled "
					+ "FROM members WHERE memberid = ?")
			// 권한 _Rolename
			.authoritiesByUsernameQuery(
					"SELECT memberid as username, rolename as role_name "
					+ "FROM members WHERE memberid = ?");
		}
		
		
		@Bean 
		public PasswordEncoder passwordEncoder() {
			return PasswordEncoderFactories.createDelegatingPasswordEncoder();
		}
} 
