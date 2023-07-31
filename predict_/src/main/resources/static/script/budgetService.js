/**
 * 
 */

 $(function(){
	 init();
	$('.day_select').on('change', init);
	
	

	$('.diary_upload_btn').on('click', updateDiary);
	$('.diary_trash_btn').on('click', deleteDiary);
 })
 
 //다이어리 입력
 function insertDiary(){
	 
	 let daynum = $('.day_select').val();
	 let planseq = $('#planseq').val();
	 
	 let regdate = $('.regdate').val();
	 let diary_title = $('.diary_title').val();
	 let diary_text = $('.diary_text').val();
	 
	 //alert(diary_text);
	 
	 //alert("0일까 "+diary_seq);
	 
	 $.ajax({
		 url : 'insertDiary',
		 method : 'POST',
		 data : {'regdate':regdate, 'diary_title':diary_title, 'diary_text':diary_text, 'planseq':planseq, 'daynum':daynum},
		 success : function (resp){
			 
			 if(resp == 1) {
				 alert('저장 성공하였습니다');
				 outputOnedayDiary(daynum, planseq);
			 }else {
				 alert('저장 실패하였습니다.');
				 return;
			 }
		 }
		 
		 
		 
	 })
	 
 }
 
 //다이어리 삭제 
 function deleteDiary(){
	 let answer = confirm("삭제하시겠습니까?");
	 
	 if(!answer){
		 return;
	 }
	 
	 let daynum = $('.day_select').val();
	 let planseq = $('#planseq').val();
	 //alert('삭제');
	 let diary_seq = $('#diary_seq').val(); 
	 
	 $.ajax({
		 url : 'deleteDiary',
		 method : 'GET',
		 data : {'diary_seq':diary_seq},
		 success : function(resp){
			 if(!resp == 0){
				 alert('삭제되었습니다.');
			 		outputOnedayDiary(daynum, planseq);
				 
			 } 
			 
		 }
		 
	 })
	 
 }
 
 //다이어리 수정 
 function updateDiary() {
	 //alert("눌렀슈?");
	 //alert(daynum);
	 
	 let daynum = $('.day_select').val();
	 let planseq = $('#planseq').val();
	 let regdate = $('.regdate').val();
	 let diary_title = $('.diary_title').val();
	 let diary_text = $('.diary_text').val();
	 let diary_seq = $('#diary_seq').val(); 
	 
	 //alert(diary_text);
	  $.ajax({
		 
		 url : 'updateDiary',
		 method : 'POST',
		 data : {'regdate':regdate, 'diary_title':diary_title, 'diary_text':diary_text, 'diary_seq':diary_seq},
		 success : function(resp){
			 if(resp == 1){
				 alert('수정되었습니다.');
				 outputOnedayDiary(daynum, planseq);
			 }else {
				 alert('수정 실패하였습니다.');
				 return;
			 }
		 }
		 
		 
	 })
	
 }
 
 
 //Dayone 먼저 출력 
 function init() {
	 let daynum = $('.day_select').val();
	 let planseq = $('#planseq').val();
	 
	 //alert(daynum);
	 if(isNaN(parseInt(daynum))) {
		 alert("여행을 먼저 등록해주세요");
		let ctx = $("#ctx").val();
	 
		location.href= ctx + "/member/myPage";
		
		 return;
		 }
	 
	 outputOnedayPlan(daynum, planseq);
	 
	 outputOnedayDiary(daynum, planseq);
	 
	 
 }
 
 function outputOnedayDiary(daynum, planseq) {
	 
	 //alert(daynum);
	 
		$.ajax({
			url : 'selectDiaryOneday',
			method : 'GET',
			data : {'daynum':daynum, 'planseq' : planseq},
			success : outputDiary
		})
 }
 
 function outputOnedayPlan(daynum, planseq) {
	 
	 $.ajax({
		 url : 'selectPlanOneday',
		 method : 'POST',
		 data : {'daynum':daynum, 'planseq':planseq},
		 success : outputPlan
		 
	 })
	 
 }
 
 function outputDiary(resp) {
	 
	 let tags = ``;
	 //alert("길이"+resp.length);
	 
	if(!resp.length == 0) {
		
	

	 $.each(resp, function(idx, item){
		 
		 tags += `<div class="diary_wrapper" >
            <form th:action="@{/service/diaryService}" method="POST">
            	<input type="hidden" name="diary_seq" id="diary_seq" value="${item.diary_seq}">
                <div class="head_area">
                    <div class="diary_date_title_box">
                        
                        <div class="diary_date_box">
                            <div class="diary_real_date">
                                <p>날 짜</p>
                            </div>
                            <input type="date" class="regdate" name="regdate" value="${item.regdate}">
                        </div>

                        <div class="diary_title_box">
                            <div class="diary_real_title">
                                <p>제 목</p>
                            </div>
                            <input type="text" class="diary_title" name="diary_title" placeholder="일기 제목" value="${item.diary_title}">
                        </div>
                    </div><!--end.diary_date_title_box-->
				</div><!--end.head_area-->

                <div class="bonmoon">

                <textarea class="diary_text" name="diary_text">${item.diary_text}</textarea>
                  
                </div><!--end.bonmoon-->
               <div class="total_btns">
                <div>
					<input type="submit" id="insertBtn" value="저장">
							
				</div>
            </form>
            <div class="diary_btn_container">
                   	 <input type="button" class="diary_trash_btn" value="삭제하기">
                     <input type="button" class="diary_upload_btn" value="수정하기">
    		</div>  
    		
    		</div>
        </div><!--end.diary_wrapper-->
                `
	 })
	 
	
	 
	 
	  $('.myDiary').html(tags);
	  
	 $('.diary_upload_btn').on('click', updateDiary);
	 $('.diary_trash_btn').on('click', deleteDiary);
	 
	 } else {
		 
		 $('.myDiary').text('');
		tags = `<div class="diary_wrapper" >
            <form th:action="@{/service/budgetService}"  id="insertForm" method="POST">
            	<input type="hidden" id="diary_seq" >
                <div class="head_area">
                    <div class="diary_date_title_box">
                        
                        <div class="diary_date_box">
                            <div class="diary_real_date">
                                <p>날짜</p>
                            </div>
                            <input type="date" class="regdate" name="regdate" >
                        </div>

                        <div class="diary_title_box">
                            <div class="diary_real_title">
                                <p>제목</p>
                            </div>
                            <input type="text" class="diary_title" name="diary_title" placeholder="일기 제목" >
                        </div>
                    </div><!--end.diary_date_title_box-->
				</div><!--end.head_area-->

                <div class="bonmoon">

                <textarea class="diary_text" name="diary_text"></textarea>
                  
                </div><!--end.bonmoon-->
                <div class="total_btns">
                <div>
					<input type="button"  id="insertBtn" value="저장">
						
				</div>
            </form>
            <div class="diary_btn_container" >
                   	 <input type="button" class="diary_trash_btn" value="삭제하기">
                     <input type="button" class="diary_upload_btn" value="수정하기">
    		</div>  
    		</div>
        </div><!--end.diary_wrapper-->
	`;
	
	$('.myDiary').html(tags);
	$('#insertBtn').on('click', insertDiary);
	 }
	 
	 
 }
 



