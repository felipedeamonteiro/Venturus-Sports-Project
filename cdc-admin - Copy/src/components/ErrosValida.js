import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class ErrosForm extends Component{
    constructor(){
        super();
        this.state = {msgerr: []};
    }

    componentDidMount(){
        PubSub.subscribe("erros-validacao", function(topico, erro){
            this.setState({msgerr: erro});
        }.bind(this));

        PubSub.subscribe("limpa-erros",function(topico){
			this.setState({msgerr:[]});
		}.bind(this));

    }

    render(){
        return(
            <ul>
                {this.state.msgerr.map((erro1, ind)=>{
                    return(
                        <li key={ind}>{erro1}</li>
                    );
                })}
            </ul>
        );
    }
}
