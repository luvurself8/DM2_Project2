package net.kdigital.project.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import net.kdigital.project.domain.Member;
import net.kdigital.project.domain.Plan;
import net.kdigital.project.domain.PlanService;

@Mapper
public interface MemberMapper {

	// 회원가입 
	public int insertMember(Member member);
	
	// 멤버 1명 조회
	public Member selectOne(String memberid);

	// 한 회원의 전체 여행 조회 
	public List<Plan> selectPlan(Map<String, Object> map);

	// 새로운 여행 등록 
	public int insertPlan(Plan plan);

	// 여행 하나 조회 (planservice 화면 들어감)
	public List<PlanService> selectOnePlan(int planseq);

	//중복없이 Daynum  조회
	public List<PlanService> selectDaynum(int planseq);

	// 화면 출력하며 기본으로 출력할 Day 1 여정 조회
	public List<PlanService> selectDayOneRoute(Map<String, Integer> map);

	// 여행을 삭제
	public int deletePlan(int planseq);

	

}
