package com.ssafy.javer.DTO;

import java.util.LinkedList;
import java.util.List;

public class Member {
	private String uid;
	private String upw;
	private String uname;
	private String unickname;
	private String uphonenum;
	private String uemail;
	private String uaddress;
	private String ufavor_ctg;
	private String uprofilephoto;
	private String ubirth_date;
	private String ujoin_date;
	private String rcmd_blst;
	private String salt;
	private List<String> ufavorList;
	
	public Member() {
		// TODO Auto-generated constructor stub
	}

	public Member(String uid, String upw, String uname, String unickname, String uphonenum, String uemail,
			String uaddress, String ufavor_ctg, String uprofilephoto, String ubirth_date, String ujoin_date,
			String rcmd_blst) {
		super();
		this.uid = uid;
		this.upw = upw;
		this.uname = uname;
		this.unickname = unickname;
		this.uphonenum = uphonenum;
		this.uemail = uemail;
		this.uaddress = uaddress;
		this.ufavor_ctg = ufavor_ctg;
		this.uprofilephoto = uprofilephoto;
		this.ubirth_date = ubirth_date;
		this.ujoin_date = ujoin_date;
		this.rcmd_blst = rcmd_blst;
	}
	
	public Member(String uid, String upw, String uname, String unickname, String uphonenum, String uemail,
			String uaddress, String ufavor_ctg, String uprofilephoto, String ubirth_date, String ujoin_date,
			String rcmd_blst, String salt) {
		super();
		this.uid = uid;
		this.upw = upw;
		this.uname = uname;
		this.unickname = unickname;
		this.uphonenum = uphonenum;
		this.uemail = uemail;
		this.uaddress = uaddress;
		this.ufavor_ctg = ufavor_ctg;
		this.uprofilephoto = uprofilephoto;
		this.ubirth_date = ubirth_date;
		this.ujoin_date = ujoin_date;
		this.rcmd_blst = rcmd_blst;
		this.salt = salt;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public List<String> getUfavorList() {
		return ufavorList;
	}
	
	public void setUfavorList(List<String> ufavorList) {
		this.ufavorList = ufavorList;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getUpw() {
		return upw;
	}

	public void setUpw(String upw) {
		this.upw = upw;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getUnickname() {
		return unickname;
	}

	public void setUnickname(String unickname) {
		this.unickname = unickname;
	}

	public String getUphonenum() {
		return uphonenum;
	}

	public void setUphonenum(String uphonenum) {
		this.uphonenum = uphonenum;
	}

	public String getUemail() {
		return uemail;
	}

	public void setUemail(String uemail) {
		this.uemail = uemail;
	}

	public String getUaddress() {
		return uaddress;
	}

	public void setUaddress(String uaddress) {
		this.uaddress = uaddress;
	}

	public String getUfavor_ctg() {
		return ufavor_ctg;
	}

	public void setUfavor_ctg(String ufavor_ctg) {
		this.ufavor_ctg = ufavor_ctg;
	}

	public String getUprofilephoto() {
		return uprofilephoto;
	}

	public void setUprofilephoto(String uprofilephoto) {
		this.uprofilephoto = uprofilephoto;
	}

	public String getUbirth_date() {
		return ubirth_date;
	}

	public void setUbirth_date(String ubirth_date) {
		this.ubirth_date = ubirth_date;
	}

	public String getUjoin_date() {
		return ujoin_date;
	}

	public void setUjoin_date(String ujoin_date) {
		this.ujoin_date = ujoin_date;
	}

	public String getRcmd_blst() {
		return rcmd_blst;
	}

	public void setRcmd_blst(String rcmd_blst) {
		this.rcmd_blst = rcmd_blst;
	}

	@Override
	public String toString() {
		return "Member [uid=" + uid + ", upw=" + upw + ", uname=" + uname + ", unickname=" + unickname + ", uphonenum="
				+ uphonenum + ", uemail=" + uemail + ", uaddress=" + uaddress + ", ufavor_ctg=" + ufavor_ctg
				+ ", uprofilephoto=" + uprofilephoto + ", ubirth_date=" + ubirth_date + ", ujoin_date=" + ujoin_date
				+ ", rcmd_blst=" + rcmd_blst + "]";
	}

	
	
	
	
	
	
}
