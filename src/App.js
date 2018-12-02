import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import SampleTable from './components/SampleTable';

class App extends Component {

  Mydata(){
    var obj = [];
    $.ajax({
      async: false,
      global: false,
      dataType: 'json',
      type:'GET',
      url: 'http://jsonplaceholder.typicode.com/posts',
      success:function(data){
        for (var i = 0; i < 3; i++) {
          obj[i] = {
            'id': i+1,
            'name': data[i].title,
            'desc': data[i].body     
          };
        } 
      }
    });
    return obj;
  }

  componentDidMount(){
    $(document).ready(function() {
      //$('#tableSample').DataTable();
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <SampleTable tableRow={() => this.Mydata()} />
        </header>
      </div>
    );
  }
}

export default App;
