
        
        var SiteUrl = _spPageContextInfo.webServerRelativeUrl;
        var SiteTitle = _spPageContextInfo.webTitle;

        $(document).ready(function(){

            LoadHTML('body','layout');
            LoadJS('GetList');
            LoadJS('GetAPI');
            LoadJS('SiteInfo');
            LoadJS('GetColumn');
            LoadJS('GetColumnDetail');
            LoadJS('SelectItem');
            LoadJS('QueryItem');
            $('#SiteTitle').text(SiteTitle);

            LoadJS('Initial');
            
        });

        $('button').click(function(){
            var objDiv = document.getElementById("DisplayResult");
            objDiv.scrollTop = objDiv.scrollHeight;
        });

        function LoadHTML(selector,component){
            var Url = 'https://logicalmild.github.io/SPBoxQuery/component/'+component+'/'+component+'.html';
            $.ajax({ type: "GET",   
                url: Url,
                async: false,
                success : function(text)
                {
                    response= text;
                    $(selector).append(response);
                
                },
                error: function(err){
                    
                },
            
                });
        }
        function LoadJS(module){
            var Url = 'https://logicalmild.github.io/SPBoxQuery/module/'+module+'/'+module+'.js';
            $.ajax({
                url: Url,
                dataType: "script",
                success : function(data)
                {
                    console.log('Load:'+Url+' complete');
                },
        
            });
        }

        function ClearConsole(){
            $('#DisplayResult').empty();
        }   
        function ClearQueryInput(){
            $('#QueryInput').val('');
        }
        
        function Writeline(){
            var str='===========================================================================================<br><br>';
            $('#DisplayResult').append(str);
        }
