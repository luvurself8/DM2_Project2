package net.kdigital.project.controller;




import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import net.kdigital.project.domain.Diary;
import net.kdigital.project.domain.Exchange;
import net.kdigital.project.domain.Plan;
import net.kdigital.project.domain.PlanService;
import net.kdigital.project.service.ServiceService;

@Controller
@Slf4j
@RequestMapping("/service")
public class ServiceController {
	
	@Autowired
	ServiceService service;
	
	/**
	 * 여행 저장 및 삭제
	 * */
	
	@PostMapping("/insertPlanservice")
	@ResponseBody
	public String insertPlanService(@RequestBody ArrayList<PlanService> list ) {
		
		log.info("리스트 형태 확인{}", list);
		
		
		 int planseq= list.get(0).getPlanseq(); 
		 int daynum = list.get(0).getDaynum();
		
		 int a = service.deletePlanservice(planseq, daynum );
		 boolean result = false;
		 
		 for(PlanService temp : list) {
			  int b = service.insertPlanservice(temp);
			  if (b==1) {
				  result= true;
			  }else {
				  result = false;
				  break;  
			  }
		  }
	
		 log.info("a: {}, result: {}", a,result);
		 
		 if( a ==1 && result) { 
			 log.info("저장되었습니다");
			 return "success"; 
		 }else {
			 return "error";
		 }
	}

	/**
	 * 은행 서비스 화면 출력 
	 * @return
	 */
	@GetMapping("/bankService")
	public String bankService() {
		return "/service/bankService";
	}
	
	
	
	/**
	 * 지도서비스 화면 출력 
	 * @return
	 */
	@GetMapping("mapService")
	public String mapService() {
		return "service/mapService";
	}
	
	/**
	 * XY차트 그리는 요청 (DB) 
	 * @return
	 */
	@GetMapping("/drawChart")
	@ResponseBody
	public List<Exchange> drawChart(String chartname) {
		
		List<Exchange> list = service.selectOneStock(chartname);

		return list;
	}
	
	/**
	 * 주식차트 그리는 요청(DB)
	 * @return
	 */
//	@GetMapping("/drawStockChart")
//	@ResponseBody
//	public List<Stock> drawStockChart() {
//		
//		List<Stock> list = service.selectStock();
//		
//		log.info("리스트가 오나: {}", list);
//		
//		return list;
//
//	}
//	
	
	/**
	 * 여행계획 서비스 화면 출력 
	 * 
	 * @return
	 */
	   @GetMapping("/planService")
	   public String planService(int planseq, int daynum, Model model) {

	      Plan plan  = service.selectPlan(planseq);
	      
	      List<PlanService> list = service.selectPlanOneday(daynum, planseq);
	      List<Exchange> ex_list = service.selectAll();
	      Exchange money = ex_list.get(0);
	      model.addAttribute("money", money);
	      model.addAttribute("planseq", planseq);
	      model.addAttribute("plan", plan); 
	      model.addAttribute("daynum",daynum);
	      model.addAttribute("list", list); 
	      
	      return "/service/planService";
	   }
	   

	
	/**
	 * 각 Daynum 에 대한 여정 조회
	 * @param daynum
	 * @param planseq
	 * @return
	 */
	@PostMapping("/selectPlanOneday")
	@ResponseBody
	public List<PlanService> selectPlanOneday(String daynum, String planseq) {
		
		List<PlanService> list = service.selectPlanOneday(Integer.parseInt(daynum), Integer.parseInt(planseq));

	
	
		
for(int i =0; i < list.size(); ++i ) {
			
			if(list.get(i).getPlacememo() == null) {
				log.info("list 보자1 {}", list.get(i).getPlacememo());
				list.get(i).setPlacememo("");
				log.info("list 보자2 {}", list.get(i).getPlacememo());
			}
		}
		
		log.info("list 보자2 {}", list);
		return list;
	}

	/**
	 * budgetService 화면 띄우기 
	 * @return
	 */
	@GetMapping("/budgetService")
	public String budgetService(int planseq, Model model) {
		
		List<PlanService> list = service.selectDaynum(planseq);

		model.addAttribute("planseq",planseq);
		model.addAttribute("daynum",list);
		
		return "/service/budgetService";
	}
	
	
	/**
	 * 가장 최신의 환율을 가져옴
	 * @param chartname
	 * @return
	 */
	@GetMapping("selectExchange")
	@ResponseBody
	public Exchange selectExchange(String chartname) {
		
		List<Exchange> list = service.selectOneStock(chartname);
		
		//log.info("리스트 {}", list.get(0));
		
		Exchange exchange = list.get(0);
		
		return exchange;
	}
	
	@GetMapping("/selectAllExchange")
	@ResponseBody
	public List<Exchange> selectAllExchange() {
		
		List<Exchange> list = service.selectAll();
		
		return list;
		
	}
	
	@GetMapping("/selectDayOnePlan")
	@ResponseBody
	public List<PlanService> selectDayOnePlan(int planseq) {
		
		List<PlanService> list = service.selectDayOnePlan(planseq);
		
		return list; 
	}
	
	
	@GetMapping("/selectDiaryOneday")
	@ResponseBody
	public List<Diary> selectDiaryOneday(int planseq, int daynum) {
		
		List<Diary> list = service.selectDiaryOneday(planseq, daynum);
		
		log.info("다이어리 보기 {}", list);
		
		return list; 
	}
	
	
	@PostMapping("/updateDiary")
	@ResponseBody
	public int updateDiary(Diary diary) {
		
		int result = service.updateDiary(diary);

		
		return result;
	}
	
	@GetMapping("/deleteDiary")
	@ResponseBody
	public int deleteDiary(int diary_seq) {
		
		int result = service.deleteDiary(diary_seq);
		
		
		return result; 
	}
	
	
	@PostMapping("/insertDiary")
	@ResponseBody
	public int insertDiary(Diary diary) {
		
		log.info("다이어리 넣기  {}",diary);
		int result = service.insertDiary(diary);
		
		return result;
	}
}



