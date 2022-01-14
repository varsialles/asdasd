import React, {useState} from "react";
import "./typing.css"
import "./header.css"
import axios from "axios";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

function App() {

    const [number, setNumber] = useState({})
    const [type, setType] = useState({})
    const [text, setText] = useState({})
    const [inputActive, setInputActive] = useState('')
    const [showResults, setShowResults] = useState(false)
    function RandomText(){
      axios.get('https://fish-text.ru/get',{
          params: {type: type, number: number}
      })
          .then(({data}) =>setText(data.text))
    }
    const md = text.toString()
    let res = md.split("\\n\\n").join('\n').replace("[object Object]",'Нажмите на "Старт" что бы начать')

function handleShowResults () {
        setShowResults(!showResults)
}

const viewText = res.split('').map((char,index) => {
    let color = "";
    if (index < inputActive.length) {
        color = char === inputActive[index] ? "correct" : "incorrect"
    }

    return (
        <span key={`${char}_${index}`} className={color}>{char}</span>
    )
})




    return(


        <div>
            <header>
                <div className="container">
                    <div className="top">
                        <h1>Typify</h1>
                    </div>
                </div>
            </header>
            <div className="section1">
                <div className="container">
                    <div className="box">
                        <div className="parapara">
                            <div className="blur">
                            <div className="quizsection">
                                    <h2>Тип:</h2>
                                <label htmlFor="q1">
                                <input type="radio" name="q1" className="radio" onClick={(e)=> setType('paragraph')}/>

                                    <span>Параграф</span>
                                </label>
                                <label htmlFor="">
                                    <input type="radio" name="q1" className="radio" onClick={(e)=> setType('sentence')}/>

                                    <span>Предложение</span>
                                </label>

                                <label htmlFor="">
                                    <input type="radio" name="q1" className="radio" onClick={(e)=> setType('title')}/>

                                    <span>Заголовок</span>
                                </label>


                            </div>
                            <div className="form">
                                
                                <input type="number" id="howMuch" className="formInput" placeholder="Количество" onChange={(e)=>setNumber(e.target.value)}/>

                            </div>
                                <button type="button" className="startGame" onClick={()=>RandomText()}>Старт!</button>
                            </div>
                        </div>
                        <div className="quoteArea">
                            {viewText}

                            <textarea className="quoteInput" name="quoteInput" id="quoteInput"
                                       onChange={e =>setInputActive(e.target.value)}></textarea>

                        </div>





                    </div>

                </div>
            </div>

        </div>
    )
}


export default App