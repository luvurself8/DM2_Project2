package net.kdigital.project.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import net.kdigital.project.domain.Member;
import net.kdigital.project.domain.Plan;
import net.kdigital.project.domain.PlanService;
import net.kdigital.project.service.MemberService;

@Controller
@RequestMapping("/member")
@Slf4j
public class MemberController {

	@Autowired
	MemberService service;
	
	
	/**
	 * 회원가입 화면 요청 
	 * @return
	 */
	@GetMapping("/signup")
	public String signup() {
		return "/member/signup";
	}
	
	/**
	 * 로그인 화면 요청 
	 * @return
	 */
	@GetMapping("/signin")
	public String signin() {
		return "/member/signin";
	}
	
	/**
	 * 멤버 한명 DB 저장 (회원가입) 
	 */
	@PostMapping("/signup")
	public String insertMember(Member member) {
		
		log.info("회원가입 {}", member);
		int result = service.insertMember(member);
		
		return "redirect:/";
	}
	
	/**
	 * 회원가입시 아이디 중복체크 요청 
	 * @param memberid
	 * @return
	 */
	@PostMapping("/idCheck")
	@ResponseBody
	public String idCheck(String memberid) {
		
		Member member = service.selectOne(memberid);
		
		log.info("보자보자 {} ",member);
		
		if(member != null) 
			return "success";
		 else 
			return "fail";
	}
	
	/**
	 * myPage화면 출력 
	 * @return
	 */
	@GetMapping("/myPage")
	public String myPage(@AuthenticationPrincipal UserDetails user, Model model) {
		
		String memberid = user.getUsername(); 
		
		int planseq = 0;
		
		//한 멤버의 모든 여행 출력 
		List<Plan> list = service.selectPlan(memberid, planseq);
		
		model.addAttribute("plan", list);
		
		
		return "/member/myPage";
	}
	

	/**
	 * myPlan 화면 출력
	 * @return
	 */
	@GetMapping("/myPlan")
	public String myPlan(int planseq, Model model) {
		
		//가져갈 여행 title
		List<PlanService> plan = service.selectOnePlan(planseq);
		
		//여행 title의 Daynum (중복없이) 
		List<PlanService> daynum = service.selectDaynum(planseq);
		
		model.addAttribute("plan", plan);
		model.addAttribute("daynum", daynum);
		model.addAttribute("planseq",planseq);
		
		return "/member/myPlan";
	}
	
	
	/**
	 * Dayone 기본으로 띄우기 
	 * @param planseq
	 * @param daynum
	 * @return
	 */
	@GetMapping("/selectDayOneRoute")
	@ResponseBody
	public List<PlanService> selectDayOneRoute(int planseq, int daynum) {
		
		List<PlanService> list = service.selectDayOneRoute(planseq, daynum);
		
		return list;
	}
	
	/**
	 * 중복없이 Daynum보기 
	 * @param planseq
	 * @return
	 */
	@GetMapping("/selectDaynum")
	@ResponseBody
	public List<PlanService> selectDaynum(int planseq) {
		
		List<PlanService> list = service.selectDaynum(planseq);
		
		
		return list;
	}
	
	/**
	 * Day1 하루 보기 
	 * @param user
	 * @param planseq
	 * @return
	 */
	@GetMapping("/selectPlan")
	@ResponseBody
	public List<Plan> selectPlan(@AuthenticationPrincipal UserDetails user, int planseq){
		
		String memberid = user.getUsername();
		
		List<Plan> list = service.selectPlan(memberid, planseq);
		
		//log.info("봅시다 리스트리스트 {}", list);
		
		return list;
	}
	
	/**
	 * 새로운 여행 계획 생성하기
	 * @param user
	 * @param plan
	 * @return
	 */
	@PostMapping("/myPage")
	public String insertPlan(@AuthenticationPrincipal UserDetails user, Plan plan) {
		
		plan.setMemberid(user.getUsername());
		
		log.info("다 안넘어갔나 {}", plan);
		int result = service.insertPlan(plan);
		
		return "redirect:/member/myPage";
	}
	
	/**
	 * 한 회원의 모든 여행 플랜 조회 
	 * @param user
	 * @return
	 */
	@GetMapping("/selectPlanAll")
	@ResponseBody
	public List<Plan> selectPlanAll(@AuthenticationPrincipal UserDetails user) {
		
		String memberid = user.getUsername();
		int planseq = 0;
		
		List<Plan> list = service.selectPlan(memberid, planseq);
		
		return list;
	}
	
	/**
	 * 여행 플랜 하나 삭제 
	 * @param planseq
	 * @return
	 */
	@GetMapping("/deletePlan")
	public String deletePlan(int planseq) {
		
		int result = service.deletePlan(planseq);
		
		return "redirect:/member/myPage";
	}
}
