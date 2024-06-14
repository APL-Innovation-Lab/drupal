!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs=e()}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});

  var resetTime = 1800000;
  var timeout = setTimeout("location.reload(true);",resetTime);
  function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout("location.reload(true);",resetTime);
  }
  resetTimeout();
  
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("edit-date").setAttribute("min", today);


  var dateInput = document.getElementById("edit-date");

  var today = new Date();
 
  var formattedToday = yyyy + '-' + mm + '-' + dd;



 
  
var pathArray = window.location.pathname.split('/');
var myRoom = pathArray[4];
var openHour = 9;
var base_url = '/slr/calendar/room/' + myRoom;
const containerHeight = 720;
const containerWidth = 600;
const minutesinDay = 60 * 12;
let collisions = [];
let width = [];
let leftOffSet = [];
function getRoomTid(room) {
  switch (room)
  {
  case '408':
    var room_tid = '3788';
    break;
  case '409':
    var room_tid = '3789';
    break;
  case '471':
    var room_tid = '3790';
    break;
  case '508':
    var room_tid = '3792';
    break;
  case '509':
    var room_tid = '3793';
    break;
  case '522':
    var room_tid = '3794';
    break;
  case '531':
    var room_tid = '3796';
    break;
  case '605':
    var room_tid = '3797';
    break;
  case '613':
    var room_tid = '3798';
    break;
  case '614':
    var room_tid = '3799';
    break;
  case '615':
    var room_tid = '3800';
    break;
  case '621':
    var room_tid = '3801';
    break;
  }
  return room_tid;
}
var room_tid = getRoomTid(myRoom);
var dt = new Date();
myTime = dt.getHours() - 1;
if(document.getElementById("hour" + myTime)) {
  const element = document.getElementById("hour" + myTime);
  element.scrollIntoView(); 
}
 


var createEvent = (slr_status1, mlocation, mtitle, height, top, left, units) =>
{
  let node = document.createElement("DIV");
  node.className = 'event status-' + slr_status1 + ' room-' + mlocation;
  //var room_name = getRoom(mlocation);

  var timeStart = dayjs('2023-01-01 - ' + openHour + ':00').add(top, 'minutes');
  var timeEnd = timeStart;
  timeEnd = timeEnd.add(height, 'minutes').format('h:mm A');
  node.innerHTML = "<span style='font-weight:bold' class='title'>" + mtitle + "</span> \
<br><span class='time'>" + timeStart.format('h:mm A') + " - " + timeEnd + "</span>";
  node.style.height = (height * 3/2) + "px";
  node.style.top = (top * 3/2) + "px";
  if (mlocation != '3787')
  {
  document.getElementById("events").appendChild(node);
  }
}

