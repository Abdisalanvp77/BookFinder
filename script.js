
function bookSearch(){
  var searchField = document.getElementById("searchfield").value;
  document.getElementById("resultField").innerHTML = "";
  console.log("connected");
  if (searchField === ""){
    //empty text cant be searched
    var errorP = document.createElement("p");
    errorP.innerHTML = 'Error! Please provide a search querry first';
    errorP.setAttribute("class", "errorP");
    resultField.appendChild(errorP);
  }
  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + searchField,
    dataType: "json",
    success: function(data){
    console.log(data);
    if(data.totalItems=== 0){
      resultField.innerHTML +="<p class='loadP'><i class='far fa-frown' style='font-size:24px'></i> Nothing of that kind for now - Try searching for another book" + "</p>";
    } else {

      for(var i=0; i<data.items.length; i++){      
      var card = document.createElement("div");
      card.setAttribute("class", "col span_1_of_3");

      var cardHeader = document.createElement("div");
      card.setAttribute("class", "col span_1_of_3");

      var cardBody = document.createElement("div");
      card.setAttribute("class", "card-body col");

      var cardInfo = document.createElement("div");
      cardInfo.setAttribute("class", "aside");

      var seeMoreButton = document.createElement('a');
      seeMoreButton.setAttribute('class', 'btn btn-success ');
      seeMoreButton.setAttribute('content', 'test content');
      if (data.items[i].saleInfo['buyLink'] != null){
          seeMoreButton.setAttribute("href", data.items[i].saleInfo['buyLink']);
          seeMoreButton.setAttribute("target", "_blank");

      }
      var img = document.createElement("img");
      if (data.items[i].volumeInfo.imageLinks == undefined){
          
          img.setAttribute("alt", "image of book");
          cardBody.appendChild(img);

      }else {
        //create image and append into card body
      
        img.setAttribute("src", data.items[i].volumeInfo.imageLinks['thumbnail']);
        cardBody.appendChild(img);

      }
      
      //create header and append into card body
      seeMoreButton.innerHTML = 'See more';
      cardInfo.innerHTML += "<h5>" + data.items[i].volumeInfo.title + "</h5>";
      cardInfo.innerHTML += "<p>By: " + data.items[i].volumeInfo.authors + "</p>";
      cardInfo.innerHTML += "<p>Published By: " + data.items[i].volumeInfo.publisher + "</p>";        
      
      cardInfo.appendChild(seeMoreButton);     

      cardBody.appendChild(cardInfo);

      //card.appendChild(cardHeader);
      card.appendChild(cardBody);
      resultField.appendChild(card);
    }
    }
    
  },
    type: 'GET'
  });
}
document.getElementById("searchButton").addEventListener('click', bookSearch, false);
//get result on keyboard enter
var input = document.getElementById("searchfield");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("searchButton").click();
  }
});

window.onload = function() { 

  
  resultField.innerHTML +="<p class='loadP'><i class='far fa-frown' style='font-size:24px'></i> Nothing to show here yet - Try searching for a book" + "</p>";
 
};
