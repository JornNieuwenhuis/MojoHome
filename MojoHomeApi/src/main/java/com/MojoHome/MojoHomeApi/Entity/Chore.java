package com.MojoHome.MojoHomeApi.Entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Id;

@Entity
@Table(name = "chores")
@NamedQuery(name = "get_chores_list", query = "select c from Chore c order by deadline")
@NamedQuery(name = "get_chore_by_id", query = "select c from Chore c where c.id = :id")
public class Chore {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String recurrenceInterval;
    private int recurrenceAmount;
    private Date deadline;

    @Transient
    private String colorClass;
    @Transient
    private int daysRemaining;

    public Chore() {

    }

    public Chore(int id, String name, String recurrenceInterval, int recurrenceAmount, Date deadline) {
        this.id = id;
        this.name = name;
        this.recurrenceInterval = recurrenceInterval;
        this.recurrenceAmount = recurrenceAmount;
        this.deadline = deadline;
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
     * @return the deadline
     */
    public Date getDeadline() {
        return deadline;
    }

    /**
     * @param deadline the deadline to set
     */
    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    /**
     * @return the colorClass
     */
    public String getColorClass() {
        return colorClass;
    }

    /**
     * @param colorClass the colorClass to set
     */
    public void setColorClass(String colorClass) {
        this.colorClass = colorClass;
    }

    /**
     * @return the daysRemaining
     */
    public int getDaysRemaining() {
        return daysRemaining;
    }

    /**
     * @param daysRemaining the daysRemaining to set
     */
    public void setDaysRemaining(int daysRemaining) {
        this.daysRemaining = daysRemaining;
    }

    /*
     * (non-Javadoc)
     * 
     * @see java.lang.Object#toString()
     */

    @Override
    public String toString() {
        return "Chore [colorClass=" + colorClass + ", daysRemaining=" + daysRemaining + ", deadline=" + deadline
                + ", id=" + id + ", name=" + name + ", recurrenceAmount=" + recurrenceAmount + ", recurrenceInterval="
                + recurrenceInterval + "]";
    }
}