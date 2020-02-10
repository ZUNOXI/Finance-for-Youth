package com.ssafy.javer.Service;

import java.util.List;		

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.javer.DTO.News_dto;
import com.ssafy.javer.DTO.Stock_dto;
import com.ssafy.javer.Repository.NewsMybatisRepository;
import com.ssafy.javer.Repository.StockMybatisRepository;

@Service("StockServiceImpl")
public class StockServiceImpl implements StockService{
	@Autowired
	StockMybatisRepository stockRepo;
	

	@Override
	public List<Stock_dto> SelectListStock() {
		// TODO Auto-generated method stub
		return stockRepo.SelectListStock();
	}

}
