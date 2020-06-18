// класс, создающий карточку
class Card {
    constructor(api, myId) { 
      this.api = api;
      this.myId = myId;
    }
    create(cardData) {
      const template = document.createElement("div");
      template.insertAdjacentHTML('beforeend', `
        <div class="place-card">
          <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
          </div>
          <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <div class="place-card__like">
              <button class="place-card__like-icon"></button>
              <p class="place-card__like-number"></p>
            </div>
          </div>
        </div>`);
      const placeCard = template.firstElementChild;
      placeCard.querySelector(".place-card__name").textContent = cardData.name;
      placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${cardData.link})`;
      placeCard.querySelector(".place-card__image").dataset.url = cardData.link;
      placeCard.querySelector('.place-card__like-number').textContent = cardData.likes.length;

      cardData.likes.forEach((like) => {
        if (like._id === this.myId) {
          placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked')
        }
      });

      if (cardData.owner._id === this.myId) {
        const deleteButton = placeCard.querySelector('.place-card__delete-icon');
        deleteButton.classList.add('place-card__delete-icon_show');
        deleteButton.addEventListener('click', (event) => {
          if (window.confirm()) {
            this.api.deleteCard(cardData._id)
            .then(() => {
              this.remove(event)
            })
            .catch((err) => console.log(err));
          }
        });
      }

      placeCard.querySelector('.place-card__like-icon').addEventListener('click', (event) => {
        this.like(event);
        if (event.target.classList.contains('place-card__like-icon_liked')) {
          this.api.likeCard(cardData._id)
            .then((res) => {
              placeCard.querySelector('.place-card__like-number').textContent = res.likes.length;
            })           
        } else {
          this.api.unlikeCard(cardData._id)
            .then((res) => {
              placeCard.querySelector('.place-card__like-number').textContent = res.likes.length;
            })
        }
      });
    
      return placeCard;
    }
  
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  
    remove(event) {
      const card = event.target.parentElement.parentElement; 
      card.parentNode.removeChild(card);
    }
  
  };