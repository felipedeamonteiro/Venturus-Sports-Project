import React, { Component } from 'react';
import './css/index.css'
import 'font-awesome/css/font-awesome.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
// eslint-disable-next-line
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faAngleDown, faHome, faAngleRight, faPuzzlePiece, faTrophy, faMapSigns } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line
import { faLifeRing as faLifeRingRegular, faSmile as faSmileRegular } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import MenuDropdown from './components/DropdownMenu';

library.add(faSquare, faHome, faAngleDown, faAngleRight, faPuzzlePiece, faTrophy, faMapSigns);


//Aqui teremos o header do site que mudará tanto o bradcrump quanto o dropdown menu.

export default class App extends Component {

    componentDidMount(){
        if(sessionStorage.userlogin===undefined){
            sessionStorage.setItem('initials', 'UN');
            sessionStorage.setItem('logname', "USER'S NAME");
        }

    }

    render() {
        return (
            <div>
                <header className="cabecalho">
                    <div className="container1">
                        <section className="esquerda">
                            <FontAwesomeIcon icon={faSquare} className="fas fa-square"/>
                            <h3 className="titulo">Venturus Sports</h3>
                        </section>
                        <MenuDropdown />
                    </div>
                    <section className="exten">
                        <div className="container cont2">
                            <a href="/"><FontAwesomeIcon icon={faHome} className="fa-home" href="home"/></a>
                            <FontAwesomeIcon icon={faAngleRight} className="fas fa-angle-right"/>
                            <a href="/users" className="pagen" to="/users">Users</a>
                            <FontAwesomeIcon icon={faAngleRight} className="fas fa-angle-right"/>
                            <a href="/users/new" className="pagen">Registration</a>
                        </div>
                    </section>
                    <div className="container cont3">
                        <section className="cont2esq">
                            <section className="sport-type">
                                <FontAwesomeIcon icon={faPuzzlePiece} className="fa fa-puzzle-piece"/>
                                <div>
                                    <a href="#sport" className="cable1">sport type</a><br/>
                                    <a href="#cycling" className="cable2">Cycling</a>
                                </div>
                            </section>
                            <section className="mode">
                                <FontAwesomeIcon icon={faTrophy} className="fas fa-trophy"/>
                                <aside>
                                    <a href="#mode" className="cable1">mode</a><br/>
                                    <a href="#advanced" className="cable2">Advanced</a>
                                </aside>
                            </section>
                            <section className="route">
                                <FontAwesomeIcon icon={faMapSigns} className="fas fa-map-signs"/>
                                <div>
                                    <a href="#route" className="cable1">Route</a><br/>
                                    <a href="#miles" className="cable2">30 miles</a>
                                </div>
                            </section>
                        </section>
                        <section>
                            <a href="# ">     </a>
                        </section>
                    </div>
                </header>

                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
