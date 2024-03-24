package org.suika.mediashare.model.classes;

import java.util.List;

import org.suika.mediashare.model.enums.MediaTypeEnum;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    Integer id;

    String name;

    @JsonIgnore
    String path;

    List<Season> seasonList;

    MediaTypeEnum type;
    // size in octet
    long size;

    public Media(Integer id, String name, String path, MediaTypeEnum type, long size) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.type = type;
        this.size = size;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Media media) {
            return this.id == media.getId();
        } else
            return false;
    }
}
