var GroupCamp = 4;

var stxtEmpID = "";
var stxtEmpName = "";
var stxtEmpPhone = "";
var stxtEmpGroup = "";
var db = "";
var dbBootCamp = "";
var dbBootMember = "";
var CheckFoundData = 0;
var Eid = "";
var EidBootCamp = ""; 
var EidBootRegister = ""; 
var EidBootMember = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var sDateRegister = "";
var i = 0;
const x = document.querySelectorAll(`div.com[min="${i}"]`);
var sCheckOpen = "";
var sCampRound = "";
var sDateTime = ""; 
var sLINERegister = "";
var sATK = "";
var xRound = "";
var parts = [];
var parts1 = [];
parts = xRound.split("-"); //สร้างString arry ชื่อparts
var FinalRound = parts[0]; // 004  //String part1 เก็บค่าparts[0]
var FinalRoundSplit = parts[1]; // 004  //String part1 เก็บค่าparts[0]
var xEmpSize = "";
var eSpace = "";


$(document).ready(function () {
  //sessionStorage.clear();
  sessionStorage.setItem("EmpTable", 0);
  sessionStorage.setItem("EmpSize", '');

  /*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile1").html(str);  
  $("#MyProfile").html(str);  
  Connect_DB();
 */  

  main()
});



async function main() {
  await liff.init({ liffId: "1657509542-Yzw1VKvp" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  //str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  $("#MyProfile1").html(str);  
  Connect_DB();
  //CheckBootCampOpen();
}



function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore().collection("CheckProfile");
  dbBootCamp = firebase.firestore().collection("BootCamp");
  dbBootRegister = firebase.firestore().collection("BootRegister");
  dbBootMember = firebase.firestore().collection("BootMember");
  //dbVaccineUser = firebase.firestore().collection("Vaccine");
  CheckEmpID();
  CheckBootCampOpen();
  //CheckData();
}


function CheckEmpID() {
  db.where('lineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("EmpID", doc.data().empID);
    });
  });
}


function CheckBootCampOpen() {
  var str = "";
  dbBootCamp.where('CampStatus','==',GroupCamp)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootCamp = doc.id;
      xRound = doc.data().EmpType;
      sEmpType = doc.data().EmpType;
      sCheckOpen = doc.data().CampName;
      sCampRound = doc.data().CampRound;
      simg_reg = doc.data().img_reg;
      //sLINERegister = doc.data().LINERegister;
      //sessionStorage.setItem("EmpID", doc.data().EmpID);
      sessionStorage.setItem("CampName", doc.data().CampName);
      //alert(xRound);
    });
    if(xRound!="") { 
      CheckData();
      CheckRegister();
    } else {
      RegisterClose();
    }
  });
}


var xCheckRegister = 0; 
function CheckRegister() {
  var str = "";
  dbBootRegister.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('CampRound','==',xRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckRegister = 1;
      EidBootRegister = doc.id;
      sDateTime = doc.data().DateTime;
      sessionStorage.setItem("EmpID", doc.data().EmpID);
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("CheckPass", doc.data().DateTime);
      sessionStorage.setItem("EmpGroup", doc.data().EmpRH);
      sessionStorage.setItem("EmpMember", doc.data().EmpMember);
      sessionStorage.setItem("PreRegister", doc.data().PreRegister);
      sessionStorage.setItem("DateTime", doc.data().DateTime);
      document.getElementById('OpenBootCamp').style.display='none';
      document.getElementById('myRegister').style.display='none';
      document.getElementById('myTimer').style.display='block';
    });
    if(EidBootRegister=="") {
      CheckMember();
      document.getElementById('loading').style.display='none';
      document.getElementById('gotoLink').style.display='block';
      document.getElementById('OpenRegister').style.display='block';
    } else {
      if(sessionStorage.getItem("LineID")!=null && sessionStorage.getItem("LineID")!=null ) {
        if(sessionStorage.getItem("DateTime")=="") {
          SaveUpdate();
        //} else {
        //  alert("Date Time not null");
        }
      }
      CheckMember();
      //WaitingPage();
    }
  });
}

