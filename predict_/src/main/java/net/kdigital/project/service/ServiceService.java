package net.kdigital.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.kdigital.project.domain.Diary;
import net.kdigital.project.domain.Exchange;
import net.kdigital.project.domain.Plan;
import net.kdigital.project.domain.PlanService;
import net.kdigital.project.domain.Stock;
import net.kdigital.project.mapper.ServiceMapper;

@Service
public class ServiceService {

	
	@Autowired
	ServiceMapper mapper;

	// 환율 한 컬럼 조회 
	public List<Exchange> selectOneStock(String chartname) {
		
		List<Exchange> list = mapper.selectOneStock(chartname);
		
		return list;
	}

	//모든 환율 조회 
	public List<Stock> selectStock() {
		
		List<Stock> list = mapper.selectStock();
		
		return list;
	}

	//회원의 한 여행에 대한 Daynum 중복없이 조회 
	public List<PlanService> selectDaynum(int planseq) {
		
		List<PlanService> list = mapper.selectDaynum(planseq);
		return list;
	}

	//한 여행에 대한 하루 여정 조회 
	public List<PlanService> selectPlanOneday(int daynum, int planseq) {
		
		Map<String, Integer> map = new HashMap<>();
		map.put("daynum", daynum);
		map.put("planseq", planseq);
		
		List<PlanService> list = mapper.selectPlanOneday(map);
		
		return list;
	}

	//한 회원의 하나의 여행 조회 
	public Plan selectPlan(int planseq) {

		Plan plan = mapper.selectPlan(planseq);
		
		return plan;
	}

	public List<PlanService> selectDayOnePlan(int planseq) {
		List<PlanService> list = mapper.selectDayOnePlan(planseq);
		return list;
	}

	public List<Exchange> selectAll() {
		
		List<Exchange> list = mapper.selectAll();
		return list;
	}

	public int deletePlanservice(int planseq, int daynum) {
		Map<String,Integer> map = new HashMap<>();
		map.put("planseq", planseq);
		map.put("daynum", daynum);
		return mapper.deletePlanservice(map);
	}

	public int insertPlanservice(PlanService list) {
		return mapper.insertPlanService(list);
	}

	
	public List<Diary> selectDiaryOneday(int planseq, int daynum) {
		
		Map<String,Integer> map = new HashMap<>();
		map.put("planseq", planseq);
		map.put("daynum", daynum);

		List<Diary> list = mapper.selectDiaryOneday(map);
		
		return list;
	}

	public int updateDiary(Diary diary) {
		
		
		int result = mapper.updateDiary(diary);
		return result;
	}

	public int deleteDiary(int diary_seq) {

		int result = mapper.deleteDiary(diary_seq);
		
		return result;
	}

	public int insertDiary(Diary diary) {
		int result = mapper.insertDiary(diary);
		return result;
	}

	

	


	
	
	
	
}
