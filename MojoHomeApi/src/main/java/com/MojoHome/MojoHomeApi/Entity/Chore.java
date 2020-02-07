package com.MojoHome.MojoHomeApi.Entity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name = "chores")
@NamedQuery(name = "get_chores_list", query = "select c from Chore c")
public class Chore {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String recurrenceInterval;
    private int recurrenceAmount;
    private Date choreCreationDate;
    private Date lastCompletionDate;

    public Chore() {

    }

    public Chore(int id, String name, String recurrenceInterval, int recurrenceAmount, Date choreCreationDate,
            Date lastCompletionDate) {
        this.id = id;
        this.name = name;
        this.recurrenceInterval = recurrenceInterval;
        this.recurrenceAmount = recurrenceAmount;
        this.choreCreationDate = choreCreationDate;
        this.lastCompletionDate = lastCompletionDate;
    }

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the recurrenceInterval
     */
    public String getRecurrenceInterval() {
        return recurrenceInterval;
    }

    /**
     * @param recurrenceInterval the recurrenceInterval to set
     */
    public void setRecurrenceInterval(String recurrenceInterval) {
        this.recurrenceInterval = recurrenceInterval;
    }

    /**
     * @return the recurrenceAmount
     */
    public int getRecurrenceAmount() {
        return recurrenceAmount;
    }

    /**
     * @param recurrenceAmount the recurrenceAmount to set
     */
    public void setRecurrenceAmount(int recurrenceAmount) {
        this.recurrenceAmount = recurrenceAmount;
    }

    /**
     * @return the choreCreationDate
     */
    public Date getChoreCreationDate() {
        return choreCreationDate;
    }

    /**
     * @param choreCreationDate the choreCreationDate to set
     */
    public void setChoreCreationDate(Date choreCreationDate) {
        this.choreCreationDate = choreCreationDate;
    }

    /**
     * @return the lastCompletionDate
     */
    public Date getLastCompletionDate() {
        return lastCompletionDate;
    }

    /**
     * @param lastCompletionDate the lastCompletionDate to set
     */
    public void setLastCompletionDate(Date lastCompletionDate) {
        this.lastCompletionDate = lastCompletionDate;
    }    
}