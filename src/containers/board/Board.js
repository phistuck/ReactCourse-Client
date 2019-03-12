import React, { Component } from 'react';
import Card from '../card/Card';

export class Board extends Component {

    state = {
        isBoardLock: false,
        firstClickedCardId: null,
        cards: []
    }
    
    componentDidMount() {
        console.log('Board - componentDidMount()');
        const {size} = this.props;
        let cards = [];
        for (let i = 0; i < size; i++) {
            cards.push({
                id: i,
                isFliped: false,
                isCardBlocked: false, // will be use to identify if the card found its matching card
                order: Math.floor(Math.random() * size),
                pictureSrc: `https://picsum.photos/200/300/?${i % 2 === 0 ? i+1 : i}`
            });        
        }
        this.setState({cards});
    }
    
    componentDidUpdate() {
        const isNotAllCardsFliped  = this.state.cards.some(card => !card.isCardBlocked );
        if (!isNotAllCardsFliped) {
            this.props.onGameComplete();
        }
    }

    unflipedCards(firstCardId, secondCardId) {
        const cards = [...this.state.cards];
        const firstCard = {...cards[firstCardId]};
        const secondCard = {...cards[secondCardId]};
        firstCard.isCardBlocked = false;
        firstCard.isFliped = false;
        secondCard.isCardBlocked = false;
        secondCard.isFliped = false;
        
        cards[firstCard.id] = firstCard;
        cards[secondCard.id] = secondCard;
        setTimeout(() => {
            this.setState({
                isBoardLock: false,                
                cards
            });
        }, 1500);
    }


    onCardClick = (cardId) => {
        console.log('The clicked card id is: ', cardId);
        if (!this.state.isBoardLock) {
            if (this.state.firstClickedCardId === null) { //the first card that was flipped

                // 1. Make a shallow copy of the items
                const cards = [...this.state.cards];
                // 2. Make a shallow copy of the item you want to mutate
                const card = {...cards[cardId]};
                // 3. Replace the property you're intested in
                card.isFliped = true;
                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                cards[cardId] = card;
                // 5. Set the state to our new copy
                this.setState({
                    firstClickedCardId: cardId,
                    cards
                });
            } else {
                const prevClickedCard = this.state.cards.find(card => card.id === this.state.firstClickedCardId);                
                if ((prevClickedCard.id !== cardId) && (this.state.cards[cardId].pictureSrc === prevClickedCard.pictureSrc)) {
                    // cards match. disable them
                    console.log('cards matches');
                    const cards = [...this.state.cards];
                    const firstCard = {...cards[prevClickedCard.id]};
                    const secondCard = {...cards[cardId]};
                    firstCard.isCardBlocked = true;
                    secondCard.isCardBlocked = true;
                    secondCard.isFliped = true;
                    
                    cards[firstCard.id] = firstCard;
                    cards[secondCard.id] = secondCard;

                    this.setState({
                        firstClickedCardId: null,
                        cards
                    });

                } else {
                    console.log('cards not matches');

                    const cards = [...this.state.cards];
                    const card = {...cards[cardId]};
                    card.isFliped = true;                    
                    cards[cardId] = card;

                    this.setState({
                        firstClickedCardId: null,
                        cards,
                        isBoardLock: true
                    }, this.unflipedCards(this.state.firstClickedCardId, cardId));                                        
                }
            }
        } else {
            console.log('trying to click on blocked board');
        }
    }

    render() {
        return (
                <div className="board">
                    {this.state.cards.map(card => (
                        <Card 
                            key={card.id} 
                            cardId={card.id}
                            pictureSrc={card.pictureSrc} 
                            order={card.order} 
                            isFliped={card.isFliped}
                            onClick={this.onCardClick}
                            isBlocked={card.isCardBlocked}
                        />
                    ))}
                </div>
        )
    }
}

export default Board
