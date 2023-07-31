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
public class PlanService {

	private int planseq;
	private int placenum;
	private int daynum;
	private String placename;
	private String placememo;
	private float placebudget;
	private float placeexpenditure;
	private float lng;
	private float lat;
}
