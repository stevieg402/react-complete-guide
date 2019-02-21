import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
      <div>
        {this.state.persons.map((person, index) => {
          return <ErrorBoundary key={person.id}>
            <Person
            changed={(event) => this.nameChangedHandler(event, person.id)}
            click={() => this.deletePersonHandler(index)} 
            name={person.name} 
            age={person.age} />
          </ErrorBoundary>
        })}
      </div>);

      btnClass = classes.Red;
    }

    let assignedClasses = [];

    if (this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }


    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React app</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle persons</button>
        {persons}
      </div>
    );
    //return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Wibble!!!"));
  }
}

export default App;
