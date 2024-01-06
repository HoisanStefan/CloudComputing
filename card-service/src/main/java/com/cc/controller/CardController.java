package com.cc.controller;

import com.cc.response.ExchangeRateResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;

import com.cc.request.CreateCardRequest;
import com.cc.response.CardResponse;
import com.cc.service.CardService;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/card")
@Slf4j
@Validated
@Api(value = "Card Controller", description = "REST APIs to create and retrieve cards")
public class CardController {

    private static final Logger logger = LoggerFactory.getLogger(CardController.class);
    private final CardService cardService;
    private final Environment environment;

    @Autowired
    public CardController(CardService cardService, Environment environment) {
        this.cardService = cardService;
        this.environment = environment;
    }

    @Operation(summary = "Create new card")
    @PostMapping("/create")
    public CardResponse createCard(@RequestBody @Valid CreateCardRequest createCardRequest) {
        CardResponse cardResponse = cardService.createCard(createCardRequest);
        cardResponse.add(linkTo(methodOn(CardController.class).getById(cardResponse.getCardId())).withSelfRel());

        return cardResponse;
    }

    @Operation(summary = "Retrieve a card by id")
    @GetMapping("/getById/{id}")
    public CardResponse getById(@PathVariable long id) {
        CardResponse cardResponse = cardService.getById(id);
        logger.info(environment.getProperty("info.app.version"));
        cardResponse.add(linkTo(methodOn(CardController.class).getById(cardResponse.getCardId())).withSelfRel());

        return cardResponse;
    }

    @Operation(summary = "Get current exchange rate for EUR to RON")
    @GetMapping("/exchangeRate")
    public ExchangeRateResponse getExchangeRate() {
        ExchangeRateResponse exchangeRateResponse = cardService.getExchangeRate();
        exchangeRateResponse.add(linkTo(methodOn(CardController.class).getExchangeRate()).withSelfRel());

        return exchangeRateResponse;
    }
}
