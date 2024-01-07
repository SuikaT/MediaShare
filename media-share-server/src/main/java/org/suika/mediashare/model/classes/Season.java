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
    String directoryName;

    String path;
    // size in octet
    long size;

    List<Episode> episodeList;

    public Season(String directoryName, String path, long size) {
        this.directoryName = directoryName;
        this.path = path;
        this.size = size;
    }

}
