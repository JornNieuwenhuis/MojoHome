package com.MojoHome.MojoHomeApi.Dao.UserDao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MojoHome.MojoHomeApi.Entity.User;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Transactional
public class UserRepo {

	// connect to the database
	@PersistenceContext
	EntityManager entityManager;

	@RequestMapping(value="/api/user/findAll")
	public List<User> findAll() {
		TypedQuery<User> namedQuery = entityManager.createNamedQuery("find_all_users", User.class);
		return namedQuery.getResultList();
	}

	public User findById(int id) {
		return entityManager.find(User.class, id);
	}

	public User update(User user) {
		return entityManager.merge(user);
	}

	public User insert(User user) {
		return entityManager.merge(user);
	}

	public void deleteById(int id) {
		User user = findById(id);
		entityManager.remove(user);
	}
}