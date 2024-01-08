package org.suika.mediashare.model.classes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Episode {

    Integer id;

    String name;

    String extension;

    long size;

}
