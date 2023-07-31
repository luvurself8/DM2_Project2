package net.kdigital.project.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Diary {

    
    private int planseq;
	private int daynum;
	private int diary_seq;
	private String regdate;
	private String diary_title;
	private String diary_text;
}
