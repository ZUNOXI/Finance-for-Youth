package com.ssafy.javer.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Autowired
	private HandlerInterceptor interceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// TODO Auto-generated method stub
		System.out.println("webmvcconfig입니다.......띠부레");
		registry.addInterceptor(interceptor)
//					.addPathPatterns("/*")
//			        .excludePathPatterns("/api")
			        .excludePathPatterns("/api/login") //로그인 쪽은 예외처리를 한다.
					.excludePathPatterns("/api/board") 
					.excludePathPatterns("/api/boarddetail/*"); 
	}

}
