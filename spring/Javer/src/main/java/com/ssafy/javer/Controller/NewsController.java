package com.ssafy.javer.Controller;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.javer.DTO.News_dto;
import com.ssafy.javer.Service.NewsService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins= {"*"}, maxAge=6000)
@RestController
@RequestMapping("/api")
public class NewsController {
	public static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@Autowired
	NewsService nser;
	
	@GetMapping("news")
	@ApiOperation(value="뉴스 조회 서비스", response=List.class)
	public ResponseEntity<Map<String, Object>> newsList(){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		try {
			List<News_dto> nlist = nser.SelectListNews();
			// 뉴스 6개만 던져줌
			List<News_dto> senddata = new LinkedList<News_dto>();
			
			News_dto ndto;
			String resizeImg;
			
			for(int i=0; i<8; i++) {
				ndto = nlist.get(i);
				resizeImg = ndto.getImg();
				
				resizeImg = resizeImg.substring(0, resizeImg.lastIndexOf(".jpg")+4);
				ndto.setImg(resizeImg);
				senddata.add(ndto);
			}
			
			msg.put("resmsg", "succ");
			msg.put("resdata", senddata);
			System.out.println(nlist.toString());
//			msg.put("resdata", nlist);
		} catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			msg.put("resdata", -1);
			System.out.println("DB출력실패");
		}
		resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		return resEntity;
	}
}
