package lk.ijse.dep.pos.spring.last.service.custom;


import lk.ijse.dep.pos.spring.last.dto.ItemDTO;
import lk.ijse.dep.pos.spring.last.service.SuperService;

import java.util.List;

public interface ItemService extends SuperService {

    List<ItemDTO> getAllItems();

    boolean isItemExit(String code);
    String saveItem(ItemDTO item);

    void updateItem(ItemDTO item);

    void deleteItem(String code);

    ItemDTO getItemById(String id);
}