function getAttributes(events)
{
  width = [];
  leftOffSet = [];
  for (var i = 0; i < events.length; i++)
  {
  width.push(0);
  leftOffSet.push(0);
  }
  collisions.forEach((period) =>
  {
  let count = period.reduce((a, b) =>
  {
    return b ? a + 1 : a;
  })
  if (count > 1)
  {
    period.forEach((event, id) =>
    {
    if (period[id])
    {
      if (count > width[id])
      {
      width[id] = count;
      }
    }
    if (period[id] && !leftOffSet[id])
    {
      leftOffSet[id] = period[id];
    }
    })
  }
  });
};
var layOutDay = (events) =>
{
  var myNode = document.getElementById("events");
  //myNode.innerHTML = '';
  getAttributes(events);
  events.forEach((event, id) =>
  {
  let mtitle = event.mtitle;
  if (mtitle.includes('Library Use'))
  {
    mtitle = 'Library Use';
  }
  let mlocation = event.mlocation;
  let slr_status1 = event.slr_status;
  let height = (event.end - event.start) / minutesinDay * containerHeight;
  let top = event.start / minutesinDay * containerHeight;
  let end = event.end;
  let start = event.start;
  let units = width[id];
  if (!units)
  {
    units = 1
  };
  let left = (containerWidth / width[id]) * (leftOffSet[id] - 1) + 10;
  if (!left || left < 0)
  {
    left = 10
  };
  if (!top || top < 0)
  {
    height = height - Math.abs(top);
    top = 0;
  }
  createEvent(slr_status1, mlocation, mtitle, height, top, left, units);
  });
}
async function loadNames()
{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var base_urla = '/slr/calendar/room/'+ myRoom +'?date=';
  var base_urlb = '/slr/calendar/room/'+ myRoom;
  //var base_urlc = '/slr/request?date=';
  var js_base = '/slr_day.json?room='+room_tid;
  var go_tob = base_urlb;
  //var day_link = base_urlb;
  var date_field = document.querySelector('#edit-date');
  if (urlParams.get('date'))
  {
  date_field.value = urlParams.get('date');
  var mdate = urlParams.get('date');
  var this_dayjs = dayjs(mdate);
  base_urlb += '?date=' + urlParams.get('date');
  js_base += '&date=' + urlParams.get('date');
  }
  else
  {
      var prevDate = document.getElementById("prev-date");
    prevDate.style.display = "none";

  var mdate = ' ';
  var this_dayjs = dayjs();
  date_field.value = this_dayjs.format('YYYY-MM-DD');
  base_urlb += '?date=' + this_dayjs.format('YYYY-MM-DD');
  js_base += '&date=' + this_dayjs.format('YYYY-MM-DD');
  }

  // if the date is less than today, reload the page
 todayyy= dayjs().subtract(1, 'day');
if (this_dayjs.isBefore(todayyy)) {
  window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname;
}


  var my_lovely_url = js_base + '&tt=' + Date.now();
  var prev_link = base_urla + this_dayjs.subtract(1, 'day').format('YYYY-MM-DD');
  //var day_link = base_urlc + this_dayjs.format('YYYY-MM-DD');
  var next_link = base_urla + this_dayjs.add(1, 'day').format('YYYY-MM-DD');
if (urlParams.get('room'))
  {
  
let room_headers = document.getElementsByClassName('room-header');
  for (var i = 0; i < room_headers.length; i++)
  {
    room_headers[i].style.display = 'none';
  }
let room_events = document.getElementsByClassName('event');
  for (var i = 0; i < room_events.length; i++)
  {
    room_events[i].style.width = '100%';
  }
  
  base_urlb += '&room=' + urlParams.get('room');
  js_base += '&room=' + urlParams.get('room');
  prev_link += '&room=' + urlParams.get('room');
  next_link += '&room=' + urlParams.get('room');
//  day_link += '&room=' + urlParams.get('room');
  my_lovely_url += '&room=' + urlParams.get('room');
    document.getElementsByClassName('field--name-title')[0].innerHTML = 'Schedule - ' + getRoom(urlParams.get('room'));
  }
  document.getElementById('prev-date').setAttribute('href', prev_link);
  document.getElementById('next-date').setAttribute('href', next_link);
 // document.getElementById('new-request').setAttribute('href', '/slr/request');
  document.getElementById('today-date').innerHTML = 'Room ' + myRoom + ' - ' + this_dayjs.format('dddd, MMMM D');
  var day_of_the_week = this_dayjs.format('d');
  if (day_of_the_week == '1' || day_of_the_week == '2' || day_of_the_week == '3' || day_of_the_week == '4')
  {

  var open_extra = document.querySelectorAll(".open_extra")
  for (var i = 0; i < open_extra.length; i++)
  {
    open_extra[i].classList.add("active")
  }
  } else {
      var days = document.querySelectorAll(".days");
      for (var i = 0; i < days.length; i++) {
        days[i].style.height = "720px";
      }
  }
  var calendar_url = '/slr/calendar/room/'+ myRoom +'?date=';
  var prev_link = calendar_url + this_dayjs.subtract(1, 'day').format('YYYY-MM-DD');
 // var request_url = '/slr/request?date=';
 // var day_link = request_url + this_dayjs.format('YYYY-MM-DD');
  var next_link = calendar_url + this_dayjs.add(1, 'day').format('YYYY-MM-DD');
  const response = await fetch(my_lovely_url);
  const names = await response.text();
  events2 = JSON.parse(names);
  var len = events2.length,
  i;
  for (i = 0; i < len; i += 1)
  {
  var openOffset = dayjs('2023-01-01 - ' + openHour + ':00');
  var hours3 = parseInt(openOffset.format('H'));
  var minutes3 = parseInt(openOffset.format('m'));
  var total3 = (hours3 * 60) + minutes3;
  var newStart = dayjs('2023-01-01 - ' + events2[i].start);
  var newEnd = dayjs('2023-01-01 - ' + events2[i].end);
  var hours = parseInt(newStart.format('H'));
  var minutes = parseInt(newStart.format('m'));
  var total = (hours * 60) + (minutes);
  events2[i].start = total - total3;
  var hours2 = parseInt(newEnd.format('H'));
  var minutes2 = parseInt(newEnd.format('m'));
  var total2 = (hours2 * 60) + (minutes2);
  events2[i].end = total2 - total3;
  }
  layOutDay(events2);
  if (urlParams.get('room'))
  {
  
let room_headers = document.getElementsByClassName('room-header');
  for (var i = 0; i < room_headers.length; i++)
  {
    room_headers[i].style.display = 'none';
  }
let room_events = document.getElementsByClassName('event');
  for (var i = 0; i < room_events.length; i++)
  {
    room_events[i].style.left = '0';
    room_events[i].style.width = '100%';
  }
  
  base_urlb += '&room=' + urlParams.get('room');
  js_base += '&room=' + urlParams.get('room');
  prev_link += '&room=' + urlParams.get('room');
  next_link += '&room=' + urlParams.get('room');
  //day_link += '&room=' + urlParams.get('room');
  my_lovely_url += '&room=' + urlParams.get('room');
    document.getElementsByClassName('field--name-title')[0].innerHTML = 'Schedule - ' + getRoom(urlParams.get('room'));
  }
}
loadNames();
document.querySelector('#edit-date').addEventListener('change', function()
{
  
  
    var inputDate = new Date(this.value);
    var minDate = new Date(this.min);
    if(inputDate < minDate) {
      alert("The date should not be before " + this.min);
      this.value = this.min;
    }
      
  const queryString2 = window.location.search;
  const urlParams2 = new URLSearchParams(queryString2);
  var go_to = base_url + '?date=' + this.value;
  if (urlParams2.get('room'))
  {
  go_to += '&room=' + urlParams2.get('room');
  }
  if (urlParams2.get('loc'))
  {
  go_to += '&loc=' + urlParams2.get('loc');
  }
  window.location.href = go_to;
});

