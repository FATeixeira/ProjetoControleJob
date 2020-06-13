const funcGeraConjuntos = require('./controleJob');

describe('Caso 01 - Jobs validos com quebra de 8 horas', ()=>{
const job1 = {id:'01'
				         ,descricao:'Importação de arquivos de fundos'
				         ,dataMaximaConclusao:new Date('2019-11-10 12:00:00')
				         ,tempoEstimado:2
				         };

const job2 = {id:'02'
	         ,descricao:'Job 2'
	         ,dataMaximaConclusao:new Date('2019-11-11 12:00:00')
	         ,tempoEstimado:4
	         };


const job3 = {id:'03'
	         ,descricao:'Importação de arquivos de fundos'
	         ,dataMaximaConclusao:new Date('2019-11-11 08:00:00')
	         ,tempoEstimado:1
	         };

const job4 = {id:'04'
	         ,descricao:'Backup do Banco de Dados'
	         ,dataMaximaConclusao:new Date('2019-11-11 13:00:00')
	         ,tempoEstimado:2
	         };


const job5 = {id:'05'
	         ,descricao:'Carga de arquivo de Contatos'
	         ,dataMaximaConclusao:new Date('2019-11-01 15:00:00')
	         ,tempoEstimado:6
	         };

const job6 = {id:'06'
	         ,descricao:'Disparar schedule de Faturamento'
	         ,dataMaximaConclusao:new Date('2019-11-11 15:00:00')
	         ,tempoEstimado:3
	         };
	         
const inicioJanela          = '2019-11-01 09:00:00';
const fimJanela             = '2019-11-11 12:00:00';
const listaJobs             = [job1, job2, job3, job4, job5, job6];
const jobInconsistente      = [];
const listajobInconsistente = [];
const listaConjunto         = [
                                ['05','01']
                               ,['03','02','04']
                               ,['06']
                               ];

const retornoEsperado = {"controleExecucao": listaConjunto, "controleInconsistente": listajobInconsistente};
 ;

		it('Deve retornar lista de conjuntos agupado pelo maximo de 8 horas, em ordem de data maxima de conclusao', () => {
			expect(funcGeraConjuntos(listaJobs,inicioJanela,fimJanela)).toEqual(retornoEsperado);
		})
})
