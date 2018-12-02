import React, { Component } from 'react';
import $ from "jquery";
import AddFormData from './AddFormData';
import TableBody from './TableBody';

class SampleTable extends Component {
    constructor(props, context) {
        super(props);
        
        this.state = {
            showForm: false,
            TRs: [
              {
                id: 1,  
                name: 'Sanix',
                desc: 'Is it fair to think how the world end up like what we have now?'
              }
            ],
            UPD:[]
        };
        this.deleteRow = this.deleteRow.bind(this);
        this.onAddForm = this.onAddForm.bind(this);
        this.delNrow = this.delNrow.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.cancelUpd = this.cancelUpd.bind(this);
        this.propcessUpd = this.propcessUpd.bind(this);
    }
    // delete multiple data
    deleteRow(z) {
        var array = this.state.TRs;
        var index = array.findIndex(e => e.id == z)
        array.splice(index, 1);
        this.setState({ TRs: array });
    }

    delNrow() {
        var cof = this.confirm('are you sure !!');
        if (cof) {
            const tbox = $('#tableSample').find('input:checkbox[name=cbox]:checked');
            var arr = [];
            tbox.each(function(){
                arr.push(parseInt($(this).val()));
            });
            for (var i = 0; i < arr.length; i++) {
                this.deleteRow(arr[i]);
            }
            $('#del_rowBtn').hide();
        }
    } // end of delete function

    // add form data
    onAddForm(formVal) {
        var ctr = this.state.TRs.length + 1;
        var Ndata = {
            id: ctr,
            name: formVal.name,
            desc: formVal.area
        }
        this.setState({ TRs: this.state.TRs.concat([Ndata]), UPD: {} })
    } // end add form function

    updateRow(x) {
        var array = this.state.TRs;
        var index = array.findIndex(e => e.id == x);
        this.setState({
            UPD: this.state.TRs[index]
        });
    }

    cancelUpd() {
        this.setState({ UPD: [] });
    }
    
    propcessUpd(formVal) {
        var obj = this.state.TRs;
        var index = obj.findIndex(e => e.id == formVal.id)
        obj[index] = formVal;
        this.setState({ TRs: obj, UPD: [] });
    }

    componentDidMount(){
        // this.setState({ TRs: this.props.tableRow })
    }

    showForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    closeForm = () => {
        this.setState({
            showForm: false
        })
    }
    render() {
        const display = {
            display: 'none'
        }
        const tRow = this.state.TRs.map(tr => (
            <TableBody onUpd={this.updateRow} showForm={this.showForm} TRs={ tr } key={tr.id} canHan={ this.cancelUpd } />
        ))

        const size_box_table = (this.state.showForm) ? "col-md-8" : "col-md-12";

        return (
            <div className='row margin-top'>
                {this.state.showForm ? 
                    <div className='col-md-4'>
                        <AddFormData 
                            closeForm={this.closeForm}
                            onAdd={ this.onAddForm } 
                            upd={ this.state.UPD } 
                            updcan={ this.cancelUpd } 
                            propUpd= { this.propcessUpd } />
                    </div>
                : null}
                <div className={size_box_table}>
                    <button style={{float:'right'}} onClick={() => this.showForm()}>Show / Hide Form</button>
                    <div className='row h35'>
                        <div className='col-md-6'>
                            <button onClick={ this.delNrow } id='del_rowBtn' 
                                    className='btn btn-xs btn-default' 
                                    style={display} >Delete in Row</button>
                        </div>
                        <div className='col-md-offset-2 col-md-4'>
                        </div>
                    </div>
                    <table className="table table-hover table-striped table-bordered" id='tableSample' >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Desc</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>{ tRow }</tbody>
                    </table>
                </div>    
            </div>
            );
    }
}

export default SampleTable;