package com.ssafy.javer.Controller;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.javer.DTO.Board_dto;
import com.ssafy.javer.DTO.Comment_dto;
import com.ssafy.javer.DTO.ReplyBoard_dto;
import com.ssafy.javer.DTO.ReplyComment_dto;
import com.ssafy.javer.Service.BoardService;
import com.ssafy.javer.Service.CommentService;
import com.ssafy.javer.Service.ReplyBoardService;
import com.ssafy.javer.Service.ReplyCommentService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins= {"*"}, maxAge=6000)
@RestController
@RequestMapping("/api")
public class BoardController {
	public static final Logger logger = LoggerFactory.getLogger(BoardController.class);

	@Autowired
	BoardService bser;
	
	@Autowired
	CommentService cser;
	
	@Autowired
	ReplyBoardService rbser;
	
	@Autowired
	ReplyCommentService rcser;

	@GetMapping("board")
	@ApiOperation(value="게시글 조회 서비스", response=List.class)
	public ResponseEntity<Map<String, Object>> boardList(){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		try {
			List<Board_dto> blist = bser.SelectListBoard();
			msg.put("resmsg", "succ");
			msg.put("resdata", blist);
		} catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			msg.put("resdata", -1);
		}
		resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);
		return resEntity;
	}

	@PostMapping("/boardreg")
	@ApiOperation(value="게시글 등록 서비스")
	public ResponseEntity<Map<String, Object>> boardReg(@RequestBody Board_dto board){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		System.out.println("===============");
		System.out.println(board);
		SimpleDateFormat mSimpleDateFormat = new SimpleDateFormat ( "yyyy.MM.dd HH:mm", Locale.KOREA );
		Date currentTime = new Date ();
		String date = mSimpleDateFormat.format ( currentTime );
		System.out.println(date);
		try {
			int insert = bser.InsertBoard(board.getUid(), board.getBtitle(), board.getBcontent(), 0
					, date, board.getBctg());
			msg.put("resmsg", "succ");
			msg.put("resdata", insert);
		}catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			msg.put("resdata", -1);
		}
		resEntity = new ResponseEntity<Map<String, Object>>(msg, HttpStatus.OK);

		return resEntity;
	}

	@GetMapping("/boarddetail/{bnum}")
	@ApiOperation(value="게시글 상세조회 서비스")
	public ResponseEntity<Map<String, Object>> boardInfo(@PathVariable("bnum")int bnum){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		List<ReplyBoard_dto> rblist = new LinkedList<ReplyBoard_dto>();
		List<Comment_dto> clist = new LinkedList<Comment_dto>();
		
		try {
			System.out.println("상세조회서비스입니다!! " + bnum);
			Board_dto board = bser.SelectBoard(bnum);
			bser.UpdateBoard(bnum, board.getUid(), board.getBtitle(), board.getBcontent()
					, board.getBhit()+1, board.getBcreation_date(), board.getBctg());
			
			rblist = rbser.SelectListReplyBoard(bnum);
			clist = cser.SelectListComment(bnum);
			System.out.println(clist);
			for(Comment_dto cdto : clist)
				cdto.setRlist(rcser.SelectListReplyComment(cdto.getCnum()));

			board.setRblist(rblist);
			board.setClist(clist);
			
			System.out.println(board);
			msg.put("resmsg", "succ");
			msg.put("resdata", board);
		}

		catch(RuntimeException e) {
			e.printStackTrace();
			msg.put("resmsg", "fail");
			msg.put("resdata", -1);
		}
		resEntity = new ResponseEntity<Map<String,Object>>(msg, HttpStatus.OK);
		return resEntity;
	}


	@PostMapping("/boarddelete")
	@ApiOperation(value="게시글 삭제 서비스")
	public ResponseEntity<Map<String, Object>> boardDelete(@RequestBody Board_dto board){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		System.out.println("삭제 서비스입니다. ");
		System.out.println(board);
		System.out.println(board.getBnum());
		try {
			int delete = bser.DeleteBoard(board.getBnum());
			msg.put("resmsg", "succ");
			msg.put("resdata", delete);
		}
		catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			msg.put("resdata", -1);
		}
		resEntity = new ResponseEntity<Map<String,Object>>(msg, HttpStatus.OK);
		return resEntity;
	}

	@PostMapping("/boardupdate")
	@ApiOperation(value="게시글 수정 서비스")
	public ResponseEntity<Map<String, Object>> boardUpdate(@RequestBody Board_dto board){
		ResponseEntity<Map<String, Object>> resEntity = null;
		Map<String, Object> msg = new HashMap<String, Object>();
		System.out.println("게시글 수정 서비스입니당~~~~~~~~~~");
		System.out.println(board);
		try {
			int update = bser.UpdateBoard(board.getBnum(), board.getUid(), board.getBtitle(), board.getBcontent()
					, board.getBhit(), board.getBcreation_date(), board.getBctg());
			msg.put("resmsg", "succ");
			msg.put("resdata", update);
		}
		catch(RuntimeException e) {
			msg.put("resmsg", "fail");
			msg.put("resdata", -1);
		}
		resEntity = new ResponseEntity<Map<String,Object>>(msg, HttpStatus.OK);
		return resEntity;
	}
}



