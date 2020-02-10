package com.ssafy.javer.DTO;

public class Stock_dto {
	private String name;
	private int now;
	private int befnum;
	private int close;
	private int high;
	private int open;
	private int low;
	
	
	public Stock_dto() {
		// TODO Auto-generated constructor stub
	}


	public Stock_dto(String name, int now, int befnum, int close, int high, int open, int low) {
		super();
		this.name = name;
		this.now = now;
		this.befnum = befnum;
		this.close = close;
		this.high = high;
		this.open = open;
		this.low = low;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int getNow() {
		return now;
	}


	public void setNow(int now) {
		this.now = now;
	}


	public int getBefnum() {
		return befnum;
	}


	public void setBefnum(int befnum) {
		this.befnum = befnum;
	}


	public int getClose() {
		return close;
	}


	public void setClose(int close) {
		this.close = close;
	}


	public int getHigh() {
		return high;
	}


	public void setHigh(int high) {
		this.high = high;
	}


	public int getOpen() {
		return open;
	}


	public void setOpen(int open) {
		this.open = open;
	}


	public int getLow() {
		return low;
	}


	public void setLow(int low) {
		this.low = low;
	}


	@Override
	public String toString() {
		return "Stock_dto [name=" + name + ", now=" + now + ", befnum=" + befnum + ", close=" + close + ", high=" + high
				+ ", open=" + open + ", low=" + low + "]";
	}

	
}
