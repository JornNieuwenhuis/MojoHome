package com.MojoHome.MojoHomeApi.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name="breadrecipe")
@NamedQuery(name="get_all_bread_recipes", query="select b from BreadRecipe b")
public class BreadRecipe {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    
    public BreadRecipe() {

    }

    public BreadRecipe(int id, String name) {
        super();
        this.id = id;
        this.name = name;
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
    
    @Override
    public String toString() {
        return this.name;
    }
}