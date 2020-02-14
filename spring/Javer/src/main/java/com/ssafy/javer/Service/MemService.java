package com.ssafy.javer.Service;

import com.ssafy.javer.DTO.Member;

public interface MemService {
	
	public void addMem(String uid, String upw, String uname, String unickname, String uphonenum, String uemail,
			String uaddress, String ufavor_ctg, String uprofilephoto, String ubirth_date, String ujoin_date,
			String rcmd_blst, String salt);
	
	public void delMem(String uid);
	
	public void updateMem(String uid, String upw, String uname, String unickname, String uphonenum, String uemail,
			String uaddress, String ufavor_ctg, String uprofilephoto, String ubirth_date, String ujoin_date,
			String rcmd_blst, String salt);
	
	public Member searchMem(String uid);
	
	public void sendMail(Member mem);
	
	public String createToken(Member mem);
	
}
