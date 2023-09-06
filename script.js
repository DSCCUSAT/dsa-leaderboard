import {initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'
import { getDatabase, set, get, ref, child, push, onValue } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js'
  
//if (localStorage.getItem("admin") == "true"){
//    document.getElementById("update").style.display = "block"
//}

if (window.outerWidth < 500){
    document.body.style.zoom = "35%";
}

if (window.outerWidth < 855){
    document.body.style.zoom = "70%"
}




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

/** 
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
*/

function saveuser(username, question){

    set(ref(db, "users/"+username+"/"+question), {
        done: "true"
    });
    updaterecent(username, question)
}

var l = document.getElementById("board")

//var format = {0:{name:"mishal", points:80},1:{name:"sheethal", points:72}, 2:{name:"mishal", points:2}, 3:{name:"sheethal", points:90}}



var usernames = ["Mishal0404","user4713QR", "Nevin", "user8288gC", "mamathand98",
 "hridyaharshan", "Nandana07", "Khushi6517", "barash1311", "khdas567", "Anagas", 
 "singhmuskan16", "aadarsh_ps", "Nirmal050", "vishnu13431", "ansafraees", "mihalpalakkal", "aditripathi1357", "prince3654", "Naveen_002", "Dheerajdileep", "Jr_NewT ", "EvlynEbichan ", "AioonT", "Heavenly_Ben", "Ivinej", "2getsandesh", "rimasid", "Sadhnan", "karthiksujith789", "resikeshramachandran05", "Nandakishor-KV", "Najah_1_", "_treesa_george_", "anumini", "MeticulousVision", "mgnm", "aakashpr", "rahulpradeep001", "abhay-krishna", "dikshas2911", "sivadasrajan", "safwanmshereef7", "shubhamk45", "the_royal_Abhi9s", "Sonakshi2125", "adijithsabu", "asciiindex", "Archa_2000", "abiirram", "fidhaa_2003", "hrk2575", "nikhilakumar2003", "aswinpradeepc ", "shivangi_chaturvedi", "iamdeepakpm282", "ashwath_john", "nandana___santhosh", "abhigaprasad", "avinashsinghlilotra", "eldhoabraham", "Harikri12", "Ruvais_9296", "Thrishakannan", "nabeelnazeer", "Akshaykr008", "rabeeh_ta", "kalpanaroy1712", "omamaashraf1913111046", "harshedabdulla", "dakshinard3010", "Sharonsabu12", "Athi123", "Abhishek", "priyanshu__21", "Aiswarya ", "Aiswarya_4528", "Aazim_Anish", "ri5hi", "niteshmishra171171171", "Abhinandgit", "ghanashyamvn", "mad_techy", "anzal", "Anzal", "Sree_Laxmi-123", "Narthana", "Sidharth", "ReVuZ", "SayakPaul", "20cs076praj ", "adarshbytes", "arjunvaradiyil203", "007aswinak007", "alimanhal", "Rebin03", "Sreesayanth", 
 "Adithyasankar_2003", "satyamsrivastava6871", "bhavyagirish3", "Nikitha_Ragesh", "sharathj116", "Merin_Biju", "Gokul211468", "lucifer_sama", "sonascaria", "mehul20", "ashwinsudheer", "resikeshramachandran05", "NazneenT03", "athulya_anilkumar", "Adil9645", "Anjimakp0", "hafeefapc2003", "ShriyaBala", "aswathy_linz", "Siddeque", "pejayalakshmi2003", "sweetcaro", "abhijith8176", "nlkguy", "sthejas87", "rabeeh6", "Creedz", "jeri", "Sreeragpv_1729", "johnsonjoyal87", "aloysiuspattath", "parvathi_manari", "Ankan85", "Mamatha ", "shadaataj", "nandusn", "mrudulmathews", "Amal-Thilakan", "str_dolly", "Malavika_CS", "gayathrireji25", "gthm", "gangamangalassery1", "kumarmukesh14", "Anandkumar_21633", "Him_123-", "thepywizard", "Dhanushpk_50", "Jeslinpjames", "MdSaquibBakhshi", "Abhibav75478", "Krishnanunni_21", "potatomalik", "ithban", "gowrilekshmis", "Abna_Iqbal", "Ashkab_C", "dka001", "anasvemmully", "ankitdocode", "Shilpa_2000", "anusabu", "Anagha_kr_____", "sindhupr2003", "amalragh", "Himna_01_K", "Gopika12", "aastha_das15", "steve_godly", "arnav27122002", "mariya-123", "Radhakrishna ", "Nandana_Pradeep", "AkshayRaj1107", "nazal", "AkshayRaj1107", "sweetchaos_sin", "Swathy_shabu", "dharsan", "gaurav_4107", "Arjun_chilambath", "Tejaas_21", "aditya773", "Tejaas_21", "adhidev02", "Uttam_001", "tanu2110", "danwand47", "Aadithya_krishnan", "sameerabdulla175", "shantanu_01", "bhagyajkumar1", "Thennal", "neha1610", "g3kul", "favas_tp", "thasnimp", "Aswinlalks", "shadinkvr2002", "sreedevmannarkkad", "binilvb1234", "fimil", "leahfrancis", "rizal28", "thamannasiraj27", 
 "Sanjay ", "albinantonygeorge", "aleenadavid", "Athira", "fisa01", "Mamatha", "sivagangagj", "sreenandump", "Abhi_Chekavar", "MuhammedYahiya", "sanjayns7781", "NavyaBiju", "the_royal_abhi9s", "Anantheshbhat", "Midhun2001", "GangaV23", "r_i_a_s_r_i_a", "ajayalathiyur24 ", "devikamohan", "Anjimakp", "kirannarayanks", "namitapj", "Aneenajoshy", "salva_pk", "damianantony", "mhdnasim", "NavyaBinu", "harikrishnan1998", "Night_Glow", "athulchandran", "Sneha_Eliza", "AbhiramRam", "SeniorGatto", "Gayathri__k_", "SeniorGatto", "mohitpradeep2003", "chinmay2k3v", "m_rizwan", "SachuSam23", "Adithya_2508", "gowrinair78", "GauthamGK", "user8764qC", "adharshreghu2002", "niteshmishra171171171", "adharshreghu2002", "aarjunb123", "Soorya", "Jumana_Sherin", "AksAA2810", "shazzzzz", "va1shnav", "adithyanappu1515", "Arjun", "Vismaya.a.m.", "AleenaPascal", "Nazva", "rahulraj24", "dhyan08", "ShreyaN15", "rahulraj24", "rohitkumarrk1600", "ajmal_a_man", "Ancy12", "Harisankar_s", "sephinse", "souloftheserpent", "sebastianmelbin67", "nandanasbhaskar", "29-ark", "_arjun_ajayakumar_", "lateralraise", "dreamerremaerdjo", "Susan_Jeevan_Philip", "abinfranci5", "muneebv", "user6614kC", "zaman_27", "Athira874", "Harshranjansinha", "steff001", "muhammedrisin", "cenosh", "ashiashish", "vaish02", "CodeBreak-Matrix", "mohammedajmal996", "briz_02", "M4NIAC", "lazygupta", "Mahith_Raveendran", "athiraathu14052001", "salihedneer", "Yash_Bhadauria", "athiraathu14052001", "Yash_Bhadauria", "amrutha8654", "sreenathkp", "VarshaShaheen", "MuhammedShaahid", "ronythomas2002", "haafiiz", "abraham98", 
 "Gowrykrishna ", "pranav", "sabin_2002", "Adith628", "Gaiuzz", "Nandana_Pradeep","ABHISHEKHARISH" , "briz_02", "abhihawk319", "anjanasuresh091", "aswinsreekanth11", "___sajidha", "BLANK", "AnmolRatna","AmeeshaArackal","effinjoewilson","abijithtk1212","salva_pk","sreedevmannarkkad","Afras_"]



var questions = ["find-the-duplicate-number", "running-sum-of-1d-array", "remove-element", "length-of-last-word", "valid-sudoku"/**,"sort-colors","move-zeroes","reverse-string","valid-palindrome-ii","valid-palindrome" */]


function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
        return geeks != value;
    });
}

var colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]
var randomcolor = colors[(Math.floor(Math.random() * colors.length))]
var format = {}


get(child(dbRef, `users`)).then((snapshot) => {
  if (snapshot.exists()) {
    var count = 0
    for (let i in snapshot.val()){
        count+=1
        format[i] = Object.keys(snapshot.val()[i]).length
        var points = Object.keys(snapshot.val()[i]).length
    }

    var keysSorted = Object.keys(format).sort(function(a,b){return format[b]-format[a]})
    for (let i in keysSorted){
        var newcolors = arrayRemove(colors, randomcolor)
        randomcolor = newcolors[(Math.floor(Math.random() * colors.length))]
        var playerhtml = `<div class='player' style='background-color: ${randomcolor}'> \
                    <span class="name"> ${keysSorted[i]}</span> \
                    <span class="score">${format[keysSorted[i]]}</span> \
                    </div>`
        var player = document.createElement("div");
        player.innerHTML = playerhtml
        l.appendChild(player)
    }

    document.getElementById("total").innerHTML += count
    console.log(format)
  } else {
    console.log("No data available");
  }
})

var todaysquestion = "find-the-duplicate-number"

function update(){
    var total = usernames.length
    var count = 0
    var url = "https://gdscdsa.onrender.com/check"
    for (var i in usernames){
        console.log(usernames[i])
        var newurl = url+"/"+usernames[i]
        fetch(newurl).then( function(response) {return response.json()}).then(function(result){
            //for (var j in questions){
                var recents = result.recents.split(",")
                var user = result.username
                for (var j in questions){
                    if (recents.includes(questions[j])){
                        saveuser(user, questions[j])
                        console.log("saved")
                    }
                }
            //}
            //console.log(recents)
            console.log(result)
            count+=1
            console.log(count,"/",total)
        }).catch(function(error){
            console.log(error)
        })
        
    }
    
}

document.getElementById("update").addEventListener("click", update);
