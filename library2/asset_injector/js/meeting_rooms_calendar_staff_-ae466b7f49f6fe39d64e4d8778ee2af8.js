        !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs=e()}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});
var openHour = 9;
console.log('hi');
        const containerHeight = 720;
        const containerWidth = 600;
        const minutesinDay = 60 * 12;
        let collisions = [];
        let width = [];
        let leftOffSet = [];
        var createEvent = (internal, mlocation, mtitle, height, top, left, units) => {
          let node = document.createElement("DIV");
          node.className = 'event room-' + mlocation;
            var room_name = '';
            switch(mlocation) {
                case '780':
                    var room_name = 'Austin History Center - Capacity: 60';
                    break;
                case '781':
                    var room_name = 'Carver Branch #1 - Capacity: 25';
                    break;
                case '782':
                        var room_name = 'Carver Branch #2 - Capacity: 100';
                      break;
                case '848':
                        var room_name = 'Carver Branch #1 & #2 - Capacity: 125';
                      break;
                case '783':
                    var room_name = 'Cepeda Branch #1 - Capacity: 30';
                    break;
                case '850':
                    var room_name = 'Cepeda Branch #1 & #2 - Capacity: 60';
                    break;
                case '849':
                    var room_name = 'Cepeda Branch #2 - Capacity: 30';
                    break;
                case '784':
                    var room_name = 'Hampton Branch at Oak Hill - Capacity: 70';
                    break;
                case '785':
                    var room_name = 'Howson Branch - Capacity: 40';
                    break;
                case '786':
                    var room_name = 'Little Walnut Creek Branch - Capacity: 50';
                    break;
                case '787':
                    var room_name = 'Menchaca Branch - Capacity: 75';
                    break;
                case '788':
                    var room_name = 'Milwood Branch - Capacity: 50';
                    break;
                case '789':
                    var room_name = 'North Village Branch - Capacity: 52';
                    break;
                case '790':
                    var room_name = 'Old Quarry Branch - Capacity: 60';
                    break;
                case '791':
                    var room_name = 'Pleasant Hill Branch #1 - Capacity: 20';
                    break;
                case '792':
                    var room_name = 'Pleasant Hill Branch #2 - Capacity: 50';
                    break;
                case '793':
                    var room_name = 'Ruiz Branch #1 - Capacity: 39';
                    break;
                case '794':
                    var room_name = 'Ruiz Branch #1 & #2 - Capacity: 78';
                    break;
                case '795':
                    var room_name = 'Ruiz Branch #2 - Capacity: 39';
                    break;
                case '796':
                    var room_name = 'Southeast Branch #1 - Capacity: 40';
                    break;
                case '797':
                    var room_name = 'Southeast Branch #1 & #2 - Capacity: 68';
                    break;
                case '798':
                    var room_name = 'Southeast Branch #2 - Capacity: 28';
                    break;
                case '799':
                    var room_name = 'Spicewood Springs Branch - Capacity: 65';
                    break;
                case '839':
                    var room_name = 'Terrazas Branch #1 - Capacity: 25';
                    break;
                case '800':
                    var room_name = 'Terrazas Branch #1 & #2 - Capacity: 50';
                    break;
                case '840':
                    var room_name = 'Terrazas Branch #2 - Capacity: 25';
                    break;
                case '801':
                    var room_name = 'Twin Oaks Branch #1 - Capacity: 20';
                    break;
                case '802':
                    var room_name = 'Twin Oaks Branch #1 & #2 - Capacity: 40';
                    break;
                case '803':
                    var room_name = 'Twin Oaks Branch #2 - Capacity: 20';
                    break;
                case '804':
                    var room_name = 'University Hills Branch #1 - Capacity: 40';
                    break;
                case '805':
                    var room_name = 'University Hills Branch #1 & #2 - Capacity: 80';
                    break;
                case '806':
                    var room_name = 'University Hills Branch #2 - Capacity: 40';
                    break;
                case '807':
                    var room_name = 'Willie Mae Kirk Branch - Capacity: 40';
                    break;
                case '808':
                    var room_name = 'Windsor Park Branch #1 - Capacity: 32';
                    break;
                case '809':
                    var room_name = 'Windsor Park Branch #1 & #2 - Capacity: 65';
                    break;
                case '810':
                    var room_name = 'Windsor Park Branch #2 - Capacity: 33';
                    break;
                case '811':
                    var room_name = 'Yarborough Branch - Capacity: 50';
                    break;
            }
           
            /*
            if(internal == '1') {
                mtitle = "Library Use";
            }
            */
                var timeStart = dayjs('2022-01-01 - ' + openHour + ':00').add(top,'minutes');
                var timeEnd = timeStart;
                    timeEnd = timeEnd.add(height,'minutes').format('h:mm A');

          node.innerHTML = "<span class='title'>" + mtitle + "</span> \
          <br><span class='location'>" + room_name + "</span> \
            <br><span class='time'>" + timeStart.format('h:mm A') + " - " + timeEnd + "</span>";
          node.style.height = height + "px";
          node.style.top = top + "px";
            node.style.left = left + "px";

          document.getElementById("events").appendChild(node);
        }

        function getAttributes(events) {
          width = [];
          leftOffSet = [];
          for (var i = 0; i < events.length; i++) {
            width.push(0);
            leftOffSet.push(0);
          }
          collisions.forEach((period) => {
            let count = period.reduce((a, b) => {
              return b ? a + 1 : a;
            })
            if (count > 1) {
              period.forEach((event, id) => {
                if (period[id]) {
                  if (count > width[id]) {
                    width[id] = count;
                  }
                }
                if (period[id] && !leftOffSet[id]) {
                  leftOffSet[id] = period[id];
                }
              })
            }
          });
        };
        function isOverlapping(event1, event2) {
    return event1.start < event2.end && event1.end > event2.start;
}

        var layOutDay = (events) => {
    var myNode = document.getElementById("events");
    getAttributes(events);
    // Sort events by their start time
    events.sort((a, b) => a.start - b.start);
    let eventColumns = [];
    let lastEventFinishTime = 0;
  
    events.forEach((event) => {
        let mtitle = event.mtitle;
        let mlocation = event.mlocation;
        let height = (event.end - event.start) / minutesinDay * containerHeight;
        let top = event.start / minutesinDay * containerHeight;
        let internal = event.internal;
  
        // Check if this event overlaps with the last event. If not, reset the columns.
        if (event.start >= lastEventFinishTime) {
            eventColumns = [];
        }
  
        // Find a column for this event where it doesn't overlap with any other events in the column
        let columnIndex = 0;
        while (true) {
            let hasOverlap = eventColumns[columnIndex] && eventColumns[columnIndex].some((columnEvent) => isOverlapping(columnEvent, event));
            if (!hasOverlap) {
                break;
            }
            columnIndex++;
        }
  
        // If no existing columns are free, create a new one
        if (!eventColumns[columnIndex]) {
            eventColumns[columnIndex] = [];
        }
  
        // Add the event to the column
        eventColumns[columnIndex].push(event);
        let left = 100 * columnIndex; // Update this according to your requirements
        let units = eventColumns[columnIndex].length;
  
        if (!top || top < 0) {
            height = height - Math.abs(top);
            top = 0;
        }
        createEvent(internal, mlocation, mtitle, height, top, left, units);
  
        // Update the last event finish time
        lastEventFinishTime = Math.max(lastEventFinishTime, event.end);
    });
};
async function loadNames() {
          const queryString = window.location.search;
          var pathArray = window.location.pathname.split('/');
          const urlParams = new URLSearchParams(queryString);
           var date_field = document.querySelector('#edit-date');
 
          if(urlParams.get('date')) {
              var mdate = urlParams.get('date');
              var this_dayjs = dayjs(mdate);
                  date_field.value = urlParams.get('date');

          } else {
              var mdate = ' ';
                 var this_dayjs = dayjs();
        date_field.value = this_dayjs.format('YYYY-MM-DD');

          }
            
               
            
            var day_min = this_dayjs.format('YYYY-MM-DD');
            var day_max = this_dayjs.format('YYYY-MM-DD');
            var calendar_url = '/meeting-rooms/calendar/staff?date=';
            var prev_link = calendar_url + this_dayjs.subtract(1,'day').format('YYYY-MM-DD');
            var request_url = '/meeting-rooms/request?date=';
            var day_link = request_url + this_dayjs.format('YYYY-MM-DD');
            console.log('my day_link')
            console.log(day_link)
            var next_link = calendar_url + this_dayjs.add(1,'day').format('YYYY-MM-DD');

            var fetch_this = '/mr_day.json?date[min]=' + day_min + '&date[max]=' + day_max;

                var footer_extra = document.querySelectorAll(".view-footer a");

          if(urlParams.get('room')) {
              fetch_this += '&room=' + urlParams.get('room');
              prev_link  += '&room=' + urlParams.get('room');
              next_link  += '&room=' + urlParams.get('room');
              day_link   += '&room=' + urlParams.get('room');

          }
            if(urlParams.get('loc')) {
                var events_half = document.getElementById('events');
                events_half.classList.add('half-width');
 
              fetch_this += '&loc=' + urlParams.get('loc');
                
              prev_link  += '&loc=' + urlParams.get('loc');
              next_link  += '&loc=' + urlParams.get('loc');
              day_link   += '&location=' + urlParams.get('loc');
              
              
              
var dnd = document.querySelector('#loc');

dnd.value = urlParams.get('loc');


          }



            document.getElementById('prev-date').setAttribute('href', prev_link); 
            document.getElementById('next-date').setAttribute('href', next_link); 
            document.getElementById('new-request').setAttribute('href', day_link); 
            document.getElementById('today-date').innerHTML = this_dayjs.format('dddd, MMMM D, YYYY');
            console.log('about to load: ' + fetch_this);
          const response = await fetch(fetch_this);
          const names = await response.text();
          events2 = JSON.parse(names);
          var len = events2.length,
            i;
          for (i = 0; i < len; i += 1) {
            var openHour = 9;
            var openOffset = dayjs('2022-01-01 - ' + openHour + ':00');
            var hours3 = parseInt(openOffset.format('H'));
            var minutes3 = parseInt(openOffset.format('m'));
            var total3 = (hours3 * 60) + minutes3;
            var newStart = dayjs('2022-01-01 - ' + events2[i].start);
            var newEnd = dayjs('2022-01-01 - ' + events2[i].end);
            var hours = parseInt(newStart.format('H'));
            var minutes = parseInt(newStart.format('m'));
            var total = (hours * 60) + (minutes);
            events2[i].start = total - total3;
            var hours2 = parseInt(newEnd.format('H'));
            var minutes2 = parseInt(newEnd.format('m'));
            var total2 = (hours2 * 60) + (minutes2);
            events2[i].end = total2 - total3;
          }
            console.log(events2);
          layOutDay(events2);
        }
        loadNames();

document.querySelector('#edit-date').addEventListener('change',function(){
                const queryString2 = window.location.search;
                        
    const urlParams2 = new URLSearchParams(queryString2);

    var go_to = '/meeting-rooms/calendar/staff?date=' + this.value;
    if(urlParams2.get('room')) {
              go_to   += '&room=' + urlParams2.get('room');
          }
            if(urlParams2.get('loc')) {
              go_to   += '&loc=' + urlParams2.get('loc');
          }

    window.location.href = go_to;
});

              document.querySelector('#loc').addEventListener('change',function(event){
  
                const queryString3 = window.location.search;
                        
    const urlParams3 = new URLSearchParams(queryString3);

    var go_to2 = '/meeting-rooms/calendar/staff?loc=' + event.target.value;
   // if(urlParams3.get('date')) {
              go_to2   += '&date=' + urlParams3.get('date');
     //     }
            

    window.location.href = go_to2;
});