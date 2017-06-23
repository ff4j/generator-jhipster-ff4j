package <%=packageName%>.web.rest;

import <%=packageName%>.service.MySampleFF4jService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for playing with FF4J.
 */
@RestController
@RequestMapping("/api/sampleff4j")
public class MySampleFF4jResource {
	
	@Autowired
	private MySampleFF4jService sampleService;
	
	@GetMapping("/price")
	public Double getPrice(@RequestParam(value = "amount") Double amount) {
		return sampleService.getPrice(amount);
	}

}
