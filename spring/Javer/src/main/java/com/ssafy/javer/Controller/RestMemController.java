package com.ssafy.javer.Controller;

import java.text.SimpleDateFormat	;	
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.javer.DTO.Member;
import com.ssafy.javer.Service.MemService;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins= {"*"}, maxAge=6000)
@RestController
@RequestMapping("/api")
public class RestMemController {
	
	@Autowired
	@Qualifier("MemServiceImpl")
	MemService ser;
	
	//프로필 사진 올리기랑 내 생일값 날짜 형식 맞추기.
	@PostMapping("/addMem")
	@ApiOperation(value="회원가입 서비스")
	public ResponseEntity<Map<String, Object>> addMem(@RequestBody Member mem){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat ( "yyyy-MM-dd", Locale.KOREA );
		Date currentTime = new Date ();
		String date = mSimpleDateFormat.format ( currentTime );
		
		// 패스워드는 해싱하여 저장한다. (단방향)
		String encryptedPW = BCrypt.hashpw(mem.getUpw(), BCrypt.gensalt());
		
		System.out.println(mem);
		System.out.println(encryptedPW);
		try {
			ser.addMem(mem.getUid(), encryptedPW,mem.getUname(),mem.getUnickname(),mem.getUphonenum(),mem.getUemail(),
					mem.getUaddress(),mem.getUfavor_ctg(),mem.getUprofilephoto(),mem.getUbirth_date(),date,
					" ");
			msg.put("resmsg", "succ");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}catch(RuntimeException e) {
			e.printStackTrace();
			msg.put("resmsg", "fail");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}
		return resEntity;
	}
	
	@PostMapping("/updateMem")
	@ApiOperation(value="회원수정 서비스")
	public ResponseEntity<Map<String, Object>> updateMem(@RequestBody Member mem){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		
		try {
			
			ser.updateMem(mem.getUid(), mem.getUpw(),mem.getUname(),mem.getUnickname(),mem.getUphonenum(),mem.getUemail(),
					mem.getUaddress(),mem.getUfavor_ctg(),mem.getUprofilephoto(),mem.getUbirth_date(),mem.getUjoin_date(),
					"");
			msg.put("resmsg", "succ");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}
		return resEntity;
	}
	
	@PostMapping("/delMem")
	@ApiOperation(value="회원탈퇴 서비스")
	public ResponseEntity<Map<String, Object>> delMem(@RequestBody Member mem){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		try {
			ser.delMem(mem.getUid());
			msg.put("resmsg", "succ");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}
		return resEntity;
	}
	
	@PostMapping("/selMem")
	@ApiOperation(value="회원검색 서비스")
	public ResponseEntity<Map<String, Object>> selMem(@RequestBody Member mem){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		try {
			msg.put("resdata", ser.searchMem(mem.getUid()));
			msg.put("resmsg", "succ");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}catch(RuntimeException e) {
			msg.put("resdata", -1);
			msg.put("resmsg", "fail");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}
		return resEntity;
	}
	
	@PostMapping("/login")
	@ApiOperation(value="로그인 서비스")
	public ResponseEntity<Map<String, Object>> loginMem(@RequestBody Member mem){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		System.out.println(mem);
		Member dbmem = null;
		String token = null;
		try {
			dbmem = ser.searchMem(mem.getUid());
			System.out.println("dbmem은 >>" + dbmem);
			if(dbmem.getUpw().equals(mem.getUpw())) {
				System.out.println("=======토큰 생성========");
				// 토큰 발급
				token = ser.createToken(mem);
				msg.put("token", token);
				msg.put("resmsg", "succ");
				System.out.println(token);
			}
			else {
				System.out.println("일치하지 않아여 ㅎ");
				System.out.println(mem.getUpw());
				System.out.println(dbmem.getUpw());
				msg.put("resmsg", "fail");
			}
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}catch(RuntimeException e) {
			
			msg.put("resmsg", "fail");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}
		return resEntity;
	}
	
	
	@PostMapping("/findpw")
	@ApiOperation(value="비밀번호찾기 서비스")
	public ResponseEntity<Map<String, Object>> findPW(@RequestBody Member mem){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		try {
			
			msg.put("resmsg", "succ");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		}
		return resEntity;
	}
	
}
