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

import com.ssafy.javer.DTO.Stock_dto;
import com.ssafy.javer.Service.StockService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins= {"*"}, maxAge=6000)
@RestController
@RequestMapping("/api")
public class StockController {
	public static final Logger logger = LoggerFactory.getLogger(BoardController.class);
	
	@Autowired
	StockService sser;
	
	@GetMapping("stock")
	@ApiOperation(value="주식 조회 서비스", response=List.class)
	public ResponseEntity<Map<String, Object>> newsList(){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		try {
			List<Stock_dto> nlist = sser.SelectListStock();
			// 뉴스 6개만 던져줌
			List<Stock_dto> senddata = new LinkedList<Stock_dto>();
			
			Stock_dto sdto;
			String resizeImg;
			
//			for(int i=0; i<8; i++) {
//				sdto = nlist.get(i);
////				resizeImg = sdto.getImg();
//				
//				resizeImg = resizeImg.substring(0, resizeImg.lastIndexOf(".jpg")+4);
////				ndto.setImg(resizeImg);
////				senddata.add(ndto);
//			}
			
			msg.put("resmsg", "succ");
//			msg.put("resdata", senddata);
			msg.put("resdata", nlist);
		} catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			msg.put("resdata", -1);
		}
		resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		return resEntity;
	}
}
