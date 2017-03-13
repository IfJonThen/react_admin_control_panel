import React, {Component } from 'react';
import '../static/css/ClassesView.css';
import * as jLib from '../static/js/functions';
import {base} from '../static/js/firebaseRef';
/*eslint no-useless-constructor:"off",
 no-unused-vars: "off",
 no-use-before-define:"off"*/
export default class Email extends Component{
    constructor(props) {
        super(props);
        this.func=this.func.bind(this);
    }

    func(course){
        let temp;
        if (this.props.classRef[course]!==undefined){
            temp=(this.props.classRef[course]).map((data)=>{
                return (
                    <tr><td key={data} className="emailData">{data}
                    </td></tr>);
            })
            return temp;
        }
    }
    render(){
        console.log("ClassList is "+ this.props.classList);
        console.log("ClassRef is "+ JSON.stringify(this.props.classRef));
        let cList=this.props.classList;
        let cRef=this.props.classRef;

        return (
            <div className="emailForm">
                <div id="contained-modal-body">
                    {
                        (this.props.classList).map((course)=>{
                            console.log(course);
                            let t;
                            if (this.props.classRef[course]!==undefined){
                                t=this.props.classRef[course];
                            }
                            return (<table key={course} className="table">
                                <thead><tr><th scope="row">{course}</th></tr></thead>
                                <tbody>

                                    {this.func(course)}

                                </tbody>
                            </table>);
                        })
                    }
                    </div>
            </div>
        );

    }
}
export class emailData extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <td className="emailData">{this.props.key}
            </td>

        );
    }
}