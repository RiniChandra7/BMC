package digit.web.controllers;


    import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;
import java.io.IOException;
import java.util.*;

    import javax.validation.constraints.*;
    import javax.validation.Valid;
    import javax.servlet.http.HttpServletRequest;
        import java.util.Optional;

@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2024-06-05T23:24:36.608+05:30")

@Controller
    @RequestMapping("")
    public class ApplicationApiController{

        private final ObjectMapper objectMapper;

        private final HttpServletRequest request;

        public ApplicationApiController(ObjectMapper objectMapper, HttpServletRequest request) {
        this.objectMapper = objectMapper;
        this.request = request;
        }

                @PostMapping("/application/details")
                public ResponseEntity<Void> applicationDetailsPost() {
                        String accept = request.getHeader("Accept");
                        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
                }

                @PostMapping("/application/status")
                public ResponseEntity<Void> applicationStatusPost() {
                        String accept = request.getHeader("Accept");
                        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
                }

                @PostMapping("/application/submit")
                public ResponseEntity<Void> applicationSubmitPost() {
                        String accept = request.getHeader("Accept");
                        return new ResponseEntity<Void>(HttpStatus.NOT_IMPLEMENTED);
                }

        }
