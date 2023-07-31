/**
 * 
 */

 $(function (){
	 // 홈페이지가 로드되자마자 Daynum을 출력하는 init() 실행 
	 //init();
	 
 })
 
 
 function init() {
	 
	 let planseq = $('#planseq').val();
	 
	 $.ajax({
		 url : 'selectDaynum',
		 method : 'GET',
		 data : {"planseq" : planseq},
		 success : outDaynum
	 })
 }
 
 
 // 한 여정의 총 Daynum 출력함수 
 function outDaynum(resp) {
	 let tags = ``;

	 $.each(resp, function(idx, item){
		 
	 tags += `<li><a href="javascript:MyRoute(${item.daynum})" class="routeDaynum" data-daynum="${item.daynum}">Day ${item.daynum}<a></li>`;

	 });
	 
	 tags += `<li><input type="button" id="addBtn" value="추가하기"></li>`
	 
	 $('#DaynumResult').append(tags); 
	 
	 // 추가버튼 누르면 daynum 추가 
	 $('#addBtn').on('click', addDayNum);
 }
 
 
 // 각 Day마다의 여정을 요청하는 함수 
 function MyRoute(daynum) {
	 $('#RouteResult').text('');
	  //alert("뜨나?");

	 
	 let planseq = $('#planseq').val();
	
	 
	 $.ajax({
		 url : 'selectPlanOneday',
		 method : 'POST',
		 data : {"daynum": daynum, "planseq" : planseq},
		 success : outRoute
	 })
 }
 
  // 각 Daynum 마다의 여정을 출력하는 함수  
 function outRoute(resp) {
	 let tags = ``;
	 
	 
	 let daynum = $('.test').attr('data-daynum');
	 //alert(daynum);
	 if(resp.length == 0) {
		 tags +=`<li>등록된 일정이 없습니다.<li>
		 		 <li><a href="javascript:moveToMapService(`+daynum+`)" class="mapBtn">장소 추가하기</a></li>`;
		 $('#RouteResult').append(tags);
		 return;
	 }
	 
	 $.each(resp, function(idx, item){

	 tags += `<li>
				<a href="#" class="placeid" data-num=${item.daynum}>${item.placename}</a>
				<div style="font-size:0.7em;" class="placeaddress">${item.placeaddress}</div>
			</li>`

	 })
	 
	 tags += `<li><a href="javascript:moveToMapService()" class="mapBtn">장소 추가하기</a></li>`;
	 
	 $('#RouteResult').append(tags);
	 //$('#.mapBtn').on('click', moveToMapService);
	 
 }
 
 function addDayNum() {
	  $('#DaynumResult').text('');
	 
	let planseq = $('#planseq').val();
	 
	 $.ajax({
		 url : 'selectDaynum',
		 method : 'GET',
		 data : {"planseq" : planseq},
		 success : function(resp){
			 let tags = ``;
			 let addDay = 0;
	 
			 $.each(resp, function(idx, item){
			 ++addDay;
			 tags += `<li><a href="javascript:MyRoute(${item.daynum})" data-daynum="${item.daynum}">Day ${item.daynum}<a></li>`;

			 });
			 
			 tags += `<li><a href="javascript:MyRoute(${addDay+1})" data-daynum="${addDay+1}" class="test" >Day ${addDay+1}<a></li>`;
			 tags += `<li><input type="button" id="addBtn" value="추가하기"></li>` 
			 
			 $('#DaynumResult').append(tags); 
			 
		 }
	 })
	 
 }
 
 function moveToMapService(temp) {

	
	//let daynum = $('.routeDaynum').attr('data-daynum');
	//let daynum = $(this).attr('data-daynum');
	let daynum = $('.placeid').attr('data-num');
	
	
	//alert(daynum);
	//alert("daynum : "+daynum);
	//alert("추가된 daynum : "+temp);
	
	//동적으로 추가된 Daynum에 대해서는 안됨 
	if(daynum === undefined){
		daynum = temp; 
	}
	
	
	
	let planseq = $('#planseq').val();
	let ctx = $("#ctx").val();
	//바꿔야할것
	location.href= ctx + "/service/planServiceMapVersion?planseq="+planseq+"&daynum="+daynum;
	
	 
	 
 }

 
