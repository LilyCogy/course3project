package com.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.entity.Booking;
import com.repository.BookingRepository;

@Repository
public class BookingService {

	@Autowired
	BookingRepository bookCabRepository;
	//cname,source,destination, typeofcab,numberofseats
	
	@Autowired
	RestTemplate restTemplate;
	
	public String bookCab(Booking bc) {
		
		String tolocation = bc.getDestination();
		String fromlocation = bc.getSource();
		String typeofcab = bc.getTypeofcab();
		int numberOfSeats = bc.getNumberofseats();
	
//float amount = 
//restTemplate.getForObject("http://localhost:8282/cabfare/findCabFare/"+tolocation+"/"+fromlocation+"/"+typeofcab+"/"+numberOfSeats, Float.class);

float amount = 
restTemplate.getForObject("http://localhost:8282/cabfare/findCabFare/"+tolocation+"/"+fromlocation+"/"+typeofcab+"/"+numberOfSeats, Float.class);		
		
		if(amount==-1) {
			return "No Cab Available as of now, So cab didn't book";
		}else {
			bc.setAmount(amount);
			bc.setBookingtime(LocalDateTime.now());
			bookCabRepository.save(bc);
			return "Your cab booking done successfully";
		}
		// write the code to book the cab. 

		//return "Your cab fare amount is "+amount;
	}
}