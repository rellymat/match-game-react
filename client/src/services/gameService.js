import axios from 'axios'
import {Api} from '../config.json'
import http from './httpService'
import { getCurrentUser } from './auth'

const apiGame = Api + 'game/'
let init = false
let games = []
let title = ''
let pairs = [ ]

export function deleteCategory(category) {
    return http.delete(`${apiGame}category/${category}`)
}

export function deleteUserCategory() {
    return http.delete(`${apiGame}user`)
}

export function deleteGame(id) {
    return http.delete(`${apiGame}${id}`)
}

export function getGames(category) {
    const { user } = getCurrentUser()
    return http.get(`${apiGame}${user}/${category}`)
}

export function getGameForm(id) {
 return http.get(apiGame  + id)
}

export function getCategories(){
    return http.get(apiGame + "categories" )
}

export function getCategoriesGuest(){
    return http.get(apiGame + "categories/guest" )
}


export function addGame(game) {
    const { user } = getCurrentUser()
    const gamenew = {
        owner: user,
        category: game.category,
        items_1: [game.ques0, game.answer0],
        items_2: [game.ques1, game.answer1],
        items_3: [game.ques2, game.answer2],
        items_4: [game.ques3, game.answer3],
    }
    if(game.id)
        return axios.put(apiGame  + game.id, gamenew) 
    return axios.post(apiGame + 'add', gamenew)
}

export async function getArray(category, user) {
    await getGamesFromServer(category, user)
    return await createArray()
}

async function createArray() {
    let arrayOfPaires = new Array(pairs.length)
    let allAnswers = []
    let i = 0
    for (const index in pairs) {
      const [ques, answer]= pairs[index]
      arrayOfPaires[index] = [createNullBadge(i), createQuesBadge(i + 1, ques)]
      allAnswers.push(createAnswerBadge(pairs.length*2 + parseInt(index), answer, i + 1))
      i += 2
    }
    arrayOfPaires = shuffle(arrayOfPaires)
    allAnswers = shuffle(allAnswers)
    arrayOfPaires.push(allAnswers)
    return arrayOfPaires
}

export function getTitle(){
    return title
}

export function isDbEmpty(){
    return games.length > 0 ? false : true
}

export function getCurrentGame (){
    return createArray()
}

export function getNext () {
    if (games.length > 0){
        getGamesFromServer()
        return createArray()
    }
    return null
}

export function getCurrentTitle (){
    return title
}

async function getGamesFromServer (category='null', user='null'){
    if (!init || isDbEmpty()) {
        const { data } = await http.get(`${apiGame}${user}/${category}`)
        games = data
        init = true
    }
    const number = getRandomInt(games.length)
    setNewGame(number)
}

function setNewGame(number){
    pairs = [[...games[number].items_1], [...games[number].items_2], [...games[number].items_3], [...games[number].items_4]]
    title = games[number].category
    games.splice(number, 1)
}



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


function createBadge(id, color, text, change, matchID){
    return { id: id, color: color, text: text, change: change, selected: false, matchID: matchID }
}

function createAnswerBadge(id, text, matchID){
    return createBadge(id, "badge-success", text, true, matchID)
}

function createQuesBadge(id, text){
    return createBadge(id, "badge-info", text, false, -1)
}

function createNullBadge(id){
    return createBadge(id, "badge-light", "null", true, -1)
}