package com.example.myapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

@Entity
public class Human {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long humanId;
	@NotEmpty(message = "Enter Name")
	@Column(name = "name")
	private String name;
	@NotEmpty(message = "Enter Cast")
	@Column(name = "cast")
	private String cast;
	public long getHumanId() {
		return humanId;
	}
	public void setHumanId(long humanId) {
		this.humanId = humanId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCast() {
		return cast;
	}
	public void setCast(String cast) {
		this.cast = cast;
	}
	public Human(long humanId, String name, String cast) {
		super();
		this.humanId = humanId;
		this.name = name;
		this.cast = cast;
	}
	public Human() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Human [humanId=" + humanId + ", name=" + name + ", cast=" + cast + "]";
	}
}
