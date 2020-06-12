		  window.globalListaJobs = [];
		  
		  function geraControleJobs(){		   
			   const interface  = InterfaceCarregaDados();
			   
			   if  (interface.flagErro === 'N') { 	         
              var inicioJanela = interface.tsDataInicio;
              var fimJanela    = interface.tsDataFim;
			        var listaJobs    = [];
			        listaJobs        = window.globalListaJobs;
			        
			        alert(window.globalListaJobs[0].idJob);
			        alert(listaJobs[0].idJob);
			        
			        //Ordenacao ascendente por data Maxima de Conclusao
              listaJobs = listaJobs.sort((a, b) => a.dataMaximaConclusao - b.dataMaximaConclusao);
              
              var conjuntosExecucao = [];
              var conjuntoInconsistente = [];
              var ixConjunto = 0; 
              
              const controle = funcControleJobs(listaJobs, inicioJanela, fimJanela);
              
              conjuntosExecucao = controle.controleExecucao;
              conjuntoInconsistente = controle.controleInconsistente;
              
              alert('chegou');
              
              for (conjunto of conjuntosExecucao) {     	
                  ixConjunto = ixConjunto + 1;
                  alert('ID Jobs conjunto de execucao ' + ixConjunto.toString().padStart(2, '0') + ' = ' + conjunto);
              }    
              
              for (job of conjuntoInconsistente) {     	
                  alert('ID Jobs com Inconsistencias = ' + job.idJob + ' - Motivo = ' + job.msgMotivo);
              }    
          }
      }
     
			function funcControleJobs(listaJobs, inicioJanela, fimJanela){
				 /* - funcControleJobs - 
				     
				     Regra Funcional...: A partir de lista de jobs e periodo de janela, gera conjuntos de jobs a serem processados
				                         agrupado por tempo total de 8 horas.
                            
             Parametros Entrada: - array de lista de jobs
                                 - timestamp de inico de janela
                                 - timstamp de fim de janela
                            
             Parametros Saida..: - array de conjunto de jobs por 8 horas
                                 - array de jobs inconsistentes
                            
             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020   
                            
             - Log alterações -               
        */
				var conjunto              = [];
				var controleExecucao      = [];
				var controleInconsistente = [];
				var inconsistente         = {idJob:0, msgMotivo:''};
			  var tempoConjunto         = 0;
			  var ixConjunto            = 0;

				for (job of listaJobs) {
					  
					  const resultCons = funcConsisteJob(job, inicioJanela, fimJanela);

					  if (resultCons.flagValido === 'N') {
	  				  	inconsistente = {};
					  	  inconsistente.idJob = job.id;
					  	  inconsistente.msgMotivo = resultCons.motivo;

					  	  controleInconsistente.push(inconsistente);
					  		}
					  else {	
       	      	 tempoConjunto = tempoConjunto + job.tempoEstimado;
    			      
    			       if (tempoConjunto > 8) {
         	          controleExecucao.push(conjunto);
            				conjunto = [];
            				
    			       }
    	           conjunto.push(job.id);
    			  }     			      	
			  }	
			  
			  if  (conjunto.length > 0)	 {
			      controleExecucao.push(conjunto);
				}      
				
			  return {controleExecucao, controleInconsistente};
			}
			
			function funcConsisteJob(job, inicioJanela, fimJanela){
				 /* - funcConsisteJob - 
				     
				     Regra Funcional...: Valida se o job enviado é possivel de ser processado 
				                         na Janela de execução do mesmo.
             
             Parametros Entrada: - objeto job
                                 - timestamp de inico de janela
                                 - timstamp de fim de janela
             
             Parametros Saida..: - indicador de inconsistencia
                                 - motivo de inconsistencia
             
             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020
             
             - Log alterações -
        */
        
        
				var flagValido            = 'S';
				var motivo                = '';
        var prevFimJob            = new Date(inicioJanela);
        var tsFimJanela           = new Date(fimJanela);
        var tsdataMaximaConclusao = new Date(job.dataMaximaConclusao);

        prevFimJob.setHours(prevFimJob.getHours() + job.tempoEstimado);				
        
				if  (prevFimJob > tsdataMaximaConclusao) {
					  flagValido = 'N'; 
					  motivo = 'Inicio da Janela + Tempo de Job é maior que o Prazo Máximo do Job';
				};
        
				if  (prevFimJob > tsFimJanela) {
					  flagValido = 'N'; 
					  motivo = 'Inicio da Janela + Tempo de Job é maior que o Fim da Janela';
				};

				if  (job.tempoEstimado > 8) {
					  flagValido = 'N'; 
					  motivo = 'Job possui mais de 8 horas';
				};
        
				return {flagValido, motivo};
			}
			
			function funcIncluirJob(){
    	   const interface  = InterfaceCarregaDadosJob();
    	   
    	   if  (interface.flagErro === 'N') {
    	   	   var job   = {};
    	   	   job       = interface.job;
             var table = document.getElementById("tblJobs");
             var row   = table.insertRow(1);
             
             var cell1 = row.insertCell(0);
             var cell2 = row.insertCell(1);
             var cell3 = row.insertCell(2);
             var cell4 = row.insertCell(3);
             
             cell1.innerHTML = job.idJob;
             cell2.innerHTML = job.descricao;
             cell3.innerHTML = job.dataMaximaConclusao;
             cell4.innerHTML = job.tempoEstimado;
             
             window.globalListaJobs.push(job);
			   }
		}