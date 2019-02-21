import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: "h8hhh8r", name: "Maximillian", age: 28}, 
      {id: "k5ihi5h", name: "Manu", age: 29}, 
      {id: "vh98r7h", name:"Stephanie", age: 26}
    ],
    otherState: "Some other value",
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    // Find the index of the person
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    // Create a new person object
    const person = {...this.state.persons[personIndex]};

    // Set the persons name
    person.name = event.target.value;

    // Get the persons array from the state
    const persons = [...this.state.persons];
    // Set the person in the array
    persons[personIndex] = person;

    // Use setState to mutate the state
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); // slice method creates a copy of array
    const persons = [...this.state.persons]; // ES 6 spread
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
      <div>
        {this.state.persons.map((person, index) => {
          return <Person
            changed={(event) => this.nameChangedHandler(event, person.id)}
            click={() => this.deletePersonHandler(index)} 
            name={person.name} 
            age={person.age}
            key={person.id} />
        })}
      </div>);

      style.backgroundColor = 'red';
    }

    let classes = [];

    if (this.state.persons.length <= 2){
      classes.push('red');
    }

    if (this.state.persons.length <= 1){
      classes.push('bold');
    }


    return (
      <div className="App">
        <h1>Hi, I'm a React app</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle persons</button>
        {persons}
      </div>
    );
    //return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Wibble!!!"));
  }
}

export default App;
