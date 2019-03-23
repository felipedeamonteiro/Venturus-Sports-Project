import React, { Component } from 'react';
import '../css/index.css'
import 'font-awesome/css/font-awesome.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


library.add( faAngleDown );

export default class MenuDropdown extends Component{
    constructor(){
        super();
        this.state = {
            displayMenu: false,
            initials: 'UN',
			name: "USER'S NAME"
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.escFunction = this.escFunction.bind(this);
        this.funcLogOut = this.funcLogOut.bind(this);

    };

    showDropdownMenu(event){
        event.preventDefault();
        if(sessionStorage.userlogin==="true"){
            this.setState({displayMenu: true}, ()=>{
                document.addEventListener('click', this.hideDropdownMenu)
            });
        }
    }

    hideDropdownMenu(event){
        this.setState({displayMenu: false}, ()=>{
            document.removeEventListener('click', this.hideDropdownMenu)
        });
    }

    escFunction(event){
        if (event.key === "Escape"){
            this.setState({displayMenu:false}, ()=>{
                    document.removeEventListener('keydown', this.hideDropdownMenu)
                }
            );
        }
    }

    componentDidMount(){

        document.addEventListener("keydown", this.escFunction, false);

        if(sessionStorage.iniciando===undefined){
            sessionStorage.setItem('iniciando', '1');
            this.setState({
                initials: this.state.initials,
    			name: this.state.name
            });
        }else{
            this.setState({
                initials: sessionStorage.initials,
                name: sessionStorage.logname
            });
        }
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);

    }

    funcLogOut(event){
        event.preventDefault();
        sessionStorage.setItem('initials', 'UN');
        sessionStorage.setItem('logname', "USER'S NAME");
        sessionStorage.removeItem('userlogin');
        this.setState({
            initials: sessionStorage.initials,
			name: sessionStorage.logname
        });
        sessionStorage.removeItem('infouser');
        sessionStorage.removeItem('count');
        sessionStorage.removeItem('teste');
        sessionStorage.removeItem('formInfo');
        sessionStorage.removeItem('segIf');

        window.location.reload();

    }

    render(){

        return(
            <section className="direita">
                <div className="iniciais-usuario" onClick={this.showDropdownMenu}>{this.state.initials}
                </div>
                <div className="dropdown">
                    <button onClick={this.showDropdownMenu} className="buttonu" type="button" name="user-information">{this.state.name}
                        <FontAwesomeIcon icon={faAngleDown} onClick={this.showDropdownMenu} className="fas fa-angle-down"/>
                    </button>
                    {this.state.displayMenu ?(
                        <div id="myDropdown" className="dropdown-content">
                            <a href='#friends' className="topd" >Friends List</a>
                            <a href='#itens'>Saved Items</a>
                            <a href='#notes'>Notifications</a>
                            <a href='#prefs'>User Preferences</a>
                            <hr className="drpline"/>
                            <a href='#logout' onClick={this.funcLogOut}>Log out</a>
                        </div>):(null)
                    }
                </div>
            </section>
        );
    }
}
