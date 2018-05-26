import React, { Component } from 'react';
import '../static/css/MainView.css';
import {Button} from './ButtonGroup';
import RosterForm,{RosterEdit} from './RosterForm';
import CustomForm from './Form';
import RightPaneView from './RightPaneView';
import {Form} from 'react-bootstrap';

import {base} from "../static/js/firebaseRef";
/*eslint no-unused-vars: "off"*/

class RosterView extends Component{

    /*RosterView()::constructor()
    * bind the functions..thanks es6 -_-
    * set states to default (empty or 0)
    * calls pullDB() to fill states. will most likely change to re-base.syncState in the future
     *  */
    constructor(props){
      super(props);
      this.count=0;
      this.state={pane:"addR",count:0,base:[]};
      this.handleSelect=this.handleSelect.bind(this);
      this.onChange=this.onChange.bind(this);
      this.pullList2=this.pullList2.bind(this);
      // this.pullDB=this.pullDB.bind(this);
      this.loadSections=this.loadSections.bind(this);
      // this.pullDB();
    }
    componentDidMount(){
        // console.log("RosterView::componentDidMount()::");
        // var firebaseRef = firebase.database().ref("Names");
        base.syncState("users",{
            context:this,
            state:'base',
            asArray:true
        });

    }
    /*RosterView()::loadSections()
    * helper function
    * makes a call to pullList, may remove in the future
     */
    loadSections(){
        this.pullList();
    }
    /*RosterView()::onChange()
     * helper function for Rosterform to generate children for props
     * makes a call to pullDB, may remove in the future
     */
    onChange(){
        if (this.state.count===undefined){
            this.pullDB();
            return this.state.count;
        }
        else{
            return this.state.count;
        }
    }

    /*RosterView()::handleSelectR()
     * handler function for the Remove Button
     * changes state to "remove"
     * */
    handleSelect(event){
        this.setState({pane:event.target.id});
    }
    /*
    * RosterEdit()::pullList2
    * generates children for RosterEdit select form based on the number of children in state.base
    *
    * */
    pullList2(){
        let v = [];
        var t =document.getElementById("selectRemove");
        // console.log("RosterView::pullList2:: this.state.base:" +this.state.base);
        for(let j =0; j<this.state.base.length;j++){
            if((this.state.base[j]['first']&& this.state.base[j]['last'])!==(null||undefined)) {
                if (typeof this.state.base[j] !== 'string') {
                    let l = this.state.base[j]['first']+ " "+ this.state.base[j]['last'] +' - '+ this.state.base[j]['quarter']+" "+this.state.base[j]['year'];
                    v.push(<option key={j}>{l}</option>);
                }
                else{
                    console.log("RosterView::pullList()...no children added");
                }
            }
        }
        // console.log("RosterForm: pullList2: added "+v+" options");

        return v;
    }

    /*RosterView()::Render()
     * controlled by App.js conditionally renders left and right panes
      * if state is add, renders RosterForm
      * if state is remove, renders RosterEdit
     */
    render() {

        let left =
            <div className="leftPane">
                <div className="paneRow">
                    <Button cname="paneBtn"  onClick={this.handleSelect}id="addR" value="Add Member"/>
                </div>
                <div className="paneRow">
                    <Button cname="paneBtn"  onClick={this.handleSelect}id="editR" value="Edit Member"/>
                </div>

                <div className="paneRow">
                    <Button cname="paneBtn"  onClick={this.handleSelect}id="removeR" value="Remove Member"/>
                </div>

                <div className="paneRow">
                    <Button cname="paneBtn"  onClick={this.handleSelect}id="read" value="Read Transcripts"/>
                </div>
            </div>;
        let right =null;
        if (this.state.pane==="addR"){
            // let count= this.onChange();
            right= <RosterForm count={this.state.base}/>;
        }
        else if (this.state.pane==='removeR'){
            let v = this.pullList2();
            right=<RosterEdit right={v} count={this.state.count}/>;
        }
        else if (this.state.pane==='editR'){
            let v = this.pullList2();
            right=<RightPaneView right={v} count={this.state.count}/>;
        }
        else{
            let v = this.pullList2();
            let ar = MemID();
            // let l = [ar,selectOptions(v)];
            right=<CustomForm right={v}>
                {/*<FormData select={v}/>*/}
                <MemID/>
                <OrDivider/>
                <selectOptions data={v}/>
                    </CustomForm>;
        }
        return (
            <div>
                <SplitPane pane={this.state.pane} left={left} right={right}>
                    </SplitPane>
                    </div>
            );

    }
}
RosterView.propTypes={
    count:React.PropTypes.number
};
RosterView.defaultProps={
    count:0
};
function SplitPane(props){
    return(<div className="SplitPane">
        <div className="SplitPane-left">
            {props.left}
        </div>
        <div className="SplitPane-right">
            {props.right}
        </div>

    </div>);
}

export default RosterView;


function FormData(data,options){
    return (
        <div className="wut">
<Form className="entryForm"id="classesform">
    <MemID/>

    <selectOptions options={options}/>
    <div className="form-group row">
        <input style={{marginLeft:"26%",marginTop:"10px",marginBottom:"13px"}} type="file" id="myFile"/>
    </div>
    <Button cname="actionBtn" id="insertmemberbtn" value="Add">Go</Button>
</Form>
</div>
    );
}
function MemID(){
    return (<div className="form-group row">
        <label className="col-sm-4 col-form-label">Enter member ID</label>
        <div className="col-sm-8">
            <input type="name" className="form-control" id="inputID" placeholder="Member ID">
            </input>
        </div>
    </div>);
}
function OrDivider(){
    return (<div className="form-group row">
        <div className="col-sm-12 col-form-label">
            <p style={{color:'black'}}> OR </p>
        </div>
    </div>);
}
function selectOptions(data){
    console.log(data);
    return  (<div className="form-group row">
        <label className="col-sm-4 col-form-label">Look up user</label>
        <div className="col-sm-8">
            <select defaultValue="" className="form-control" id="selectUser">
                <option/>
                {data}
            </select>
        </div>
    </div>);
}
