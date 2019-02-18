import * as React from 'react';
import './App.css';

import * as njk from "nunjucks";

import {JSONSchema6TypeName} from "json-schema";
import Form, {IChangeEvent}from "react-jsonschema-form";

import logo from './logo.svg';

const schema = {
  properties: {
    done: {
      default: false,
      title: "Done?",
      type: "boolean" as JSONSchema6TypeName,
    },

    title: {
      default: "A new task",
      title: "Title",
      type: "string" as JSONSchema6TypeName,
    },
  },
  required: ["title"],
  title: "Todo",
  type: "object" as JSONSchema6TypeName,
};


// const log = (type: string) => console.log(type);
const template = njk.compile("{{ title }}, {{ done }}")
const onSubmit = (e: IChangeEvent) => {
  console.log(template.render(e.formData))
}

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Form
          schema={schema}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

export default App;
