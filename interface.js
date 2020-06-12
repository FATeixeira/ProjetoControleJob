			function InterfaceCarregaDados(){
				 /* - InterfaceGetData - 
				     
				     Regra Funcional...: Realiza validacoes dos dados inputados na tela, formata e retorna data inicio
				                         e fim da Janela e a lista de jobs informados pelo usuario.
                            
             Parametros Entrada: N/a
                            
             Parametros Saida..: - data inicio e fim informada na tela
                                 - lista de jobs informada na tela
                                 - flag indicado se ha erros na tela
                            
             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020   
                            
             - Log alterações -          
          */
         var flagErro     = 'N';
         var dataInicio   = document.getElementById("itDataInicio").value;
			   var horaInicio   = document.getElementById("itHoraInicio").value;
			   var dataFim      = document.getElementById("itDataFim").value;
			   var horaFim      = document.getElementById("itHoraFim").value;
			   
			   document.getElementById("msgDataInicio").style.visibility = "hidden";
			   document.getElementById("msgDataFim").style.visibility = "hidden";			   	         
         
         if  (dataInicio === '' || horaInicio === '') {
         	   flagErro = 'S';
         	   document.getElementById("msgDataInicio").style.visibility = "visible";
         	   document.getElementById("msgDataInicio").innerHTML = "Data / Hora Inicio são obrigatórios";
         }       

         if  (dataFim    === '' || horaFim    === '') {
         	   flagErro = 'S';
         	   document.getElementById("msgDataFim").style.visibility = "visible";
         	   document.getElementById("msgDataFim").innerHTML = "Data / Hora Fim são obrigatórios";
         }       
         
         tsDataInicio = new Date(dataInicio.toString() + ' ' + horaInicio.toString() + ':00');
         tsDataFim    = new Date(dataFim.toString()    + ' ' + horaFim.toString() + ':00');

         if  (tsDataInicio >= tsDataFim) {
         	   flagErro = 'S';
         	   document.getElementById("msgDataFim").style.visibility = "visible";
         	   document.getElementById("msgDataFim").innerHTML = "Data Fim deve ser posterior a data inicio";
         } 
         
         if  (window.globalListaJobs.length === 0) {
         	   flagErro = 'S';
         	   alert('Nao existe Job Cadastrado');
				 }
				
         return {tsDataInicio, tsDataFim, flagErro};
    }
    
    function InterfaceCarregaDadosJob(){
				 /* - InterfaceGetData - 
				     
				     Regra Funcional...: Realiza validacoes dos dados inputados na tela, formata e retorna data inicio
				                         e fim da Janela e a lista de jobs informados pelo usuario.
                            
             Parametros Entrada: N/a
                            
             Parametros Saida..: - data inicio e fim informada na tela
                                 - lista de jobs informada na tela
                                 - flag indicado se ha erros na tela
                            
             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020   
                            
             - Log alterações -          
          */
         var flagErro     = 'N';
         var idJob        = document.getElementById("itIdJob").value;
			   var descricao    = document.getElementById("itDescricao").value;
         var dataMaxima   = document.getElementById("itDataMaxima").value;
			   var horaMaxima   = document.getElementById("itHoraMaxima").value;
         var tempoEstimado= document.getElementById("itTempoEstimado").value;

         job = {id:''
			   	         ,descricao:''
			   	         ,dataMaximaConclusao:new Date('1900-01-01 00:00:00')
			   	         ,tempoEstimado:0
			   	         };
			   
			   document.getElementById("msgCadJob").style.visibility = "hidden";
         
         if  (idJob === '' || descricao === '' || horaMaxima === '' || horaMaxima === '' || tempoEstimado === '') {
         	   flagErro = 'S';
         	   document.getElementById("msgCadJob").style.visibility = "visible";
         	   document.getElementById("msgCadJob").innerHTML = "Todos os campos são obrigatórios";
         } else {
             job.idJob               = idJob;
             job.descricao           = descricao;
             job.dataMaximaConclusao = Date(dataMaxima + ' ' + horaMaxima + ':00');
             job.tempoEstimado       = tempoEstimado;             
         }       
         
         return {job, flagErro};
    }