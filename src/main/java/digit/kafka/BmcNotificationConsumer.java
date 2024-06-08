package digit.kafka;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import digit.service.BmcNotificationService;
import digit.web.models.SchemeApplicationRequest;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BmcNotificationConsumer {

	@Autowired
	private BmcNotificationService notificationService;

	@Autowired
	private ObjectMapper mapper;

	@KafkaListener(topics = { "${ptr.kafka.create.topic}", "${ptr.kafka.update.topic}" })
	public void listen(final HashMap<String, Object> record, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {

		SchemeApplicationRequest petRequest = new SchemeApplicationRequest();
		try {

			log.debug("Consuming record in Pet for notification: " + record.toString());
			petRequest = mapper.convertValue(record, SchemeApplicationRequest.class);
		} catch (final Exception e) {

			log.error("Error while listening to value: " + record + " on topic: " + topic + ": " + e);
		}

		log.info("Pet Appplication Received: "
				+ petRequest.getSchemeApplications ().get(0).getApplicationNumber());

		notificationService.process(petRequest);
	}

}
