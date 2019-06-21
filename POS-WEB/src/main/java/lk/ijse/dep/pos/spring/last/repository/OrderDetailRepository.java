package lk.ijse.dep.pos.spring.last.repository;


import lk.ijse.dep.pos.spring.last.entity.OrderDetail;
import lk.ijse.dep.pos.spring.last.entity.OrderDetailPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailPK> {

}
