package digit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import digit.bmc.model.Machines;
@Repository
public interface MachinesRepository extends  JpaRepository<Machines, Long>{

    List<Machines> getALLList();

    Machines getByAmount (String name );



}
