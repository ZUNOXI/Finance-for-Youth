package com.ssafy.javer.Repository;

import java.util.List;	

import com.ssafy.javer.DTO.News_dto;
import com.ssafy.javer.DTO.Stock_dto;

public interface StockMybatisRepository {
	public List<Stock_dto> SelectListStock();
}
