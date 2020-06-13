      function funcGeraConjuntos(listaJobs, inicioJanela, fimJanela){
         /* - funcGeraConjuntos -

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

        //Ordenacao ascendente por data Maxima de Conclusao
        listaJobs = listaJobs.sort((a, b) => a.dataMaximaConclusao - b.dataMaximaConclusao);
              
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
                 	  tempoConjunto = 0;
                    controleExecucao.push(conjunto);
                    conjunto = [];

                 }
                 conjunto.push(job.id);
            }
        }

        if  (conjunto.length > 0)  {
            controleExecucao.push(conjunto);
        }

        return {controleExecucao, controleInconsistente};
      }
      module.exports = funcGeraConjuntos;


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