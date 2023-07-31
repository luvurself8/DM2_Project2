/**
 * 회원가입화면
 */




let result = false;
   $(function () {

      // 아이디 길이 
        $("#memberid").on('keyup', idlength);
        
        // 중복확인 버튼
        $('#idBtn').on('click', idCheck);

      //비밀번호 길이 
        $("#memberpwd").on('keyup', pwCheck);
        
      //비밀번호 일치 여부 
        $('#pwCh').on('keyup', pwError);
        
        //가입하기 버튼 
        $('#submitBtn').on('click', submitMember);
        
        
    });
    
    
    //이메일 선택지에 따른 값 입력 
    let email3 = $('#email3');
    
    email3.on('change', function(){
      //alert(email3.val());
      let email2 = $('#email2');
      email2.val(email3.val());
      
      
   });
   
   

    function idlength() {

      //아이디 길이 체크 
        if ($("#memberid").val().length < 5 || $("#memberid").val().length > 13) {
            data = `<b style="color:red;"> 아이디는 5자 이상 13자 미만입니다. </b>`
            $('#useridError').html(data);
          	return false;
        } 
            $('#useridError').text('');
            return true;
  
        
    } // end of function idlength
    
    
    // 아이디 중복확인
    function idCheck() {
   /*
      result = false;
      if($('#useridError').text().length >0){
         
         alert("조건을 먼저 충족해주세요");
         return false;
      }
      */
     
      $.ajax({
         url : 'idCheck'
         , method : 'POST'
         , data : {'memberid': $('#memberid').val()}
         , success : function(resp){
            
            if(resp == "success"){
               alert("이미 중복된 아이디가 있습니다.");
               $('#memberid').select();
               $('#memberid').focus();
               result = false;
            } else {
               alert("사용가능한 아이디입니다.");
               result = true;
            }
         }
      })
   } //end of function idCheck


   // 비밀번호 길이 확인 
    function pwCheck() {

        if ($("#memberpwd").val().length < 5 || $("#memberpwd").val().length > 13) {
            data = `<b style="color:red;"> 비밀번호는 5자 이상 13자 미만입니다. </b>`
            $('#pwError').html(data);
            return false;
         
        } 
            $('#pwError').text('');
        	return true;
    }// end of function pwCheck


   // 비밀번호 확인이 비밀번호와 같은지 일치여부 
    function pwError() {

        if ($('#memberpwd').val() != $('#pwCh').val()) {
            data = `<b style="color:red;"> 비밀번호가 맞지않습니다.</b>`
            $('#pwError').html(data);
            return false;
        } 
            $('#pwError').text('');
        	return true;
    
    } // end of function pwError
    
    
    function submitMember(e) {
      e.preventDefault();
      
      /*
      if(!result){
         alert("아이디 중복체크를 확인해주세요");
         return false;
      }*/
      
      //비어있는지에 대한 여부 
      if ($('#memberid').val().length == 0 ) {
         alert("아이디를 입력해주세요");
         $('#usrid'). select();
         return false;
      };
      
      if ($('#memberpwd').val().length == 0 ) {
         alert("비밀번호를 입력해주세요");
         $('#memberpwd'). select();
         return false;
      };
      
      if ($('#pwCh').val().length == 0 ) {
         alert("비밀번호를 확인해주세요");
         $('#pwCh'). select();
         return false;
      };
      
      if ($('#membername').val().length == 0 ) {
         alert("이름을 입력해주세요");
         $('#membername'). select();
         return false;
      };
      
      
      //이메일 모으기 
      let email1 = $('#email1');
      let email2 = $('#email2');
      let email3 = $('#email3');
      
      if (!email3 == '직접 입력'){
         email2.val(email3);         
      } 
      
      let email = email1.val() + "@" + email2.val();
            
      $('#totalEmail').val(email);
   
      //alert(email);
      
      //전화번호 모으기 
      let phone1 = $('#phone1').val();
      let phone2 = $('#phone2').val();
      let phone3 = $('#phone3').val();
      
      let phone = phone1 + phone2 + phone3 ;
      $('#totalPhone').val(phone);
   
   	//alert(phone);
       //이메일까지 입력
      if (email1.length == 0 ) {
            alert("이메일을 입력해주세요");
            email1.select();
            return false;
         };
         
      if (email2.length == 0 ) {
            alert("이메일을 입력해주세요");
            email2.select();
            return false;
         };
      
      /*
      if(result)
         this.submit();
      else 
          return;
      **/
      
      if(!result || !idlength() || !pwCheck() || !pwError()) {
		  alert("데이터를 모두 정확히 입력해 주세요");
		  return;
	  } else
      	$('#signupForm').submit();
   }// end of function submit
   
   
  


