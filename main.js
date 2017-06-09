/// <reference path="jquery-3.1.1.js" />
NationArray = [];

function OutputMessage() {
  window.alert("button clickeds");
};

function SearchBtn2_Click() {
    debugger;
    jQuery.ajax({
        type: "POST",
        url: 'RequestHandler2.php',
        dataType: 'json',
        data: {functionname: 'add', arguments: [1, 2]},
        success: OnSuccess,
        error: OnFail
    });
}

function SearchBtn_Click() {
    jQuery.ajax({
        type: "POST",
        url: 'RequestHandler.php',
        dataType: 'json',
        data: {name: "aruba", code: "124"},
        success: OnSuccess,
        error: OnFail
    });
}

function OnSuccess(NationArray) {
    for(var idx=0; idx<NationArray.length; idx++){
        AddNationToView(NationArray[idx]);
    }
}

function OnFail(result) {
    debugger;
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += result.responseText;
}

function AddNationToView(nation){ 
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += "<div>"+nation.name+"</div>";
}