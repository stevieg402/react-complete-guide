import React, {PureComponent} from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props){
        super(props);
        console.log('[Persons.js] Inside constructor', props);
        this.lastPersonRef =React.createRef();
    }

    componentWillMount(){
    console.log('[Persons.js] Inside componentwillMount');
    }

    componentDidMount(){
        console.log('[Persons.js] Inside componentDidMount');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps){
        console.log('[Update Persons.js] Inside componentWillReceiveProps', nextProps);
    }

    // Implementing PureComponent instead of Component does the below shallow shouldComponentUpdate built-in
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Update Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
    //     return nextProps.person !== this.props.persons 
    //             || nextProps.changed !== this.props.changed
    //             || nextProps.clicked != this.props.clicked; // Continue / Stop updating process
    // }

    componentWillUpdate(nextProps, nextState){
        console.log('[Update Persons.js] Inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate(){
        console.log('[Update Persons.js] Inside componentDidUpdate');
    }

    render(){
        console.log('[Persons.js] Inside render');
        return this.props.persons.map((person, index) => {
            return <Person
                changed={(event) => this.props.changed(event, person.id)}
                click={() => this.props.clicked(index)} 
                name={person.name} 
                age={person.age}
                key={person.id}
                position={index}
                ref={this.lastPersonRef} />
            })
    }
}


export default Persons;