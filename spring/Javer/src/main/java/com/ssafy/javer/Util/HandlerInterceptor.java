package com.ssafy.javer.Util;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ssafy.javer.Repository.MemRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwts;


@Component("HandlerInterceptor")
public class HandlerInterceptor extends HandlerInterceptorAdapter{
	
	@Autowired
	private MemRepo memrepo;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		System.out.println("==Interceptor preHandler==");
		
		System.out.println(request.getHeader("token"));
		String token = request.getHeader("token");
		String key = "tmpKey";
		try {
			Claims claims = Jwts.parser()
					.setSigningKey(key.getBytes())
					.parseClaimsJws(token).getBody();
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return super.preHandle(request, response, handler);
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		super.afterCompletion(request, response, handler, ex);
		System.out.println(new Date(System.currentTimeMillis()));
		System.out.println("after입니다. 클래스가 돌아가긴 하는군요?");
	}
}
