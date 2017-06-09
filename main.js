/// <reference path="jquery-3.1.1.js" />
NationArray = [];

function OutputMessage() {
  window.alert("button clickeds");
};


function SearchBtn_Click() {
    var nameStr = document.getElementById("nameInput").value;
    var codeStr = document.getElementById("codeInput").value;
    if(nameStr==="" && codeStr===""){
        window.alert("Enter a name or code to search");
        return;
    }
    
    debugger;
    jQuery.ajax({
        type: "POST",
        url: 'RequestHandler.php',
        dataType: 'json',
        data: {name: nameStr, code: codeStr, isFullName: false},
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