function CheckMember() {
  NewDate();
  dbBootMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .where('EmpType','==',sCampRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootMember = doc.id;
      xEmpType = doc.data().EmpType;
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      //sessionStorage.setItem("EmpGroup", doc.data().EmpBranch);
      sessionStorage.setItem("EmpTable", doc.data().EmpTable);
      sessionStorage.setItem("TimeRegister", doc.data().TimeRegister);
      sessionStorage.setItem("EmpMember", 1);
      sessionStorage.setItem("EmpSize", doc.data().EmpSize);

      if(doc.data().StatusRegister==0) {
        dbBootMember.doc(EidBootMember).update({
          LineID : sessionStorage.getItem("LineID"),
          LineName : sessionStorage.getItem("LineName"),
          LinePicture : sessionStorage.getItem("LinePicture"),
          StatusRegister : 1,
          TimeIN : dateString
        });        
      }
    });
  });
}




function SaveUpdate() {
  //alert("Save Member");
/**/

  var eEmpGroup = "other";
  var TimeStampDate = Math.round(Date.now() / 1000);
  NewDate();
  sDateTime = dateString;
  sessionStorage.setItem("CheckPass", sDateTime);
  dbBootRegister.doc(EidBootRegister).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    StatusRegister : 1,
    TimeStamp : TimeStampDate,
    TimegetBox : eSpace,
    DateTime : dateString
  });
  if(EidBootMember!="") {
    dbBootMember.doc(EidBootMember).update({
      StatusRegister : 1,
      TimeIN : dateString,
      TimeStampRec : TimeStampDate
    });
  }
}


function WaitingPage() {
  document.getElementById('OpenRegister').style.display='none';
  document.getElementById('loading').style.display='none';
  document.getElementById('myDisplayLine').style.display='none';
  document.getElementById('myRegister').style.display='none';
  //document.getElementById('myTimer').style.display='block';
  if(xCheckRegister==1) {
    document.getElementById('OpenRegister').style.display='none';
    document.getElementById('BootCampLoading').style.display='none';
  }
  var str = "";
  var xEmpType = "";
  dbBootMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .where('EmpType','==',sCampRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootMember = doc.id;
      xEmpType = doc.data().EmpType;
      //sessionStorage.setItem("EmpID", doc.data().EmpID);
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("EmpMember", 1);
      xEmpSize = doc.data().EmpSize;
    });
    //str +='<div class="title_container"><div class="title-head">ttb Registration System</div></div>';
    //str +='<div class="profile-txt" style="margin-top:-25px;font-size:12px;">'+ sessionStorage.getItem("CampName") +'</div>';
    //str +='<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
    //str +='<div class="profile-txt">'+ sessionStorage.getItem("LineName") +'</div>';
    str +='<div style="color:#fff;font-weight: 600; margin-bottom:10px;">คุณ'+sessionStorage.getItem("EmpName")+'</div>';
    if(xEmpType!="") {
      str +='<div class="profile-txt1" style="line-height: 1.3;color:#ffff00;font-size:13px; font-weight:600;">คุณได้ลงทะเบียนเพื่อเข้าร่วมกิจกรรม<br><font color="#0056ff">'+sessionStorage.getItem("CampName")+'</font></div>';
    } else {
      str +='<div class="profile-txt1" style="line-height: 1.3;color:#ffff00;font-size:13px; font-weight:600;">คุณได้ลงทะเบียนเพื่อเข้าร่วมกิจกรรม<br><font color="#0056ff">'+sessionStorage.getItem("CampName")+'</font></div>';
    }
    if(xEmpSize!="") {
      str +='<div class="profile-txt1" style="color:#ccc; font-size:12px; margin-top:12px;">หมายเลขที่นั่งของคุณคือ</div>';
      str += '<div style="font-size:18px; font-weight:600; color:#fff; background:#0056ff; margin:2px 20% 6px 20%; padding-top:8px; padding-bottom:10px; border-radius:8px;">'+xEmpSize+'</div>';
    }

    if(sDateTime!="") {
      str +='<div style="color:#000;font-size:11px;font-weight: 600;">ลงทะเบียนเมื่อ : '+ sDateTime +'</div>';
    }
    //if(sessionStorage.getItem("ATKimg")!=null) {
    //  str +='<div class="btn-t4" onclick="showATK()" style="margin-top:10px;width:230px;font-size:11px;">แสดงผล ATK ก่อนเข้างาน</div>';
    //} else {
    //  str +='<div class="btn-t4" style="margin-top:10px;width:230px;background:#ddd;cursor:default;color:#999;font-size:11px;">แสดงผล ATK ก่อนเข้างาน</div>';
    //}
    str +='<div class="btn-t1" onclick="GotoDetail()" style="margin-top:15px;">ดูกำหนดการจัดกิจกรรม</div><div class="clr" style="height:35px;"></div>';
    //str +='</div></center>';
    $("#MyWating").html(str);    

  });
}


