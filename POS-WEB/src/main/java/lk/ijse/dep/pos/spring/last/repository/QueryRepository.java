package lk.ijse.dep.pos.spring.last.repository;

import lk.ijse.dep.pos.spring.last.entity.CustomEntity;


import java.util.List;

public interface QueryRepository {

    List<CustomEntity> getOrdersTotal();

}
