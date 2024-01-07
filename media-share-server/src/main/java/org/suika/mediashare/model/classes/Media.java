package org.suika.mediashare.model.classes;

import java.util.List;

import org.suika.mediashare.model.enums.MediaTypeEnum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor()
@ToString
public class Media {

    String name;

    String path;

    List<Season> seasonList;

    MediaTypeEnum type;
    // size in octet
    long size;

    public Media(String name, String path, MediaTypeEnum type, long size) {
        this.name = name;
        this.path = path;
        this.type = type;
        this.size = size;
    }

}
