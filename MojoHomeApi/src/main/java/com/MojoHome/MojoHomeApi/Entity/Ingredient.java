package com.MojoHome.MojoHomeApi.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.NamedQuery;
import javax.persistence.Id;

@Entity
@NamedQuery(name="get_ingredients", query="SELECT i FROM Ingredient i WHERE breadId = ?1")
public class Ingredient {

    @Id
    @GeneratedValue
    private int id;

    private int breadId;

    private String name;
    private double amount;

    public Ingredient() {

    }

    public Ingredient(int id, int breadId, String name, double amount) {
        this.id = id;
        this.breadId = breadId;
        this.name = name;
        this.amount = amount;
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
     * @return the amount
     */
    public double getAmount() {
        return amount;
    }

    /**
     * @param amount the amount to set
     */
    public void setAmount(double amount) {
        this.amount = amount;
    }

    /**
     * @return the breadId
     */
    public int getBreadId() {
        return breadId;
    }

    /**
     * @param breadId the breadId to set
     */
    public void setBreadId(int breadId) {
        this.breadId = breadId;
    }

}