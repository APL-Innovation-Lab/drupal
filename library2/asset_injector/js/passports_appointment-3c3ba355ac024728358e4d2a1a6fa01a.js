(function($, jQuery) {
  $(document).ready(function() {
    var is_admin = 0;
    var f_time = 'h:mm A';
    var f_date = 'dddd, MMMM D, YYYY';
    var pp_format = 'YYYY-MM-DD H:mm';
    var ppwf_hour_format = 'H:mm';
    var ppwf_format = 'YYYY-MM-DD';
    var ppwf_format2 = 'MM/DD/YYYY';
    var max_date = dayjs().add(4, 'weeks');
    var min_date = dayjs(); //.subtract(1,'day');
    var which_date = $('#edit-date');
    $.getJSON("/roles.json?t=" + Date.now(), function(json9) {
      var my_roles = [];
      var k;
      for (k = 0; k < json9.length; k++) {
        j_roles = json9[k].roles;
        my_roles.push(j_roles);
        if (j_roles.includes('administrator') || j_roles.includes('passports_page_editor')) {
          var is_admin = 1;
          $('body').addClass('is_admin');
        } else {
          $('body').removeClass('is_admin');
          which_date.attr('min', min_date.format(ppwf_format));
          which_date.attr('max', max_date.format(ppwf_format));
          console.log('logged in, but not an Admin');
        }
      }
      if (!json9.length) {
        $('body').removeClass('is_admin');
        which_date.attr('min', min_date.format(ppwf_format));
        which_date.attr('max', max_date.format(ppwf_format));
        console.log('not logged in');
      }

      $('.form-item-date').prepend('<div><a id="gett_my_timess" class="usa-button usa-button-outline" href="#">Check availability...</a></div>');
      $('#edit-actions').prepend('<div><a class="usa-button shubmitt" href="#">Submit</a></div>');
      $('.shubmitt').css('color', 'white');
      $('#edit-actions-submit').css('display', 'none');
      $("#webform-submission-passport-appointment-request-add-form").change(function(e) {
        var adults = parseInt($('#edit-number-of-applicants-16-and-over').val()) || 0;
        var minors = parseInt($('#edit-number-of-applicants-age-15-or-younger').val()) || 0;
        var p_v = adults + minors;
console.log('pV' + p_v);
          if ($('.pp-avail.active').length && $('#edit-time-hour').val().length && (7 > parseInt(p_v) > 0)) {
             document.getElementById("edit-actions-submit").disabled = false;
                $('.shubmitt').css('display', 'inline-block');
        } else {
          document.getElementById("edit-actions-submit").disabled = true;
                $('.shubmitt').css('display', 'none');
        }
      });
      $("#edit-select-appointment-date-and-time input").change(function() {
        var adults = parseInt($('#edit-number-of-applicants-16-and-over').val()) || 0;
        var minors = parseInt($('#edit-number-of-applicants-age-15-or-younger').val()) || 0;
        var p_v = adults + minors;
      });
      this_date = which_date.val();
      which_date.change(function() {
        gett_my_timess(which_date.val());
      });
      async function gett_my_timess(my_date, check_all) {
        var date_field = $('.form-item-date');
        if (check_all != '1') {
          $('.date_wrapper').remove();
          date_field.append('<div class="date_wrapper" id="date_wrapper_' + my_date + '"></div>');
        }
        if (dayjs(my_date).isValid()) {
          var which_date = $('#edit-date');
          var the_date1 = dayjs(my_date);
          var the_date = the_date1.format(ppwf_format);
          var the_date2 = the_date1.format('d');
          var the_date3 = the_date1.format('MMMM D');
          var existingStarts = [];
          var time_options = '<option selected="selected" value="">- Select -</option><option value="10:00">10:00 AM</option><option value="10:30">10:30 AM</option><option value="11:00">11:00 AM</option><option value="11:30">11:30 AM</option><option value="13:00">1:00 PM</option><option value="13:30">1:30 PM</option><option value="14:00">2:00 PM</option><option value="14:30">2:30 PM</option>';
          $('#edit-time-hour').html(time_options);
          var existing_dates = "/pp_dates_wf.json?t=" + Date.now() + "&date=" + the_date;
          if ((the_date == '2022-03-31' || the_date == '2022-04-17' || the_date == '2022-05-29' || the_date == '2022-05-30' || the_date == '2022-06-19' || the_date == '2022-06-20' || the_date == '2022-07-04' || the_date == '2022-09-04' || the_date == '2022-09-05' || the_date == '2022-11-11' || the_date == '2022-11-24' || the_date == '2022-11-25' || the_date == '2022-12-23' || the_date == '2022-12-24' || the_date == '2022-12-25' || the_date == '2022-12-26') && (!is_admin)) {
            if (!is_admin) {
              which_date.val('');
            }
            $('#date_wrapper_' + the_date).remove();
          } else {
            var the_date1a = max_date;
            var is_admin2 = is_admin;
            the_date1a.add(1, 'day');
            if ((the_date1.isBefore(min_date) || the_date1.isAfter(the_date1a)) && (!is_admin2)) {
              which_date.val('');
            } else {
              switch (the_date2) {
                case "0":
                case "6":
                  $('#date_wrapper_' + the_date).remove();
                  //   alert('The passport office is closed on Saturday and Sunday. Please select another date.');
                  break;
                default:
                  var opening_hour = 10;
                  var closing_hour = 15;
                  var time_options = '<option selected="selected" value="">- Select -</option><option value="10:00">10:00 AM</option><option value="10:30">10:30 AM</option><option value="11:00">11:00 AM</option><option value="11:30">11:30 AM</option><option value="13:00">1:00 PM</option><option value="13:30">1:30 PM</option><option value="14:00">2:00 PM</option><option value="14:30">2:30 PM</option>';
                  existingStarts.push("12:00");
                  existingStarts.push("15:00");
                  break;
              }
              $.getJSON(existing_dates, function(json) {
                var k;
                for (k = 0; k < json.length; k++) {
                  var j_time = dayjs(json[k].date + ' ' + json[k].time).format(ppwf_hour_format);
                  if (existingStarts.indexOf(j_time) === -1) {
                    existingStarts.push(j_time);
                  }
                  var j_adults = parseInt(json[k].adults) || 0;
                  var j_minors = parseInt(json[k].minors) || 0;
                  var j_people = parseInt(j_adults) + parseInt(j_minors);
                  if (j_people > 2) {
                    var time_2 = dayjs(json[k].date + ' ' + j_time).add(30, 'minutes').format(ppwf_hour_format);
                    if (existingStarts.indexOf(time_2) === -1) {
                      existingStarts.push(time_2);
                    }
                  }
                  if (j_people > 4) {
                    var time_3 = dayjs(json[k].date + ' ' + j_time).add(30, 'minutes').format(ppwf_hour_format);
                    if (existingStarts.indexOf(time_3) === -1) {
                      existingStarts.push(time_3);
                    }
                  }
                }
                var date_field = $('.form-item-date');
                $('#date_wrapper_' + my_date).html('');
                var date_wrapper = $('#date_wrapper_' + my_date);
                var adults = parseInt($('#edit-number-of-applicants-16-and-over').val()) || 0;
                var minors = parseInt($('#edit-number-of-applicants-age-15-or-younger').val()) || 0;
                var p_v = adults + minors;
                if (existingStarts.length) {
                  var my_way = '';
                  var mm = 0;
                  if (dayjs(my_date).isValid()) {
                    my_way = 'Available times for ' + dayjs(my_date).format(f_date) + ':<br><br>';
                  }
                  $.each($('#edit-time-hour option'), function(index, value) {
                    if (value.value) {
                      var time_3 = dayjs(my_date + ' ' + value.value).format(f_time);
                      var time_4 = dayjs(my_date + ' ' + value.value).format('h');
                      var time_4a = dayjs(my_date + ' ' + value.value).format(ppwf_hour_format);
                      var this_time = parseInt(time_4);
                      var this_time_a = time_4a;
                      my_way += '<a data-date="' + my_date + '" data-time="' + value.value + '" class="pp-avail" href="#">' + the_date3 + '<br>' + time_3 + '</a>';
                      mm++;
                    }
                  });
                  $('#edit-actions-wizard-next').css('display', 'none');
                  if (mm > 0) {
                    date_wrapper.html(my_way);
                    // console.log(existingStarts);
                    $.each(existingStarts, function(index, value) {
                      $('.pp-avail[data-date="' + my_date + '"][data-time="' + value + '"]').addClass('nnot_availablee');
                      //if more than one, need to mark the next one not available //
                      // get p_v, get the next data-time +30 minutes
                      if (parseInt(p_v) > 2) {
                        var pre_block_time = dayjs(my_date + ' ' + value).subtract(30, 'minutes').format(ppwf_hour_format);
                        $('.pp-avail[data-date="' + my_date + '"][data-time="' + pre_block_time + '"]').addClass('nnot_availablee');
                      }
                      if (parseInt(p_v) > 4) {
                        var pre_block_time = dayjs(my_date + ' ' + value).subtract(60, 'minutes').format(ppwf_hour_format);
                        $('.pp-avail[data-date="' + my_date + '"][data-time="' + pre_block_time + '"]').addClass('nnot_availablee');
                      }
                    });
                  } // if it's not an admin, and there are no times available, hide the div
                  if (parseInt(is_admin) > 0) {
                    $('.nunya').css('display', 'none');
                  } else {
                    var total_poss = $('.pp-avail[data-date="' + my_date + '"]').length;
                    var not_avail_poss = $('.pp-avail[data-date="' + my_date + '"].nnot_availablee').length;
                    if (not_avail_poss >= total_poss) {
                      if (check_all == '1') {
                        $('#date_wrapper_' + my_date).remove();
                      } else {
                        
                        $('#date_wrapper_' + my_date).html('<p>No available appointments for ' + dayjs(my_date).format(f_date) + '</p>');
                                              $('.nunya').css('display', 'none');

                      }
                    } else {
                      $('.nunya').css('display', 'none');
                    }
                  }
                  $('.pp-avail').click(function(e) {
                    e.preventDefault();
                    $('.pp-avail').removeClass('active');
                    $('.pp-avail').addClass('inactive');
                    $(this).removeClass('inactive');
                    $(this).addClass('active');
                    var d_time = $(this).attr('data-time');
                    var d_date = $(this).attr('data-date');
                    $('#edit-time-hour').val(d_time);
                    $('#edit-date').val(d_date);
                    $('.date_wrapper').css('display', 'none');
                    $('#date_wrapper_' + dayjs(d_date).format(ppwf_format)).addClass('active');
                    $('#date_wrapper_' + dayjs(d_date).format(ppwf_format)).css('display', 'block');
                      
                       var adults = parseInt($('#edit-number-of-applicants-16-and-over').val()) || 0;
        var minors = parseInt($('#edit-number-of-applicants-age-15-or-younger').val()) || 0;
        var p_v = adults + minors;
console.log('new pV ' + p_v);
       
                      
                      
                    if  ((7 > parseInt(p_v)) && (parseInt(p_v) > 0)) {
                      document.getElementById("edit-actions-submit").disabled = false;
                                      $('.shubmitt').css('display', 'inline-block');

                    } else {
                      document.getElementById("edit-actions-submit").disabled = true;
                                        $('.shubmitt').css('display', 'none');

                    }
                  });
                }
                if (mm == 0) {
                  $('#edit-actions-wizard-next').css('display', 'none');
                  date_wrapper.append('<span style="color:red" class="apl_error"><p>No available appointment times for ' + dayjs(my_date).format(f_date) + '.</p></span>');
                                        $('.nunya').css('display', 'none');

                }
              });
            }
          } // end of date
        }
        if (check_all == '1') {
          var my_next_date = my_date;
          var my_next_date_js = dayjs(my_next_date).add(1, 'day');
          if (my_next_date_js.isBefore(max_date)) {
            gett_my_timess(my_next_date_js.format(ppwf_format), 1);
          } else {
            var dw = $('.date_wrapper .pp-avail').length;
            console.log('the .date_wrapper is ' + dw);
            if (dw < 1) {
              $('.form-item-date').append('<p class="nunya">No available appointments. Please try again later.</p>');
            }
          }
        } 
      }
      $('#gett_my_timess').click(function(e) {
        var me_date = min_date;
        var wr_date = min_date;
        var date_field = $('.form-item-date');
        var wr_next_date = wr_date;
        var wr_next_date_js = dayjs(wr_next_date);
        $('.date_wrapper').remove();
        for (let i = 0; i < 29; i++) {
          date_field.append('<div class="date_wrapper" id="date_wrapper_' + wr_next_date_js.add(i, 'days').format(ppwf_format) + '"></div>');
        }
        gett_my_timess(me_date.format(ppwf_format), 1);
        return false;
      });

      function get_this_date() {
        this_date = dayjs(which_date.val());
        if (this_date.isValid()) {} else {
          this_date = dayjs().add(1, 'day');
        }
        this_date.hour(opening_hour);
        this_date2 = this_date.minute(0);
        return this_date2;
      }
      //this_date.minute(0);
      var time_options = $('#edit-time-hour option');

      function check_date_time_people2(date, time) {
        var url = '/pp/' + date + '/three.json?time[0]=' + time;
        $.getJSON(url, function(json) {
          if (json.length) {
            return FALSE;
          } else {
            return TRUE;
          }
        });
      }
      //$("#webform-submission-passport-appointment-request-add-form").submit(function(e) {
      $(document).on('click', '.shubmitt', function(e) {
        e.preventDefault();
        doubleCheck();
      });
      async function doubleCheck(e) {
          
          var is_admin3 = is_admin;
          console.log('is admin3? ' + is_admin3);
          if( parseInt(is_admin3) < 1) {
              
          
        var form = this;
        var the_date1 = dayjs(which_date.val());
        var the_date = the_date1.format(ppwf_format);
        var the_date2 = the_date1.format('d');
        var selectedTime = $('#edit-time-hour').val();
        var adults = parseInt($('#edit-number-of-applicants-16-and-over').val()) || 0;
        var minors = parseInt($('#edit-number-of-applicants-age-15-or-younger').val()) || 0;
        var p_v = adults + minors;
        var existingStarts = [];
        var existing_dates = "/pp_dates_wf.json?t=" + Date.now() + "&date=" + the_date;
        switch (the_date2) {
          case "0":
          case "6":
            //alert('The passport office is closed on Saturday and Sunday. Please select another date.');
            break;
          default:
            var opening_hour = 10;
            var closing_hour = 15;
            //  var time_options = '<option selected="selected" value="">- Select -</option><option value="10:00">10:00 AM</option><option value="10:30">10:30 AM</option><option value="11:00">11:00 AM</option><option value="11:30">11:30 AM</option><option value="13:00">1:00 PM</option><option value="13:30">1:30 PM</option><option value="14:00">2:00 PM</option><option value="14:30">2:30 PM</option>';
            existingStarts.push("12:00");
            existingStarts.push("15:00");
            break;
        }
        var is_available = 0;
        var dude = $.getJSON(existing_dates, function(json) {
          var k;
          for (k = 0; k < json.length; k++) {
            var j_time = dayjs(json[k].date + ' ' + json[k].time).format(ppwf_hour_format);
            if (existingStarts.indexOf(j_time) === -1) {
              existingStarts.push(j_time);
            }
            var j_adults = parseInt(json[k].adults) || 0;
            var j_minors = parseInt(json[k].minors) || 0;
            var j_people = parseInt(j_adults) + parseInt(j_minors);
            if (j_people > 2) {
              var time_2 = dayjs(json[k].date + ' ' + j_time).add(30, 'minutes').format(ppwf_hour_format);
              if (existingStarts.indexOf(time_2) === -1) {
                existingStarts.push(time_2);
              }
            }
            if (j_people > 4) {
              var time_3 = dayjs(json[k].date + ' ' + j_time).add(30, 'minutes').format(ppwf_hour_format);
              if (existingStarts.indexOf(time_3) === -1) {
                existingStarts.push(time_3);
              }
            }
          }
          var obj = existingStarts;
          if (Object.values(obj).indexOf(selectedTime) > -1) {
            alert('The time you selected is not available anymore. Please select a different time or try again later.');
            return false;
          } else { // passed the first test
            if (p_v > 1) {
              var time_2 = dayjs('2020-03-15 ' + selectedTime).add(30, 'minutes').format(ppwf_hour_format);
              if (Object.values(obj).indexOf(time_2) > -1) {
                alert('The time you selected is not available anymore. Please select a different time or try again later.');
                return false;
              } else { //passed the second test
                // submit the form
                is_available = 1;
                $("#edit-actions-submit").click();
              }
            } else { // skipped the second test
              console.log('skipped the second test');
              //submit the form
              is_available = 1;
              $("#edit-actions-submit").click();
            }
          }
        }); //end of .getJson call
        if (is_available > 0) {
          console.log('still available');
          $("#webform-submission-passport-appointment-request-add-form").submit();
          return true;
        } else {
          console.log('not available anymore');
          console.log('is_available = ' + is_available);
          return false;
        }
          
      } else {
$("#edit-actions-submit").click();          
      }
      }; //end of doubleCheck
    
      // }
      }); // end of getJson call
  }); // end of ready
})(jQuery); // end of jQuery