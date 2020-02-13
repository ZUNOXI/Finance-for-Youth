package com.ssafy.javer.Util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.google.common.base.Verify;
import com.ssafy.javer.DTO.Member;
import com.ssafy.javer.Repository.MemRepo;

import io.jsonwebtoken.Jwts;

@Component("HandlerInterceptor")
public class HandlerInterceptor extends HandlerInterceptorAdapter{
	
	@Autowired
	private MemRepo memrepo;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
//		String token = request.getHeader("token");
//		System.out.println(token);
		System.out.println(request.getHeader("token"));
		System.out.println(request.getHeaders("token"));
		System.out.println(request.getHeader("headers"));
//		Member member = memrepo.searchMem(request.getHeader("uid"));
//		Authorization 
		System.out.println("Handler 입니당~~~~~~~~~");
//		System.out.println(member);
//		System.out.println(Jwts.parser().setSigningKey("tmpkey").parseClaimsJws(token));
		
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
		System.out.println("after입니다. 클래스가 돌아가긴 하는군요?");
	}
}
