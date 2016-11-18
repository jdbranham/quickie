package net.savantly.quickie.RestControllers;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import net.savantly.quickie.modules.diagram.Diagram;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@DirtiesContext
public class DiagramControllerTest {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	@WithMockUser(username = "user", password = "password")
	public void testGetAll() {
		ResponseEntity<Diagram> response = this.restTemplate.getForEntity("/diagrams/", Diagram.class);
	}

	@Test
	@WithMockUser(username = "user", password = "password")
	public void testSaveJavaScript() {
		Diagram stest = new Diagram();
		stest.setScript("test script");
		stest.setName("Test1");
		ResponseEntity<Diagram> response = this.restTemplate.postForEntity("/diagrams/", stest, Diagram.class);
		
		Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
		Assert.assertEquals(stest.getName(), response.getBody().getName());
		Assert.assertEquals(stest.getScript(), response.getBody().getScript());
		
		// Update Name and id
		stest.setName("NewTestName");
		stest.setId(response.getBody().getId());
		
		ResponseEntity<Diagram> newResponse = this.restTemplate.postForEntity("/diagrams/", stest, Diagram.class);		
		Assert.assertEquals("NewTestName", newResponse.getBody().getName());
		
	}

}
