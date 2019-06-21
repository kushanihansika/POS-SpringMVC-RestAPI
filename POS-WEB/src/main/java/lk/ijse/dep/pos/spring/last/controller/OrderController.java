package lk.ijse.dep.pos.spring.last.controller;


import lk.ijse.dep.pos.spring.last.dto.OrderDTO;
import lk.ijse.dep.pos.spring.last.service.custom.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RequestMapping("api/v1/order")
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;


    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderDTO> getOrder(@PathVariable("id") String id) {
        OrderDTO dto = null;
        if (orderService.isOrderExits(id)){
            dto = orderService.getOrdrById(id);
        }
        System.out.println("controller :"+dto);
        return new ResponseEntity<OrderDTO>(dto, (dto != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer > saveOrder(@RequestBody OrderDTO orderDTO){
        Date orderDate = orderDTO.getOrderDate();
        String customerId = orderDTO.getCustomerId();

        System.out.println("order id : "+orderDTO.getOrderId());
        System.out.println("order date : "+ orderDate);
        System.out.println("customerId : "+customerId);
        System.out.println("order detail :" + orderDTO.getOrderDetails());

        if (orderDTO.getOrderId()==0 || orderDate == null  || orderDTO.getCustomerId().isEmpty() || orderDTO.getOrderDetails().isEmpty()){
            return new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST);
        }else{
            Integer id = orderService.placeOrder(orderDTO);
            return new ResponseEntity<Integer>(id, (id != null) ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
        }
    }


}
