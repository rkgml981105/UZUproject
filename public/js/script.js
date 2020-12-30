$(document).ready(function() {

/*text-box*/
const inputfield = $(".input-field");
const titlefield = $(".materialize-textarea.title");
const contentfield = $(".materialize-textarea.content");
const helper_text = $(".helper-text");
const share_cancel = $(".share-cancel");
const the_count = $('.the-count');

  $('.cancelbtn').click(function() {
    titlefield.hide();
    helper_text.hide();
    share_cancel.hide();
    the_count.hide();
    contentfield.height("50px");
  });

  inputfield.focusin(function() {
    titlefield.show();
    helper_text.show();
    share_cancel.show();
    the_count.show();
    inputfield.height("auto");
  });

/*textarea limit length*/
$('.materialize-textarea.content').keyup(function() {
    
  const characterCount = $(this).val().length,
      current = $('.count-current'),
      maximum = $('.count-maximum'),
      theCount = $('.the-count');
  
  current.text(characterCount);     
});

  /*Date Time -? */
  $(function(){
    function get2digits (num){
      return ('0' + num).slice(-2);
    }
  
    function getDate(dateObj){
      if(dateObj instanceof Date)
        return dateObj.getFullYear() + '-' + get2digits(dateObj.getMonth()+1)+ '-' + get2digits(dateObj.getDate());
    }
  
    function getTime(dateObj){
      if(dateObj instanceof Date)
        return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes())+ ':' + get2digits(dateObj.getSeconds());
    }
  
    function convertDate(){
      $('[data-date]').each(function(index,element){
        var dateString = $(element).data('date');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date));
        }
      });
    }
  
    function convertDateTime(){
      $('[data-date-time]').each(function(index,element){
        var dateString = $(element).data('date-time');
        if(dateString){
          var date = new Date(dateString);
          $(element).html(getDate(date)+' '+getTime(date));
        }
      });
    }
  
    convertDate();
    convertDateTime();
  });


  /*nav-dropdown*/
  $(document).ready(function() {
    $(".dropdown-trigger").dropdown;
  });
  

  /*location*/
  let location = $("#location");
  let locationmark = $('#locationmark');
  let modibtn = $('#modibtn');
  let locContainer = $('.locContainer');
  let loc_display = 0; //초기값 : 보이기(0)

  locationmark.click(function() {
      if($(window).width() <= 700) {
          if(loc_display === 0) {
              loc_display = 1;

              modibtn.hide();
              location.hide();
              locContainer.css("margin-left","-5%");

          } else if (loc_display === 1) {
              modibtn.show();
              location.show();
              locContainer.css("margin-left","-265px");
              loc_display = 0;
          }
      } else{
          modibtn.show();
          location.show();
          locContainer.css("margin-left","-265px");
      }
  });

/*sidenav* */

$('.sidenav').sidenav();
}); //$(document).ready(function()
