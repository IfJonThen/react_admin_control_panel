import React, {Component } from 'react';
import '../static/css/ClassesView.css';
import {Form,FormControl,Modal,ControlLabel,HelpBlock,FormGroup,Checkbox} from 'react-bootstrap';
import * as jLib from '../static/js/functions';
import LineChart from 'react-chartjs';
import domtoimage from 'dom-to-image';
/*eslint no-unused-vars: "off",  array-callback-return:"off",no-use-before-define:"off"*/

class FormViewer extends Component{
    /*::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        this.state={list:{},upload:{}};
        this.onTypeaheadChange=this.onTypeaheadChange.bind(this);
        this.onButtonClick= this.onButtonClick.bind(this);
        this.fileGet=this.fileGet.bind(this);
        // this.updateLists=this.updateLists.bind(this);
        this.classList=[];
    }
    /* ClassesForm()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    onTypeaheadChange(arr){
        // this.props.onUpload(arr);
        return true;
    }

    onButtonClick(event){
        event.preventDefault();
        let item={};
        // if((this.props.default.length)!==0 &&jLib.formValidation()){
        //     let temp=jLib.formExtraction();
        //     if (this.props.default.length>0) {
        //         let quarterItem={};
        //         quarterItem[temp["quarter"]]=this.props.default;
        //         let userItem={};
        //         console.log(temp["user"]);
        //         // userItem[temp["user"]]=quarterItem;
        //         console.log(JSON.stringify(userItem));
        //         let classItem={};
        //         console.log(classItem);
        //         this.updateLists(temp["quarter"],temp["user"]);
        //         console.log(jLib.pushToDB("Schedules/"+temp["user"],quarterItem));
        //     }
        //     else{
        //         alert("You have unfilled fields");
        //     }
        // }
        // else{
        //     alert("Please enter in the correct format");
        //     // alert(this.props.default.length!=0);
        //     // alert(jLib.formValidation());
        // }

        // this.props.onClear();
    }
    // updateLists(quarter,user){
    //     event.preventDefault();
    //     let arr =this.props.fetch;
    //     let defaultChoices=this.props.default;
    //     for (let i=0;i<defaultChoices.length;i++){
    //
    //         let arrRef=arr[defaultChoices[i]];
    //         if (arrRef.indexOf(user)===-1){
    //             arr[defaultChoices[i]].push(user);
    //             let item={};
    //             item[defaultChoices[i]]=arr[defaultChoices[i]];
    //             jLib.pushToDB("Classes/",item);
    //         }
    //     }
    // }

    /*ClassesForm()::addToDB()
    * helper function. takes arguments and places them into firebase
    * sends an Alert(for now upon success)
    * */
    fileGet(evt){
        let classes = {};
        if (window.File && window.FileReader&& window.FileList &&window.Blob){
        }
        else{
            alert("file apis not supported");
        }
        var f = evt.target.files[0];
        // if (f){
        //     var r = new FileReader();
        //     r.readAsText(f);
        //     r.onload = function(e){
        //         var contents = e.target.result;
        //         console.log("got the file.n"
        //             + "name: "+ f.name +"\n"
        //             + "type: " +f.type +"\n"
        //             + "size: " +f.size + "bytes\n"
        //         );
        //         console.log(classes===undefined);
        //         classes=jLib.parseFile(contents);
        //         if (classes!==undefined){
        //             console.log(JSON.stringify(classes));
        //             this.props.onUpload(Object.keys(classes));
        //         }
        //         else{
        //             alert("File read error");
        //         }
        //     }.bind(this);
        //     console.log(r);
        // }else{
        //     alert("file upload error");
        // }
    }
    render(){
        // let defaultChoice=this.props.default;
        // let options=this.props.options;
        let emptyLabel=true;
        let chartData2= {data: [45, 25, 20, 10]};
        let chartData = {
            datasets: [{
                data: [45, 25, 20, 10],
            }],
            labels: ['Red', 'Blue', 'Purple', 'Yellow']
        };
        let chartOptions={showLines:true,spanGaps:true};
        return(
                <div id="ChartArea">

                    <LineChart data={chartData2}
                               options={chartOptions}
                               width="600"
                               height="400"/>
                </div>
            );
    }
}
export default FormViewer;

