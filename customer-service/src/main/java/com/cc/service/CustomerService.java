package com.cc.service;

import com.cc.entity.Customer;
import com.cc.exceptions.CustomerNotFoundException;
import com.cc.repository.CustomerRepository;
import com.cc.request.CreateCustomerRequest;
import com.cc.response.CardResponse;
import com.cc.response.CustomerResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    Logger logger = LoggerFactory.getLogger(CustomerService.class);

    private final CustomerRepository customerRepository;
    private final CardServiceProxy cardServiceProxy;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, CardServiceProxy cardServiceProxy) {
        this.customerRepository = customerRepository;
        this.cardServiceProxy = cardServiceProxy;
    }

    @CircuitBreaker(name="customerService", fallbackMethod = "fallbackError")
    public CustomerResponse createCustomer(CreateCustomerRequest createCustomerRequest) {

        long cardId = createCustomerRequest.getCardId();
        CardResponse cardResponse = this.cardServiceProxy.getCardById(cardId);

        if (cardResponse == null) {
            throw new CustomerNotFoundException("Card " + cardId + " not found!");
        }

        Customer customer = new Customer();
        customer.setFirstName(createCustomerRequest.getFirstName());
        customer.setLastName(createCustomerRequest.getLastName());
        customer.setCardId(createCustomerRequest.getCardId());

        customerRepository.save(customer);

        CustomerResponse customerResponse = new CustomerResponse(customer);

        customerResponse.setCardResponse(cardResponse);

        return customerResponse;
    }

    @CircuitBreaker(name="customerService", fallbackMethod = "fallbackError")
    public CustomerResponse getById(long id) {

        logger.info("Inside getById " + id);
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isEmpty()) {
            throw new CustomerNotFoundException("Customer " + id + " not found!");
        }
        Customer customer = optionalCustomer.get();
        CustomerResponse customerResponse = new CustomerResponse(customer);

        customerResponse.setCardResponse(this.cardServiceProxy.getCardById(customer.getCardId()));

        return customerResponse;
    }

    @CircuitBreaker(name="customerService", fallbackMethod = "fallbackError")
    public CustomerResponse throwUncaughtError() {
        throw new RuntimeException();
    }

    public void fallbackError(Throwable throwable) {
        logger.error("Error = " + throwable);
    }
}
