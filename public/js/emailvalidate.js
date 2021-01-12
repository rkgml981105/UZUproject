var timer = null;
var isRunning = false;

$(function(){
    //인증번호 생성
    let number = Math.floor(Math.random() * 1000000)+100000;
    if(number>1000000){                                      
        number = number - 100000;                             
    }

    //이메일 전송 및 유효시간 설정
    var display = $(".time");
    var leftSec = 300;
    
    $('#validatebtn1').on('click',function(){
        if (isRunning){
            isrunning();
        }else{
            sendmail();
        }
    })

    //이메일 전송 함수
    function sendmail(){
        $.ajax({                        
            type:'POST',
            url : '/member/sendEmail',
            data : {
                email : $('#email').val(),
                number : number
            },
            dataType : 'json',
            cache : false,
            success : function (data) {
                // data는 객체고 서버에서 res.jsonp()로 넘겨준 것
                // data = {success : ture} -> 현재 데이터는 이 상태
                if(data['success']){
                    startTimer(leftSec, display);
                    alert("해당 이메일로 인증번호가 전송되었습니다. \n5분 안에 인증번호를 입력해주세요.");
                    $('#validatebtn1:contains("인증하기")').text("시간연장");
                }else{
                    alert("이메일 형식이 잘못되었습니다. 다시 입력해주세요.");
                    clearInterval(timer);
                    display.html("");
                    document.querySelector('#email').value = "";
                    document.querySelector('#email').focus();
                    // $("#nextbtn").attr("disabled", "disabled"); 
                }
            }
        })
    }

    //유효시간 연장 함수
    function isrunning(){
        clearInterval(timer);
        display.html("");
        startTimer(leftSec, display);
    }    

    //유효시간 생성 함수
    function startTimer(count, display){
        var minutes, seconds;
            timer = setInterval(function () {
            minutes = parseInt(count / 60, 10);
            seconds = parseInt(count % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.html(minutes + ":" + seconds);

            // 타이머 끝
            if (--count < 0) {
                clearInterval(timer);
                alert("이메일 인증 유효 시간이 초과되었습니다. 재인증하세요.");
                display.html("시간초과");
                isRunning = false;
                $('#validatebtn1:contains("시간연장")').text("재인증하기");
                document.querySelector('#email').value = "";
                document.querySelector('#email').focus();
            }
        }, 1000);
        isRunning = true;
    }

    //인증번호 확인
    $('#validatebtn').on('click', function(){
        let validation = document.querySelector('#email-validation');
        let validation_value = validation.value;
        let int_value = Number(validation_value);
        
        if (number === int_value){
            alert("이메일 인증이 완료되었습니다.");
            if (isRunning){
                clearInterval(timer);
                display.html("");
                $('#validatebtn1:contains()').text("인증완료");
                $('#validatebtn:contains()').text("인증완료");
                $("#nextbtn").removeAttr("disabled"); 
            };
            $("#validatebtn").off('click');
            $("#validatebtn1").off('click');
        }else{
            alert("인증번호가 일치하지 않습니다. 다시 입력하세요.");
            validation_value = null;
            validation.focus();
            $("#nextbtn").attr("disabled", "disabled"); 
        }
    })
})
