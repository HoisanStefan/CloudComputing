package com.cc.response;

import com.cc.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponse extends RepresentationModel<CustomerResponse> {

    private long customerId;

    private String firstName;

    private String lastName;

    private CardResponse cardResponse;

    public CustomerResponse(Customer customer) {
        this.customerId = customer.getId();
        this.firstName = customer.getFirstName();
        this.lastName = customer.getLastName();
    }
}
