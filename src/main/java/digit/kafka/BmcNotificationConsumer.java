package digit.kafka;

import java.util.HashMap;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import digit.service.BmcNotificationService;
import digit.web.models.SchemeApplicationRequest;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BMCNotificationConsumer {
    private BmcNotificationService notificationService;
    private ObjectMapper mapper;

	@Inject
    public BMCNotificationConsumer(BmcNotificationService notificationService, ObjectMapper mapper) {
        this.notificationService = notificationService;
        this.mapper = mapper;
    }

    @KafkaListener(topics = { "${bmc.kafka.create.topic}", "${bmc.kafka.update.topic}" })
    public void listen(final HashMap<String, Object> message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {

        SchemeApplicationRequest schemeApplicationRequest = new SchemeApplicationRequest();
        try {
            log.debug("Consuming record in BMC for notification: " + message.toString());
            schemeApplicationRequest = mapper.convertValue(message, SchemeApplicationRequest.class);
        } catch (final Exception e) {
            log.error("Error while listening to value: " + message + " on topic: " + topic + ": " + e);
        }

        log.info("BMC Application Received: " + schemeApplicationRequest.getSchemeApplications().get(0).getApplicationNumber());

        notificationService.process(schemeApplicationRequest);
    }
}
