
        
        var SiteUrl = _spPageContextInfo.webServerRelativeUrl;
        var SiteTitle = _spPageContextInfo.webTitle;

        $(document).ready(function(){

            $('#SiteTitle').text(SiteTitle);
            GetList();
            

        });

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
                        str+='<li>'+data[i].Title+'</li>';
                    }
                    $('#LeftPaneInfo').empty();
                    $('#LeftPaneInfo').append(str);
                },            
            });
        }

        function GetAPI(){
            var requestUri = SiteUrl + "/_api/web/";
            var requestHeaders = {
            "accept": "application/json;odata=verbose"
            }
            var text;

            $.ajax({
                url: requestUri,
                type: 'GET',
                dataType: 'json',
                async: false,
                headers: requestHeaders,
                success: function (data) 
                {      
                
                    data = data.d; 
                   
                    text = JSON.stringify(data, null , 3);
                    text = text.replace(/"/g,'');
                    text = text.replace(/,/g,'<br>');
                    text = text.replace(/{/g,'');
                    text = text.replace(/}/g,'<br>');
                    text = text.replace(/:/g,'');
                    text = text.replace(/__deferred/g,'');
                    text = text.replace(/uri/g,'=>');
                    text = text.replace(/__metadata/g,'');
                    $('#DisplayResult').append(text);
                    Writeline();
                },
                error: function ajaxError(response) {
                console.log(response.status + ' ' + response.statusText);
                }
            });

        }

        function ClearConsole(){
            $('#DisplayResult').empty();
        }   
        function ClearQueryInput(){
            $('#QueryInput').val('');
        }
        function SiteInfo(){
            var text = '';
                text = JSON.stringify(_spPageContextInfo, null , 3);
                text = text.replace(/"/g,'');
                text = text.replace(/,/g,'<br>');
                text = text.replace(/{/g,'');
                text = text.replace(/}/g,'<br>');
                text = text.replace(/:/g,'');
                text = text.replace(/__deferred/g,'');
                text = text.replace(/uri/g,'=>');
                text = text.replace(/__metadata/g,'');
                $('#DisplayResult').append(text);
                Writeline();
        }
        function Writeline(){
            var str='===========================================================================================<br><br>';
            $('#DisplayResult').append(str);
        }
