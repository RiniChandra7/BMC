package digit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import digit.bmc.model.Event;
import digit.repository.EventRepository;
import digit.web.models.SchemeApplicationRequest;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

     public Event getBDivyangByApplication(SchemeApplicationRequest  request) {
    Event event = new Event();

    event.setId(request.getId());
    event.setName(request.getName());
    event.setStartDt(request.getStartDt());
    event.setEndDt(request.getEndDt());
    return  eventRepository.save(event);

     }

}
