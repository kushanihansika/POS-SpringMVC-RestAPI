package lk.ijse.dep.pos.spring.last.service.custom;

import lk.ijse.dep.pos.spring.last.dto.CustomerDTO;
import lk.ijse.dep.pos.spring.last.dto.OrderDTO;
import lk.ijse.dep.pos.spring.last.service.SuperService;

import java.util.List;


public interface OrderService extends SuperService {

    Integer placeOrder(OrderDTO order);

    int generateOrderId();

    List<OrderDTO> getAllOrders();

    boolean isOrderExits(String id);

    OrderDTO getOrdrById(String id);

    String saveOrder(OrderDTO orderDTO);
}
