package net.kdigital.project.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Exchange {

	private String rate_time;
	private double usd;
	private double cny;
	private double jpy;
	private double euro;
	private double dollar_index;
}
