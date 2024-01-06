package org.suika.mediashare.model.classes;

import java.util.List;

import org.suika.mediashare.model.enums.MediaTypeEnum;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Series extends Media {

    List<Season> seasonList;

    MediaTypeEnum type;

    public Series(String name, String path, List<Season> seasonList, MediaTypeEnum type) {
        super(name, path);
        this.seasonList = seasonList;
        this.type = type;
    }
}
