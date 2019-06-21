package lk.ijse.dep.pos.spring.last.repository;

import lk.ijse.dep.pos.spring.last.entity.Item;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, String> {

}
