function GetList(){
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/lists',
        type: 'GET',
        async: false,
        headers: {
        'accept': 'application/json;odata=verbose',
        'content-type': 'application/json;odata=verbose',
        },
        success: function (data) {
            data = data.d.results;
            var str='';
            for(i in data){
                str+='<li onclick="SetQueryInput(\''+data[i].Title+'\');" class="ListTitle">'+data[i].Title+'</li>';
            }
            $('#LeftPaneInfo').empty();
            $('#LeftPaneInfo').append(str);
        },            
    });

   
} 

function SetQueryInput(Listname){
    $('#QueryInput').val(Listname);

}