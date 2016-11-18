package net.savantly.quickie.modules.diagram;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.savantly.quickie.rest.BaseController;

@RestController
@RequestMapping("/diagrams")
public class DiagramController extends BaseController<Diagram, DiagramRepository>{
	

}
