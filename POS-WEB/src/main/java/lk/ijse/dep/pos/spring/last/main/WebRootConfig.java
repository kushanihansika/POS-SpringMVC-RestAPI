package lk.ijse.dep.pos.spring.last.main;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Import(JpaConfig.class)
@Configuration
public class WebRootConfig {
}
