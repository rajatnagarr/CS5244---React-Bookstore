package com.example.rajatbookstorerest.controller;

import business.ApplicationContext;
import business.order.OrderDetails;
import business.order.OrderForm;
import business.order.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService = ApplicationContext.INSTANCE.getOrderService();

    @PostMapping
    public OrderDetails placeOrder(@RequestBody OrderForm orderForm) {
        try {
            long orderId = orderService.placeOrder(orderForm.getCustomerForm(), orderForm.getCart());
            if (orderId > 0) {
                return orderService.getOrderDetails(orderId);
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unknown error occurred");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}
