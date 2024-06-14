(function($, jQuery) {
  $(document).ready(function() {

      console.log('hi6');
      
function getCsrfToken() {
  $.get(Drupal.url('session/token'))
    .done(function (data) {
      var csrfToken = data;
	  console.log('init');
	  console.log(csrfToken);
	  $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', csrfToken);
      }
    });
       


      return csrfToken;
    });
}
var csrfToken = getCsrfToken();

  
  
$('.check_overlap').click(function(e) {
e.preventDefault();
var date = $(this).attr('data-date');
var start = $(this).attr('data-start');
var end = $(this).attr('data-end');
var room = $(this).attr('data-room');
var id = $(this).attr('data-id');
var uuid = $(this).attr('data-uuid');
    
var is_holiday = 0;
    
  if ( date == '2021-12-23' || date == '2021-12-24' || date == '2021-12-25' || date == '2021-12-31' || date == '2022-01-01' || date == '2022-01-16' || date == '2022-01-17' || date == '2022-02-20' || date == '2022-02-21' || date == '2022-04-17' || date == '2022-05-29' || date == '2022-05-30' || date == '2022-06-19' || date == '2022-06-20' || date == '2022-07-04' || date == '2022-09-04' || date == '2022-09-05' || date == '2022-11-11' || date == '2022-11-24' || date == '2022-11-25' || date == '2022-12-23' || date == '2022-12-24' || date == '2022-12-25' || date == '2022-12-26' ) {
 is_holiday = 1;
 console.log('is a holiday');
 console.log(is_holiday);
      
 }   
    
    
var url = '/overlap.json?start=' + date + '+' + start + ':00&end=' + date + '+' + end + ':00&room=' + room + '&id=' + id + '&uuid=' + uuid;

$.getJSON(url, function(json) {
	console.log(json);
var today = new Date();
var current_date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
console.log(current_date);
	//if(json.length) {
		var myjson = '{"data": {"type": "room_reservation","id": "' + uuid + '","attributes": {"field_checked_for_conflicts": "' + current_date + '"},"relationships": {"field_conflicting_reservations": {"data": [';

		$.each(json, function(i, item) {
			var overlap = 0;
			var i = 0;
			                        switch ( room ) {
                          case "781":
                         // case "782":
                            if ( item.room == room || item.room == '848' ) {
                              overlap = 1;
                            }
                            break;
                          case "848":
                            if ( item.room == room || item.room == '781' || item.room == '782' ) {
                              overlap = 1;
                            }
                            break;
						   case "783":
						   case "849":
							if ( item.room == room ||  item.room == '850'	) {
								overlap = 1;
							}
							break;
						   case "850":
							if ( item.room == room ||  item.room == '783' ||  item.room == '849') {
								overlap = 1;
							}
							break;
						   case "793":
						   case "795":
							if ( item.room == room ||  item.room == '794'	) {
								overlap = 1;
							}
							break;
						   case "794":
							if ( item.room == room ||  item.room == '793' ||  item.room == '795') {
								overlap = 1;
							}
							break;
							case "796":
						   case "798":
							if ( item.room == room ||  item.room == '797'	) {
								overlap = 1;
							}
							break;
						   case "797":
							if ( item.room == room ||  item.room == '796' ||  item.room == '798') {
								overlap = 1;
							}
							break;
						case "839":
						   case "840":
							if ( item.room == room ||  item.room == '800'	) {
								overlap = 1;
							}
							break;
						   case "800":
							if ( item.room == room ||  item.room == '839' ||  item.room == '840') {
								overlap = 1;
							}
							break;
						case "801":
						   case "803":
							if ( item.room == room ||  item.room == '802'	) {
								overlap = 1;
							}
							break;
						   case "802":
							if ( item.room == room ||  item.room == '801' ||  item.room == '803') {
								overlap = 1;
							}
							break;
							case "804":
						   case "806":
							if ( item.room == room ||  item.room == '805'	) {
								overlap = 1;
							}
							break;
						   case "805":
							if ( item.room == room ||  item.room == '804' ||  item.room == '806') {
								overlap = 1;
							}
							break;
							case "808":
						   case "810":
							if ( item.room == room ||  item.room == '809'	) {
								overlap = 1;
							}
							break;
						   case "809":
							if ( item.room == room ||  item.room == '808' ||  item.room == '810') {
								overlap = 1;
							}
							break;
                          default:
                            if ( item.room == room ) {
                              overlap = 1;
                            }
                        }
			if(overlap) {
				// do this if it's a conflict of the same room+
				myjson += '{"type": "room_reservation","id": "' + item.id + '"},';
				i++;
			}
		}); // each
		myjson = myjson.replace(/,$/, '');
		myjson += ']}}}}';
		console.log(myjson);
    
    //at this point, ask the object if there are any congflicts, and if so, add that attribute to the object
    
 var myArr = JSON.parse(myjson);
    
    console.log(myArr);
    
    if(myArr.data.relationships.field_conflicting_reservations.data.length > 0 || is_holiday > 0)
        {
            // yay, it noticed the conflict and so the length is more than 0
            console.log('conflict!');
            myArr.data.attributes.field_room_status = '2';
        }
    
var myJSON2 = JSON.stringify(myArr);

		var entity_url = '/aplapi/room_reservation/' + uuid;
		$.ajax({
			url: entity_url,
			data: myJSON2,
			method: 'PATCH',
			headers: {
				'Authorization':'Basic YXBsYXBpOmFwbGFwaQ==',
				'Accept':'application/vnd.api+json',
				'Content-Type':'application/vnd.api+json'
			},
			success: function (node) {
				console.log(node);
				} // success
		}); // ajax
	//} // if json.length
}); // getJSON
		  
}); // click

var ii = 0;
	$('.check_overlap').each(function(e) {
        ii++;
        console.log($('.check_overlap')[e]);
            setTimeout(function () { 
        		$('.check_overlap')[e].click();
            }, 500 * ii);
	});
  }); // ready
})(jQuery);