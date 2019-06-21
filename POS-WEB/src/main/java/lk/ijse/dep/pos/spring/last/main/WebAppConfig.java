package lk.ijse.dep.pos.spring.last.main;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@ComponentScan("lk.ijse.dep.pos.spring.last")
@Configuration
public class WebAppConfig {
}
