import React, {Component } from 'react';
import '../static/css/ClassesView.css';
import {Form,FormControl,Modal,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import * as firebase from 'firebase';
import {Button} from './ButtonGroup';
import ReactFireMixin from 'reactfire';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import {getUID,parseForm,getValue, hasValues,getSelectText} from '../static/js/functions';
import {Typeahead} from 'react-bootstrap-typeahead'
/*eslint no-unused-vars: "off"*/
import {firebaseAuth} from '../static/js/firebaseAuth';

//brings in the Rebase object
var fbase = Rebase.createClass({
    apiKey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
    authDomain:"classexaminer.firebaseapp.com",
    databaseURL:"https://classexaminer.firebaseio.com",
    storageBucket:"classexaminer.appspot.com",
    messagingSenderId:"150507520756"
});
class ClassesForm extends Component{

    /*ClassesForm::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        this.fillDB =this.fillDB.bind(this);
        // this.count=props.count;
        this.state={count:this.props.count};
        this.onButtonClick= this.onButtonClick.bind(this);
        this.addToDB=this.addToDB.bind(this);
        console.log("ClassesForm::constructor::props.count " +props.count);
    }
    fillDB(arr,mem){
        for (let j=0;j<mem.length-3;j++){
            console.log(getUID(mem[j].label));
        }
        let t={"jyuen2013": "jlyuen@uci.edu"}
        fbase.update('email', {
                data: t,
                then(err){
                    if (!err) {
                        alert("ClassesForm:buttonHandler: successfully added " + t[0])
                    } else{
                        alert("Error " + err);
                    }
                }
            });

    }
    /* ClassesForm()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    onButtonClick(event){
        event.preventDefault();
        let t = document.getElementById("classesform").getElementsByTagName("input");
        let info = hasValues([],[].slice.call(t));
        info.push(getSelectText("inputCQuarter"));
        info.push(getSelectText("selectUser"));
        let selects = ["selectUser","inputCQuarter"];
        console.log(selects.map(getSelectText));
        console.log(info);
        console.log(getUID(getSelectText("selectUser")));
        let uid= getUID(getSelectText("selectUser"));
        // let d = document.getElementById("classType");
        let d = document.getElementsByClassName("token-removeable");
        let s = [];
        for (let i =0;i<d.length;i++){
            s[i]=d[i].childNodes[1].data;
        }
        console.log(s);
        let abc = document.getElementsByTagName("option");
        console.log(abc);
        this.fillDB(s,abc);
        this.fileGet=this.fileGet.bind(this);
    }

    /*ClassesForm()::addToDB()
    * helper function. takes arguments and places them into firebase
    * sends an Alert(for now upon success)
    * */
    fileGet(evt){
        if (window.File && window.FileReader&& window.FileList &&window.Blob){

        }
        else{
            alert("file apis not supported");
        }
        var f = evt.target.files[0];
        // console.log(f[0]);

        if (f){
            var r = new FileReader();
            console.log(r.readAsText(f));

            r.onload = function(e){
                var contents = e.target.result;
                console.log("got the file.n"
                    + "name: "+ f.name +"\n"
                    + "type: " +f.type +"\n"
                    + "size: " +f.size + "bytes\n"
                    +"starts with: "+ contents
                );
                // var obj =JSON.parse(contents);
                // console.log(obj.Classes[0].Dept==="ICS");
                console.log(contents);
                // parseInfo(contents);
            }
            // r.readAsText(f);
        }else{
            console.log("failed to load file");
        }
    }

    addToDB(fname,lname,quarter,year){
        // console.log("ClassesForm add "+ this.count);
        let t = {};
        if (this.state.base!==undefined) {
            t= {first:fname,last:lname,quarter:quarter,year:year};
            this.setState({base:this.state.base.concat([t])});
        }
    }
    componentWillMount(){
        // console.log("ClassesForm::componentWillMount()");
        let t = {};
        if(this.state.base!==undefined) {
            // this.setState({count:this.state.base.length});
        }
    }
    componentDidMount() {
        // console.log("ClassesForm::componentDidMount()::");
        fbase.syncState("users",{
            context:this,
            state:'base',
            asArray:true
        });
        fbase.syncState("classes",{
            context:this,
            state:'classes',
            asArray:true
        });
    }

    render(){
        // let t=null;
        let t="   ID";

        if (this.state.count===0 || this.state.count===null){
            // t="KEYERROR"+this.state.count;
        }
        else{
            t="   id";
        }
        let options=this.props.options;
        let emptyLabel=true;
        return(
            <div className="splitform">
                <Form className="entryForm"id="classesform">
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Enter member ID</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputID" placeholder={t}>
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
                    <select className="form-control" id="selectUser">
                        {this.props.right}
                    </select>
                    </div>
                </div>
                <div className="form-group row ">
                    <label  className="col-sm-4 col-form-label">{(this.props.system)}</label>
                    <div className="col-sm-8">
                        <select className="form-control" id="inputCQuarter">
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row has-success has-feeedback">
                    <label className="col-sm-4 col-form-label">Year</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputCYear" placeholder="Year">
                        </input>
                        <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Select Classes:</label>
                        <div  id="classType" className="col-sm-8">
                            <Typeahead emptyLabel={emptyLabel ?'':undefined} labelKey="Classes" multiple={true} options={this.props.options} placeholder="Choose a class"/>
                        </div>
                    </div>


                <Button onClick={this.onButtonClick} id="insertmemberbtn" value="Add">Go</Button>
                <input onChange={this.fileGet}type="file" id="myFile"/>
            </Form>
            </div>

        );
    }
}
export class ClassView extends Component{
    constructor(props) {
        super(props);
        this.state = {users: [],base:[],count:props.count, val:""};
        this.fetchData = this.fetchData.bind(this);
        this.fetchData();
        this.handleSelect=this.handleSelect.bind(this);
        this.count = props.count;
        this.handleRefreshBtn=this.handleRefreshBtn.bind(this);
        this.handleRemoveBtn=this.handleRemoveBtn.bind(this);
        this.loadClasses=this.loadClasses.bind(this);
        this.loadClasses();
    }
    fetchData(){
        fbase.fetch('users', {context:this,asArray:true,
            then(data){
                if (this.state.count!==data.length){
                    this.setState({base:data,count:data.length});
                    this.count=data.length;
                    console.log("ClassView::fetch:: count changed successfully");
                }
                else{
                    console.log("ClassView::fetch::count changed unsuccesfully");
                }
                // console.log("ClassView:: fetched data success " + data + data.length +this.state.count);

            }});
    }
    handleSelect(event){
        console.log(event.target.id);
        this.loadClasses();
    }
    handleRemoveBtn(event){
        event.preventDefault();
        // let t = document.getElementById("selectRemove");
        // console.log("ClassView::handleRemove::"+t.options[t]);
        let v = document.getElementById(this.props.selectID);
        v=v.options[v.selectedIndex].text;

        this.setState({show:true,val:v});

    }
    handleRefreshBtn(event){
        event.preventDefault();
        console.log("ClassView::handleRefresh::refreshing...");
        setTimeout(this.pullList(),500);
    }
    createUID(fname,lname){
        if(fname.length!==0 &&lname.length!==0) {
            return fname[0]+lname;
        }
    }

    componentDidMount(){
        // console.log("ClassView did mount()");

    }
    componentWillMount(){
        // console.log("ClassView will mount()");
    }
    componentWillUpdate(){
        // console.log("ClassView will update()");

        if(this.count!==0){
            // console.log("ClassViewWillUpdate : "+this.fetchData());
        }
        else{
            // console.log("database is empty");

        }
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
            // return (<p> template classes</p>);
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
                <Form>
                    <div className="form-group">
                    <label id="editFormLabel" style={{color:"white"}}>{this.props.formLabel}</label>
                    <select className="form-control" id={this.props.selectID}>
                        {this.props.right}
                    </select>
                        <Button onClick={this.handleRemoveBtn} id="removebtn" value="Get"/>
                        <Button onClick={this.handleRefreshBtn} id="refreshbtn" value="Refresh"/>

                    </div>
                </Form>
                <Form id="ClassViewer">
                    {t}
                </Form>
                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <p style={{color:"black"}}id="ClassesModalTitle">{this.state.val}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p id="contained-modal-body">
                        TEST TEST TEST
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modalBtn" value="Send"onClick={close}></Button>
                        <Button className="modalBtn"value="Close"onClick={close}></Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    }
}
export default ClassesForm;
