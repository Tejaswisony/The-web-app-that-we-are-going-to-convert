let myName = ''

function start() {
    initMyProfile()
    initMessages()
    initPeopleFollow()
}

function initMyProfile() {
    let profileContent = ''
    if(localStorage.myProfile === undefined) {
        initDummyProfile()
    } else {
        let myProfile = JSON.parse(localStorage.myProfile)
        myName = myProfile.name
        profileContent += `
            Name: <span id="my-name">${myProfile.name}</span> <br/>
            Occupation: <span id="my-occupation">${myProfile.occupation}</span> <br/>
            bio: <span id="my-bio">${myProfile.bio}</span> <br/>
            <button id="set-profile-button" class="align-center" onclick="setProfile()">Set Profile</button>`
        document.querySelector('#profile-content').innerHTML = profileContent
    }
}

function setProfile() {
    let profileContent = `Name: <input type="text" id="set-profile-name" placeholder="Type your name..."/> <br/><br/>
        Occupation: <input type="text" id="set-profile-occupation" placeholder="Type your occupation..."/> <br/><br/>
        bio: <input type="text" id="set-profile-bio" placeholder="Type your bio..."/> <br/><br/>
        <button onclick="saveSetProfile(
            document.querySelector('#set-profile-name').value,
            document.querySelector('#set-profile-occupation').value,
            document.querySelector('#set-profile-bio').value
        )">Save Changes</button>
        <button onclick="cancelSetProfile()">Cancel Changes</button>`

    document.querySelector('#profile-content').innerHTML = profileContent
}

function saveSetProfile(name, occupation, bio) {
    localStorage.myProfile = JSON.stringify({
        name: name,
        occupation: occupation,
        bio: bio
    })
    initMyProfile()
}

function cancelSetProfile() {
    start()
}

function initDummyPeopleToFollow() {
    let users = [
        {
            name: "John",
            occupation: "Web App Developer",
            bio: "art (drawing), photography, exercise (hiking, cycling). You can't spend all day on a computer so it's better to have something to balance it.",
            isFollowing: false
        }, {
            name: "Arya",
            occupation: "Graphic Designer",
            bio: "“I consider myself a professional designer because I have gained a formal education in the matter and now work full-time designing things exclusively for big clients.",
            isFollowing: true
        }, {
            name: "Veronica",
            occupation: "Blockchain Developer",
            bio: "It is one of my primary interests for now, which actually steered my career in the blockchain solutions development direction..",
            isFollowing: false
        }, {
            name: "Daenerys",
            occupation: "Youtuber",
            bio: "Pick something you love and know a lot about. If you pick the right topic you will easily think of videos for the future.",
            isFollowing: false
        }, {
            name: "Tyrion",
            occupation: "Frontend Developer",
            bio: "Editing photos, looking for color palletes, cool fonts/themes. But ends up calling backend guys if something went wrong when they installed newer things.",
            isFollowing: true
        }
    ]
    localStorage.users = JSON.stringify(users)
}

function initPeopleFollow() {
    if(localStorage.users === undefined) initDummyPeopleToFollow()

    let users = JSON.parse(localStorage.users)
    let sectionContent = ''
    for(let i = 0; i < users.length; i++) {
        sectionContent += `<div id="people-to-follow-${i}" class="user-box">
            Name: <span>${users[i].name}</span> <br/>
            Occupation: <span>${users[i].occupation}</span> <br/>
            bio: <span>${users[i].bio}</span> <br/>
            ${users[i].isFollowing ? `<button class="following-button" onclick="unfollowUser(${i})">Following</button>` : `<button onclick="followUser(${i})">Follow</button>`}
        </div>`
    }
    document.querySelector('#people-to-follow').innerHTML = sectionContent
}

function unfollowUser(id) {
    let users = JSON.parse(localStorage.users)
    users[id].isFollowing = false
    localStorage.users = JSON.stringify(users)
    initPeopleFollow()
}

function followUser(id) {
    let users = JSON.parse(localStorage.users)
    users[id].isFollowing = true
    localStorage.users = JSON.stringify(users)
    initPeopleFollow()
}

function sendMessage(message) {
    let messages = JSON.parse(localStorage.messages)
    messages.push({
        writtenBy: myName,
        content: message
    })
    localStorage.messages = JSON.stringify(messages)
    initMessages()
}

function initMessages() {
    if(localStorage.messages === undefined) initDummyMessages()

    let messages = JSON.parse(localStorage.messages)
    let sectionContent = ''
    for(let i = 0; i < messages.length; i++) {
        sectionContent += `<div class="message-box">
            <div>${messages[i].writtenBy} says:</div>
            <div>${messages[i].content}</div>
        </div>`
    }
    document.querySelector('#messages').innerHTML = sectionContent

}

function initDummyMessages() {
    let messages = [
        {
            content: "I need a room full of mirrors so I can be surrounded by winners",
            writtenBy: "Arya"
        }, {
            content: "At the end of the day it's always gonna be you....",
            writtenBy: "Veronica"
        }, {
            content: "You have to want more for yourself or you'll always be stuck right where you're at.....",
            writtenBy: "Tyrion"
        }, {
            content: "Live your dreams everyday or someone else will live for you...",
            writtenBy: "Arya"
        }, {
            content: "It's healthy to take time out....Make some time for you...",
            writtenBy: "John"
        }
    ]
    localStorage.messages = JSON.stringify(messages)
}

function initDummyProfile() {
    localStorage.myProfile = JSON.stringify({
        name: "Sakthi",
        occupation: "Student",
        bio: "I'm a Computer Science Student"
    })
    initMyProfile()
}

start()
