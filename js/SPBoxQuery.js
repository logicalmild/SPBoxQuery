
        
        var SiteUrl = _spPageContextInfo.webServerRelativeUrl;
        var SiteTitle = _spPageContextInfo.webTitle;

        $(document).ready(function(){

            LoadHTML('body','layout');
            LoadJS('GetList');
            
            $('#SiteTitle').text(SiteTitle);
            
            

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
