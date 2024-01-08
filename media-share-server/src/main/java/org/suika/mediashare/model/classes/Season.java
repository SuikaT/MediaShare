package org.suika.mediashare.model.classes;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Season {

    Integer id;

    String directoryName;

    String path;
    // size in octet
    long size;

    List<Episode> episodeList;

    boolean hasRepertory = true;

    public Season(Integer id, boolean hasRepertory) {
        this.id = id;
        this.hasRepertory = hasRepertory;
    }

    public Season(Integer id, String directoryName, String path, long size) {
        this.id = id;
        this.directoryName = directoryName;
        this.path = path;
        this.size = size;
    }

}
