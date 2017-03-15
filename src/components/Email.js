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
        this.uid=jLib.selectUID(this.props.user);
    }

    func(course){
        let temp;
        if (this.props.classRef[course]!==undefined){
            temp=(this.props.classRef[course]).map((data)=>{
                console.log(this.uid);
                if (data ===this.uid){

                }
                else {
                    return (
                        <tr>
                            <td key={data+"grade"} className="gradeData">A
                            </td>
                            <td key={data} className="nameData">{data}
                            </td>
                            <td key={data + "email"} className="emailData">{data + 's email address'}
                            </td>
                        </tr>);
                }
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
                                <thead className="thead-inverse"><tr><th scope="row">{course}</th></tr></thead>
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