function GotoDetail() {
  location.href = "agenda.html";
}


function CheckData() {
  document.getElementById('BootCampLoading').style.display='none';
  db.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      sessionStorage.setItem("EmpPhone", doc.data().empPhone);
      //sessionStorage.setItem("EmpGroup", doc.data().empRH);
      //alert("Line302="+sessionStorage.getItem("EmpGroup"));
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById("txtEmpName").value = doc.data().empName;
      document.getElementById("txtEmpGroup").value = doc.data().empRH;
      WaitingPage();
    });
    if(document.getElementById("txtEmpID").value!="") {
      $("#test *").attr("disabled", "disabled").off('click');
      $('#txtEmpGroup').prop('disabled', false);
      $('#a1').prop('disabled', false);
      $('#a2').prop('disabled', false);
      $('#a3').prop('disabled', false);
    }
  });
}


function KeyRegister() {
    document.getElementById('OpenRegister').style.display='none';
    document.getElementById('DisplayLogo').style.display='none';
    document.getElementById('loading').style.display='none';
    document.getElementById('myRegister').style.display='block';
    OpenForm();
}


function OpenForm() {
  //CheckVaccine();
  if(CheckFoundData==1) {
    document.getElementById('OpenBootCamp').style.display='none';
    document.getElementById('myRegister').style.display='none';
    document.getElementById('myTimer').style.display='block';
    document.getElementById('myDisplayLine').style.display='none';
  } else {
    document.getElementById('OpenBootCamp').style.display='none';
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
    document.getElementById('myDisplayLine').style.display='none';
  }
}


var sCheckBottom = 0;
function ClickSaveProfile() {
  //document.getElementById('loading').style.display='block';
  sCheckBottom = 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpGroup = document.getElementById("txtEmpGroup").value;
  stxtATK = "Negative";
  //stxtATK = document.getElementById("txtATK").value;Negative
  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpGroup !== null && stxtEmpGroup !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtATK !== null && stxtATK !== '') { sCheckBottom = sCheckBottom+1; }
  //if(sessionStorage.getItem("ATKimg") !== null) { sCheckBottom = sCheckBottom+1; }
  if(sCheckBottom==4) {
    sATK = "Negative";
    //sATK = document.getElementById("txtATK").value;
    sessionStorage.setItem("EmpID", document.getElementById("txtEmpID").value);
    sessionStorage.setItem("EmpGroup", document.getElementById("txtEmpGroup").value);
    document.getElementById('loading').style.display='block';
    CheckMember();
    SaveData();
  } else {
    alert("คุณยังกรอกข้อมูลไม่ครบถ้วน");
  }
}



function SaveData() {
  document.getElementById('loading').style.display='block';
  var eEmpGroup = "other";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  sDateTime = dateString;
  sessionStorage.setItem("CheckPass", sDateTime);
  if(document.getElementById("txtEmpGroup").value!="OTHER") {
    eEmpGroup = "BBD";
  } 
  if(Eid=="") {
    db.add({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empBr : eEmpGroup,
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      memo : eSpace,
      empAddress : eSpace,
      DateRegister : dateString
    });
  } else {
    db.doc(Eid).update({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empBr : eEmpGroup,
      DateRegister : dateString
    });
  }
  if(EidBootRegister=="") {
    if(sessionStorage.getItem("EmpMember")==null) {
      sessionStorage.setItem("EmpMember", 0);
    }
    dbBootRegister.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : document.getElementById("txtEmpID").value,
      EmpName : document.getElementById("txtEmpName").value,
      EmpRH : document.getElementById("txtEmpGroup").value,
      ATK : "Negative",
      //ATK : document.getElementById("txtATK").value,
      //ATKimg : sessionStorage.getItem("ATKimg"),
      EmpMember : parseInt(sessionStorage.getItem("EmpMember")),
      PreRegister : 0,
      EmpTable : parseInt(sessionStorage.getItem("EmpTable")),
      EmpSize : sessionStorage.getItem("EmpSize"),
      PreDateTime : eSpace,
      StatusRegister : 1,
      TimegetBox : eSpace,
      CampRound : sCampRound,
      EmpType : sEmpType,
      TimeStamp : TimeStampDate,
      DateTime : dateString
    });
  document.getElementById('loading').style.display='none';
  }
  //alert("EidBootMember="+EidBootMember);
 
  if(EidBootMember!="") {
    dbBootMember.doc(EidBootMember).update({
      StatusRegister : 1,
      TimeIN : dateString,
      //TimeRegister : "",
      TimeStampRec : TimeStampDate
    });
  }
  CheckRegister();
  document.getElementById('myRegister').style.display='none';
  document.getElementById('DisplayLogo').style.display='block';
  //WaitingPage();
}

