import React, {Component } from 'react';
import '../static/css/ClassesView.css';
import {Form,FormControl,Modal,ControlLabel,HelpBlock,FormGroup,Checkbox} from 'react-bootstrap';
import {Button} from './ButtonGroup';
import ICAL from 'ical.js';
import * as jLib from '../static/js/functions';
import Email from './Email';
import {Typeahead} from 'react-bootstrap-typeahead'
import {base} from '../static/js/firebaseRef';
import domtoimage from 'dom-to-image';
/*eslint no-unused-vars: "off",  array-callback-return:"off",no-use-before-define:"off"*/

class CustomForm extends Component{
    /*ClassesForm::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        this.state={list:{},count:this.props.count,upload:{}};
        this.onTypeaheadChange=this.onTypeaheadChange.bind(this);
        this.onButtonClick= this.onButtonClick.bind(this);
        this.fileGet=this.fileGet.bind(this);
        this.updateLists=this.updateLists.bind(this);
        this.classList=[];
    }
    /* ClassesForm()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    onTypeaheadChange(arr){
        this.props.onUpload(arr);
        return true;
    }

    onButtonClick(event){
        event.preventDefault();
        let item={};
        if((this.props.default.length)!==0 &&jLib.formValidation()){
            let temp=jLib.formExtraction();
            if (this.props.default.length>0) {
                let quarterItem={};
                quarterItem[temp["quarter"]]=this.props.default;
                let userItem={};
                console.log(temp["user"]);
                // userItem[temp["user"]]=quarterItem;
                console.log(JSON.stringify(userItem));
                let classItem={};
                console.log(classItem);
                this.updateLists(temp["quarter"],temp["user"]);
                console.log(jLib.pushToDB("Schedules/"+temp["user"],quarterItem));
            }
            else{
                alert("You have unfilled fields");
            }
        }
        else{
            alert("Please enter in the correct format");
            // alert(this.props.default.length!=0);
            // alert(jLib.formValidation());
        }

        // this.props.onClear();
    }
    updateLists(quarter,user){
        event.preventDefault();
        let arr =this.props.fetch;
        let defaultChoices=this.props.default;
        for (let i=0;i<defaultChoices.length;i++){

            let arrRef=arr[defaultChoices[i]];
            if (arrRef.indexOf(user)===-1){
                arr[defaultChoices[i]].push(user);
                let item={};
                item[defaultChoices[i]]=arr[defaultChoices[i]];
                jLib.pushToDB("Classes/",item);
            }
        }
    }

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
        if (f){
            var r = new FileReader();
            r.readAsText(f);
            r.onload = function(e){
                var contents = e.target.result;
                console.log("got the file.n"
                    + "name: "+ f.name +"\n"
                    + "type: " +f.type +"\n"
                    + "size: " +f.size + "bytes\n"
                );
                console.log(classes===undefined);
                classes=parseFile(contents);
                if (classes!==undefined){
                    console.log(JSON.stringify(classes));
                    // this.props.onUpload(classes);
                    this.props.onUpload(Object.keys(classes));
                    // this.setState({upload:Object.keys(classes)});
                }
                else{
                    alert("File read error");
                }
            }.bind(this);
            console.log(r);
        }else{
            alert("file upload error");
        }

    }

    render(){
        let defaultChoice=this.props.default;
        // console.log(defaultChoice);
        let options=this.props.options;
        let emptyLabel=true;
        return(
            <div className="splitform">
                <Form className="entryForm"id="classesform">
                {this.props.children}
                    {this.props.right}
                </Form>
            </div>

        );
    }
}
export default CustomForm;

var parseFile=(file)=>{
    console.log("__Starting parseFile__");
    // console.log(ICAL.parse(file));
    let schedule={};
    let jCal = ICAL.parse(file);
    let comp = new ICAL.Component(jCal);
    let veventArr=null;
    try{
        veventArr=comp.getAllSubcomponents("vevent");
    }catch(e){
        console.log("error in getting sub components");
    }

    if (veventArr!=null) {
        let propList=['rrule','location','dtstart','summary','dtend'];
        for (let index = 0; index < veventArr.length; index++) {
        // for (let index = 0; index < 1; index++) {
            let vevent = veventArr[index];
            let v = vevent.getFirstPropertyValue('summary');
            if (v.substr(0,5)==='Final'){
                console.log(v);
            }
            else{
                let k =jLib.getClassFormKey(v);
                v=k;
                if (schedule[v]===undefined) {
                    schedule[v]={};
                    propList.map((property) => {
                        let temp = "";
                        let value = vevent.getFirstPropertyValue(property);
                        let key = "";
                        switch (property) {
                            case 'rrule':
                                value = value.toJSON()['byday'];
                                key = "days";
                                break;
                            case 'dtstart':
                                value = value.toJSON();
                                value = value["hour"] + ":" + value["minute"];
                                key = "start"; break;
                            case 'summary':
                                value = value.split(' ');
                                temp = value[0] + " " + value[1];
                                value = temp;
                                key = "name";
                                break;
                            case 'dtend':
                                value = value.toJSON();
                                value = value["hour"] + ":" + value["minute"];
                                key = "end";
                                break;
                            default:
                                key = property;
                                break;
                        }
                        schedule[v][key] = value;
                    });
                }
                else{
                    // console.log('saved a cycle!!!');
                }
            }
        }
    }
    console.log("__Finishing parseFile__");
    return schedule;
}