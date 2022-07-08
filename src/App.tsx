import React, {useState} from 'react';
import './App.css';
import PasswordGenerator from "./PasswordGenerator/PasswordGenerator";

export type PasswordStateType = {
    id: string
    title: string
    type: string
    needOrNot: boolean
}

type RootFunctionsType = {
    [key: string]: () => string
}

function upperCaseCreator(): string {
    let alphabetUpperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return alphabetUpperCase[Math.floor(Math.random() * alphabetUpperCase.length)]
}

function lowerCaseCreator(): string {
    let alphabetLowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    return alphabetLowerCase[Math.floor(Math.random() * alphabetLowerCase.length)]
}

function numberCreator(): string {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    return numbers[Math.floor(Math.random() * numbers.length)]
}

function symbolCreator(): string {
    let symbols = ['!', "@", "#", "$", "%", "^", "&", '*']
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const rootFunctions: RootFunctionsType = {
    "upper": upperCaseCreator,
    "lower": lowerCaseCreator,
    "number": numberCreator,
    "symbol": symbolCreator
}


function App() {
    let [mainState, setMainState] = useState<PasswordStateType[]>([
        {id: '1', title: 'Includes uppercase letters', type: 'upper', needOrNot: false},
        {id: '2', title: 'Includes lowercase letters', type: 'lower', needOrNot: false},
        {id: '3', title: 'Includes numbers', type: 'number', needOrNot: false},
        {id: '4', title: 'Includes symbols', type: 'symbol', needOrNot: false}
    ])

    function createPassword(types: Array<string>, passwordLength: number): string {
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            let randomType = types[Math.floor(Math.random() * types.length)]
            password += rootFunctions[randomType]()
        }
        return password;
    }


    return (
        <div className="App">
            <PasswordGenerator mainState={mainState}
                               setMainState={setMainState}
                               createPassword={createPassword}/>
        </div>
    );
}

export default App;
