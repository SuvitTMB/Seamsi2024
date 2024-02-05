var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = 0;
var timerId = "";
/*
var CheckPage = 0;
var CountAllCard = 0;
var Select1 = 99;
var Select2 = 99; 
var Select3 = 99;
var Select4 = 99;
var Select5 = 99;
var FriendName = "";
var MemotoFriend = "";
var MemotoFriend1 = "";
var MapLoyKrathong = "";
var LoyFriendName = "";
var ShortDate = "";
*/

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Moon2023")==null) { location.href = "index.html"; }
  Connect_DB();
  dbNewYearCard = firebase.firestore().collection("NewyearCard2567");
  CheckSeamsi();
  //StartGame();
});


var SaeamsiID = "";
function CheckSeamsi() {
  var Xcheck = 0;
  var str = "";
  dbNewYearCard.where('EmpID','==',sessionStorage.getItem("EmpID_Moon2023"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      Xcheck = 1;
      SaeamsiID = doc.id;
      str += '<div style="width:100%; max-width: 320px; margin-top:20px;"><img src="./img/a-01.jpg" style="width:100%"></div>';
      str += '<div style="width:100%; max-width: 320px; background-image: url(./img/a-03.jpg); height:310px; margin-top:-10px; margin-bottom:-2px;">';
      str += '<div style="padding-top:10px; font-weight:600; color:#000; font-size:14px;">เ ซี ย ม ซี ใ บ ที่ '+ doc.data().LoySelect1 +'</div>';
      str += '<div style="padding:20px 30px 20px 30px; color:#000; font-weight:600; font-size:14px;">'+ doc.data().LoySelect2 +'</div>';
      str += '<div><img src="'+ doc.data().LinePicture +'" class="add-profile" style="width:70px; height:70px" onerror="javascript:imgError(this)"></div>';
      str += '<div style="font-size:14px; padding-top:8px; font-weight:600;">'+ doc.data().EmpName +'</div>';
      str += '<div style="font-size:11px;">'+ doc.data().DateRegister +'</div>';
      str += '</div>';
      str += '<div style="width:100%; max-width: 320px;">';
      str += '<div style="position: absolute;max-width: 320px;"><img src="./img/a-02.jpg" style="width:100%"></div>';
      str += '<div class="btn-t2" style="position: relative; margin-top:20px;background: #ff0000; border:2px solid #fff; color:#fff;" onclick="OpenSeamsi()">เลือกใหม่อีกครั้ง เอาที่สบายใจ</div>';
      str += '</div>';
      str += '<div class="btn-t2" style="margin-top:40px;background: #f68b1f; border:2px solid #fff; color:#fff;margin-bottom:50px;" onclick=location.href="home.html">หน้าแรก</div>';
      $("#ShowDisplay").html(str);

    });
    document.getElementById('loading').style.display='none';
    if(Xcheck==0) {
      StartGame();
    }
    document.getElementById('ShowDisplay').style.display='block';
    //GetCodeRandom(NewRewards[0], NewRewards[1], NewRewards[2]);
  }); 
}


function StartGame() {
  var str = "";
  str += '<div style="text-align:center;margin-top:60px;"><img src="./img/Seamasi-08.png" style="width:150px;"></div>';
  str += '<div onclick="OpenSeamsi()"><img src="./img/Seamasi-09.png" style="width:260px;"></div>';
  $("#ShowDisplay").html(str);
}

var MapSaeamsi = "";
function OpenSeamsi() {
  var str = "";
  str += '<div style="text-align:center;margin-top:40px;"><img src="./img/siamsee.gif" style="width:300px;"></div>';
  str += '<div style="color:#fff; margin:10px auto;">อธิฐานซิ ...</div>';
  $("#ShowDisplay").html(str);
  MapSaeamsi = random_item(arrTextMemo);
  console.log(MapSaeamsi);
  timerId = setInterval(ShowSeamsi, 4000); 
}


function ShowSeamsi() {
  //console.log("MapSaeamsi="+MapSaeamsi[0]);
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  if(SaeamsiID=="") {
    dbNewYearCard.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Moon2023"),
      EmpName : sessionStorage.getItem("EmpName_Moon2023"),
      LoySelect1 : MapSaeamsi[1],
      LoySelect2 : MapSaeamsi[2],
      //LoyMemotoFriend : MapSaeamsi[2],
      //LoySelect3 : Select3,
      //LoyFriendName : FriendName,
      //LoyMapLoyKrathong : MapLoyKrathong,
      DateRegister : dateString,
      LoyViewPage : 0,
      TimeStampDate : TimeStampDate
    });
  } else {
    dbNewYearCard.doc(SaeamsiID).update({
      linename : sessionStorage.getItem("LineName"),
      LoySelect1 : MapSaeamsi[1],
      LoyMemotoFriend : MapSaeamsi[2],
      DateRegister : dateString,
      LoyViewPage : 0,
      TimeStampDate : TimeStampDate
    });
  }
  /*
  */
  document.getElementById('ShowDisplay').style.display='none';
  clearTimeout(timerId);
  var str = "";
  var str1 = "";
  str += '<div style="width:100%; max-width: 320px; margin-top:20px;"><img src="./img/a-01.jpg" style="width:100%"></div>';
  str += '<div style="width:100%; max-width: 320px; background-image: url(./img/a-03.jpg); height:310px; margin-top:-10px; margin-bottom:-2px;">';
  str += '<div style="padding-top:10px; font-weight:600; color:#000; font-size:14px;">เ ซี ย ม ซี ใ บ ที่ '+ MapSaeamsi[1] +'</div>';
  str += '<div style="padding:20px 30px 20px 30px; color:#000; font-weight:600; font-size:14px;">'+ MapSaeamsi[2] +'</div>';
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="width:70px; height:70px" onerror="javascript:imgError(this)"></div>';
  str += '<div style="font-size:14px; padding-top:8px; font-weight:600;">'+ sessionStorage.getItem("EmpName_Moon2023") +'</div>';
  str += '<div style="font-size:11px;">'+ dateString +'</div>';
  str += '</div>';
  str += '<div style="width:100%; max-width: 320px;">';
  str += '<div style="position: absolute;max-width: 320px;"><img src="./img/a-02.jpg" style="width:100%"></div>';
  str += '<div class="btn-t2" style="position: relative; margin-top:20px;background: #ff0000; border:2px solid #fff; color:#fff;" onclick="OpenSeamsi()">เลือกใหม่อีกครั้ง เอาที่สบายใจ</div>';
  str += '</div>';
  str += '<div class="btn-t2" style="margin-top:40px;background: #f68b1f; border:2px solid #fff; color:#fff;margin-bottom:50px;" onclick=location.href="home.html">หน้าแรก</div>';
  $("#ShowDisplay").html(str);
  str1 += '<div style="padding:20px 10px 40px 10px; height: 90px; color:#fff;">คุณได้เซียมซีใบที่<div style="font-weight: 600; color:#fff; font-size:50px; ">'+ MapSaeamsi[1] +'</div></div>';
  $("#DisplayNumber").html(str1);
  document.getElementById('ShowDisplay').style.display='block';
  document.getElementById('id01').style.display='block';
}


function random_item(items) {
  //console.log(items);
  return items[Math.floor(Math.random()*items.length)];   
  //SaveReward();
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


function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.png";
    return true;
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
  /*
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
  document.getElementById('id05').style.display='none';
  */
}
