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
* API tests for AadhaarApiController
*/
@Disabled
@WebMvcTest(AadhaarApiController.class)
@Import(TestConfiguration.class)
public class AadhaarApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void aadhaarAuthenticatePostSuccess() throws Exception {
        mockMvc.perform(post("/aadhaar/authenticate").contentType(MediaType
        .APPLICATION_JSON))
        .andExpect(status().isOk());
    }

    @Test
    public void aadhaarAuthenticatePostFailure() throws Exception {
        mockMvc.perform(post("/aadhaar/authenticate").contentType(MediaType
        .APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }

    @Test
    public void aadhaarVerifyPostSuccess() throws Exception {
        mockMvc.perform(post("/aadhaar/verify").contentType(MediaType
        .APPLICATION_JSON))
        .andExpect(status().isOk());
    }

    @Test
    public void aadhaarVerifyPostFailure() throws Exception {
        mockMvc.perform(post("/aadhaar/verify").contentType(MediaType
        .APPLICATION_JSON))
        .andExpect(status().isBadRequest());
    }

}