function outputPlan(resp) {
	if (resp==null){
		alert("여행을 먼저 계획해주세요");
	}
	
	
	let tags = ``;

			$.each(resp, function(idx, item){
				
				
				console.log(item);
				tags += `
					<li>
		          		<div class="direction-r ">
		            		<div class="flag-wrapper">
		          				<div class="direction-r ">
		           					<div class="flag-wrapper">
										<span class="hexa"></span>
										<span class="flag">${item.placename}</span>
           						</div>
            					<div class="desc">
            			<p>
                			메모 : <input type="text" name="placememo" placeholder="메모입력" class="memo" value="${item.placememo}">
              			</p>
              			
              			<p>
                			예산 : <input type="number" name="placebudget"  placeholder="예산" class="placebudget" value="${item.placebudget}" readonly>원
              			</p>
              			<p>
                			지출 : <input type="number" name="placeexpenditure"  placeholder="지출 내역" class="placeexpenditure" value="${item.placeexpenditure}">원
              			</p>
              			
              			<p>
                			차액 : <input type="number" name="difference"  placeholder="차액" class="difference" value="${item.placebudget-item.placeexpenditure}">원
              			</p>
              			<input type = "hidden" class="planseq hidden" value="${item.planseq}">
              			<input type = "hidden" class="daynum hidden"  value="${item.daynum}">
              			<input type = "hidden" class="placenum hidden" value="${item.placenum}">
              			<input type = "hidden" class="lat hidden" value="${item.lat}">
              			<input type = "hidden" class="lng hidden" value="${item.lng}">`;
              			
			})
		
			
					tags += ` </div>
						               </div>
						           </li>`;
						           
		

			$('.timeline').html(tags);	  
			cal();
			
			 
}
//보내기
$("#insert").on("click", sendData);
           
            function sendData() {      
            var travelData = [];
            
            var rows = $('.timeline li');
            rows.each(function() {
                var travelObj = {
                       'planseq': $(this).find(".planseq").val(),
                       'daynum': $(this).find(".daynum").val(),
                       'placenum': $(this).find(".placenum").val(),
                       'placename': $(this).find(".flag").text(),
                       'placebudget': $(this).find(".placebudget").val(),
                       'placeexpenditure': $(this).find(".placeexpenditure").val(),
                       'placememo': $(this).find(".memo").val(),
                       'lat': $(this).find(".lat").val(),
                       'lng': $(this).find(".lng").val()
                    };
                    travelData.push(travelObj);
               
             });

            // JSON 직렬화
            var jsonData = JSON.stringify(travelData);
         console.log(jsonData);
            // AJAX 요청
            $.ajax({
                url: 'insertPlanservice',
                type: 'POST',
                data: jsonData,
                contentType: 'application/json',
                success: function(response) {
                    alert('예산이 저장되었습니다');
                },
                error: function(error) {
                   alert("예산 저장에 실패했습니다");
                }
            });
        }

