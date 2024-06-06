package digit.web.controllers;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import digit.TestConfiguration;

    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
* API tests for SchemesApiController
*/
@Disabled
@WebMvcTest(SchemesApiController.class)
@Import(TestConfiguration.class)
public class SchemesApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void schemesActivePostSuccess() throws Exception {
        mockMvc.perform(post("/schemes/active").contentType(MediaType
        .APPLICATION_JSON))
        .andExpect(status().isOk());
    }

    @Test
    public void schemesActivePostFailure() throws Exception {
        mockMvc.perform(post("/schemes/active").contentType(MediaType
        .APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }

}
