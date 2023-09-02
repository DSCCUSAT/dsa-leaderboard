import {initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'
import { getDatabase, set, get, ref, child, push, onValue } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js'


const firebaseConfig = {
    apiKey: "AIzaSyC9iD6-1W67VoQORY1uc_Fssa8233loiig",
    authDomain: "gdscdsa-dc74b.firebaseapp.com",
    databaseURL: "https://gdscdsa-dc74b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gdscdsa-dc74b",
    storageBucket: "gdscdsa-dc74b.appspot.com",
    messagingSenderId: "332426080821",
    appId: "1:332426080821:web:c211a9160c3ff7e5ecf77c",
    measurementId: "G-CN06BBJ45B"
};
const app = initializeApp(firebaseConfig);
const db  = getDatabase()
const dbRef = ref(getDatabase());
function updaterecent(username, question){
    const postListRef = ref(db, `recents`);
    return onValue(ref(db, "recents"), (snapshot) => {
        if (snapshot.exists()) {    
            const submissions = snapshot.val();
            const submissionKeys = Object.keys(submissions);
        
            if (submissionKeys.length < 7) {
                const newPostRef = push(postListRef)
                set(newPostRef, {
                    user: username,
                    question: question,
                    timestamp: Date.now()
                });
            }
            else{
                let oldestKey = submissionKeys[0];
                let oldestTimestamp = submissions[oldestKey].timestamp;

                submissionKeys.forEach((key) => {
                    if (submissions[key].timestamp < oldestTimestamp) {
                    oldestKey = key;
                    oldestTimestamp = submissions[key].timestamp;
                    }
                });

                set(ref(db, "recents/"+oldestKey), {
                    user: username,
                    question: question,
                    timestamp: Date.now()
                });
            }
        }
        else {
            const newPostRef = push(postListRef)
            set(newPostRef, {
                user: username,
                question: question,
                timestamp: Date.now()
            });
        }
    }, {
        onlyOnce: true
    })
}

function saveuser(username, question) {
    var changed = false
    get(child(dbRef, `users/${username}`)).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            console.log(childData, question)
            if (childData == question){
                console.log("true")
                changed = true
                return true;
            }
        });
        return false
    } 
    else{
        const postListRef = ref(db, `users/${username}`);
        const newPostRef = push(postListRef);
        set(newPostRef, question);
        changed = true
        updaterecent(username, question)
    }
    
    }).then(()=>{
        if (!changed){
            const postListRef = ref(db, `users/${username}`);
            const newPostRef = push(postListRef);
            set(newPostRef, question);
            updaterecent(username, question)
        }
    })
}


var l = document.getElementById("leaderboard")
var colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]
var format = {0:{name:"mishal", points:80},1:{name:"sheethal", points:72}, 2:{name:"mishal", points:2}, 3:{name:"sheethal", points:90}}

for (let i in format){
    var randomcolor = colors[(Math.floor(Math.random() * colors.length))]
    var playerhtml = `<div class='player' style='background-color: ${randomcolor}'> \
                <span class="name"> ${format[i].name}</span> \
                <span class="score">${format[i].points}</span> \
                </div>`
    var player = document.createElement("div");
    player.innerHTML = playerhtml
    l.appendChild(player)
}


import 'fs'

// Read the file synchronously
const data = fs.readFileSync('usernames.js', 'utf8');

// Split the file content into an array of names
const namesArray = data.split('\n');

// Surround each name with double quotes and join them with commas
const formattedNames = namesArray.map(name => `"${name}"`).join(', ');

// Print the result
console.log(formattedNames);

var usernames = ["Mishal0404"]
var questions = ["find-the-duplicate-number", "running-sum-of-1d-array","sort-colors","move-zeroes","reverse-string","valid-palindrome-ii","valid-palindrome"]

function update(){
    var url = "http://localhost:8080/check"
    for (var i in usernames){
        for (var j in questions){
            var newurl = url + "/" + usernames[i] + "/" + questions[j]
            fetch(newurl).then( function(response) {return response.json()}).then(function(result){
                if (result.done){
                    saveuser(usernames[i], questions[j])
                }
                console.log(result)
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}

document.getElementById("update").addEventListener("click", update);
