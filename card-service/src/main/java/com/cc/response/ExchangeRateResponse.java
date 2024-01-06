package com.cc.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateResponse extends RepresentationModel<ExchangeRateResponse> {
    private String currency_pair;
    private String exchange_rate;
}
