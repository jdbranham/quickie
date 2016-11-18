package net.savantly.quickie.rest;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@SuppressWarnings({"rawtypes", "unchecked"})
public abstract class BaseController<T, R extends PagingAndSortingRepository> {
	
	@Autowired
	R repository;

	@RequestMapping({"/", ""})
	public Page<T> getAll(Pageable pageable){
		return repository.findAll(pageable);
	}
	
	@RequestMapping(value={"/", "", "/{id}"}, method=RequestMethod.POST)
	public T save(@RequestBody T sTest){
		return (T) repository.save(sTest);
	}
	
	@RequestMapping("/{id}")
	public T getOne(@PathVariable UUID id){
		return (T) repository.findOne(id);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable UUID id){
		repository.delete(id);
	}
}
