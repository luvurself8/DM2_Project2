let clickCount = 0;
 $(function(){
	 
	
	
	 //행을 클릭하면 해당 plan 조회 
	 $('.planTitle').on('click',selectPlan);
	 
	// 여행을 등록하기 위한 모달창 이벤트 
	 $('#insertBtn').on('click', openModal);
	 
	 // 모달창 닫기 
	 $('#closeModalBtn').on('click', closeModal);
	 
	 //Daynum 누르는 것의 모달창 닫기 
	 $('#closeDaynumModal').on('click', closeDaynumModal);
	 
	 //Plan 수정하기 
	 //$('#updateBtn').on('click', updatePlan);
	 
	 // 입력한 여행에 대한 DB저장
	 $('#insertPlanBtn').on('click', createPlan);
	 
	 //가계부 이동 
	 $('.budgetBtn').on('click', moveToBudgetService);
	 
	 
 })
 function selectPlan() {
	 
	 let planseq = $(this).attr('value');
	 
	 //alert(planseq);
	 
	 $.ajax({
		 url : 'selectPlan',
		 method : 'GET',
		 data : {'planseq' : planseq},
		 success : function(resp){
		
		let tags = `<div id="TravleTicket">
					<div class="ticket">
						<div class="ticket-top">
							<!-- head -->
							<div class="ticket-header">`;
			 
			 $.each(resp, function(idx, item){
				 
				 tags += `	<div class="head-logo" text="">${item.plantitle}</div>
							</div>
							<!-- /head -->
		
							<!-- body -->
							<div class="ticket-body">
								<!-- locations -->
								<div class="locations">
									<div class="loc-depart">
										<h1 text="">${item.departure}</h1>
									</div>
									<div class="loc-direction">
										<div class="arrow"></div>
									</div>
									<div class="loc-arrive">
										<h1 text="">${item.destination}</h1>
									</div>
								</div>
								<!-- /locations -->
		
								<div class="body-info">
									<!-- name/seat -->
									<div class="info">
										<div class="info-name">
											Traveler
											<h2>${item.memberid}</h2>
										</div>
									</div>
									<!-- /name/seat -->
									<!-- flight -->
									<div class="flight">
		
										<div class="flight-depart-date">
											Depart
											<h2 text="">${item.startdate}</h2>
										</div>
										<div class="flight-depart-time">
											Arrive
											<h2 text="">${item.enddate}</h2>
										</div>
									</div>
									<!-- /flight -->
								</div>
		
							</div>
						</div>
		
						`;
			 });
			 
			 tags += `<div class="ticket-bottom">
							<div class="bottom-info">
								<!-- depart -->
								<div class="depart">
									<div class="depart-terminal">
										나의 한마디
										<h2>길 잃는 순간 끝이다 </h2>
									</div>
								</div>
								<!-- /depart -->
		
								<!-- barcode -->
								<div class="depart-barcode"></div>
								<!-- /barcode -->
							</div>
						</div>
					</div><!-- .ticket -->
				</div>
		
			</div>`;
			
			$('.outputTicket').html(tags);
		 }
	 })
 }
 
 
 // 표를 클릭하면 그 여행에 맞는 Daynum을 조회하여 모달로 띄운다. 
 function outputDaynum(planseq){
	++clickCount;
	 
	 //let planseq = $(this).attr('value');
	 
	 
	 //alert(planseq);
	 
	 $.ajax({
		 url : 'selectDaynum',
		 method : 'GET',
		 data : {'planseq':planseq},
		 success : function(resp){
			 
			 let tags = ``;
			 let addDay = resp.length+1;
			 
			 //모달을 열기위한 요소가져오기 
			 let openModal = $('.selectDaynum');
			 let openBkg = $('.modal_bkg');

			 
			 // 만약 일정이 없다면 추가하기 버튼 생성 
			 if(resp.length == 0){

				$('.outputModal').text('');
				$('.clickDaynum').text('');
				$('.temp').text('');
				 tags = `<p><button class="clickDaynum" value="1" data-seq="${planseq}">추가하기</button><p>`;

			 }else {
				 
			 $.each(resp, function(idx, item){ 
				
				$('.outputModal').text('');
				 
				//alert("오예"+planseq);
				tags += `<p><button class="clickDaynum" value="${item.daynum}" data-seq="${planseq}">Day${item.daynum}</button><p>`;
				
			 })
			 
			 	$('.clickDaynum').attr('value',addDay);
			 	$('.clickDaynum').attr('data-seq',planseq);
			 	//alert("새로운 daynum"+addDay);

			 }

			 $('.outputModal').append(tags);
			 
			 
			 //Daynum 버튼 클릭하면 지도 페이지로 이동 
			 $('.clickDaynum').on('click', moveToPlanService);
			 
			 //모달열기 
			 openBkg.removeClass('hidden');
			 openModal.removeClass('hidden');
			 openBkg.addClass('visible');
			 openModal.addClass('visible');

		 }
	 })
	 
	
	 
 }


 
 
 
 
 function openModal() {
	 
	 //alert('눌렀나?');
	 
	 let modalPop = $('.createPlan');
	 let modalBkg = $('.modal_bkg');
	 
	 modalPop.removeClass('hidden');
	 modalBkg.removeClass('hidden');
	 modalPop.addClass('visible');
	 modalBkg.addClass('visible');
	 
 }
 
 
 function closeModal() {
	//alert('눌렀나?');
	let modalPop = $('.createPlan');
	let modalBkg = $('.modal_bkg');
	 
	 modalPop.addClass('hidden');
	 modalBkg.addClass('hidden');
	 modalPop.removeClass('visible');
	 modalBkg.removeClass('visible');
 }
 
 
 function closeDaynumModal(){
	 
	 let openModal = $('.selectDaynum');
	 let openBkg = $('.modal_bkg');
	 
	 openModal.removeClass('visible');
	 openBkg.removeClass('visible');
	 openModal.addClass('hidden');
	 openBkg.addClass('hidden');
	  
 }
 
 // DB로 여행 저장 
 function createPlan() {
	
	//alert("눌렀슈");
	let data =  {		
	  'plantitle' : $('#plantitle').val(),
	  'departure' : $('#departure').val(),
	  'startdate' : $('#startdate').val(),
	  'destination' : $('#destination').val(),
	 'enddate' : $('#enddate').val() 
	 };

	//alert(JSON.stringify(data));
	
	$('#insertPlanForm').submit();
	 
 }
 
 
 //this = clickDaynum
 function moveToPlanService() {
	 
	 let daynum = $(this).attr('value');
	 //alert("daynum은"+daynum);
	 
	 //alert('눌렀나?');
	 let planseq = $(this).attr('data-seq');
	 //alert("여행번호"+planseq);
	 
	
	 let ctx = $("#ctx").val();
	 
	location.href= ctx + "/service/planService?planseq="+planseq+"&daynum="+daynum;
 }


 function moveToBudgetService(planseq){
	 
	 //let planseq = $(this).attr('data-seq');
	 
	 //alert(planseq);
	 
	 let ctx = $("#ctx").val();
	 
	location.href= ctx + "/service/budgetService?planseq="+planseq;
 }
