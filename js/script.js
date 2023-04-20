const inputPseudoTouit = document.getElementById("pseudo-touit");
const inputMessageTouit = document.getElementById("msg-touit");
const sendButtonMsg = document.getElementById("send-btn-msg");
const contenuTouitLikes = document.getElementById("contenu-touit-likes");
const contenuTouit = document.getElementById("contenu-touit");
const modal = document.getElementById("container-modal")
const contenuModal = document.getElementById("modal");
const closeButtonModal = document.getElementById("modal-close");
const inputPseudoComment = document.getElementById("pseudo-comment");
const inputMessageComment = document.getElementById("msg-comment");
const sendButtonComment = document.getElementById("send-btn-comment");
const contenuTrending = document.getElementById("contenu-trending");

function addTouit(name,message,nbLike,nbCom,idMsg,section,ts){    
// Création du touit avec image, pseudo, date et message
    const touit = document.createElement("article");
    touit.className = "touit";

// Création de la requête pour un random sur l'image user
    const randomUserPhoto = new XMLHttpRequest();
    randomUserPhoto.open("GET","https://randomuser.me/api/",true);
    randomUserPhoto.addEventListener("readystatechange", function(e) {
        if(randomUserPhoto.readyState === XMLHttpRequest.DONE && randomUserPhoto.status === 200) {
            const responseRandom = JSON.parse(randomUserPhoto.responseText);
            const imgUser = document.createElement("img");
            imgUser.className = "img-user";
            imgUser.setAttribute("src",responseRandom.results[0].picture.thumbnail);
            imgUser.setAttribute("alt","user photo");
            touit.appendChild(imgUser);
        }
    });
    randomUserPhoto.send();

    const pseudo = document.createElement("h3");
    pseudo.textContent = name;

    const textMessage = document.createElement("p");
    textMessage.textContent = message;
        
    touit.appendChild(pseudo);
    touit.appendChild(textMessage);
    section.appendChild(touit);

// Création de la date
    const dateTouit = document.createElement('p');
    const convTS = new Date(ts*1000);
    dateTouit.textContent = convTS.getDate() + "/" + (convTS.getMonth()+1) + "/" + convTS.getFullYear();  

// Création dans le touit d'un système pour liker et commenter
    const likeComment = document.createElement("p");
    likeComment.className = "like-com";

// Création du like et de son image
    const buttonLike = document.createElement("button");
    buttonLike.className = "btn-like";
    buttonLike.setAttribute('type', 'submit');
    buttonLike.setAttribute('value', 'Liker un touit');
    buttonLike.textContent = nbLike;
        
    const imgButtonLike = document.createElement("img");
    imgButtonLike.setAttribute('src','Img/heart.svg');
    imgButtonLike.setAttribute('alt','logoCoeur');

// Création du lien de commentaire
    const linkComment = document.createElement('a');
    linkComment.setAttribute('href','#modal');
    linkComment.textContent = nbCom + " 🗨";

    buttonLike.appendChild(imgButtonLike);
    likeComment.appendChild(dateTouit);
    likeComment.appendChild(buttonLike);
    likeComment.appendChild(linkComment);
    touit.appendChild(likeComment);

    buttonLike.addEventListener("click",function(){
        if(buttonLike.value === "Liker un touit"){
            sendLike(idMsg);
            buttonLike.value = "Disliker un touit";
        }
        else{
            removeLike(idMsg);
            buttonLike.value = "Liker un touit";
            // ne fonctionne que si l'on ne rafraichit pas la page car sinon la valeur revient toujours à liker un touit. Il faut passer par un système de sauvegarde d'ID ou génération cookie à gérer via du PHP mais pas dans JS. Sinon il faut créer un autre bouton pour disliker.
        }
    });
    
    linkComment.addEventListener("click",function(e){
        addComment(idMsg);
    });
}

function addComment(idMsg){
// Affichage de la modal
    document.getElementById("body").style.overflow = "hidden";
    modal.style.display = "flex";

    closeButtonModal.addEventListener('click', function(){
        modal.style.display = "none";
        document.getElementById("body").style.overflow = "auto";
    });
// Envoyer un commentaire
    sendComment(idMsg);
// Requête pour récupérer les commentaires
    const requestComment = new XMLHttpRequest();
    requestComment.open('GET', "https://xxx/comments/list?message_id="+idMsg,true );
    console.log(idMsg)
    requestComment.addEventListener("readystatechange",function(){
        if(requestComment.readyState === XMLHttpRequest.DONE && requestComment.status === 200){
            const responseComment = JSON.parse(requestComment.responseText);
            for (let com of responseComment.comments){             
                const divComment = document.createElement('div');
                divComment.className = "div-comment";

                const pseudoComment = document.createElement('h3');
                pseudoComment.textContent = com.name;

                const comment = document.createElement('p');
                comment.textContent = "⤷ " + com.comment;

                const dateComment = document.createElement('p');
                const convTS = new Date(com.ts*1000);
                dateComment.textContent = convTS.getDate() + "/" + (convTS.getMonth()+1) + "/" + convTS.getFullYear(); 

                divComment.appendChild(pseudoComment);
                divComment.appendChild(dateComment);
                divComment.appendChild(comment);
                contenuModal.appendChild(divComment);
                
                closeButtonModal.addEventListener('click', function(){
                    contenuModal.removeChild(divComment);
                });
            }   
        }
    });
    requestComment.send();     
}

