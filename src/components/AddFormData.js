import React, { Component } from 'react';

class AddFormData extends Component {
	constructor(props) {
	    super(props);
	    this.state = { textName: '', textArea: '' };
	    this.onFormSubmit = this.onFormSubmit.bind(this);
	    this.textNameChange = this.textNameChange.bind(this);
	    this.textDescChange = this.textDescChange.bind(this);
	    this.cancelUpd = this.cancelUpd.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.upd.id) {
			this.setState({
				textName: nextProps.upd.name,
				textArea: nextProps.upd.desc
			});
		}else{
			this.setState({ textName:'', textArea: '' });
		}
	}

	textNameChange(e){ this.setState({ textName: e.target.value }) }
	textDescChange(e){ this.setState({ textArea: e.target.value }) }

	onFormSubmit(e) {
		e.preventDefault();
		if (this.props.upd.id) {
			// update component
			this.props.propUpd({ 
				id: this.props.upd.id, 
				name: this.state.textName, 
				desc: this.state.textArea 
			});
		} else {
			var formVal = {
				name: this.state.textName,
				area: this.state.textArea
			}
			this.props.onAdd(formVal);
		}
		this.setState({ textName:'', textArea: '' });
	}
	cancelUpd() {
		this.props.updcan();
		this.setState({ textName:'', textArea: '' });
	}

    render() {
        return (<form onSubmit={ this.onFormSubmit } className='well'>
        		<h1>{ this.props.upd.id ? 'Update Form':'Insert Form' }</h1>
                <div className='form-group'>
				    <label>Name</label>
				    <input type='text' className='form-control' 
				    	onChange={ this.textNameChange } 
				    	value={ this.state.textName  } />
				</div>
				<div className='form-group'>
				    <label>Description</label>
				    <textarea className="form-control" rows="3" 
				    	onChange={ this.textDescChange } 
				    	value={ this.state.textArea } 
				    ></textarea>
				</div>
               	<button type="submit" className="btn btn-success">
               		{ this.props.upd.id ? 'Save changes': 'Submit' }
               	</button>&nbsp;
               	{
               		this.props.upd.id ? 
               		(<button type="button" 
               			onClick={ this.cancelUpd } 
               			className="btn btn-default" >Cancel</button>
               		):null
               	}
            </form>   
        );
    }
}

export default AddFormData;