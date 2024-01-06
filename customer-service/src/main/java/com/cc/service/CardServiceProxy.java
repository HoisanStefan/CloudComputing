package com.cc.service;

import com.cc.feignclients.CardFeignClient;
import com.cc.response.CardResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardServiceProxy {
    Logger logger = LoggerFactory.getLogger(CustomerService.class);

    long count = 1;

    private final CardFeignClient cardFeignClient;

    @Autowired
    public CardServiceProxy(CardFeignClient cardFeignClient) {
        this.cardFeignClient = cardFeignClient;
    }

    @CircuitBreaker(name="cardService", fallbackMethod = "fallbackGetCardById")
    public CardResponse getCardById(long cardId) {
        logger.info("count = " + count);
        count++;
        return cardFeignClient.getById(cardId);
    }

    public CardResponse fallbackGetCardById(long cardId, Throwable throwable) {
        logger.error("Error = " + throwable);
        return new CardResponse();
    }
}
