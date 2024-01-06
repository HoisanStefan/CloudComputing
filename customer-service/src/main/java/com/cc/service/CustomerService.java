package com.cc.service;

import com.cc.entity.Customer;
import com.cc.exceptions.CustomerNotFoundException;
import com.cc.repository.CustomerRepository;
import com.cc.request.CreateCustomerRequest;
import com.cc.response.CustomerResponse;
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

    public CustomerResponse createCustomer(CreateCustomerRequest createCustomerRequest) {

        Customer customer = new Customer();
        customer.setFirstName(createCustomerRequest.getFirstName());
        customer.setLastName(createCustomerRequest.getLastName());
        customer.setCardId(createCustomerRequest.getCardId());

        customerRepository.save(customer);

        CustomerResponse customerResponse = new CustomerResponse(customer);

        customerResponse.setCardResponse(this.cardServiceProxy.getCardById(customer.getCardId()));

        return customerResponse;
    }

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
}
