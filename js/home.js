var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var ShortDate = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Moon2023")==null) { location.href = "index.html"; }
  Connect_DB();
  dbGiftRewards = firebase.firestore().collection("GiftNewYear2567");
  dbCardNewyear = firebase.firestore().collection("NewyearCard2567");
  OpenMP4();
  //StartGame();LoyKrathong
  //CheckSelect();
});


function OpenMP4() {
  /*
  if(sessionStorage.getItem("DisplayVideo")==null) { 
    sessionStorage.setItem("DisplayVideo", 'Video');
    var vid = document.getElementById("video");
    vid.autoplay = true;
    vid.load();
    document.getElementById('id03').style.display='block';
  }
  if(sessionStorage.getItem("DisplayDemo")==null) { 
    sessionStorage.setItem("DisplayDemo", 'Video');
    document.getElementById('id03').style.display='block';
  }
  */
  CountCard();
  DisplayUser();
}


function CountCard() { 
  var i = 0;
  dbCardNewyear
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
    });
    $("#CountUser").html("ขณะนี้มีคำทำนายแล้ว <span class='font18'>"+ addCommas(i) +"</span> รายการ");
  });  
}


function DisplayUser() {
  var str = "";
  dbCardNewyear
  .orderBy('TimeStampDate','desc')
  //.limit(12)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      str += '<img src="'+ doc.data().LinePicture +'" class="Profile-img" onclick="ClickUser(\''+ doc.id+'\')" onerror="javascript:imgError(this)" title="'+ doc.data().EmpName +'">';
    });
    $("#ShowUser").html(str);
    document.getElementById('loading').style.display='none';
    document.getElementById('ShowCard').style.display='block';
  }); 
}


function ClickUser(x) {
  $("#DisplayCard").html(cleararray);
  var str = "";
  NewDate();
  dbCardNewyear.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckView = doc.data().LoyViewPage + 1;
      str += '<center><div style="width:100%; max-width: 350px; margin-top:20px;"><img src="./img/a-01.jpg" style="width:100%; border-top-left-radius: 20px; border-top-right-radius: 20px;"></div>';
      str += '<div style="width:100%; max-width: 350px; background-image: url(./img/a-03.jpg); height:310px; margin-top:-10px; margin-bottom:-2px;">';
      str += '<div style="padding-top:10px; font-weight:600; color:#000; font-size:14px;">เ ซี ย ม ซี ใ บ ที่ '+ doc.data().LoySelect1 +'</div>';
      str += '<div style="padding:20px 30px 20px 30px; color:#000; font-weight:600; font-size:14px;">'+ doc.data().LoySelect2 +'</div>';
      str += '<div><img src="'+ doc.data().LinePicture +'" class="add-profile" style="width:70px; height:70px" onerror="javascript:imgError(this)"></div>';
      str += '<div style="font-size:14px; padding-top:8px; font-weight:600;">'+ doc.data().LineName +'</div>';
      str += '<div style="font-size:11px;">'+ doc.data().DateRegister +'<br>จำนวนผู้ชม : '+ xCheckView +' ครั้ง</div>';
      str += '</div>';
      str += '<div style="width:100%; max-width: 350px;">';
      str += '<div style="position: absolute;max-width: 350px;"><img src="./img/a-02.jpg" style="width:100%;border-bottom-left-radius: 20px; border-bottom-right-radius:20px;"></div>';
      str += '<div class="btn-t2" style="position: relative; margin-top:20px;background: #ff0000; border:2px solid #fff; color:#fff;" onclick="CloseAll()">ปิดหน้าต่าง</div>';
      str += '</div></center>';
    });
    dbCardNewyear.doc(x).update({
      LoyViewPage : xCheckView
    });
    document.getElementById('id02').style.display='block';
    $("#DisplayCard").html(str);
  });
}


/*
function download() {
  //var img = loadImage('./map/map-1.jpg', callback);
  console.log(document.getElementById("DisplayCard"));
  html2canvas(document.getElementById("DisplayCard")).then(function(canvas) {
    document.body.appendChild(canvas);
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "./map/map-1.jpg";
    link.href = image;
    link.click();
  });
 }
*/

function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.png";
    return true;
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  ShortDate = day + "/" + month + "/" + year ;
}

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GotoGame() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  location.href = "game.html";
}

function GotoCard() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  location.href = "online.html";
}

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function CloseAll() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  //document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}


function CloseVDO() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  document.getElementById('id03').style.display='none';
  CheckData();
}

function Song1() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;

  //CloseVDO();
  //var vid = document.getElementById("myaudio1");
  //vid.autoplay = true;
  //vid.load();
  document.getElementById('id03').style.display='none';
  //window.location.href='history.html#A';
}
