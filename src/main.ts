require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    class Question {
    question: string;
    answer: string;
    imageLink: string;
    answers: [];
    correctAnswerIndex: number;
    constructor(question: string, answer: string, imageLink: string, answers: [], correctAnswerIndex: number){
        this.question = question;
        this.answer = answer;
        this.imageLink = imageLink;
        this.answers = [];
        this.correctAnswerIndex = -1;
    }
}

let questions: any[] = [];

let questionsFinished = false;

const countryList = ["Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Bangladesh", "Barbados", "Belarus", "Belgium"];

let question1: Question = new Question("What country is represented by this flag?", "Spain", 'https://res.cloudinary.com/dfuiyl9sr/image/upload/v1676398752/spain-2906824_960_720-min_tvxnw4.png', [], -1);
let question2: Question = new Question("What country is represented by this flag?", "Romania", 'https://res.cloudinary.com/dfuiyl9sr/image/upload/v1676397195/romania_ttuz65.png', [], -1);
let question3: Question = new Question("What country is represented by this flag?", "Niger", 'https://res.cloudinary.com/dfuiyl9sr/image/upload/v1676397108/niger_od9bcp.png', [], -1);
let question4: Question = new Question("What country is represented by this flag?", "Mexico", 'https://res.cloudinary.com/dfuiyl9sr/image/upload/v1676398566/mexico-min_1_f21cdt.png', [], -1);
let question5: Question = new Question("What country is represented by this flag?", "Barbados", 'https://res.cloudinary.com/dfuiyl9sr/image/upload/v1676397096/barbados_eg6bs5.svg', [], -1);
let question6: Question = new Question("What country is represented by this flag?", "Saint Lucia", 'https://res.cloudinary.com/dfuiyl9sr/image/upload/v1676398657/saint-lucia-min_1_bdn0sr.png', [], -1);

questions.push(question1);
questions.push(question2);
questions.push(question3);
questions.push(question4);
questions.push(question5);
questions.push(question6);

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

for(let j = 0; j < 6; j++){
    let answerPosition = randomIntFromInterval(0,3);

    let chosenIndex = randomIntFromInterval(0,questions.length - 1);

    let answers = ["","","",""];

    answers[answerPosition] = questions[j].answer;

    for(let i = 0; i < 4; i++){
        if(i == answerPosition){
            continue;
        }
        let uniqueAnswerFound = false;
        while(!uniqueAnswerFound){
            let selectedAnswer = countryList[randomIntFromInterval(0,countryList.length - 1)];
            if(answers.includes(selectedAnswer)){
                continue;
            }
            else {
                answers[i] = selectedAnswer;
                uniqueAnswerFound = true;
            }
        }
    }

    questions[j].answers = answers;
    questions[j].correctAnswerIndex = answerPosition;
}

  res.send(questions);
})

const port = process.env.PORT || 5000

app.listen(port,() =>{
console.log(`App running on port ${port}`)
})