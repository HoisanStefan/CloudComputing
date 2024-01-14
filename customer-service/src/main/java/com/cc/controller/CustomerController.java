package com.cc.controller;

import com.cc.response.CustomerResponse;
import com.cc.service.CustomerService;
import com.cc.request.CreateCustomerRequest;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin
@Api(value = "Customer Controller", description = "REST APIs to create and retrieve customers")
@Validated
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Operation(summary = "Create new customer")
    @PostMapping("/create")
    public CustomerResponse createCustomer(@Valid @RequestBody CreateCustomerRequest createCustomerRequest) {
        CustomerResponse customerResponse = customerService.createCustomer(createCustomerRequest);
        customerResponse.add(linkTo(methodOn(CustomerController.class).getById(customerResponse.getCustomerId())).withSelfRel());

        return customerResponse;
    }

    @Operation(summary = "Get customer by id")
    @GetMapping("/getById/{id}")
    public CustomerResponse getById(@PathVariable long id) {
        CustomerResponse customerResponse = customerService.getById(id);
        customerResponse.add(linkTo(methodOn(CustomerController.class).getById(customerResponse.getCustomerId())).withSelfRel());

        return customerResponse;
    }

    @Operation(summary = "Simulate uncaught exception in order to test CircuitBreaker")
    @GetMapping("/error")
    public CustomerResponse throwError() {
        return customerService.throwUncaughtError();
    }
}
