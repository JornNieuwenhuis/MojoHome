package com.MojoHome.MojoHomeApi.Dao.ChoresDao;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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
@CrossOrigin(origins = "http://localhost:4200")
@Transactional
@RequestMapping(value = "api/chores/")
public class ChoresRepo {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String[] types = { "urgent", "comingUp", "noHurry" };
    private final String lowUrgency = types[2];
    private final String midUrgency = types[1];
    private final String highUrgency = types[0];
    private final int lowRatioPoint = 15;
    private final int highRatioPoint = 30;

    @PersistenceContext
    EntityManager entityManager;

    /*
     * Get choresList
     */
    @RequestMapping(value = "/getChoresList", method = RequestMethod.GET)
    public List<Chore> getChoresList() {
        TypedQuery<Chore> choresQuery = entityManager.createNamedQuery("get_chores_list", Chore.class);
        List<Chore> result = choresQuery.getResultList();
        for (Chore chore : result) {
            Map<String, String> urgencyData = this.getUrgency(chore);
            chore.setColorClass(urgencyData.get("colorClass"));
            chore.setDaysRemaining(Integer.parseInt(urgencyData.get("daysRemaining")));
        }
        return this.sortChoresByUrgency(result);
    }

    private List<Chore> sortChoresByUrgency(List<Chore> choresList) {
        List<Chore> tempList = new ArrayList<Chore>();
        for (String type : this.types) {
            for (Chore chore : choresList) {
                if (chore.getColorClass() == type) {
                    tempList.add(chore);
                }
            }
        }
        return tempList;
    }

    /*
     * Get chores by id
     */
    private Chore getChoreById(int id) {
        TypedQuery<Chore> choresQuery = entityManager.createNamedQuery("get_chore_by_id", Chore.class);
        choresQuery.setParameter("id", id);
        Chore result = choresQuery.getSingleResult();
        return result;
    }

    /*
     * Create a new task
     */
    @RequestMapping(value = "/addChoresItem", method = RequestMethod.POST)
    public List<Chore> addChoresItem(@RequestBody() Chore newChore) {
        newChore.setDeadline(new Date());
        Date newDeadline = this.getNewDeadline(newChore);
        entityManager.merge(new Chore(newChore.getId(), newChore.getName(), newChore.getRecurrenceInterval(),
                newChore.getRecurrenceAmount(), newDeadline));
        return this.getChoresList();
    }

    /*
     * Create a new task
     */
    @RequestMapping(value = "/updateChore", method = RequestMethod.POST)
    public List<Chore> updateChore(@RequestBody() Chore updatedChore) {
        Date deadline    = updatedChore.getDeadline();
        entityManager.merge(
            new Chore(
                updatedChore.getId(), 
                updatedChore.getName(), 
                updatedChore.getRecurrenceInterval(), 
                updatedChore.getRecurrenceAmount(),
                deadline
            )
        );
        return this.getChoresList();
    }

    /*
     * Create a new task
     */
    @RequestMapping(value = "/updateWithNewDeadline", method = RequestMethod.POST)
    public List<Chore> updateWithNewDeadline(@RequestBody() Chore updatedChore) {
        Date deadline = this.getNewDeadline(updatedChore);
        entityManager.merge(
            new Chore(
                updatedChore.getId(), 
                updatedChore.getName(), 
                updatedChore.getRecurrenceInterval(), 
                updatedChore.getRecurrenceAmount(),
                deadline
            )
        );
        return this.getChoresList();
    }

    /* 
    * Remove a chores item
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

    /* 
    * Create a new task
    */
    @RequestMapping(value="/completeChore", method = RequestMethod.POST)
    public List<Chore> completeChore(@RequestBody() Chore targetChore){
        Chore chore = this.getChoreById(targetChore.getId());       
        chore.setDeadline(this.getNewDeadline(chore));
        this.updateChore(chore);
		return this.getChoresList();
    }

    /* 
    * Calculate new deadline based on recurrence values
    */
    private Date getNewDeadline(Chore chore) {
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());

        switch (chore.getRecurrenceInterval()) {
            case "day":
                c.add(Calendar.DAY_OF_MONTH, chore.getRecurrenceAmount());  
                break;
            case "week":
                c.add(Calendar.DAY_OF_MONTH, (chore.getRecurrenceAmount() * 7));
                break;
            case "month":
                c.add(Calendar.MONTH, chore.getRecurrenceAmount());
                break;
            case "year":
                c.add(Calendar.YEAR, chore.getRecurrenceAmount());
                break;
            default:
                break;
        }
        return c.getTime();
    }

    /* 
    * Return color class based on remaining days / total days ratio
    */
    private Map<String, String> getUrgency(Chore chore) {

        Map<String, String> result = new HashMap<String, String>();
        
        Calendar deadlineCalendar = Calendar.getInstance();
        
        deadlineCalendar.setTime(chore.getDeadline());
        deadlineCalendar.add(Calendar.DAY_OF_MONTH, 1);

        Calendar currentDate = Calendar.getInstance();
        currentDate.setTime(new Date());

        long end   = deadlineCalendar.getTimeInMillis();
        long start = currentDate.getTimeInMillis();
        long daysRemaining = start > end ? 0 : TimeUnit.MILLISECONDS.toDays(Math.abs(end - start));

        if(daysRemaining == 0) { 
            result.put("colorClass", this.highUrgency); 
            result.put("daysRemaining", "0");
            return result;
        }

        int totalDays = this.getTotalDays(chore.getRecurrenceInterval(), chore.getRecurrenceAmount());

        double ratio = (((double) daysRemaining) / ((double) totalDays)) * 100;
        String colorClass = ratio <= this.lowRatioPoint ? this.highUrgency : (ratio <= this.highRatioPoint ? this.midUrgency : this.lowUrgency);
        
        result.put("colorClass", colorClass);
        result.put("daysRemaining", Long.toString(daysRemaining));
        return result;        
    }

    /* 
    * Get total number of days of recurrence period * amount
    */
    private int getTotalDays(String recurrence, int amount) {
        int result;
        switch (recurrence) {
            case "day":
                result = amount;
                break;
            case "week":
                result = amount * 7;
                break;
            case "month":
                result = amount * 30;
                break;
            case "year":
                result = amount * 365;
                break;
            default:
                result = 0;
                break;
        }
        return result;
    }

}