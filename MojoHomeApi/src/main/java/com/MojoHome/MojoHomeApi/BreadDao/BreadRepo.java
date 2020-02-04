package com.MojoHome.MojoHomeApi.BreadDao;

import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import com.MojoHome.MojoHomeApi.Entity.BreadRecipe;
import com.MojoHome.MojoHomeApi.Entity.Ingredient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@Transactional
public class BreadRepo {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @PersistenceContext
    EntityManager entityManager;

    @RequestMapping(value="api/bread/getRecipes")
    public List<BreadRecipe> getRecipes() {

        TypedQuery<BreadRecipe> breadQuery = entityManager.createNamedQuery("get_all_bread_recipes", BreadRecipe.class);
        List<BreadRecipe> result = breadQuery.getResultList();
		return result;
    }

}