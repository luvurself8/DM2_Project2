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
public class Plan {

	private String memberid;
	private int planseq;
	private String plantitle;
	private String startdate;
	private String enddate;
	private String departure;
	private String destination;
}
