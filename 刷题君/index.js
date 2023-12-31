var rowData;
var excelData; // 保存 Excel 数据
var currentRow = 1; // 当前行数
var answerTime = 40;//答题时间
$(document).ready(function() {
  
  // 读取 Excel 文件
  function readExcelFile(evt) {
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      
      excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      currentRow = 1;
    };
    reader.readAsArrayBuffer(file);
  }

  // 监听选择文件的事件
  $('#fileInput').change(readExcelFile);
  $(document).keydown(function(event) {
    if (event.keyCode === 13) {
      $("#startbtn").click();
    }
  });
});

$('#startbtn').click(function(){
  // var cdTime = parseInt($('#countDown').text());
    nextQuestion();
    initAll();
    setInterval(function(){
      var cdTime = parseInt($('#countDown').text());
      $('#countDown').text(--cdTime);
      var itemclass = $('#itemClass').text();
      if(cdTime == 0 && itemclass=="答题"){
        showResult();
        $('#countDown').text(10);
        $('#itemClass').text("答案展示");
      }else if(cdTime == 0 && itemclass=="答案展示"){
        nextQuestion();
        initAll();
      }
    },1000)
})
function nextQuestion(){
  if(typeof excelData[currentRow] === "undefined")
    currentRow = 1;
  else
    rowData=excelData[currentRow];
  if (rowData) {
    $("#subjectItem").text(rowData[0].replace(/[\r\n]/g, ''));
    $("#AItem").text(rowData[1]);
    $("#BItem").text(rowData[2]);
    $("#CItem").text(rowData[3]);
    $("#DItem").text(rowData[4]);
    currentRow++;  
  }
}
  function showResult(){
    $("input[name='"+rowData[5]+"']").prop("checked", true);
      $("#"+rowData[5]+"Item").css("color","green");
  }
  function initAll(){
    $('#itemClass').text("答题");
    $('#countDown').text(answerTime);
    $("#Aanswer").text(0);
    $("#Banswer").text(0);
    $("#Canswer").text(0);
    $("#Danswer").text(0);
    $(".option").prop("checked", false);
    $("label").css("color","black");
    
  }