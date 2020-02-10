package com.ssafy.javer.Repository;

import java.util.List;	

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ssafy.javer.DTO.News_dto;
import com.ssafy.javer.DTO.Stock_dto;

@Repository("StockMybatisRepositoryImpl")
public class StockMybatisRepositoryImpl implements StockMybatisRepository{
	@Autowired
	SqlSession session;

	@Override
	public List<Stock_dto> SelectListStock() {
		// TODO Auto-generated method stub
		return session.selectList("com.ssafy.javer.stock.selectList");
	}
}
