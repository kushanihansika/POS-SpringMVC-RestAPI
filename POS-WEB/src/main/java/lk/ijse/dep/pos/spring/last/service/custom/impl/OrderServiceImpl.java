package lk.ijse.dep.pos.spring.last.service.custom.impl;

import lk.ijse.dep.pos.spring.last.dto.OrderDTO;
import lk.ijse.dep.pos.spring.last.dto.OrderDetailDTO;
import lk.ijse.dep.pos.spring.last.entity.Customer;
import lk.ijse.dep.pos.spring.last.entity.Item;
import lk.ijse.dep.pos.spring.last.entity.Order;
import lk.ijse.dep.pos.spring.last.entity.OrderDetail;
import lk.ijse.dep.pos.spring.last.repository.CustomerRepository;
import lk.ijse.dep.pos.spring.last.repository.ItemRepository;
import lk.ijse.dep.pos.spring.last.repository.OrderDetailRepository;
import lk.ijse.dep.pos.spring.last.repository.OrderRepository;
import lk.ijse.dep.pos.spring.last.service.custom.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public Integer placeOrder(OrderDTO order) {

        // Find the customer
        Customer customer = customerRepository.getOne(order.getCustomerId());
        // Save the order

        int id = orderRepository.save(new Order(order.getOrderId(), order.getOrderDate(), customer)).getId();
        // orderDetailRepository.save(new Order(order.getOrderId(),order.getOrderDate(),customer));
        //  Save OrderDetails and Update the Qty.
        for (OrderDetailDTO dto : order.getOrderDetails()) {
            orderDetailRepository.save(new OrderDetail(dto.getOrderId(), dto.getItemCode(), dto.getQty(), dto.getUnitPrice()));
            // Find the item
            Item item = itemRepository.getOne(dto.getItemCode());
            // Calculate the qty. on hand
            int qty = item.getQtyOnHand() - dto.getQty();
            // Update the new qty.on hand
            item.setQtyOnHand(qty);
        }

        return id;
    }

    public int generateOrderId() {
        try {
            return orderRepository.getLastOrderId() + 1;
        } catch (NoResultException e) {
            return 1;
        }
    }

    @Override
    public List<OrderDTO> getAllOrders() {

        List<OrderDTO> orders = orderRepository.findAll().stream().map(order -> new OrderDTO(order.getId(), order.getDate(), order.getCustomer().getId(), order.getOrderDetails().
                stream().map(orderDetail -> new OrderDetailDTO(orderDetail.getOrderDetailPK().getOrderId(), orderDetail.getOrderDetailPK().getItemCode(),
                orderDetail.getQty(), orderDetail.getUnitPrice())).collect(Collectors.toList()))).collect(Collectors.toList());

        return orders;
    }

    @Override
    public boolean isOrderExits(String id) {

        return orderRepository.existsById((Integer.parseInt(id)));
    }

    @Override
    public OrderDTO getOrdrById(String id) {

        Order order = orderRepository.getOne(Integer.parseInt(id));
        String id1 = order.getCustomer().getId();
        List<OrderDetailDTO> orderDetailDTOS = new ArrayList<>();
        OrderDTO orderDTO = new OrderDTO(order.getId(), order.getDate(), order.getCustomer().getId(), orderDetailDTOS);

        return orderDTO;
    }

    @Override
    public String saveOrder(OrderDTO orderDTO) {
//        String customerId = orderDTO.getCustomerId();
//        List<OrderDetailDTO> orderDetailDTOS = new ArrayList<>();
//      return   orderRepository.save(new Order(orderDTO.getOrderId(),orderDTO.getOrderDate(),));
        return null;
    }


}
