package com.cc.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCardRequest {

    @NotNull
    @NotBlank
    @Size(max=16)
    private String cardNumber;

    @NotNull
    @NotBlank
    @Size(max=3)
    private String cvv;
}