// 지출액을 입력했을 때 일어나는 함수 변화
$("ul.timeline").on("click",".placeexpenditure", function(){
	$('.placeexpenditure').on("keyup",function(){
		//console.log(this);
	
		var placeexpenditure =  $(this).closest('li').find('.placeexpenditure').val();
		var budget=  $(this).closest('li').find('.placebudget').val();
		
		 $(this).closest('li').find('.difference').val(budget-placeexpenditure);
		 cal();
	});
	
})



function cal() {
	
		let totalBudget = 0;
		let totalExpenditure = 0;
		let totalDifference= 0;
		
	
		let temp = $('.desc');
		 if(temp.length<1) {
			 alert("여행을 먼저 계획해 주세요");
			 return;
			 }
		 
		 for (let i = 0 ; i<temp.length ; i++){
			  if(isNaN(parseFloat($(temp[i]).find('.placebudget').val()))) continue;
			  totalBudget += parseFloat($(temp[i]).find('.placebudget').val());
		 }
		  for (let i = 0 ; i<temp.length ; i++){
			  if(isNaN(parseFloat($(temp[i]).find('.placeexpenditure').val()))) continue;
			  totalExpenditure += parseFloat($(temp[i]).find('.placeexpenditure').val());
		 }
		  for (let i = 0 ; i<temp.length ; i++){
			  if(isNaN(parseFloat($(temp[i]).find('.difference').val()))) continue;
			  totalDifference += parseFloat($(temp[i]).find('.difference').val());
		 }
		 
		
		
		let tags = `<h3> 예산 총계 :  ${totalBudget }원 </h3> <h3> 지출 총계 : ${totalExpenditure}원</h3> <h3>차액 총계 : ${totalDifference}원</h3>`;
		
		$('.daily_budget').html(tags);
		 
}
