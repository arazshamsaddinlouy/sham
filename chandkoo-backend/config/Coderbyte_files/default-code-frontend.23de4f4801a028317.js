window.__DEFAULT_CODE_FRONTEND_BASE_CODERBYTE={'HTML':function(code){return{files:{"index.html":{content:code}},}},'JavaScript':function(code){return{files:{"src/index.js":{content:code}},}},'React':function(code){return{files:{"src/index.js":{content:code}},}},'ReactTypeScript':function(code){return{files:{"src/index.tsx":{content:code}},}},'ReactNative':function(code){return{files:{"src/App.js":{content:code}},}},'Vue':function(code){return{files:{"src/App.vue":{content:code}},}},'Vue3':function(code){return{files:{"src/App.vue":{content:code}},}},'Angular':function(code){return{files:{"src/app/app-area.component.ts":{content:code}},}},'AngularJS':function(code){return{files:{"src/index.js":{content:code},"src/index.ejs":{content:`
          <html>
            <body>
              <div id="root" ng-app="myApp" ng-controller="myController as myCtrl">
                <div>{{ myCtrl.title }}</div>
                <div id="getButtonCounter">{{ myCtrl.buttonClickCount }}</div>
                <button id="clickButtonCounter" ng-click="myCtrl.increaseCount()">Increase</button>
              </div>
            </body>
          </html>
          `}}}},'Flutter':function(code){return{files:{"lib/main.dart":{content:code}},}},'Webpack':function(code){return{files:{"src/index.js":{content:code}},}},'Svelte':function(code){return{files:{"src/App.svelte":{content:code}},}},};window.__DEFAULT_CODE_FRONTEND_MAIN={'HTML Anchor Link':function(){return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML Challenge</title>
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
`},'HTML Basic Table':function(){return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML Challenge</title>
  </head>
  <body>
    <h1>Table will go here</h1>
  </body>
</html>
`},'Bootstrap Simple Buttons':function(){return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Bootstrap Challenge</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" >
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
`},'HTML CSS Grid Layout':function(){return `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Grid Layout Challenge</title>
    <style>
      #grid-container {}
      .grid-item {}
    </style>
  </head>
  <body>
    <div id="grid-container">
      <div class="grid-item">Item 1</div>
      <div class="grid-item">Item 2</div>
      <div class="grid-item">Item 3</div>
      <div class="grid-item">Item 4</div>
    </div>
  </body>
</html>
`},'HTML CSS Footer Layout':function(){return `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Footer Layout Challenge</title>
    <style>
      /* Your CSS code goes here */
    </style>
  </head>
  <body>
    <footer class="site-footer">
      <div class="footer-section">Contact: contact@example.com</div>
      <div class="footer-section">
        Social: <a href="#">Facebook</a> | <a href="#">Twitter</a>
      </div>
      <div class="footer-section">&copy; 2023 Example Company</div>
    </footer>
  </body>
</html>
`},'HTML Infinite Scroll':function(){return `<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript Infinite Scroll</title>
    <style>
      .list-item {
        border-bottom: 1px solid #ddd;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div id="list">
      <!-- List items will be added here dynamically -->
    </div>

    <script>
      // Your JavaScript code goes here
    </script>
  </body>
</html>
`},'HTML Modal Popup':function(){return `<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript Modal Popup</title>
    <style>
      .modal {
        background-color: rgba(0, 0, 0, 0.4);
        display: none;
        height: 100%;
        left: 0;
        overflow: auto;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1;
      }
      .modal-content {
        background-color: #fefefe;
        border: 1px solid #888;
        margin: 15% auto;
        padding: 20px;
        width: 80%;
      }
      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      .close:hover,
      .close:focus {
        color: black;
        cursor: pointer;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <button id="open-modal-btn">Open Modal</button>

    <div class="modal" id="my-modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>

    <script>
      // Your JavaScript code goes here
    </script>
  </body>
</html>
`},'HTML Tabs Component':function(){return `<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript Tabs Component</title>
    <style>
      .tabs {
        background-color: #f7f7f7;
        display: flex;
        justify-content: space-around;
        padding: 10px;
      }
      .tab {
        cursor: pointer;
        padding: 10px;
      }
      .tab-content {
        border: 1px solid #ddd;
        display: none;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="tabs" id="tabs">
      <div class="tab" data-target="tab1">Tab 1</div>
      <div class="tab" data-target="tab2">Tab 2</div>
      <div class="tab" data-target="tab3">Tab 3</div>
    </div>
    <div class="tab-content" id="tab1">
      <p>Content for Tab 1</p>
    </div>
    <div class="tab-content" id="tab2">
      <p>Content for Tab 2</p>
    </div>
    <div class="tab-content" id="tab3">
      <p>Content for Tab 3</p>
    </div>

    <script>
      // Your JavaScript code goes here
    </script>
  </body>
</html>
`},'HTML XSS Identification':function(){return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>XSS Challenge</title>
  </head>
  <body>
    <input id="userData" type="text" placeholder="Enter your message here">
    <button onclick="displayData()">Display</button>
    <div id="displayArea"></div>

    <script>
      function displayData() {
        var userInput = document.getElementById('userData').value;
        document.getElementById('displayArea').innerHTML = userInput;
      }
    </script>
  </body>
</html>
`},'HTML CSRF Implementation':function(){return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>CSRF Challenge</title>
  </head>
<body>
  <form id="profileForm" action="https://example.com/profile" method="POST">
    <input type="email" name="email" value="user@example.com">
    <input type="submit" value="Update Email">
  </form>

  <script>
    document.getElementById('profileForm').addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted to ' + this.action);
    });
  </script>
</body>
</html>
`},'React List':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function DataList(props) {
  return (
    <h2>code goes here</h2>
  );
}

const data = [
  { name: 'Daniel', age: 25 },
  { name: 'John', age: 24 },
  { name: 'Jen', age: 31 },
];

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<DataList data={ data } />);`},'React Live Paragraph':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function LiveText() {
  return (
    <>
      <input type="text" />
      <p></p>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<LiveText />);`},'React Color Dropdown':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function ColorSelector() {
  return (
    <>
      <select>
        <option></option>
      </select>
      <p></p>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ColorSelector />);`},'React Weather Dashboard':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function WeatherDashboard() {
  // instead of requesting data from an API, use this mock data
  const mockWeatherData = {
    'New York': { 
      temperature: '22°C', 
      humidity: '56%', 
      windSpeed: '15 km/h'
    },
    'Los Angeles': {
      temperature: '27°C',
      humidity: '45%',
      windSpeed: '10 km/h',
    },
    'London': { 
      temperature: '15°C', 
      humidity: '70%', 
      windSpeed: '20 km/h' 
    },
  };

  return (
    <div>
      <input type="text" id="citySearch" placeholder="Search for a city..." />
      <button id="searchButton">Search</button>
      <div id="weatherData">
        <div>Temperature: </div>
        <div>Humidity: </div>
        <div>Wind Speed: </div>
        <div>City not found.</div>
      </div>
      <div id="previousSearches"></div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeatherDashboard />);`},'React Quiz Builder':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  container: {
    padding: '20px',
    border: '1px solid #E0E0E0',
    borderRadius: '15px',
    width: 'max-content',
    marginBottom: '40px',
  },
  question: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  options: {
    marginBottom: '5px',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#FFF',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  feedback: {
    marginTop: '10px',
    fontSize: '14px',
  },
};

function QuizApp() {
  // do not modify the questions or answers below
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correct: 'Paris',
    },
    {
      question: 'What is the capital of Germany?',
      options: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
      correct: 'Berlin',
    },
  ];

  return (
    <div style={style.container}>
      <div id="question" style={style.question}></div>
      <div style={style.options}></div>
      <button style={style.button} id="submitBtn">
        Submit
      </button>
      <div id="feedback" style={style.feedback}></div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<QuizApp />);`},'React Simple Counter':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Counter() {
  return (
    <div id="mainArea">
      <p>button count: <span>0</span></p>
      <button id="mainButton">increase</button>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Counter />);`},'React Phone Book':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm({ addEntryToPhoneBook }) {
  return (
    <form onSubmit={e => { e.preventDefault() }} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable(props) {
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
    </table>
  );
}

function Application(props) {
  return (
    <section>
      <PhoneBookForm />
      <InformationTable />
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);`},'React Button Toggle':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Toggle() {
  function handleClick() {
    // todo
  }
  
  return (
    <button>ON</button>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Toggle />);`},'React Tic Tac Toe':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square() {
  return (
    <div
      className="square"
      style={squareStyle}>
    </div>
  );
}

function Board() {
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>X</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>None</span></div>
      <button style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);`},'React Context API':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const languages = ['JavaScript', 'Python'];

function App() {
  // implement Context here so can be used in child components
  return (
    <MainSection />
  );
}

function MainSection() {
  return (
    <div>
      <p id="favoriteLanguage">favorite programing language: null</p>
      <button id="changeFavorite">toggle language</button>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);`},'React TypeScript Button Toggle':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Toggle() {
  function handleClick() {
    // todo
  }
  
  return (
    <button>ON</button>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Toggle />);`},'React Native Simple Counter':function(){return `import React, { useState } from "react";
import { Text, View } from "react-native";

const SimpleCounter = () => {
  return (
    <View>
      <Text>button count: <span id="actualCount">0</span></Text>
      <button id="mainButton">Increase</button>
    </View>
  );
};

export default SimpleCounter;
`},'React Native ToDo List':function(){return `import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

const TodoApp = () => {
  return (
    <View>
      ToDo List
    </View>
  );
};

export default TodoApp;
`},'React Letter Tiles':function(){return `import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  letterContainer: {
    overflow: 'auto',
    marginBottom: '10px'
  },
  letter: {
    float: 'left',
    padding: '10px 10px',
    background: '#c9e4ed',
    borderRadius: '5px',
    marginRight: '5px',
    cursor: 'pointer',
  },
}

function Tile(props) {
  return (
    <button style={style.letter}>{ props.letter }</button>
  );
}

function Application(props) {
  return (
    <section>
      <aside style={style.letterContainer} id="letterContainer">
        <Tile letter='A' />
        <Tile letter='B' />
        <Tile letter='C' />
      </aside>
      <div id="outputString">todo...</div>
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);`},'JavaScript Button Toggle':function(){return `import $ from "jquery";

const rootApp = document.getElementById("root");
rootApp.innerHTML = '<button>ON</button>';
`},'JavaScript Simple Counter':function(){return `import $ from "jquery";

const rootApp = document.getElementById("root");
rootApp.innerHTML = \`<div id="mainArea">
  <p>button count: <span>0</span></p>
  <button id="mainButton">Increase</button>
</div>\`;
`},'AngularJS Simple Counter':function(){return `import angular from "angular";

angular.module("myApp", []).controller("myController", function() {

  // change below to get counter working
  let vm = this;
  vm.title = "no title";
  vm.buttonClickCount = 0;
  vm.increaseCount = null;

});`},'Angular Simple Counter':function(){return `// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: '' +
    '<div id="mainArea">' +
      '<p>button count: <span>0</span></p>' +
      '<button id="mainButton">Increase</button>' +
    '</div>',
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`},'Angular Reactive Form':function(){return `// @ts-ignore
import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-area',
  template: '' + 
    'form goes here...' +
    '<pre>{{ form.value | json }}</pre>',
  styles: []
})

export class MainAppComponent implements OnInit {
  form: FormGroup;
  person = {
    firstname: 'Coder',
    age: 25,
    lastname: 'Byte',
    twitter: '@coderbyte'
  };
  personProps = [];

  ngOnInit() {
    const formDataObj = {};
    for (const prop of Object.keys(this.person)) {
      formDataObj[prop] = new FormControl(this.person[prop]);
      this.personProps.push(prop);
    }
    this.form = new FormGroup(formDataObj);
  }
}`},'Angular Generate Username':function(){return `// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: '' +
    '<div>' +
      '<input type="text" value="firstname" id="firstname">' +
      '<input type="text" value="lastname" id="lastname">' +
      '<button>Generate</button>' + 
      '<span id="output">generated username...</span>' +
    '</div>',
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`},'Angular Button Toggle':function(){return `// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: '<button>ON</button>',
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`},'Angular Phone Book':function(){return `// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: \`
    <div class="form-wrapper">
      <form>
        <div>
          <label for="firstName">First name</label>
          <input type="text" name="firstName" id="firstName" class="userFirstname">
        </div>
        <div>
          <label for="lastName">Last name</label>
          <input type="text" name="lastName" id="lastName" class="userLastname">
        </div>
        <div>
          <label for="phoneNumber">Phone number</label>
          <input type="tel" name="phoneNumber" id="phoneNumber" class="userPhone">
        </div>
        <div>
          <input type="submit" value="submit" class="submitButton">
        </div>
      </form>
    <div>
    <div class="informationTable">
      Table of contacts should go here...
    </div>\`,
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`},'Angular Simple Todo List':function(){return `// @ts-ignore
import { Component } from '@angular/core';

@Component({
  selector: 'app-area',
  template: \`<div>Hello world!</div>\`
})

export class MainAppComponent {
  // Your code goes here
}`},'Angular Todo List Project':function(){return `// @ts-ignore
import { Component } from '@angular/core';

@Component({
  selector: 'app-area',
  template: \`<div>Hello world!</div>\`
})

export class MainAppComponent {
  // Your code goes here
}`},'Angular Tic Tac Toe':function(){return `// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: \`
    <div id="statusArea" className="status">Next player: <span>X</span></div>
    <div id="winnerArea" className="winner">Winner: <span>None</span></div>
    <button>Reset</button>
    <section>
      <div class="row" *ngFor="let row of [1, 2, 3]">
        <button *ngFor="let col of [1, 2, 3]" class="square" style="width:40px;height:40px;"></button>
      </div>
    </section>
  \`,
  styles: []
})

export class MainAppComponent implements OnInit {
  // code goes here
  ngOnInit() { 
    
  }
}`},'Vue List Rendering':function(){return `<template>
  <div id="app">
    Your list should render here.
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},'Vue3 List Rendering':function(){return `<template>
  <div id="app">
    Your list should render here.
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},'Vue Button Toggle':function(){return `<template>
  <div id="app">
    <button>ON</button>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},'Vue3 Button Toggle':function(){return `<template>
  <div id="app">
    <button>ON</button>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},'Vue Phone Book':function(){return `<template>
  <div id="app">
    <p><strong>Add a new contact:</strong></p>
    <div>
      <label>First Name: <input type="text" class="userFirstname" /></label> <br />
      <label>Last Name: <input type="text" class="userLastname" /></label> <br />
      <label>Phone: <input type="number" class="userPhone" /></label> <br />
      <button class="submitButton">Add New Contact</button>
    </div>
    <table id="phoneBookItems" class="informationTable">
      <!-- items should go here -->
    </table>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: [],
      }
    },
  };
</script>`},'Vue3 Phone Book':function(){return `<template>
  <div id="app">
    <p><strong>Add a new contact:</strong></p>
    <div>
      <label>First Name: <input type="text" class="userFirstname" /></label> <br />
      <label>Last Name: <input type="text" class="userLastname" /></label> <br />
      <label>Phone: <input type="number" class="userPhone" /></label> <br />
      <button class="submitButton">Add New Contact</button>
    </div>
    <table id="phoneBookItems" class="informationTable">
      <!-- items should go here -->
    </table>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: [],
      }
    },
  };
</script>`},'Vue Tic Tac Toe':function(){return `<template>
  <div id="app">
    <div class="status">{{ status }}</div>
    <button>Reset</button>
    <template v-for="row in 3">
      <div class="row" :key="row">
        <button v-for="button in 3" class="square" style="width:40px;height:40px;"></button>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        status: 'Next player: X'
      };
    }
  };
</script>`},'Vue3 Tic Tac Toe':function(){return `<template>
  <div id="app">
    <div class="status">{{ status }}</div>
    <button>Reset</button>
    <template v-for="row in 3" :key="row">
      <div class="row">
        <button v-for="button in 3" class="square" style="width:40px;height:40px;"></button>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        status: 'Next player: X'
      };
    }
  };
</script>`},'Vue Generate Username':function(){return `<template>
  <div id="app">
    <input type="text" value="firstname" id="firstname">
    <input type="text" value="lastname" id="lastname">
    <button>Generate</button>
    <span id="output">generated username...</span>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},'Vue3 Generate Username':function(){return `<template>
  <div id="app">
    <input type="text" value="firstname" id="firstname">
    <input type="text" value="lastname" id="lastname">
    <button>Generate</button>
    <span id="output">generated username...</span>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},'Vue Simple Counter':function(){return `<template>
  <div id="app">
    <section id="mainArea">
      <p>button count: <span>0</span></p>
      <button id="mainButton">Increase</button>
    </section>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},'Vue3 Simple Counter':function(){return `<template>
  <div id="app">
    <section id="mainArea">
      <p>button count: <span>0</span></p>
      <button id="mainButton">Increase</button>
    </section>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        items: null
      };
    }
  };
</script>`},}