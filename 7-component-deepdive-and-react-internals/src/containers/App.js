import React, { PureComponent } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxillary';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props){
    super(props);
    console.log('[App.js] Inside constructor', props);
  }

  componentWillMount(){
    console.log('[App.js] Inside componentwillMount');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount');
  }

    // Implementing PureComponent instead of Component does the below shallow shouldComponentUpdate built-in
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[Update App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons
  //           || nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState){
      console.log('[Update App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log('[Update App.js] Inside getDerivedStateFromProps', nextProps, prevState);
    return prevState;
  }

  getSnapshotBeforeUpdate(){
    console.log('[Update App.js] Inside getSnapshotBeforeUpdate');
    return null;
  }

componentDidUpdate(){
      console.log('[Update App.js] Inside componentDidUpdate');
  }

  state = {
    persons: [
      {id: "h8hhh8r", name: "Maximillian", age: "28"}, 
      {id: "k5ihi5h", name: "Manu", age: 29}, 
      {id: "vh98r7h", name:"Stephanie", age: 26}
    ],
    otherState: "Some other value",
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
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
    this.setState((prevState, props) => {
      return {showPersons: !doesShow, toggleClicked: prevState.toggleClicked+1}
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice(); // slice method creates a copy of array
    const persons = [...this.state.persons]; // ES 6 spread
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] Inside render');
    let persons = null;

    if (this.state.showPersons) {
      persons = 
        <Persons 
          persons={this.state.persons} 
          clicked={this.deletePersonHandler} 
          changed={this.nameChangedHandler} />;
    }

    return (<Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit 
          appTitle={this.props.title}
          showPersons={this.state.showPersons} 
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler} />
          <AuthContext.Provider value={this.state.authenticated}>
            {persons}
          </AuthContext.Provider>
        </Aux>
    );
    //return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Wibble!!!"));
  }
}

export default withClass(App, classes.App);
