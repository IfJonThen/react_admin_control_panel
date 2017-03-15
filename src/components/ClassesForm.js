import React, {Component } from 'react';
import '../static/css/ClassesView.css';
import {Form,FormControl,Modal,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import {Button} from './ButtonGroup';
import ICAL from 'ical.js';
import SweetAlert from 'react-bootstrap-sweetalert';
import * as jLib from '../static/js/functions';
import Email from './Email';
import {Typeahead} from 'react-bootstrap-typeahead'
import {base} from '../static/js/firebaseRef';
import domtoimage from 'dom-to-image';
/*eslint no-unused-vars: "off",  array-callback-return:"off",no-use-before-define:"off"*/

class ClassesForm extends Component{

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
        console.log("ClassesForm::constructor::props.count " +props.count);
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
                jLib.pushToDB("Schedules/"+temp["user"],quarterItem);
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
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Enter member ID</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputID" placeholder="Member ID">
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12 col-form-label">
                <p style={{color:'black'}}> OR </p>
                    </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Look up user</label>
                        <div className="col-sm-8">
                        <select defaultValue="" className="form-control" id="selectUser">
                            <option></option>
                            {this.props.right}
                        </select>
                    </div>
                </div>
                <div className="form-group row ">
                    <label  className="col-sm-4 col-form-label">{(this.props.system)}</label>
                    <div className="col-sm-8">
                        <select defaultValue="" className="form-control" id="inputCQuarter">
                            <option></option>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row has-success has-feedback">
                    <label className="col-sm-4 col-form-label">Year</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputCYear" placeholder="Year">
                        </input>
                        <span style={{right:"15px"}} className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Select Classes:</label>
                        <div  id="classType" className="col-sm-8">
                            <Typeahead id="classSelect" onChange={this.onTypeaheadChange}selected={this.props.default} allowNew={true}emptyLabel={emptyLabel ?'':undefined} labelKey="Classes" multiple={true} options={this.props.options} placeholder="Choose a class"/>
                            {/*<Typeahead id="classSelect" defaultSelected={["I&C SCI 6B",'I&C SCI 31',"IN4MATX 43"]} allowNew={true}emptyLabel={emptyLabel ?'':undefined} labelKey="Classes" multiple={true} options={this.props.options} placeholder="Choose a class"/>*/}
                        </div>
                    </div>
                    <div className="form-group row">
                        <input style={{marginLeft:"26%",marginTop:"10px",marginBottom:"13px"}} onChange={this.fileGet}type="file" id="myFile"/>
                    </div>
                <Button cname="actionBtn" onClick={this.onButtonClick} id="insertmemberbtn" value="Add">Go</Button>
                {/*<Button cname="actionBtn" onClick={this.testClick2} id="insertmemberbtn" value="Add">Go</Button>*/}
            </Form>
            </div>

        );
    }
}
export class ClassView extends Component{
    constructor(props) {
        super(props);
        this.state = {users: [],classRef:{},classList:[],base:[],count:props.count, val:""};
        this.fetchData = this.fetchData.bind(this);
        this.fetchData();
        this.fetchFromDB=this.fetchFromDB.bind(this);
        this.fetchClassFromDB=this.fetchClassFromDB.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.count = props.count;
        this.handleRefreshBtn=this.handleRefreshBtn.bind(this);
        this.handleRemoveBtn=this.handleRemoveBtn.bind(this);
        this.loadClasses=this.loadClasses.bind(this);
        this.handleSend=this.handleSend.bind(this);
        this.loadClasses();
    }
    fetchData(){
        base.fetch('users', {context:this,asArray:true,
            then(data){
                if (this.state.count!==data.length){
                    this.setState({base:data,count:data.length});
                    this.count=data.length;
                    console.log("ClassView::fetch:: count changed successfully");
                }
                else{
                    console.log("ClassView::fetch::count changed unsuccesfully");
                }
            }});
    }
    handleSelect(event){
        this.loadClasses();
    }
    handleRemoveBtn(event) {
        event.preventDefault();
        let v = document.getElementById(this.props.selectID);
        v = v.options[v.selectedIndex].text;
        this.setState({show: true, val: v});
        let uid=jLib.selectUID(v);
        let quarter= jLib.getQuarter();
        console.log(quarter);
        this.fetchFromDB("Schedules/"+uid+"/"+quarter+"/","classList");
    }
    fetchClassFromDB(endpoint,id){
        base.fetch(endpoint, {
            context: this,
            asArray: true, then(data){
                console.log(data);
                let temp=this.state.classRef;
                temp[id]=data;
                this.setState({classRef:temp});
            }
        });
    }
    fetchFromDB(endpoint,val){
        base.fetch(endpoint, {
            context: this,
            asArray: true, then(data){
                console.log(data);
                let item={};
                let classItems={};
                item[val]=data;
                this.setState(item);
                for (let index =0;index< data.length;index++){
                    this.fetchClassFromDB("Classes/"+data[index],data[index]);
                }
            },
            onFailure(err){
                console.log(err);
            }
        });
    }
    handleSend(event){
        event.preventDefault();
        console.log("send clicked!!");
        let t= document.getElementsByClassName("modal-content");
        let d= document.getElementById("getThisImage");
        console.log(t[0]);
        console.log(d);
        domtoimage.toJpeg(t[0], {
        // domtoimage.toJpeg(document.getElementById('getThisImage'), {
            height:800,width:600,quality:0.95,bgcolor:"white" })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'email'+jLib.getQuarter()+'.jpeg';
                link.href = dataUrl;
                link.click();
            });

    }

    handleRefreshBtn(event){
        event.preventDefault();
        console.log("ClassView::handleRefresh::refreshing...");
    }
    loadClasses(){
        let t = document.getElementById("selectRemove");
        if (t!=null){
            t=t.options[t.selectedIndex].text;
            let v = document.getElementById("ClassViewer");
            if (v!==(null|| undefined)){
                let s = document.createElement("p");
                let j = document.createTextNode(t);
                s.appendChild(j);
                v.appendChild(s);
            }
        }
        else{
            return (<p>select a member</p>);
        }
    }
    render(){
        let t=null;
        let close = ()=>this.setState({show:false});
        return (
            <div className="splitform">
                <Form className="entryForm">
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <label id="editFormLabel">{this.props.formLabel}</label>
                            <select className="form-control" id={this.props.selectID}>
                               {this.props.right}
                            </select>
                            <div className="row">
                                <Button cname="actionBtn"onClick={this.handleRemoveBtn} id="getbtn" value="Get"/>
                                <Button cname="actionBtn"onClick={this.handleRefreshBtn} id="refreshbtn" value="Refresh"/>
                            </div>
                        </div>
                    </div>
                </Form>
                <Form id="ClassViewer">
                    {t}
                </Form>
                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title" id="getThisImage"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p style={{color:"black"}}id="ClassesModalTitle">{this.state.val}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Email user={this.state.val} classList={this.state.classList} classRef={this.state.classRef}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button cname="actionBtn" value="Send"onClick={this.handleSend}/>
                        <Button cstyle="{marginLeft:'20px'}"cname="actionBtn"value="Close"onClick={close}/>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    }
}
export default ClassesForm;

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