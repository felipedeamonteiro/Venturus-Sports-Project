import React, {Component} from 'react';
import $ from 'jquery';
/*import PubSub from 'pubsub-js';*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import PubSub from 'pubsub-js';


library.add(faTrashAlt);

export default class UserTable extends Component {

	constructor(){
        super();
        this.state = {
			tabela:[],
			search:''
		};

	}

	//Método para obter a quantidade de photos de cada usuário no Json de acordo com o albumId
	obterDadosDasPhotos(){
		var contphotos = [];
		$.ajax({
			url:"https://jsonplaceholder.typicode.com/photos",
			dataType:'json',
			success: function(resposta4){
				var i = 0;
				var j = 0;

				 // eslint-disable-next-line
				resposta4.some(function(auser4){
					if(i===0){
						contphotos[j] = 1;
					}else if (auser4.albumId===resposta4[i-1].albumId){
						contphotos[j] = contphotos[j]+1;
					} else if (auser4.albumId!==resposta4[i-1].albumId){
						if(auser4.albumId===11){
							return (contphotos);
						}else{
							j = j+1;
							contphotos[j]=1;
						}
					}
					i = i+1;
					 // eslint-disable-next-line
				});
				 // eslint-disable-next-line
				return (contphotos);
			},
			async: false,
			error:function(resposta){
                if(resposta.status === 400) {
                    alert('It wasn´t possible to get information about photos.');
                }
            }
		});
		return contphotos;
	}

	//Método para obter a quantidade de albums de cada usuário no Json de acordo com o userId
	obterDadosDosAlbums(){
		var contalbums = [];
		$.ajax({
			url:"https://jsonplaceholder.typicode.com/albums",
			dataType:'json',
			success: function(resposta3){
				var i = 0;
				var j = 0;

				resposta3.forEach(function(auser3){
                    if(i===0){
                        contalbums[j] = 1;
                    }else if (auser3.userId===resposta3[i-1].userId){
                        contalbums[j] = contalbums[j]+1;
                    } else if (auser3.userId!==resposta3[i-1].userId){
                        j = j+1;
                        contalbums[j]=1;
                    }
                    if(i===(resposta3.length)-1){
                        return (contalbums);
                    }
                    i = i+1;
                });
                return (contalbums);
			},
			error:function(resposta){
                if(resposta.status === 400) {
                    alert('It wasn´t possible to get information about albums.');
                }
            }
		});
		return contalbums;
	}

	//Método para obter a quantidade de posts de cada usuário no Json de acordo com o userId
	obterDadosDosPosts(){
		var contposts = [];
		$.ajax({
			url:"https://jsonplaceholder.typicode.com/posts",
			dataType:'json',
			success: function(resposta2){
				var i = 0;
				var j = 0;

				//Aqui estou contando a quantidade de posts no Json
                resposta2.forEach(function(auser2){
                    if(i===0){
                        contposts[j] = 1;
                    }else if (auser2.userId===resposta2[i-1].userId){
                        contposts[j] = contposts[j]+1;
                    } else if (auser2.userId!==resposta2[i-1].userId){
                        j = j+1;
                        contposts[j]=1;
                    }
                    if(i===(resposta2.length)-1){
                        return (contposts);
                    }
                    i = i+1;
                });
                return (contposts);
			},
			async: false,
			error:function(resposta){
                if(resposta.status === 400) {
                    alert('It wasn´t possible to get information about posts.');
                }
            }
		});
		return contposts;
	}

	geraRide(){
	    var w = Math.floor(Math.random()*3+1);
	    if(w===1){
	        w = "Always";
	    }
	    else if(w===2){
	        w = "Sometimes";
	    }
	    else if(w===3){
	        w = "Never";
	    }
	    return w;
	}

	//Método para gerar a quantidade de dias que os usuários andam de bike

	geraDays(){
	    var sun1 = Math.floor(Math.random()*2);
	    var mon2 = Math.floor(Math.random()*2);
	    var tue3 = Math.floor(Math.random()*2);
	    var wed4 = Math.floor(Math.random()*2);
	    var thu5 = Math.floor(Math.random()*2);
	    var fri6 = Math.floor(Math.random()*2);
	    var sat7 = Math.floor(Math.random()*2);
	    var weekday1 = 0;
	    var weekend1 = 0;
	    var arr1 = [];
		var daytable1 = "";


	    if(sun1===1){
	        arr1.push("Sun");
	        weekend1 = weekend1+1;
	    }
	    if(sat7===1){
	        arr1.push("Sat");
	        weekend1 = weekend1+1;
	    }
	    if(mon2===1){
	        arr1.push("Mon");
	        weekday1 = weekday1+1;
	    }
	    if(tue3===1){
	        arr1.push("Tue");
	        weekday1 = weekday1+1;
	    }
	    if(wed4===1){
	        arr1.push("Wed");
	        weekday1 = weekday1+1;
	    }
	    if(thu5===1){
	        arr1.push("Thu");
	        weekday1 = weekday1+1;
	    }
	    if(fri6===1){
	        arr1.push("Fri");
	        weekday1 = weekday1+1;
	    }

	    if ((weekend1===2) && (weekday1===5)){
	        daytable1 = "Every day";
	    }
	    else if((weekend1===2)&&(weekday1===0)){
	        daytable1 = "Weekends";
	    }
	    else if((weekday1===5)&&(weekend1===0)){
	        daytable1 = "Week days";
	    }else if((weekday1===0)&&(weekend1===0)){
	        daytable1 = "Sun";
	    }else{
	        daytable1 = arr1;
	    }
	    if((daytable1==='')||(daytable1==="")){
	        daytable1 = "Sat";
	    }
	    return daytable1;
	}

	//Ajax que pega as informações dos usuários e adiciona na tabela
	colocarDadosUsuariosTabela(cp, ca, cph){

        $.ajax({
            url:"https://jsonplaceholder.typicode.com/users",
            dataType: 'json',
            success:function(resposta){
				var lista = [];
				var t = 0;
				var self = this;//Essa ideia salvou o código!! AHauhauAHua. Armazenei a variável "this" em "self"
				console.log("Passei pelo Ajax");

				resposta.forEach(function(auser){
					var ride5 = self.geraRide();
					var days6 = self.geraDays();
					var loaduser = {
						id: auser.id,
						username: auser.username,
						name: auser.name,
						email: auser.email,
						city: auser.address.city,
						ride: ride5.toString(),
				        days: days6.toString(),
				        posts: cp[t],
				        albums: ca[t],
				        photos: cph[t],
				        trash: " ",
						newClass:""
					}
					lista.push(loaduser);
					t = t+1;
				});

				PubSub.publish("info-tabela", lista);
				this.setState({tabela:lista});
        	}.bind(this),
			error:function(resposta){
                if(resposta.status === 400) {
                    alert('It wasn´t possible to get information about users.');
                }
            }
		});
//------------------------------------------------------------------------------
//ESTA É A LÓGICA CRÍTICA DESTE EXERCÍCIO
		//Este if serve para adicionar novos usuário vindos do form quando há algum usuário logado
		if(sessionStorage.formInfo==='yes'){

			var infoNewUser = JSON.parse(sessionStorage.infouser);
			var newInfo = {};

			newInfo = {
				id: infoNewUser.id,
				username: infoNewUser.username,
				name: infoNewUser.name,
				email: infoNewUser.email,
				city: infoNewUser.city,
				ride: infoNewUser.ride,
				days: infoNewUser.realDays,
				posts: infoNewUser.posts,
				albums: infoNewUser.albums,
				photos: infoNewUser.photos,
				trash: " ",
				newClass:""
			};

			if((sessionStorage.userlogin==="true") && (sessionStorage.infouser!==undefined) && (sessionStorage.segIf===undefined)){

				if(sessionStorage.count===undefined){
					PubSub.subscribe("info-tabela", function(topico, lista2){
						lista2.push(newInfo);
						console.log('Entrei no if para add usuario logado');
						//Count serve para contar
						sessionStorage.setItem('count', '1');
						//teste era inicialmente só um teste e agora serve para guardar a informação dos usuários do usuário logado
						sessionStorage.setItem('teste', JSON.stringify(lista2));

						sessionStorage.formInfo = 'não';

						this.setState({tabela:lista2});
					}.bind(this));

				}
			}
			//Este if passa rápido que é apenas para add o novo user, depois
			//há o reload da página
			if(sessionStorage.segIf==='yes'){
				var lista3 = JSON.parse(sessionStorage.teste);


				lista3.push(newInfo);

				sessionStorage.setItem('teste', JSON.stringify(lista3));

				sessionStorage.formInfo = 'não';
				var aux5 = Number(sessionStorage.count);
				aux5 = aux5 +1;
				sessionStorage.count = aux5;

			}
		}else{
			if(sessionStorage.teste!==undefined && sessionStorage.formInfo==='não'){

				var infoGeral = JSON.parse(sessionStorage.teste);

				this.setState({tabela:infoGeral});
			}
		}
	}

//------------------------------------------------------------------------------

	//Fazer as chamadas ajax para montar a tabela a partir dos Jsons
	componentDidMount(){

		if(sessionStorage.userlogin==='true' && sessionStorage.formInfo==='não'){
			var ajuda = JSON.parse(sessionStorage.teste);
			this.setState({tabela: ajuda});
		}else{
			//Promise para evitar o callback from Hell
			Promise.all([
				this.obterDadosDasPhotos(),
				this.obterDadosDosAlbums(),
				this.obterDadosDosPosts()
			]).then(dados => {
				this.colocarDadosUsuariosTabela(dados[2],dados[1],dados[0])
			}).catch(erro => console.log(erro));

		}

	}

	//Filtrando a tabela...Aqui atualiza o estado do campo filtro
	atualizaEstado(event){
		this.setState({search: event.target.value.substr(0,30)});

    }
	//Excluir linha da tabela...Poxa, esse me deu trabalho... Prestar atenção aqui para o futuro...
	excluirLinha(rowIndex){
		var decisao = window.confirm("To confirm press OK.");
        if(decisao){
			var tablemor = this.state.tabela;
			 // eslint-disable-next-line
			var arr4 = tablemor.filter(function(row, indexImp) {
				if(indexImp!==rowIndex){
					return row;
				}
				 // eslint-disable-next-line
			});
			 // eslint-disable-next-line
			this.state.tabela[rowIndex].newClass = "fadeOut";
			 // eslint-disable-next-line
			var arr6 = this.state.tabela;
			this.setState({tabela: arr6});
			setTimeout(() => {this.setState({tabela: arr4})}, 510);
			var ind = Number(sessionStorage.indextable)-1;
			sessionStorage.setItem('indextable', ind);
        }
	}

	render(){
		//Este if é para ajudar na adição de users
		if(sessionStorage.reloadHelper==="1"){
            sessionStorage.removeItem('reloadHelper');
            window.location.reload();
		}
		//Essa variável faz o filto dos usuários na tabela e já retorna uma função que ajuda a fazer isso.
		let filteredUsers = this.state.tabela.filter(
			(user3) => {
				return user3.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			}
		);
		return (
	        <div>
	            <section className="container" id="user-info">
	                <header className="header-tabela">
	                  <h2 className="users">Users</h2>
	                  <input id="filtrar-tabela" className="fa filtro" type="text" placeholder='&#xf002; Filter table content by name' value={this.state.search} onChange={this.atualizaEstado.bind(this)} />
	                </header>
	                <div className="tabela1">
	                    <table>
	                        <thead>
	                            <tr>
	                                <th>Username</th>
	                                <th>Name</th>
	                                <th>E-mail</th>
	                                <th>City</th>
	                                <th>Ride in group</th>
	                                <th>Day of the week</th>
	                                <th>Posts</th>
	                                <th>Albums</th>
	                                <th>Photos</th>
	                                <th></th>
	                            </tr>
	                        </thead>
	                        <tbody id="tabela-informacoes">
								{filteredUsers.map((users, indexu) => {
									sessionStorage.setItem('indextable', indexu);
									return (

										<tr key={users.id} className={users.newClass}>
											<td>{users.username}</td>
											<td>{users.name}</td>
											<td className="info-email">{users.email}</td>
											<td className="info-city">{users.city}</td>
											<td>{users.ride}</td>
											<td>{users.days}</td>
											<td className="info-posts">{users.posts}</td>
											<td className="info-album">{users.albums}</td>
											<td>{users.photos}</td>
											<td onClick={this.excluirLinha.bind(this, indexu)}><FontAwesomeIcon icon={faTrashAlt} className="fas fa-trash-alt" />{users.trash}</td>
										</tr>
									);
								})}
	                        </tbody>
	                    </table>
	                </div>
	            </section>
	        </div>
		);
	}
}