function sendComment(idMsg){
    sendButtonComment.addEventListener("click",function(){
        // Requête pour envoyer un commentaire sur un touit via l'écouteur du button
        const requestSendComment = new XMLHttpRequest();
        requestSendComment.open("POST","https://xxx/comments/send",true);
        requestSendComment.addEventListener("readystatechange",function(){
            if(requestSendComment.readyState === XMLHttpRequest.DONE && requestSendComment.status === 200){
                if(requestSendComment.responseText.includes('success')){
                    window.alert("message envoyé");
                }
                else{
                    window.alert("erreur lors de l'envoi, merci de vérifier le pseudo et le message");
                }            
            }
        });
        requestSendComment.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestSendComment.send("name=" + inputPseudoComment.value + "&" + "comment=" + inputMessageComment.value + "&" + "message_id=" + idMsg);

        inputPseudoComment.value = "";
        inputMessageComment.value = ""; 
    });
}

function sendLike(idMsg){
    // Requête pour envoyer un like sur un touit
    const requestSendLike = new XMLHttpRequest();
    requestSendLike.open("PUT","https://xxx/likes/send",true);
    requestSendLike.addEventListener("readystatechange",function(){
        if(requestSendLike.readyState === XMLHttpRequest.DONE && requestSendLike.status === 200){
            if(requestSendLike.responseText.includes('success')){
                window.alert("like envoyé");
            }
            else{
                window.alert("erreur");
            }            
        }
    });
    requestSendLike.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    requestSendLike.send("message_id=" + idMsg);
}

function removeLike(idMsg){
    // Requête pour envoyer un like sur un touit
    const requestRemoveLike = new XMLHttpRequest();
    requestRemoveLike.open("DELETE","https://xxx/likes/remove",true);
    requestRemoveLike.addEventListener("readystatechange",function(){
        if(requestRemoveLike.readyState === XMLHttpRequest.DONE && requestRemoveLike.status === 200){
            if(requestRemoveLike.responseText.includes('success')){
                window.alert("dislike envoyé");
            }
            else{
                window.alert("erreur");
            }          
        }
    });
    requestRemoveLike.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    requestRemoveLike.send("message_id=" + idMsg);
}

// Requête pour récupérer les touits
const requestTouit = new XMLHttpRequest();
requestTouit.open("GET", "https://xxx/list", true);
requestTouit.addEventListener("readystatechange",function(){
    if(requestTouit.readyState === XMLHttpRequest.DONE && requestTouit.status === 200){
        const responseTouit = JSON.parse(requestTouit.responseText);
        for (let touit of responseTouit.messages){
            addTouit(touit.name,touit.message,touit.likes, touit.comments_count,touit.id,contenuTouit,touit.ts)
        }
    }
});
requestTouit.send();

// Requête pour récupérer les touits les plus likés
const requestTouitLike = new XMLHttpRequest();
requestTouitLike.open("GET", "https://xxx/likes/top?count=3", true);
requestTouitLike.addEventListener("readystatechange",function(){
    if(requestTouitLike.readyState === XMLHttpRequest.DONE && requestTouitLike.status === 200){
        const responseTouitLike = JSON.parse(requestTouitLike.responseText);
        for (let touit of responseTouitLike.top){
            addTouit(touit.name,touit.message,touit.likes, touit.comments_count,touit.id,contenuTouitLikes,touit.ts)
        }
    }
});
requestTouitLike.send();

// Requête pour récupérer les mots les plus utilisés
const requestTrending = new XMLHttpRequest();
requestTrending.open("GET", "https://xxx/trending", true);
requestTrending.addEventListener("readystatechange",function(){
    if(requestTrending.readyState === XMLHttpRequest.DONE && requestTrending.status === 200){
        const responseTrending = JSON.parse(requestTouitLike.responseText)
    }
});
requestTrending.send();

// Requête pour envoyer un touit via l'écouteur du button
sendButtonMsg.addEventListener("click",function(){
    const requestSend = new XMLHttpRequest();
    requestSend.open("POST","https://xxx/send",true);
    requestSend.addEventListener("readystatechange",function(){
        if(requestSend.readyState === XMLHttpRequest.DONE && requestSend.status === 200){
            if(requestSend.responseText.includes('success')){
                window.alert("message envoyé");
            }
            else{
                window.alert("erreur lors de l'envoi, merci de vérifier le pseudo et le message");
            }            
        }
    });
    requestSend.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    requestSend.send("name=" + inputPseudoTouit.value + "&" + "message=" + inputMessageTouit.value);

    inputPseudoTouit.value = "";
    inputMessageTouit.value = ""; 
})



