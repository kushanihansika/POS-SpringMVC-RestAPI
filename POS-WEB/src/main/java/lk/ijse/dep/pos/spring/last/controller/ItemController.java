package lk.ijse.dep.pos.spring.last.controller;



import lk.ijse.dep.pos.spring.last.dto.ItemDTO;
import lk.ijse.dep.pos.spring.last.service.custom.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/item")
@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<ItemDTO> getAllItem(){
           return itemService.getAllItems();
    }

    @GetMapping(value = "/{id:I\\d{3}}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ItemDTO> getCustomer(@PathVariable("id") String id) {
        ItemDTO dto = null;
        if (itemService.isItemExit(id)){
            dto = itemService.getItemById(id);
        }
        return new ResponseEntity<ItemDTO>(dto, (dto != null) ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveItem(@RequestBody ItemDTO item){
        if (item.getCode().isEmpty() || item.getDescription().isEmpty() || item.getQtyOnHand() == 0||item.getUnitPrice() == 0.00){

            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }else{
              String code = itemService.saveItem(item);
            return new ResponseEntity<String>("\""+code+"\"",HttpStatus.CREATED);
        }
    }
    @PutMapping(path = "/{id:I\\d{3}}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateCustomer(@PathVariable("id") String code, @RequestBody ItemDTO item){
        if (!itemService.isItemExit(code)){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
        if (item.getCode().isEmpty() || item.getDescription().isEmpty()||item.getQtyOnHand()==0||item.getUnitPrice()==0){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }else{
            item.setCode(code);
            itemService.updateItem(item);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
    }
    @DeleteMapping(path = "/{id:I\\d{3}}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable("id") String code){
        if (!itemService.isItemExit(code)){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
        itemService.deleteItem(code);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }


}
