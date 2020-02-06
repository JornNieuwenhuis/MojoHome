package com.MojoHome.MojoHomeApi.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name="todo")
@NamedQuery(name="get_todo_list", query="select t from Todo t")
public class Todo {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private boolean complete;
    
    public Todo() {

    }

    public Todo(int id, String name, boolean complete) {
        super();
        this.id = id;
        this.name = name;
        this.complete = complete;
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
        return "Name: " + this.name + " id: " + this.id;
    }

    /**
     * @return the complete
     */
    public boolean isComplete() {
        return complete;
    }

    /**
     * @param complete the complete to set
     */
    public void setComplete(boolean complete) {
        this.complete = complete;
    }
}