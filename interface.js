      window.globalListaJobs = [];

      function funcControleJobs(){
          /* - funcControleJobs -

             Regra Funcional...: Metodo principal do processo de controle de jobs.

             Parametros Entrada: N/a

             Parametros Saida..: N/a

             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020

             - Log alterações -
        */
         const interface  = funcInterfaceGetInput();

         if  (interface.flagErro === 'N') {
              var inicioJanela = interface.tsDataInicio;
              var fimJanela    = interface.tsDataFim;
              var listaJobs    = [];
              listaJobs        = window.globalListaJobs;
              var conjuntosExecucao = [];
              var conjuntoInconsistente = [];
              var ixConjunto = 0;

              const controle = funcGeraConjuntos(listaJobs, inicioJanela, fimJanela);

              funcExibirConjunto(controle.controleExecucao, controle.controleInconsistente);
          }
      }
      
      function funcInterfaceGetInput(){
         /* - funcInterfaceGetInput -

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

    function InterfaceGetJob(){
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
             job.id                  = idJob;
             job.descricao           = descricao;
             job.dataMaximaConclusao = new Date(dataMaxima + ' ' + horaMaxima + ':00');
             job.tempoEstimado       = parseInt(tempoEstimado);
         }

         return {job, flagErro};
    }

    function funcIncluirJob(){
          /* - funcIncluirJob -

             Regra Funcional...: Inclui Job inputado pelo usuário na tabela de Jobs.

             Parametros Entrada: N/A

             Parametros Saida..: N/A

             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020

             - Log alterações -
        */
         const interface  = InterfaceGetJob();

         if  (interface.flagErro === 'N') {
             var job   = {};
             job       = interface.job;
             var table = document.getElementById("tblJobs");
             var row   = table.insertRow(1);

             var cell1 = row.insertCell(0);
             var cell2 = row.insertCell(1);
             var cell3 = row.insertCell(2);
             var cell4 = row.insertCell(3);

             cell1.innerHTML = job.id;
             cell2.innerHTML = job.descricao;
             cell3.innerHTML = job.dataMaximaConclusao.toLocaleDateString()
                       + ' ' + job.dataMaximaConclusao.toLocaleTimeString();
             cell4.innerHTML = job.tempoEstimado + " horas";

             window.globalListaJobs.push(job);

             document.getElementById("itIdJob").value        = '';
             document.getElementById("itDescricao").value    = '';
             document.getElementById("itDataMaxima").value   = '';
             document.getElementById("itHoraMaxima").value   = '';
             document.getElementById("itTempoEstimado").value= '';
         }
    }

    function funcExibirConjunto(conjuntosExecucao, conjuntoInconsistente){
          /* - funcIncluirJob -

             Regra Funcional...: Inclui conjunto retornado pelo controle de Jobs.
                                 Caso haja inconsistências, carrega a tabela de Inconsistentes.

             Parametros Entrada: Conjunto Jobs, Jobs Inconsistentes

             Parametros Saida..: N/A

             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020

             - Log alterações -
        */

         funcLimparTabela("tblConjuntos");

         var table      = document.getElementById("tblConjuntos");
         var ixConjunto = 0;

         if  (conjuntosExecucao.length > 0) {
              document.getElementById("divConjuntos").style.visibility = "visible";
         }

         for  (conjunto of conjuntosExecucao) {
              ixConjunto      = ixConjunto + 1;
              row             = table.insertRow(ixConjunto);
              cell1           = row.insertCell(0);
              cell2           = row.insertCell(1);

              cell1.innerHTML = ixConjunto.toString().padStart(4, '0');
              cell2.innerHTML = conjunto;
         }

         funcLimparTabela("tblConjuntosInconsistentes");

         if  (conjuntoInconsistente.length > 0) {
              document.getElementById("divConjuntosInconsistentes").style.visibility = "visible";
         }

         var table = document.getElementById("tblConjuntosInconsistentes");
         var ix    = 0;

         for (job of conjuntoInconsistente) {
              ix        = ix + 1;
              row       = table.insertRow(ix);
              cell1     = row.insertCell(0);
              cell2     = row.insertCell(1);

              cell1.innerHTML = job.idJob;
              cell2.innerHTML = job.msgMotivo;
         }

    }

    function funcLimparResultado(){
          /* - funcIncluirJob -

             Regra Funcional...: Limpa e oculta as tabelas de resultado

             Parametros Entrada: N/A

             Parametros Saida..: N/A

             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020

             - Log alterações -
        */

         funcLimparTabela("tblConjuntos");
         funcLimparTabela("tblConjuntosInconsistentes");
         document.getElementById("divConjuntos").style.visibility = "hidden";
         document.getElementById("divConjuntosInconsistentes").style.visibility = "hidden";
    }

    function funcLimparTabela(idTabela){
          /* - funcIncluirJob -

             Regra Funcional...: Exclui todos os registros de uma tabela, exceto o cabecalho

             Parametros Entrada: id da tabela

             Parametros Saida..: N/A

             Autor.............: Flavio Teixeira
             Data..............: 10/06/2020

             - Log alterações -
        */
        var objTabela  = document.getElementById(idTabela);
        var tamanho    = objTabela.rows.length;
        var ix         = 1;

        while (ix < tamanho) {
              objTabela.deleteRow(1);
              ix = ix + 1
        }

  }