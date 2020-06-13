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
	         ,tempoEstimado:2
	         };
	         
const inicioJanela          = '2019-11-01 09:00:00';
const fimJanela             = '2019-11-11 12:00:00';
const listaJobs             = [job1, job2, job3, job4, job5, job6];
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

describe('Caso 02 - Job com mais de 8 horas', ()=>{
const job1 = {id:'07'
				         ,descricao:'Importação de arquivos de fundos'
				         ,dataMaximaConclusao:new Date('2020-01-12 12:00:00')
				         ,tempoEstimado:12
				         };
				         
const inicioJanela          = '2020-01-11 07:00:00';
const fimJanela             = '2020-01-12 17:00:00';
const listaJobs             = [job1];
const jobInconsistente      = {idJob:'07', msgMotivo:'Job possui mais de 8 horas'};
const listajobInconsistente = [jobInconsistente];
const listaConjunto         = [];

const retornoEsperado = {"controleExecucao": listaConjunto, "controleInconsistente": listajobInconsistente};
 ;

		it('Deve retornar job na lista de inconsistentes, informando motivo de possuir mais de 8 horas', () => {
			expect(funcGeraConjuntos(listaJobs,inicioJanela,fimJanela)).toEqual(retornoEsperado);
		})
})

describe('Caso 03 - Job em que não é possível cumprir o prazo de execução com o inicio da Janela informada', ()=>{
const job1 = {id:'08'
				         ,descricao:'Execução de estatísticas e reorg de Banco'
				         ,dataMaximaConclusao:new Date('2020-01-11 12:00:00')
				         ,tempoEstimado:6
				         };
				         
const inicioJanela          = '2020-01-11 07:00:00';
const fimJanela             = '2020-01-12 17:00:00';
const listaJobs             = [job1];
const jobInconsistente      = {idJob:'08', msgMotivo:'Inicio da Janela + Tempo de Job é maior que o Prazo Máximo do Job'};
const listajobInconsistente = [jobInconsistente];
const listaConjunto         = [];

const retornoEsperado = {"controleExecucao": listaConjunto, "controleInconsistente": listajobInconsistente};
 ;

		it('Deve retornar job na lista de inconsistentes, informando motivo de possuir nao atender o Prazo maximo do Job', () => {
			expect(funcGeraConjuntos(listaJobs,inicioJanela,fimJanela)).toEqual(retornoEsperado);
		})
})

describe('Caso 04 - Job em que não é possivel concluir a execução dentro da Janela informada', ()=>{
const job1 = {id:'09'
				         ,descricao:'Correção Massiva de Cadastro'
				         ,dataMaximaConclusao:new Date('2020-01-12 12:00:00')
				         ,tempoEstimado:6
				         };
				         
const inicioJanela          = '2020-01-11 07:00:00';
const fimJanela             = '2020-01-11 12:00:00';
const listaJobs             = [job1];
const jobInconsistente      = {idJob:'09', msgMotivo:'Inicio da Janela + Tempo de Job é maior que o Fim da Janela'};
const listajobInconsistente = [jobInconsistente];
const listaConjunto         = [];

const retornoEsperado = {"controleExecucao": listaConjunto, "controleInconsistente": listajobInconsistente};
 ;

		it('Deve retornar job na lista de inconsistentes, informando motivo de possuir nao atender o periodo de Janela', () => {
			expect(funcGeraConjuntos(listaJobs,inicioJanela,fimJanela)).toEqual(retornoEsperado);
		})
})