/*
function showATK() {
//alert("Line424="+sessionStorage.getItem("EmpGroup"));
  var str = "";
  str +='<div class="title_container"><div class="title-head">ttb Registration System';
  str +='<div style="font-size:13px;color:#f68b1f;">แสดงผล ATK สำหรับเข้าร่วมงาน</div></div></div>';
  str +='<div class="profile-txt" style="margin-top:-25px;font-size:12px;">สำหรับ : '+ sessionStorage.getItem("CampName") +'</div>';
  //str +='<div><img src="'+ sessionStorage.getItem("ATKimg") +'" style="width:370px;"></div>';
  str +='<div style="padding:10px;color:#002d63;font-weight: 600;">แจ้งผล ATK เป็น : <font color="#f68b1f">'+sATK+'</font></div>';
  str +='<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-member" style="width:60px;"></div>';
  str +='<div style="color:#0056ff;font-weight: 600;margin-top:15px;">คุณ'+sessionStorage.getItem("EmpName")+'</div>';
  str +='<div style="color:#0056ff;">สังกัด : '+sessionStorage.getItem("EmpGroup")+'</div>';
  str +='<div style="color:#999;font-size:11px;font-weight: 300;">ลงทะเบียนเมื่อ : '+sDateTime+'</div>';
  str +='<div class="btn-t1" onclick="showRegister()" style="margin-top:10px;width:230px;font-size:11px;">ดูข้อมูลผู้ลงทะเบียน</div>';
  $("#MyWating").html(str);    
}

function showRegister() {
  document.getElementById('myDisplayLine').style.display='none';
  document.getElementById('myRegister').style.display='none';
  document.getElementById('myTimer').style.display='block';
  var str = "";
  var sCountID = 0;
  str +='<div class="title-head">ttb Registration System</div>';
  str +='<div class="profile-txt" style="font-size:12px;margin-top:-10px;">'+ sessionStorage.getItem("CampName") +'</div>';
  str +='<div id="DisplayCountRegister" style="margin-bottom: 15px;"></div>';
  dbBootRegister.where('CampRound','==',xRound)
  .where('StatusRegister','==',1)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      sCountID = sCountID+1;
      str += '<div class="box-member" style="width:61px;height:80px;overflow:hidden;float: left;" onclick="OpenRegister(\''+ doc.id +'\')">';
      str += '<div><img src="'+ doc.data().LinePicture +'" class="img-register"></div>';
      str += '<div class="clr txt-member" style="font-size:10px;line-height:1.2;">'+ doc.data().LineName +'</div></div>';
    });
    //if(sessionStorage.getItem("ATKimg")!=null) {
    //  str +='<div class="btn-t4" onclick="showATK()" style="margin-top:10px;width:250px;font-size:11px;">แสดงผล ATK ก่อนเข้างาน</div>';
    //}
    $("#MyWating").html(str);    
    $("#DisplayCountRegister").html("<div>จำนวนลงทะเบียน : "+sCountID+" คน</div>");  
  });
}
*/


function RegisterClose() {
  document.getElementById('loading').style.display='none';
  document.getElementById('BootCampLoading').style.display='none';
  document.getElementById('BootCampClose').style.display='block';
  //alert(sessionStorage.getItem("EmpID"));
}


function OpenRegister(x) {
  var str = "";
  dbBootRegister.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div style="margin-top:0px;"><img src=\''+ doc.data().LinePicture +'\' class="img-member-true" style="width:120px;height:120px;border-radius:50%;box-shadow: 0px 0px 6px 5px rgba(178,178,178,0.17);">';
      str += '<div class="txt-member1" style="padding-top: 6px;color:#f68b1f">'+doc.data().LineName+'</div>';
      str += '<div style="margin-top:20px;font-size:13px;font-weight: 600;color:#0056ff;">คุณ'+doc.data().EmpName+'</div>';
      str += '<div style="color:#002d63;">ลงทะเบียนกิจกรรม<br>'+sessionStorage.getItem("CampName")+'</div>';
      str += '<div style="color:#999;font-size:11px;">ลงทะเบียนเมื่อ '+doc.data().DateTime+'</div>';
    });
    $("#DisplayUser").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
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
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


