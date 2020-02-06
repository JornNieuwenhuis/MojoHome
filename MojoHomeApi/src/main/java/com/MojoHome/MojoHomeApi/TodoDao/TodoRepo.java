package com.MojoHome.MojoHomeApi.TodoDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import com.MojoHome.MojoHomeApi.Entity.Todo;

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
@RequestMapping(value="api/todo/")
public class TodoRepo {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @PersistenceContext
    EntityManager entityManager;

    /* 
    * Get todoList
    */
    @RequestMapping(value="/getTodoList", method = RequestMethod.GET)
    public List<Todo> getTodoList() {
        TypedQuery<Todo> todoQuery = entityManager.createNamedQuery("get_todo_list", Todo.class);
        List<Todo> result = todoQuery.getResultList();
		return result;
    }

    /* 
    * Create a new task
    */
    @RequestMapping(value="/addTodoItem", method = RequestMethod.POST)
    public Todo addTodoItem(@RequestBody() Todo newTodo){
        return entityManager.merge(new Todo(newTodo.getId(), newTodo.getName(), false));
    }

    /* 
    * Create a new task
    */
    @RequestMapping(value="/updateTodoItem", method = RequestMethod.POST)
    public Todo updateTodoItem(@RequestBody() Todo newTodo){
        return entityManager.merge(new Todo(newTodo.getId(), newTodo.getName(), newTodo.isComplete()));
    }

    /* 
    * Create a new task
    */
    @RequestMapping(value="/removeTodoItem", method = RequestMethod.POST)
    public void removeTodoItem(@RequestBody() Todo targetTodo){
        try {
            Todo targetEntity = entityManager.find(Todo.class, targetTodo.getId());
            entityManager.remove(targetEntity);
        } catch (Exception e) {
            logger.info(e.toString());
            return;
        }
		return;
    }

}