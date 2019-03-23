import React, {Component} from 'react';
import { faLifeRing as faLifeRingRegular, faSmile as faSmileRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import ErrosForm from './ErrosValida';
import PubSub from 'pubsub-js';
import {browserHistory} from  'react-router';

library.add(faHeartbeat, faSmileRegular, faLifeRingRegular);


export default class Form extends Component {

	constructor(){
		super();
		this.state = {
			id: '',
			username: '',
			name: '',
			email: '',
			city: '',
			ride: null,
			sun: false,
			mon: false,
			tue: false,
			wed: false,
			thu: false,
			fri: false,
			sat: false,
			realDays:'',
			posts: 0,
			albums: 0,
			photos: 0
		};
		this.enviaForm = this.enviaForm.bind(this);
		this.clearForm = this.clearForm.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.setName = this.setName.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setCity = this.setCity.bind(this);
		this.setRide = this.setRide.bind(this);
		this.setSun = this.setSun.bind(this);
		this.setMon = this.setMon.bind(this);
		this.setTue = this.setTue.bind(this);
		this.setWed = this.setWed.bind(this);
		this.setThu = this.setThu.bind(this);
		this.setFri = this.setFri.bind(this);
		this.setSat = this.setSat.bind(this);
		this.setDays = this.setDays.bind(this);
		this.validaNewUser = this.validaNewUser.bind(this);
	}

	setDays() {
		var arr10 = [];
	    var weekday = 0;
	    var weekend = 0;
	    var daytable = "";

	    //Adicionando informações a variaveis auxiliares e ao array com os dias de riding
	    if(this.state.sun===true){
	        arr10.push("Sun");
	        weekend = weekend+1;
	    }
	    if(this.state.mon===true){
	        arr10.push("Mon");
	        weekday = weekday+1;
	    }
	    if(this.state.tue===true){
	        arr10.push("Tue");
	        weekday = weekday+1;
	    }
	    if(this.state.wed===true){
	        arr10.push("Wed");
	        weekday = weekday+1;
	    }
	    if(this.state.thu===true){
	        arr10.push("Thu");
	        weekday = weekday+1;
	    }
	    if(this.state.fri===true){
	        arr10.push("Fri");
	        weekday = weekday+1;
	    }
	    if(this.state.sat===true){
	        arr10.push("Sat");
	        weekend = weekend+1;
	    }

	    //Lógica para colocar de maneira correta os dias de riding do novo usuario
	    if ((weekend===2) && (weekday===5)){
	        daytable = "Every day";
	    }
	    else if((weekend===2)&&(weekday===0)){
	        daytable = "Weekends";
	    }
	    else if((weekday===5)&&(weekend===0)){
	        daytable = "Week days";
	    }
	    else{
	        daytable = arr10;
	    }
		var correcao = daytable.toString();
		this.setState({realDays: correcao});
		return correcao;

	}
	//Validando Form
	validaNewUser(correcao2){
		var erros = [];
		var erroaux = [];

	    if(this.state.username===''){
	        erros.push("Username must be completed");
	    }else{
			for(var i=0; i< erros.length; i++){
				if(erros[i]==="Username must be completed"){
					erros.splice(i,1);
				}
			}
		}

	    if(this.state.name===''){
	        erros.push("Name must be completed");
		}else{
			for(i=0; i< erros.length; i++){
				if(erros[i]==="Name must be completed"){
					erros.splice(i,1);
				}
			}
	    }

	    if(this.state.email===''){
	        erros.push("Email must be completed");
		}else{
			for(i=0; i< erros.length; i++){
				if(erros[i]==="Email must be completed"){
					erros.splice(i,1);
				}
			}
		}

	    if(this.state.city===''){
	        erros.push("City must be completed");
		}else{
			for(i=0; i< erros.length; i++){
				if(erros[i]==="City must be completed"){
					erros.splice(i,1);
				}
			}
	    }
	    if(this.state.ride===''||this.state.ride===null){
	        erros.push("'Ride in group' must be filled");
		}else{
			for(i=0; i< erros.length; i++){
				if(erros[i]==="'Ride in group' must be filled"){
					erros.splice(i,1);
				}
			}
	    }

		if(correcao2===''){
			erros.push("'Days of the week' must be checked");
		}else{
			for(i=0; i< erros.length; i++){
				if(erros[i]==="'Days of the week' must be checked"){
					erros.splice(i,1);
				}
			}
		}
		PubSub.publish("erros-validacao", erros);

		var validaki='Não tá entrando no if';
		if(erros.length===erroaux.length){
			erros = '';
			validaki = 'ok';
		}
		return validaki;
	}

	enviaForm(evento){
		evento.preventDefault();
		var vai = this.setDays();
		var validaki2 = this.validaNewUser(vai);
		var indexid = sessionStorage.indextable;
		indexid = Number(indexid)+2;

		if(validaki2==='ok'){
			//infouser são as informações de um novo usuário a ser adicionado na tabela, e esta informação fica guardada no banco de dados do navegador enquanto aquela seção estiver acontecendo

			sessionStorage.setItem('infouser',JSON.stringify({
				id: indexid,
				username: this.state.username,
				name: this.state.name,
				email: this.state.email,
				city: this.state.city,
				ride: this.state.ride,
				realDays: this.state.realDays,
				posts: 0,
				albums: 0,
				photos: 0
			}));
			sessionStorage.indextable = indexid;
			var stg = this.state.name;

			if(sessionStorage.userlogin===undefined){
				//este userlogin serve para dizer se tem algum usuário logado ou para mostrar que alguém foi "logado primeiro"
				sessionStorage.setItem('userlogin', "true");

        		var nome1 = stg.slice(0,1);
        		var aux1 = stg.split(" ");
        		var aux2 = aux1.slice(1);
        		var aux3 = aux2.toString();
        		var nome2 = aux3.slice(0,1);
                sessionStorage.logname = stg.toString();
                sessionStorage.initials = nome1+nome2;
			}
			//reloadHelper serve para saber quando dar o reload da página ou não. Criei isso porque quando há o direcionamento de página a mesma não recarrega e o setState não funciona
			sessionStorage.setItem('reloadHelper', '1');
			sessionStorage.setItem('formInfo', 'yes');
			if(sessionStorage.formInfo==='não'){
				sessionStorage.formInfo = 'yes';
			}
			if(sessionStorage.count!==undefined){
				sessionStorage.setItem('segIf', 'yes');
			}

			browserHistory.push("/users");

		}


	}

	clearForm(evento){
		evento.preventDefault();
		this.setState({
			id: '',
			username: '',
			name: '',
			email: '',
			city: '',
			ride: null,
			sun: false,
			mon: false,
			tue: false,
			wed: false,
			thu: false,
			fri: false,
			sat: false,
			realDays:'',
			posts: 0,
			albums: 0,
			photos: 0
		});
		PubSub.publish("limpa-erros",{});

	}

	setUsername(evento){
		this.setState({username: evento.target.value});
	}

	setName(evento){
		this.setState({name: evento.target.value});
	}

	setEmail(evento){
		this.setState({email: evento.target.value});
	}

	setCity(evento){
		this.setState({city: evento.target.value});
	}

	setRide(evento){
		this.setState({ride: evento.target.value});
	}

	setSun(){
		this.setState({sun: !this.state.sun});
		this.setDays();


	}
	setMon(){
		this.setState({mon: !this.state.mon});
		this.setDays();

	}
	setTue(){
		this.setState({tue: !this.state.tue});
		this.setDays();


	}
	setWed(){
		this.setState({wed: !this.state.wed});
		this.setDays();

	}
	setThu(){
		this.setState({thu: !this.state.thu});
		this.setDays();

	}
	setFri(){
		this.setState({fri: !this.state.fri});
		this.setDays();

	}
	setSat(){
		this.setState({sat: !this.state.sat});
		this.setDays();

	}


	render(){
		return (
	        <div>
	            <section className="container" id="user-register">
	                <h2 className="regist">Registration</h2>
	                <div className="information-div">
	                    <section className="caixa">
	                        <h4>Need Help?</h4>
	                        <section className="caixa2 need-help">
	                            <FontAwesomeIcon icon={faLifeRingRegular} className="far fa-life-ring"/>
	                            <p className="parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
	                        </section>
	                    </section>
	                    <section className="caixa">
	                        <h4>Why register?</h4>
	                        <section className="caixa2 why-register">
	                            <FontAwesomeIcon icon={faHeartbeat} className="fas fa-heartbeat"/>
	                            <p className="parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
	                        </section>
	                    </section>
	                    <section className="caixa">
	                        <h4>What people are saying...</h4>
	                        <section className="caixa2 what-people">
	                            <FontAwesomeIcon icon={faSmileRegular} className="far fa-smile"/>
	                            <p className="parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
	                        </section>
	                    </section>
	                </div>
	                <hr/>
	                <div className="regis">
	                    <form onSubmit={this.enviaForm}>
							<section id="ladoesq">
		                        <div className="grupo username">
		                            <label htmlFor="username">Username</label><br/>
		                            <input id="username" type="text" name="username" className="campo1" value={this.state.username} onChange={this.setUsername}/><br/>
		                            <p className="warn p1">Choose a username</p>
		                        </div>
		                        <div className="grupo name">
		                            <label htmlFor="name">Name</label><br/>
		                            <input className="campo1" id="name" type="text" name="name" value={this.state.name} onChange={this.setName}/><br/>
		                            <p className="warn p2">Complete with your first and last names</p>
		                        </div>
		                        <div className="grupo email">
		                            <label htmlFor="email">E-mail</label><br/>
		                            <input id="email" type="email" name="email" className="campo1" value={this.state.email} onChange={this.setEmail}/><br/>
		                            <p className="warn p3">Complete with your e-mail</p>
		                        </div>
							</section>
							<section id="ladodir">
		                        <div className="grupo city">
		                            <label htmlFor="city">City</label>
		                            <label className="opt" htmlFor="optional">optional</label><br/>
		                            <input id="city" type="text" name="city" className="campo1" value={this.state.city} onChange={this.setCity}/><br/>
		                            <p className="warn p4">Complete with the city you live in</p>
		                        </div>
		                        <div className="grupo gp2" >
		                            <p className="ride">Ride in group?</p>
		                            <label className="choice">
		                                <input className="bolin" type="radio" name="radiob" id="radioal" value="Always" checked={this.state.ride === 'Always'} onChange={this.setRide}/>Always
		                                <span className="checkmark"></span>
		                            </label>
		                            <label className="choice">
		                                <input className="bolin" type="radio" name="radiob"
		                                id="radiosome" value="Sometimes" checked={this.state.ride === 'Sometimes'} onChange={this.setRide}/>Sometimes
		                                <span className="checkmark"></span>
		                            </label>
		                            <label className="choice">
		                                <input className="bolin" type="radio" name="radiob"
		                                id="radionev" value="Never" checked={this.state.ride === 'Never'} onChange={this.setRide} />Never
		                                <span className="checkmark"></span>
		                            </label>
		                        </div>
		                        <div className="grupo">
		                            <p className="days">Days of the week</p>
		                            <label className="choice2"> Sun
		                                <input id="sunday" className="bolin2" type="checkbox" name="sunday" checked={this.state.sun} onChange={this.setSun}/>
		                                <span className="checkmark2"></span>
		                            </label>
		                            <label className="choice2"> Mon
		                                <input id="monday" className="bolin2" type="checkbox" name="monday" checked={this.state.mon} onChange={this.setMon}/>
		                                <span className="checkmark2"></span>
		                            </label>
		                            <label className="choice2"> Tue
		                                <input id="tuesday" className="bolin2" type="checkbox" name="tuesday" checked={this.state.tue} onChange={this.setTue}/>
		                                <span className="checkmark2"></span>
		                            </label>
		                            <label className="choice2"> Wed
		                                <input id="wednesday" className="bolin2" type="checkbox" name="wednesday" checked={this.state.wed} onChange={this.setWed}/>
		                                <span className="checkmark2"></span>
		                            </label>
		                            <label className="choice2"> Thu
		                                <input id="thursday" className="bolin2" type="checkbox" name="thursday" checked={this.state.thu} onChange={this.setThu}/>
		                                <span className="checkmark2"></span>
		                            </label>
		                            <label className="choice2"> Fri
		                                <input id="friday" className="bolin2" type="checkbox" name="friday" checked={this.state.fri} onChange={this.setFri}/>
		                                <span className="checkmark2"></span>
		                            </label>
		                            <label className="choice2"> Sat
		                                <input id="saturday" className="bolin2" type="checkbox" name="saturday" checked={this.state.sat} onChange={this.setSat}/>
		                                <span className="checkmark2"></span>
	                            	</label>
	                        	</div>
							</section>
							<footer className="buttonsform">
						   		<button id="save">Save</button>
						   		<button id="discard" onClick={this.clearForm}>Discard</button>
						   		<span id="mensagens-erro">
									<ErrosForm/>
								</span>
					   		</footer>
                    	</form>
					</div>
				</section>
	        </div>
		);
	}
}
