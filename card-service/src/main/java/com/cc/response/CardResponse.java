package com.cc.response;

import com.cc.entity.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardResponse extends RepresentationModel<CardResponse> {

    private long cardId;

    private String cardNumber;

    private String cvv;

    public CardResponse(Card card) {
        this.cardId = card.getId();
        this.cardNumber = card.getCardNumber();
        this.cvv = card.getCvv();
    }
}
