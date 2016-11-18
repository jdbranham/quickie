package net.savantly.quickie.modules.diagram;

import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface DiagramRepository extends PagingAndSortingRepository<Diagram, UUID>{

}
