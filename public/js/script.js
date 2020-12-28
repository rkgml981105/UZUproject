// public/js/script.js

$(document).ready(function() {

  /*text-box*/
  let inputfield = $(".input-field");
  let divider = $('.divider');
  let helper_text = $(".helper-text");
  let share_cancel = $(".share-cancel");

  $('#cancelbtn').click(function() {
      divider.hide();
      $(".helper-text").hide();
      $(".share-cancel").hide();
      $(".materialize-textarea").height("50px");
  });

  inputfield.focusin(function() {
      $(".divider").show();
      $(".helper-text").show();
      $(".share-cancel").show();
      inputfield.height("auto");
  });

    /*text-box input resize*/
    M.textareaAutoResize($('#textarea'));
    $('textarea#textarea').characterCounter();

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
    $(".dropdown-trigger").dropdown();
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

  /*masonry*/ 
  $('.wrapper').masonry({
    itemSelector: '.itemwrapper',
    columnWidth: 230,
    isFitWidth: true
    });

});
