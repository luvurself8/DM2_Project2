package net.kdigital.project.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Stock {

	private String datetime;
	private double close_rate;
	private double open_rate;
	private double high_rate;
	private double low_rate;
	
}
