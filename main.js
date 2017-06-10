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
    if(nameStr!==""){
        var searchVal = nameStr;
        var searchBy = "name";
    }
    else if(codeStr!==""){
        searchVal=codeStr;
        searchBy="code";
    }
    
    jQuery.ajax({
        type: "POST",
        url: 'RequestHandler.php',
        dataType: 'json',
//        data: {name: nameStr, code: codeStr, isFullName: false},
        data: {searchBy: searchBy, searchVal: searchVal},
        success: OnSuccess,
        error: OnFail
    });
}

function OnSuccess(response) {
    //$('#div-results').empty();
    if(Array.isArray(response)){     
        for(var idx=0; idx<response.length; idx++){
            AddNationToView(response[idx]);
        }   
    }
    else{
        AddNationToView(response);
    }
}

function OnFail(result) {
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += result.responseText;
}

function AddNationToView(nation){ 
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += "<div>"+nation.name+"</div>";
}