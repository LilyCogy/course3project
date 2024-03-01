package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Booking;
import com.service.BookingService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.core.MediaType;


@RestController
@RequestMapping(value = "bookcab")
public class BookingController {

	@Autowired
	BookingService bookCabService;
	
	@PostMapping (value = "book", produces = MediaType.APPLICATION_JSON)
	public String bookCab(@RequestBody Booking booking) { // DI for req and bookcab object 

		
		String result = bookCabService.bookCab(booking);
		System.out.println(result);
		return result;
		
	}
} 