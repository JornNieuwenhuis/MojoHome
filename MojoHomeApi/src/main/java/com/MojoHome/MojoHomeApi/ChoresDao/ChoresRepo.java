package com.MojoHome.MojoHomeApi.ChoresDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import com.MojoHome.MojoHomeApi.Entity.Chore;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@Transactional
@RequestMapping(value="api/chores/")
public class ChoresRepo {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @PersistenceContext
    EntityManager entityManager;

    /* 
    * Get choresList
    */
    @RequestMapping(value="/getChoresList", method = RequestMethod.GET)
    public List<Chore> getChoresList() {
        TypedQuery<Chore> choresQuery = entityManager.createNamedQuery("get_chores_list", Chore.class);
        List<Chore> result = choresQuery.getResultList();
		return result;
    }

    /* 
    * Create a new task
    */
    @RequestMapping(value="/addChoresItem", method = RequestMethod.POST)
    public Chore addChoresItem(@RequestBody() Chore newChore){
        return entityManager.merge(
            new Chore(
                newChore.getId(), 
                newChore.getName(), 
                newChore.getRecurrenceInterval(), 
                newChore.getRecurrenceAmount(),
                newChore.getChoreCreationDate(),
                newChore.getLastCompletionDate()
            )
        );
    }

    /* 
    * Create a new task
    */
    @RequestMapping(value="/updateChoresItem", method = RequestMethod.POST)
    public Chore updateChoresItem(@RequestBody() Chore updatedChore){
        return entityManager.merge(
            new Chore(
                updatedChore.getId(), 
                updatedChore.getName(), 
                updatedChore.getRecurrenceInterval(), 
                updatedChore.getRecurrenceAmount(),
                updatedChore.getChoreCreationDate(),
                updatedChore.getLastCompletionDate()
            )
        );
    }

    /* 
    * Create a new task
    */
    @RequestMapping(value="/removeChoresItem", method = RequestMethod.POST)
    public void removeChoresItem(@RequestBody() Chore targetChore){
        try {
            Chore targetEntity = entityManager.find(Chore.class, targetChore.getId());
            entityManager.remove(targetEntity);
        } catch (Exception e) {
            logger.info(e.toString());
            return;
        }
		return;
    }

}