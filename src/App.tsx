import * as React from 'react';
import './App.css';

import Form, {IChangeEvent}from "react-jsonschema-form";
import * as axiosBase from "axios";

const axios = axiosBase.default.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': "*"
  },
  responseType: 'json'
});

const onSubmit = (e: IChangeEvent) => {
  axios.post("/api/save", e.formData)
}

interface AppState {
  data: any
}

class App extends React.Component<{}, AppState> {
  public state = {
    data: {}
  }

  public componentDidMount(){
    console.log("here")
    axios.get("/api/spec").then((res: any) => {
      return res
    }).then((json: {data: any}) => {
      console.log(json)
      this.setState({
        data: json.data
      })
    }).catch(error => console.log(error))
  }

  public render() {
    return (
      <div className="App">
        <Form
          schema={this.state.data}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

export default App;
