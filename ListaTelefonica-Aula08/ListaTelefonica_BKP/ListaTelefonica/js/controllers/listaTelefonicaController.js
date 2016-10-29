angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, $http){

			$scope.app = "Lista Telefonica";


			$scope.cores = [
			{nome:"Azul", codigo:"blue"},
			{nome:"Amarelo", codigo:"yellow"},
			{nome:"Vermelho", codigo:"red"},
			{nome:"Verde", codigo:"green"},
			{nome:"Magenta", codigo:"magenta"}
			];

			$scope.cidades=[];
			$scope.contatos=[];

			//TODO: criar via JSON um array de estados
			var carregarArrayComboEstados = function(){

				$http.get("http://localhost:8089/WebFuelServices/api/utils/listAllEstados").success(function(data, status){

					//crio o array estados, baseado nos dados dos estados retornados do BackEnd
					$scope.estados = data;


				});


			};

			$scope.carregarArrayComboCidades = function(estado){

				if(estado!=null){
					$http.get("http://localhost:8089/WebFuelServices/api/utils/listAllCidadesByIdEstado?idEstado=" + estado).success(function(data, status){
						console.log(data);
						console.log(status);
						$scope.cidades = data;

					}).error(function(data, status){
						if(status != 200){

							$scope.cidades = [];
						}

					});
				}
			};

			var carregarContatos = function () {
				$http.get("http://localhost:3412/contatos").success(function (data) {
					$scope.contatos = data;
				}).error(function (data, status) {
					$scope.message = "Aconteceu um problema: " + data;
				});
			};

			var carregarOperadoras = function () {
				$http.get("http://localhost:3412/operadoras").success(function (data) {
					$scope.operadoras = data;
				});
			};

			//verifica se o array de cidades esta preenchido
			$scope.checaCidades = function(){

				if($scope.cidades.length > 1){
					return true;
				}else{
					return false;
				}

			};

			$scope.adicionarContato = function(contato){
				contato.data = new Date();


				
				$http.post("http://localhost:3412/contatos", contato).success(function (data) {
					delete $scope.contato;
					$scope.contatoForm.$setPristine();
					carregarContatos();
				});


			  /*  $scope.contatos.push(angular.copy(contato)); //copia o contato para a lista, para não alterá-la
			    delete $scope.contato; //limpa os campos do contato
			    $scope.contatoForm.$setPristine();
			    */
			    $scope.estados;

			    carregarArrayComboEstados();
			    $scope.cidades = [];

			};

			$scope.apagarContatos = function(contatos){
				
				$scope.contatos = contatos.filter(function(contato){ //devolvo ao scope os contatos que

						if(!contato.selecionado){ //nao estao selecionados
							return contato;
						}

					});			
			};

			//funcao para ordenacao
			$scope.ordernarPor  = function(campo){
				//console.log(campo);
				$scope.criterioDeOrdenacao = campo;
				$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
			};

			$scope.isContatoSelecionado = function(contatos){

					return contatos.some(function(contato){ //se algum contato estiver selecionado retorna true

						return contato.selecionado;

					});

				}

				$scope.classe1 = "selecionado";
				$scope.classe2 = "negrito";

				carregarContatos();
				carregarOperadoras();
				carregarArrayComboEstados();

			});


