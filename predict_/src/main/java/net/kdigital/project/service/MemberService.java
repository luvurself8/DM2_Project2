package net.kdigital.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.kdigital.project.domain.Member;
import net.kdigital.project.domain.Plan;
import net.kdigital.project.domain.PlanService;
import net.kdigital.project.mapper.MemberMapper;

@Service
public class MemberService {

	@Autowired
	MemberMapper mapper;

	@Autowired
	PasswordEncoder passwordEncoder;

	// 회원가입 
	public int insertMember(Member member) {

		member.setMemberpwd(passwordEncoder.encode(member.getMemberpwd()));

		int result = mapper.insertMember(member);
		return result;
	}

	// 멤버 한명 조회 
	public Member selectOne(String memberid) {

		Member member = mapper.selectOne(memberid);
		return member;
	}

	// 한 회원의 전체 여행 조회 
	public List<Plan> selectPlan(String memberid, int planseq) {

		Map<String, Object> map = new HashMap<>();
		map.put("memberid", memberid);
		map.put("planseq", planseq);

		List<Plan> list  = mapper.selectPlan(map);

		return list;
	}

// 새로운 여행 등록 
	public int insertPlan(Plan plan) {

		int result  = mapper.insertPlan(plan);
		return result;
	}

	// 여행 하나 조회 (planservice 화면 들어감)
	public List<PlanService> selectOnePlan(int planseq) {

		List<PlanService> list = mapper.selectOnePlan(planseq);

		return list;
	}

	//중복없이 Daynum  조회
	public List<PlanService> selectDaynum(int planseq) {

		List<PlanService> list = mapper.selectDaynum(planseq);
		return list;
	}

	// 화면 출력하며 기본으로 출력할 Day 1 여정 조회
	public List<PlanService> selectDayOneRoute(int planseq, int daynum) {

		Map<String, Integer> map = new HashMap<>();

		map.put("planseq", planseq);
		map.put("daynum", daynum);

		List<PlanService> list = mapper.selectDayOneRoute(map);

		return list;
	}

	// 여행을 삭제
	public int deletePlan(int planseq) {

		int result = mapper.deletePlan(planseq);
		return result;
	}


}
