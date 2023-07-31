package net.kdigital.project.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import net.kdigital.project.domain.Diary;
import net.kdigital.project.domain.Exchange;
import net.kdigital.project.domain.Plan;
import net.kdigital.project.domain.PlanService;
import net.kdigital.project.domain.Stock;

@Mapper
public interface ServiceMapper {

	

	// 환율 한 컬럼 조회 
	List<Exchange> selectOneStock(String chartname);

	//모든 환율 조회 
	List<Stock> selectStock();

	//회원의 한 여행에 대한 Daynum 중복없이 조회 
	List<PlanService> selectDaynum(int planseq);

	//한 여행에 대한 하루 여정 조회 
	List<PlanService> selectPlanOneday(Map<String, Integer> map);

	//한 회원의 하나의 여행 조회 
	Plan selectPlan(int planseq);

	// 바로 띄울 Day1 
	List<PlanService> selectDayOnePlan(int planseq);

	List<Exchange> selectAll();

	int deletePlanservice(Map<String, Integer> map);

	int insertPlanService(PlanService list);

	List<Diary> selectDiaryOneday(Map<String,Integer> map);

	int updateDiary(Diary diary);

	int deleteDiary(int diary_seq);

	int insertDiary(Diary diary);

	

	

	
}
