import React, { Component } from 'react';
import $ from "jquery";

class TableBody extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { isToggleOn: false };
        this.updateBtn = this.updateBtn.bind(this);
        this.handleCbox = this.handleCbox.bind(this);
    }

    updateBtn(e) {
        this.props.onUpd( e.target.dataset.item );
    }

    handleCbox() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
        var cnt = $('#tableSample').find('input:checkbox[name=cbox]:checked');
        if (cnt.length) {
            $('#del_rowBtn').show();
        }else{
            $('#del_rowBtn').hide();
        }
        this.props.canHan();
    }

    render() {
        const divStyle = {
          margin: 0,
        };

        return (
                <tr id={'tr-'+ this.props.TRs.id.toString() } >
                    <td>
                    <div className="checkbox" style={ divStyle } >
                        <label>
                            <input name='cbox' onChange={ this.handleCbox } 
                                    type="checkbox" 
                                    id={ 'check_bx'+ this.props.TRs.id }
                                    value={this.props.TRs.id} /> 
                            &nbsp;{ this.props.TRs.id }</label>
                        </div>
                    </td>
                    <td>{ this.props.TRs.name }</td>
                    <td>{ this.props.TRs.desc }</td>
                    <td>
                        { this.state.isToggleOn ? (
                            <button disabled className="btn btn-xs btn-default" >Edit</button>
                            ):(
                            <button onClick={ this.updateBtn } 
                                    data-item={ this.props.TRs.id } 
                                    className="btn btn-xs btn-default" >
                            Edit</button>        
                            )
                        }    
                        </td>
                </tr>
        );
    }
}

export default TableBody;