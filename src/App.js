import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

import './App.css';

const Zoo = () => {
    const [animal, setAnimal] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        getAnimalData()
    }, []);

    const getAnimalData = async () => {
        try {
            const data = await axios.get('http://localhost:8080/getZoo?');
            console.log(data.data);
            setAnimal(data.data);
        } catch (e) {
            console.log(e);
        }
    }

    function removeAnimal(pID) {
        fetch('http://localhost:8080//removeAnimal/'+pID, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((response) => {
                console.log(response);
            })
            refreshPage();
        })
    }
    

    return (
        <main>
                <div id="searchAnimalNameBreed">
                    <h4>All Search Function.</h4>
                </div>

                <form onSubmit="" class="searchAnimalNameForm">
                    <label for="searchBox">Search: </label>
                    <input type="text" placeholder="Pingu / Fairy Penguin / Penguin" class="searchAnimalBox" id="searchAnimalName" onChange={(event) => { setSearch(event.target.value)}}/> <div class="divider" />
                </form> <br />

                <button onClick={refreshPage}>Reset Table View</button> <br /> <br />

                <table class="center">
                    <tr>
                        <th>Animal ID</th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Animal</th>
                        <th> X </th>
                    </tr>
                    {animal.filter(animalItem => {
                        if(search == "") { 
                            return animalItem;
                        } else if (animalItem.name.toLowerCase().includes(search.toLowerCase())) {
                            return animalItem;
                        } else if (animalItem.breed.toLowerCase().includes(search.toLowerCase())) {
                            return animalItem;
                        } else if (animalItem.animalType.toLowerCase().includes(search.toLowerCase())) {
                            return animalItem;
                        }
                    }).map(animalItem => (
                        <tr>
                            <td>{animalItem.animalID}</td>
                            <td>{animalItem.name}</td>
                            <td>{animalItem.breed}</td>
                            <td>{animalItem.animalType}</td>
                            <td><button class="tableAnimalDeleteButtons" onClick={() => removeAnimal(animalItem.animalID)}> X </button></td>
                        </tr>
                    )
                    )}
                </table>
        </main>
    );
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            addMonkeyName: "",
            addMonkeyBreed: "",
            addMonkeyHungry: "",
            addPenguinName: "",
            addPenguinBreed: "",
            addPenguinAge: "",
            addOwlName: "",
            addOwlBreed: "",
            removeAnimal: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            addMonkeyName:
                event.target.id === "pMonkeyName"
                    ? event.target.value
                    : this.state.addMonkeyName,
            addMonkeyBreed:
                event.target.id === "pMonkeyBreed"
                    ? event.target.value
                    : this.state.addMonkeyBreed,
            addMonkeyHungry:
                event.target.id === "pMonkeyHungry"
                    ? event.target.value
                    : this.state.addMonkeyHungry,
            addPenguinName:
                event.target.id === "pPenguinName"
                    ? event.target.value
                    : this.state.addPenguinName,
            addPenguinBreed:
                event.target.id === "pPenguinBreed"
                    ? event.target.value
                    : this.state.addPenguinBreed,
            addPenguinAge:
                event.target.id === "pPenguinAge"
                    ? event.target.value
                    : this.state.addPenguinAge,
            addOwlName:
                event.target.id === "pOwlName"
                    ? event.target.value
                    : this.state.addOwlName,
            addOwlBreed:
                event.target.id === "pOwlBreed"
                    ? event.target.value
                    : this.state.addOwlBreed,
            removeAnimal:
                event.target.id === "pRemoveAnimal"
                    ? event.target.value
                    : this.state.removeAnimal
        })
    }

    handleSubmitMonkey(event) {
        let pName = "";
        let pBreed = this.state.addMonkeyBreed;
        const pIsHungry = this.state.addMonkeyHungry;
        if(this.state.addMonkeyName.trim() == "") {
            pName = "Unknown Name";
        } else {
            pName = this.state.addMonkeyName;
        }
        if(this.state.addMonkeyBreed.trim() == "") {
            pBreed = "Unknown Breed";
        } else {
            pBreed = this.state.addMonkeyBreed;
        }

        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: pName,
                breed: pBreed,
                isHungry: pIsHungry,
            })
        };
        fetch('http://localhost:8080/addMonkey', requestOptions)
            .then(response => response.json());
        refreshPage();
    }

    handleSubmitPenguin(event) {
        let pName = this.state.addPenguinName;
        let pBreed = this.state.addPenguinBreed;
        let pAge = this.state.addPenguinAge;

        if(this.state.addPenguinName.trim() == "") {
            pName = "Unknown Name";
        } else {
            pName = this.state.addPenguinName;
        }
        if(this.state.addPenguinBreed.trim() == "") {
            pBreed = "Unknown Breed";
        } else {
            pBreed = this.state.addPenguinBreed;
        }
        if(this.state.addPenguinAge.trim() == "") {
            pAge = "0";
        } else {
            pAge = this.state.addPenguinAge;
        }

        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: pName,
                breed: pBreed,
                age: pAge,
            })
        };
        fetch('http://localhost:8080/addPenguin', requestOptions)
            .then(response => response.json())
            refreshPage();
    }

    handleSubmitOwl(event) {
        let pName = this.state.addOwlName;
        let pBreed = this.state.addOwlBreed;

        if(this.state.addOwlName.trim() == "") {
            pName = "Unknown Name";
        } else {
            pName = this.state.addOwlName;
        }
        if(this.state.addOwlBreed.trim() == "") {
            pBreed = "Unknown Breed";
        } else {
            pBreed = this.state.addOwlBreed;
        }

        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: pName,
                breed: pBreed,
            })
        };
        fetch('http://localhost:8080/addOwl', requestOptions)
            .then(response => response.json())
        refreshPage();
    }

    handleMassDeleteAnimal(event) {
        const pName = this.state.removeAnimal;

        fetch('http://localhost:8080/massRemoveAnimal/'+pName, {
            method: "DELETE",
        }).then(() => this.setState({status: "Delete Successful!"}));
    }

    render() {
        return (
            <div> <div class="divider" />
                <form onSubmit={(event) => this.handleSubmitMonkey(event)} class="addMonkeyForm">
                    <label for="pMonkeyName">Name:  </label>
                    <input type="text" placeholder="Harambe" id="pMonkeyName" value={this.state.addMonkeyName} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <label for="pMonkeyBreed">Breed:  </label>
                    <input type="text" placeholder="Bonbo" id="pMonkeyBreed" value={this.state.addMonkeyBreed} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <label for="pMonkeyHungry">Hungry: </label>
                    <select id="pMonkeyHungry" onChange={(event) => this.handleInputChange(event)}>
                        <option value={this.state.addMonkeyHungry}>True</option>
                        <option value={this.state.addMonkeyHungry}>False</option>
                    </select> <div class="divider" />
                    <button type="submit">Add Monkey</button>
                </form><br />

                <form onSubmit={(event) => this.handleSubmitPenguin(event)} class="addPenguinForm">
                    <label for="pNamePenguin">Name: </label>
                    <input type="text" placeholder="Pingu" id="pPenguinName" value={this.state.addPenguinName} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <label for="pBreedPenguin">Breed: </label>
                    <input placeholder="Fairy Penguin" id="pPenguinBreed" value={this.state.addPenguinBreed} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <label for="pAgePenguin">Age:   </label>
                    <input type="number" onKeyPress={(event) => {if(!/[0-9]/.test(event.key)) {event.preventDefault();}}} placeholder="3" id="pPenguinAge" value={this.state.addPenguinAge} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <button type="submit">Add Penguin</button>
                </form><br />

                <form onSubmit={(event) => this.handleSubmitOwl(event)} class="addOwlForm">
                    <label for="pOwlName">Name: </label>
                    <input placeholder="Tweety" id="pOwlName" value={this.state.addOwlName} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <label for="pOwlBreed">Breed: </label>
                    <input  placeholder="Small Owl" id="pOwlBreed" value={this.state.addOwlBreed} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <button>Add Owl</button>
                </form>

                <div id="removeAnimal">
                    <h4>Remove all animals with name</h4>
                </div>
                <form onSubmit={(event) => window.confirm('This will delete ALL animals with the name \"'+this.state.removeAnimal+'\"') && this.handleMassDeleteAnimal(event)} class="removeAnimal">
                    <label for="pRemoveAnimal">Removal Name: </label>
                    <input placeholder="Animal name" id="pRemoveAnimal" value={this.state.removeAnimal} onChange={(event) => this.handleInputChange(event)} /> <div class="divider" />
                    <button type="submit">Remove Animal</button>
                </form>
                
                <div id="searchAnimalType">
                    <h4>Search for specific animals</h4>
                </div>
                <button onClick="">Get Zoo</button><div class="divider" />
                <button onClick="">Get Monkeys</button> <div class="divider" />
                <button onClick="">Get Owl</button> <div class="divider" />
                <button onClick="">Get Penguin</button> <br /> <br />

                <Zoo />
            </div>
        );
    }
}

function refreshPage() {
    window.location.href = 'http://localhost:3000/';
}

export default App;